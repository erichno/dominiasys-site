import "server-only";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

interface DadosConfirmacaoLead {
  nome: string;
  email: string;
}

/**
 * E-mail de confirmação do formulário de diagnóstico (spec: "em até 1 min,
 * com o que esperar e prazo"). Se Resend não estiver configurado, só avisa
 * no log — nunca deve derrubar a gravação do lead.
 */
export async function enviarEmailConfirmacaoLead({ nome, email }: DadosConfirmacaoLead) {
  if (!resend) {
    console.warn("RESEND_API_KEY não configurada — e-mail de confirmação não enviado.");
    return;
  }

  const remetente = process.env.EMAIL_FROM;
  if (!remetente) {
    console.warn("EMAIL_FROM não configurado — e-mail de confirmação não enviado.");
    return;
  }

  await resend.emails.send({
    from: remetente,
    to: email,
    subject: "Recebido — DOMINIA",
    text: [
      `Olá, ${nome}!`,
      "",
      "Recebi seu pedido do Diagnóstico de Maturidade em IA.",
      "Vou ler com atenção e responder em até 1 dia útil, direto deste e-mail.",
      "",
      "Enquanto isso, se quiser adiantar o contexto, me chame no WhatsApp.",
      "",
      "— Erich, DOMINIA",
    ].join("\n"),
  });
}
