"use client";

import { useEffect } from "react";

/** Carrega o script do Cloudflare Turnstile uma vez, se houver site key. */
export function useTurnstileWidget(siteKey: string | undefined) {
  useEffect(() => {
    if (!siteKey) return;
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [siteKey]);
}

export function obterTokenTurnstile(): string {
  const campo = document.querySelector<HTMLInputElement>('input[name="cf-turnstile-response"]');
  return campo?.value ?? "";
}
