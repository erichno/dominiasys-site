import { useId, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  erro?: string;
}

export function Input({ label, erro, id, className, ...props }: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={inputId}
          className="font-display text-corpo-mobile font-medium text-branco-frio"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        aria-invalid={Boolean(erro)}
        aria-describedby={erro ? `${inputId}-erro` : undefined}
        className={cn(
          "min-h-[44px] rounded-input border bg-surface-600 px-4 py-3 text-corpo-mobile text-branco-frio placeholder:text-cinza-prata transition-colors duration-micro ease-marca",
          erro
            ? "border-erro"
            : "border-branco-frio/10 focus:border-azul-celeste",
          className,
        )}
        {...props}
      />
      {erro && (
        <p id={`${inputId}-erro`} className="font-body text-sm text-erro">
          {erro}
        </p>
      )}
    </div>
  );
}
