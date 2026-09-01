import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buscarPesquisaParaEditor } from "@/lib/db/queries/pesquisas-admin";

export const metadata: Metadata = {
  title: "Respostas",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

// Tabela paginada, filtros e a aba de agregado são tarefa própria — esta
// tela existe só pra "ver respostas deste link" não levar a um 404.
export default async function RespostasPesquisaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const dados = await buscarPesquisaParaEditor(id);
  if (!dados) notFound();

  return (
    <div>
      <h1 className="font-display text-h2-mobile font-semibold text-branco-frio">
        Respostas — {dados.pesquisa.titulo}
      </h1>
      <p className="mt-6 text-corpo-mobile text-cinza-prata">Em construção.</p>
    </div>
  );
}
