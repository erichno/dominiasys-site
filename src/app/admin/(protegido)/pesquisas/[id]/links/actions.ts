"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { pesquisaLinks } from "@/lib/db/schema";
import { requererAdmin } from "@/lib/admin-auth";
import { invalidarCacheLink } from "@/lib/db/queries/pesquisas-admin";
import { gerarToken } from "@/lib/tokens";

interface CriarLinkInput {
  rotulo: string;
  origem: string | null;
  expiraEm: string | null;
  maxUsos: number | null;
}

export async function criarLink(pesquisaId: string, dados: CriarLinkInput) {
  await requererAdmin();

  const rotulo = dados.rotulo.trim();
  if (!rotulo) throw new Error("Informe um rótulo.");

  await db.insert(pesquisaLinks).values({
    id: randomUUID(),
    pesquisaId,
    token: gerarToken(),
    rotulo,
    origem: dados.origem || null,
    expiraEm: dados.expiraEm ? new Date(dados.expiraEm) : null,
    maxUsos: dados.maxUsos,
  });

  revalidatePath(`/admin/pesquisas/${pesquisaId}/links`);
}

export async function desativarLink(pesquisaId: string, linkId: string, token: string) {
  await requererAdmin();

  await db.update(pesquisaLinks).set({ ativo: false }).where(eq(pesquisaLinks.id, linkId));
  await invalidarCacheLink(token);

  revalidatePath(`/admin/pesquisas/${pesquisaId}/links`);
}

export async function reativarLink(pesquisaId: string, linkId: string) {
  await requererAdmin();

  await db.update(pesquisaLinks).set({ ativo: true }).where(eq(pesquisaLinks.id, linkId));

  revalidatePath(`/admin/pesquisas/${pesquisaId}/links`);
}
