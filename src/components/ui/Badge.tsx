import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type BadgeVariant = "institucional" | "destaque";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variants: Record<BadgeVariant, string> = {
  institucional: "bg-azul-celeste/[0.12] text-azul-celeste",
  destaque: "bg-grad-marca text-branco-frio",
};

export function Badge({ variant = "institucional", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-badge px-3 py-1 font-display text-xs font-semibold uppercase tracking-wide",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
