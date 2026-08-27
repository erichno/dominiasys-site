export interface Dor {
  titulo: string;
  texto: string;
}

export const doresEyebrow = "O DIAGNÓSTICO MAIS COMUM";
export const doresTitulo = "Provavelmente uma dessas frases já foi dita na sua empresa";
export const doresFecho =
  "As quatro têm a mesma causa: alguém tratou IA como ferramenta, quando o problema é de processo, dado e decisão. É aí que eu entro.";

const dores: Dor[] = [
  {
    titulo: "O time usa ChatGPT, mas cada um do seu jeito",
    texto:
      "Sem padrão, sem política de dados e sem ninguém medindo se melhorou alguma coisa. O risco cresce junto com o uso.",
  },
  {
    titulo: "Fizemos um piloto e parou por aí",
    texto:
      "O piloto funcionou na demonstração e nunca chegou à operação. Faltou plano de rollout, dono e integração com o que já existe.",
  },
  {
    titulo: "Não sabemos por onde começar",
    texto:
      "Existem 40 processos candidatos e nenhum critério para escolher. Sem priorização, a empresa começa pelo mais visível, não pelo mais rentável.",
  },
  {
    titulo: "Contratamos uma agência e recebemos um PDF",
    texto:
      "Slide bonito, recomendação genérica, zero linha de código. O plano não sobreviveu ao primeiro obstáculo técnico.",
  },
];

export default dores;
