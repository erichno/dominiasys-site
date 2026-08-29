export type Pilar = "formar" | "direcionar" | "construir";

export interface Servico {
  id: string;
  slug: string;
  pilar: Pilar;
  nome: string;
  umaLinha: string;
  promessa: string;
  paraQuem: string;
  formato: string;
  duracao: string;
  entregaveis: string[];
  /** Texto literal da "Faixa a validar" da spec, ex.: "R$ 4.500 a R$ 9.000". */
  faixaPreco?: string;
  cta: string;
  /** true só no Diagnóstico de Maturidade em IA (oferta de entrada). */
  destaque: boolean;
}

const servicos: Servico[] = [
  {
    id: "1.1",
    slug: "imersao-ia-executiva",
    pilar: "formar",
    nome: "Imersão IA Executiva (VIP)",
    umaLinha: "Você sai usando IA no seu próprio trabalho, com fluxos prontos.",
    promessa:
      "O executivo sai usando IA no próprio trabalho, com fluxos montados para as tarefas dele.",
    paraQuem:
      "Sócio, diretor ou C-level que não tem tempo para curso e precisa de resultado imediato.",
    formato: "1:1, presencial ou remoto.",
    duracao: "3 encontros de 2 h, espaçados em 15 dias",
    entregaveis: [
      "Mapa das tarefas do executivo com potencial de IA",
      "Biblioteca de prompts personalizada",
      "2 fluxos automatizados prontos",
      "Gravação das sessões",
      "30 dias de suporte por WhatsApp",
    ],
    faixaPreco: "R$ 6.000 a R$ 12.000",
    cta: "Falar sobre a imersão",
    destaque: false,
  },
  {
    id: "1.2",
    slug: "formacao-ia-para-times",
    pilar: "formar",
    nome: "Formação IA para Times",
    umaLinha: "O time inteiro passa a usar IA com padrão e segurança.",
    promessa:
      "O time inteiro passa a usar IA com critério, segurança e padrão, não cada um do seu jeito.",
    paraQuem:
      "Empresas capacitando de 8 a 30 pessoas de uma área ou de áreas mistas.",
    formato:
      "Turma fechada, remoto ou presencial. Conteúdo adaptado às dores mapeadas em briefing prévio.",
    duracao: "6 encontros de 2 h ao longo de 6 semanas",
    entregaveis: [
      "Trilha de 6 módulos com material próprio",
      "Diagnóstico prévio por questionário",
      "Exercícios com dados reais da empresa",
      "Política interna de uso de IA em minuta",
      "Certificado",
      "Relatório final de maturidade do time para a diretoria",
    ],
    faixaPreco: "R$ 15.000 a R$ 40.000 por turma",
    cta: "Montar turma para meu time",
    destaque: false,
  },
  {
    id: "1.3",
    slug: "workshop-ia-na-pratica",
    pilar: "formar",
    nome: "Workshop IA na Prática (in company)",
    umaLinha: "Em um dia, sua empresa sai com os próprios casos de uso priorizados.",
    promessa:
      "Em um dia, a empresa sai com casos de uso próprios mapeados e priorizados.",
    paraQuem:
      "Empresas que querem começar, alinhar diretoria ou destravar resistência interna.",
    formato: "Presencial, até 25 participantes.",
    duracao: "4 h ou 8 h",
    entregaveis: [
      "Dinâmica de mapeamento de casos de uso",
      "Matriz de priorização impacto × esforço preenchida ao vivo",
      "Top 5 oportunidades documentadas",
      "Relatório pós-evento em até 5 dias úteis",
    ],
    faixaPreco: "R$ 5.000 (4 h) a R$ 12.000 (8 h), mais deslocamento fora da região",
    cta: "Agendar workshop",
    destaque: false,
  },
  {
    id: "2.1",
    slug: "diagnostico-de-maturidade-em-ia",
    pilar: "direcionar",
    nome: "Diagnóstico de Maturidade em IA",
    umaLinha: "Onde a IA gera retorno na sua empresa, com número e ordem de execução.",
    promessa:
      "Em 15 dias você sabe exatamente onde a IA gera retorno na sua empresa, quanto custa e por onde começar.",
    paraQuem: "Qualquer empresa do ICP. É o degrau que qualifica tudo.",
    formato: "Preço fixo, escopo fixo, prazo fixo.",
    duracao: "2 semanas",
    entregaveis: [
      "Relatório de maturidade com nota por dimensão: dados, processos, pessoas, tecnologia e governança",
      "Mapa de 10 a 15 oportunidades priorizadas por impacto e esforço",
      "Estimativa de retorno das 3 principais",
      "Roadmap de 90 dias",
      "Apresentação executiva",
    ],
    faixaPreco: "R$ 4.500 a R$ 9.000",
    cta: "Contratar diagnóstico",
    destaque: true,
  },
  {
    id: "2.2",
    slug: "roadmap-de-implantacao-de-ia",
    pilar: "direcionar",
    nome: "Roadmap de Implantação de IA",
    umaLinha: "Plano executável de 6 a 12 meses, com custo, dono e critério de sucesso.",
    promessa:
      "Um plano executável de 6 a 12 meses, com sequência, custo, responsável e critério de sucesso por iniciativa.",
    paraQuem: "Empresas que já fizeram o diagnóstico ou já sabem onde querem chegar.",
    formato: "Trabalho conjunto.",
    duracao: "3 a 5 semanas",
    entregaveis: [
      "Arquitetura-alvo",
      "Escolha de ferramentas e modelos com justificativa de custo",
      "Plano de rollout por fase",
      "Política de governança e uso de dados",
      "Plano de capacitação",
      "Modelo de acompanhamento com indicadores",
      "Opção de acompanhamento mensal",
    ],
    faixaPreco: "R$ 18.000 a R$ 45.000, mais retainer mensal opcional",
    cta: "Falar sobre roadmap",
    destaque: false,
  },
  {
    id: "2.3",
    slug: "mentoria-de-produto-e-validacao-de-mvp",
    pilar: "direcionar",
    nome: "Mentoria de Produto e Validação de MVP",
    umaLinha: "Descubra se vale construir antes de gastar meses construindo.",
    promessa:
      "Descobrir se o produto vale ser construído antes de gastar meses construindo.",
    paraQuem: "Fundadores, times de produto e empresas lançando produto digital novo.",
    formato:
      "Duas modalidades: análise pontual (auditoria com relatório) ou mentoria contínua (encontros quinzenais de 1 h).",
    duracao: "Análise: 2 semanas. Mentoria contínua: mínimo 3 meses",
    entregaveis: [
      "Análise: avaliação de proposta de valor, viabilidade técnica, arquitetura, custo de operação e riscos",
      "Análise: recomendação de escopo mínimo e plano de validação com métricas",
      "Mentoria contínua: acompanhamento de roadmap e revisão de decisões técnicas",
      "Mentoria contínua: apoio à priorização e acesso por canal direto",
    ],
    faixaPreco: "Análise: R$ 5.000 a R$ 10.000. Mentoria: R$ 2.500 a R$ 5.000/mês",
    cta: "Avaliar meu produto",
    destaque: false,
  },
  {
    id: "3.1",
    slug: "assistentes-e-agentes-de-ia",
    pilar: "construir",
    nome: "Assistentes e Agentes de IA",
    umaLinha: "Atende, responde e executa no tom da sua empresa, integrado ao WhatsApp.",
    promessa:
      "Um assistente que atende, responde e executa no tom da sua empresa, integrado ao WhatsApp e aos seus sistemas, 24 h por dia.",
    paraQuem:
      "Empresas com volume alto de atendimento repetitivo, qualificação de lead ou consulta interna a documentos.",
    formato: "Projeto.",
    duracao: "4 a 10 semanas",
    entregaveis: [
      "Definição de persona e tom de voz",
      "Base de conhecimento estruturada (RAG) sobre documentos da empresa",
      "Integração com WhatsApp e com o sistema atual",
      "Regras de escalonamento para humano",
      "Painel de conversas e métricas",
      "Treinamento da equipe",
      "60 dias de ajuste fino",
    ],
    faixaPreco: "R$ 15.000 a R$ 60.000 de setup, mais mensalidade de operação e infraestrutura",
    cta: "Quero um assistente",
    destaque: false,
  },
  {
    id: "3.2",
    slug: "sistemas-sob-medida",
    pilar: "construir",
    nome: "Sistemas Sob Medida",
    umaLinha: "O sistema que sua operação precisa e que nenhum SaaS resolve.",
    promessa:
      "O sistema que sua operação precisa e que nenhum SaaS de prateleira resolve, com IA embarcada onde faz diferença.",
    paraQuem:
      "Empresas com processo próprio rodando em planilha, ERP incompleto ou integração manual entre ferramentas.",
    formato: "Projeto por fases, com entregas quinzenais.",
    duracao: "Início por escopo mínimo em 6 a 10 semanas",
    entregaveis: [
      "Levantamento e desenho de solução",
      "Sistema web responsivo",
      "Integrações com ferramentas existentes",
      "Painéis e relatórios",
      "Documentação",
      "Treinamento",
      "Suporte e evolução contratados à parte",
    ],
    faixaPreco: "A partir de R$ 30.000, por escopo",
    cta: "Descrever meu problema",
    destaque: false,
  },
  {
    id: "3.3",
    slug: "landing-pages-de-alta-conversao",
    pilar: "construir",
    nome: "Landing Pages de Alta Conversão",
    umaLinha: "Página rápida, encontrável e feita para virar conversa.",
    promessa:
      "Uma página que carrega rápido, é encontrada no Google e transforma visita em conversa.",
    paraQuem: "Profissionais e empresas lançando serviço, produto ou campanha paga.",
    formato: "Projeto.",
    duracao: "2 a 3 semanas",
    entregaveis: [
      "Estratégia de mensagem e estrutura",
      "Copy completa",
      "Design conforme a marca do cliente",
      "Desenvolvimento em Next.js",
      "SEO técnico",
      "Analytics e rastreamento de conversão",
      "Integração com WhatsApp e CRM",
      "Hospedagem configurada",
      "30 dias de ajuste",
    ],
    faixaPreco: "R$ 4.000 a R$ 15.000",
    cta: "Solicitar proposta",
    destaque: false,
  },
];

/**
 * Fonte única da regra "preço só aparece no serviço de destaque": qualquer
 * componente que precise mostrar preço lê daqui, em vez de decidir sozinho
 * se exibe `faixaPreco` ou não.
 */
export function precoExibido(servico: Servico): string {
  return servico.destaque && servico.faixaPreco
    ? servico.faixaPreco
    : "sob escopo";
}

export default servicos;
