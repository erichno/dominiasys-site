import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-card border border-branco-frio/[0.06] bg-surface-700 p-padding-card transition-all duration-comp ease-marca hover:-translate-y-1 hover:border-azul-celeste/[0.35] hover:shadow-elev-2",
        className,
      )}
      {...props}
    />
  );
}
