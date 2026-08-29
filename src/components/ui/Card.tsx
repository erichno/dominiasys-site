import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type CardVariant = "default" | "destaque";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

export function Card({ variant = "default", className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card bg-surface-700 p-padding-card transition-all duration-comp ease-marca hover:-translate-y-1 hover:border-azul-celeste/[0.35] hover:shadow-elev-2",
        variant === "default" && "border border-branco-frio/[0.06]",
        variant === "destaque" && "borda-grad-marca",
        className,
      )}
      {...props}
    />
  );
}
