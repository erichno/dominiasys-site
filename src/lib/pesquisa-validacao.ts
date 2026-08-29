import "server-only";
import { z } from "zod";
import type { PesquisaPublica } from "@/lib/db/queries/pesquisas";

export const itemRespostaSchema = z.object({
  perguntaId: z.string().uuid(),
  valorTexto: z.string().optional(),
  valorNum: z.number().optional(),
  valorJson: z.unknown().optional(),
});

export const respostaPesquisaSchema = z.object({
  turnstileToken: z.string().min(1, "Verificação de segurança ausente."),
  consentimento: z.boolean(),
  utm: z.record(z.string(), z.string()).optional(),
  itens: z.array(itemRespostaSchema),
});

export type RespostaPesquisaInput = z.infer<typeof respostaPesquisaSchema>;
type ItemRespostaInput = z.infer<typeof itemRespostaSchema>;
type PerguntaPublica = PesquisaPublica["perguntas"][number];

export interface ItemValidado {
  perguntaId: string;
  valorTexto: string | null;
  valorNum: number | null;
  valorJson: unknown;
}

type ResultadoValidacao =
  | { ok: true; itens: ItemValidado[] }
  | { ok: false; erro: string };

const TELEFONE_REGEX = /^\D*(\d\D*){10,11}$/;

function opcoesPermitidas(pergunta: PerguntaPublica): string[] {
  const opcoes = pergunta.opcoes as Array<{ valor: string; rotulo: string }> | null;
  return Array.isArray(opcoes) ? opcoes.map((opcao) => opcao.valor) : [];
}

function itemEstaVazio(item: ItemRespostaInput | undefined): boolean {
  if (!item) return true;
  const semValor =
    item.valorTexto === undefined && item.valorNum === undefined && item.valorJson === undefined;
  return semValor || item.valorTexto === "";
}

/**
 * Valida os itens enviados contra as perguntas REAIS da pesquisa (buscadas
 * fresco do banco, nunca do cache) — tipo, obrigatoriedade e opções
 * permitidas, exatamente como pede a seção 5 da spec. A pergunta do tipo
 * "consentimento" não vem em `itens`: o valor é o campo `consentimento` do
 * corpo da requisição, sintetizado aqui como um item para persistir junto.
 */
export function validarRespostasPesquisa(
  perguntas: PesquisaPublica["perguntas"],
  itens: ItemRespostaInput[],
  consentimentoGeral: boolean,
): ResultadoValidacao {
  const idsValidos = new Set(perguntas.map((pergunta) => pergunta.id));
  for (const item of itens) {
    if (!idsValidos.has(item.perguntaId)) {
      return { ok: false, erro: "Resposta inválida." };
    }
  }

  const itensPorPergunta = new Map(itens.map((item) => [item.perguntaId, item]));
  const itensValidados: ItemValidado[] = [];

  for (const pergunta of perguntas) {
    if (pergunta.tipo === "consentimento") {
      if (pergunta.obrigatoria && consentimentoGeral !== true) {
        return { ok: false, erro: "É preciso concordar para enviar." };
      }
      itensValidados.push({
        perguntaId: pergunta.id,
        valorTexto: null,
        valorNum: null,
        valorJson: consentimentoGeral,
      });
      continue;
    }

    const item = itensPorPergunta.get(pergunta.id);
    const vazio = itemEstaVazio(item);

    if (pergunta.obrigatoria && vazio) {
      return { ok: false, erro: `Resposta obrigatória: "${pergunta.enunciado}".` };
    }
    if (vazio || !item) continue;

    switch (pergunta.tipo) {
      case "texto":
      case "textarea": {
        if (typeof item.valorTexto !== "string" || item.valorTexto.trim().length === 0) {
          return { ok: false, erro: `Resposta inválida em "${pergunta.enunciado}".` };
        }
        break;
      }
      case "email": {
        if (!item.valorTexto || !z.string().email().safeParse(item.valorTexto).success) {
          return { ok: false, erro: `E-mail inválido em "${pergunta.enunciado}".` };
        }
        break;
      }
      case "telefone": {
        if (typeof item.valorTexto !== "string" || !TELEFONE_REGEX.test(item.valorTexto)) {
          return { ok: false, erro: `Telefone inválido em "${pergunta.enunciado}".` };
        }
        break;
      }
      case "unica": {
        const permitidas = opcoesPermitidas(pergunta);
        if (typeof item.valorTexto !== "string" || !permitidas.includes(item.valorTexto)) {
          return { ok: false, erro: `Opção inválida em "${pergunta.enunciado}".` };
        }
        break;
      }
      case "multipla": {
        const permitidas = opcoesPermitidas(pergunta);
        const valores = Array.isArray(item.valorJson) ? item.valorJson : null;
        const todasValidas =
          valores !== null &&
          valores.length > 0 &&
          valores.every((valor) => typeof valor === "string" && permitidas.includes(valor));
        if (!todasValidas) {
          return { ok: false, erro: `Opção inválida em "${pergunta.enunciado}".` };
        }
        break;
      }
      case "escala": {
        const config = pergunta.opcoes as { min?: number; max?: number } | null;
        const min = config?.min ?? 1;
        const max = config?.max ?? 5;
        if (typeof item.valorNum !== "number" || item.valorNum < min || item.valorNum > max) {
          return { ok: false, erro: `Valor inválido em "${pergunta.enunciado}".` };
        }
        break;
      }
      case "nps": {
        if (typeof item.valorNum !== "number" || item.valorNum < 0 || item.valorNum > 10) {
          return { ok: false, erro: `Valor inválido em "${pergunta.enunciado}".` };
        }
        break;
      }
    }

    itensValidados.push({
      perguntaId: pergunta.id,
      valorTexto: item.valorTexto ?? null,
      valorNum: item.valorNum ?? null,
      valorJson: item.valorJson ?? null,
    });
  }

  return { ok: true, itens: itensValidados };
}
