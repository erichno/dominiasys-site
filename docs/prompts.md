# Prompts para o Claude Code — Site DOMINIA

Ordem obrigatória. Uma tarefa por sessão. Antes de começar, coloque na raiz do repositório:

```
CLAUDE.md
docs/spec-landing.md            (o documento "DOMINIA — Especificação completa da Landing Page")
docs/spec-pesquisas-admin.md
docs/infra-easypanel.md
docs/prompts.md                 (este arquivo)
```

---

## Prompt 0 — Bootstrap

```
Leia CLAUDE.md.

Inicialize o projeto: Next.js 15 com App Router, TypeScript strict, Tailwind, ESLint, Prettier, pnpm, src/ directory, alias @/*.

Além do padrão:
- crie a estrutura de pastas exatamente como descrita na seção 6 do CLAUDE.md, com arquivos .gitkeep onde ainda não houver código
- configure next/font com Poppins (300,400,500,600) e Raleway (300,400,600), subset latin e latin-ext, display swap
- crie .env.example com todas as variáveis da seção 9 do CLAUDE.md
- configure scripts typecheck e lint no package.json
- crie content/empresa.ts com um schema zod que valida no import: razaoSocial, cnpj, endereco, cidade, uf, email, whatsapp, siteUrl, redes. Deixe os valores como string vazia e faça o schema rejeitar string vazia, para o build quebrar enquanto não estiver preenchido. Documente isso em comentário no topo do arquivo.

Não crie nenhuma seção da landing page ainda. Ao terminar, mostre a árvore de arquivos e confirme que pnpm build quebra por causa de content/empresa.ts.
```

---

## Prompt 1 — Tokens e fundação visual

```
Leia CLAUDE.md, seção 4.

Traduza os tokens do Design System para tailwind.config.ts e globals.css:
- cores institucionais, escala de superfície, escala de azul e cores funcionais como CSS custom properties em :root, expostas no Tailwind via theme.extend
- gradientes grad-marca e grad-fundo como backgroundImage
- sombras elev-1, elev-2, elev-3 e elev-foco como boxShadow
- durações e easing como transitionDuration e transitionTimingFunction
- escala tipográfica da tabela da seção 4, com variantes desktop e mobile
- espaçamento base 8 com o token de seção (88 desktop, 56 mobile)
- raios 8, 14, 22 e full

Crie também:
- src/styles/motion.css com a classe de entrada da marca: translate(-12px, 24px) para translate(0,0) com fade, duração 360ms, easing da marca, acionada por uma classe .is-visible
- src/hooks/useReveal.ts usando IntersectionObserver para aplicar .is-visible uma única vez por elemento
- respeito a prefers-reduced-motion: reduce em ambos, mantendo só o fade

Não instale biblioteca de animação. Ao terminar, crie uma página temporária /styleguide mostrando a paleta, a escala tipográfica, sombras e a animação de entrada, para eu conferir visualmente. Essa página sai antes do lançamento.
```

---

## Prompt 2 — Componentes de UI e marca

```
Leia CLAUDE.md seções 3, 4 e 5, e docs/spec-landing.md seção 8.

Construa em src/components/ui: Button, Card, Accordion, Tabs, SidePanel, Badge, Input, Textarea, Select. Use shadcn/ui como base e adapte à paleta. Comportamento exato da seção 8 da spec:

- Button: variantes primário (grad-marca), secundário (borda translúcida), terciário (celeste com seta que desloca 4px no hover) e desabilitado. Altura mínima 44px, raio 14, foco visível com elev-foco.
- Card: surface-700, raio 22, padding 24, borda 1px translúcida. Hover: borda celeste 35%, elev-2, translateY(-4px), 220ms. Variante destaque com borda em gradiente.
- Accordion: semântica de disclosure com ARIA, um item aberto por vez, ícone + que rotaciona para ×.
- Tabs: role=tablist, navegação por setas, sublinhado 2px em gradiente com transição.
- SidePanel: desliza da direita, 480px desktop e largura total mobile, overlay com blur, fecha por Esc, clique fora e botão. Foco preso dentro enquanto aberto e devolvido ao gatilho ao fechar.

Em src/components/brand:
- Logo: usa o SVG do lockup, troca para o símbolo isolado abaixo de 180px de largura, respeita a área de respiro.
- MalhaDeDados: SVG inline com nós e ligações derivados da rede neural do símbolo, opacidade configurável com padrão 10%, mask-image desvanecendo nas bordas, animação de deriva de 60s desativada em mobile e em reduced-motion. Nunca renderiza sobre texto: recebe a prop como camada de fundo absoluta com pointer-events none.
- ArcoD: o arco do D em glow celeste, para o canto do hero.

Adicione todos ao /styleguide.
```

---

## Prompt 3 — Fonte única de conteúdo

```
Leia docs/spec-landing.md seções 4 e 6.

Crie os arquivos de content/ com tipagem forte e sem nenhum texto hardcoded fora deles:

- servicos.ts: array tipado com os 9 serviços. Cada item: id, slug, pilar ('formar'|'direcionar'|'construir'), nome, umaLinha, promessa, paraQuem, formato, duracao, entregaveis[], faixaPreco (opcional, string), cta, destaque (boolean, true só no Diagnóstico). Preencha com o conteúdo literal da seção 4 da spec.
- faq.ts: as 8 perguntas e respostas da seção 10 da página, literais.
- dores.ts: os 4 cards da seção 2 da página.
- metodo.ts: as 4 etapas da seção 5 da página.
- pilares.ts: os 3 pilares com número, nome, uma linha, descrição e lista de serviços vinculados por id.
- depoimentos.ts: array vazio tipado, com comentário explicando que a seção de prova social só renderiza com 3 ou mais itens.

Regra: faixaPreco só aparece na UI para o serviço de destaque. Os demais mostram "sob escopo". Deixe isso como propriedade derivada, não como decisão espalhada nos componentes.
```

---

## Prompt 4 — Home, seções 0 a 5

```
Leia docs/spec-landing.md seções 6 (subseções 0 a 5) e 7. Use a copy literalmente, sem reescrever.

Construa Header, Hero, Dores, Pilares, Servicos e Metodo, mais o WhatsAppFloat.

Pontos de atenção:
- Header transparente sobre o hero, ganha fundo navy com blur após 80px de rolagem. 72px desktop, 64px mobile. Menu de 4 itens com âncoras suaves. Mobile em drawer com o botão primário fixo no rodapé da tela.
- Hero: grad-fundo, MalhaDeDados a 12%, ArcoD saindo do quadro à direita, conteúdo à esquerda em coluna de 640px, altura mínima 88vh. Um único botão primário. Barra de credibilidade no rodapé do hero.
- Dores: 4 cards em grade 2x2, ponto celeste no canto superior esquerdo de cada um.
- Pilares: 3 colunas com numeração 01/02/03 e linha diagonal de 18 graus conectando as colunas em desktop, escondida em mobile.
- Servicos: abas por pilar lendo content/servicos.ts, card do Diagnóstico com borda em gradiente e etiqueta "Comece por aqui", "Ver detalhes" abre o SidePanel com o conteúdo completo do serviço.
- Metodo: timeline horizontal em desktop e vertical em mobile, com linha de progresso em gradiente.
- WhatsAppFloat: aparece após 40% de rolagem, dispensável, mensagem pré-preenchida variando conforme a seção de origem do clique. Sem pop-up de saída e sem pop-up temporizado.

Toda entrada de seção usa useReveal. Nenhuma imagem em loop de requisição.
```

---

## Prompt 5 — Home, seções 6 a 12, e páginas de apoio

```
Leia docs/spec-landing.md seção 6, subseções 6 a 12. Copy literal.

Construa Diagnostico, Trajetoria, Prova, ParaQuem, FAQ, CTAFinal e Footer, e as páginas /obrigado, /politica-de-privacidade e /termos.

- Bloco Diagnostico: faixa de largura total, surface-700, borda superior em gradiente, malha a 8%, duas colunas com entregáveis em card à direita usando o ponto celeste como bullet.
- Trajetoria: duas colunas, retrato à esquerda, faixa com os 4 números abaixo. Se a foto ainda não existir, use um placeholder local com dimensões corretas, nunca um serviço externo de imagem.
- Prova: renderiza apenas se depoimentos.ts tiver 3 ou mais itens. Caso contrário, renderiza o bloco alternativo de projetos próprios (RodaHub e programa de mentoria de IA), declarados como projetos da DOMINIA.
- ParaQuem: duas colunas contrastantes, "é para você se" com marcador celeste e "não é para você se" com marcador prata e opacidade reduzida.
- FAQ: acordeão de coluna única, máximo 760px, primeiro item aberto, lendo content/faq.ts.
- CTAFinal: gradiente escuro da marca, arco do D em marca d'água a 10%, um botão primário e um secundário.
- Footer: surface-900, três colunas, dados vindos de content/empresa.ts. Ícones sociais só para as redes preenchidas no arquivo.

Páginas legais: estrutura real de LGPD com base legal e finalidade por dado coletado, incluindo os dados do formulário de diagnóstico e os das pesquisas de expectativa.
```

---

## Prompt 6 — SEO, dados estruturados e performance

```
Leia docs/spec-landing.md seção 10 e CLAUDE.md seção 3, item 6.

- metadata da home e de /diagnostico com os títulos e descrições literais da spec, canonical, Open Graph e Twitter card.
- a home acumula os dois papéis, institucional e conversão: os sinais institucionais (razão social, CNPJ, endereço, e-mail, telefone, área de atuação) precisam estar no HTML de / e no JSON-LD, não em página separada. Não crie /sobre nem /contato.
- lib/schema.ts gerando JSON-LD de ProfessionalService, Person e FAQPage. O catálogo de ofertas lê content/servicos.ts e o FAQPage lê content/faq.ts. Nada duplicado à mão.
- sitemap.ts e robots.ts do App Router. robots bloqueia /p/ e /admin/. sitemap inclui apenas as páginas públicas.
- middleware que adiciona X-Robots-Tag: noindex, nofollow em /p/* e /admin/*.
- 404 personalizado na voz do produto.
- next/image em tudo, WebP/AVIF, preload das fontes.

Depois rode uma auditoria: build de produção, verifique tamanho do bundle inicial e me diga o que passou dos alvos da seção 8 do CLAUDE.md e o que precisa de correção. Não otimize prematuramente, meça primeiro.
```

---

## Prompt 7 — Banco: schema, migrations e acesso

```
Leia docs/spec-pesquisas-admin.md seção 2 e docs/infra-easypanel.md seção 1.

Banco é Postgres self-hosted, sem Supabase e sem RLS: o banco nunca é exposto ao navegador.

Crie:
- lib/db/schema.ts em Drizzle reproduzindo exatamente o schema da spec: extensions pgcrypto e citext, 3 enums, 8 tabelas, índices e constraints unique. A tabela de admin é `usuarios`, com senha_hash em argon2id.
- migration inicial gerada por drizzle-kit em drizzle/
- lib/db/index.ts com pool de no máximo 10 conexões, instância única reaproveitada em dev para não estourar conexão no hot reload
- lib/redis.ts com cliente único e as mesmas precauções
- lib/rate-limit.ts com janela deslizante no Redis, assinatura limitar(chave, maximo, janelaSegundos)
- lib/tokens.ts com geração de token base62 de 16 bytes via crypto.randomBytes e hash de IP com IP_HASH_SALT
- db/seed.ts criando o primeiro usuário admin (e-mail e senha vindos de argumento, nunca hardcoded) e a pesquisa-padrão com as 11 perguntas da seção 7 da spec, literalmente
- app/api/health/route.ts verificando Postgres e Redis, retornando 200 ou 503

Guarda obrigatória: lib/db e lib/redis lançam erro se importados em componente client. Nenhuma query fora de server component, server action ou API Route.

Ao terminar, mostre como subir o docker-compose local, rodar a migration e o seed.
```

## Prompt 8 — Página /diagnostico e fluxo de lead

```
Leia docs/spec-landing.md seção 9.

Construa /diagnostico com o formulário de 7 campos da spec, na ordem dada, com o textarea de desafio como campo de qualificação. Máscara de telefone, aviso suave em e-mail de domínio gratuito, consentimento LGPD obrigatório com link para a política, microcopy sob o botão.

API Route /api/lead:
- valida com zod, verifica Turnstile, rate limit por IP
- grava em leads com origem 'diagnostico' e os UTMs capturados
- dispara e-mail de confirmação via Resend em até 1 minuto
- dispara webhook N8N_WEBHOOK_LEAD para o alerta no WhatsApp
- falha de webhook ou de e-mail não pode derrubar a gravação do lead

Erros na voz do produto, conforme CLAUDE.md seção 5. Sucesso redireciona para /obrigado com o evento de conversão disparado lá, não antes.

Incorpore o Cal.com nos CTAs primários, com fallback para link externo se o embed falhar.
```

---

## Prompt 9 — Pesquisa pública /p/[token]

```
Leia docs/spec-pesquisas-admin.md seções 3, 4 e 5.

Construa:
- app/p/[token]/page.tsx: server component que valida o token pelas 5 regras da spec, na ordem dada. Qualquer falha renderiza a página neutra "Link indisponível" com status 404, sem revelar qual regra falhou.
- components/pesquisa/RenderPergunta.tsx cobrindo os 9 tipos da tabela da seção 4.
- components/pesquisa/FormularioPesquisa.tsx: todas as perguntas na mesma página com rolagem contínua, barra de progresso em gradiente, validação no blur, um único botão primário "Enviar respostas".
- app/api/pesquisas/[token]/respostas/route.ts com o fluxo exato da seção 5: Turnstile, rate limit, revalidação do token, validação zod contra as perguntas reais do banco, transação inserindo resposta e itens e incrementando usos, criação de lead se houver e-mail, webhook n8n sem bloquear a resposta.
- app/p/[token]/obrigado/page.tsx com a copy da spec.

Layout sem header de navegação e sem WhatsApp flutuante: nada tira o respondente da página antes do envio. Sem cookie de rastreamento nessa rota. IP só em hash.

Cubra a API com testes: token inativo, expirado, limite de usos atingido, pesquisa em rascunho, pergunta obrigatória vazia, opção fora do conjunto permitido.
```

---

## Prompt 10 — Autenticação do admin

```
Leia docs/spec-pesquisas-admin.md seção 6.

- /admin/login com e-mail e senha via Auth.js v5, provider de credenciais, verificação com argon2id. Sem cadastro público e sem link de registro. Erro de login não diferencia e-mail inexistente de senha errada.
- rate limit no login: 5 tentativas por e-mail e por IP a cada 15 minutos, usando lib/rate-limit.ts.
- sessão JWT em cookie httpOnly, secure, sameSite lax, validade de 8 horas com renovação por atividade.
- middleware protegendo /admin/*: sessão válida E usuário ativo na tabela usuarios. Falha redireciona para /admin/login com retorno para a rota pretendida.
- layout do admin: sidebar fixa de 240px em surface-900 com Dashboard, Pesquisas, Leads, Cursos e sair. Conteúdo em surface-800. Sem malha de dados e sem animação de entrada.
- /admin como dashboard com os 4 números do topo, top 5 temas votados em barras horizontais, pesquisas ativas e últimas 10 respostas.
- estado vazio na voz do produto.

Nada do admin pode aparecer no bundle público: verifique que os componentes do admin não são importados por nenhuma rota pública.
```

---

## Prompt 11 — CRUD de pesquisas, perguntas e links

```
Leia docs/spec-pesquisas-admin.md seção 6.

- /admin/pesquisas: tabela com ações editar, duplicar, ativar e encerrar. Duplicar copia perguntas, não copia links nem respostas.
- /admin/pesquisas/[id]: editor com perguntas reordenáveis por arrastar e edição em linha de tipo, enunciado, ajuda, obrigatoriedade e opções. Trava obrigatória: pesquisa com resposta registrada não permite apagar pergunta nem trocar o tipo, só editar enunciado e adicionar pergunta nova. Explique a trava na interface quando ela estiver ativa.
- /admin/pesquisas/[id]/links: tabela de links com copiar URL, baixar QR code PNG, desativar e reativar, mais o formulário de criação com rótulo, origem, expiração e máximo de usos. Cada linha leva para as respostas filtradas por aquele link.
- Pré-visualização em /p/preview/[id], acessível apenas para admin logado, que não grava resposta.

Toda mutação por server action com revalidação, sempre reverificando a sessão dentro da própria action, nunca confiando só no middleware. Invalide o cache Redis da pesquisa ao editar perguntas ou desativar link.
```

---

## Prompt 12 — Respostas, agregados e exportação

```
Leia docs/spec-pesquisas-admin.md seções 6 e 7.

/admin/pesquisas/[id]/respostas com duas abas.

Aba Respostas: tabela paginada com data, link de origem, conclusão e e-mail, filtros por link, período e concluída/abandonada, visão individual em SidePanel, exclusão de resposta com confirmação (apaga resposta, itens e lead vinculado, por LGPD), exportação CSV respeitando os filtros ativos.

Aba Agregado: um bloco por pergunta.
- unica e multipla: barras horizontais com contagem e percentual, ordenadas por frequência
- escala e nps: média, mediana e distribuição
- textos abertos: lista com busca, sem truncar
Adicione um cabeçalho curto explicando a leitura cruzada: perguntas 6, 7 e 8 definem logística, a 9 define preço, a 3 cruzada com a 4 define ementa.

/admin/leads com tabela das duas origens, score, empresa, desafio, UTM, link para a resposta de origem e exportação CSV.
/admin/cursos com kanban de cinco colunas movendo apenas o status.

Sem biblioteca de gráfico: as barras são divs com largura percentual. Economiza 40KB e o admin não precisa de mais que isso.
```

---

## Prompt 13 — Auditoria e lançamento

```
Leia CLAUDE.md seção 8 e docs/spec-landing.md seções 12 e 14.

1. Implemente os eventos de analytics da seção 12 da spec em lib/analytics.ts, um por um, e valide cada disparo.
2. Rode Lighthouse mobile na home e em /diagnostico. Corrija até performance ≥ 92 e acessibilidade 100. Me mostre o antes e o depois.
3. Percorra o checklist da seção 14 da spec e me devolva ele preenchido, marcando o que depende de mim (CNPJ, WhatsApp, depoimentos, foto, DNS, SPF/DKIM/DMARC).
4. Teste o formulário de diagnóstico e o de pesquisa ponta a ponta, incluindo webhook e e-mail.
5. Navegue os dois formulários e o menu mobile só por teclado e relate o que quebrou.
6. Valide o JSON-LD no Rich Results Test.
7. Remova /styleguide e qualquer rota de desenvolvimento.
8. Verifique que o bundle client não contém nenhuma string de conexão, segredo ou import de lib/db e lib/redis.

Não faça deploy. Me entregue o relatório e eu decido.
```

---

## Prompt 14 — Empacotamento e deploy

```
Leia docs/infra-easypanel.md por inteiro.

Crie:
- Dockerfile multi-stage exatamente como a seção 2 do documento, com os quatro NEXT_PUBLIC_* como ARG no estágio de build
- docker-entrypoint.sh rodando a migration e depois server.js, falhando o contêiner se a migration falhar
- .dockerignore cobrindo node_modules, .next, .git, docs e arquivos de ambiente
- workflow do GitHub Actions que builda a imagem, injeta os Build Args a partir de secrets e publica no GHCR com tag por commit e tag latest
- README-DEPLOY.md com o passo a passo do Easypanel: criar os três serviços, credenciais internas, variáveis, domínio, ordem de emissão do certificado com a Cloudflare em DNS only e depois Full (strict), volume de cache de imagem, healthcheck e backup

Teste localmente: docker build, docker run apontando para o Postgres e o Redis do compose, e confirme que a migration roda no start e que /api/health responde 200.

Me diga ao final quais valores eu preciso preencher no painel do Easypanel, separando o que é Environment do que é Build Arg, e por que essa distinção importa.
```

---

## Decisões que preciso tomar antes do prompt 5

Estas travam o conteúdo e o Claude Code deve parar se encontrar qualquer uma pendente:

1. Domínio final da página.
2. Nomear ou não Embraer, Zup, Itaú e TownSq. A spec recomenda descrever por setor e escala.
3. Exibir faixa de preço apenas no Diagnóstico ou em nenhum serviço.
4. CNPJ, e-mail comercial e WhatsApp de exibição.
5. Quais dos 4 números da seção Trajetória você sustenta em conversa.
