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
    formacao: z.array(z.string()).min(1),
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
    nome: "Erich Cavichi",
    cargo: "Consultor em Inteligência Artificial",
    formacao: ["IA Generativa — MIT Professional Education", "MBA — FGV"],
  },
});

export default empresa;
