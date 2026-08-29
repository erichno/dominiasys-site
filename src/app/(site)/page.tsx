import type { Metadata } from "next";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { CinematicIntro } from "@/components/sections/CinematicIntro";
import { Hero } from "@/components/sections/Hero";
import { Dores } from "@/components/sections/Dores";
import { Pilares } from "@/components/sections/Pilares";
import { Servicos } from "@/components/sections/Servicos";
import { Metodo } from "@/components/sections/Metodo";
import { BlocoDiagnostico } from "@/components/sections/BlocoDiagnostico";
import { Trajetoria } from "@/components/sections/Trajetoria";
import { Prova } from "@/components/sections/Prova";
import { ParaQuem } from "@/components/sections/ParaQuem";
import { FAQ } from "@/components/sections/FAQ";
import { CTAFinal } from "@/components/sections/CTAFinal";
import {
  gerarFAQPageSchema,
  gerarPersonSchema,
  gerarProfessionalServiceSchema,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: {
    absolute: "DOMINIA – Consultoria em Inteligência Artificial para Empresas",
  },
  description:
    "Treinamento, diagnóstico e desenvolvimento de IA aplicada. Do mapeamento de oportunidades ao sistema em produção. Consultoria em São José dos Campos e remoto para todo o Brasil.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "DOMINIA – Inteligência que transforma. Resultados que dominam.",
    description:
      "Sua empresa testou IA. Agora precisa de resultado. Consultoria que forma o time, define onde aplicar e constrói o sistema.",
    images: ["/og-image.png"],
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gerarProfessionalServiceSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gerarPersonSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gerarFAQPageSchema()) }}
      />

      <CinematicIntro />
      <Hero />
      <Dores />
      <Pilares />
      <Servicos />
      <Metodo />
      <BlocoDiagnostico />
      <Trajetoria />
      <Prova />
      <ParaQuem />
      <FAQ />
      <CTAFinal />
      <WhatsAppFloat />
    </>
  );
}
