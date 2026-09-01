"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { perguntas, pesquisas } from "@/lib/db/schema";
import { requererAdmin } from "@/lib/admin-auth";
import { invalidarCachePesquisa, pesquisaTemResposta } from "@/lib/db/queries/pesquisas-admin";

interface AtualizacaoPesquisa {
  titulo: string;
  descricao: string | null;
  cursoId: string | null;
  status: "rascunho" | "ativa" | "encerrada";
  mensagemFinal: string | null;
}

export async function atualizarPesquisa(pesquisaId: string, dados: AtualizacaoPesquisa) {
  await requererAdmin();

  await db
    .update(pesquisas)
    .set({
      titulo: dados.titulo,
      descricao: dados.descricao,
      cursoId: dados.cursoId,
      status: dados.status,
      mensagemFinal: dados.mensagemFinal,
      atualizadoEm: new Date(),
    })
    .where(eq(pesquisas.id, pesquisaId));

  await invalidarCachePesquisa(pesquisaId);
  revalidatePath(`/admin/pesquisas/${pesquisaId}`);
  revalidatePath("/admin/pesquisas");
}

export async function criarPergunta(pesquisaId: string) {
  await requererAdmin();

  const existentes = await db
    .select({ ordem: perguntas.ordem })
    .from(perguntas)
    .where(eq(perguntas.pesquisaId, pesquisaId));

  const proximaOrdem = existentes.reduce((maior, pergunta) => Math.max(maior, pergunta.ordem), 0) + 1;

  await db.insert(perguntas).values({
    id: randomUUID(),
    pesquisaId,
    ordem: proximaOrdem,
    tipo: "texto",
    enunciado: "Nova pergunta",
    obrigatoria: false,
  });

  await invalidarCachePesquisa(pesquisaId);
  revalidatePath(`/admin/pesquisas/${pesquisaId}`);
  revalidatePath("/admin/pesquisas");
}

interface AtualizacaoPergunta {
  enunciado: string;
  ajuda: string | null;
  obrigatoria: boolean;
  tipo: (typeof perguntas.$inferInsert)["tipo"];
  opcoes: unknown;
}

/**
 * Trava de integridade: pesquisa com resposta registrada só aceita mudança
 * de enunciado. Os outros campos do payload são ignorados em silêncio — a
 * UI já os deixa desabilitados, isto é só a reverificação do lado do
 * servidor, a fonte de verdade de verdade.
 */
export async function atualizarPergunta(
  pesquisaId: string,
  perguntaId: string,
  dados: AtualizacaoPergunta,
) {
  await requererAdmin();

  const travada = await pesquisaTemResposta(pesquisaId);

  if (travada) {
    await db
      .update(perguntas)
      .set({ enunciado: dados.enunciado })
      .where(eq(perguntas.id, perguntaId));
  } else {
    await db
      .update(perguntas)
      .set({
        enunciado: dados.enunciado,
        ajuda: dados.ajuda,
        obrigatoria: dados.obrigatoria,
        tipo: dados.tipo,
        opcoes: dados.opcoes,
      })
      .where(eq(perguntas.id, perguntaId));
  }

  await invalidarCachePesquisa(pesquisaId);
  revalidatePath(`/admin/pesquisas/${pesquisaId}`);
}

export async function excluirPergunta(pesquisaId: string, perguntaId: string) {
  await requererAdmin();

  const travada = await pesquisaTemResposta(pesquisaId);
  if (travada) {
    throw new Error("Pesquisa já tem resposta registrada — não é possível apagar pergunta.");
  }

  await db.delete(perguntas).where(eq(perguntas.id, perguntaId));

  await invalidarCachePesquisa(pesquisaId);
  revalidatePath(`/admin/pesquisas/${pesquisaId}`);
}

export async function reordenarPerguntas(pesquisaId: string, ordemIds: string[]) {
  await requererAdmin();

  await db.transaction(async (tx) => {
    // Duas passadas: a unique(pesquisa_id, ordem) rejeitaria uma troca
    // direta de posição entre duas perguntas.
    for (const [indice, id] of ordemIds.entries()) {
      await tx.update(perguntas).set({ ordem: -(indice + 1) }).where(eq(perguntas.id, id));
    }
    for (const [indice, id] of ordemIds.entries()) {
      await tx.update(perguntas).set({ ordem: indice + 1 }).where(eq(perguntas.id, id));
    }
  });

  await invalidarCachePesquisa(pesquisaId);
  revalidatePath(`/admin/pesquisas/${pesquisaId}`);
}
