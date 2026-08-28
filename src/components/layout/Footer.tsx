import Link from "next/link";
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

export function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="border-t border-surface-600 bg-surface-900 px-6 py-16 text-cinza-prata">
      <div className="mx-auto grid max-w-6xl gap-12 sm:grid-cols-3">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 font-display text-sm font-light tracking-[.08em]">
            {empresa.slogan}
          </p>
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
