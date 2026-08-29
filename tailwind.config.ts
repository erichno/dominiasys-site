import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "rgb(var(--navy-rgb) / <alpha-value>)",
        "azul-royal": "rgb(var(--azul-royal-rgb) / <alpha-value>)",
        "azul-celeste": "rgb(var(--azul-celeste-rgb) / <alpha-value>)",
        "cinza-prata": "rgb(var(--cinza-prata-rgb) / <alpha-value>)",
        "branco-frio": "rgb(var(--branco-frio-rgb) / <alpha-value>)",

        surface: {
          900: "rgb(var(--surface-900-rgb) / <alpha-value>)",
          800: "rgb(var(--surface-800-rgb) / <alpha-value>)",
          700: "rgb(var(--surface-700-rgb) / <alpha-value>)",
          600: "rgb(var(--surface-600-rgb) / <alpha-value>)",
          500: "rgb(var(--surface-500-rgb) / <alpha-value>)",
        },
        blue: {
          700: "rgb(var(--blue-700-rgb) / <alpha-value>)",
          600: "rgb(var(--blue-600-rgb) / <alpha-value>)",
          500: "rgb(var(--blue-500-rgb) / <alpha-value>)",
          400: "rgb(var(--blue-400-rgb) / <alpha-value>)",
          200: "rgb(var(--blue-200-rgb) / <alpha-value>)",
        },

        sucesso: "rgb(var(--sucesso-rgb) / <alpha-value>)",
        atencao: "rgb(var(--atencao-rgb) / <alpha-value>)",
        erro: "rgb(var(--erro-rgb) / <alpha-value>)",
        info: "rgb(var(--info-rgb) / <alpha-value>)",
      },
      backgroundImage: {
        "grad-marca": "var(--grad-marca)",
        "grad-fundo": "var(--grad-fundo)",
      },
      boxShadow: {
        "elev-1": "var(--elev-1)",
        "elev-2": "var(--elev-2)",
        "elev-3": "var(--elev-3)",
        "elev-foco": "var(--elev-foco)",
      },
      transitionDuration: {
        micro: "var(--dur-micro)",
        comp: "var(--dur-comp)",
        pagina: "var(--dur-pagina)",
      },
      transitionTimingFunction: {
        marca: "var(--ease)",
      },
      fontFamily: {
        display: ["var(--font-poppins)"],
        body: ["var(--font-raleway)"],
      },
      fontSize: {
        h1: ["56px", { lineHeight: "1.05", letterSpacing: ".02em" }],
        "h1-mobile": ["36px", { lineHeight: "1.05", letterSpacing: ".02em" }],
        h2: ["40px", { lineHeight: "1.1" }],
        "h2-mobile": ["28px", { lineHeight: "1.1" }],
        h3: ["24px", { lineHeight: "1.25" }],
        "h3-mobile": ["20px", { lineHeight: "1.25" }],
        corpo: ["17px", { lineHeight: "1.6" }],
        "corpo-mobile": ["16px", { lineHeight: "1.6" }],
        eyebrow: ["12px", { lineHeight: "1.4", letterSpacing: ".24em" }],
        "eyebrow-mobile": ["11px", { lineHeight: "1.4", letterSpacing: ".24em" }],
      },
      borderRadius: {
        input: "8px",
        tag: "8px",
        botao: "14px",
        campo: "14px",
        card: "22px",
        painel: "22px",
        badge: "9999px",
      },
      spacing: {
        chip: "8px",
        "gap-form": "16px",
        "padding-card": "24px",
        "bloco-interno": "40px",
        "secao-mobile": "56px",
        "secao-desktop": "88px",
      },
      maxWidth: {
        leitura: "76ch",
      },
    },
  },
  plugins: [],
};

export default config;
