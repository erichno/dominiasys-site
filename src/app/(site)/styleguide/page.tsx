"use client";

import { useState, type ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Accordion } from "@/components/ui/Accordion";
import { Tabs } from "@/components/ui/Tabs";
import { SidePanel } from "@/components/ui/SidePanel";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Logo } from "@/components/brand/Logo";
import { MalhaDeDados } from "@/components/brand/MalhaDeDados";
import { ArcoD } from "@/components/brand/ArcoD";

const FAQ_DEMO = [
  {
    value: "prazo",
    pergunta: "Quanto tempo leva o diagnóstico?",
    resposta: "Até 5 dias úteis após a conversa inicial de 30 minutos.",
  },
  {
    value: "preco",
    pergunta: "Qual o investimento?",
    resposta: "Depende do escopo. O diagnóstico é a porta de entrada mais barata.",
  },
  {
    value: "formato",
    pergunta: "O trabalho é remoto ou presencial?",
    resposta: "Remoto por padrão, com visitas presenciais em São José dos Campos quando fizer sentido.",
  },
];

const TABS_DEMO = [
  { value: "formar", label: "Formar" },
  { value: "direcionar", label: "Direcionar" },
  { value: "construir", label: "Construir" },
];

function Reveal({ children }: { children: ReactNode }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="reveal">
      {children}
    </div>
  );
}

function Swatch({
  nome,
  hex,
  className,
}: {
  nome: string;
  hex: string;
  className: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={`h-20 w-full rounded-card border border-white/10 ${className}`}
      />
      <div className="font-body text-corpo-mobile text-branco-frio">
        {nome}
      </div>
      <div className="font-body text-corpo-mobile text-cinza-prata">
        {hex}
      </div>
    </div>
  );
}

function Secao({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <Reveal>
      <section className="flex flex-col gap-6 border-t border-white/10 py-secao-mobile md:py-secao-desktop">
        <h2 className="font-display text-h2-mobile md:text-h2 text-branco-frio">
          {titulo}
        </h2>
        {children}
      </section>
    </Reveal>
  );
}

export default function StyleguidePage() {
  const [tabAtiva, setTabAtiva] = useState(TABS_DEMO[0].value);
  const [painelAberto, setPainelAberto] = useState(false);

  return (
    <main className="mx-auto max-w-5xl px-6">
      <header className="flex flex-col gap-4 py-secao-mobile md:py-secao-desktop">
        <span className="font-display text-eyebrow-mobile md:text-eyebrow uppercase text-azul-celeste">
          Uso interno — sai antes do lançamento
        </span>
        <h1 className="font-display text-h1-mobile md:text-h1 tracking-[.02em] text-branco-frio">
          Styleguide DOMINIA
        </h1>
        <p className="font-body text-corpo-mobile md:text-corpo max-w-leitura text-cinza-prata">
          Paleta, tipografia, sombras, raios, espaçamento e a animação de
          entrada da marca, para conferência visual dos tokens do Design
          System v1.0.
        </p>
      </header>

      <Secao titulo="Paleta institucional">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
          <Swatch nome="navy" hex="#0D1B2A" className="bg-navy" />
          <Swatch
            nome="azul-royal"
            hex="#2563EB"
            className="bg-azul-royal"
          />
          <Swatch
            nome="azul-celeste"
            hex="#38BDF8"
            className="bg-azul-celeste"
          />
          <Swatch
            nome="cinza-prata"
            hex="#9CA3AF"
            className="bg-cinza-prata"
          />
          <Swatch
            nome="branco-frio"
            hex="#F8FAFC"
            className="bg-branco-frio"
          />
        </div>
      </Secao>

      <Secao titulo="Escala de superfície">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
          <Swatch nome="surface-900" hex="#06111F" className="bg-surface-900" />
          <Swatch nome="surface-800" hex="#0D1B2A" className="bg-surface-800" />
          <Swatch nome="surface-700" hex="#12263A" className="bg-surface-700" />
          <Swatch nome="surface-600" hex="#1B3550" className="bg-surface-600" />
          <Swatch nome="surface-500" hex="#274766" className="bg-surface-500" />
        </div>
      </Secao>

      <Secao titulo="Escala de azul">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
          <Swatch nome="blue-700" hex="#1D4ED8" className="bg-blue-700" />
          <Swatch nome="blue-600" hex="#2563EB" className="bg-blue-600" />
          <Swatch nome="blue-500" hex="#3B82F6" className="bg-blue-500" />
          <Swatch nome="blue-400" hex="#38BDF8" className="bg-blue-400" />
          <Swatch nome="blue-200" hex="#BAE6FD" className="bg-blue-200" />
        </div>
      </Secao>

      <Secao titulo="Cores funcionais (só estado de sistema)">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          <Swatch nome="sucesso" hex="#10B981" className="bg-sucesso" />
          <Swatch nome="atenção" hex="#F59E0B" className="bg-atencao" />
          <Swatch nome="erro" hex="#EF4444" className="bg-erro" />
          <Swatch nome="info" hex="#38BDF8" className="bg-info" />
        </div>
      </Secao>

      <Secao titulo="Gradientes">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <div className="h-24 w-full rounded-card bg-grad-marca" />
            <div className="font-body text-corpo-mobile text-branco-frio">
              grad-marca
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-24 w-full rounded-card border border-white/10 bg-grad-fundo" />
            <div className="font-body text-corpo-mobile text-branco-frio">
              grad-fundo
            </div>
          </div>
        </div>
      </Secao>

      <Secao titulo="Sombras">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
          {(["elev-1", "elev-2", "elev-3", "elev-foco"] as const).map(
            (nome) => (
              <div key={nome} className="flex flex-col items-center gap-3">
                <div
                  className={`h-20 w-20 rounded-card bg-surface-700 shadow-${nome}`}
                />
                <div className="font-body text-corpo-mobile text-branco-frio">
                  {nome}
                </div>
              </div>
            ),
          )}
        </div>
      </Secao>

      <Secao titulo="Escala tipográfica">
        <div className="flex flex-col gap-8">
          <div>
            <p className="font-display text-h1-mobile md:text-h1 tracking-[.02em] text-branco-frio">
              H1 — Poppins 600
            </p>
            <p className="font-body text-corpo-mobile text-cinza-prata">
              desktop 56px · mobile 36px · lh 1.05 · tracking .02em
            </p>
          </div>
          <div>
            <p className="font-display text-h2-mobile md:text-h2 text-branco-frio">
              H2 — Poppins 600
            </p>
            <p className="font-body text-corpo-mobile text-cinza-prata">
              desktop 40px · mobile 28px · lh 1.1
            </p>
          </div>
          <div>
            <p className="font-display text-h3-mobile md:text-h3 text-branco-frio">
              H3 — Poppins 500
            </p>
            <p className="font-body text-corpo-mobile text-cinza-prata">
              desktop 24px · mobile 20px · lh 1.25
            </p>
          </div>
          <div>
            <p className="font-body text-corpo-mobile md:text-corpo text-branco-frio">
              Corpo — Raleway 400. Texto corrido usado em parágrafos, nunca
              abaixo de 16px mesmo no mobile.
            </p>
            <p className="font-body text-corpo-mobile text-cinza-prata">
              desktop 17px · mobile 16px · lh 1.6
            </p>
          </div>
          <div>
            <p className="font-display text-eyebrow-mobile md:text-eyebrow uppercase text-azul-celeste">
              Eyebrow — Poppins 600
            </p>
            <p className="font-body text-corpo-mobile text-cinza-prata">
              desktop 12px · mobile 11px · lh 1.4 · tracking .24em uppercase
            </p>
          </div>
          <div>
            <p className="font-display font-light uppercase tracking-[.08em] leading-[1.3] text-branco-frio">
              Slogan — Poppins 300
            </p>
            <p className="font-body text-corpo-mobile text-cinza-prata">
              tamanho variável por contexto · lh 1.3 · tracking .08em
              uppercase
            </p>
          </div>
        </div>
      </Secao>

      <Secao titulo="Raios">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-6">
          {(
            [
              ["input", "rounded-input"],
              ["tag", "rounded-tag"],
              ["botão", "rounded-botao"],
              ["campo", "rounded-campo"],
              ["card", "rounded-card"],
              ["badge", "rounded-badge"],
            ] as const
          ).map(([nome, classe]) => (
            <div key={nome} className="flex flex-col items-center gap-2">
              <div className={`h-16 w-16 bg-blue-600 ${classe}`} />
              <div className="font-body text-corpo-mobile text-branco-frio">
                {nome}
              </div>
            </div>
          ))}
        </div>
      </Secao>

      <Secao titulo="Espaçamento base 8">
        <div className="flex flex-col gap-3">
          {(
            [
              ["chip", "w-chip"],
              ["gap-form", "w-gap-form"],
              ["padding-card", "w-padding-card"],
              ["bloco-interno", "w-bloco-interno"],
              ["secao-mobile", "w-secao-mobile"],
              ["secao-desktop", "w-secao-desktop"],
            ] as const
          ).map(([nome, classe]) => (
            <div key={nome} className="flex items-center gap-4">
              <div className={`h-4 bg-azul-celeste ${classe}`} />
              <span className="font-body text-corpo-mobile text-cinza-prata">
                {nome}
              </span>
            </div>
          ))}
        </div>
      </Secao>

      <Secao titulo="Animação de entrada da marca">
        <p className="font-body text-corpo-mobile md:text-corpo max-w-leitura text-cinza-prata">
          Cada card abaixo entra com translate(-12px, 24px) → translate(0,0) e
          fade, 360ms, easing da marca, acionado por scroll via useReveal.
          Role a página para ver.
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <Reveal key={n}>
              <div className="flex h-32 items-center justify-center rounded-card bg-grad-marca font-display text-branco-frio shadow-elev-2">
                Card {n}
              </div>
            </Reveal>
          ))}
        </div>
      </Secao>

      <Secao titulo="Botões">
        <div className="flex flex-wrap items-center gap-6">
          <Button variant="primary">Agendar conversa</Button>
          <Button variant="secondary">Ver serviços</Button>
          <Button variant="tertiary">Saiba mais</Button>
          <Button variant="primary" disabled>
            Indisponível
          </Button>
        </div>
      </Secao>

      <Secao titulo="Cards">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Card>
            <h3 className="font-display text-h3-mobile font-medium text-branco-frio">
              Card padrão
            </h3>
            <p className="mt-2 font-body text-corpo-mobile text-cinza-prata">
              Surface-700, raio 22, padding 24. Passe o mouse para ver a
              borda celeste, elevação 2 e translateY(-4px).
            </p>
          </Card>
          <Card variant="destaque">
            <h3 className="font-display text-h3-mobile font-medium text-branco-frio">
              Card destaque
            </h3>
            <p className="mt-2 font-body text-corpo-mobile text-cinza-prata">
              Borda de 1px em grad-marca, usada no bloco do Diagnóstico.
            </p>
          </Card>
        </div>
      </Secao>

      <Secao titulo="Etiquetas">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="institucional">Institucional</Badge>
          <Badge variant="destaque">Comece por aqui</Badge>
        </div>
      </Secao>

      <Secao titulo="Acordeão (FAQ)">
        <Accordion items={FAQ_DEMO} className="max-w-leitura" />
      </Secao>

      <Secao titulo="Abas (Serviços)">
        <Tabs tabs={TABS_DEMO} value={tabAtiva} onChange={setTabAtiva} />
        <p className="font-body text-corpo-mobile text-cinza-prata">
          Aba ativa: <strong className="text-branco-frio">{tabAtiva}</strong>{" "}
          — navegue com as setas do teclado.
        </p>
      </Secao>

      <Secao titulo="Painel lateral de serviço">
        <Button variant="secondary" onClick={() => setPainelAberto(true)}>
          Abrir painel
        </Button>
        <SidePanel
          open={painelAberto}
          onClose={() => setPainelAberto(false)}
          title="Diagnóstico de Maturidade em IA"
        >
          <p className="font-body text-corpo-mobile text-cinza-prata">
            Conteúdo de exemplo do painel. Feche com Esc, clicando fora ou no
            botão — o foco volta para o botão &ldquo;Abrir painel&rdquo;.
          </p>
        </SidePanel>
      </Secao>

      <Secao titulo="Campos de formulário">
        <div className="grid max-w-leitura grid-cols-1 gap-gap-form sm:grid-cols-2">
          <Input label="Nome" placeholder="Seu nome" />
          <Input
            label="CNPJ"
            placeholder="00.000.000/0000-00"
            erro="CNPJ incompleto – informe 14 dígitos."
          />
          <Select label="Porte da empresa" defaultValue="">
            <option value="" disabled>
              Selecione
            </option>
            <option value="pequena">Pequena</option>
            <option value="media">Média</option>
            <option value="grande">Grande</option>
          </Select>
          <Textarea
            label="Mensagem"
            placeholder="Conte o que você precisa"
            className="sm:col-span-2"
          />
        </div>
      </Secao>

      <Secao titulo="Marca">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <p className="font-body text-corpo-mobile text-cinza-prata">
              Lockup completo — abaixo de 180px de largura, o Logo troca
              automaticamente para o símbolo isolado (redimensione a janela
              abaixo de 640px para ver).
            </p>
            <div className="flex flex-wrap items-center gap-8 rounded-card border border-branco-frio/10 bg-surface-900 p-padding-card">
              <Logo variant="full" />
              <Logo variant="symbol" />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-body text-corpo-mobile text-cinza-prata">
              ArcoD — gradiente, monocromático (herda a cor do texto) e com
              glow celeste para o canto do hero.
            </p>
            <div className="flex flex-wrap items-center gap-10 rounded-card border border-branco-frio/10 bg-surface-900 p-padding-card">
              <ArcoD className="h-16 w-16" />
              <ArcoD variant="mono" className="h-16 w-16 text-azul-celeste" />
              <ArcoD glow className="h-16 w-16" />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-body text-corpo-mobile text-cinza-prata">
              Malha de dados — camada de fundo absoluta, opacidade 10%,
              desvanecendo nas bordas, nunca sobre texto.
            </p>
            <div className="relative h-48 overflow-hidden rounded-card border border-branco-frio/10 bg-surface-900">
              <MalhaDeDados className="text-azul-celeste" />
            </div>
          </div>
        </div>
      </Secao>
    </main>
  );
}
