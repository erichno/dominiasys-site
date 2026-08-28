"use client";

import { useState, type MouseEvent } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SidePanel } from "@/components/ui/SidePanel";
import { Tabs } from "@/components/ui/Tabs";
import { agendarHref } from "@/lib/agendar";
import { formatarMoeda } from "@/lib/moeda";
import servicos, { type Pilar, type Servico } from "@/content/servicos";

const tabs = [
  { value: "formar", label: "Formar" },
  { value: "direcionar", label: "Direcionar" },
  { value: "construir", label: "Construir" },
];

function formatarFaixaPreco(servico: Servico) {
  const { min, max, unidade } = servico.faixaPreco;
  const faixa = min === max ? formatarMoeda(min) : `${formatarMoeda(min)} a ${formatarMoeda(max)}`;
  return unidade ? `${faixa} · ${unidade}` : faixa;
}

export function Servicos() {
  const [pilarAtivo, setPilarAtivo] = useState<Pilar>("direcionar");
  const [servicoAberto, setServicoAberto] = useState<Servico | null>(null);
  const [gatilho, setGatilho] = useState<HTMLButtonElement | null>(null);

  const servicosDoPilar = servicos.filter((servico) => servico.pilar === pilarAtivo);

  function abrirPainel(servico: Servico, event: MouseEvent<HTMLButtonElement>) {
    setGatilho(event.currentTarget);
    setServicoAberto(servico);
  }

  function fecharPainel() {
    setServicoAberto(null);
    gatilho?.focus();
  }

  return (
    <section id="servicos" className="bg-surface-800 px-6 py-secao-mobile sm:py-secao-desktop">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-[640px] text-center">
          <p className="font-display text-eyebrow uppercase tracking-[.24em] text-azul-celeste">
            Serviços
          </p>
          <h2 className="mt-4 font-display text-h2-mobile font-semibold text-branco-frio sm:text-h2">
            Nove formas de entrar, um só caminho
          </h2>
          <p className="mt-4 text-corpo-mobile text-cinza-prata sm:text-corpo">
            Cada serviço resolve um estágio diferente. Se você não sabe qual é o seu, comece pelo
            diagnóstico.
          </p>
        </div>

        <div className="mt-bloco-interno flex justify-center">
          <Tabs
            tabs={tabs}
            value={pilarAtivo}
            onChange={(value) => setPilarAtivo(value as Pilar)}
          />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {servicosDoPilar.map((servico) => (
            <div
              key={servico.slug}
              className={servico.destaque ? "h-full rounded-card bg-grad-marca p-px" : "h-full"}
            >
              <Card className="relative flex h-full flex-col">
                {servico.destaque && (
                  <Badge variant="destaque" className="absolute -top-3 left-6">
                    Comece por aqui
                  </Badge>
                )}
                <h3 className="font-display text-h3-mobile font-medium text-branco-frio sm:text-h3">
                  {servico.nome}
                </h3>
                <p className="mt-2 text-corpo-mobile text-cinza-prata sm:text-corpo">
                  {servico.linhaUnica}
                </p>
                <dl className="mt-4 space-y-1 text-sm text-cinza-prata">
                  <div className="flex gap-2">
                    <dt className="text-branco-frio/70">Formato:</dt>
                    <dd>{servico.formato}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-branco-frio/70">Duração:</dt>
                    <dd>{servico.duracao}</dd>
                  </div>
                </dl>
                <button
                  type="button"
                  onClick={(event) => abrirPainel(servico, event)}
                  className="mt-auto pt-6 text-left font-display text-sm font-medium text-azul-celeste hover:underline"
                >
                  Ver detalhes →
                </button>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <SidePanel open={servicoAberto !== null} onClose={fecharPainel} title={servicoAberto?.nome ?? ""}>
        {servicoAberto && (
          <div className="space-y-6">
            <p className="text-corpo-mobile text-cinza-prata sm:text-corpo">
              {servicoAberto.promessa}
            </p>

            <div>
              <p className="font-display text-eyebrow uppercase tracking-[.24em] text-azul-celeste">
                Para quem
              </p>
              <p className="mt-2 text-corpo-mobile text-cinza-prata sm:text-corpo">
                {servicoAberto.paraQuem}
              </p>
            </div>

            <div>
              <p className="font-display text-eyebrow uppercase tracking-[.24em] text-azul-celeste">
                Entregáveis
              </p>
              <ul className="mt-3 space-y-2">
                {servicoAberto.entregaveis.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-corpo-mobile text-cinza-prata sm:text-corpo"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-azul-celeste"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-card border border-branco-frio/[0.06] bg-surface-700 p-padding-card">
              <p className="text-sm text-cinza-prata">
                {servicoAberto.formato} · {servicoAberto.duracao}
              </p>
              {servicoAberto.exibirPreco && (
                <p className="mt-2 font-display text-h3-mobile font-medium text-branco-frio">
                  {formatarFaixaPreco(servicoAberto)}
                </p>
              )}
              {servicoAberto.observacao && (
                <p className="mt-2 text-sm text-cinza-prata">{servicoAberto.observacao}</p>
              )}
            </div>

            <Button href={agendarHref()} className="w-full">
              {servicoAberto.cta}
            </Button>
          </div>
        )}
      </SidePanel>
    </section>
  );
}
