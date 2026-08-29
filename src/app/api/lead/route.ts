import { randomUUID } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { limitar } from "@/lib/rate-limit";
import { verificarTurnstile } from "@/lib/turnstile";
import { enviarEmailConfirmacaoLead } from "@/lib/email";
import { leadRequestSchema } from "@/lib/validators";

export const dynamic = "force-dynamic";

const ERRO_GENERICO =
  "Não consegui enviar. Verifique a conexão e tente de novo, ou fale direto no WhatsApp.";

function obterIp(request: NextRequest): string {
  const encaminhado = request.headers.get("x-forwarded-for");
  if (encaminhado) return encaminhado.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "0.0.0.0";
}

async function dispararWebhookLead(payload: Record<string, unknown>) {
  const url = process.env.N8N_WEBHOOK_LEAD;
  if (!url) {
    console.warn("N8N_WEBHOOK_LEAD não configurado — webhook não disparado.");
    return;
  }
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function POST(request: NextRequest) {
  let corpo: unknown;
  try {
    corpo = await request.json();
  } catch {
    return NextResponse.json({ erro: "Não consegui ler os dados enviados." }, { status: 400 });
  }

  const resultado = leadRequestSchema.safeParse(corpo);
  if (!resultado.success) {
    const primeiroErro = resultado.error.issues[0]?.message ?? "Dados inválidos.";
    return NextResponse.json({ erro: primeiroErro }, { status: 400 });
  }

  const { nome, email, whatsapp, empresa, desafio, porte, utm, turnstileToken } = resultado.data;
  const ip = obterIp(request);

  const dentroDoLimite = await limitar(`lead:${ip}`, 5, 3600);
  if (!dentroDoLimite) {
    return NextResponse.json(
      { erro: "Muitas tentativas por aqui. Aguarde um pouco e tente de novo." },
      { status: 429 },
    );
  }

  const turnstileValido = await verificarTurnstile(turnstileToken, ip);
  if (!turnstileValido) {
    return NextResponse.json(
      { erro: "Não consegui confirmar que você não é um robô. Recarregue a página e tente de novo." },
      { status: 400 },
    );
  }

  let leadId: string;
  try {
    const [lead] = await db
      .insert(leads)
      .values({
        id: randomUUID(),
        nome,
        email,
        whatsapp,
        empresa,
        desafio,
        porte: porte ?? null,
        origem: "diagnostico",
        utm: utm ?? null,
      })
      .returning({ id: leads.id });
    leadId = lead.id;
  } catch (error) {
    console.error("Falha ao gravar lead:", error);
    return NextResponse.json({ erro: ERRO_GENERICO }, { status: 500 });
  }

  // Fire-and-forget: e-mail e webhook nunca podem derrubar a gravação, que
  // já aconteceu. Erros aqui só vão pro log.
  enviarEmailConfirmacaoLead({ nome, email }).catch((error) => {
    console.error("Falha ao enviar e-mail de confirmação do lead:", error);
  });
  dispararWebhookLead({ leadId, nome, email, whatsapp, empresa, desafio, porte, utm, origem: "diagnostico" }).catch(
    (error) => {
      console.error("Falha ao disparar webhook do lead:", error);
    },
  );

  return NextResponse.json({ ok: true }, { status: 200 });
}
