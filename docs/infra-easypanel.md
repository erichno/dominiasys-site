# DOMINIA — Infraestrutura e deploy no Easypanel

Substitui a seção 11 do documento da landing page, que assumia Vercel e Supabase. Tudo roda na VPS Hostinger já em operação, ao lado do n8n e da Evolution API.

---

## 1. Serviços no projeto Easypanel

Crie um projeto chamado `dominia-site` com três serviços:

| Serviço | Tipo | Porta pública | Observação |
|---|---|---|---|
| `web` | App (Dockerfile, source GitHub) | 3000 → domínio com TLS | o Next.js |
| `db` | Postgres 16 (template) | **nenhuma** | só rede interna |
| `cache` | Redis 7 (template) | **nenhuma** | só rede interna |

Nunca publique porta de `db` nem de `cache`. Dentro do projeto, os serviços se enxergam pelo nome do host interno que o Easypanel gera (`dominia-site_db`, `dominia-site_cache`). Confira o nome exato na aba de credenciais do serviço e use na connection string.

```
DATABASE_URL=postgres://dominia:SENHA@dominia-site_db:5432/dominia?sslmode=disable
REDIS_URL=redis://default:SENHA@dominia-site_cache:6379
```

`sslmode=disable` é aceitável porque o tráfego não sai da rede interna do Docker. Se algum dia o banco for para outra máquina, isso vira `require`.

### O que o Redis faz aqui

1. Rate limit das rotas públicas (`/api/lead`, `/api/pesquisas/[token]/respostas`) e do login do admin.
2. Cache da pesquisa e suas perguntas por token, TTL de 5 min, invalidado na edição.
3. Trava de idempotência: mesmo payload enviado duas vezes em 30 s não grava resposta duplicada.

Não use Redis para sessão: a sessão do admin é JWT em cookie, sem estado no servidor.

---

## 2. Dockerfile

Na raiz do repositório. Multi-stage, saída `standalone`, imagem final por volta de 180 MB.

```dockerfile
FROM node:22-alpine AS base
RUN corepack enable && apk add --no-cache libc6-compat

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# variáveis NEXT_PUBLIC_* são embutidas AQUI, no build
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_TURNSTILE_SITE_KEY
ARG NEXT_PUBLIC_CAL_LINK
ARG NEXT_PUBLIC_GA_ID
RUN pnpm build
# migração empacotada em arquivo único: o standalone não carrega o drizzle-kit
RUN pnpm exec esbuild db/migrate.ts --bundle --platform=node --target=node22 --outfile=migrate.cjs

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0 NEXT_TELEMETRY_DISABLED=1
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/drizzle ./drizzle
COPY --from=builder --chown=nextjs:nodejs /app/migrate.cjs ./migrate.cjs
COPY --chown=nextjs:nodejs docker-entrypoint.sh ./
# o volume do Easypanel é montado aqui: a pasta precisa existir e pertencer ao nextjs
RUN mkdir -p /app/.next/cache/images \
 && chown -R nextjs:nodejs /app/.next \
 && chmod +x ./docker-entrypoint.sh
USER nextjs
EXPOSE 3000
ENTRYPOINT ["sh","./docker-entrypoint.sh"]
```

Duas armadilhas já resolvidas acima, que só aparecem no primeiro deploy real:

- **`drizzle-kit` não existe na imagem final.** A saída `standalone` traz apenas as dependências que o Next rastreou, e o drizzle-kit não é uma delas. Por isso a migração é empacotada com esbuild em `migrate.cjs` no estágio de build. `esbuild` precisa estar em `devDependencies`.
- **Volume montado por cima de pasta inexistente vira `root`.** O contêiner roda como `nextjs` (uid 1001) e o Next não conseguiria escrever no cache de imagem. Criar a pasta e ajustar o dono antes do `USER` resolve.

`next.config.ts` precisa de `output: 'standalone'`.

**Armadilha que vai te pegar uma vez:** variável `NEXT_PUBLIC_*` é congelada no momento do build, não na hora de subir o contêiner.

O Easypanel entrega os valores da aba **Environment** tanto para o build quanto para o contêiner em execução, então não existe aba separada de Build Args: basta declarar as quatro como `ARG` no Dockerfile (como acima) e preencher na Environment. O que muda é a consequência: alterar um `NEXT_PUBLIC_*` exige clicar em **Deploy** para rebuildar a imagem, enquanto alterar `DATABASE_URL` só precisa de um restart. Só ponha em `NEXT_PUBLIC_*` o que for realmente público e estável.

No caminho do GitHub Actions (seção 4, opção B) isso vira `--build-arg` de verdade, alimentado por secrets do repositório.

### Entrypoint com migração

`docker-entrypoint.sh`, na raiz do repositório, salvo com quebra de linha LF (CRLF do Windows quebra o script):

```sh
#!/bin/sh
set -e
echo "-> aplicando migrations"
node migrate.cjs
echo "-> iniciando Next.js"
exec node server.js
```

`db/migrate.ts` usa o migrator do Drizzle apontando para a pasta `drizzle`, lendo `DATABASE_URL` do ambiente, e encerra o processo com código diferente de zero em caso de falha.

Uma réplica só, então não há corrida de migração. Se um dia escalar, troque por um passo manual no console do Easypanel antes do deploy.

---

## 3. Domínio, TLS e Cloudflare

1. No Registro.br, os nameservers já apontam para a Cloudflare.
2. Na Cloudflare, registro `A` do apex para o IP da VPS e `CNAME` de `www` para o apex.
3. **Deixe o proxy desligado (DNS only) na primeira emissão do certificado.** O Easypanel usa Let's Encrypt com desafio HTTP e o proxy laranja quebra isso.
4. Emitido o certificado no Easypanel, ligue o proxy e ponha o SSL/TLS em **Full (strict)**. Nunca em Flexible: gera laço de redirecionamento com o Next.js.
5. Redirecione `www` para o apex no próprio Easypanel.
6. Configure SPF, DKIM e DMARC para o domínio de e-mail, senão a confirmação de lead cai em spam.

---

## 4. Build: na VPS ou no GitHub

O `pnpm build` do Next.js pede algo entre 2 e 3 GB de RAM. Duas rotas:

**A. Build na VPS** (padrão do Easypanel, source GitHub com auto-deploy no push da `main`). Só use se a VPS tiver 4 GB ou mais e você aceitar o site ficar lento durante o build, já que n8n e Evolution disputam a mesma máquina. Crie swap de 2 GB antes.

**B. Build no GitHub Actions, deploy da imagem** (recomendado). O Actions builda, publica no GHCR e o Easypanel só puxa a imagem pronta. A VPS nunca compila nada, o deploy cai para segundos e o rollback é trocar a tag da imagem. É também onde os Build Args ficam versionados como secrets.

Comece pela B se a VPS tiver menos de 4 GB.

---

## 5. Variáveis de ambiente no Easypanel

**Environment** (runtime, trocáveis sem rebuild):
```
DATABASE_URL=
REDIS_URL=
AUTH_SECRET=                  # openssl rand -base64 32
AUTH_URL=https://SEU-DOMINIO
IP_HASH_SALT=                 # openssl rand -hex 16
TURNSTILE_SECRET_KEY=
N8N_WEBHOOK_LEAD=             # http://n8n interno, se estiver no mesmo host
N8N_WEBHOOK_PESQUISA=
RESEND_API_KEY=
EMAIL_FROM=contato@SEU-DOMINIO
```

**Build Args** (congelados no build):
```
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
NEXT_PUBLIC_CAL_LINK=
NEXT_PUBLIC_GA_ID=
```

Se o n8n roda no mesmo Easypanel, use o host interno dele nos webhooks. Chamada interna não passa pela internet, não gasta certificado e não aparece em log de proxy.

---

## 6. Imagens e armazenamento

`next/image` funciona fora da Vercel usando `sharp`, que já vem no Node 22 alpine com `libc6-compat`. Dois cuidados:

- Monte um volume em `/app/.next/cache/images`, senão cada deploy joga fora o cache e a primeira visita reprocessa tudo.
- A lição do projeto Sleiman continua valendo, e aqui dói mais: sem CDN na frente, um laço de requisição de imagem consome CPU da mesma VPS que roda seu n8n. Todo `src` precisa ser estável.

Ative o cache da Cloudflare para `/_next/static/*` e para as imagens. É o CDN gratuito que compensa a saída da Vercel.

Fotos e ativos de marca ficam versionados no repositório, em `public/`. Não há upload de arquivo no admin na v1, então não precisa de volume de mídia.

---

## 7. Backup

Sem Supabase, backup é responsabilidade sua. Três camadas:

1. **Backup agendado do Postgres no Easypanel**, diário, destino S3 (Backblaze B2 ou Cloudflare R2 saem baratos), retenção de 30 dias.
2. **`pg_dump` semanal** em volume local, retenção de 4 semanas, como rede de segurança se o destino remoto falhar.
3. **Teste de restauração trimestral** em banco vazio. Backup nunca testado não é backup.

O que dói perder aqui é a tabela de respostas: ela é a pesquisa de mercado que sustenta a decisão dos seus cursos, e não dá para recoletar.

---

## 8. Observabilidade

- Rota `GET /api/health` verificando Postgres e Redis, usada como healthcheck do serviço no Easypanel.
- Monitor externo (UptimeRobot ou Better Stack, plano gratuito) batendo em `/api/health` a cada 5 min, alerta no seu WhatsApp via n8n.
- Logs de aplicação em JSON no stdout, lidos pelo painel do Easypanel.
- Analytics: GA4 no site público. Se quiser sair do Google, o Umami roda como mais um serviço no mesmo projeto, com o próprio Postgres, e não exige banner de cookie.
- Alerta de disco: com Postgres, Redis, n8n e Evolution na mesma máquina, disco cheio é a falha mais provável. Monitore acima de 80%.

---

## 9. Checklist de infraestrutura antes do lançamento

- [ ] `db` e `cache` sem porta pública
- [ ] Senha forte no Postgres e no Redis, diferentes entre si
- [ ] `AUTH_SECRET` e `IP_HASH_SALT` gerados por `openssl`, nunca reaproveitados
- [ ] Certificado emitido e Cloudflare em Full (strict)
- [ ] `www` redirecionando para o apex
- [ ] Build Args conferidos: `NEXT_PUBLIC_SITE_URL` com o domínio final
- [ ] Migração rodando no entrypoint e verificada no log do primeiro deploy
- [ ] Backup diário configurado e uma restauração testada
- [ ] Healthcheck ativo e monitor externo alertando
- [ ] Volume de cache de imagem montado
- [ ] Swap configurado se o build for na VPS
- [ ] SPF, DKIM e DMARC válidos para o remetente
