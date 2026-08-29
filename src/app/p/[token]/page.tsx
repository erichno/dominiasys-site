import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buscarPesquisaPublicaPorToken } from "@/lib/db/queries/pesquisas";
import { FormularioPesquisa } from "@/components/pesquisa/FormularioPesquisa";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function PesquisaPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const dados = await buscarPesquisaPublicaPorToken(token);

  if (!dados) {
    notFound();
  }

  return (
    <FormularioPesquisa
      token={token}
      pesquisa={{ titulo: dados.pesquisa.titulo, descricao: dados.pesquisa.descricao }}
      perguntas={dados.perguntas}
    />
  );
}
