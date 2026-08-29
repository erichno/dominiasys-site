"use client";

import { MalhaDeDados } from "@/components/brand/MalhaDeDados";
import { Button } from "@/components/ui/Button";
import { useReveal } from "@/hooks/useReveal";
import { whatsappHref } from "@/lib/agendar";
import servicos from "@/content/servicos";

const diagnostico = servicos.find(
  (servico) => servico.slug === "diagnostico-de-maturidade-em-ia",
)!;

// Copy literal da seção 6, subseção 6 (Bloco do Diagnóstico) — a lista de
// entregáveis aqui usa a redação da spec para esta faixa, diferente (mais
// detalhada) da versão resumida em content/servicos.ts usada nos cards.
const ENTREGAVEIS = [
  "Nota de maturidade por dimensão: dados, processos, pessoas, tecnologia e governança",
  "10 a 15 oportunidades mapeadas e ordenadas por impacto e esforço",
  "Estimativa de retorno das 3 principais",
  "Roadmap de 90 dias com responsável e critério de sucesso",
  "Apresentação executiva de 60 min para a diretoria",
];

export function BlocoDiagnostico() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="reveal relative overflow-hidden bg-surface-700 px-6 py-secao-mobile sm:py-secao-desktop"
    >
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px] bg-grad-marca" />
      <MalhaDeDados
        className="hidden text-azul-celeste lg:block"
        opacidade={0.08}
        mascara="linear-gradient(to bottom, black 0%, transparent 18%, transparent 82%, black 100%)"
      />

      <div className="relative z-10 mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <p className="font-display text-eyebrow uppercase tracking-[.24em] text-azul-celeste">
            Comece por aqui
          </p>
          <h2 className="mt-4 font-display text-h2-mobile font-semibold text-branco-frio sm:text-h2">
            Diagnóstico de Maturidade em IA
          </h2>
          <p className="mt-4 max-w-leitura text-corpo-mobile text-cinza-prata sm:text-corpo">
            Em duas semanas você recebe um retrato honesto de onde sua empresa está e um plano de
            90 dias do que fazer primeiro. Escopo fixo, prazo fixo, preço fixo. Se você contratar
            um projeto de execução em até 60 dias, o valor do diagnóstico é abatido integralmente.
          </p>

          <p className="mt-6 text-sm text-cinza-prata">
            2 semanas · reunião de imersão de 90 min · 3 a 5 entrevistas · a partir de R$ 4.500
          </p>

          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Button href="/diagnostico">{diagnostico.cta}</Button>
            <Button
              href={whatsappHref("Tenho uma dúvida sobre o Diagnóstico de Maturidade em IA.")}
              variant="tertiary"
            >
              Tirar uma dúvida antes
            </Button>
          </div>
        </div>

        <div className="rounded-card border border-branco-frio/[0.06] bg-surface-800 p-padding-card">
          <ul className="space-y-4">
            {ENTREGAVEIS.map((item) => (
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
      </div>
    </section>
  );
}
