export interface EtapaMetodo {
  numero: string;
  nome: string;
  texto: string;
}

export const metodoEyebrow = "MÉTODO";
export const metodoTitulo = "Quatro etapas, sem etapa invisível";
export const metodoSubtitulo =
  "Você sabe o que acontece em cada semana e o que recebe no fim de cada uma.";

const metodo: EtapaMetodo[] = [
  {
    numero: "01",
    nome: "Escutar",
    texto:
      "Conversa de 30 min para entender o contexto, o que já foi tentado e o que está travando. Sem apresentação comercial. Se não for o meu problema, eu digo e indico quem resolve.",
  },
  {
    numero: "02",
    nome: "Mapear",
    texto:
      "Entrevistas com quem executa, análise de processo e dado, e priorização por impacto e esforço. O resultado é uma lista ordenada, não um relatório de tendências.",
  },
  {
    numero: "03",
    nome: "Construir",
    texto:
      "Entregas quinzenais, ambiente de homologação e o time da empresa acompanhando desde o começo. Nada é revelado só no final.",
  },
  {
    numero: "04",
    nome: "Sustentar",
    texto:
      "Time treinado para operar, documentação entregue e acompanhamento por indicador. O projeto termina quando a empresa consegue tocar sozinha.",
  },
];

export default metodo;
