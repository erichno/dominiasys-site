"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { MalhaDeDados } from "@/components/brand/MalhaDeDados";

const VIDEO_SRC = "/videos/dominia-intro.mp4";

const CENAS = [
  { inicio: 0, fim: 0.3, texto: "Da energia à informação." },
  { inicio: 0.3, fim: 0.65, texto: "Máquinas começaram a aprender padrões." },
  { inicio: 0.65, fim: 0.9, texto: "" },
  { inicio: 0.9, fim: 1, texto: "A Inteligência Artificial amplia o que somos capazes de realizar." },
];

const PICO_FLASH = 0.68;
const LARGURA_FLASH = 0.06;

function calcularFlash(progresso: number) {
  const distancia = Math.abs(progresso - PICO_FLASH);
  return Math.max(0, 1 - distancia / LARGURA_FLASH);
}

function irParaHero() {
  document.getElementById("hero")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function CinematicIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progresso, setProgresso] = useState(0);
  const [duracaoValida, setDuracaoValida] = useState(false);
  const [reduzMovimento, setReduzMovimento] = useState(false);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduzMovimento(query.matches);
    setPronto(true);

    function onChange(event: MediaQueryListEvent) {
      setReduzMovimento(event.matches);
    }

    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduzMovimento) return;

    let frame = 0;

    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const percorrivel = rect.height - window.innerHeight;
        const percorrido = -rect.top;
        const novoProgresso =
          percorrivel > 0 ? Math.min(1, Math.max(0, percorrido / percorrivel)) : 0;

        setProgresso(novoProgresso);

        const video = videoRef.current;
        if (video && duracaoValida && Number.isFinite(video.duration)) {
          video.currentTime = novoProgresso * video.duration;
        }
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [reduzMovimento, duracaoValida]);

  if (!pronto) return null;

  if (reduzMovimento) {
    return (
      <section className="flex min-h-[70vh] flex-col items-center justify-center gap-6 bg-black px-6 text-center">
        <p className="font-display text-h1-mobile font-semibold text-branco-frio sm:text-h1">
          DOMINA
        </p>
        <p className="max-w-leitura text-corpo-mobile text-cinza-prata sm:text-corpo">
          A vantagem não está em ter acesso à IA. Está em saber aplicá-la.
        </p>
        <button
          type="button"
          onClick={irParaHero}
          className="font-display text-sm font-medium text-azul-celeste hover:underline"
        >
          Continuar →
        </button>
      </section>
    );
  }

  const cenaAtiva =
    CENAS.find((cena) => progresso >= cena.inicio && progresso < cena.fim) ??
    CENAS[CENAS.length - 1];
  const mostrarFinal = progresso >= 0.96;

  return (
    <div ref={containerRef} className="relative" style={{ height: "300vh" }}>
      <div className="sticky top-0 z-[100] h-screen w-full overflow-hidden bg-black">
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] text-azul-celeste">
          <MalhaDeDados className="h-full w-full" />
        </div>

        <video
          ref={videoRef}
          src={VIDEO_SRC}
          muted
          playsInline
          preload="metadata"
          onLoadedMetadata={() => setDuracaoValida(true)}
          onError={() => setDuracaoValida(false)}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 bg-white"
          style={{ opacity: calcularFlash(progresso) }}
        />

        <button
          type="button"
          onClick={irParaHero}
          className="absolute right-6 top-6 z-30 font-display text-xs uppercase tracking-[.24em] text-branco-frio/70 transition-colors duration-micro hover:text-branco-frio"
        >
          Pular introdução
        </button>

        {!mostrarFinal && cenaAtiva.texto && (
          <p className="absolute bottom-16 left-1/2 z-10 -translate-x-1/2 px-6 text-center font-display text-lg text-branco-frio sm:text-2xl">
            {cenaAtiva.texto}
          </p>
        )}

        {mostrarFinal && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-black/70 px-6 text-center">
            <p className="font-display text-h1-mobile font-semibold tracking-[.02em] text-branco-frio sm:text-h1">
              DOMINA
            </p>
            <p className="max-w-leitura font-display text-lg text-branco-frio sm:text-xl">
              A vantagem não está em ter acesso à IA.
              <br />
              Está em saber aplicá-la.
            </p>
            <p className="max-w-leitura text-corpo-mobile text-cinza-prata sm:text-corpo">
              Treinamento e aplicação de Inteligência Artificial para transformar conhecimento em
              capacidade real.
            </p>
            <Button onClick={irParaHero} className="mt-2 uppercase tracking-wide">
              Quero dominar a IA
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
