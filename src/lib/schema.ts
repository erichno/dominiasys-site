import empresa from "@/content/empresa";
import servicos from "@/content/servicos";
import faq from "@/content/faq";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${empresa.dominio}`;

/** Sem @context — usado embutido em founder/worksFor, nunca como script isolado. */
function pessoaSchemaObjeto() {
  return {
    "@type": "Person",
    name: empresa.fundador.nome,
    jobTitle: empresa.fundador.cargo,
    alumniOf: empresa.fundador.alumniOf,
    worksFor: { "@type": "Organization", name: empresa.nomeFantasia },
  };
}

export function gerarPersonSchema() {
  return {
    "@context": "https://schema.org",
    ...pessoaSchemaObjeto(),
  };
}

export function gerarProfessionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: empresa.razaoSocial,
    description:
      "Consultoria em inteligência artificial aplicada: treinamento, diagnóstico, roadmap de implantação e desenvolvimento de sistemas.",
    url: SITE_URL,
    email: empresa.email,
    telephone: empresa.whatsapp.e164,
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: empresa.endereco.logradouro,
      addressLocality: empresa.endereco.cidade,
      addressRegion: empresa.endereco.uf,
      addressCountry: "BR",
    },
    areaServed: [
      { "@type": "City", name: empresa.endereco.cidade },
      { "@type": "Country", name: empresa.endereco.pais },
    ],
    founder: pessoaSchemaObjeto(),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Serviços ${empresa.nomeFantasia}`,
      itemListElement: servicos.map((servico) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: servico.nome,
          description: servico.promessa,
        },
      })),
    },
  };
}

export function gerarFAQPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.pergunta,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.resposta,
      },
    })),
  };
}
