import { z } from "zod";

const empresaSchema = z.object({
  razaoSocial: z.string().min(1),
  nomeFantasia: z.string().min(1),
  cnpj: z.string().min(1),
  endereco: z.object({
    logradouro: z.string().min(1),
    cidade: z.string().min(1),
    uf: z.string().length(2),
    pais: z.string().min(1),
  }),
  email: z.string().email(),
  whatsapp: z.object({
    e164: z.string().min(1),
    display: z.string().min(1),
  }),
  dominio: z.string().min(1),
  slogan: z.string().min(1),
  fundador: z.object({
    nome: z.string().min(1),
    cargo: z.string().min(1),
    /** Nomes de instituição para o campo alumniOf do JSON-LD Person. */
    alumniOf: z.array(z.string()).min(1),
  }),
  /**
   * Cada rede é opcional — o rodapé só mostra o ícone das que estiverem
   * preenchidas aqui (regra: "ícone que leva a perfil parado prejudica").
   */
  redes: z.object({
    linkedin: z.string().url().optional(),
    instagram: z.string().url().optional(),
    youtube: z.string().url().optional(),
  }),
});

export type Empresa = z.infer<typeof empresaSchema>;

const empresa: Empresa = empresaSchema.parse({
  razaoSocial: "DOMINIA Consultoria em Tecnologia da Informação LTDA",
  nomeFantasia: "DOMINIA",
  cnpj: "66.780.518/0001-01",
  endereco: {
    logradouro: "Rua Benedito Oswaldo Lecques, 51, Sala 104",
    cidade: "São José dos Campos",
    uf: "SP",
    pais: "Brasil",
  },
  email: "contato@dominiasys.com.br",
  whatsapp: {
    e164: "+5512991143399",
    display: "(12) 99114-3399",
  },
  dominio: "dominiasys.com.br",
  slogan: "Inteligência que transforma. Resultados que dominam.",
  fundador: {
    nome: "Erich Noronha",
    cargo: "Consultor em Inteligência Artificial",
    alumniOf: ["MIT Professional Education", "Fundação Getulio Vargas"],
  },
  // Preencha quando as redes existirem — nenhum ícone aparece no rodapé
  // enquanto os campos abaixo estiverem vazios.
  redes: {},
});

export default empresa;
