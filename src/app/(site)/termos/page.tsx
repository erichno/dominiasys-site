import type { Metadata } from "next";
import Link from "next/link";
import empresa from "@/content/empresa";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Condições de uso do site da DOMINIA Consultoria em Tecnologia da Informação.",
};

function Secao({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-surface-600 py-10">
      <h2 className="font-display text-h3-mobile font-medium text-branco-frio sm:text-h3">
        {titulo}
      </h2>
      <div className="mt-4 max-w-leitura space-y-4 text-corpo-mobile text-cinza-prata sm:text-corpo">
        {children}
      </div>
    </section>
  );
}

export default function TermosPage() {
  return (
    <article className="bg-surface-800 px-6 py-secao-mobile sm:py-secao-desktop">
      <div className="mx-auto max-w-[760px]">
        <p className="font-display text-eyebrow uppercase tracking-[.24em] text-azul-celeste">
          Termos
        </p>
        <h1 className="mt-4 font-display text-h1-mobile font-semibold text-branco-frio sm:text-h1">
          Termos de Uso
        </h1>
        <p className="mt-4 text-sm text-cinza-prata">Última atualização: 28 de agosto de 2026.</p>

        <Secao titulo="Sobre este site">
          <p>
            Este site é operado por {empresa.razaoSocial}, CNPJ {empresa.cnpj}, e existe para
            apresentar os serviços de consultoria em inteligência artificial da DOMINIA e para
            receber pedidos de contato e respostas de pesquisa. Ao usar o site, você concorda com
            estes termos.
          </p>
        </Secao>

        <Secao titulo="Natureza do conteúdo">
          <p>
            Os textos, formatos, prazos e faixas de preço descritos no site são referências para
            orientar a conversa inicial, não uma proposta comercial vinculante. O escopo, o prazo
            e o valor definitivos de qualquer serviço só existem depois de uma conversa e são
            formalizados em proposta ou contrato específico.
          </p>
        </Secao>

        <Secao titulo="Propriedade intelectual">
          <p>
            Marca, logotipo, textos, código e demais elementos deste site pertencem à DOMINIA ou
            são usados sob licença. Reprodução total ou parcial para fins comerciais sem
            autorização prévia não é permitida.
          </p>
        </Secao>

        <Secao titulo="Uso aceitável">
          <p>
            Os formulários deste site (contato, diagnóstico, pesquisa de expectativa) existem para
            uso legítimo de pessoas interessadas nos serviços da DOMINIA ou convidadas a
            responder a uma pesquisa. Não é permitido usá-los para envio de spam, tentativa de
            ataque ao sistema, coleta de dados de terceiros ou qualquer uso que viole a lei.
          </p>
        </Secao>

        <Secao titulo="Serviços de terceiros">
          <p>
            Agendamento de conversa, envio de e-mail, atendimento por WhatsApp e proteção contra
            abuso nos formulários são operados por prestadores externos (Cal.com, Resend, WhatsApp
            e Cloudflare, entre outros). Cada um desses serviços tem seus próprios termos e
            política de privacidade, que se aplicam à parte da interação que acontece dentro
            deles. Detalhes de quais dados cada um recebe estão na{" "}
            <Link href="/politica-de-privacidade" className="text-azul-celeste hover:underline">
              Política de Privacidade
            </Link>
            .
          </p>
        </Secao>

        <Secao titulo="Limitação de responsabilidade">
          <p>
            Fazemos o possível para manter o site correto e no ar, mas não garantimos
            disponibilidade ininterrupta nem ausência total de erro. Decisões de negócio tomadas
            só com base no conteúdo deste site, sem uma conversa direta com a DOMINIA, são de
            responsabilidade de quem as toma.
          </p>
        </Secao>

        <Secao titulo="Alterações destes termos">
          <p>
            Estes termos podem ser atualizados a qualquer momento. A data no topo desta página
            sempre mostra a versão vigente.
          </p>
        </Secao>

        <Secao titulo="Foro e legislação aplicável">
          <p>
            Estes termos são regidos pela legislação brasileira. Fica eleito o foro da comarca de{" "}
            {empresa.endereco.cidade}/{empresa.endereco.uf} para resolver qualquer disputa
            relacionada a este site, com renúncia a qualquer outro, por mais privilegiado que
            seja.
          </p>
        </Secao>

        <Secao titulo="Contato">
          <p>
            Dúvidas sobre estes termos podem ser enviadas para{" "}
            <a href={`mailto:${empresa.email}`} className="text-azul-celeste hover:underline">
              {empresa.email}
            </a>
            .
          </p>
        </Secao>
      </div>
    </article>
  );
}
