import type { Metadata } from "next";
import { Poppins, Raleway } from "next/font/google";
import empresa from "@/content/empresa";
import "./globals.css";
import "@/styles/motion.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${empresa.dominio}`;

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "DOMINIA — Consultoria em Tecnologia da Informação",
    template: "%s — DOMINIA",
  },
  description: `Consultoria em IA aplicada, em ${empresa.endereco.cidade}/${empresa.endereco.uf}.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.variable} ${raleway.variable} font-body antialiased`}>
        {children}
      </body>
    </html>
  );
}
