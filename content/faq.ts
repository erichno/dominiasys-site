export interface Faq {
  pergunta: string;
  resposta: string;
}

export const faqTitulo = "Perguntas que sempre aparecem";

const faq: Faq[] = [
  {
    pergunta: "Minha empresa é pequena. Faz sentido?",
    resposta:
      "Faz, se existir volume. Uma equipe de 10 pessoas com 200 atendimentos por dia tem mais a ganhar que uma de 100 com fluxo irregular. Na conversa de 30 min dá para saber.",
  },
  {
    pergunta: "Meus dados ficam seguros?",
    resposta:
      "Definir o que pode e o que não pode entrar em modelo de IA é parte do escopo, não item opcional. Trabalho com modelos que não usam seus dados para treinamento e, quando o dado exige, com infraestrutura própria. A política de uso é entregue por escrito.",
  },
  {
    pergunta: "Quanto tempo até ver resultado?",
    resposta:
      "O diagnóstico entrega direção em 2 semanas. Um assistente entra em operação entre 4 e 10 semanas. Sistema sob medida tem primeira entrega útil em 6 a 10 semanas. Prazos menores que isso costumam ser promessa, não plano.",
  },
  {
    pergunta: "Vocês substituem meu time de TI?",
    resposta:
      "Não. Trabalho junto com quem já está lá, e a documentação e o treinamento fazem parte da entrega. O objetivo é a empresa tocar sozinha depois.",
  },
  {
    pergunta: "Atende presencialmente?",
    resposta:
      "Workshops são presenciais. Base em São José dos Campos, atendimento presencial no Vale do Paraíba e na Grande São Paulo, e remoto para o resto do Brasil.",
  },
  {
    pergunta: "Como é a cobrança?",
    resposta:
      "Diagnóstico e workshop têm preço fixo. Projetos de construção são por escopo, com pagamento em marcos de entrega. Mentoria e sustentação são mensais. Tudo em contrato, sem cobrança por hora não prevista.",
  },
  {
    pergunta: "Já uso ChatGPT. Preciso de consultoria?",
    resposta:
      "Usar ChatGPT é diferente de operar IA na empresa. A diferença aparece em padrão, segurança de dado, integração com sistema e medição de retorno. Se essas quatro coisas já estão resolvidas aí, você não precisa de mim.",
  },
  {
    pergunta: "Trabalha com que tecnologias?",
    resposta:
      "Modelos das principais famílias disponíveis, escolhidos por custo e adequação ao caso, não por preferência. Desenvolvimento em React, Node.js e Supabase, com infraestrutura em nuvem ou dedicada conforme a exigência do dado.",
  },
];

export default faq;
