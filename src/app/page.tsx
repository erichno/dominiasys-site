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

export default function Home() {
  return (
    <>
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
    </>
  );
}
