import { randomUUID } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { inArray, like } from "drizzle-orm";
import { db } from "@/lib/db";
import { leads, perguntas, pesquisaLinks, pesquisas } from "@/lib/db/schema";
import { POST } from "./route";

const PREFIXO = "TESTE_AUTOMATIZADO_respostas_";
const EMAIL_TESTE = "teste-automatizado-respostas@example.com";

const pesquisaIdsCriados: string[] = [];
let ipContador = 0;

/** Cada teste usa um IP sintético diferente para nunca disputar o mesmo balde de rate limit. */
function proximoIp() {
  ipContador += 1;
  return `203.0.113.${ipContador}`;
}

function criarRequisicao(corpo: unknown, ip: string) {
  return new NextRequest("http://localhost:3000/api/pesquisas/x/respostas", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Forwarded-For": ip },
    body: JSON.stringify(corpo),
  });
}

async function enviar(token: string, corpo: unknown) {
  const request = criarRequisicao(corpo, proximoIp());
  const resposta = await POST(request, { params: Promise.resolve({ token }) });
  const dados = await resposta.json().catch(() => null);
  return { status: resposta.status, dados };
}

interface FixturePesquisa {
  pesquisaId: string;
  perguntaObrigatoriaId: string;
  perguntaUnicaId: string;
  tokenValido: string;
  tokenInativo: string;
  tokenExpirado: string;
  tokenEsgotado: string;
}

let fx: FixturePesquisa;
let tokenPesquisaRascunho: string;

beforeAll(async () => {
  const pesquisaId = randomUUID();
  pesquisaIdsCriados.push(pesquisaId);
  await db.insert(pesquisas).values({
    id: pesquisaId,
    titulo: `${PREFIXO}pesquisa ativa`,
    status: "ativa",
  });

  const perguntaObrigatoriaId = randomUUID();
  const perguntaUnicaId = randomUUID();
  await db.insert(perguntas).values([
    {
      id: perguntaObrigatoriaId,
      pesquisaId,
      ordem: 1,
      tipo: "texto",
      enunciado: "Qual seu nome?",
      obrigatoria: true,
    },
    {
      id: perguntaUnicaId,
      pesquisaId,
      ordem: 2,
      tipo: "unica",
      enunciado: "Escolha uma opção",
      obrigatoria: false,
      opcoes: [
        { valor: "a", rotulo: "Opção A" },
        { valor: "b", rotulo: "Opção B" },
      ],
    },
  ]);

  const tokenValido = `${PREFIXO}valido_${randomUUID().slice(0, 8)}`;
  const tokenInativo = `${PREFIXO}inativo_${randomUUID().slice(0, 8)}`;
  const tokenExpirado = `${PREFIXO}expirado_${randomUUID().slice(0, 8)}`;
  const tokenEsgotado = `${PREFIXO}esgotado_${randomUUID().slice(0, 8)}`;

  await db.insert(pesquisaLinks).values([
    { id: randomUUID(), pesquisaId, token: tokenValido, rotulo: "teste válido", ativo: true },
    { id: randomUUID(), pesquisaId, token: tokenInativo, rotulo: "teste inativo", ativo: false },
    {
      id: randomUUID(),
      pesquisaId,
      token: tokenExpirado,
      rotulo: "teste expirado",
      ativo: true,
      expiraEm: new Date(Date.now() - 24 * 60 * 60 * 1000),
    },
    {
      id: randomUUID(),
      pesquisaId,
      token: tokenEsgotado,
      rotulo: "teste esgotado",
      ativo: true,
      maxUsos: 1,
      usos: 1,
    },
  ]);

  fx = {
    pesquisaId,
    perguntaObrigatoriaId,
    perguntaUnicaId,
    tokenValido,
    tokenInativo,
    tokenExpirado,
    tokenEsgotado,
  };

  // Pesquisa em rascunho, para o cenário de status != 'ativa'.
  const pesquisaRascunhoId = randomUUID();
  pesquisaIdsCriados.push(pesquisaRascunhoId);
  await db.insert(pesquisas).values({
    id: pesquisaRascunhoId,
    titulo: `${PREFIXO}pesquisa rascunho`,
    status: "rascunho",
  });
  tokenPesquisaRascunho = `${PREFIXO}rascunho_${randomUUID().slice(0, 8)}`;
  await db.insert(pesquisaLinks).values({
    id: randomUUID(),
    pesquisaId: pesquisaRascunhoId,
    token: tokenPesquisaRascunho,
    rotulo: "teste pesquisa rascunho",
    ativo: true,
  });
});

afterAll(async () => {
  // Cascade cuida de pesquisa_links, perguntas, respostas e respostas_itens.
  await db.delete(pesquisas).where(inArray(pesquisas.id, pesquisaIdsCriados));
  await db.delete(leads).where(like(leads.email, `%${EMAIL_TESTE}%`));
});

describe("POST /api/pesquisas/[token]/respostas", () => {
  it("token inativo → 404, sem revelar o motivo", async () => {
    const { status, dados } = await enviar(fx.tokenInativo, {
      turnstileToken: "x",
      consentimento: true,
      itens: [{ perguntaId: fx.perguntaObrigatoriaId, valorTexto: "Maria" }],
    });
    expect(status).toBe(404);
    expect(dados.erro).toBe("Link inválido ou encerrado.");
  });

  it("token expirado → 404", async () => {
    const { status, dados } = await enviar(fx.tokenExpirado, {
      turnstileToken: "x",
      consentimento: true,
      itens: [{ perguntaId: fx.perguntaObrigatoriaId, valorTexto: "Maria" }],
    });
    expect(status).toBe(404);
    expect(dados.erro).toBe("Link inválido ou encerrado.");
  });

  it("limite de usos atingido → 404", async () => {
    const { status, dados } = await enviar(fx.tokenEsgotado, {
      turnstileToken: "x",
      consentimento: true,
      itens: [{ perguntaId: fx.perguntaObrigatoriaId, valorTexto: "Maria" }],
    });
    expect(status).toBe(404);
    expect(dados.erro).toBe("Link inválido ou encerrado.");
  });

  it("pesquisa em rascunho → 404", async () => {
    const { status, dados } = await enviar(tokenPesquisaRascunho, {
      turnstileToken: "x",
      consentimento: true,
      itens: [],
    });
    expect(status).toBe(404);
    expect(dados.erro).toBe("Link inválido ou encerrado.");
  });

  it("token que não existe → 404, mesma mensagem neutra", async () => {
    const { status, dados } = await enviar("token-que-nunca-existiu-em-lugar-nenhum", {
      turnstileToken: "x",
      consentimento: true,
      itens: [],
    });
    expect(status).toBe(404);
    expect(dados.erro).toBe("Link inválido ou encerrado.");
  });

  it("pergunta obrigatória vazia → 400", async () => {
    const { status, dados } = await enviar(fx.tokenValido, {
      turnstileToken: "x",
      consentimento: true,
      itens: [], // a pergunta obrigatória não foi respondida
    });
    expect(status).toBe(400);
    expect(dados.erro).toMatch(/obrigatória/i);
  });

  it("opção fora do conjunto permitido → 400", async () => {
    const { status, dados } = await enviar(fx.tokenValido, {
      turnstileToken: "x",
      consentimento: true,
      itens: [
        { perguntaId: fx.perguntaObrigatoriaId, valorTexto: "Maria" },
        { perguntaId: fx.perguntaUnicaId, valorTexto: "opcao-que-nao-existe" },
      ],
    });
    expect(status).toBe(400);
    expect(dados.erro).toMatch(/opção inválida/i);
  });

  it("resposta válida → 201 e grava de verdade", async () => {
    const { status, dados } = await enviar(fx.tokenValido, {
      turnstileToken: "x",
      consentimento: true,
      itens: [
        { perguntaId: fx.perguntaObrigatoriaId, valorTexto: "Maria" },
        { perguntaId: fx.perguntaUnicaId, valorTexto: "a" },
      ],
    });
    expect(status).toBe(201);
    expect(dados.ok).toBe(true);
    expect(typeof dados.respostaId).toBe("string");
  });

  it("depois da resposta válida, o link esgotado com max_usos=1 barra a próxima", async () => {
    // tokenEsgotado já tinha usos=1/max=1 desde o início — reforça que o
    // enforcement é atômico na própria escrita, não só na leitura inicial.
    const { status } = await enviar(fx.tokenEsgotado, {
      turnstileToken: "x",
      consentimento: true,
      itens: [{ perguntaId: fx.perguntaObrigatoriaId, valorTexto: "Outra pessoa" }],
    });
    expect(status).toBe(404);
  });
});
