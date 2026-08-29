import { useId, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  erro?: string;
}

export function Textarea({ label, erro, id, className, ...props }: TextareaProps) {
  const autoId = useId();
  const textareaId = id ?? autoId;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={textareaId}
          className="font-display text-corpo-mobile font-medium text-branco-frio"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        aria-invalid={Boolean(erro)}
        aria-describedby={erro ? `${textareaId}-erro` : undefined}
        rows={4}
        className={cn(
          "min-h-[120px] rounded-input border bg-surface-600 px-4 py-3 text-corpo-mobile text-branco-frio placeholder:text-cinza-prata transition-colors duration-micro ease-marca",
          erro
            ? "border-erro"
            : "border-branco-frio/10 focus:border-azul-celeste",
          className,
        )}
        {...props}
      />
      {erro && (
        <p id={`${textareaId}-erro`} className="font-body text-sm text-erro">
          {erro}
        </p>
      )}
    </div>
  );
}
