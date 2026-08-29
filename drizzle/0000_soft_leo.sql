CREATE EXTENSION IF NOT EXISTS pgcrypto;--> statement-breakpoint
CREATE EXTENSION IF NOT EXISTS citext;--> statement-breakpoint
CREATE TYPE "public"."curso_status" AS ENUM('ideia', 'validando', 'producao', 'publicado', 'descartado');--> statement-breakpoint
CREATE TYPE "public"."pergunta_tipo" AS ENUM('texto', 'textarea', 'escala', 'unica', 'multipla', 'nps', 'email', 'telefone', 'consentimento');--> statement-breakpoint
CREATE TYPE "public"."pesquisa_status" AS ENUM('rascunho', 'ativa', 'encerrada');--> statement-breakpoint
CREATE TABLE "cursos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"titulo" text NOT NULL,
	"slug" text NOT NULL,
	"descricao" text,
	"nivel" text,
	"status" "curso_status" DEFAULT 'ideia' NOT NULL,
	"criado_em" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "cursos_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "leads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nome" text,
	"email" text,
	"whatsapp" text,
	"empresa" text,
	"porte" text,
	"desafio" text,
	"origem" text NOT NULL,
	"resposta_id" uuid,
	"score" text,
	"utm" jsonb,
	"criado_em" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "perguntas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"pesquisa_id" uuid NOT NULL,
	"ordem" integer NOT NULL,
	"tipo" "pergunta_tipo" NOT NULL,
	"enunciado" text NOT NULL,
	"ajuda" text,
	"obrigatoria" boolean DEFAULT false NOT NULL,
	"opcoes" jsonb
);
--> statement-breakpoint
CREATE TABLE "pesquisa_links" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"pesquisa_id" uuid NOT NULL,
	"token" text NOT NULL,
	"rotulo" text NOT NULL,
	"origem" text,
	"expira_em" timestamp with time zone,
	"max_usos" integer,
	"usos" integer DEFAULT 0 NOT NULL,
	"ativo" boolean DEFAULT true NOT NULL,
	"criado_em" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "pesquisa_links_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "pesquisas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"curso_id" uuid,
	"titulo" text NOT NULL,
	"descricao" text,
	"status" "pesquisa_status" DEFAULT 'rascunho' NOT NULL,
	"mensagem_final" text,
	"criado_em" timestamp with time zone DEFAULT now() NOT NULL,
	"atualizado_em" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "respostas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"pesquisa_id" uuid NOT NULL,
	"link_id" uuid,
	"iniciada_em" timestamp with time zone DEFAULT now() NOT NULL,
	"concluida_em" timestamp with time zone,
	"ip_hash" text,
	"user_agent" text,
	"consentimento" boolean DEFAULT false NOT NULL,
	"utm" jsonb
);
--> statement-breakpoint
CREATE TABLE "respostas_itens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"resposta_id" uuid NOT NULL,
	"pergunta_id" uuid NOT NULL,
	"valor_texto" text,
	"valor_num" numeric,
	"valor_json" jsonb
);
--> statement-breakpoint
CREATE TABLE "usuarios" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" "citext" NOT NULL,
	"senha_hash" text NOT NULL,
	"nome" text NOT NULL,
	"papel" text DEFAULT 'admin' NOT NULL,
	"ativo" boolean DEFAULT true NOT NULL,
	"ultimo_login" timestamp with time zone,
	"criado_em" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "usuarios_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads_resposta_id_respostas_id_fk" FOREIGN KEY ("resposta_id") REFERENCES "public"."respostas"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "perguntas" ADD CONSTRAINT "perguntas_pesquisa_id_pesquisas_id_fk" FOREIGN KEY ("pesquisa_id") REFERENCES "public"."pesquisas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pesquisa_links" ADD CONSTRAINT "pesquisa_links_pesquisa_id_pesquisas_id_fk" FOREIGN KEY ("pesquisa_id") REFERENCES "public"."pesquisas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pesquisas" ADD CONSTRAINT "pesquisas_curso_id_cursos_id_fk" FOREIGN KEY ("curso_id") REFERENCES "public"."cursos"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "respostas" ADD CONSTRAINT "respostas_pesquisa_id_pesquisas_id_fk" FOREIGN KEY ("pesquisa_id") REFERENCES "public"."pesquisas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "respostas" ADD CONSTRAINT "respostas_link_id_pesquisa_links_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."pesquisa_links"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "respostas_itens" ADD CONSTRAINT "respostas_itens_resposta_id_respostas_id_fk" FOREIGN KEY ("resposta_id") REFERENCES "public"."respostas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "respostas_itens" ADD CONSTRAINT "respostas_itens_pergunta_id_perguntas_id_fk" FOREIGN KEY ("pergunta_id") REFERENCES "public"."perguntas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "leads_criado_em_idx" ON "leads" USING btree ("criado_em" DESC NULLS LAST);--> statement-breakpoint
CREATE UNIQUE INDEX "perguntas_pesquisa_id_ordem_key" ON "perguntas" USING btree ("pesquisa_id","ordem");--> statement-breakpoint
CREATE INDEX "perguntas_pesquisa_id_ordem_idx" ON "perguntas" USING btree ("pesquisa_id","ordem");--> statement-breakpoint
CREATE INDEX "pesquisa_links_pesquisa_id_idx" ON "pesquisa_links" USING btree ("pesquisa_id");--> statement-breakpoint
CREATE INDEX "respostas_pesquisa_id_concluida_em_idx" ON "respostas" USING btree ("pesquisa_id","concluida_em" DESC NULLS LAST);--> statement-breakpoint
CREATE UNIQUE INDEX "respostas_itens_resposta_id_pergunta_id_key" ON "respostas_itens" USING btree ("resposta_id","pergunta_id");--> statement-breakpoint
CREATE INDEX "respostas_itens_pergunta_id_idx" ON "respostas_itens" USING btree ("pergunta_id");