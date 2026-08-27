# DOMINIA – Especificação completa da Landing Page

**Versão:** 1.0
**Data:** agosto de 2026
**Base visual:** Dominia Design System & Manual de Identidade v1.0
**Objetivo do documento:** reunir tudo o que é necessário para construir o novo site: posicionamento, arquitetura de serviços, copy final, tokens de design, comportamento de componentes, SEO, stack e plano de implementação.

---

## Sumário

1. [Decisões pendentes (responda antes de codar)](#1-decisões-pendentes)
2. [Diagnóstico da lista de serviços e o que eu mudaria](#2-diagnóstico-da-lista-de-serviços)
3. [Posicionamento](#3-posicionamento)
4. [Arquitetura de serviços produtizada](#4-arquitetura-de-serviços-produtizada)
5. [Arquitetura da informação e sitemap](#5-arquitetura-da-informação-e-sitemap)
6. [Estrutura da página com copy final](#6-estrutura-da-página-com-copy-final)
7. [Sistema de design aplicado ao site](#7-sistema-de-design-aplicado-ao-site)
8. [Componentes e comportamento](#8-componentes-e-comportamento)
9. [Conversão: formulários, qualificação e fluxo de lead](#9-conversão-formulários-qualificação-e-fluxo-de-lead)
10. [SEO e metadados](#10-seo-e-metadados)
11. [Stack técnica e infraestrutura](#11-stack-técnica-e-infraestrutura)
12. [Analytics e métricas de sucesso](#12-analytics-e-métricas-de-sucesso)
13. [Roadmap de implementação](#13-roadmap-de-implementação)
14. [Checklist de lançamento](#14-checklist-de-lançamento)
15. [Backlog v2](#15-backlog-v2)

---

## 1. Decisões pendentes

Cinco pontos que travam a construção e dependem só de você:

| # | Decisão | Opções | Recomendação |
|---|---------|--------|--------------|
| 1 | **Domínio do site** | `dominia.com.br` (usado no Design System) vs. `dominiasys.com.br` (sua infra atual) | Use `dominia.com.br` para o site institucional e mantenha `dominiasys.com.br` como domínio de infraestrutura (n8n, Evolution API, painéis). Marca e infra separadas. |
| 2 | **Citação de empregadores** | Nomear Embraer / Zup / Itaú / TownSq vs. descrever por setor e escala | Descreva por setor e escala ("liderança de engenharia em fintech de grande porte", "15 anos em indústria aeronáutica"). Menos risco contratual, mesmo peso de prova. Confirme a política do seu contrato atual antes de nomear qualquer empresa. |
| 3 | **Preços na página** | Exibir faixas vs. "sob consulta" | Exiba faixa apenas do produto de entrada (Diagnóstico). Os demais ficam "sob escopo". Faixa no produto de entrada filtra curioso; ausência total de preço aumenta atrito. |
| 4 | **Fé na comunicação pública** | Explícita vs. implícita | Implícita. Mantenha o significado do acrônimo DO-MI-NI-A na seção "Sobre" (é história de origem verdadeira e humaniza), sem versículo ou linguagem devocional na home B2B. Quem precisa saber, descobre. |
| 5 | **Canal de conversão principal** | Formulário vs. WhatsApp vs. agendamento direto | Agendamento direto (Cal.com ou Google Calendar appointment) como CTA primário, WhatsApp como secundário. Formulário longo só no fluxo de diagnóstico. |

---

## 2. Diagnóstico da lista de serviços

Sua lista tem 7 itens. São bons serviços, mas apresentados assim eles criam três problemas:

**Problema 1 – leitura de "faço de tudo".**
Sete serviços em nível hierárquico igual, indo de treinamento a landing page, sinalizam generalista. Para ticket alto de consultoria, generalista perde para especialista. A solução não é cortar serviços: é agrupá-los em pilares para que o cliente entenda que existe uma lógica única por trás.

**Problema 2 – "IA humanizada" não comunica nada.**
É jargão. O comprador não sabe o que compra, não sabe medir e não sabe comparar. O que você provavelmente entrega é: assistentes e agentes que atendem, respondem e executam tarefas com tom de voz da empresa, integrados ao WhatsApp e aos sistemas internos. Isso é concreto e vendável. Renomeie.

**Problema 3 – falta uma oferta de entrada.**
Todos os sete itens exigem que o cliente já saiba o que quer e já confie em você. Não existe degrau baixo. Consultoria de IA no Brasil vende por escada: um produto pequeno, de preço fixo, prazo curto e entregável tangível, que qualifica o cliente e abre o projeto grande. Sem esse degrau, você depende 100% de indicação.

**Problema 4 – landing page desalinha o posicionamento.**
É o serviço de menor ticket e o único que não fala de inteligência aplicada. Vendido como item de menu ao lado de "implantação de IA", ele puxa a percepção de preço da marca inteira para baixo. Não elimine: reposicione como parte da entrega de produto digital, ou como porta de entrada barata para clientes que depois compram IA.

### O que mudei na prática

| Sua lista original | Vira | Por quê |
|---|---|---|
| Treinamento IA VIP ou em grupo | **Imersão IA Executiva** + **Formação IA para Times** | Separar. VIP e turma têm compradores, preços e promessas diferentes. |
| Workshops empresariais indoor | **Workshop IA na Prática (in company)** | Mantido. Trocar "indoor" por "in company", que é o termo que o comprador corporativo usa. |
| Análise de MVPs e mentoria | **Mentoria de Produto e Validação de MVP** | Mantido, com entregável explícito. |
| Direcionamento de implantação de IA | **Diagnóstico de Maturidade em IA** (novo, entrada) + **Roadmap de Implantação** | Quebrado em dois. O diagnóstico vira sua oferta de entrada de preço fixo. |
| Construção de landing pages | **Landing Pages de Alta Conversão** | Movido para o pilar de execução, sem destaque de home. |
| Modelos de IA humanizado | **Assistentes e Agentes de IA** | Renomeado para linguagem de resultado. |
| Sistemas customizados | **Sistemas Sob Medida** | Mantido. |

### Três pilares

```
FORMAR                  DIRECIONAR                CONSTRUIR
Pessoas usando IA       Empresa sabendo onde      Sistema rodando
com critério            aplicar IA                em produção

Imersão VIP             Diagnóstico de            Assistentes e
Formação para Times     Maturidade em IA          Agentes de IA
Workshop in company     Roadmap de Implantação    Sistemas Sob Medida
                        Mentoria de Produto/MVP   Landing Pages
```

A frase que amarra os três: **entender, decidir, executar.** É esse arco que justifica um consultor único cobrindo todos os itens, e é isso que você deve deixar explícito na home.

---

## 3. Posicionamento

### Declaração de posicionamento (uso interno, não vai para a página)

> Para empresas de médio porte que já experimentaram IA e não transformaram isso em resultado, a DOMINIA é a consultoria que conduz o caminho completo, do diagnóstico ao sistema em produção, porque combina 25 anos de engenharia e liderança técnica com execução própria de software. Diferente de agências que só treinam e de fábricas de software que só codam, a DOMINIA forma o time, define onde aplicar e constrói o que decidiu.

### Público-alvo (ICP)

**Perfil primário**
Empresas de 20 a 500 funcionários, faturamento entre R$ 5 mi e R$ 200 mi/ano, no interior de SP e Vale do Paraíba, além de remoto nacional. Setores com processo repetitivo e alto volume de atendimento: serviços B2B, indústria, saúde, educação, logística, imobiliário, escritórios de advocacia e contabilidade.

**Quem decide e o que sente**

| Persona | Cargo | Dor real | Gatilho de compra |
|---|---|---|---|
| **O dono impaciente** | Sócio, CEO, diretor | Viu concorrente automatizar e ganhar margem. Testou ChatGPT, não virou nada. | Quer resultado em 90 dias, não teoria. |
| **O gestor pressionado** | Head de operações, gerente | Time inflado em tarefa manual. Cobrança para reduzir custo sem demitir. | Quer processo específico automatizado. |
| **O líder de tecnologia** | CTO, coordenador de TI | Time pequeno, backlog grande, pressão da diretoria para "fazer IA". | Quer parceiro técnico que fale a língua dele. |
| **O RH que precisa capacitar** | RH, gestão de pessoas | Diretoria pediu capacitação em IA para o time inteiro. | Quer treinamento aplicado, não palestra motivacional. |

**Quem não é cliente** (dizer isso na página aumenta conversão dos certos)
Empresas que querem só uma palestra de uma hora sem desdobramento. Quem procura o fornecedor mais barato. Quem quer terceirizar a decisão sem envolver o time. Startups pré-receita procurando sócio técnico.

### Diferenciais (ordem de força)

1. **Executa o que recomenda.** Consultor que também constrói. O roadmap não morre em PDF.
2. **25 anos de engenharia e liderança real.** Da indústria aeronáutica à liderança de dezenas de squads em ambiente de grande porte. Já viu sistema legado, já viu migração de nuvem, já viu time travar.
3. **Formação em IA generativa pelo MIT Professional Education e MBA pela FGV.** Credencial verificável, não curso de internet.
4. **Entrega em português, com o contexto de empresa brasileira.** Regra de negócio local, WhatsApp como canal principal, orçamento de PME brasileira.
5. **Um interlocutor do início ao fim.** Sem revezamento de consultor júnior.

### Promessa central

> Sair do experimento e chegar ao sistema em produção.

### Prova a coletar (você precisa disso antes do lançamento)

Sem prova, a página inteira depende de credencial pessoal, o que funciona, mas converte menos. Providencie, no mínimo:

- **3 depoimentos em vídeo curto** (60 a 90 s) ou texto assinado com nome, cargo e empresa.
- **2 mini-casos** no formato: situação → o que foi feito → número obtido → tempo. Se não tiver número de cliente ainda, use RodaHub e o programa de mentoria de IA como casos próprios, declarados como projeto próprio.
- **1 número agregado** honesto: pessoas formadas, projetos entregues, horas de mentoria. Qualquer número real supera adjetivo.
- **Logos de clientes**, com autorização por escrito.

---

## 4. Arquitetura de serviços produtizada

Cada serviço abaixo tem nome comercial, promessa, entregáveis, formato, duração e ancoragem de preço. As faixas de preço são **hipóteses para você validar** com base em porte de cliente e sua meta de faturamento, não referências de mercado verificadas. Teste com os três primeiros clientes e ajuste.

### Pilar 1 – FORMAR

#### 1.1 Imersão IA Executiva (VIP)

- **Promessa:** o executivo sai usando IA no próprio trabalho, com fluxos montados para as tarefas dele.
- **Para quem:** sócio, diretor ou C-level que não tem tempo para curso e precisa de resultado imediato.
- **Formato:** 1:1, presencial ou remoto. 3 encontros de 2 h, espaçados em 15 dias.
- **Entregáveis:** mapa das tarefas do executivo com potencial de IA; biblioteca de prompts personalizada; 2 fluxos automatizados prontos; gravação das sessões; 30 dias de suporte por WhatsApp.
- **Faixa a validar:** R$ 6.000 a R$ 12.000.
- **CTA:** Falar sobre a imersão.

#### 1.2 Formação IA para Times

- **Promessa:** o time inteiro passa a usar IA com critério, segurança e padrão, não cada um do seu jeito.
- **Para quem:** empresas capacitando de 8 a 30 pessoas de uma área ou de áreas mistas.
- **Formato:** turma fechada. 6 encontros de 2 h ao longo de 6 semanas, remoto ou presencial. Conteúdo adaptado às dores mapeadas em briefing prévio.
- **Entregáveis:** trilha de 6 módulos com material próprio; diagnóstico prévio por questionário; exercícios com dados reais da empresa; política interna de uso de IA em minuta; certificado; relatório final de maturidade do time para a diretoria.
- **Faixa a validar:** R$ 15.000 a R$ 40.000 por turma.
- **CTA:** Montar turma para meu time.

#### 1.3 Workshop IA na Prática (in company)

- **Promessa:** em um dia, a empresa sai com casos de uso próprios mapeados e priorizados.
- **Para quem:** empresas que querem começar, alinhar diretoria ou destravar resistência interna.
- **Formato:** presencial, 4 h ou 8 h, até 25 participantes.
- **Entregáveis:** dinâmica de mapeamento de casos de uso; matriz de priorização impacto × esforço preenchida ao vivo; top 5 oportunidades documentadas; relatório pós-evento em até 5 dias úteis.
- **Faixa a validar:** R$ 5.000 (4 h) a R$ 12.000 (8 h), mais deslocamento fora da região.
- **CTA:** Agendar workshop.
- **Observação:** este é o seu melhor produto de porta de entrada presencial. Quase sempre gera projeto de execução em seguida. Trate o relatório pós-evento como peça de venda.

### Pilar 2 – DIRECIONAR

#### 2.1 Diagnóstico de Maturidade em IA `→ OFERTA DE ENTRADA`

Este produto não existia na sua lista. É o item mais importante desta reestruturação.

- **Promessa:** em 15 dias você sabe exatamente onde a IA gera retorno na sua empresa, quanto custa e por onde começar.
- **Para quem:** qualquer empresa do ICP. É o degrau que qualifica tudo.
- **Formato:** preço fixo, escopo fixo, prazo fixo. 2 semanas.
- **Como funciona:** reunião de imersão de 90 min → entrevistas com 3 a 5 pessoas-chave → análise de processos e ferramentas → construção do relatório → apresentação de 60 min para a diretoria.
- **Entregáveis:** relatório de maturidade com nota por dimensão (dados, processos, pessoas, tecnologia, governança); mapa de 10 a 15 oportunidades priorizadas por impacto e esforço; estimativa de retorno das 3 principais; roadmap de 90 dias; apresentação executiva.
- **Faixa a validar:** R$ 4.500 a R$ 9.000.
- **Mecanismo comercial:** o valor do diagnóstico é abatido do primeiro projeto de execução contratado em até 60 dias. Isso transforma o produto de entrada em funil.
- **CTA:** Contratar diagnóstico.

#### 2.2 Roadmap de Implantação de IA

- **Promessa:** um plano executável de 6 a 12 meses, com sequência, custo, responsável e critério de sucesso por iniciativa.
- **Para quem:** empresas que já fizeram o diagnóstico ou já sabem onde querem chegar.
- **Formato:** 3 a 5 semanas de trabalho conjunto.
- **Entregáveis:** arquitetura-alvo; escolha de ferramentas e modelos com justificativa de custo; plano de rollout por fase; política de governança e uso de dados; plano de capacitação; modelo de acompanhamento com indicadores; opção de acompanhamento mensal.
- **Faixa a validar:** R$ 18.000 a R$ 45.000, mais retainer mensal opcional.
- **CTA:** Falar sobre roadmap.

#### 2.3 Mentoria de Produto e Validação de MVP

- **Promessa:** descobrir se o produto vale ser construído antes de gastar meses construindo.
- **Para quem:** fundadores, times de produto e empresas lançando produto digital novo.
- **Formato:** duas modalidades. **Análise pontual:** auditoria de 2 semanas com relatório. **Mentoria contínua:** encontros quinzenais de 1 h, mínimo 3 meses.
- **Entregáveis (análise):** avaliação de proposta de valor, viabilidade técnica, arquitetura, custo de operação e riscos; recomendação de escopo mínimo; plano de validação com métricas.
- **Entregáveis (contínua):** acompanhamento de roadmap, revisão de decisões técnicas, apoio à priorização, acesso por canal direto.
- **Faixa a validar:** análise R$ 5.000 a R$ 10.000. Mentoria R$ 2.500 a R$ 5.000/mês.
- **CTA:** Avaliar meu produto.

### Pilar 3 – CONSTRUIR

#### 3.1 Assistentes e Agentes de IA

Substitui "implementação de modelos de IA humanizado".

- **Promessa:** um assistente que atende, responde e executa no tom da sua empresa, integrado ao WhatsApp e aos seus sistemas, 24 h por dia.
- **Para quem:** empresas com volume alto de atendimento repetitivo, qualificação de lead ou consulta interna a documentos.
- **Formato:** projeto de 4 a 10 semanas.
- **Entregáveis:** definição de persona e tom de voz; base de conhecimento estruturada (RAG) sobre documentos da empresa; integração com WhatsApp e com o sistema atual; regras de escalonamento para humano; painel de conversas e métricas; treinamento da equipe; 60 dias de ajuste fino.
- **Casos típicos:** atendimento e triagem no WhatsApp; qualificação de lead; assistente interno para consulta a manuais, contratos e políticas; agendamento; suporte nível 1.
- **Faixa a validar:** R$ 15.000 a R$ 60.000 de setup, mais mensalidade de operação e infraestrutura.
- **CTA:** Quero um assistente.
- **Diferencial a destacar na copy:** "humanizado" traduzido em algo verificável, por exemplo: responde no tom da empresa, sabe quando não sabe, e passa para um humano em vez de inventar.

#### 3.2 Sistemas Sob Medida

- **Promessa:** o sistema que sua operação precisa e que nenhum SaaS de prateleira resolve, com IA embarcada onde faz diferença.
- **Para quem:** empresas com processo próprio rodando em planilha, ERP incompleto ou integração manual entre ferramentas.
- **Formato:** projeto por fases, com entregas quinzenais. Início por escopo mínimo em 6 a 10 semanas.
- **Entregáveis:** levantamento e desenho de solução; sistema web responsivo; integrações com ferramentas existentes; painéis e relatórios; documentação; treinamento; suporte e evolução contratados à parte.
- **Stack:** React, Node.js, Supabase, Vercel e infraestrutura própria quando o dado exige.
- **Faixa a validar:** a partir de R$ 30.000, por escopo.
- **CTA:** Descrever meu problema.

#### 3.3 Landing Pages de Alta Conversão

- **Promessa:** uma página que carrega rápido, é encontrada no Google e transforma visita em conversa.
- **Para quem:** profissionais e empresas lançando serviço, produto ou campanha paga.
- **Formato:** 2 a 3 semanas.
- **Entregáveis:** estratégia de mensagem e estrutura; copy completa; design conforme a marca do cliente; desenvolvimento em Next.js; SEO técnico; analytics e rastreamento de conversão; integração com WhatsApp e CRM; hospedagem configurada; 30 dias de ajuste.
- **Faixa a validar:** R$ 4.000 a R$ 15.000.
- **CTA:** Solicitar proposta.
- **Posicionamento na página:** não fica na vitrine principal da home. Aparece no fim da grade de serviços e em página própria. Isso protege a percepção de preço da marca.

---

## 5. Arquitetura da informação e sitemap

### Escopo v1 (lançar em 3 a 4 semanas)

```
/                          Home (landing page única, longa, seções ancoradas)
/diagnostico               Página de conversão do produto de entrada
/obrigado                  Confirmação pós-conversão (dispara evento e mensagem)
/politica-de-privacidade   LGPD
/termos                    Termos de uso
```

### Escopo v2 (2 a 3 meses depois)

```
/servicos/imersao-ia-executiva
/servicos/formacao-ia-para-times
/servicos/workshop-ia-na-pratica
/servicos/roadmap-de-implantacao
/servicos/mentoria-de-produto
/servicos/assistentes-e-agentes-de-ia
/servicos/sistemas-sob-medida
/servicos/landing-pages
/casos                     Casos de sucesso
/casos/[slug]
/sobre                     Sobre Erich e a DOMINIA
/conteudo                  Blog / artigos
/conteudo/[slug]
```

**Racional:** landing única primeiro porque você ainda não tem prova social suficiente para sustentar 8 páginas de serviço. Página profunda sem prova converte pior que página única bem escrita. Expanda quando tiver casos.

### Navegação (header)

`Serviços · Método · Trajetória · Perguntas` + botão primário **Agendar conversa**

Máximo 4 itens de menu. Âncoras suaves. Em mobile, menu em drawer com o botão primário fixo no rodapé da tela.

---

## 6. Estrutura da página com copy final

Toda a copy abaixo está pronta para uso. Regras de voz aplicadas: frases curtas, verbo no presente, número em vez de adjetivo, sem jargão de marketing, sem promessa vaga.

---

### SEÇÃO 0 – Header

**Comportamento:** transparente sobre o hero, ganha fundo `#0D1B2A` com blur ao rolar 80 px. Altura 72 px desktop, 64 px mobile.

- Logo horizontal versão fundo escuro, altura 32 px
- Links: Serviços · Método · Trajetória · Perguntas
- Botão primário: **Agendar conversa**

---

### SEÇÃO 1 – Hero

**Layout:** fundo institucional `linear-gradient(160°, #0D1B2A, #06111F)` com a malha de dados a 12% de opacidade e o arco do D em glow celeste no canto direito, saindo do quadro. Conteúdo alinhado à esquerda, coluna de 640 px máx. Altura mínima 88vh.

**Eyebrow**
> CONSULTORIA EM INTELIGÊNCIA ARTIFICIAL APLICADA

**H1**
> Sua empresa testou IA. Agora precisa de resultado.

**Subtítulo**
> A DOMINIA conduz o caminho completo: forma o seu time, define onde a IA gera retorno e constrói o sistema que entra em produção. Um interlocutor do diagnóstico à entrega.

**CTAs**
- Primário: **Agendar conversa de 30 minutos**
- Terciário (link com seta): Ver como trabalho →

**Microcopy sob os botões**
> Conversa sem custo e sem apresentação comercial. Você sai com pelo menos uma direção prática.

**Barra de credibilidade (rodapé do hero, tipografia pequena, separadores em ponto celeste)**
> 25 anos em engenharia e liderança técnica · IA Generativa pelo MIT Professional Education · MBA FGV · Times de até 80 pessoas liderados

> **Nota de implementação:** enquanto não houver logos de clientes, esta barra carrega a prova. Quando houver, ela vira uma faixa de logos e as credenciais descem para a seção de trajetória.

---

### SEÇÃO 2 – Dores

**Layout:** fundo `#0D1B2A`. Título centralizado, quatro cards em grade 2×2 (desktop) e empilhados (mobile). Cada card com ponto celeste no canto superior esquerdo, o marcador de foco da marca.

**Eyebrow**
> O DIAGNÓSTICO MAIS COMUM

**H2**
> Provavelmente uma dessas frases já foi dita na sua empresa

**Cards**

| Card | Título | Texto |
|---|---|---|
| 1 | "O time usa ChatGPT, mas cada um do seu jeito" | Sem padrão, sem política de dados e sem ninguém medindo se melhorou alguma coisa. O risco cresce junto com o uso. |
| 2 | "Fizemos um piloto e parou por aí" | O piloto funcionou na demonstração e nunca chegou à operação. Faltou plano de rollout, dono e integração com o que já existe. |
| 3 | "Não sabemos por onde começar" | Existem 40 processos candidatos e nenhum critério para escolher. Sem priorização, a empresa começa pelo mais visível, não pelo mais rentável. |
| 4 | "Contratamos uma agência e recebemos um PDF" | Slide bonito, recomendação genérica, zero linha de código. O plano não sobreviveu ao primeiro obstáculo técnico. |

**Fecho da seção**
> As quatro têm a mesma causa: alguém tratou IA como ferramenta, quando o problema é de processo, dado e decisão. É aí que eu entro.

---

### SEÇÃO 3 – Os três pilares

**Layout:** três colunas com numeração 01/02/03 em Poppins 600 celeste, título, descrição e lista de serviços. Linha diagonal de 18° conectando as colunas em desktop, reforçando o movimento da marca.

**Eyebrow**
> COMO TRABALHO

**H2**
> Entender, decidir, executar

**Subtítulo**
> A maioria dos fornecedores cobre uma etapa. Treinador não implanta. Consultor não codifica. Fábrica de software não questiona a decisão. A DOMINIA cobre as três, e é isso que faz o plano chegar à produção.

**Pilar 01 – FORMAR**
> Pessoas usando IA com critério.
> Antes de automatizar qualquer coisa, o time precisa entender o que a ferramenta faz, onde ela erra e o que não pode entrar nela. Capacitação aplicada ao trabalho real, não a exemplos genéricos.
> *Imersão Executiva · Formação para Times · Workshop in company*

**Pilar 02 – DIRECIONAR**
> A empresa sabendo onde aplicar.
> Mapeamento de oportunidades, priorização por impacto e esforço, estimativa de retorno e um roadmap com dono, prazo e critério de sucesso. Decisão baseada em dado, não em tendência.
> *Diagnóstico de Maturidade · Roadmap de Implantação · Mentoria de Produto e MVP*

**Pilar 03 – CONSTRUIR**
> Sistema rodando em produção.
> Assistentes, agentes e sistemas sob medida, integrados ao que a empresa já usa, com painel de acompanhamento e time treinado para operar.
> *Assistentes e Agentes de IA · Sistemas Sob Medida · Landing Pages*

---

### SEÇÃO 4 – Serviços

**Layout:** abas por pilar (Formar / Direcionar / Construir) com grade de cards abaixo. Card com título, uma linha de promessa, formato, duração e link "Ver detalhes" que abre painel lateral com o conteúdo completo da seção 4 deste documento. O card do Diagnóstico recebe borda em gradiente da marca e etiqueta "Comece por aqui".

**Eyebrow**
> SERVIÇOS

**H2**
> Nove formas de entrar, um só caminho

**Subtítulo**
> Cada serviço resolve um estágio diferente. Se você não sabe qual é o seu, comece pelo diagnóstico.

**Copy resumida dos cards**

| Serviço | Uma linha | Formato | Duração |
|---|---|---|---|
| Diagnóstico de Maturidade em IA | Onde a IA gera retorno na sua empresa, com número e ordem de execução. | Preço e escopo fixos | 2 semanas |
| Imersão IA Executiva | Você sai usando IA no seu próprio trabalho, com fluxos prontos. | 1:1 | 3 encontros de 2 h |
| Formação IA para Times | O time inteiro passa a usar IA com padrão e segurança. | Turma fechada, 8 a 30 pessoas | 6 semanas |
| Workshop IA na Prática | Em um dia, sua empresa sai com os próprios casos de uso priorizados. | Presencial, até 25 pessoas | 4 h ou 8 h |
| Roadmap de Implantação | Plano executável de 6 a 12 meses, com custo, dono e critério de sucesso. | Projeto | 3 a 5 semanas |
| Mentoria de Produto e MVP | Descubra se vale construir antes de gastar meses construindo. | Análise ou mentoria contínua | 2 semanas ou 3 meses+ |
| Assistentes e Agentes de IA | Atende, responde e executa no tom da sua empresa, integrado ao WhatsApp. | Projeto | 4 a 10 semanas |
| Sistemas Sob Medida | O sistema que sua operação precisa e que nenhum SaaS resolve. | Projeto por fases | A partir de 6 semanas |
| Landing Pages de Alta Conversão | Página rápida, encontrável e feita para virar conversa. | Projeto | 2 a 3 semanas |

---

### SEÇÃO 5 – Método

**Layout:** timeline horizontal em desktop (4 etapas), vertical em mobile. Numeração justificada porque é sequência real. Linha de progresso em gradiente da marca.

**Eyebrow**
> MÉTODO

**H2**
> Quatro etapas, sem etapa invisível

**Subtítulo**
> Você sabe o que acontece em cada semana e o que recebe no fim de cada uma.

| Etapa | Nome | Texto |
|---|---|---|
| 01 | Escutar | Conversa de 30 min para entender o contexto, o que já foi tentado e o que está travando. Sem apresentação comercial. Se não for o meu problema, eu digo e indico quem resolve. |
| 02 | Mapear | Entrevistas com quem executa, análise de processo e dado, e priorização por impacto e esforço. O resultado é uma lista ordenada, não um relatório de tendências. |
| 03 | Construir | Entregas quinzenais, ambiente de homologação e o time da empresa acompanhando desde o começo. Nada é revelado só no final. |
| 04 | Sustentar | Time treinado para operar, documentação entregue e acompanhamento por indicador. O projeto termina quando a empresa consegue tocar sozinha. |

---

### SEÇÃO 6 – Bloco do Diagnóstico

**Layout:** faixa destacada de largura total, fundo `#12263A` com borda superior em gradiente da marca e malha de dados a 8%. Conteúdo em duas colunas: copy à esquerda, lista de entregáveis em card à direita.

**Eyebrow**
> COMECE POR AQUI

**H2**
> Diagnóstico de Maturidade em IA

**Texto**
> Em duas semanas você recebe um retrato honesto de onde sua empresa está e um plano de 90 dias do que fazer primeiro. Escopo fixo, prazo fixo, preço fixo. Se você contratar um projeto de execução em até 60 dias, o valor do diagnóstico é abatido integralmente.

**Lista de entregáveis (card à direita, cada item com o ponto celeste como bullet)**
- Nota de maturidade por dimensão: dados, processos, pessoas, tecnologia e governança
- 10 a 15 oportunidades mapeadas e ordenadas por impacto e esforço
- Estimativa de retorno das 3 principais
- Roadmap de 90 dias com responsável e critério de sucesso
- Apresentação executiva de 60 min para a diretoria

**Linha de escopo (tipografia pequena, cinza prata)**
> 2 semanas · reunião de imersão de 90 min · 3 a 5 entrevistas · a partir de R$ 4.500

**CTA**
- Primário: **Contratar diagnóstico**
- Terciário: Tirar uma dúvida antes →

---

### SEÇÃO 7 – Trajetória

**Layout:** duas colunas. Foto profissional à esquerda (retrato, fundo navy, enquadramento até o peito, luz lateral). Texto à direita. Abaixo, faixa com 4 números.

**Eyebrow**
> QUEM CONDUZ

**H2**
> Erich Cavichi

**Texto**
> Sou engenheiro e gestor de tecnologia. Passei 15 anos na indústria aeronáutica cuidando de plataformas de conteúdo, liderei engenharia dentro de uma das maiores operações financeiras do país, com até 80 pessoas em 18 squads, e hoje sigo liderando um time de engenharia enquanto conduzo os projetos da DOMINIA.
>
> Isso significa uma coisa prática para você: eu já estive do lado de dentro. Já vi projeto de tecnologia morrer por falta de patrocínio, já migrei sistema legado para nuvem com a operação rodando e já entreguei plataforma de IA em produção com arquitetura de RAG e agentes. Quando eu digo que um prazo é otimista, é porque eu já perdi esse prazo antes.
>
> A DOMINIA nasceu disso e leva o nome da minha família: DO, MI, NI e A, com IA de inteligência artificial no fim. É um negócio de pessoa, não de balcão.

**Formação**
> IA Generativa · MIT Professional Education · MBA · FGV

**Números**

| Número | Rótulo |
|---|---|
| 25 anos | em tecnologia |
| 80 | pessoas lideradas |
| 18 | squads sob gestão |
| 2 | certificações MIT e FGV |

> **Nota:** substitua qualquer número por outro que você consiga sustentar em conversa. Se um cliente perguntar "quais 18 squads?", você precisa ter resposta.

---

### SEÇÃO 8 – Prova social

**Layout:** carrossel de depoimentos em cards com aspas em celeste, foto pequena, nome, cargo e empresa. Abaixo, faixa de logos em branco frio a 60% de opacidade.

**Eyebrow**
> RESULTADOS

**H2**
> O que os clientes dizem

> **Estado inicial:** se você não tiver 3 depoimentos até o lançamento, **oculte esta seção inteira**. Seção de depoimento com um único item genérico prejudica mais do que ajuda. Enquanto isso, substitua por uma seção de "projetos próprios" descrevendo RodaHub e o programa de mentoria de IA, declarados como projetos da DOMINIA.

**Estrutura de cada caso (quando houver)**
```
Contexto:   [empresa, setor, porte, situação inicial em 1 frase]
Desafio:    [o problema em 1 frase]
Solução:    [o que foi feito em 2 frases]
Resultado:  [número + prazo]
Depoimento: [1 a 3 frases, nome, cargo]
```

---

### SEÇÃO 9 – Para quem é e para quem não é

**Layout:** duas colunas contrastantes. Coluna esquerda com marcador celeste, coluna direita com marcador cinza prata e opacidade reduzida.

**H2**
> Nem todo projeto é o meu projeto

**É para você se**
- Sua empresa tem processo repetitivo e volume o suficiente para justificar automação
- A decisão de investir já foi tomada, falta saber onde aplicar
- Você quer envolver o time, não substituí-lo por uma caixa preta
- Você prefere entrega em fases e acompanhamento a promessa de solução mágica

**Não é para você se**
- Você procura o fornecedor mais barato
- Você quer uma palestra de uma hora sem desdobramento
- Você espera terceirizar a decisão sem participação da sua equipe
- Você precisa de resultado em duas semanas com orçamento de duas horas

---

### SEÇÃO 10 – Perguntas frequentes

**Layout:** acordeão, uma coluna, largura máxima 760 px. Primeiro item aberto por padrão.

**H2**
> Perguntas que sempre aparecem

| Pergunta | Resposta |
|---|---|
| Minha empresa é pequena. Faz sentido? | Faz, se existir volume. Uma equipe de 10 pessoas com 200 atendimentos por dia tem mais a ganhar que uma de 100 com fluxo irregular. Na conversa de 30 min dá para saber. |
| Meus dados ficam seguros? | Definir o que pode e o que não pode entrar em modelo de IA é parte do escopo, não item opcional. Trabalho com modelos que não usam seus dados para treinamento e, quando o dado exige, com infraestrutura própria. A política de uso é entregue por escrito. |
| Quanto tempo até ver resultado? | O diagnóstico entrega direção em 2 semanas. Um assistente entra em operação entre 4 e 10 semanas. Sistema sob medida tem primeira entrega útil em 6 a 10 semanas. Prazos menores que isso costumam ser promessa, não plano. |
| Vocês substituem meu time de TI? | Não. Trabalho junto com quem já está lá, e a documentação e o treinamento fazem parte da entrega. O objetivo é a empresa tocar sozinha depois. |
| Atende presencialmente? | Workshops são presenciais. Base em São José dos Campos, atendimento presencial no Vale do Paraíba e na Grande São Paulo, e remoto para o resto do Brasil. |
| Como é a cobrança? | Diagnóstico e workshop têm preço fixo. Projetos de construção são por escopo, com pagamento em marcos de entrega. Mentoria e sustentação são mensais. Tudo em contrato, sem cobrança por hora não prevista. |
| Já uso ChatGPT. Preciso de consultoria? | Usar ChatGPT é diferente de operar IA na empresa. A diferença aparece em padrão, segurança de dado, integração com sistema e medição de retorno. Se essas quatro coisas já estão resolvidas aí, você não precisa de mim. |
| Trabalha com que tecnologias? | Modelos das principais famílias disponíveis, escolhidos por custo e adequação ao caso, não por preferência. Desenvolvimento em React, Node.js e Supabase, com infraestrutura em nuvem ou dedicada conforme a exigência do dado. |

---

### SEÇÃO 11 – CTA final

**Layout:** faixa de largura total com fundo em gradiente da marca em versão escura, o arco do D em marca d'água a 10%, conteúdo centralizado.

**H2**
> Trinta minutos, uma direção prática

**Texto**
> Me conte o que está travando. Eu digo se é o meu tipo de problema, e o que eu faria no seu lugar. Se não for para mim, indico quem resolve. Sem apresentação comercial.

**CTAs**
- Primário: **Agendar conversa**
- Secundário: Falar no WhatsApp

**Microcopy**
> Resposta em até 1 dia útil.

---

### SEÇÃO 12 – Rodapé

**Layout:** fundo `#06111F`, três colunas em desktop, empilhado em mobile.

**Coluna 1 – Marca**
Logo horizontal fundo escuro. Abaixo, slogan em Poppins 300:
> Inteligência que transforma. Resultados que dominam.

**Coluna 2 – Navegação**
Serviços · Método · Trajetória · Perguntas · Política de Privacidade · Termos

**Coluna 3 – Contato**
> DOMINIA Consultoria em Tecnologia da Informação LTDA
> Rua Benedito Oswaldo Lecques, 51, Sala 104
> São José dos Campos, SP
> contato@dominia.com.br
> WhatsApp: [número]
> CNPJ: [preencher]

**Linha final**
> © 2026 DOMINIA Consultoria em Tecnologia da Informação LTDA. Todos os direitos reservados.

Ícones sociais: LinkedIn, Instagram, YouTube (só os que estiverem ativos, com postagem recente. Ícone que leva a perfil parado prejudica).

---

## 7. Sistema de design aplicado ao site

Tokens extraídos diretamente do Design System v1.0. Use exatamente estes valores.

### Cores

```css
:root {
  /* Institucionais */
  --navy:          #0D1B2A;  /* base institucional */
  --azul-royal:    #2563EB;  /* ação primária */
  --azul-celeste:  #38BDF8;  /* links, destaques, o ponto do A */
  --cinza-prata:   #9CA3AF;  /* texto secundário, bordas */
  --branco-frio:   #F8FAFC;  /* texto sobre navy */

  /* Escala de superfície (dark) */
  --surface-900:   #06111F;
  --surface-800:   #0D1B2A;
  --surface-700:   #12263A;
  --surface-600:   #1B3550;
  --surface-500:   #274766;

  /* Escala de azul */
  --blue-700:      #1D4ED8;
  --blue-600:      #2563EB;
  --blue-500:      #3B82F6;
  --blue-400:      #38BDF8;
  --blue-200:      #BAE6FD;

  /* Funcionais – só estados de interface */
  --sucesso:       #10B981;
  --atencao:       #F59E0B;
  --erro:          #EF4444;
  --info:          #38BDF8;

  /* Gradientes */
  --grad-marca:    linear-gradient(120deg, #1D4ED8, #2563EB 42%, #38BDF8);
  --grad-fundo:    linear-gradient(160deg, #0D1B2A, #06111F);
}
```

**Regras de contraste (validadas no Design System)**

| Combinação | Razão | Uso |
|---|---|---|
| Branco frio sobre navy 800 | 14.8:1 · AAA | Texto principal |
| Celeste sobre navy 800 | 8.1:1 · AAA | Links, destaques, eyebrows |
| Prata sobre navy 800 | 5.4:1 · AA | Texto secundário, apenas ≥ 14 px |
| Royal sobre navy 800 | 2.9:1 | **Nunca para texto.** Só preenchimento de botão e gradiente. |

**Nunca** use cores funcionais em conteúdo institucional. Elas existem só para estado de sistema (formulário validado, erro, alerta).

### Tipografia

```css
--font-display: 'Poppins', sans-serif;  /* 400 / 500 / 600 */
--font-body:    'Raleway', sans-serif;  /* 300 / 400 / 600 */
```

| Papel | Fonte | Tamanho | Line-height | Tracking |
|---|---|---|---|---|
| Display (H1) | Poppins 600 | 56–72 px | 1.05 | .02em |
| Título de seção (H2) | Poppins 600 | 40 px | 1.1 | normal |
| Subtítulo / card (H3) | Poppins 500 | 24 px | 1.25 | normal |
| Corpo | Raleway 400 | 16–17 px | 1.6 | normal |
| Eyebrow / rótulo | Poppins 600 | 11–12 px | 1.4 | .24em, uppercase |
| Slogan | Poppins 300 | variável | 1.3 | .08em, uppercase |

**Medida de leitura:** máximo 76 caracteres por linha em corpo de texto.

**Escala mobile:** H1 36–42 px, H2 28 px, H3 20 px, corpo 16 px. Nunca abaixo de 16 px em corpo (iOS dá zoom em input com fonte menor).

**Carregamento:** `next/font` com subset latin e latin-ext (acentuação portuguesa), `display: swap`, pesos apenas os listados. Não carregue a família inteira.

### Espaçamento (base 8)

```
8   – interno de chips
16  – gap de formulário
24  – padding de card
40  – blocos internos
88  – respiro entre seções (desktop; use 56 em mobile)
```

### Raio de canto

```
8   – input, tag
14  – botão, campo
22  – card, painel
full – badge, avatar
```

### Elevação

```css
--elev-1: 0 6px 18px rgba(0,0,0,.28);
--elev-2: 0 18px 44px rgba(0,0,0,.34);
--elev-3: 0 30px 80px rgba(0,0,0,.42);
--elev-foco: 0 0 0 3px rgba(56,189,248,.45);  /* glow azul */
```

### Movimento

```css
--dur-micro:  120ms;  /* hover, foco */
--dur-comp:   220ms;  /* menu, aba, acordeão */
--dur-pagina: 360ms;  /* modal, transição de rota */
--ease:       cubic-bezier(.2,.8,.2,1);
```

**Regra direcional da marca:** toda entrada de elemento desliza de baixo para cima com leve deslocamento à direita, seguindo a diagonal do arco do D. Em código: `translate(-12px, 24px) → translate(0,0)`.

**Respeite `prefers-reduced-motion: reduce`** desativando translate e mantendo apenas o fade.

### Grafismo de apoio – malha de dados

Derivada da rede neural do símbolo. Aparece como textura de fundo em hero, faixa do diagnóstico e CTA final.

- Opacidade máxima **18%**, recomendado 8 a 12% no site
- **Nunca atravessa texto.** Aplique com `mask-image` para desvanecer nas bordas
- Implementar como SVG inline com nós e ligações, não como imagem raster
- Animação opcional muito lenta (60 s+) de deriva dos nós, desativada em `reduced-motion` e em mobile

### Uso da marca no site

| Contexto | Arquivo | Tamanho |
|---|---|---|
| Header | `dominia_logo_horizontal_transparente_HD_4000px.png` ou SVG | 180 px larg. mín. |
| Rodapé | mesmo arquivo | 180 px |
| Favicon | `assets/vector/dominia-icone-app.svg` + PNG 128/256/512 | – |
| Open Graph | composição em navy com lockup + slogan | 1200 × 630 px |
| Marca d'água | `dominia_simbolo_D_transparente_HD_4096px.png` | opacidade ≤ 12% |

**Área de respiro:** margem livre mínima = altura do símbolo D ÷ 2 em todos os lados. Nenhum elemento invade.

**Abaixo de 180 px de largura, use o símbolo isolado**, não o lockup. O descritivo "Consultoria em Tecnologia da Informação LTDA" deixa de ser legível.

**Proibido:** digitar DOMINIA em fonte comum, redesenhar o D, trocar o ponto azul do A, aplicar versão de fundo escuro sobre fundo claro, distorcer, rotacionar, contornar ou aplicar sombra dura.

---

## 8. Componentes e comportamento

### Botões

| Variante | Fundo | Texto | Borda | Hover |
|---|---|---|---|---|
| Primário | `--grad-marca` | `--branco-frio` | nenhuma | brilho +8%, elevação 1, translateY(-1px) |
| Secundário | transparente | `--branco-frio` | 1px `rgba(248,250,252,.25)` | borda em celeste, fundo `rgba(56,189,248,.08)` |
| Terciário | transparente | `--azul-celeste` | nenhuma | seta desloca 4 px à direita |
| Desabilitado | `--surface-600` | `--cinza-prata` | nenhuma | sem alteração, cursor not-allowed |

- Altura mínima de toque: **44 px**
- Raio: 14 px
- **Um único botão primário por tela ou bloco de decisão.** Regra do Design System, respeite: hero, bloco do diagnóstico e CTA final não devem competir.
- Foco visível obrigatório: `--elev-foco`

### Cards

- Fundo `--surface-700`, raio 22 px, padding 24 px, borda 1px `rgba(248,250,252,.06)`
- Hover: borda em `rgba(56,189,248,.35)`, elevação 2, translateY(-4px), 220 ms
- Card em destaque (Diagnóstico): borda de 1px em `--grad-marca` via `border-image` ou pseudo-elemento

### Acordeão (FAQ)

- Item fechado: título Poppins 500 20 px, ícone `+` em celeste
- Aberto: ícone rotaciona para `×` (220 ms), corpo em Raleway 400 16 px com `--cinza-prata`
- Um item aberto por vez, primeiro aberto no carregamento
- Marcação semântica com `<details>`/`<summary>` ou padrão ARIA disclosure

### Abas (Serviços)

- Aba ativa: texto branco frio, sublinhado de 2 px em `--grad-marca`
- Inativa: `--cinza-prata`, hover para celeste
- Transição do sublinhado 220 ms
- Navegação por teclado com setas, `role="tablist"`

### Painel lateral de serviço

- Desliza da direita, 480 px desktop, largura total mobile
- Overlay `rgba(6,17,31,.72)` com blur 8 px
- Fecha por `Esc`, clique no overlay e botão de fechar
- Foco preso dentro do painel enquanto aberto, retorna ao gatilho ao fechar

### Etiquetas

Reaproveite os estados do Design System: Institucional, Ativo, Concluído, Pendente, Crítico. No site, usar apenas **Institucional** (fundo `rgba(56,189,248,.12)`, texto celeste) e o destaque **Comece por aqui** com o gradiente da marca.

### Estados vazios e de erro

Voz da interface, não pessoal. Nunca vago, nunca pedindo desculpa.

- Erro de envio: "Não consegui enviar. Verifique a conexão e tente de novo, ou fale direto no WhatsApp."
- Campo inválido: "CNPJ incompleto – informe 14 dígitos." (padrão já presente no Design System)
- Sucesso: "Recebido. Respondo em até 1 dia útil."

---

## 9. Conversão: formulários, qualificação e fluxo de lead

### Hierarquia de CTAs

```
PRIMÁRIO      Agendar conversa de 30 minutos   → Cal.com embutido
SECUNDÁRIO    Falar no WhatsApp                 → wa.me com mensagem pré-preenchida
TERCIÁRIO     Contratar diagnóstico             → /diagnostico
```

Botão flutuante de WhatsApp no canto inferior direito, aparecendo após 40% de rolagem, com opção de dispensar. Não use pop-up de saída, não use pop-up temporizado. Ambos aumentam lead ruim e prejudicam a percepção de marca premium.

### Formulário principal (página /diagnostico)

Cinco campos. Cada campo adicional custa conversão.

| Campo | Tipo | Obrigatório | Observação |
|---|---|---|---|
| Nome | texto | sim | – |
| E-mail corporativo | e-mail | sim | validar domínio não gratuito, aviso suave se for gmail |
| WhatsApp | tel com máscara | sim | `(00) 00000-0000` |
| Empresa | texto | sim | – |
| Qual o principal desafio hoje? | textarea, 3 linhas | sim | campo de qualificação mais valioso do formulário |
| Porte da empresa | select | não | até 20 / 21–100 / 101–500 / 500+ |
| Consentimento LGPD | checkbox | sim | com link para política |

**Microcopy sob o botão:** "Seus dados ficam com a DOMINIA. Sem lista de disparo, sem repasse a terceiros."

### Mensagem pré-preenchida do WhatsApp

```
Olá! Vim pelo site da DOMINIA. Queria conversar sobre [IA na minha empresa].
```
Varie o trecho entre colchetes conforme a seção de origem do clique, e registre a origem em UTM.

### Fluxo pós-conversão (automatizar no n8n)

```
1. Lead entra          → grava no Supabase
2. Confirmação         → e-mail ao lead em até 1 min, com o que esperar e prazo
3. Alerta              → notificação sua no WhatsApp via Evolution API com os dados
4. Enriquecimento      → busca de site e LinkedIn da empresa, anexado ao registro
5. Score               → classificação por porte + tipo de desafio (A / B / C)
6. Cadência            → se não houver resposta em 2 dias, lembrete automático único
7. CRM                 → registro no funil com origem e UTM
```

### Página /obrigado

Existe por dois motivos: disparar o evento de conversão de forma limpa e reduzir a ansiedade do lead.

> **Recebido.**
> Vou ler com atenção e responder em até 1 dia útil, direto do meu e-mail.
> Enquanto isso, se quiser adiantar o contexto, me chame no WhatsApp.
>
> [Falar no WhatsApp] [Voltar ao site]

---

## 10. SEO e metadados

### Metadados da home

```html
<title>DOMINIA – Consultoria em Inteligência Artificial para Empresas</title>
<meta name="description" content="Treinamento, diagnóstico e desenvolvimento de IA aplicada. Do mapeamento de oportunidades ao sistema em produção. Consultoria em São José dos Campos e remoto para todo o Brasil.">
<link rel="canonical" href="https://dominia.com.br/">
<meta property="og:type" content="website">
<meta property="og:title" content="DOMINIA – Inteligência que transforma. Resultados que dominam.">
<meta property="og:description" content="Sua empresa testou IA. Agora precisa de resultado. Consultoria que forma o time, define onde aplicar e constrói o sistema.">
<meta property="og:image" content="https://dominia.com.br/og-image.png">
<meta property="og:locale" content="pt_BR">
<meta name="twitter:card" content="summary_large_image">
```

**Título:** 60 caracteres máx. **Descrição:** 155 caracteres máx.

### Metadados de /diagnostico

```html
<title>Diagnóstico de Maturidade em IA – DOMINIA</title>
<meta name="description" content="Em 2 semanas, saiba onde a IA gera retorno na sua empresa. Nota de maturidade, oportunidades priorizadas e roadmap de 90 dias. Escopo e preço fixos.">
```

### Palavras-chave alvo

| Prioridade | Termo | Onde aplicar |
|---|---|---|
| Alta | consultoria em inteligência artificial para empresas | title, H1 da região, corpo |
| Alta | implantação de IA em empresas | seção pilares e método |
| Alta | treinamento de IA in company | serviços |
| Média | consultoria IA São José dos Campos | rodapé, LocalBusiness, página de contato |
| Média | agente de IA para WhatsApp empresa | serviço 3.1 |
| Média | automação com inteligência artificial | dores e serviços |
| Longa cauda | como implantar IA na minha empresa | FAQ e blog v2 |
| Longa cauda | diagnóstico de maturidade em IA | página do diagnóstico |

Não force. Escreva para pessoa, distribua os termos naturalmente em H2, primeiro parágrafo de seção e FAQ.

### Schema.org (JSON-LD)

Três blocos: `ProfessionalService`, `Person` e `FAQPage`.

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "DOMINIA Consultoria em Tecnologia da Informação",
  "description": "Consultoria em inteligência artificial aplicada: treinamento, diagnóstico, roadmap de implantação e desenvolvimento de sistemas.",
  "url": "https://dominia.com.br",
  "email": "contato@dominia.com.br",
  "priceRange": "$$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rua Benedito Oswaldo Lecques, 51, Sala 104",
    "addressLocality": "São José dos Campos",
    "addressRegion": "SP",
    "addressCountry": "BR"
  },
  "areaServed": [
    { "@type": "City", "name": "São José dos Campos" },
    { "@type": "Country", "name": "Brasil" }
  ],
  "founder": {
    "@type": "Person",
    "name": "Erich Cavichi",
    "jobTitle": "Consultor em Inteligência Artificial",
    "alumniOf": ["MIT Professional Education", "Fundação Getulio Vargas"]
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Serviços DOMINIA",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Diagnóstico de Maturidade em IA" }},
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Formação IA para Times" }},
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Workshop IA na Prática" }},
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Roadmap de Implantação de IA" }},
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Assistentes e Agentes de IA" }},
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sistemas Sob Medida" }}
    ]
  }
}
```

Adicione `FAQPage` com as 8 perguntas da seção 10 da página. Isso pode render rich snippet no Google.

### Metas técnicas

| Métrica | Alvo |
|---|---|
| LCP | < 2,0 s |
| CLS | < 0,05 |
| INP | < 200 ms |
| Lighthouse Performance | ≥ 92 mobile |
| Lighthouse Acessibilidade | 100 |
| Peso total inicial | < 500 KB |

Imagens em WebP/AVIF via `next/image`. Fontes com preload. Sem biblioteca de animação pesada: `IntersectionObserver` com CSS transitions resolve tudo que este site precisa.

---

## 11. Stack técnica e infraestrutura

Alinhada ao que você já opera, para não criar mais um ambiente para manter.

| Camada | Escolha | Motivo |
|---|---|---|
| Framework | Next.js 15, App Router | SSG para SEO, `next/font` e `next/image` resolvem performance |
| Estilo | Tailwind CSS com tokens da marca em `tailwind.config` | Tokens do Design System viram classes utilitárias |
| Componentes | shadcn/ui adaptado à paleta | Acessibilidade pronta em acordeão, abas e diálogo |
| Animação | CSS + IntersectionObserver | Framer Motion só se houver necessidade real; economiza ~40 KB |
| Hospedagem | Vercel | Você já usa. Domínio, SSL e preview automáticos |
| Formulários | API Route → Supabase | Você já usa Supabase |
| Automação | n8n na VPS Hostinger | Já em operação |
| WhatsApp | Evolution API | Já em operação |
| Agendamento | Cal.com embutido | Elimina troca de e-mail para marcar |
| Analytics | Vercel Analytics + GA4 + Meta Pixel | Pixel só se houver campanha paga |
| E-mail transacional | Resend | Integra bem com Next.js |

**Atenção com o plano Hobby da Vercel:** você já perdeu limite com laço de requisição de imagem em outro projeto. Antes do lançamento, confirme que nenhum componente refaz requisição de imagem em loop, e considere plano Pro para o site institucional, já que ele é ativo comercial.

### Configuração de domínio

```
dominia.com.br         A / ALIAS  → Vercel
www.dominia.com.br     CNAME      → cname.vercel-dns.com  (redirecionar para apex)
```

Registro.br apontando para Cloudflare, Cloudflare em modo DNS only para os registros da Vercel, evitando conflito de proxy com o SSL da Vercel. Configure SPF, DKIM e DMARC para `contato@dominia.com.br`, caso contrário e-mail de confirmação cai em spam.

### Estrutura de pastas sugerida

```
src/
  app/
    layout.tsx
    page.tsx
    diagnostico/page.tsx
    obrigado/page.tsx
    politica-de-privacidade/page.tsx
    api/lead/route.ts
  components/
    layout/     Header, Footer, WhatsAppFloat
    sections/   Hero, Dores, Pilares, Servicos, Metodo,
                Diagnostico, Trajetoria, Prova, ParaQuem, FAQ, CTAFinal
    ui/         Button, Card, Accordion, Tabs, SidePanel, Badge, Input
    brand/      Logo, MalhaDeDados, ArcoD
  content/
    servicos.ts   → fonte única de verdade dos 9 serviços
    faq.ts
    depoimentos.ts
  lib/
    analytics.ts
    schema.ts
```

**Ponto importante:** mantenha os 9 serviços em `content/servicos.ts` como um único array tipado. Cards da home, painel lateral, páginas de serviço da v2 e o JSON-LD leem dessa mesma fonte. Assim você atualiza preço ou promessa em um lugar só.

---

## 12. Analytics e métricas de sucesso

### Eventos a rastrear

| Evento | Disparo |
|---|---|
| `hero_cta_click` | clique no CTA principal do hero |
| `service_panel_open` | abertura de painel, com nome do serviço |
| `diagnostico_view` | visualização da seção do diagnóstico |
| `diagnostico_cta_click` | clique em contratar diagnóstico |
| `form_start` | foco no primeiro campo |
| `form_submit` | envio com sucesso |
| `form_error` | erro de validação, com nome do campo |
| `whatsapp_click` | com origem da seção |
| `calendly_scheduled` | agendamento confirmado |
| `faq_open` | com a pergunta |
| `scroll_75` | leitura profunda |

### Metas dos 90 primeiros dias

| Métrica | Alvo | Como ler |
|---|---|---|
| Taxa de conversão de visita em lead | 2 a 4% | Abaixo de 1,5%, o problema está no hero ou na oferta |
| Agendamentos por mês | 8 a 15 | Volume mínimo para calibrar o discurso |
| Taxa de comparecimento | > 70% | Abaixo disso, melhore o lembrete automático |
| Lead qualificado (A/B) | > 50% | Abaixo disso, aperte a seção "não é para você" |
| Tempo médio na página | > 2 min | Abaixo de 45 s, a mensagem do hero não está clara |
| Rolagem até o diagnóstico | > 40% | Se for baixo, suba o bloco na página |

### Painel de acompanhamento

Vale montar um painel simples lendo o Supabase, mostrando leads por semana, origem, score e taxa de conversão por etapa. É também um caso de uso vendável para clientes que fazem a mesma pergunta.

---

## 13. Roadmap de implementação

### Semana 1 – Fundação e conteúdo

- [ ] Decidir os 5 pontos da seção 1
- [ ] Preencher CNPJ, WhatsApp comercial e e-mail nos placeholders
- [ ] Sessão de fotos profissionais (retrato em fundo navy, ambiente de trabalho, workshop se houver registro)
- [ ] Solicitar 3 depoimentos por escrito e autorização de uso de logo
- [ ] Revisar e travar preços das 9 ofertas
- [ ] Setup do repositório, Next.js, Tailwind com tokens, deploy inicial na Vercel

### Semana 2 – Construção

- [ ] Header, Footer, sistema de botões e cards
- [ ] Componente `MalhaDeDados` em SVG
- [ ] Seções 1 a 5 (hero, dores, pilares, serviços, método)
- [ ] `content/servicos.ts` como fonte única
- [ ] Painel lateral de serviço com acessibilidade

### Semana 3 – Conversão e conteúdo final

- [ ] Bloco do diagnóstico e página `/diagnostico`
- [ ] Formulário, API Route, gravação no Supabase
- [ ] Fluxo n8n completo com alerta no WhatsApp e e-mail de confirmação
- [ ] Cal.com embutido
- [ ] Seções 7 a 12 (trajetória, prova, para quem, FAQ, CTA, rodapé)
- [ ] Política de privacidade e termos

### Semana 4 – Ajuste e lançamento

- [ ] Auditoria Lighthouse e correções até atingir as metas
- [ ] Teste em iOS Safari, Android Chrome, Firefox e Edge
- [ ] Navegação completa por teclado e leitor de tela
- [ ] Analytics e eventos validados um a um
- [ ] Schema.org validado no Rich Results Test
- [ ] DNS, SSL, SPF/DKIM/DMARC
- [ ] Google Search Console e sitemap
- [ ] Revisão ortográfica por outra pessoa
- [ ] Lançamento e anúncio no LinkedIn

---

## 14. Checklist de lançamento

**Conteúdo**
- [ ] Nenhum placeholder `[preencher]` no ar
- [ ] CNPJ, endereço e telefone conferidos
- [ ] Todos os números da seção de trajetória sustentáveis em conversa
- [ ] Nenhum nome de empresa citado sem autorização ou sem checagem contratual
- [ ] Seção de depoimentos ou oculta ou com 3 itens reais

**Técnico**
- [ ] Lighthouse mobile ≥ 92 em performance
- [ ] Nenhum erro no console
- [ ] Formulário testado ponta a ponta, incluindo o alerta no WhatsApp
- [ ] E-mail de confirmação chegando na caixa de entrada, não no spam
- [ ] 404 personalizado
- [ ] `robots.txt` e `sitemap.xml`
- [ ] Redirecionamento de www para apex
- [ ] Sem laço de requisição de imagem (lição do projeto Sleiman)

**Legal**
- [ ] Política de privacidade com base legal e finalidade de cada dado (LGPD)
- [ ] Banner de cookies se houver Pixel ou GA4
- [ ] Consentimento explícito no formulário
- [ ] Termos de uso publicados

**Acessibilidade**
- [ ] Contraste conforme a tabela da seção 7
- [ ] Foco visível em todo elemento interativo
- [ ] `alt` descritivo em toda imagem de conteúdo
- [ ] Formulário navegável só por teclado
- [ ] `prefers-reduced-motion` respeitado

---

## 15. Backlog v2

Ordenado por retorno esperado.

1. **Páginas individuais de serviço** com casos, FAQ específico e schema próprio. Multiplica superfície de busca.
2. **Calculadora de retorno de automação**: o visitante informa volume de atendimento, tempo médio e custo/hora, e recebe estimativa de economia com IA. Captura e-mail para enviar o relatório. Alto poder de conversão e coerente com a sua promessa de número em vez de adjetivo.
3. **Autodiagnóstico gratuito**: versão enxuta do Diagnóstico de Maturidade em 12 perguntas, com nota e relatório por e-mail. Você já construiu quiz de arquétipo antes, então o padrão é conhecido.
4. **Blog** com 1 artigo a cada 15 dias, escritos sobre o que você já responde em reunião. Casos reais convertem melhor que artigo teórico.
5. **Casos em vídeo** de 90 s com o cliente falando.
6. **Página de recursos** com política de uso de IA em modelo, checklist de segurança de dados e matriz de priorização. Isca de e-mail de altíssima qualificação.
7. **Versão em inglês** se houver intenção de atender fora do Brasil.
8. **Painel do cliente** usando os componentes já desenhados no Design System (a seção 08 do manual já mostra o padrão de painel com SLA, tickets e economia).

---

## Anexo – Resumo das mudanças que sugeri

| # | Sugestão | Impacto |
|---|---|---|
| 1 | Agrupar 7 serviços em 3 pilares (Formar, Direcionar, Construir) | Elimina leitura de generalista e cria narrativa de caminho completo |
| 2 | Criar o Diagnóstico de Maturidade em IA como oferta de entrada | Cria o degrau de entrada que hoje não existe; transforma indicação em funil |
| 3 | Abater o diagnóstico do projeto contratado em 60 dias | Reduz atrito da primeira compra sem descontar o projeto grande |
| 4 | Renomear "IA humanizada" para "Assistentes e Agentes de IA" | Torna o produto comparável e vendável |
| 5 | Separar VIP de turma em dois produtos | Compradores, preços e promessas diferentes |
| 6 | Trocar "workshop indoor" por "in company" | Termo que o comprador corporativo reconhece |
| 7 | Tirar landing pages da vitrine principal | Protege a percepção de preço da marca |
| 8 | Incluir seção "não é para você" | Aumenta a qualificação e a taxa de comparecimento |
| 9 | Agendamento direto como CTA primário | Corta a troca de e-mails; aumenta conversão de lead em reunião |
| 10 | Descrever empregadores por setor e escala, sem nomear | Reduz risco contratual mantendo a prova |
| 11 | Ocultar depoimentos até haver 3 reais | Seção fraca de prova social prejudica mais que ausência |
| 12 | Manter a fé implícita, via origem do nome | Humaniza sem estreitar o público B2B |

---

*Documento construído sobre o Dominia Design System & Manual de Identidade v1.0. Todos os tokens de cor, tipografia, espaçamento, elevação e movimento foram extraídos diretamente do manual, sem introdução de novos valores.*
