import "server-only";
import { sql } from "drizzle-orm";
import { db } from "@/lib/db";

export interface MetricasDashboard {
  respostas7dias: number;
  respostas30dias: number;
  taxaConclusao: number;
  leadsNovos: number;
}

export interface TemaVotado {
  rotulo: string;
  total: number;
}

export interface PesquisaAtivaResumo {
  id: string;
  titulo: string;
  totalRespostas: number;
}

export interface RespostaRecente {
  id: string;
  pesquisaTitulo: string;
  linkRotulo: string | null;
  iniciadaEm: Date;
  concluida: boolean;
}

export async function buscarMetricasDashboard(): Promise<MetricasDashboard> {
  const resultado = await db.execute<{
    respostas_7_dias: string;
    respostas_30_dias: string;
    total_geral: string;
    concluidas_geral: string;
    leads_novos: string;
  }>(sql`
    select
      count(*) filter (where r.iniciada_em >= now() - interval '7 days') as respostas_7_dias,
      count(*) filter (where r.iniciada_em >= now() - interval '30 days') as respostas_30_dias,
      count(*) as total_geral,
      count(*) filter (where r.concluida_em is not null) as concluidas_geral,
      (select count(*) from leads where criado_em >= now() - interval '7 days') as leads_novos
    from respostas r
  `);
  const linha = resultado.rows[0];

  const total = Number(linha?.total_geral ?? 0);
  const concluidas = Number(linha?.concluidas_geral ?? 0);

  return {
    respostas7dias: Number(linha?.respostas_7_dias ?? 0),
    respostas30dias: Number(linha?.respostas_30_dias ?? 0),
    taxaConclusao: total > 0 ? Math.round((concluidas / total) * 100) : 0,
    leadsNovos: Number(linha?.leads_novos ?? 0),
  };
}

/**
 * Agrega as opções escolhidas em qualquer pergunta única/múltipla, de
 * qualquer pesquisa, resolvendo o rótulo de cada uma pelas `opcoes` da
 * própria pergunta (evita colisão entre perguntas que usam o mesmo `valor`
 * com rótulos diferentes).
 */
export async function buscarTopTemas(limite = 5): Promise<TemaVotado[]> {
  const resultado = await db.execute<{ rotulo: string; total: string }>(sql`
    with respostas_expandidas as (
      select ri.pergunta_id, jsonb_array_elements_text(ri.valor_json) as valor
      from respostas_itens ri
      join perguntas p on p.id = ri.pergunta_id
      where p.tipo = 'multipla' and ri.valor_json is not null
      union all
      select ri.pergunta_id, ri.valor_texto as valor
      from respostas_itens ri
      join perguntas p on p.id = ri.pergunta_id
      where p.tipo = 'unica' and ri.valor_texto is not null
    ),
    com_rotulo as (
      select
        coalesce(
          (
            select opcao ->> 'rotulo'
            from jsonb_array_elements(p.opcoes) as opcao
            where opcao ->> 'valor' = re.valor
            limit 1
          ),
          re.valor
        ) as rotulo
      from respostas_expandidas re
      join perguntas p on p.id = re.pergunta_id
    )
    select rotulo, count(*) as total
    from com_rotulo
    group by rotulo
    order by total desc, rotulo asc
    limit ${limite}
  `);

  return resultado.rows.map((linha) => ({ rotulo: linha.rotulo, total: Number(linha.total) }));
}

export async function buscarPesquisasAtivasComContagem(): Promise<PesquisaAtivaResumo[]> {
  const resultado = await db.execute<{ id: string; titulo: string; total_respostas: string }>(sql`
    select
      p.id,
      p.titulo,
      count(r.id) as total_respostas
    from pesquisas p
    left join respostas r on r.pesquisa_id = p.id
    where p.status = 'ativa'
    group by p.id, p.titulo
    order by p.criado_em desc
  `);

  return resultado.rows.map((linha) => ({
    id: linha.id,
    titulo: linha.titulo,
    totalRespostas: Number(linha.total_respostas),
  }));
}

export async function buscarUltimasRespostas(limite = 10): Promise<RespostaRecente[]> {
  const resultado = await db.execute<{
    id: string;
    pesquisa_titulo: string;
    link_rotulo: string | null;
    iniciada_em: Date;
    concluida_em: Date | null;
  }>(sql`
    select
      r.id,
      p.titulo as pesquisa_titulo,
      pl.rotulo as link_rotulo,
      r.iniciada_em,
      r.concluida_em
    from respostas r
    join pesquisas p on p.id = r.pesquisa_id
    left join pesquisa_links pl on pl.id = r.link_id
    order by r.iniciada_em desc
    limit ${limite}
  `);

  return resultado.rows.map((linha) => ({
    id: linha.id,
    pesquisaTitulo: linha.pesquisa_titulo,
    linkRotulo: linha.link_rotulo,
    iniciadaEm: new Date(linha.iniciada_em),
    concluida: linha.concluida_em !== null,
  }));
}

export async function haAlgumaResposta(): Promise<boolean> {
  const resultado = await db.execute<{ existe: boolean }>(
    sql`select exists(select 1 from respostas) as existe`,
  );
  return Boolean(resultado.rows[0]?.existe);
}
