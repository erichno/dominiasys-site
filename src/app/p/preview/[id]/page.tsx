import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { usuarios } from "@/lib/db/schema";
import { buscarPesquisaParaPreview } from "@/lib/db/queries/pesquisas-admin";
import { FormularioPesquisa } from "@/components/pesquisa/FormularioPesquisa";

export const metadata: Metadata = {
  title: "Pré-visualização",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

/**
 * Fora de /admin, então o middleware não protege esta rota — reverifica
 * sessão + usuário ativo direto aqui. Nunca grava resposta: ver o modo
 * preview de FormularioPesquisa.
 */
export default async function PreviewPesquisaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const session = await auth();
  const usuarioId = session?.user?.id;
  if (!usuarioId) redirect(`/admin/login?callbackUrl=/p/preview/${id}`);

  const [usuario] = await db
    .select({ ativo: usuarios.ativo })
    .from(usuarios)
    .where(eq(usuarios.id, usuarioId))
    .limit(1);
  if (!usuario?.ativo) redirect(`/admin/login?callbackUrl=/p/preview/${id}`);

  const dados = await buscarPesquisaParaPreview(id);
  if (!dados) notFound();

  return (
    <div className="mx-auto w-full max-w-[720px]">
      <div className="mb-4 rounded-card border border-azul-celeste/30 bg-azul-celeste/[0.08] px-4 py-3 text-center">
        <p className="font-display text-sm font-medium text-branco-frio">Pré-visualização</p>
        <p className="mt-1 text-sm text-cinza-prata">
          Nada aqui é gravado. Esta tela é só para você conferir o formulário.
        </p>
      </div>
      <FormularioPesquisa
        token=""
        pesquisa={{ titulo: dados.pesquisa.titulo, descricao: dados.pesquisa.descricao }}
        perguntas={dados.perguntas}
        preview
      />
    </div>
  );
}
