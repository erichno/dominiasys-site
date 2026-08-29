"use client";

import { useEffect, useState } from "react";
import { whatsappHref } from "@/lib/agendar";

/**
 * Aberturas contextuais por seção — não é copy literal da spec (que só pede
 * "mensagem variando conforme a seção de origem"), então mantém o tom do
 * Design System em vez de inventar dado de negócio. Seções fora deste mapa
 * caem no fallback.
 */
const MENSAGENS_POR_SECAO: Record<string, string> = {
  hero: "Vi o site da DOMINIA e quero entender onde a IA gera retorno na minha empresa.",
  dores: "Reconheci uma dessas situações na minha empresa. Podemos conversar?",
  servicos: "Tenho uma dúvida sobre um dos serviços da DOMINIA.",
  metodo: "Gostei do método. Quero agendar a conversa de 30 minutos.",
};

const MENSAGEM_PADRAO = "Vi o site da DOMINIA e quero conversar.";
const LIMIAR_SCROLL = 0.4;

export function WhatsAppFloat() {
  const [rolagemPassou, setRolagemPassou] = useState(false);
  const [dispensado, setDispensado] = useState(false);
  const [secaoAtiva, setSecaoAtiva] = useState<string | null>(null);

  useEffect(() => {
    function onScroll() {
      const alturaRolavel = document.documentElement.scrollHeight - window.innerHeight;
      const progresso = alturaRolavel > 0 ? window.scrollY / alturaRolavel : 0;
      setRolagemPassou(progresso >= LIMIAR_SCROLL);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const elementos = Object.keys(MENSAGENS_POR_SECAO)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elementos.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visiveis = entries.filter((entry) => entry.isIntersecting);
        if (visiveis.length === 0) return;
        const maisVisivel = visiveis.reduce((atual, entry) =>
          entry.intersectionRatio > atual.intersectionRatio ? entry : atual,
        );
        setSecaoAtiva(maisVisivel.target.id);
      },
      { threshold: [0.25, 0.5, 0.75] },
    );

    elementos.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (!rolagemPassou || dispensado) return null;

  const mensagem = (secaoAtiva && MENSAGENS_POR_SECAO[secaoAtiva]) || MENSAGEM_PADRAO;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
      <button
        type="button"
        onClick={() => setDispensado(true)}
        aria-label="Dispensar"
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-surface-700 text-cinza-prata shadow-elev-1 transition-colors duration-micro ease-marca hover:text-branco-frio"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path
            d="M2 2l10 10M12 2L2 12"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <a
        href={whatsappHref(mensagem)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-elev-2 transition-transform duration-micro ease-marca hover:scale-105"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.48 1.32 5L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.9 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm5.8 14.14c-.24.68-1.4 1.32-1.93 1.4-.5.08-1.12.11-1.8-.11a16.5 16.5 0 01-1.6-.59c-2.8-1.21-4.63-4.04-4.77-4.23-.14-.19-1.14-1.52-1.14-2.9s.72-2.05.98-2.34c.26-.28.56-.35.75-.35h.53c.17 0 .4-.02.62.48.24.55.79 1.91.86 2.05.07.14.11.3.02.49-.09.19-.14.3-.28.46-.14.16-.29.36-.42.48-.14.13-.28.28-.12.55.16.28.72 1.19 1.55 1.93 1.06.95 1.96 1.24 2.24 1.38.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.18-.28.36-.23.6-.14.24.09 1.55.73 1.82.86.27.14.45.2.51.32.07.12.07.68-.17 1.36z" />
        </svg>
      </a>
    </div>
  );
}
