import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GerenciadorLinks } from "@/components/admin/GerenciadorLinks";
import { buscarPesquisaParaEditor, listarLinksDaPesquisa } from "@/lib/db/queries/pesquisas-admin";

export const metadata: Metadata = {
  title: "Links da pesquisa",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function LinksPesquisaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const dados = await buscarPesquisaParaEditor(id);
  if (!dados) notFound();

  const links = await listarLinksDaPesquisa(id);

  return (
    <div className="flex flex-col gap-bloco-interno">
      <h1 className="font-display text-h2-mobile font-semibold text-branco-frio">
        Links — {dados.pesquisa.titulo}
      </h1>
      <GerenciadorLinks pesquisaId={id} linksIniciais={links} />
    </div>
  );
}
