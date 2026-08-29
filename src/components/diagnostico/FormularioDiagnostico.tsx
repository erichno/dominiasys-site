"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Checkbox } from "@/components/ui/Checkbox";
import { leadSchema, ehDominioGratuito, type LeadInput } from "@/lib/validators";
import { lerUtmDaUrl } from "@/lib/utm";
import { useTurnstileWidget, obterTokenTurnstile } from "@/hooks/useTurnstileWidget";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const ERRO_GENERICO =
  "Não consegui enviar. Verifique a conexão e tente de novo, ou fale direto no WhatsApp.";

const PORTES = [
  { valor: "ate-20", rotulo: "Até 20 pessoas" },
  { valor: "21-100", rotulo: "21 a 100 pessoas" },
  { valor: "101-500", rotulo: "101 a 500 pessoas" },
  { valor: "500-mais", rotulo: "Mais de 500 pessoas" },
];

const VALORES_INICIAIS: LeadInput = {
  nome: "",
  email: "",
  whatsapp: "",
  empresa: "",
  desafio: "",
  porte: undefined,
  consentimento: false,
};

function formatarTelefone(valor: string): string {
  const digitos = valor.replace(/\D/g, "").slice(0, 11);
  if (digitos.length === 0) return "";
  if (digitos.length <= 2) return `(${digitos}`;
  if (digitos.length <= 7) return `(${digitos.slice(0, 2)}) ${digitos.slice(2)}`;
  return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7)}`;
}

export function FormularioDiagnostico() {
  const router = useRouter();
  const [valores, setValores] = useState<LeadInput>(VALORES_INICIAIS);
  const [erros, setErros] = useState<Partial<Record<keyof LeadInput, string>>>({});
  const [avisoEmailPessoal, setAvisoEmailPessoal] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erroEnvio, setErroEnvio] = useState<string | null>(null);

  useTurnstileWidget(TURNSTILE_SITE_KEY);

  function atualizar<K extends keyof LeadInput>(campo: K, valor: LeadInput[K]) {
    setValores((atual) => ({ ...atual, [campo]: valor }));
    setErros((atual) => {
      if (!atual[campo]) return atual;
      const resto = { ...atual };
      delete resto[campo];
      return resto;
    });
  }

  async function aoSubmeter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErroEnvio(null);

    const resultado = leadSchema.safeParse(valores);
    if (!resultado.success) {
      const novosErros: Partial<Record<keyof LeadInput, string>> = {};
      for (const issue of resultado.error.issues) {
        const campo = issue.path[0] as keyof LeadInput;
        if (!novosErros[campo]) novosErros[campo] = issue.message;
      }
      setErros(novosErros);
      return;
    }
    setErros({});

    const token = TURNSTILE_SITE_KEY ? obterTokenTurnstile() : "sem-turnstile-configurado";
    if (TURNSTILE_SITE_KEY && !token) {
      setErroEnvio("Aguarde a verificação de segurança terminar e tente de novo.");
      return;
    }

    setEnviando(true);
    try {
      const resposta = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...resultado.data,
          turnstileToken: token,
          utm: lerUtmDaUrl(),
        }),
      });

      if (!resposta.ok) {
        const dados = await resposta.json().catch(() => null);
        setErroEnvio(dados?.erro ?? ERRO_GENERICO);
        setEnviando(false);
        return;
      }

      router.push("/obrigado");
    } catch {
      setErroEnvio(ERRO_GENERICO);
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={aoSubmeter} noValidate className="flex flex-col gap-gap-form">
      <Input
        label="Nome"
        placeholder="Seu nome"
        value={valores.nome}
        onChange={(event) => atualizar("nome", event.target.value)}
        erro={erros.nome}
        autoComplete="name"
      />

      <div>
        <Input
          label="E-mail corporativo"
          type="email"
          placeholder="voce@suaempresa.com.br"
          value={valores.email}
          onChange={(event) => {
            atualizar("email", event.target.value);
            setAvisoEmailPessoal(false);
          }}
          onBlur={(event) => setAvisoEmailPessoal(ehDominioGratuito(event.target.value))}
          erro={erros.email}
          autoComplete="email"
        />
        {avisoEmailPessoal && !erros.email && (
          <p className="mt-2 text-sm text-info">
            Domínio pessoal (ex.: Gmail). Se tiver e-mail da empresa, prefira usar ele.
          </p>
        )}
      </div>

      <Input
        label="WhatsApp"
        type="tel"
        placeholder="(00) 00000-0000"
        value={valores.whatsapp}
        onChange={(event) => atualizar("whatsapp", formatarTelefone(event.target.value))}
        erro={erros.whatsapp}
        autoComplete="tel"
        inputMode="numeric"
      />

      <Input
        label="Empresa"
        placeholder="Nome da sua empresa"
        value={valores.empresa}
        onChange={(event) => atualizar("empresa", event.target.value)}
        erro={erros.empresa}
        autoComplete="organization"
      />

      <Textarea
        label="Qual o principal desafio hoje?"
        placeholder="Conte em poucas frases o que está travando"
        rows={3}
        value={valores.desafio}
        onChange={(event) => atualizar("desafio", event.target.value)}
        erro={erros.desafio}
      />

      <Select
        label="Porte da empresa (opcional)"
        value={valores.porte ?? ""}
        onChange={(event) =>
          atualizar("porte", (event.target.value || undefined) as LeadInput["porte"])
        }
      >
        <option value="">Prefiro não dizer</option>
        {PORTES.map((porte) => (
          <option key={porte.valor} value={porte.valor}>
            {porte.rotulo}
          </option>
        ))}
      </Select>

      <Checkbox
        checked={valores.consentimento}
        onChange={(event) => atualizar("consentimento", event.target.checked)}
        erro={erros.consentimento}
        label={
          <>
            Autorizo a DOMINIA a entrar em contato comigo, conforme a{" "}
            <Link
              href="/politica-de-privacidade"
              target="_blank"
              className="text-azul-celeste hover:underline"
            >
              política de privacidade
            </Link>
            .
          </>
        }
      />

      {TURNSTILE_SITE_KEY && (
        <div className="cf-turnstile" data-sitekey={TURNSTILE_SITE_KEY} data-theme="dark" />
      )}

      <div className="flex flex-col items-start gap-3 pt-2">
        <Button type="submit" disabled={enviando} className="w-full sm:w-auto">
          {enviando ? "Enviando..." : "Contratar diagnóstico"}
        </Button>
        <p className="text-sm text-cinza-prata">
          Seus dados ficam com a DOMINIA. Sem lista de disparo, sem repasse a terceiros.
        </p>
        {erroEnvio && <p className="font-body text-sm text-erro">{erroEnvio}</p>}
      </div>
    </form>
  );
}
