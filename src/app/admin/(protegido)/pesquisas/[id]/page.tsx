import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { EditorCabecalho } from "@/components/admin/EditorCabecalho";
import { EditorPerguntas } from "@/components/admin/EditorPerguntas";
import { buscarPesquisaParaEditor, pesquisaTemResposta } from "@/lib/db/queries/pesquisas-admin";

export const metadata: Metadata = {
  title: "Editor de pesquisa",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function EditorPesquisaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const dados = await buscarPesquisaParaEditor(id);
  if (!dados) notFound();

  const travaAtiva = await pesquisaTemResposta(id);

  return (
    <div className="flex flex-col gap-bloco-interno">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-h2-mobile font-semibold text-branco-frio">
          {dados.pesquisa.titulo}
        </h1>
        <div className="flex gap-3">
          <Button
            href={`/p/preview/${id}`}
            variant="secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pré-visualizar
          </Button>
          <Button href={`/admin/pesquisas/${id}/links`} variant="secondary">
            Ver links
          </Button>
        </div>
      </div>

      <EditorCabecalho pesquisa={dados.pesquisa} cursos={dados.cursos} />

      <div>
        <h2 className="font-display text-h3-mobile font-medium text-branco-frio">Perguntas</h2>
        <div className="mt-4">
          <EditorPerguntas
            pesquisaId={id}
            perguntasIniciais={dados.perguntas}
            travaAtiva={travaAtiva}
          />
        </div>
      </div>
    </div>
  );
}
