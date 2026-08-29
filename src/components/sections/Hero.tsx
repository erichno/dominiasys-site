"use client";

import { ArcoD } from "@/components/brand/ArcoD";
import { MalhaDeDados } from "@/components/brand/MalhaDeDados";
import { Button } from "@/components/ui/Button";
import { BotaoAgendar } from "@/components/ui/BotaoAgendar";
import { useReveal } from "@/hooks/useReveal";

const credenciais = [
  "25 anos em engenharia e liderança técnica",
  "IA Generativa pelo MIT Professional Education",
  "MBA FGV",
  "Times de até 80 pessoas liderados",
];

export function Hero() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="hero"
      className="reveal relative flex min-h-[88vh] items-center overflow-hidden bg-grad-fundo px-6 pb-16 pt-32 sm:pt-40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/2 hidden h-[620px] w-[620px] -translate-y-1/2 rounded-full blur-3xl lg:block"
        style={{
          background: "radial-gradient(circle, rgba(56,189,248,0.28) 0%, rgba(56,189,248,0) 70%)",
        }}
      />
      <ArcoD
        glow
        className="pointer-events-none absolute -right-24 top-1/2 hidden h-[380px] w-[380px] -translate-y-1/2 opacity-20 xl:block"
      />
      <MalhaDeDados
        className="hidden text-azul-celeste lg:block"
        opacidade={0.12}
        mascara="linear-gradient(100deg, transparent 0%, transparent 60%, black 78%, black 100%)"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="max-w-[640px]">
          <p className="font-display text-eyebrow uppercase tracking-[.24em] text-azul-celeste">
            Consultoria em inteligência artificial aplicada
          </p>

          <h1 className="mt-6 font-display text-h1-mobile font-semibold leading-[1.05] tracking-[.02em] text-branco-frio sm:text-h1">
            Sua empresa testou IA. Agora precisa de resultado.
          </h1>

          <p className="mt-6 max-w-leitura text-corpo-mobile text-cinza-prata sm:text-corpo">
            A DOMINIA conduz o caminho completo: forma o seu time, define onde a IA gera retorno e
            constrói o sistema que entra em produção. Um interlocutor do diagnóstico à entrega.
          </p>

          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <BotaoAgendar>Agendar conversa de 30 minutos</BotaoAgendar>
            <Button href="/#metodo" variant="tertiary">
              Ver como trabalho
            </Button>
          </div>

          <p className="mt-4 text-sm text-cinza-prata">
            Conversa sem custo e sem apresentação comercial. Você sai com pelo menos uma direção
            prática.
          </p>
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-cinza-prata sm:mt-24">
          {credenciais.map((item, index) => (
            <span key={item} className="flex items-center gap-3">
              {index > 0 && (
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-azul-celeste" />
              )}
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
