import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: ReactNode;
  erro?: string;
}

export function Checkbox({ label, erro, id, className, ...props }: CheckboxProps) {
  const autoId = useId();
  const checkboxId = id ?? autoId;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={checkboxId} className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          id={checkboxId}
          aria-invalid={Boolean(erro)}
          aria-describedby={erro ? `${checkboxId}-erro` : undefined}
          className={cn(
            "mt-0.5 h-5 w-5 flex-shrink-0 rounded-tag border bg-surface-600 accent-azul-royal",
            erro ? "border-erro" : "border-branco-frio/20",
            className,
          )}
          {...props}
        />
        <span className="text-corpo-mobile text-cinza-prata sm:text-corpo">{label}</span>
      </label>
      {erro && (
        <p id={`${checkboxId}-erro`} className="font-body text-sm text-erro">
          {erro}
        </p>
      )}
    </div>
  );
}
