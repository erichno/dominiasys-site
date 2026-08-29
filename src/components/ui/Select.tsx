import { useId, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  erro?: string;
}

export function Select({
  label,
  erro,
  id,
  className,
  children,
  ...props
}: SelectProps) {
  const autoId = useId();
  const selectId = id ?? autoId;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={selectId}
          className="font-display text-corpo-mobile font-medium text-branco-frio"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          aria-invalid={Boolean(erro)}
          aria-describedby={erro ? `${selectId}-erro` : undefined}
          className={cn(
            "min-h-[44px] w-full appearance-none rounded-input border bg-surface-600 px-4 py-3 pr-10 text-corpo-mobile text-branco-frio transition-colors duration-micro ease-marca",
            erro
              ? "border-erro"
              : "border-branco-frio/10 focus:border-azul-celeste",
            className,
          )}
          {...props}
        >
          {children}
        </select>
        <svg
          aria-hidden="true"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-cinza-prata"
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {erro && (
        <p id={`${selectId}-erro`} className="font-body text-sm text-erro">
          {erro}
        </p>
      )}
    </div>
  );
}
