import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import {
  buscarMetricasDashboard,
  buscarPesquisasAtivasComContagem,
  buscarTopTemas,
  buscarUltimasRespostas,
  haAlgumaResposta,
} from "@/lib/db/queries/dashboard";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

function CartaoMetrica({ rotulo, valor }: { rotulo: string; valor: string | number }) {
  return (
    <Card className="hover:translate-y-0 hover:border-branco-frio/[0.06] hover:shadow-none">
      <p className="font-display text-h2-mobile font-semibold text-branco-frio">{valor}</p>
      <p className="mt-1 text-sm text-cinza-prata">{rotulo}</p>
    </Card>
  );
}

function formatarData(data: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(data);
}

export default async function DashboardPage() {
  const temRespostas = await haAlgumaResposta();

  if (!temRespostas) {
    return (
      <div>
        <h1 className="font-display text-h2-mobile font-semibold text-branco-frio">Dashboard</h1>
        <p className="mt-6 text-corpo-mobile text-cinza-prata">
          Nenhuma resposta ainda. Crie uma pesquisa e gere o primeiro link.
        </p>
      </div>
    );
  }

  const [metricas, topTemas, pesquisasAtivas, ultimasRespostas] = await Promise.all([
    buscarMetricasDashboard(),
    buscarTopTemas(5),
    buscarPesquisasAtivasComContagem(),
    buscarUltimasRespostas(10),
  ]);

  const maiorTema = topTemas[0]?.total ?? 1;

  return (
    <div className="flex flex-col gap-bloco-interno">
      <h1 className="font-display text-h2-mobile font-semibold text-branco-frio">Dashboard</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <CartaoMetrica rotulo="Respostas nos últimos 7 dias" valor={metricas.respostas7dias} />
        <CartaoMetrica rotulo="Respostas nos últimos 30 dias" valor={metricas.respostas30dias} />
        <CartaoMetrica rotulo="Taxa de conclusão" valor={`${metricas.taxaConclusao}%`} />
        <CartaoMetrica rotulo="Leads novos (7 dias)" valor={metricas.leadsNovos} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="hover:translate-y-0 hover:border-branco-frio/[0.06] hover:shadow-none">
          <h2 className="font-display text-h3-mobile font-medium text-branco-frio">
            Top 5 temas mais votados
          </h2>
          {topTemas.length === 0 ? (
            <p className="mt-4 text-sm text-cinza-prata">
              Nenhuma pergunta de única ou múltipla escolha foi respondida ainda.
            </p>
          ) : (
            <ul className="mt-4 flex flex-col gap-3">
              {topTemas.map((tema) => (
                <li key={tema.rotulo}>
                  <div className="flex justify-between text-sm text-cinza-prata">
                    <span>{tema.rotulo}</span>
                    <span>{tema.total}</span>
                  </div>
                  <div className="mt-1 h-2 w-full overflow-hidden rounded-tag bg-surface-600">
                    <div
                      className="h-full rounded-tag bg-grad-marca"
                      style={{ width: `${(tema.total / maiorTema) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className="hover:translate-y-0 hover:border-branco-frio/[0.06] hover:shadow-none">
          <h2 className="font-display text-h3-mobile font-medium text-branco-frio">
            Pesquisas ativas
          </h2>
          {pesquisasAtivas.length === 0 ? (
            <p className="mt-4 text-sm text-cinza-prata">Nenhuma pesquisa ativa no momento.</p>
          ) : (
            <ul className="mt-4 flex flex-col gap-3">
              {pesquisasAtivas.map((pesquisa) => (
                <li
                  key={pesquisa.id}
                  className="flex items-center justify-between border-b border-branco-frio/[0.06] pb-3 last:border-b-0 last:pb-0"
                >
                  <span className="text-corpo-mobile text-branco-frio">{pesquisa.titulo}</span>
                  <span className="text-sm text-cinza-prata">
                    {pesquisa.totalRespostas}{" "}
                    {pesquisa.totalRespostas === 1 ? "resposta" : "respostas"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <Card className="hover:translate-y-0 hover:border-branco-frio/[0.06] hover:shadow-none">
        <h2 className="font-display text-h3-mobile font-medium text-branco-frio">
          Últimas 10 respostas
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-branco-frio/[0.06] text-cinza-prata">
                <th className="py-2 pr-4 font-display font-medium">Pesquisa</th>
                <th className="py-2 pr-4 font-display font-medium">Link</th>
                <th className="py-2 pr-4 font-display font-medium">Recebida em</th>
                <th className="py-2 font-display font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {ultimasRespostas.map((resposta) => (
                <tr key={resposta.id} className="border-b border-branco-frio/[0.03] last:border-b-0">
                  <td className="py-2 pr-4 text-branco-frio">{resposta.pesquisaTitulo}</td>
                  <td className="py-2 pr-4 text-cinza-prata">{resposta.linkRotulo ?? "—"}</td>
                  <td className="py-2 pr-4 text-cinza-prata">
                    {formatarData(resposta.iniciadaEm)}
                  </td>
                  <td className="py-2 text-cinza-prata">
                    {resposta.concluida ? "Concluída" : "Abandonada"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
