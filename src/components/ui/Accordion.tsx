"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface AccordionItem {
  value: string;
  pergunta: string;
  resposta: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const [aberto, setAberto] = useState<string | undefined>(items[0]?.value);

  return (
    <div className={cn("flex flex-col divide-y divide-branco-frio/10", className)}>
      {items.map((item) => (
        <details key={item.value} open={item.value === aberto} className="group py-6">
          <summary
            onClick={(event) => {
              event.preventDefault();
              setAberto((atual) => (atual === item.value ? undefined : item.value));
            }}
            className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-[20px] font-medium text-branco-frio [&::-webkit-details-marker]:hidden"
          >
            {item.pergunta}
            <span
              aria-hidden="true"
              className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center text-azul-celeste transition-transform duration-comp ease-marca group-open:rotate-45"
            >
              <span className="absolute h-[2px] w-4 rounded-full bg-current" />
              <span className="absolute h-4 w-[2px] rounded-full bg-current" />
            </span>
          </summary>
          <div className="pt-4 font-body text-corpo-mobile text-cinza-prata">
            {item.resposta}
          </div>
        </details>
      ))}
    </div>
  );
}
