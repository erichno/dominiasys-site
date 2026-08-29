import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { whatsappHref } from "@/lib/agendar";

export const metadata: Metadata = {
  title: "Link indisponível",
  robots: { index: false, follow: false },
};

/**
 * Página neutra para qualquer uma das 5 regras de validação do token
 * falhando — nunca revela qual regra foi. Ver src/app/p/[token]/page.tsx.
 */
export default function LinkIndisponivel() {
  return (
    <div className="mx-auto flex w-full max-w-[560px] flex-col items-center text-center">
      <h1 className="font-display text-h2-mobile font-semibold text-branco-frio sm:text-h2">
        Link indisponível
      </h1>
      <p className="mt-4 text-corpo-mobile text-cinza-prata sm:text-corpo">
        Esse link não está mais aberto para respostas. Se você recebeu por engano ou precisa
        responder, fale comigo no WhatsApp.
      </p>
      <Button href={whatsappHref()} className="mt-8">
        Falar no WhatsApp
      </Button>
    </div>
  );
}
