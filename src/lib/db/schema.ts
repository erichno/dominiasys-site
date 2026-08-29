import {
  boolean,
  customType,
  index,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

/**
 * Postgres nativo, sem tipo equivalente no drizzle-orm/pg-core. Requer
 * `create extension if not exists citext;` (ver drizzle/0000_*.sql).
 */
const citext = customType<{ data: string }>({
  dataType() {
    return "citext";
  },
});

export const cursoStatusEnum = pgEnum("curso_status", [
  "ideia",
  "validando",
  "producao",
  "publicado",
  "descartado",
]);

export const pesquisaStatusEnum = pgEnum("pesquisa_status", [
  "rascunho",
  "ativa",
  "encerrada",
]);

export const perguntaTipoEnum = pgEnum("pergunta_tipo", [
  "texto",
  "textarea",
  "escala",
  "unica",
  "multipla",
  "nps",
  "email",
  "telefone",
  "consentimento",
]);

export const cursos = pgTable("cursos", {
  id: uuid("id").primaryKey().defaultRandom(),
  titulo: text("titulo").notNull(),
  slug: text("slug").notNull().unique(),
  descricao: text("descricao"),
  nivel: text("nivel"),
  status: cursoStatusEnum("status").notNull().default("ideia"),
  criadoEm: timestamp("criado_em", { withTimezone: true }).notNull().defaultNow(),
});

export const pesquisas = pgTable("pesquisas", {
  id: uuid("id").primaryKey().defaultRandom(),
  cursoId: uuid("curso_id").references(() => cursos.id, { onDelete: "set null" }),
  titulo: text("titulo").notNull(),
  descricao: text("descricao"),
  status: pesquisaStatusEnum("status").notNull().default("rascunho"),
  /** Texto da tela de obrigado. */
  mensagemFinal: text("mensagem_final"),
  criadoEm: timestamp("criado_em", { withTimezone: true }).notNull().defaultNow(),
  atualizadoEm: timestamp("atualizado_em", { withTimezone: true }).notNull().defaultNow(),
});

export const perguntas = pgTable(
  "perguntas",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    pesquisaId: uuid("pesquisa_id")
      .notNull()
      .references(() => pesquisas.id, { onDelete: "cascade" }),
    ordem: integer("ordem").notNull(),
    tipo: perguntaTipoEnum("tipo").notNull(),
    enunciado: text("enunciado").notNull(),
    ajuda: text("ajuda"),
    obrigatoria: boolean("obrigatoria").notNull().default(false),
    /**
     * [{valor,rotulo}] para unica/multipla;
     * {min,max,rotulo_min,rotulo_max} para escala.
     */
    opcoes: jsonb("opcoes"),
  },
  (table) => [
    uniqueIndex("perguntas_pesquisa_id_ordem_key").on(table.pesquisaId, table.ordem),
    index("perguntas_pesquisa_id_ordem_idx").on(table.pesquisaId, table.ordem),
  ],
);

export const pesquisaLinks = pgTable(
  "pesquisa_links",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    pesquisaId: uuid("pesquisa_id")
      .notNull()
      .references(() => pesquisas.id, { onDelete: "cascade" }),
    token: text("token").notNull().unique(),
    /** Uso interno: "Turma mentoria set/26". */
    rotulo: text("rotulo").notNull(),
    /** whatsapp | linkedin | evento | email | cliente */
    origem: text("origem"),
    expiraEm: timestamp("expira_em", { withTimezone: true }),
    maxUsos: integer("max_usos"),
    usos: integer("usos").notNull().default(0),
    ativo: boolean("ativo").notNull().default(true),
    criadoEm: timestamp("criado_em", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("pesquisa_links_pesquisa_id_idx").on(table.pesquisaId)],
);

export const respostas = pgTable(
  "respostas",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    pesquisaId: uuid("pesquisa_id")
      .notNull()
      .references(() => pesquisas.id, { onDelete: "cascade" }),
    linkId: uuid("link_id").references(() => pesquisaLinks.id, { onDelete: "set null" }),
    iniciadaEm: timestamp("iniciada_em", { withTimezone: true }).notNull().defaultNow(),
    concluidaEm: timestamp("concluida_em", { withTimezone: true }),
    /** sha256(ip + salt). Nunca o IP puro. */
    ipHash: text("ip_hash"),
    userAgent: text("user_agent"),
    consentimento: boolean("consentimento").notNull().default(false),
    utm: jsonb("utm"),
  },
  (table) => [
    index("respostas_pesquisa_id_concluida_em_idx").on(
      table.pesquisaId,
      table.concluidaEm.desc(),
    ),
  ],
);

export const respostasItens = pgTable(
  "respostas_itens",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    respostaId: uuid("resposta_id")
      .notNull()
      .references(() => respostas.id, { onDelete: "cascade" }),
    perguntaId: uuid("pergunta_id")
      .notNull()
      .references(() => perguntas.id, { onDelete: "cascade" }),
    valorTexto: text("valor_texto"),
    valorNum: numeric("valor_num"),
    /** múltipla escolha */
    valorJson: jsonb("valor_json"),
  },
  (table) => [
    uniqueIndex("respostas_itens_resposta_id_pergunta_id_key").on(
      table.respostaId,
      table.perguntaId,
    ),
    index("respostas_itens_pergunta_id_idx").on(table.perguntaId),
  ],
);

export const leads = pgTable(
  "leads",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    nome: text("nome"),
    email: text("email"),
    whatsapp: text("whatsapp"),
    empresa: text("empresa"),
    porte: text("porte"),
    desafio: text("desafio"),
    /** 'diagnostico' | 'pesquisa' | 'contato' */
    origem: text("origem").notNull(),
    respostaId: uuid("resposta_id").references(() => respostas.id, { onDelete: "set null" }),
    /** A | B | C, preenchido pelo n8n */
    score: text("score"),
    utm: jsonb("utm"),
    criadoEm: timestamp("criado_em", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("leads_criado_em_idx").on(table.criadoEm.desc())],
);

export const usuarios = pgTable("usuarios", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: citext("email").notNull().unique(),
  /** argon2id */
  senhaHash: text("senha_hash").notNull(),
  nome: text("nome").notNull(),
  /** admin | editor */
  papel: text("papel").notNull().default("admin"),
  ativo: boolean("ativo").notNull().default(true),
  ultimoLogin: timestamp("ultimo_login", { withTimezone: true }),
  criadoEm: timestamp("criado_em", { withTimezone: true }).notNull().defaultNow(),
});

export type Curso = typeof cursos.$inferSelect;
export type NovoCurso = typeof cursos.$inferInsert;
export type Pesquisa = typeof pesquisas.$inferSelect;
export type NovaPesquisa = typeof pesquisas.$inferInsert;
export type Pergunta = typeof perguntas.$inferSelect;
export type NovaPergunta = typeof perguntas.$inferInsert;
export type PesquisaLink = typeof pesquisaLinks.$inferSelect;
export type NovoPesquisaLink = typeof pesquisaLinks.$inferInsert;
export type Resposta = typeof respostas.$inferSelect;
export type NovaResposta = typeof respostas.$inferInsert;
export type RespostaItem = typeof respostasItens.$inferSelect;
export type NovoRespostaItem = typeof respostasItens.$inferInsert;
export type Lead = typeof leads.$inferSelect;
export type NovoLead = typeof leads.$inferInsert;
export type Usuario = typeof usuarios.$inferSelect;
export type NovoUsuario = typeof usuarios.$inferInsert;
