"use client";

import { Accordion } from "@/components/ui/Accordion";
import { useReveal } from "@/hooks/useReveal";
import faq, { faqTitulo } from "@/content/faq";

export function FAQ() {
  const ref = useReveal<HTMLElement>();
  const items = faq.map((item, index) => ({
    value: String(index),
    pergunta: item.pergunta,
    resposta: item.resposta,
  }));

  return (
    <section
      ref={ref}
      id="perguntas"
      className="reveal bg-surface-900 px-6 py-secao-mobile sm:py-secao-desktop"
    >
      <div className="mx-auto max-w-[760px]">
        <h2 className="text-center font-display text-h2-mobile font-semibold text-branco-frio sm:text-h2">
          {faqTitulo}
        </h2>
        <Accordion items={items} className="mt-bloco-interno border-y border-surface-600" />
      </div>
    </section>
  );
}
