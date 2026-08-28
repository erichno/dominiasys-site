import faq, { faqTitulo } from "@/content/faq";

export function FAQ() {
  return (
    <section id="perguntas" className="bg-surface-900 px-6 py-secao-mobile sm:py-secao-desktop">
      <div className="mx-auto max-w-[760px]">
        <h2 className="text-center font-display text-h2-mobile font-semibold text-branco-frio sm:text-h2">
          {faqTitulo}
        </h2>

        <div className="mt-bloco-interno divide-y divide-surface-600 border-y border-surface-600">
          {faq.map((item, index) => (
            <details key={item.pergunta} name="faq" open={index === 0} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-medium text-branco-frio marker:content-none">
                {item.pergunta}
                <span
                  aria-hidden="true"
                  className="flex-shrink-0 font-display text-xl leading-none text-azul-celeste transition-transform duration-comp ease-marca group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 text-corpo-mobile text-cinza-prata sm:text-corpo">
                {item.resposta}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
