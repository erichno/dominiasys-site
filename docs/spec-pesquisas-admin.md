# DOMINIA — Módulo de pesquisas de expectativa e área administrativa

Complemento da especificação da landing page. Cobre o que o documento v1.0 não cobre: links ocultos de pesquisa e `/admin`.

---

## 1. Para que serve

Erich distribui links não indexados para grupos específicos (turma da mentoria, lista do LinkedIn, participantes da Rodada de Negócios, clientes de consultoria). Cada link aponta para a mesma pesquisa, mas identifica a origem. As respostas dizem quais cursos construir, em que formato, para quem e a que preço.

Regra de produto: **responder não exige login**. Pedir cadastro antes da pesquisa derruba resposta pela metade. O e-mail é a última pergunta, opcional, e converte respondente em lead.

---

## 2. Modelo de dados

Postgres 16 self-hosted no Easypanel, acessado só pela rede interna da VPS. Migrations versionadas com Drizzle. Todos os ids em `uuid default gen_random_uuid()`, timestamps em `timestamptz`. Requer `create extension if not exists pgcrypto;`.

```sql
-- enums
create type curso_status    as enum ('ideia','validando','producao','publicado','descartado');
create type pesquisa_status as enum ('rascunho','ativa','encerrada');
create type pergunta_tipo   as enum ('texto','textarea','escala','unica','multipla','nps','email','telefone','consentimento');

create table cursos (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  slug text not null unique,
  descricao text,
  nivel text,
  status curso_status not null default 'ideia',
  criado_em timestamptz not null default now()
);

create table pesquisas (
  id uuid primary key default gen_random_uuid(),
  curso_id uuid references cursos(id) on delete set null,
  titulo text not null,
  descricao text,
  status pesquisa_status not null default 'rascunho',
  mensagem_final text,                      -- texto da tela de obrigado
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

create table perguntas (
  id uuid primary key default gen_random_uuid(),
  pesquisa_id uuid not null references pesquisas(id) on delete cascade,
  ordem int not null,
  tipo pergunta_tipo not null,
  enunciado text not null,
  ajuda text,
  obrigatoria boolean not null default false,
  opcoes jsonb,                             -- [{valor,rotulo}] para unica/multipla; {min,max,rotulo_min,rotulo_max} para escala
  unique (pesquisa_id, ordem)
);

create table pesquisa_links (
  id uuid primary key default gen_random_uuid(),
  pesquisa_id uuid not null references pesquisas(id) on delete cascade,
  token text not null unique,
  rotulo text not null,                     -- uso interno: "Turma mentoria set/26"
  origem text,                              -- whatsapp | linkedin | evento | email | cliente
  expira_em timestamptz,
  max_usos int,
  usos int not null default 0,
  ativo boolean not null default true,
  criado_em timestamptz not null default now()
);

create table respostas (
  id uuid primary key default gen_random_uuid(),
  pesquisa_id uuid not null references pesquisas(id) on delete cascade,
  link_id uuid references pesquisa_links(id) on delete set null,
  iniciada_em timestamptz not null default now(),
  concluida_em timestamptz,
  ip_hash text,                             -- sha256(ip + salt). Nunca o IP puro.
  user_agent text,
  consentimento boolean not null default false,
  utm jsonb
);

create table respostas_itens (
  id uuid primary key default gen_random_uuid(),
  resposta_id uuid not null references respostas(id) on delete cascade,
  pergunta_id uuid not null references perguntas(id) on delete cascade,
  valor_texto text,
  valor_num numeric,
  valor_json jsonb,                         -- múltipla escolha
  unique (resposta_id, pergunta_id)
);

create table leads (
  id uuid primary key default gen_random_uuid(),
  nome text,
  email text,
  whatsapp text,
  empresa text,
  porte text,
  desafio text,
  origem text not null,                     -- 'diagnostico' | 'pesquisa' | 'contato'
  resposta_id uuid references respostas(id) on delete set null,
  score text,                               -- A | B | C, preenchido pelo n8n
  utm jsonb,
  criado_em timestamptz not null default now()
);

create table usuarios (
  id uuid primary key default gen_random_uuid(),
  email citext not null unique,             -- requer extension citext
  senha_hash text not null,                 -- argon2id
  nome text not null,
  papel text not null default 'admin',      -- admin | editor
  ativo boolean not null default true,
  ultimo_login timestamptz,
  criado_em timestamptz not null default now()
);

create index on perguntas (pesquisa_id, ordem);
create index on pesquisa_links (pesquisa_id);
create index on respostas (pesquisa_id, concluida_em desc);
create index on respostas_itens (pergunta_id);
create index on leads (criado_em desc);
```

### Acesso ao banco

Não há RLS aqui, e não precisa: o Postgres nunca é exposto ao navegador. Ele escuta só na rede interna do Easypanel, sem porta publicada, e o único cliente é o próprio Next.js rodando no mesmo projeto.

A separação de privilégio fica na aplicação:

- Toda leitura de pesquisa e toda gravação de resposta acontece em server component ou API Route.
- O acesso do admin passa pela verificação de sessão no middleware antes de qualquer query.
- Um único usuário de banco para a aplicação, com senha forte, sem `SUPERUSER`.
- Pool de conexões com limite baixo (10), já que é uma instância só.

Isso evita expor estrutura de pesquisa e respostas de terceiros a quem tiver o token.

---

## 3. Link oculto: geração e validação

**Token**: 16 bytes de `crypto.randomBytes` em base62, ~22 caracteres. Nada sequencial, nada derivado do título.
Formato da URL: `https://dominia.com.br/p/7fK2mQpXa9Ld3RtVzB1cNe`

**Validação em `/p/[token]`**, nesta ordem, tudo no servidor:

1. Token existe → senão, página "Link indisponível" com status 404.
2. `pesquisa_links.ativo = true`
3. `expira_em` nulo ou no futuro
4. `max_usos` nulo ou `usos < max_usos`
5. `pesquisas.status = 'ativa'`

Falhou qualquer uma: mesma página neutra, sem revelar qual regra falhou.

> **Link indisponível**
> Esse link não está mais aberto para respostas. Se você recebeu por engano ou precisa responder, fale comigo no WhatsApp.

**Incremento de `usos`**: no envio concluído, não na abertura. Assim o limite conta resposta, não curiosidade.

**Proteções da rota pública**: `noindex` por header e meta, Turnstile no envio, rate limit de 5 envios por IP por hora contado no Redis, `ip_hash` em vez de IP, sem cookie de rastreamento.

**Cache**: a pesquisa e suas perguntas ficam em Redis por token, TTL de 5 minutos, invalidadas na edição da pesquisa e na desativação do link. Uma pesquisa aberta por cem pessoas ao mesmo tempo não deve virar cem consultas ao banco.

---

## 4. Página pública `/p/[token]`

Server component busca a pesquisa e as perguntas, passa para um form client.

Layout enxuto, mesma marca: fundo `--surface-800`, cartão central de 720 px, logo pequeno no topo, sem header de navegação e sem WhatsApp flutuante. Nada que leve o respondente para fora antes de terminar.

- Título da pesquisa em Poppins 600 40 px, descrição em Raleway 400.
- Barra de progresso fina em `--grad-marca` no topo do cartão.
- Uma pergunta por bloco, todas na mesma página, rolagem contínua. Sem wizard: o formulário tem 10 perguntas e o wizard só adiciona atrito.
- Validação no blur, mensagem abaixo do campo em `--erro`.
- Botão primário único: **Enviar respostas**.
- Rodapé do cartão com a linha de consentimento e link para a política.

Tipos de campo a renderizar em `components/pesquisa/RenderPergunta.tsx`:

| Tipo | Controle |
|---|---|
| `texto` | input de linha única |
| `textarea` | 3 linhas, contador opcional |
| `unica` | grupo de rádio em cartões clicáveis, borda celeste no selecionado |
| `multipla` | checkboxes em cartões, mesmo tratamento |
| `escala` | 5 botões numerados, rótulos nas pontas |
| `nps` | 0 a 10 em linha, quebra em duas linhas no mobile |
| `email`, `telefone` | input com máscara e validação |
| `consentimento` | checkbox com link para a política |

Sucesso: redireciona para `/p/[token]/obrigado`.

> **Recebido. Obrigado pelo tempo.**
> Sua resposta entra direto no desenho dos próximos cursos. Se você deixou e-mail, aviso quando a turma abrir.

---

## 5. API pública

### `POST /api/pesquisas/[token]/respostas`

Corpo:
```json
{
  "turnstileToken": "…",
  "consentimento": true,
  "utm": { "source": "…", "medium": "…", "campaign": "…" },
  "itens": [
    { "perguntaId": "uuid", "valorTexto": "…" },
    { "perguntaId": "uuid", "valorNum": 4 },
    { "perguntaId": "uuid", "valorJson": ["agentes", "n8n"] }
  ]
}
```

Fluxo: verifica Turnstile → rate limit → revalida o token pelas 5 regras → valida com zod contra as perguntas reais da pesquisa (tipo, obrigatoriedade, opções permitidas) → transação: insere `respostas`, insere `respostas_itens`, incrementa `usos` → se houver e-mail preenchido, insere em `leads` com `origem = 'pesquisa'` → dispara webhook n8n (fire and forget, falha do webhook não derruba a resposta).

Respostas: `201` sucesso · `400` payload inválido · `403` Turnstile · `404` link inválido ou encerrado · `429` rate limit.

**Payload do webhook n8n** (`N8N_WEBHOOK_PESQUISA`):
```json
{
  "evento": "pesquisa.respondida",
  "pesquisa": { "id": "…", "titulo": "…" },
  "link": { "rotulo": "Turma mentoria set/26", "origem": "whatsapp" },
  "respostaId": "…",
  "temEmail": true,
  "resumo": [{ "pergunta": "Qual problema você quer resolver?", "valor": "…" }]
}
```
O n8n formata e manda no WhatsApp do Erich via Evolution API.

---

## 6. Área administrativa

Auth: Auth.js v5 com provider de credenciais, senha em argon2id, sessão JWT em cookie `httpOnly`, `secure` e `sameSite=lax`, validade de 8 horas com renovação por atividade. Sem cadastro público — o primeiro usuário é criado por script de seed. Middleware protege `/admin/*`: sessão válida **e** usuário `ativo` na tabela `usuarios`, senão redireciona para `/admin/login`.

Rate limit no login: 5 tentativas por e-mail e por IP a cada 15 minutos, contadas no Redis. Falha de login não diferencia e-mail inexistente de senha errada.

Visual: mesma paleta, densidade maior. Sidebar fixa de 240 px em `--surface-900`, conteúdo em `--surface-800`, cards em `--surface-700`. Sem malha de dados e sem animação de entrada aqui: é ferramenta de trabalho, não peça de marca.

### Telas

**`/admin` — Dashboard**
Quatro números no topo: respostas nos últimos 7 dias, respostas nos últimos 30, taxa de conclusão, leads novos. Abaixo: top 5 temas mais votados (barras horizontais), pesquisas ativas com contagem, últimas 10 respostas.
Vazio: "Nenhuma resposta ainda. Crie uma pesquisa e gere o primeiro link."

**`/admin/pesquisas`**
Tabela: título, status, nº de perguntas, nº de respostas, links ativos, criada em. Ações: editar, duplicar, ativar/encerrar. Botão primário **Nova pesquisa**.
Duplicar copia perguntas e não copia links nem respostas.

**`/admin/pesquisas/[id]` — Editor**
Cabeçalho com título, descrição, curso vinculado e status. Lista de perguntas reordenável por arrastar, cada uma editável em linha: tipo, enunciado, ajuda, obrigatória, opções. Botão **Pré-visualizar** abre `/p/preview/[id]` visível só para admin logado.
Trava: pesquisa com resposta registrada não permite apagar pergunta nem trocar o tipo. Permite editar enunciado e adicionar pergunta nova. Isso preserva a integridade do histórico.

**`/admin/pesquisas/[id]/links`**
Tabela de links: rótulo, origem, usos/limite, expiração, status, criado em. Ações: copiar URL, baixar QR code PNG, desativar, reativar.
Formulário de criação: rótulo (obrigatório), origem (select), expiração (opcional), máximo de usos (opcional).
Cada linha tem link "ver respostas deste link", que filtra a tela de respostas.

**`/admin/pesquisas/[id]/respostas`**
Duas abas.
*Respostas*: tabela paginada com data, link de origem, conclusão, e-mail se houver, e visão individual em painel lateral. Filtros por link, por período e por concluída/abandonada. Botão **Exportar CSV**.
*Agregado*: um bloco por pergunta. Única e múltipla escolha em barras horizontais com contagem e percentual; escala e NPS com média, mediana e distribuição; textos abertos em lista com busca. É aqui que a decisão de curso acontece, então essa aba precisa ser legível sem interpretação.

**`/admin/leads`**
Tabela de leads das duas origens (diagnóstico e pesquisa), com score, empresa, desafio, UTM e link para a resposta que o originou. Exportar CSV.

**`/admin/cursos`**
Kanban simples de cinco colunas: ideia, validando, produção, publicado, descartado. Cada cartão mostra título e, se houver pesquisa vinculada, o nº de respostas. Mover cartão só muda status.

---

## 7. Pesquisa-padrão a semear (`db/seed.ts`)

Título: **Que curso de IA você quer que exista?**
Descrição: "Dez perguntas, três minutos. Suas respostas definem o que eu vou construir nos próximos meses."

| # | Tipo | Enunciado | Opções / observação |
|---|---|---|---|
| 1 | unica | Qual seu papel hoje? | Sócio ou diretor · Gestor · Especialista técnico · Analista · Empreendedor individual · Outro |
| 2 | escala | Qual seu nível com IA hoje? | 1 nunca usei → 5 uso todo dia no trabalho |
| 3 | multipla | Quais temas te interessam? | Fundamentos de LLM · Prompt com método · Automação com n8n · Agentes de IA · IA para gestão · IA para vendas e atendimento · Dados e RAG · IA para desenvolvimento de software |
| 4 | textarea | Qual problema você quer resolver com IA nos próximos 3 meses? | Obrigatória. É a pergunta mais valiosa do formulário. |
| 5 | multipla | Que ferramentas você já usa? | ChatGPT · Claude · Gemini · Copilot · n8n · Nenhuma ainda |
| 6 | unica | Formato preferido | Ao vivo online · Gravado com suporte · Presencial em São José dos Campos · Híbrido |
| 7 | unica | Carga horária ideal | 4 h · 8 h · 16 h · 40 h ou mais |
| 8 | multipla | Melhor horário | Manhã · Horário de almoço · Noite · Sábado |
| 9 | unica | Quanto você investiria nesse curso? | Até R$ 300 · R$ 300 a 800 · R$ 800 a 2.000 · Acima de R$ 2.000 · A empresa paga |
| 10 | email | Quer ser avisado quando a turma abrir? Deixe seu e-mail. | Opcional |
| 11 | consentimento | Autorizo a DOMINIA a usar minhas respostas para desenhar cursos e a me contatar sobre eles. | Obrigatória, com link para a política |

Perguntas 6, 7 e 8 definem logística. A 9 define preço. A 3 cruzada com a 4 define ementa. Deixe claro na tela de agregado que essas leituras existem.

---

## 8. LGPD

- Consentimento explícito e registrado por resposta, com data e versão do texto.
- Política de privacidade descreve finalidade de cada dado coletado na pesquisa.
- IP nunca armazenado em claro, só hash com salt de ambiente.
- Botão de exclusão de resposta no admin, que apaga resposta, itens e lead vinculado.
- Sem cookie de rastreamento em `/p/*`. Analytics só no site público.

---

## 9. Ordem de construção

Fase A (LP no ar): tarefas 1 a 6 de `docs/prompts.md`.
Fase B (coleta): schema, `/p/[token]`, API, webhook n8n.
Fase C (gestão): auth, CRUD de pesquisa, links, respostas, agregados, export.
Fase D (evolução): kanban de cursos, autodiagnóstico público de 12 perguntas reaproveitando o mesmo motor, painel do cliente.

O motor de pesquisa da fase B é o mesmo que o backlog v2 do documento principal pede para o autodiagnóstico gratuito. Construa genérico desde já e a fase D vira configuração, não código novo.
