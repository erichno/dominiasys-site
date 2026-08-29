import type { Metadata } from "next";
import { FormularioDiagnostico } from "@/components/diagnostico/FormularioDiagnostico";
import { whatsappHref } from "@/lib/agendar";
import servicos from "@/content/servicos";

const diagnostico = servicos.find(
  (servico) => servico.slug === "diagnostico-de-maturidade-em-ia",
)!;

export const metadata: Metadata = {
  title: { absolute: "Diagnóstico de Maturidade em IA – DOMINIA" },
  description:
    "Em 2 semanas, saiba onde a IA gera retorno na sua empresa. Nota de maturidade, oportunidades priorizadas e roadmap de 90 dias. Escopo e preço fixos.",
  alternates: { canonical: "/diagnostico" },
};

export default function DiagnosticoPage() {
  return (
    <section className="bg-grad-fundo px-6 py-secao-mobile sm:py-secao-desktop">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
        <div>
          <p className="font-display text-eyebrow uppercase tracking-[.24em] text-azul-celeste">
            Comece por aqui
          </p>
          <h1 className="mt-4 font-display text-h1-mobile font-semibold text-branco-frio sm:text-h1">
            {diagnostico.nome}
          </h1>
          <p className="mt-6 max-w-leitura text-corpo-mobile text-cinza-prata sm:text-corpo">
            {diagnostico.promessa}
          </p>

          <ul className="mt-8 max-w-leitura space-y-3">
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

          <p className="mt-8 text-sm text-cinza-prata">
            Prefere conversar direto?{" "}
            <a
              href={whatsappHref("Quero contratar o Diagnóstico de Maturidade em IA.")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-azul-celeste hover:underline"
            >
              Falar no WhatsApp
            </a>
            .
          </p>
        </div>

        <div className="rounded-card border border-branco-frio/[0.06] bg-surface-700 p-padding-card">
          <FormularioDiagnostico />
        </div>
      </div>
    </section>
  );
}
