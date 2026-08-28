import { MalhaDeDados } from "@/components/brand/MalhaDeDados";
import { Button } from "@/components/ui/Button";
import { agendarHref, whatsappHref } from "@/lib/agendar";
import { formatarMoeda } from "@/lib/moeda";
import servicos from "@/content/servicos";

const diagnostico = servicos.find(
  (servico) => servico.slug === "diagnostico-de-maturidade-em-ia",
)!;

export function BlocoDiagnostico() {
  return (
    <section className="relative overflow-hidden bg-surface-700 px-6 py-secao-mobile sm:py-secao-desktop">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px] bg-grad-marca" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden text-azul-celeste opacity-[0.08] lg:block"
        style={{
          maskImage:
            "linear-gradient(to bottom, black 0%, transparent 18%, transparent 82%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, transparent 18%, transparent 82%, black 100%)",
        }}
      >
        <MalhaDeDados className="h-full w-full" />
      </div>

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
            2 semanas · reunião de imersão de 90 min · 3 a 5 entrevistas · a partir de{" "}
            {formatarMoeda(diagnostico.faixaPreco.min)}
          </p>

          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Button href={agendarHref()}>{diagnostico.cta}</Button>
            <Button
              href={whatsappHref("Tenho uma dúvida sobre o Diagnóstico de Maturidade em IA.")}
              variant="tertiary"
            >
              Tirar uma dúvida antes
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-micro ease-marca group-hover:translate-x-1"
              >
                →
              </span>
            </Button>
          </div>
        </div>

        <div className="rounded-card border border-branco-frio/[0.06] bg-surface-800 p-padding-card">
          <ul className="space-y-4">
            {diagnostico.entregaveis.map((item) => (
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
