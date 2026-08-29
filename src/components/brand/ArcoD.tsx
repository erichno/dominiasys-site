import { useId } from "react";
import { cn } from "@/lib/cn";

type ArcoDVariant = "gradiente" | "mono";

interface ArcoDProps {
  variant?: ArcoDVariant;
  /** Glow celeste ao redor do arco, para uso decorativo no canto do hero. */
  glow?: boolean;
  className?: string;
}

const GLOW = "drop-shadow-[0_0_32px_rgba(56,189,248,0.55)]";

const NOS: Array<[number, number, number]> = [
  [48, 60, 4.1],
  [81, 60, 4.3],
  [22, 82, 4.3],
  [49, 88, 3.7],
  [80, 82, 4.3],
  [101, 82, 4.3],
  [80, 106, 4.3],
  [99, 99, 2.1],
  [138, 100, 4.3],
  [48, 128, 4.1],
  [130, 127, 3.7],
  [22, 148, 4.5],
  [81, 148, 4.3],
  [100, 148, 3.7],
  [81, 172, 4.3],
  [56, 172, 3.7],
  [50, 190, 2.3],
];

const LIGACOES = [
  "M48 60 H81",
  "M81 60 V82",
  "M22 82 H101",
  "M49 88 L57 82",
  "M49 88 L80 106",
  "M101 82 L118 100 H138",
  "M80 106 L99 99",
  "M80 106 L48 128",
  "M80 106 V148",
  "M138 100 L130 127",
  "M130 127 L100 148",
  "M48 128 L22 148",
  "M48 128 L81 148",
  "M22 148 L56 172",
  "M81 148 H100",
  "M81 148 V172",
  "M81 172 H56",
  "M56 172 L50 190",
];

const ARCO_D =
  "M47 19 L110 19 A 85 85 0 1 1 95 188 L115 166 A 63 63 0 0 0 110 42 L59 42 Z";

export function ArcoD({ variant = "gradiente", glow = false, className }: ArcoDProps) {
  const uid = useId();
  const arcoId = `dominia-arco-${uid}`;
  const noId = `dominia-no-${uid}`;

  if (variant === "mono") {
    return (
      <svg
        viewBox="0 0 200 208"
        className={cn(glow && GLOW, className)}
        aria-hidden="true"
      >
        <g fill="currentColor">
          <path d={ARCO_D} />
          {NOS.map(([cx, cy, r], index) => (
            <circle key={index} cx={cx} cy={cy} r={r} />
          ))}
        </g>
        <g stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none">
          {LIGACOES.map((d, index) => (
            <path key={index} d={d} />
          ))}
        </g>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 200 208"
      className={cn(glow && GLOW, className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={arcoId} x1="0.18" y1="0.02" x2="0.95" y2="0.62">
          <stop offset="0" stopColor="#1E5FE0" />
          <stop offset="0.38" stopColor="#3B82F6" />
          <stop offset="1" stopColor="#AFD2F9" />
        </linearGradient>
        <linearGradient id={noId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#BBDAFB" />
          <stop offset="1" stopColor="#5C9AF0" />
        </linearGradient>
      </defs>
      <g stroke="#4E86D4" strokeWidth="1.3" strokeLinecap="round" fill="none">
        {LIGACOES.map((d, index) => (
          <path key={index} d={d} />
        ))}
      </g>
      <g fill={`url(#${noId})`}>
        {NOS.map(([cx, cy, r], index) => (
          <circle key={index} cx={cx} cy={cy} r={r} />
        ))}
      </g>
      <path d={ARCO_D} fill={`url(#${arcoId})`} />
    </svg>
  );
}
