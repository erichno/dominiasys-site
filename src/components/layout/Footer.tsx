import Link from "next/link";
import type { ReactElement } from "react";
import { Logo } from "@/components/brand/Logo";
import empresa from "@/content/empresa";

const navegacao = [
  { href: "/#servicos", label: "Serviços" },
  { href: "/#metodo", label: "Método" },
  { href: "/#trajetoria", label: "Trajetória" },
  { href: "/#perguntas", label: "Perguntas" },
  { href: "/politica-de-privacidade", label: "Política de privacidade" },
  { href: "/termos", label: "Termos de uso" },
];

const redesSociais: Array<{
  chave: keyof typeof empresa.redes;
  nome: string;
  icone: (props: { className?: string }) => ReactElement;
}> = [
  {
    chave: "linkedin",
    nome: "LinkedIn",
    icone: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 8.98h4v12H3v-12zm7 0h3.84v1.64h.05c.53-1 1.85-2.05 3.8-2.05 4.06 0 4.81 2.67 4.81 6.15v6.26h-4v-5.55c0-1.32-.02-3.02-1.84-3.02-1.84 0-2.12 1.44-2.12 2.93v5.64h-4v-12z" />
      </svg>
    ),
  },
  {
    chave: "instagram",
    nome: "Instagram",
    icone: ({ className }) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        className={className}
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    chave: "youtube",
    nome: "YouTube",
    icone: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M22 12s0-3.35-.43-4.96a2.78 2.78 0 00-1.96-1.96C17.99 4.65 12 4.65 12 4.65s-5.99 0-7.61.43A2.78 2.78 0 002.43 7C2 8.65 2 12 2 12s0 3.35.43 4.96a2.78 2.78 0 001.96 1.96c1.62.43 7.61.43 7.61.43s5.99 0 7.61-.43a2.78 2.78 0 001.96-1.96C22 15.35 22 12 22 12z" />
        <path d="M10 15.02V8.98L15.27 12z" fill="var(--surface-900, #06111f)" />
      </svg>
    ),
  },
];

export function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="border-t border-surface-600 bg-surface-900 px-6 py-16 text-cinza-prata">
      <div className="mx-auto grid max-w-6xl gap-12 sm:grid-cols-3">
        <div className="max-w-sm">
          <Logo variant="full" />
          <p className="mt-4 font-display text-sm font-light tracking-[.08em]">
            {empresa.slogan}
          </p>

          {redesSociais.some((rede) => empresa.redes[rede.chave]) && (
            <div className="mt-6 flex items-center gap-3">
              {redesSociais.map(({ chave, nome, icone: Icone }) => {
                const href = empresa.redes[chave];
                if (!href) return null;
                return (
                  <a
                    key={chave}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={nome}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-branco-frio/10 text-cinza-prata transition-colors duration-micro hover:border-azul-celeste hover:text-azul-celeste"
                  >
                    <Icone className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          )}
        </div>

        <div>
          <p className="font-display text-eyebrow uppercase tracking-[.24em] text-azul-celeste">
            Navegação
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {navegacao.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-branco-frio">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display text-eyebrow uppercase tracking-[.24em] text-azul-celeste">
            Contato
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>{empresa.razaoSocial}</li>
            <li>
              {empresa.endereco.logradouro}, {empresa.endereco.cidade}/{empresa.endereco.uf}
            </li>
            <li>
              <a href={`mailto:${empresa.email}`} className="hover:text-branco-frio">
                {empresa.email}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${empresa.whatsapp.e164.replace("+", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-branco-frio"
              >
                {empresa.whatsapp.display}
              </a>
            </li>
            <li>CNPJ {empresa.cnpj}</li>
          </ul>
        </div>
      </div>

      <p className="mx-auto mt-12 max-w-6xl border-t border-surface-700 pt-6 text-xs">
        © {ano} {empresa.razaoSocial}. Todos os direitos reservados.
      </p>
    </footer>
  );
}
