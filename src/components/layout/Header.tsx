"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { BotaoAgendar } from "@/components/ui/BotaoAgendar";

const links = [
  { href: "/#servicos", label: "Serviços" },
  { href: "/#metodo", label: "Método" },
  { href: "/#trajetoria", label: "Trajetória" },
  { href: "/#perguntas", label: "Perguntas" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 sm:h-[72px]">
      {/*
        O blur/fundo fica num wrapper interno, não no <header>: backdrop-filter
        cria containing block para descendentes `position: fixed` (como o
        drawer mobile abaixo), o que quebrava o drawer sempre que o header já
        estava com o fundo desfocado ao abrir o menu.
      */}
      <div
        className={`h-full transition-colors duration-comp ease-marca ${
          scrolled ? "bg-surface-800/90 shadow-elev-1 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
          <Logo priority />

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-display text-sm text-cinza-prata transition-colors duration-micro hover:text-branco-frio"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <BotaoAgendar className="hidden sm:inline-flex">
              Agendar conversa
            </BotaoAgendar>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-input text-branco-frio md:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              onClick={() => setOpen((value) => !value)}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                {open ? (
                  <path
                    d="M4 4l14 14M18 4L4 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M3 6h16M3 11h16M3 16h16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div
          id="menu-mobile"
          className="fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col bg-surface-800 sm:top-[72px] md:hidden"
        >
          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-6 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 font-display text-corpo text-branco-frio"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="border-t border-surface-600 px-6 py-4">
            <BotaoAgendar className="w-full">Agendar conversa</BotaoAgendar>
          </div>
        </div>
      )}
    </header>
  );
}
