"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { RenderPergunta, type PerguntaPublica, type ValorResposta } from "@/components/pesquisa/RenderPergunta";
import { useTurnstileWidget, obterTokenTurnstile } from "@/hooks/useTurnstileWidget";
import { lerUtmDaUrl } from "@/lib/utm";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const TIPOS_CLICAVEIS = new Set(["unica", "multipla", "escala", "nps", "consentimento"]);

const ERRO_GENERICO =
  "Não consegui enviar. Verifique a conexão e tente de novo, ou fale direto no WhatsApp.";

interface FormularioPesquisaProps {
  token: string;
  pesquisa: { titulo: string; descricao: string | null };
  perguntas: PerguntaPublica[];
}

function estaVazio(valor: ValorResposta): boolean {
  if (valor === undefined) return true;
  if (typeof valor === "string") return valor.trim() === "";
  if (Array.isArray(valor)) return valor.length === 0;
  return false;
}

function validarPergunta(pergunta: PerguntaPublica, valor: ValorResposta): string | undefined {
  if (pergunta.tipo === "consentimento") {
    if (pergunta.obrigatoria && valor !== true) return "É preciso concordar para enviar.";
    return undefined;
  }

  if (pergunta.obrigatoria && estaVazio(valor)) return "Resposta obrigatória.";
  if (estaVazio(valor)) return undefined;

  if (pergunta.tipo === "email") {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(valor))) return "E-mail inválido.";
  }
  if (pergunta.tipo === "telefone") {
    const digitos = String(valor).replace(/\D/g, "");
    if (digitos.length < 10) return "Telefone incompleto — informe DDD e número.";
  }

  return undefined;
}

function montarItem(pergunta: PerguntaPublica, valor: ValorResposta) {
  if (pergunta.tipo === "consentimento" || estaVazio(valor)) return null;

  if (pergunta.tipo === "escala" || pergunta.tipo === "nps") {
    return { perguntaId: pergunta.id, valorNum: valor as number };
  }
  if (pergunta.tipo === "multipla") {
    return { perguntaId: pergunta.id, valorJson: valor as string[] };
  }
  return { perguntaId: pergunta.id, valorTexto: String(valor) };
}

export function FormularioPesquisa({ token, pesquisa, perguntas }: FormularioPesquisaProps) {
  const router = useRouter();
  const [valores, setValores] = useState<Record<string, ValorResposta>>({});
  const [erros, setErros] = useState<Record<string, string>>({});
  const [enviando, setEnviando] = useState(false);
  const [erroEnvio, setErroEnvio] = useState<string | null>(null);

  useTurnstileWidget(TURNSTILE_SITE_KEY);

  const respondidas = perguntas.filter((pergunta) => !estaVazio(valores[pergunta.id])).length;
  const progresso = perguntas.length > 0 ? respondidas / perguntas.length : 0;

  function aoMudarValor(perguntaId: string, valor: ValorResposta) {
    setValores((atual) => ({ ...atual, [perguntaId]: valor }));
    setErros((atual) => {
      if (!atual[perguntaId]) return atual;
      const resto = { ...atual };
      delete resto[perguntaId];
      return resto;
    });
  }

  function aoPerderFoco(pergunta: PerguntaPublica) {
    const erro = validarPergunta(pergunta, valores[pergunta.id]);
    setErros((atual) => {
      if (!erro) {
        if (!atual[pergunta.id]) return atual;
        const resto = { ...atual };
        delete resto[pergunta.id];
        return resto;
      }
      return { ...atual, [pergunta.id]: erro };
    });
  }

  /**
   * Para tipos "clicáveis" (única, múltipla, escala, nps, consentimento) a
   * resposta já é final no clique — valida com o valor novo direto, em vez
   * de ler `valores` do state (que ainda não teria o update aplicado se
   * chamado logo depois de um onChange, no mesmo tick).
   */
  function aoResponderClicavel(pergunta: PerguntaPublica, valor: ValorResposta) {
    setValores((atual) => ({ ...atual, [pergunta.id]: valor }));
    const erro = validarPergunta(pergunta, valor);
    setErros((atual) => {
      if (!erro) {
        if (!atual[pergunta.id]) return atual;
        const resto = { ...atual };
        delete resto[pergunta.id];
        return resto;
      }
      return { ...atual, [pergunta.id]: erro };
    });
  }

  async function aoSubmeter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErroEnvio(null);

    const novosErros: Record<string, string> = {};
    for (const pergunta of perguntas) {
      const erro = validarPergunta(pergunta, valores[pergunta.id]);
      if (erro) novosErros[pergunta.id] = erro;
    }

    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      const primeiraComErro = perguntas.find((pergunta) => novosErros[pergunta.id]);
      if (primeiraComErro) {
        document
          .getElementById(`pergunta-${primeiraComErro.id}`)
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }
    setErros({});

    const token_ = TURNSTILE_SITE_KEY ? obterTokenTurnstile() : "sem-turnstile-configurado";
    if (TURNSTILE_SITE_KEY && !token_) {
      setErroEnvio("Aguarde a verificação de segurança terminar e tente de novo.");
      return;
    }

    const perguntaConsentimento = perguntas.find((pergunta) => pergunta.tipo === "consentimento");
    const consentimento = perguntaConsentimento
      ? Boolean(valores[perguntaConsentimento.id])
      : false;

    const itens = perguntas
      .map((pergunta) => montarItem(pergunta, valores[pergunta.id]))
      .filter((item): item is NonNullable<typeof item> => item !== null);

    setEnviando(true);
    try {
      const resposta = await fetch(`/api/pesquisas/${token}/respostas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          turnstileToken: token_,
          consentimento,
          utm: lerUtmDaUrl(),
          itens,
        }),
      });

      if (!resposta.ok) {
        const dados = await resposta.json().catch(() => null);
        setErroEnvio(dados?.erro ?? ERRO_GENERICO);
        setEnviando(false);
        return;
      }

      router.push(`/p/${token}/obrigado`);
    } catch {
      setErroEnvio(ERRO_GENERICO);
      setEnviando(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-[720px] overflow-hidden rounded-card border border-branco-frio/10 bg-surface-700">
      <div className="h-1 w-full bg-surface-600">
        <div
          className="h-full bg-grad-marca transition-[width] duration-comp ease-marca"
          style={{ width: `${progresso * 100}%` }}
        />
      </div>

      <div className="p-padding-card sm:p-bloco-interno">
        <h1 className="font-display text-h2-mobile font-semibold text-branco-frio sm:text-h2">
          {pesquisa.titulo}
        </h1>
        {pesquisa.descricao && (
          <p className="mt-3 max-w-leitura text-corpo-mobile text-cinza-prata sm:text-corpo">
            {pesquisa.descricao}
          </p>
        )}

        <form onSubmit={aoSubmeter} noValidate className="mt-bloco-interno flex flex-col gap-bloco-interno">
          {perguntas.map((pergunta) => (
            <div key={pergunta.id} id={`pergunta-${pergunta.id}`}>
              <RenderPergunta
                pergunta={pergunta}
                valor={valores[pergunta.id]}
                onChange={(valor) =>
                  TIPOS_CLICAVEIS.has(pergunta.tipo)
                    ? aoResponderClicavel(pergunta, valor)
                    : aoMudarValor(pergunta.id, valor)
                }
                onBlur={() => aoPerderFoco(pergunta)}
                erro={erros[pergunta.id]}
              />
            </div>
          ))}

          {TURNSTILE_SITE_KEY && (
            <div className="cf-turnstile" data-sitekey={TURNSTILE_SITE_KEY} data-theme="dark" />
          )}

          <div className="flex flex-col gap-3 border-t border-branco-frio/10 pt-6">
            <Button type="submit" disabled={enviando} className="w-full sm:w-auto">
              {enviando ? "Enviando..." : "Enviar respostas"}
            </Button>
            {erroEnvio && <p className="font-body text-sm text-erro">{erroEnvio}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
