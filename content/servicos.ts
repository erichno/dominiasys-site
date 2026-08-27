export type Pilar = "formar" | "direcionar" | "construir";

export interface FaixaPreco {
  min: number;
  max: number;
  unidade?: string;
}

export interface Servico {
  slug: string;
  pilar: Pilar;
  nome: string;
  linhaUnica: string;
  promessa: string;
  paraQuem: string;
  formato: string;
  duracao: string;
  entregaveis: string[];
  faixaPreco: FaixaPreco;
  exibirPreco: boolean;
  cta: string;
  destaque?: boolean;
  observacao?: string;
}

const servicos: Servico[] = [
  {
    slug: "diagnostico-de-maturidade-em-ia",
    pilar: "direcionar",
    nome: "Diagnóstico de Maturidade em IA",
    linhaUnica:
      "Onde a IA gera retorno na sua empresa, com número e ordem de execução.",
    promessa:
      "Em 15 dias você sabe exatamente onde a IA gera retorno na sua empresa, quanto custa e por onde começar.",
    paraQuem: "Qualquer empresa do ICP. É o degrau que qualifica tudo.",
    formato: "Preço e escopo fixos",
    duracao: "2 semanas",
    entregaveis: [
      "Relatório de maturidade com nota por dimensão: dados, processos, pessoas, tecnologia e governança",
      "Mapa de 10 a 15 oportunidades priorizadas por impacto e esforço",
      "Estimativa de retorno das 3 principais",
      "Roadmap de 90 dias com responsável e critério de sucesso",
      "Apresentação executiva de 60 min para a diretoria",
    ],
    faixaPreco: { min: 4500, max: 9000 },
    exibirPreco: true,
    cta: "Contratar diagnóstico",
    destaque: true,
    observacao:
      "O valor do diagnóstico é abatido do primeiro projeto de execução contratado em até 60 dias.",
  },
  {
    slug: "imersao-ia-executiva",
    pilar: "formar",
    nome: "Imersão IA Executiva",
    linhaUnica: "Você sai usando IA no seu próprio trabalho, com fluxos prontos.",
    promessa:
      "O executivo sai usando IA no próprio trabalho, com fluxos montados para as tarefas dele.",
    paraQuem:
      "Sócio, diretor ou C-level que não tem tempo para curso e precisa de resultado imediato.",
    formato: "1:1, presencial ou remoto",
    duracao: "3 encontros de 2 h, espaçados em 15 dias",
    entregaveis: [
      "Mapa das tarefas do executivo com potencial de IA",
      "Biblioteca de prompts personalizada",
      "2 fluxos automatizados prontos",
      "Gravação das sessões",
      "30 dias de suporte por WhatsApp",
    ],
    faixaPreco: { min: 6000, max: 12000 },
    exibirPreco: false,
    cta: "Falar sobre a imersão",
  },
  {
    slug: "formacao-ia-para-times",
    pilar: "formar",
    nome: "Formação IA para Times",
    linhaUnica: "O time inteiro passa a usar IA com padrão e segurança.",
    promessa:
      "O time inteiro passa a usar IA com critério, segurança e padrão, não cada um do seu jeito.",
    paraQuem: "Empresas capacitando de 8 a 30 pessoas de uma área ou de áreas mistas.",
    formato: "Turma fechada, 8 a 30 pessoas",
    duracao: "6 encontros de 2 h ao longo de 6 semanas",
    entregaveis: [
      "Trilha de 6 módulos com material próprio",
      "Diagnóstico prévio por questionário",
      "Exercícios com dados reais da empresa",
      "Política interna de uso de IA em minuta",
      "Certificado",
      "Relatório final de maturidade do time para a diretoria",
    ],
    faixaPreco: { min: 15000, max: 40000, unidade: "por turma" },
    exibirPreco: false,
    cta: "Montar turma para meu time",
  },
  {
    slug: "workshop-ia-na-pratica",
    pilar: "formar",
    nome: "Workshop IA na Prática",
    linhaUnica:
      "Em um dia, sua empresa sai com os próprios casos de uso priorizados.",
    promessa: "Em um dia, a empresa sai com casos de uso próprios mapeados e priorizados.",
    paraQuem: "Empresas que querem começar, alinhar diretoria ou destravar resistência interna.",
    formato: "Presencial, até 25 pessoas",
    duracao: "4 h ou 8 h",
    entregaveis: [
      "Dinâmica de mapeamento de casos de uso",
      "Matriz de priorização impacto × esforço preenchida ao vivo",
      "Top 5 oportunidades documentadas",
      "Relatório pós-evento em até 5 dias úteis",
    ],
    faixaPreco: { min: 5000, max: 12000, unidade: "4h a 8h, mais deslocamento fora da região" },
    exibirPreco: false,
    cta: "Agendar workshop",
    observacao:
      "Melhor produto de porta de entrada presencial. Quase sempre gera projeto de execução em seguida.",
  },
  {
    slug: "roadmap-de-implantacao-de-ia",
    pilar: "direcionar",
    nome: "Roadmap de Implantação de IA",
    linhaUnica:
      "Plano executável de 6 a 12 meses, com custo, dono e critério de sucesso.",
    promessa:
      "Um plano executável de 6 a 12 meses, com sequência, custo, responsável e critério de sucesso por iniciativa.",
    paraQuem: "Empresas que já fizeram o diagnóstico ou já sabem onde querem chegar.",
    formato: "Projeto",
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
    faixaPreco: { min: 18000, max: 45000, unidade: "mais retainer mensal opcional" },
    exibirPreco: false,
    cta: "Falar sobre roadmap",
  },
  {
    slug: "mentoria-de-produto-e-mvp",
    pilar: "direcionar",
    nome: "Mentoria de Produto e Validação de MVP",
    linhaUnica: "Descubra se vale construir antes de gastar meses construindo.",
    promessa: "Descobrir se o produto vale ser construído antes de gastar meses construindo.",
    paraQuem: "Fundadores, times de produto e empresas lançando produto digital novo.",
    formato: "Análise ou mentoria contínua",
    duracao: "2 semanas ou 3 meses+",
    entregaveis: [
      "Análise: avaliação de proposta de valor, viabilidade técnica, arquitetura, custo de operação e riscos",
      "Análise: recomendação de escopo mínimo e plano de validação com métricas",
      "Contínua: acompanhamento de roadmap e revisão de decisões técnicas",
      "Contínua: apoio à priorização e acesso por canal direto",
    ],
    faixaPreco: { min: 5000, max: 10000, unidade: "análise; mentoria R$ 2.500 a R$ 5.000/mês" },
    exibirPreco: false,
    cta: "Avaliar meu produto",
  },
  {
    slug: "assistentes-e-agentes-de-ia",
    pilar: "construir",
    nome: "Assistentes e Agentes de IA",
    linhaUnica:
      "Atende, responde e executa no tom da sua empresa, integrado ao WhatsApp.",
    promessa:
      "Um assistente que atende, responde e executa no tom da sua empresa, integrado ao WhatsApp e aos seus sistemas, 24 h por dia.",
    paraQuem:
      "Empresas com volume alto de atendimento repetitivo, qualificação de lead ou consulta interna a documentos.",
    formato: "Projeto",
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
    faixaPreco: { min: 15000, max: 60000, unidade: "setup, mais mensalidade de operação e infraestrutura" },
    exibirPreco: false,
    cta: "Quero um assistente",
  },
  {
    slug: "sistemas-sob-medida",
    pilar: "construir",
    nome: "Sistemas Sob Medida",
    linhaUnica: "O sistema que sua operação precisa e que nenhum SaaS resolve.",
    promessa:
      "O sistema que sua operação precisa e que nenhum SaaS de prateleira resolve, com IA embarcada onde faz diferença.",
    paraQuem:
      "Empresas com processo próprio rodando em planilha, ERP incompleto ou integração manual entre ferramentas.",
    formato: "Projeto por fases",
    duracao: "A partir de 6 semanas",
    entregaveis: [
      "Levantamento e desenho de solução",
      "Sistema web responsivo",
      "Integrações com ferramentas existentes",
      "Painéis e relatórios",
      "Documentação",
      "Treinamento",
      "Suporte e evolução contratados à parte",
    ],
    faixaPreco: { min: 30000, max: 30000, unidade: "a partir de, por escopo" },
    exibirPreco: false,
    cta: "Descrever meu problema",
  },
  {
    slug: "landing-pages-de-alta-conversao",
    pilar: "construir",
    nome: "Landing Pages de Alta Conversão",
    linhaUnica: "Página rápida, encontrável e feita para virar conversa.",
    promessa: "Uma página que carrega rápido, é encontrada no Google e transforma visita em conversa.",
    paraQuem: "Profissionais e empresas lançando serviço, produto ou campanha paga.",
    formato: "Projeto",
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
    faixaPreco: { min: 4000, max: 15000 },
    exibirPreco: false,
    cta: "Solicitar proposta",
    observacao:
      "Não fica na vitrine principal da home. Aparece no fim da grade de serviços e em página própria.",
  },
];

export default servicos;
