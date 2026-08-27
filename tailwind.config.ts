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
        navy: "#0D1B2A",
        "azul-royal": "#2563EB",
        "azul-celeste": "#38BDF8",
        "cinza-prata": "#9CA3AF",
        "branco-frio": "#F8FAFC",

        surface: {
          900: "#06111F",
          800: "#0D1B2A",
          700: "#12263A",
          600: "#1B3550",
          500: "#274766",
        },
        blue: {
          700: "#1D4ED8",
          600: "#2563EB",
          500: "#3B82F6",
          400: "#38BDF8",
          200: "#BAE6FD",
        },

        sucesso: "#10B981",
        atencao: "#F59E0B",
        erro: "#EF4444",
        info: "#38BDF8",
      },
      backgroundImage: {
        "grad-marca": "linear-gradient(120deg, #1D4ED8, #2563EB 42%, #38BDF8)",
        "grad-fundo": "linear-gradient(160deg, #0D1B2A, #06111F)",
      },
      boxShadow: {
        "elev-1": "0 6px 18px rgba(0,0,0,.28)",
        "elev-2": "0 18px 44px rgba(0,0,0,.34)",
        "elev-3": "0 30px 80px rgba(0,0,0,.42)",
        "elev-foco": "0 0 0 3px rgba(56,189,248,.45)",
      },
      transitionDuration: {
        micro: "120ms",
        comp: "220ms",
        pagina: "360ms",
      },
      transitionTimingFunction: {
        marca: "cubic-bezier(.2,.8,.2,1)",
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
      },
      borderRadius: {
        input: "8px",
        tag: "8px",
        botao: "14px",
        campo: "14px",
        card: "22px",
        painel: "22px",
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
