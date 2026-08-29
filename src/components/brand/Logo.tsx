import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

type LogoVariant = "auto" | "full" | "symbol";

interface LogoProps {
  /**
   * "auto" (padrão) mostra o lockup a partir de `sm:` e o símbolo isolado
   * abaixo disso — aproximação do breakpoint por viewport para a regra de
   * "abaixo de 180px de largura, use o símbolo". "full"/"symbol" forçam uma
   * das duas variantes independente da largura (ex.: rodapé sempre usa "full").
   */
  variant?: LogoVariant;
  priority?: boolean;
  className?: string;
}

const LOCKUP_ASPECT = 987 / 246;
const SIMBOLO_ASPECT = 200 / 208;

// Lockup pede largura mínima de 180px (seção 4 do CLAUDE.md). 46px de altura
// mantém a proporção do arquivo original e resulta em ~184px de largura.
const ALTURA_LOCKUP = 46;
const ALTURA_SIMBOLO = 36;

export function Logo({ variant = "auto", priority, className }: LogoProps) {
  const mostrarLockup = variant !== "symbol";
  const mostrarSimbolo = variant !== "full";

  return (
    <Link href="/" className={cn("inline-flex items-center", className)}>
      {mostrarLockup && (
        <Image
          src="/brand/dominia-lockup-horizontal-fundo-escuro.svg"
          alt="DOMINIA — Consultoria em Tecnologia da Informação"
          width={Math.round(ALTURA_LOCKUP * LOCKUP_ASPECT)}
          height={ALTURA_LOCKUP}
          priority={priority}
          style={{ height: ALTURA_LOCKUP, width: "auto" }}
          className={cn(variant === "auto" && "hidden sm:block")}
        />
      )}
      {mostrarSimbolo && (
        <Image
          src="/brand/dominia-simbolo-fundo-escuro.svg"
          alt="DOMINIA"
          width={Math.round(ALTURA_SIMBOLO * SIMBOLO_ASPECT)}
          height={ALTURA_SIMBOLO}
          priority={priority}
          style={{ height: ALTURA_SIMBOLO, width: "auto" }}
          className={cn(variant === "auto" && "sm:hidden")}
        />
      )}
    </Link>
  );
}
