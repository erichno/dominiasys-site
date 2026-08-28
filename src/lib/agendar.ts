import empresa from "@/content/empresa";

export function agendarHref() {
  const calLink = process.env.NEXT_PUBLIC_CAL_LINK;
  if (calLink) return `https://cal.com/${calLink}`;
  return whatsappHref();
}

export function whatsappHref(mensagem?: string) {
  const numero = empresa.whatsapp.e164.replace("+", "");
  if (!mensagem) return `https://wa.me/${numero}`;
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
}
