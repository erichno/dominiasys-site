"use client";

import { useReveal } from "@/hooks/useReveal";
import { paraQuemNao, paraQuemSim, paraQuemTitulo } from "@/content/paraQuem";

export function ParaQuem() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="reveal bg-surface-800 px-6 py-secao-mobile sm:py-secao-desktop"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="mx-auto max-w-[640px] text-center font-display text-h2-mobile font-semibold text-branco-frio sm:text-h2">
          {paraQuemTitulo}
        </h2>

        <div className="mt-bloco-interno grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h3 className="font-display text-h3-mobile font-medium text-branco-frio sm:text-h3">
              {paraQuemSim.titulo}
            </h3>
            <ul className="mt-6 space-y-4">
              {paraQuemSim.itens.map((item) => (
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

          <div className="opacity-70">
            <h3 className="font-display text-h3-mobile font-medium text-cinza-prata sm:text-h3">
              {paraQuemNao.titulo}
            </h3>
            <ul className="mt-6 space-y-4">
              {paraQuemNao.itens.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-corpo-mobile text-cinza-prata sm:text-corpo"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cinza-prata"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
