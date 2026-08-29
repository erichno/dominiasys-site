export interface Depoimento {
  nome: string;
  cargo: string;
  empresa: string;
  texto: string;
}

export interface ProjetoProprio {
  slug: string;
  nome: string;
  contexto: string;
  desafio: string;
  solucao: string;
  resultado: string;
  link?: string;
}

/**
 * A seção de Prova social só renderiza com 3 ou mais itens aqui (spec-landing.md,
 * Seção 8: "se você não tiver 3 depoimentos até o lançamento, oculte esta seção
 * inteira"). Enquanto vazio, a seção usa `projetosProprios` no lugar.
 */
export const depoimentos: Depoimento[] = [];

export const projetosProprios: ProjetoProprio[] = [
  {
    slug: "easyflowbr",
    nome: "EasyFlowBR",
    contexto:
      "Fotógrafos e estúdios de fotografia geriam clientes, contratos e pesquisas de mercado em ferramentas soltas, sem visão unificada do negócio.",
    desafio:
      "Reunir agendamento, pagamento, pesquisa comportamental e atendimento em um único sistema, com isolamento de dados entre estúdios diferentes.",
    solucao:
      "SaaS multi-tenant com agendamento, pagamentos, pesquisas comportamentais, benchmark de mercado e chat com IA (Gemini e GPT-5), controle de acesso por plano e trilha de auditoria por tenant.",
    resultado:
      "Plataforma em produção, pronta para múltiplos estúdios operarem de forma isolada e segura.",
    link: "https://easyflowbr.com.br",
  },
  {
    slug: "nidsuite",
    nome: "Nidsuite",
    contexto:
      "Equipes criativas com milhares de fotos e vídeos espalhados entre várias unidades de armazenamento.",
    desafio:
      "Busca lenta, sem rastreabilidade e sem governança sobre quem aprova cada peça.",
    solucao:
      "Indexação e busca avançada por cliente, ano e localização, com hub de marketing (calendário editorial, aprovações, prompts de IA controlados pelo admin) e trilha de auditoria completa.",
    resultado: "Arquivo disperso vira sistema único, pesquisável e governado.",
    link: "https://nidsuite.lovable.app",
  },
  {
    slug: "rodahub",
    nome: "RodaHub",
    contexto:
      "Organizadores de eventos de networking dependendo de planilhas e grupos de WhatsApp para inscrição, pagamento e logística.",
    desafio:
      "Sem controle de pagamento centralizado, sem forma estruturada de conectar participantes entre si, sorteios feitos manualmente.",
    solucao:
      "Plataforma de organização de eventos de networking: formulário de inscrição, controle de pagamento, troca de contatos entre participantes, sorteios em tempo real, apoio logístico durante todo o evento e um canal de marketing para patrocinadores.",
    resultado: "Evento roda do início ao fim em uma única plataforma, do organizador ao patrocinador.",
    link: "https://rodahub.com.br",
  },
  {
    slug: "mentoria-de-carreira",
    nome: "Mentoria de Carreira e Alta Performance",
    contexto:
      "Profissionais em transição ou pico de carreira buscando direção sobre os próximos passos.",
    desafio:
      "Decisões de carreira tomadas sem método e sem revisão externa qualificada.",
    solucao:
      "Mentoria individual de carreira e alta performance, conduzida por Erich Noronha.",
    resultado: "Mais de 100 pessoas mentoradas.",
  },
];
