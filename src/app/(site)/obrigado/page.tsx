import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { whatsappHref } from "@/lib/agendar";

export const metadata: Metadata = {
  title: "Recebido",
  robots: { index: false, follow: true },
};

export default function ObrigadoPage() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center bg-grad-fundo px-6 py-secao-mobile text-center sm:py-secao-desktop">
      <div className="max-w-[560px]">
        <h1 className="font-display text-h1-mobile font-semibold text-branco-frio sm:text-h1">
          Recebido.
        </h1>
        <p className="mt-6 text-corpo-mobile text-cinza-prata sm:text-corpo">
          Vou ler com atenção e responder em até 1 dia útil, direto do meu e-mail. Enquanto isso,
          se quiser adiantar o contexto, me chame no WhatsApp.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href={whatsappHref()}>Falar no WhatsApp</Button>
          <Button href="/" variant="tertiary">
            Voltar ao site
          </Button>
        </div>
      </div>
    </section>
  );
}
