import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "tertiary";

interface CommonProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  "group inline-flex items-center justify-center gap-2 rounded-botao font-display font-medium transition-all duration-comp ease-marca disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-transparent disabled:bg-surface-600 disabled:bg-none disabled:text-cinza-prata disabled:shadow-none";

const variants: Record<Variant, string> = {
  primary:
    "min-h-[44px] px-6 py-3 text-corpo-mobile sm:text-corpo bg-grad-marca text-branco-frio hover:-translate-y-px hover:shadow-elev-1 hover:brightness-[1.08]",
  secondary:
    "min-h-[44px] px-6 py-3 text-corpo-mobile sm:text-corpo border border-branco-frio/25 bg-transparent text-branco-frio hover:border-azul-celeste hover:bg-azul-celeste/[0.08]",
  tertiary: "min-h-[44px] text-corpo-mobile sm:text-corpo text-azul-celeste",
};

function Seta() {
  return (
    <span
      aria-hidden="true"
      className="inline-block transition-transform duration-micro ease-marca group-hover:translate-x-1"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M3 8h10M9 4l4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function Button({ variant = "primary", className, children, ...props }: ButtonProps) {
  const classes = cn(base, variants[variant], className);
  const conteudo =
    variant === "tertiary" ? (
      <>
        {children}
        <Seta />
      </>
    ) : (
      children
    );

  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    if (href.startsWith("http")) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...rest}>
          {conteudo}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {conteudo}
      </Link>
    );
  }

  const { ...rest } = props as ButtonAsButton;
  return (
    <button className={classes} {...rest}>
      {conteudo}
    </button>
  );
}
