# CLAUDE.md — Site DOMINIA

Contexto permanente do projeto. Leia antes de qualquer tarefa.

## 1. O que estamos construindo

Site da **DOMINIA Consultoria em Tecnologia da Informação LTDA**, consultoria de IA aplicada em São José dos Campos/SP.

**A página `/` é uma coisa só.** Ela é ao mesmo tempo a página institucional da empresa e a landing page de alta conversão. Não existe "site institucional" separado da LP, não haverá um `/sobre` genérico, e nada é duplicado entre os dois papéis. Quem chega pesquisando o nome da empresa e quem chega de campanha aterrissam no mesmo lugar e ambos precisam ser atendidos ali.

Isso impõe duas exigências que não podem ser negociadas em nome do outro papel:

- **Papel institucional**: razão social, CNPJ, endereço, e-mail e telefone visíveis no rodapé; seção de trajetória com credenciais reais; JSON-LD de `ProfessionalService` e `Person`; páginas legais publicadas. É o que faz a empresa parecer existente e contratável para quem pesquisou o nome.
- **Papel de conversão**: hero com uma promessa clara, um único caminho de ação por bloco, oferta de entrada destacada e CTA de agendamento. É o que transforma visita em conversa.

Quando os dois papéis competirem por espaço, a conversão manda no topo da página e o institucional manda da seção de trajetória para baixo. Nenhum sinal institucional é cortado por ser "pouco vendedor": ele é o que sustenta a confiança que a conversão consome.

Escopo completo:

- **Público**: a página `/`, a página de conversão do produto de entrada (`/diagnostico`), `/obrigado` e as páginas legais.
- **Privado**: módulo de pesquisas de expectativa de curso. Links ocultos (`/p/{token}`) que o Erich distribui manualmente, e uma área administrativa (`/admin`) para criar pesquisas, gerar links, ler respostas e decidir quais cursos construir.

Objetivo comercial da página: gerar conversa agendada de 30 min. Objetivo do módulo de pesquisas: coletar demanda real antes de produzir curso.

Atenção a uma ambiguidade do documento de especificação: "Landing Pages de Alta Conversão" é o **nono serviço vendido a clientes**, listado em `content/servicos.ts`. Não é a descrição deste site. Não confunda os dois em copy, em metadados ou em nome de componente.

## 2. Stack fixa

| Camada | Escolha |
|---|---|
| Framework | Next.js 15, App Router, TypeScript strict, `output: 'standalone'` |
| Estilo | Tailwind CSS, tokens da marca em `tailwind.config.ts` |
| Componentes | shadcn/ui adaptado à paleta |
| Animação | CSS + IntersectionObserver. Sem Framer Motion. |
| Banco | Postgres 16 self-hosted no Easypanel, acesso só pela rede interna |
| ORM | Drizzle ORM + drizzle-kit para migrations |
| Cache e rate limit | Redis 7 self-hosted no Easypanel |
| Auth do admin | Auth.js v5, provider de credenciais, argon2id, sessão JWT em cookie httpOnly |
| Hospedagem | VPS Hostinger via Easypanel, deploy por Dockerfile a partir do repo GitHub |
| E-mail | Resend |
| Agendamento | Cal.com embutido |
| Automação | webhook para n8n na mesma VPS, host interno do Easypanel |
| WhatsApp | Evolution API, acionada pelo n8n, nunca direto do site |
| Anti-abuso | Cloudflare Turnstile nos formulários públicos |
| CDN e DNS | Cloudflare, proxy ligado em Full (strict) |
| Analytics | GA4 (Umami self-hosted como alternativa) |

Detalhes de deploy, Dockerfile, domínio e backup em `docs/infra-easypanel.md`.

Não introduza biblioteca nova sem pedir. Cada dependência precisa justificar peso.

## 3. Regras invioláveis

1. **Fonte única de conteúdo.** Os 9 serviços vivem em `content/servicos.ts` como array tipado. Cards, painel lateral, JSON-LD e páginas futuras leem daí. Nenhum texto de serviço hardcoded em componente.
2. **Um único botão primário por bloco de decisão.** Hero, bloco do diagnóstico e CTA final não competem entre si.
3. **`--azul-royal` (#2563EB) nunca em texto.** Só preenchimento de botão e gradiente. Contraste 2.9:1 reprova.
4. **Malha de dados**: SVG inline, opacidade 8–12%, `mask-image` para desvanecer, nunca atravessa texto, animação desativada em mobile e em `prefers-reduced-motion`.
5. **Corpo de texto nunca abaixo de 16 px** (iOS dá zoom em input menor).
6. **`/admin/*` e `/p/*` fora do índice**: bloqueados em `robots.txt`, header `X-Robots-Tag: noindex, nofollow`, ausentes do `sitemap.xml`, sem link no menu.
7. **Segredo só no servidor.** `DATABASE_URL`, `REDIS_URL`, `AUTH_SECRET`, `IP_HASH_SALT` e URLs de webhook jamais em componente client ou em `NEXT_PUBLIC_*`. Nada de acesso ao banco a partir do navegador: toda query nasce em server component, server action ou API Route.
8. **Toda entrada validada com zod** na API Route antes de tocar o banco.
9. **Nenhum placeholder no ar.** Dados da empresa ficam em `content/empresa.ts`, validados por schema zod em tempo de build. Campo vazio quebra o build.
10. **Sem laço de requisição de imagem.** Todo `next/image` com `src` estável, nunca derivado de state que muda a cada render. Já queimamos limite da Vercel assim no projeto Sleiman; aqui o custo é CPU da mesma VPS que roda o n8n e a Evolution API.
12. **`NEXT_PUBLIC_*` é congelada no build.** Alterar o valor no Easypanel só vale depois de um novo Deploy, porque a imagem precisa ser reconstruída. Declare cada uma como `ARG` no Dockerfile. Só coloque aí o que for público e estável.
11. **Acessibilidade é critério de aceite**, não polimento final: foco visível, navegação por teclado, `alt` descritivo, `prefers-reduced-motion` respeitado.

## 4. Tokens de design

Extraídos do Dominia Design System v1.0. Use exatamente estes valores, não introduza novos.

```css
:root {
  --navy:         #0D1B2A;
  --azul-royal:   #2563EB;
  --azul-celeste: #38BDF8;
  --cinza-prata:  #9CA3AF;
  --branco-frio:  #F8FAFC;

  --surface-900: #06111F;
  --surface-800: #0D1B2A;
  --surface-700: #12263A;
  --surface-600: #1B3550;
  --surface-500: #274766;

  --blue-700: #1D4ED8;
  --blue-600: #2563EB;
  --blue-500: #3B82F6;
  --blue-400: #38BDF8;
  --blue-200: #BAE6FD;

  --sucesso:  #10B981;
  --atencao:  #F59E0B;
  --erro:     #EF4444;
  --info:     #38BDF8;

  --grad-marca: linear-gradient(120deg, #1D4ED8, #2563EB 42%, #38BDF8);
  --grad-fundo: linear-gradient(160deg, #0D1B2A, #06111F);

  --elev-1: 0 6px 18px rgba(0,0,0,.28);
  --elev-2: 0 18px 44px rgba(0,0,0,.34);
  --elev-3: 0 30px 80px rgba(0,0,0,.42);
  --elev-foco: 0 0 0 3px rgba(56,189,248,.45);

  --dur-micro: 120ms;
  --dur-comp: 220ms;
  --dur-pagina: 360ms;
  --ease: cubic-bezier(.2,.8,.2,1);
}
```

Cores funcionais (sucesso, atenção, erro, info) existem só para estado de sistema. Nunca em conteúdo institucional.

**Tipografia**: Poppins (display, pesos 300/400/500/600) + Raleway (corpo, 300/400/600), via `next/font`, subset `latin` e `latin-ext`, `display: swap`, só os pesos listados.

| Papel | Fonte | Desktop | Mobile | Line-height | Tracking |
|---|---|---|---|---|---|
| H1 | Poppins 600 | 56–72 px | 36–42 px | 1.05 | .02em |
| H2 | Poppins 600 | 40 px | 28 px | 1.1 | normal |
| H3 | Poppins 500 | 24 px | 20 px | 1.25 | normal |
| Corpo | Raleway 400 | 16–17 px | 16 px | 1.6 | normal |
| Eyebrow | Poppins 600 | 11–12 px | 11 px | 1.4 | .24em, uppercase |
| Slogan | Poppins 300 | variável | — | 1.3 | .08em, uppercase |

Medida de leitura máxima: 76 caracteres por linha.

**Espaçamento base 8**: 8 (chip) · 16 (gap de form) · 24 (padding de card) · 40 (bloco interno) · 88 desktop / 56 mobile (entre seções).

**Raio**: 8 input e tag · 14 botão e campo · 22 card e painel · full badge.

**Movimento direcional da marca**: entrada de elemento vai de `translate(-12px, 24px)` para `translate(0,0)` com fade, seguindo a diagonal do arco do D. Desativar translate em `prefers-reduced-motion`, manter só o fade.

**Marca**: logo horizontal 180 px de largura mínima; abaixo disso, símbolo isolado. Área de respiro = altura do símbolo D ÷ 2. Proibido redesenhar o D, trocar o ponto azul do A, distorcer, rotacionar ou aplicar sombra dura.

## 5. Voz do produto

Frases curtas. Verbo no presente. Número em vez de adjetivo. Sem jargão de marketing.

- Botão diz o que acontece: "Agendar conversa", não "Enviar".
- A ação mantém o nome do início ao fim: botão "Publicar" gera aviso "Publicado".
- Erro explica o que houve e como resolver, sem pedir desculpa: "Não consegui enviar. Verifique a conexão e tente de novo, ou fale direto no WhatsApp."
- Tela vazia é convite para agir, não lamento: "Nenhuma pesquisa criada ainda. Comece pela pesquisa de expectativa de curso."

A copy final da landing page está em `docs/spec-landing.md` e é para usar literalmente. Não reescreva copy aprovada.

## 6. Estrutura de pastas

```
src/
  app/
    layout.tsx
    page.tsx                        home
    diagnostico/page.tsx
    obrigado/page.tsx
    politica-de-privacidade/page.tsx
    termos/page.tsx
    p/[token]/page.tsx              pesquisa oculta
    p/[token]/obrigado/page.tsx
    admin/
      login/page.tsx
      page.tsx                      dashboard
      pesquisas/page.tsx
      pesquisas/[id]/page.tsx       editor de perguntas
      pesquisas/[id]/links/page.tsx
      pesquisas/[id]/respostas/page.tsx
      leads/page.tsx
      cursos/page.tsx
    api/
      lead/route.ts
      pesquisas/[token]/respostas/route.ts
      admin/…                       ações server-side do admin
  components/
    layout/    Header, Footer, WhatsAppFloat
    sections/  Hero, Dores, Pilares, Servicos, Metodo, Diagnostico,
               Trajetoria, Prova, ParaQuem, FAQ, CTAFinal
    ui/        Button, Card, Accordion, Tabs, SidePanel, Badge, Input, Select, Textarea
    brand/     Logo, MalhaDeDados, ArcoD
    pesquisa/  RenderPergunta, FormularioPesquisa
    admin/     TabelaRespostas, AgregadoPergunta, GeradorLink, QRCode
  content/
    empresa.ts     dados cadastrais, validados com zod
    servicos.ts    fonte única dos 9 serviços
    faq.ts
    dores.ts
    metodo.ts
    depoimentos.ts
  lib/
    db/         index.ts (pool), schema.ts (drizzle), queries/
    redis.ts
    auth.ts     configuração do Auth.js
    rate-limit.ts
    analytics.ts
    schema.ts   JSON-LD
    validators.ts
    tokens.ts   geração de token de link oculto
docs/
  spec-landing.md
  spec-pesquisas-admin.md
  infra-easypanel.md
drizzle/            migrations geradas
db/
  seed.ts
Dockerfile
docker-entrypoint.sh
```

## 7. Comandos

```bash
pnpm dev              # desenvolvimento
pnpm build            # build de produção, precisa passar antes de qualquer PR
pnpm lint
pnpm typecheck
pnpm test             # vitest, quando houver
pnpm db:generate      # drizzle-kit generate, a partir de lib/db/schema.ts
pnpm db:migrate       # aplica migrations
pnpm db:studio        # inspeção local
pnpm db:seed          # primeiro admin + pesquisa-padrão
docker compose up     # Postgres e Redis locais, espelhando a VPS
```

Desenvolvimento local usa `docker-compose.yml` com Postgres e Redis nas mesmas versões da VPS. Nada de banco em nuvem para desenvolver.

## 8. Definição de pronto

Nenhuma tarefa fecha sem:

- [ ] `pnpm typecheck` e `pnpm lint` sem erro
- [ ] `pnpm build` passando
- [ ] Console do navegador limpo
- [ ] Responsivo testado em 375 px, 768 px e 1440 px
- [ ] Navegação por teclado funcionando no que foi tocado
- [ ] Nenhum segredo exposto no bundle client
- [ ] Nenhum `[preencher]` ou lorem ipsum

Metas técnicas do site público: LCP < 2,0 s · CLS < 0,05 · INP < 200 ms · Lighthouse performance ≥ 92 mobile · acessibilidade 100 · peso inicial < 500 KB.

## 9. Variáveis de ambiente

**Runtime** (aba Environment do serviço `web`, valem após restart):
```
DATABASE_URL=
REDIS_URL=
AUTH_SECRET=
AUTH_URL=
IP_HASH_SALT=
TURNSTILE_SECRET_KEY=
N8N_WEBHOOK_LEAD=
N8N_WEBHOOK_PESQUISA=
RESEND_API_KEY=
EMAIL_FROM=
```

**Embutidas no build** (mesma aba Environment, mas exigem novo Deploy para valer):
```
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
NEXT_PUBLIC_CAL_LINK=
NEXT_PUBLIC_GA_ID=
```

## 10. Como trabalhar comigo

- Uma tarefa por vez, na ordem de `docs/prompts.md`.
- Antes de codar tarefa grande, mostre o plano em até 10 linhas e espere confirmação.
- Ao terminar, liste os arquivos alterados e o que ficou fora do escopo.
- Se encontrar decisão de produto não resolvida (preço, nome de cliente, número de trajetória), pare e pergunte. Não invente dado de negócio.
