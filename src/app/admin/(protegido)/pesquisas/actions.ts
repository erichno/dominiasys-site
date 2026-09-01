"use server";

import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { perguntas, pesquisas } from "@/lib/db/schema";
import { requererAdmin } from "@/lib/admin-auth";

export async function criarPesquisa(_estadoAnterior: string | undefined, formData: FormData) {
  await requererAdmin();

  const titulo = String(formData.get("titulo") ?? "").trim();
  if (!titulo) return "Informe um título.";

  const [pesquisa] = await db
    .insert(pesquisas)
    .values({ id: randomUUID(), titulo, status: "rascunho" })
    .returning({ id: pesquisas.id });

  revalidatePath("/admin/pesquisas");
  redirect(`/admin/pesquisas/${pesquisa.id}`);
}

export async function duplicarPesquisa(pesquisaId: string) {
  await requererAdmin();

  const [original] = await db.select().from(pesquisas).where(eq(pesquisas.id, pesquisaId)).limit(1);
  if (!original) throw new Error("Pesquisa não encontrada.");

  const perguntasOriginais = await db
    .select()
    .from(perguntas)
    .where(eq(perguntas.pesquisaId, pesquisaId));

  const novaId = randomUUID();

  // Copia perguntas — nunca links nem respostas, exatamente como a spec pede.
  await db.insert(pesquisas).values({
    id: novaId,
    titulo: `${original.titulo} (cópia)`,
    descricao: original.descricao,
    cursoId: original.cursoId,
    status: "rascunho",
    mensagemFinal: original.mensagemFinal,
  });

  if (perguntasOriginais.length > 0) {
    await db.insert(perguntas).values(
      perguntasOriginais.map((pergunta) => ({
        id: randomUUID(),
        pesquisaId: novaId,
        ordem: pergunta.ordem,
        tipo: pergunta.tipo,
        enunciado: pergunta.enunciado,
        ajuda: pergunta.ajuda,
        obrigatoria: pergunta.obrigatoria,
        opcoes: pergunta.opcoes,
      })),
    );
  }

  revalidatePath("/admin/pesquisas");
}

export async function ativarPesquisa(pesquisaId: string) {
  await requererAdmin();
  await db.update(pesquisas).set({ status: "ativa" }).where(eq(pesquisas.id, pesquisaId));
  revalidatePath("/admin/pesquisas");
}

export async function encerrarPesquisa(pesquisaId: string) {
  await requererAdmin();
  await db.update(pesquisas).set({ status: "encerrada" }).where(eq(pesquisas.id, pesquisaId));
  revalidatePath("/admin/pesquisas");
}
