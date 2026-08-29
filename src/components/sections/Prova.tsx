"use client";

import { Card } from "@/components/ui/Card";
import { useReveal } from "@/hooks/useReveal";
import { depoimentos, projetosProprios } from "@/content/depoimentos";

const eyebrowLabel = { comDepoimentos: "Resultados", semDepoimentos: "Projetos próprios" };

export function Prova() {
  const ref = useReveal<HTMLElement>();
  const temDepoimentos = depoimentos.length >= 3;

  return (
    <section
      ref={ref}
      className="reveal bg-surface-900 px-6 py-secao-mobile sm:py-secao-desktop"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-[640px] text-center">
          <p className="font-display text-eyebrow uppercase tracking-[.24em] text-azul-celeste">
            {temDepoimentos ? eyebrowLabel.comDepoimentos : eyebrowLabel.semDepoimentos}
          </p>
          <h2 className="mt-4 font-display text-h2-mobile font-semibold text-branco-frio sm:text-h2">
            {temDepoimentos ? "O que os clientes dizem" : "Antes de vender, eu construo"}
          </h2>
          {!temDepoimentos && (
            <p className="mt-4 text-corpo-mobile text-cinza-prata sm:text-corpo">
              Enquanto os primeiros depoimentos de clientes chegam, aqui estão projetos que a
              DOMINIA já tirou do papel.
            </p>
          )}
        </div>

        {temDepoimentos ? (
          <div className="mt-bloco-interno grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {depoimentos.map((depoimento) => (
              <Card key={depoimento.nome}>
                <p aria-hidden="true" className="font-display text-3xl leading-none text-azul-celeste">
                  &ldquo;
                </p>
                <p className="mt-2 text-corpo-mobile text-cinza-prata sm:text-corpo">
                  {depoimento.texto}
                </p>
                <p className="mt-6 font-display text-sm font-medium text-branco-frio">
                  {depoimento.nome}
                </p>
                <p className="text-sm text-cinza-prata">
                  {depoimento.cargo} · {depoimento.empresa}
                </p>
              </Card>
            ))}
          </div>
        ) : (
          <div className="mt-bloco-interno grid grid-cols-1 gap-6 sm:grid-cols-2">
            {projetosProprios.map((projeto) => (
              <Card key={projeto.slug} className="flex h-full flex-col">
                <h3 className="font-display text-h3-mobile font-medium text-branco-frio sm:text-h3">
                  {projeto.nome}
                </h3>
                <dl className="mt-4 space-y-3 text-sm">
                  <div>
                    <dt className="font-display text-xs font-semibold uppercase tracking-[.12em] text-azul-celeste">
                      Contexto
                    </dt>
                    <dd className="mt-1 text-cinza-prata">{projeto.contexto}</dd>
                  </div>
                  <div>
                    <dt className="font-display text-xs font-semibold uppercase tracking-[.12em] text-azul-celeste">
                      Desafio
                    </dt>
                    <dd className="mt-1 text-cinza-prata">{projeto.desafio}</dd>
                  </div>
                  <div>
                    <dt className="font-display text-xs font-semibold uppercase tracking-[.12em] text-azul-celeste">
                      Solução
                    </dt>
                    <dd className="mt-1 text-cinza-prata">{projeto.solucao}</dd>
                  </div>
                  <div>
                    <dt className="font-display text-xs font-semibold uppercase tracking-[.12em] text-azul-celeste">
                      Resultado
                    </dt>
                    <dd className="mt-1 text-cinza-prata">{projeto.resultado}</dd>
                  </div>
                </dl>
                {projeto.link && (
                  <a
                    href={projeto.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto pt-6 text-left font-display text-sm font-medium text-azul-celeste hover:underline"
                  >
                    Ver projeto →
                  </a>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
