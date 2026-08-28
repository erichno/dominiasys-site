import { ArcoD } from "@/components/brand/ArcoD";
import { Button } from "@/components/ui/Button";
import { agendarHref, whatsappHref } from "@/lib/agendar";

export function CTAFinal() {
  return (
    <section
      className="relative overflow-hidden px-6 py-secao-mobile text-center sm:py-secao-desktop"
      style={{
        background:
          "linear-gradient(120deg, var(--surface-900), var(--surface-700) 45%, var(--blue-700) 100%)",
      }}
    >
      <ArcoD
        variant="mono"
        className="pointer-events-none absolute -right-16 top-1/2 hidden h-[480px] w-[480px] -translate-y-1/2 text-branco-frio opacity-10 md:block"
      />

      <div className="relative z-10 mx-auto max-w-[640px]">
        <h2 className="font-display text-h2-mobile font-semibold text-branco-frio sm:text-h2">
          Trinta minutos, uma direção prática
        </h2>
        <p className="mt-4 text-corpo-mobile text-branco-frio/85 sm:text-corpo">
          Me conte o que está travando. Eu digo se é o meu tipo de problema, e o que eu faria no
          seu lugar. Se não for para mim, indico quem resolve. Sem apresentação comercial.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href={agendarHref()}>Agendar conversa</Button>
          <Button href={whatsappHref()} variant="secondary">
            Falar no WhatsApp
          </Button>
        </div>

        <p className="mt-4 text-sm text-branco-frio/70">Resposta em até 1 dia útil.</p>
      </div>
    </section>
  );
}
