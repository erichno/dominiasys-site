import { Card } from "@/components/ui/Card";
import dores, { doresEyebrow, doresFecho, doresTitulo } from "@/content/dores";

export function Dores() {
  return (
    <section className="bg-surface-800 px-6 py-secao-mobile sm:py-secao-desktop">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-[640px] text-center">
          <p className="font-display text-eyebrow uppercase tracking-[.24em] text-azul-celeste">
            {doresEyebrow}
          </p>
          <h2 className="mt-4 font-display text-h2-mobile font-semibold text-branco-frio sm:text-h2">
            {doresTitulo}
          </h2>
        </div>

        <div className="mt-bloco-interno grid grid-cols-1 gap-6 sm:grid-cols-2">
          {dores.map((dor) => (
            <Card key={dor.titulo} className="relative">
              <span
                aria-hidden="true"
                className="absolute left-6 top-6 h-2 w-2 rounded-full bg-azul-celeste"
              />
              <h3 className="mt-5 font-display text-h3-mobile font-medium text-branco-frio sm:text-h3">
                {dor.titulo}
              </h3>
              <p className="mt-3 text-corpo-mobile text-cinza-prata sm:text-corpo">{dor.texto}</p>
            </Card>
          ))}
        </div>

        <p className="mx-auto mt-bloco-interno max-w-leitura text-center text-corpo-mobile text-cinza-prata sm:text-corpo">
          {doresFecho}
        </p>
      </div>
    </section>
  );
}
