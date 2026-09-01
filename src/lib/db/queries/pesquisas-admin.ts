import "server-only";
import { asc, desc, eq } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { cursos, perguntas, pesquisaLinks, pesquisas } from "@/lib/db/schema";
import redis from "@/lib/redis";
import { chaveCachePesquisa } from "@/lib/db/queries/pesquisas";

export interface PesquisaResumo {
  id: string;
  titulo: string;
  status: string;
  criadoEm: Date;
  totalPerguntas: number;
  totalRespostas: number;
  linksAtivos: number;
}

export async function listarPesquisas(): Promise<PesquisaResumo[]> {
  const resultado = await db.execute<{
    id: string;
    titulo: string;
    status: string;
    criado_em: Date;
    total_perguntas: string;
    total_respostas: string;
    links_ativos: string;
  }>(sql`
    select
      p.id,
      p.titulo,
      p.status,
      p.criado_em,
      (select count(*) from perguntas where pesquisa_id = p.id) as total_perguntas,
      (select count(*) from respostas where pesquisa_id = p.id) as total_respostas,
      (select count(*) from pesquisa_links where pesquisa_id = p.id and ativo = true) as links_ativos
    from pesquisas p
    order by p.criado_em desc
  `);

  return resultado.rows.map((linha) => ({
    id: linha.id,
    titulo: linha.titulo,
    status: linha.status,
    criadoEm: new Date(linha.criado_em),
    totalPerguntas: Number(linha.total_perguntas),
    totalRespostas: Number(linha.total_respostas),
    linksAtivos: Number(linha.links_ativos),
  }));
}

export async function buscarPesquisaParaEditor(id: string) {
  const [pesquisa] = await db.select().from(pesquisas).where(eq(pesquisas.id, id)).limit(1);
  if (!pesquisa) return null;

  const listaPerguntas = await db
    .select()
    .from(perguntas)
    .where(eq(perguntas.pesquisaId, id))
    .orderBy(asc(perguntas.ordem));

  const todosOsCursos = await db.select().from(cursos).orderBy(asc(cursos.titulo));

  return { pesquisa, perguntas: listaPerguntas, cursos: todosOsCursos };
}

/** Usada só por /p/preview/[id] — ignora token, link e cache de propósito. */
export async function buscarPesquisaParaPreview(id: string) {
  const [pesquisa] = await db.select().from(pesquisas).where(eq(pesquisas.id, id)).limit(1);
  if (!pesquisa) return null;

  const listaPerguntas = await db
    .select()
    .from(perguntas)
    .where(eq(perguntas.pesquisaId, id))
    .orderBy(asc(perguntas.ordem));

  return { pesquisa, perguntas: listaPerguntas };
}

export async function pesquisaTemResposta(pesquisaId: string): Promise<boolean> {
  const resultado = await db.execute<{ existe: boolean }>(sql`
    select exists(select 1 from respostas where pesquisa_id = ${pesquisaId}) as existe
  `);
  return Boolean(resultado.rows[0]?.existe);
}

export async function listarLinksDaPesquisa(pesquisaId: string) {
  return db
    .select()
    .from(pesquisaLinks)
    .where(eq(pesquisaLinks.pesquisaId, pesquisaId))
    .orderBy(desc(pesquisaLinks.criadoEm));
}

/**
 * Invalida o cache de TODOS os links dessa pesquisa — o conteúdo (perguntas)
 * é compartilhado por todos eles, então editar uma pergunta invalida todo
 * mundo, não só um token.
 */
export async function invalidarCachePesquisa(pesquisaId: string): Promise<void> {
  const links = await db
    .select({ token: pesquisaLinks.token })
    .from(pesquisaLinks)
    .where(eq(pesquisaLinks.pesquisaId, pesquisaId));

  if (links.length === 0) return;

  try {
    await redis.del(...links.map((link) => chaveCachePesquisa(link.token)));
  } catch (error) {
    console.warn("Não consegui invalidar o cache da pesquisa:", error);
  }
}

/** Invalida só o cache de um link específico (ex.: ao desativar/reativar). */
export async function invalidarCacheLink(token: string): Promise<void> {
  try {
    await redis.del(chaveCachePesquisa(token));
  } catch (error) {
    console.warn("Não consegui invalidar o cache do link:", error);
  }
}
