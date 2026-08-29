import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/**
 * Layout enxuto da pesquisa pública: sem header de navegação, sem rodapé,
 * sem WhatsApp flutuante — nada que leve o respondente para fora da página
 * antes de terminar. O logo aqui é só a marca, não um link (um link para
 * "/" seria exatamente a saída que a spec pede para evitar).
 */
export default function PesquisaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center bg-surface-800 px-6 py-12 sm:py-16">
      <Image
        src="/brand/dominia-simbolo-fundo-escuro.svg"
        alt="DOMINIA"
        width={40}
        height={42}
        priority
      />
      <div className="mt-8 w-full">{children}</div>
    </div>
  );
}
