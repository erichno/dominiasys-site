import type { Pilar } from "@/content/servicos";

export interface PilarInfo {
  chave: Pilar;
  numero: string;
  nome: string;
  umaLinha: string;
  descricao: string;
  /** ids de content/servicos.ts vinculados a este pilar, na ordem da spec. */
  servicosIds: string[];
}

export const pilaresEyebrow = "COMO TRABALHO";
export const pilaresTitulo = "Entender, decidir, executar";
export const pilaresSubtitulo =
  "A maioria dos fornecedores cobre uma etapa. Treinador não implanta. Consultor não codifica. Fábrica de software não questiona a decisão. A DOMINIA cobre as três, e é isso que faz o plano chegar à produção.";

const pilares: PilarInfo[] = [
  {
    chave: "formar",
    numero: "01",
    nome: "FORMAR",
    umaLinha: "Pessoas usando IA com critério.",
    descricao:
      "Antes de automatizar qualquer coisa, o time precisa entender o que a ferramenta faz, onde ela erra e o que não pode entrar nela. Capacitação aplicada ao trabalho real, não a exemplos genéricos.",
    servicosIds: ["1.1", "1.2", "1.3"],
  },
  {
    chave: "direcionar",
    numero: "02",
    nome: "DIRECIONAR",
    umaLinha: "A empresa sabendo onde aplicar.",
    descricao:
      "Mapeamento de oportunidades, priorização por impacto e esforço, estimativa de retorno e um roadmap com dono, prazo e critério de sucesso. Decisão baseada em dado, não em tendência.",
    servicosIds: ["2.1", "2.2", "2.3"],
  },
  {
    chave: "construir",
    numero: "03",
    nome: "CONSTRUIR",
    umaLinha: "Sistema rodando em produção.",
    descricao:
      "Assistentes, agentes e sistemas sob medida, integrados ao que a empresa já usa, com painel de acompanhamento e time treinado para operar.",
    servicosIds: ["3.1", "3.2", "3.3"],
  },
];

export default pilares;
