import "server-only";

interface RespostaSiteverify {
  success: boolean;
}

/**
 * Verifica o token do Cloudflare Turnstile. Se `TURNSTILE_SECRET_KEY` não
 * estiver configurada (ex.: dev local sem Turnstile ativo), pula a
 * verificação em vez de travar o formulário inteiro.
 */
export async function verificarTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;

  const resposta = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token, remoteip: ip }),
  });

  if (!resposta.ok) return false;

  const dados = (await resposta.json()) as RespostaSiteverify;
  return dados.success === true;
}
