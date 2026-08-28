import Link from "next/link";
import { ArcoD } from "@/components/brand/ArcoD";
import { cn } from "@/lib/cn";

interface LogoProps {
  variant?: "full" | "symbol";
  className?: string;
}

export function Logo({ variant = "full", className }: LogoProps) {
  if (variant === "symbol") {
    return (
      <Link href="/" aria-label="DOMINIA" className={cn("inline-flex", className)}>
        <ArcoD className="h-8 w-8" />
      </Link>
    );
  }

  return (
    <Link
      href="/"
      aria-label="DOMINIA — Consultoria em Tecnologia da Informação"
      className={cn("inline-flex items-center gap-2", className)}
    >
      <ArcoD className="h-8 w-8" />
      <span className="font-display text-[22px] font-semibold tracking-wide text-branco-frio">
        DOMINI
        <svg
          viewBox="0 6 118 112"
          aria-hidden="true"
          className="ml-[0.02em] inline-block h-[0.66em] w-[0.66em] align-baseline"
        >
          <path
            d="M6 105 L59 13 L112 105"
            fill="none"
            stroke="currentColor"
            strokeWidth="20"
            strokeLinejoin="miter"
          />
          <circle cx="59" cy="86" r="11.5" fill="#2563EB" />
        </svg>
      </span>
    </Link>
  );
}
