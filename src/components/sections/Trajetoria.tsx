"use client";

import { useReveal } from "@/hooks/useReveal";
import empresa from "@/content/empresa";
import {
  numerosTrajetoria,
  trajetoriaEyebrow,
  trajetoriaFormacao,
  trajetoriaParagrafos,
} from "@/content/trajetoria";

export function Trajetoria() {
  const ref = useReveal<HTMLElement>();
  const iniciais = empresa.fundador.nome
    .split(" ")
    .map((parte) => parte[0])
    .join("");

  return (
    <section
      ref={ref}
      id="trajetoria"
      className="reveal bg-surface-900 px-6 py-secao-mobile sm:py-secao-desktop"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[360px_1fr] lg:items-start lg:gap-16">
          <div
            role="img"
            aria-label={`Retrato de ${empresa.fundador.nome}`}
            className="relative mx-auto flex aspect-[3/4] w-full max-w-[320px] items-center justify-center overflow-hidden rounded-card bg-grad-fundo lg:mx-0"
          >
            <span className="font-display text-6xl font-semibold text-azul-celeste/25">
              {iniciais}
            </span>
          </div>

          <div>
            <p className="font-display text-eyebrow uppercase tracking-[.24em] text-azul-celeste">
              {trajetoriaEyebrow}
            </p>
            <h2 className="mt-4 font-display text-h2-mobile font-semibold text-branco-frio sm:text-h2">
              {empresa.fundador.nome}
            </h2>

            <div className="mt-6 max-w-leitura space-y-4">
              {trajetoriaParagrafos.map((paragrafo) => (
                <p key={paragrafo} className="text-corpo-mobile text-cinza-prata sm:text-corpo">
                  {paragrafo}
                </p>
              ))}
            </div>

            <p className="mt-6 font-display text-sm text-cinza-prata">{trajetoriaFormacao}</p>
          </div>
        </div>

        <div className="mt-bloco-interno grid grid-cols-2 gap-8 border-t border-surface-600 pt-bloco-interno sm:grid-cols-4">
          {numerosTrajetoria.map((item) => (
            <div key={item.rotulo}>
              <p className="font-display text-h2-mobile font-semibold text-branco-frio sm:text-h2">
                {item.numero}
              </p>
              <p className="mt-1 text-sm text-cinza-prata">{item.rotulo}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
