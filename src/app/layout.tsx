import type { Metadata } from "next";
import { Poppins, Raleway } from "next/font/google";
import "./globals.css";

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
  title: "DOMINIA — Consultoria em Tecnologia da Informação",
  description:
    "Consultoria em IA aplicada, em São José dos Campos/SP.",
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
