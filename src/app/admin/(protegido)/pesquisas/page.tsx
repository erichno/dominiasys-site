import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { FormularioNovaPesquisa } from "@/components/admin/FormularioNovaPesquisa";
import { AcoesPesquisa } from "@/components/admin/AcoesPesquisa";
import { listarPesquisas } from "@/lib/db/queries/pesquisas-admin";

export const metadata: Metadata = {
  title: "Pesquisas",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const STATUS_ROTULOS: Record<string, string> = {
  rascunho: "Rascunho",
  ativa: "Ativa",
  encerrada: "Encerrada",
};

function formatarData(data: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(data);
}

export default async function PesquisasPage() {
  const pesquisas = await listarPesquisas();

  return (
    <div className="flex flex-col gap-bloco-interno">
      <h1 className="font-display text-h2-mobile font-semibold text-branco-frio">Pesquisas</h1>

      <Card className="hover:translate-y-0 hover:border-branco-frio/[0.06] hover:shadow-none">
        <FormularioNovaPesquisa />
      </Card>

      {pesquisas.length === 0 ? (
        <p className="text-corpo-mobile text-cinza-prata">
          Nenhuma pesquisa criada ainda. Comece pela pesquisa de expectativa de curso.
        </p>
      ) : (
        <Card className="hover:translate-y-0 hover:border-branco-frio/[0.06] hover:shadow-none">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-branco-frio/[0.06] text-cinza-prata">
                  <th className="py-2 pr-4 font-display font-medium">Título</th>
                  <th className="py-2 pr-4 font-display font-medium">Status</th>
                  <th className="py-2 pr-4 font-display font-medium">Perguntas</th>
                  <th className="py-2 pr-4 font-display font-medium">Respostas</th>
                  <th className="py-2 pr-4 font-display font-medium">Links ativos</th>
                  <th className="py-2 pr-4 font-display font-medium">Criada em</th>
                  <th className="py-2 font-display font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {pesquisas.map((pesquisa) => (
                  <tr key={pesquisa.id} className="border-b border-branco-frio/[0.03] last:border-b-0">
                    <td className="py-3 pr-4 text-branco-frio">{pesquisa.titulo}</td>
                    <td className="py-3 pr-4 text-cinza-prata">{STATUS_ROTULOS[pesquisa.status]}</td>
                    <td className="py-3 pr-4 text-cinza-prata">{pesquisa.totalPerguntas}</td>
                    <td className="py-3 pr-4 text-cinza-prata">{pesquisa.totalRespostas}</td>
                    <td className="py-3 pr-4 text-cinza-prata">{pesquisa.linksAtivos}</td>
                    <td className="py-3 pr-4 text-cinza-prata">{formatarData(pesquisa.criadoEm)}</td>
                    <td className="py-3">
                      <AcoesPesquisa pesquisa={pesquisa} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
