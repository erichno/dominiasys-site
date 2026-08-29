"use client";

import { useReveal } from "@/hooks/useReveal";
import servicos from "@/content/servicos";
import pilares, {
  pilaresEyebrow,
  pilaresTitulo,
  pilaresSubtitulo,
} from "@/content/pilares";

export function Pilares() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="reveal bg-surface-900 px-6 py-secao-mobile sm:py-secao-desktop"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-[640px] text-center">
          <p className="font-display text-eyebrow uppercase tracking-[.24em] text-azul-celeste">
            {pilaresEyebrow}
          </p>
          <h2 className="mt-4 font-display text-h2-mobile font-semibold text-branco-frio sm:text-h2">
            {pilaresTitulo}
          </h2>
          <p className="mt-4 max-w-leitura text-corpo-mobile text-cinza-prata sm:text-corpo">
            {pilaresSubtitulo}
          </p>
        </div>

        <div className="relative mt-bloco-interno">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-24 hidden h-px origin-left rotate-[18deg] bg-gradient-to-r from-transparent via-azul-celeste/30 to-transparent md:block"
          />

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
            {pilares.map((pilar) => {
              const nomesDosServicos = pilar.servicosIds
                .map((id) => servicos.find((servico) => servico.id === id)?.nome)
                .filter(Boolean);

              return (
                <div key={pilar.chave} className="relative z-10">
                  <span className="font-display text-h3-mobile font-semibold text-azul-celeste sm:text-h3">
                    {pilar.numero}
                  </span>
                  <h3 className="mt-3 font-display text-h3-mobile font-medium text-branco-frio sm:text-h3">
                    {pilar.nome}
                  </h3>
                  <p className="mt-1 font-display text-sm text-cinza-prata">{pilar.umaLinha}</p>
                  <p className="mt-3 text-corpo-mobile text-cinza-prata sm:text-corpo">
                    {pilar.descricao}
                  </p>
                  <p className="mt-4 text-sm text-azul-celeste">
                    {nomesDosServicos.join(" · ")}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
