export function lerUtmDaUrl(): Record<string, string> | undefined {
  if (typeof window === "undefined") return undefined;
  const params = new URLSearchParams(window.location.search);
  const chaves = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  const utm: Record<string, string> = {};
  for (const chave of chaves) {
    const valor = params.get(chave);
    if (valor) utm[chave] = valor;
  }
  return Object.keys(utm).length > 0 ? utm : undefined;
}
