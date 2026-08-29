import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { whatsappHref } from "@/lib/agendar";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center bg-grad-fundo px-6 py-secao-mobile text-center sm:py-secao-desktop">
      <div className="max-w-[560px]">
        <p className="font-display text-eyebrow uppercase tracking-[.24em] text-azul-celeste">
          Erro 404
        </p>
        <h1 className="mt-4 font-display text-h1-mobile font-semibold text-branco-frio sm:text-h1">
          Essa página não existe.
        </h1>
        <p className="mt-6 text-corpo-mobile text-cinza-prata sm:text-corpo">
          O link pode estar errado ou a página mudou de lugar. Volte para o início ou me chame
          direto no WhatsApp.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/">Voltar ao início</Button>
          <Button href={whatsappHref()} variant="secondary">
            Falar no WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}
