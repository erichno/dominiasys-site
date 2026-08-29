"use client";

import type { MouseEvent, ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { agendarHref } from "@/lib/agendar";

const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK;
const TIMEOUT_MS = 4000;

let calApiPromise: ReturnType<typeof carregarCalApi> | null = null;

async function carregarCalApi() {
  const { getCalApi } = await import("@calcom/embed-react");
  const cal = await getCalApi();
  cal("ui", { theme: "dark" });
  return cal;
}

function obterCalApi() {
  if (!calApiPromise) calApiPromise = carregarCalApi();
  return calApiPromise;
}

interface BotaoAgendarProps {
  variant?: "primary" | "secondary" | "tertiary";
  className?: string;
  children: ReactNode;
}

/**
 * Botão "Agendar conversa" com Cal.com embutido (modal, sem sair do site).
 * O href continua sendo o link externo do Cal.com — se o JS não carregar ou
 * o embed falhar/travar, o clique cai no comportamento nativo do link
 * (abre o Cal.com numa aba nova), que é o fallback pedido.
 */
export function BotaoAgendar({ variant = "primary", className, children }: BotaoAgendarProps) {
  async function abrir(event: MouseEvent<HTMLAnchorElement>) {
    if (!CAL_LINK) return; // sem link configurado, deixa o <a> navegar normalmente
    event.preventDefault();
    const href = event.currentTarget.href;

    try {
      const cal = await Promise.race([
        obterCalApi(),
        new Promise<never>((_, reject) => setTimeout(() => reject(new Error("timeout")), TIMEOUT_MS)),
      ]);
      cal("modal", { calLink: CAL_LINK });
    } catch {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <Button href={agendarHref()} variant={variant} className={className} onClick={abrir}>
      {children}
    </Button>
  );
}
