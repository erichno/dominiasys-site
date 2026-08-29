"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { sair } from "@/app/admin/(protegido)/actions";

const ITENS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/pesquisas", label: "Pesquisas" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/cursos", label: "Cursos" },
];

export function SidebarAdmin() {
  const pathname = usePathname();

  return (
    <aside className="flex w-[240px] flex-shrink-0 flex-col justify-between bg-surface-900 px-4 py-8">
      <div>
        <p className="px-3 font-display text-xs font-semibold uppercase tracking-[.16em] text-cinza-prata">
          DOMINIA admin
        </p>
        <nav className="mt-8 flex flex-col gap-1">
          {ITENS.map((item) => {
            const ativo =
              pathname === item.href ||
              (item.href !== "/admin" && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-input px-3 py-2 font-display text-sm transition-colors duration-micro ease-marca",
                  ativo
                    ? "bg-azul-celeste/[0.1] text-branco-frio"
                    : "text-cinza-prata hover:text-branco-frio",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <form action={sair}>
        <button
          type="submit"
          className="w-full rounded-input px-3 py-2 text-left font-display text-sm text-cinza-prata transition-colors duration-micro ease-marca hover:text-branco-frio"
        >
          Sair
        </button>
      </form>
    </aside>
  );
}
