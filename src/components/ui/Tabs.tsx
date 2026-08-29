"use client";

import { useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
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
  const listRef = useRef<HTMLDivElement>(null);
  const [indicador, setIndicador] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    function medir() {
      const index = tabs.findIndex((tab) => tab.value === value);
      const el = refs.current[index];
      const list = listRef.current;
      if (!el || !list) return;
      const elRect = el.getBoundingClientRect();
      const listRect = list.getBoundingClientRect();
      setIndicador({ left: elRect.left - listRect.left, width: elRect.width });
    }
    medir();
    window.addEventListener("resize", medir);
    return () => window.removeEventListener("resize", medir);
  }, [value, tabs]);

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const delta = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (index + delta + tabs.length) % tabs.length;
    refs.current[nextIndex]?.focus();
    onChange(tabs[nextIndex].value);
  }

  return (
    <div
      ref={listRef}
      role="tablist"
      className={cn("relative flex items-center gap-8", className)}
    >
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
              "pb-3 font-display text-corpo-mobile transition-colors duration-comp ease-marca sm:text-corpo",
              active ? "text-branco-frio" : "text-cinza-prata hover:text-azul-celeste",
            )}
          >
            {tab.label}
          </button>
        );
      })}
      <span
        aria-hidden="true"
        className="absolute -bottom-px h-0.5 bg-grad-marca transition-[left,width] duration-comp ease-marca"
        style={{ left: indicador.left, width: indicador.width }}
      />
    </div>
  );
}
