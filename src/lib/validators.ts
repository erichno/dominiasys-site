import { z } from "zod";

/**
 * Domínios de e-mail pessoal/gratuito — dispara o aviso suave do campo de
 * e-mail (spec: "validar domínio não gratuito, aviso suave se for gmail").
 * Não bloqueia o envio, só avisa.
 */
export const DOMINIOS_EMAIL_GRATUITO = [
  "gmail.com",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "yahoo.com",
  "yahoo.com.br",
  "icloud.com",
  "me.com",
  "bol.com.br",
  "uol.com.br",
  "terra.com.br",
  "ig.com.br",
  "globo.com",
  "zipmail.com.br",
  "protonmail.com",
  "aol.com",
];

export function ehDominioGratuito(email: string): boolean {
  const dominio = email.split("@")[1]?.toLowerCase().trim();
  return dominio ? DOMINIOS_EMAIL_GRATUITO.includes(dominio) : false;
}

export const PORTES_EMPRESA = ["ate-20", "21-100", "101-500", "500-mais"] as const;

export const leadSchema = z.object({
  nome: z.string().trim().min(1, "Informe seu nome."),
  email: z.string().trim().min(1, "Informe seu e-mail.").email("E-mail inválido."),
  whatsapp: z
    .string()
    .trim()
    .refine(
      (valor) => valor.replace(/\D/g, "").length >= 10,
      "WhatsApp incompleto — informe DDD e número.",
    ),
  empresa: z.string().trim().min(1, "Informe o nome da empresa."),
  desafio: z.string().trim().min(1, "Conte qual é o principal desafio."),
  porte: z.enum(PORTES_EMPRESA).optional(),
  consentimento: z
    .boolean()
    .refine((valor) => valor === true, "É preciso concordar para enviar."),
});

export type LeadInput = z.infer<typeof leadSchema>;

/** Corpo aceito por POST /api/lead: os campos do formulário + segurança/rastreio. */
export const leadRequestSchema = leadSchema.extend({
  turnstileToken: z.string().min(1, "Verificação de segurança ausente."),
  utm: z.record(z.string(), z.string()).optional(),
});

export type LeadRequest = z.infer<typeof leadRequestSchema>;
