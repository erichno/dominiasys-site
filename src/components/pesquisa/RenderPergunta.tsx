"use client";

import Link from "next/link";
import type { PesquisaPublica } from "@/lib/db/queries/pesquisas";
import { cn } from "@/lib/cn";

export type PerguntaPublica = PesquisaPublica["perguntas"][number];
export type ValorResposta = string | number | string[] | boolean | undefined;

interface OpcaoPergunta {
  valor: string;
  rotulo: string;
}

interface ConfigEscala {
  min?: number;
  max?: number;
  rotulo_min?: string;
  rotulo_max?: string;
}

interface RenderPerguntaProps {
  pergunta: PerguntaPublica;
  valor: ValorResposta;
  onChange: (valor: ValorResposta) => void;
  onBlur?: () => void;
  erro?: string;
}

function obterOpcoes(pergunta: PerguntaPublica): OpcaoPergunta[] {
  const opcoes = pergunta.opcoes as OpcaoPergunta[] | null;
  return Array.isArray(opcoes) ? opcoes : [];
}

function CartaoOpcao({
  selecionado,
  rotulo,
  onClick,
}: {
  selecionado: boolean;
  rotulo: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selecionado}
      className={cn(
        "rounded-card border px-4 py-3 text-left text-corpo-mobile transition-colors duration-micro ease-marca",
        selecionado
          ? "border-azul-celeste bg-azul-celeste/[0.08] text-branco-frio"
          : "border-branco-frio/10 text-cinza-prata hover:border-branco-frio/25",
      )}
    >
      {rotulo}
    </button>
  );
}

function formatarTelefone(valor: string): string {
  const digitos = valor.replace(/\D/g, "").slice(0, 11);
  if (digitos.length === 0) return "";
  if (digitos.length <= 2) return `(${digitos}`;
  if (digitos.length <= 7) return `(${digitos.slice(0, 2)}) ${digitos.slice(2)}`;
  return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7)}`;
}

export function RenderPergunta({ pergunta, valor, onChange, onBlur, erro }: RenderPerguntaProps) {
  const inputBase = cn(
    "min-h-[44px] w-full rounded-input border bg-surface-600 px-4 py-3 text-corpo-mobile text-branco-frio placeholder:text-cinza-prata transition-colors duration-micro ease-marca",
    erro ? "border-erro" : "border-branco-frio/10 focus:border-azul-celeste",
  );

  let controle: React.ReactNode;

  switch (pergunta.tipo) {
    case "texto": {
      controle = (
        <input
          type="text"
          className={inputBase}
          value={(valor as string) ?? ""}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
        />
      );
      break;
    }

    case "textarea": {
      const texto = (valor as string) ?? "";
      controle = (
        <div>
          <textarea
            rows={3}
            className={inputBase}
            value={texto}
            onChange={(event) => onChange(event.target.value)}
            onBlur={onBlur}
          />
          <p className="mt-1 text-right text-sm text-cinza-prata">{texto.length} caracteres</p>
        </div>
      );
      break;
    }

    case "email": {
      controle = (
        <input
          type="email"
          inputMode="email"
          placeholder="voce@exemplo.com"
          className={inputBase}
          value={(valor as string) ?? ""}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
        />
      );
      break;
    }

    case "telefone": {
      controle = (
        <input
          type="tel"
          inputMode="numeric"
          placeholder="(00) 00000-0000"
          className={inputBase}
          value={(valor as string) ?? ""}
          onChange={(event) => onChange(formatarTelefone(event.target.value))}
          onBlur={onBlur}
        />
      );
      break;
    }

    case "unica": {
      const opcoes = obterOpcoes(pergunta);
      controle = (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {opcoes.map((opcao) => (
            <CartaoOpcao
              key={opcao.valor}
              rotulo={opcao.rotulo}
              selecionado={valor === opcao.valor}
              onClick={() => onChange(opcao.valor)}
            />
          ))}
        </div>
      );
      break;
    }

    case "multipla": {
      const opcoes = obterOpcoes(pergunta);
      const selecionados = Array.isArray(valor) ? (valor as string[]) : [];
      controle = (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {opcoes.map((opcao) => {
            const marcado = selecionados.includes(opcao.valor);
            return (
              <CartaoOpcao
                key={opcao.valor}
                rotulo={opcao.rotulo}
                selecionado={marcado}
                onClick={() => {
                  const proximo = marcado
                    ? selecionados.filter((item) => item !== opcao.valor)
                    : [...selecionados, opcao.valor];
                  onChange(proximo);
                }}
              />
            );
          })}
        </div>
      );
      break;
    }

    case "escala": {
      const config = (pergunta.opcoes as ConfigEscala | null) ?? {};
      const min = config.min ?? 1;
      const max = config.max ?? 5;
      const pontos = Array.from({ length: max - min + 1 }, (_, indice) => min + indice);
      controle = (
        <div>
          <div className="flex flex-wrap items-center gap-2">
            {pontos.map((ponto) => (
              <button
                key={ponto}
                type="button"
                aria-pressed={valor === ponto}
                onClick={() => onChange(ponto)}
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-input border font-display text-corpo-mobile transition-colors duration-micro ease-marca",
                  valor === ponto
                    ? "border-azul-celeste bg-azul-celeste/[0.08] text-branco-frio"
                    : "border-branco-frio/10 text-cinza-prata hover:border-branco-frio/25",
                )}
              >
                {ponto}
              </button>
            ))}
          </div>
          {(config.rotulo_min || config.rotulo_max) && (
            <div className="mt-2 flex justify-between text-sm text-cinza-prata">
              <span>{config.rotulo_min}</span>
              <span>{config.rotulo_max}</span>
            </div>
          )}
        </div>
      );
      break;
    }

    case "nps": {
      const pontos = Array.from({ length: 11 }, (_, indice) => indice);
      controle = (
        <div className="flex flex-wrap gap-2">
          {pontos.map((ponto) => (
            <button
              key={ponto}
              type="button"
              aria-pressed={valor === ponto}
              onClick={() => onChange(ponto)}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-input border font-display text-sm transition-colors duration-micro ease-marca",
                valor === ponto
                  ? "border-azul-celeste bg-azul-celeste/[0.08] text-branco-frio"
                  : "border-branco-frio/10 text-cinza-prata hover:border-branco-frio/25",
              )}
            >
              {ponto}
            </button>
          ))}
        </div>
      );
      break;
    }

    case "consentimento": {
      controle = (
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={Boolean(valor)}
            onChange={(event) => onChange(event.target.checked)}
            className={cn(
              "mt-0.5 h-5 w-5 flex-shrink-0 rounded-tag border bg-surface-600 accent-azul-royal",
              erro ? "border-erro" : "border-branco-frio/20",
            )}
          />
          <span className="text-corpo-mobile text-cinza-prata sm:text-corpo">
            {pergunta.enunciado}{" "}
            <Link href="/politica-de-privacidade" target="_blank" className="text-azul-celeste hover:underline">
              Ver a política de privacidade
            </Link>
            .
          </span>
        </label>
      );
      break;
    }

    default:
      controle = null;
  }

  const mostrarEnunciadoProprio = pergunta.tipo !== "consentimento";

  return (
    <div className="flex flex-col gap-2">
      {mostrarEnunciadoProprio && (
        <label className="font-display text-corpo-mobile font-medium text-branco-frio sm:text-corpo">
          {pergunta.enunciado}
          {pergunta.obrigatoria && <span className="text-azul-celeste"> *</span>}
        </label>
      )}
      {pergunta.ajuda && (
        <p className="text-sm text-cinza-prata">{pergunta.ajuda}</p>
      )}
      {controle}
      {erro && <p className="font-body text-sm text-erro">{erro}</p>}
    </div>
  );
}
