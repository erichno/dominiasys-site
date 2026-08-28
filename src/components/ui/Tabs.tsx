"use client";

import { useRef, type KeyboardEvent } from "react";
import { cn } from "@/lib/cn";

interface TabItem {
  value: string;
  label: string;
}

interface TabsProps {
  tabs: TabItem[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function Tabs({ tabs, value, onChange, className }: TabsProps) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const delta = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (index + delta + tabs.length) % tabs.length;
    refs.current[nextIndex]?.focus();
    onChange(tabs[nextIndex].value);
  }

  return (
    <div role="tablist" className={cn("flex items-center gap-8", className)}>
      {tabs.map((tab, index) => {
        const active = tab.value === value;
        return (
          <button
            key={tab.value}
            ref={(el) => {
              refs.current[index] = el;
            }}
            role="tab"
            type="button"
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(tab.value)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={cn(
              "relative pb-3 font-display text-corpo-mobile transition-colors duration-comp ease-marca sm:text-corpo",
              active ? "text-branco-frio" : "text-cinza-prata hover:text-azul-celeste",
            )}
          >
            {tab.label}
            {active && (
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-px h-0.5 bg-grad-marca"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
