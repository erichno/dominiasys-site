import "server-only";
import { asc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { pesquisas, pesquisaLinks, perguntas as perguntasTable } from "@/lib/db/schema";
import redis from "@/lib/redis";

export interface PesquisaPublica {
  pesquisa: {
    id: string;
    titulo: string;
    descricao: string | null;
    mensagemFinal: string | null;
  };
  link: { id: string; rotulo: string; origem: string | null };
  perguntas: Array<{
    id: string;
    ordem: number;
    tipo: string;
    enunciado: string;
    ajuda: string | null;
    obrigatoria: boolean;
    opcoes: unknown;
  }>;
}

const TTL_CACHE_SEGUNDOS = 300;

/** Exportada para as mutações do admin invalidarem o mesmo formato de chave. */
export function chaveCachePesquisa(token: string) {
  return `pesquisa:token:${token}`;
}

/**
 * As 5 regras de validação de `/p/[token]`, na ordem exata da spec (seção
 * 3). Retorna null se qualquer uma falhar — de propósito, sem dizer qual.
 * Sempre lê direto do banco: é o portão de verdade, nunca usa cache.
 */
export async function consultarTokenNoBanco(token: string): Promise<PesquisaPublica | null> {
  const [link] = await db
    .select()
    .from(pesquisaLinks)
    .where(eq(pesquisaLinks.token, token))
    .limit(1);

  // 1. Token existe
  if (!link) return null;
  // 2. ativo = true
  if (!link.ativo) return null;
  // 3. expira_em nulo ou no futuro
  if (link.expiraEm && link.expiraEm.getTime() <= Date.now()) return null;
  // 4. max_usos nulo ou usos < max_usos
  if (link.maxUsos !== null && link.usos >= link.maxUsos) return null;

  const [pesquisa] = await db
    .select()
    .from(pesquisas)
    .where(eq(pesquisas.id, link.pesquisaId))
    .limit(1);

  if (!pesquisa) return null;
  // 5. status = 'ativa'
  if (pesquisa.status !== "ativa") return null;

  const listaPerguntas = await db
    .select()
    .from(perguntasTable)
    .where(eq(perguntasTable.pesquisaId, pesquisa.id))
    .orderBy(asc(perguntasTable.ordem));

  return {
    pesquisa: {
      id: pesquisa.id,
      titulo: pesquisa.titulo,
      descricao: pesquisa.descricao,
      mensagemFinal: pesquisa.mensagemFinal,
    },
    link: { id: link.id, rotulo: link.rotulo, origem: link.origem },
    perguntas: listaPerguntas.map((pergunta) => ({
      id: pergunta.id,
      ordem: pergunta.ordem,
      tipo: pergunta.tipo,
      enunciado: pergunta.enunciado,
      ajuda: pergunta.ajuda,
      obrigatoria: pergunta.obrigatoria,
      opcoes: pergunta.opcoes,
    })),
  };
}

/**
 * Cache-aside por token, TTL 5 min (spec seção 3). Usada só pela página
 * (GET) — a API de envio (POST) sempre revalida direto no banco, nunca
 * confia no cache para a decisão de aceitar ou não a resposta.
 */
export async function buscarPesquisaPublicaPorToken(token: string): Promise<PesquisaPublica | null> {
  const chave = chaveCachePesquisa(token);

  try {
    const emCache = await redis.get(chave);
    if (emCache) return JSON.parse(emCache) as PesquisaPublica;
  } catch (error) {
    console.warn("Cache de pesquisa indisponível, caindo para o banco:", error);
  }

  const resultado = await consultarTokenNoBanco(token);
  if (!resultado) return null;

  try {
    await redis.set(chave, JSON.stringify(resultado), "EX", TTL_CACHE_SEGUNDOS);
  } catch (error) {
    console.warn("Não consegui gravar o cache de pesquisa:", error);
  }

  return resultado;
}
