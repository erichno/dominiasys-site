import { randomUUID } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { and, eq, isNull, lt, or, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { leads, pesquisaLinks, respostas, respostasItens } from "@/lib/db/schema";
import { limitar } from "@/lib/rate-limit";
import { verificarTurnstile } from "@/lib/turnstile";
import { hashIp } from "@/lib/tokens";
import { consultarTokenNoBanco } from "@/lib/db/queries/pesquisas";
import { respostaPesquisaSchema, validarRespostasPesquisa } from "@/lib/pesquisa-validacao";

export const dynamic = "force-dynamic";

const ERRO_GENERICO =
  "Não consegui enviar. Verifique a conexão e tente de novo, ou fale direto no WhatsApp.";
const ERRO_LINK = "Link inválido ou encerrado.";

class LinkEsgotadoError extends Error {}

function obterIp(request: NextRequest): string {
  const encaminhado = request.headers.get("x-forwarded-for");
  if (encaminhado) return encaminhado.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "0.0.0.0";
}

async function dispararWebhookPesquisa(payload: unknown) {
  const url = process.env.N8N_WEBHOOK_PESQUISA;
  if (!url) {
    console.warn("N8N_WEBHOOK_PESQUISA não configurado — webhook não disparado.");
    return;
  }
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  const ip = obterIp(request);

  let corpo: unknown;
  try {
    corpo = await request.json();
  } catch {
    return NextResponse.json({ erro: "Não consegui ler os dados enviados." }, { status: 400 });
  }

  const resultado = respostaPesquisaSchema.safeParse(corpo);
  if (!resultado.success) {
    return NextResponse.json({ erro: "Dados inválidos." }, { status: 400 });
  }
  const { turnstileToken, consentimento, utm, itens } = resultado.data;

  // Fluxo exato da seção 5: Turnstile → rate limit → revalida token → zod.
  const turnstileValido = await verificarTurnstile(turnstileToken, ip);
  if (!turnstileValido) {
    return NextResponse.json(
      {
        erro: "Não consegui confirmar que você não é um robô. Recarregue a página e tente de novo.",
      },
      { status: 403 },
    );
  }

  const dentroDoLimite = await limitar(`pesquisa:${ip}`, 5, 3600);
  if (!dentroDoLimite) {
    return NextResponse.json(
      { erro: "Muitas tentativas por aqui. Aguarde um pouco e tente de novo." },
      { status: 429 },
    );
  }

  const pesquisaPublica = await consultarTokenNoBanco(token);
  if (!pesquisaPublica) {
    return NextResponse.json({ erro: ERRO_LINK }, { status: 404 });
  }

  const validacao = validarRespostasPesquisa(pesquisaPublica.perguntas, itens, consentimento);
  if (!validacao.ok) {
    return NextResponse.json({ erro: validacao.erro }, { status: 400 });
  }

  const ipHash = hashIp(ip);
  const userAgent = request.headers.get("user-agent");

  let respostaId: string;
  try {
    respostaId = await db.transaction(async (tx) => {
      // Incrementa `usos` de forma condicional e atômica: se duas respostas
      // concorrentes disputam a última vaga, só uma passa — a outra cai no
      // catch abaixo como link esgotado, não estoura o limite.
      const [linkAtualizado] = await tx
        .update(pesquisaLinks)
        .set({ usos: sql`${pesquisaLinks.usos} + 1` })
        .where(
          and(
            eq(pesquisaLinks.id, pesquisaPublica.link.id),
            or(isNull(pesquisaLinks.maxUsos), lt(pesquisaLinks.usos, pesquisaLinks.maxUsos)),
          ),
        )
        .returning({ id: pesquisaLinks.id });

      if (!linkAtualizado) {
        throw new LinkEsgotadoError();
      }

      const id = randomUUID();

      await tx.insert(respostas).values({
        id,
        pesquisaId: pesquisaPublica.pesquisa.id,
        linkId: pesquisaPublica.link.id,
        concluidaEm: new Date(),
        ipHash,
        userAgent,
        consentimento,
        utm: utm ?? null,
      });

      if (validacao.itens.length > 0) {
        await tx.insert(respostasItens).values(
          validacao.itens.map((item) => ({
            id: randomUUID(),
            respostaId: id,
            perguntaId: item.perguntaId,
            valorTexto: item.valorTexto,
            valorNum: item.valorNum !== null ? String(item.valorNum) : null,
            valorJson: item.valorJson,
          })),
        );
      }

      return id;
    });
  } catch (error) {
    if (error instanceof LinkEsgotadoError) {
      return NextResponse.json({ erro: ERRO_LINK }, { status: 404 });
    }
    console.error("Falha ao gravar resposta da pesquisa:", error);
    return NextResponse.json({ erro: ERRO_GENERICO }, { status: 500 });
  }

  // Fire-and-forget a partir daqui: nada abaixo pode derrubar a resposta,
  // que já foi gravada com sucesso.
  const perguntaEmail = pesquisaPublica.perguntas.find((pergunta) => pergunta.tipo === "email");
  const itemEmail = perguntaEmail ? itens.find((item) => item.perguntaId === perguntaEmail.id) : undefined;
  const emailResposta = itemEmail?.valorTexto ?? null;

  if (emailResposta) {
    db.insert(leads)
      .values({
        id: randomUUID(),
        email: emailResposta,
        origem: "pesquisa",
        respostaId,
        utm: utm ?? null,
      })
      .catch((error) => {
        console.error("Falha ao criar lead a partir da pesquisa:", error);
      });
  }

  const resumo = pesquisaPublica.perguntas
    .filter((pergunta) => pergunta.tipo !== "consentimento")
    .slice(0, 3)
    .map((pergunta) => {
      const item = itens.find((entrada) => entrada.perguntaId === pergunta.id);
      return {
        pergunta: pergunta.enunciado,
        valor: item?.valorTexto ?? item?.valorNum ?? item?.valorJson ?? null,
      };
    });

  dispararWebhookPesquisa({
    evento: "pesquisa.respondida",
    pesquisa: { id: pesquisaPublica.pesquisa.id, titulo: pesquisaPublica.pesquisa.titulo },
    link: { rotulo: pesquisaPublica.link.rotulo, origem: pesquisaPublica.link.origem },
    respostaId,
    temEmail: Boolean(emailResposta),
    resumo,
  }).catch((error) => {
    console.error("Falha ao disparar webhook da pesquisa:", error);
  });

  return NextResponse.json({ ok: true, respostaId }, { status: 201 });
}
