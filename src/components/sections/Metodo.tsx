import metodo, { metodoEyebrow, metodoSubtitulo, metodoTitulo } from "@/content/metodo";

export function Metodo() {
  return (
    <section id="metodo" className="bg-surface-800 px-6 py-secao-mobile sm:py-secao-desktop">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-[640px] text-center">
          <p className="font-display text-eyebrow uppercase tracking-[.24em] text-azul-celeste">
            {metodoEyebrow}
          </p>
          <h2 className="mt-4 font-display text-h2-mobile font-semibold text-branco-frio sm:text-h2">
            {metodoTitulo}
          </h2>
          <p className="mt-4 text-corpo-mobile text-cinza-prata sm:text-corpo">{metodoSubtitulo}</p>
        </div>

        <ol className="mt-bloco-interno space-y-10 md:hidden">
          {metodo.map((etapa, index) => (
            <li key={etapa.numero} className="relative pl-12">
              {index < metodo.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute -bottom-10 left-4 top-8 w-px bg-gradient-to-b from-azul-celeste/50 to-azul-celeste/10"
                />
              )}
              <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-azul-celeste/40 font-display text-xs font-semibold text-azul-celeste">
                {etapa.numero}
              </span>
              <h3 className="font-display text-h3-mobile font-medium text-branco-frio">
                {etapa.nome}
              </h3>
              <p className="mt-2 text-corpo-mobile text-cinza-prata">{etapa.texto}</p>
            </li>
          ))}
        </ol>

        <ol className="relative mt-bloco-interno hidden md:grid md:grid-cols-4 md:gap-8">
          <span
            aria-hidden="true"
            className="absolute left-[12.5%] right-[12.5%] top-4 h-px bg-grad-marca"
          />
          {metodo.map((etapa) => (
            <li key={etapa.numero} className="relative">
              <span className="relative z-10 mx-auto flex h-8 w-8 items-center justify-center rounded-full border border-azul-celeste bg-surface-800 font-display text-xs font-semibold text-azul-celeste">
                {etapa.numero}
              </span>
              <h3 className="mt-4 text-center font-display text-h3-mobile font-medium text-branco-frio sm:text-h3">
                {etapa.nome}
              </h3>
              <p className="mt-2 text-center text-corpo-mobile text-cinza-prata sm:text-corpo">
                {etapa.texto}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
