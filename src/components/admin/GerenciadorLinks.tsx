"use client";

import { useState, useTransition, type FormEvent } from "react";
import Link from "next/link";
import QRCode from "qrcode";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { PesquisaLink } from "@/lib/db/schema";
import { criarLink, desativarLink, reativarLink } from "@/app/admin/(protegido)/pesquisas/[id]/links/actions";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dominiasys.com.br";

const ORIGENS = [
  { valor: "", rotulo: "Não informar" },
  { valor: "whatsapp", rotulo: "WhatsApp" },
  { valor: "linkedin", rotulo: "LinkedIn" },
  { valor: "evento", rotulo: "Evento" },
  { valor: "email", rotulo: "E-mail" },
  { valor: "cliente", rotulo: "Cliente" },
];

function montarUrl(token: string) {
  return `${SITE_URL}/p/${token}`;
}

function formatarData(data: Date | string | null) {
  if (!data) return "—";
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(data));
}

function FormularioLink({ pesquisaId }: { pesquisaId: string }) {
  const [rotulo, setRotulo] = useState("");
  const [origem, setOrigem] = useState("");
  const [expiraEm, setExpiraEm] = useState("");
  const [maxUsos, setMaxUsos] = useState("");
  const [criando, startCriacao] = useTransition();
  const [erro, setErro] = useState<string | null>(null);

  function aoSubmeter(event: FormEvent) {
    event.preventDefault();
    setErro(null);

    if (!rotulo.trim()) {
      setErro("Informe um rótulo.");
      return;
    }

    startCriacao(async () => {
      try {
        await criarLink(pesquisaId, {
          rotulo,
          origem: origem || null,
          expiraEm: expiraEm || null,
          maxUsos: maxUsos ? Number(maxUsos) : null,
        });
        setRotulo("");
        setOrigem("");
        setExpiraEm("");
        setMaxUsos("");
      } catch {
        setErro("Não consegui criar o link. Tente de novo.");
      }
    });
  }

  return (
    <form onSubmit={aoSubmeter} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Input
        label="Rótulo"
        value={rotulo}
        onChange={(event) => setRotulo(event.target.value)}
        placeholder="Turma mentoria set/26"
        required
      />
      <Select label="Origem (opcional)" value={origem} onChange={(event) => setOrigem(event.target.value)}>
        {ORIGENS.map((item) => (
          <option key={item.valor} value={item.valor}>
            {item.rotulo}
          </option>
        ))}
      </Select>
      <Input
        label="Expira em (opcional)"
        type="datetime-local"
        value={expiraEm}
        onChange={(event) => setExpiraEm(event.target.value)}
      />
      <Input
        label="Máximo de usos (opcional)"
        type="number"
        min={1}
        value={maxUsos}
        onChange={(event) => setMaxUsos(event.target.value)}
      />
      <div className="flex items-center gap-3 sm:col-span-2 lg:col-span-4">
        <Button type="submit" disabled={criando} className="!min-h-0 !px-6 !py-2.5">
          {criando ? "Criando..." : "Criar link"}
        </Button>
        {erro && <p className="font-body text-sm text-erro">{erro}</p>}
      </div>
    </form>
  );
}

function LinhaLink({ pesquisaId, link }: { pesquisaId: string; link: PesquisaLink }) {
  const [copiado, setCopiado] = useState(false);
  const [alternando, startAlternancia] = useTransition();
  const url = montarUrl(link.token);

  async function copiarUrl() {
    await navigator.clipboard.writeText(url);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }

  async function baixarQrCode() {
    const dataUrl = await QRCode.toDataURL(url, { width: 512, margin: 2 });
    const ancora = document.createElement("a");
    ancora.href = dataUrl;
    ancora.download = `pesquisa-${link.rotulo.replace(/\s+/g, "-").toLowerCase()}.png`;
    ancora.click();
  }

  function alternarAtivo() {
    startAlternancia(async () => {
      if (link.ativo) {
        await desativarLink(pesquisaId, link.id, link.token);
      } else {
        await reativarLink(pesquisaId, link.id);
      }
    });
  }

  const expirado = link.expiraEm ? new Date(link.expiraEm).getTime() <= Date.now() : false;
  const esgotado = link.maxUsos !== null && link.usos >= link.maxUsos;
  const statusRotulo = !link.ativo ? "Desativado" : expirado ? "Expirado" : esgotado ? "Esgotado" : "Ativo";

  return (
    <tr className="border-b border-branco-frio/[0.03] align-top last:border-b-0">
      <td className="py-3 pr-4 text-branco-frio">{link.rotulo}</td>
      <td className="py-3 pr-4 text-cinza-prata">{link.origem ?? "—"}</td>
      <td className="py-3 pr-4 text-cinza-prata">
        {link.usos}
        {link.maxUsos !== null ? ` / ${link.maxUsos}` : ""}
      </td>
      <td className="py-3 pr-4 text-cinza-prata">{formatarData(link.expiraEm)}</td>
      <td className="py-3 pr-4 text-cinza-prata">{statusRotulo}</td>
      <td className="py-3 pr-4 text-cinza-prata">{formatarData(link.criadoEm)}</td>
      <td className="py-3">
        <div className="flex flex-wrap gap-3 text-sm">
          <button type="button" onClick={copiarUrl} className="text-azul-celeste hover:underline">
            {copiado ? "Copiado!" : "Copiar URL"}
          </button>
          <button type="button" onClick={baixarQrCode} className="text-azul-celeste hover:underline">
            Baixar QR code
          </button>
          <button
            type="button"
            onClick={alternarAtivo}
            disabled={alternando}
            className="text-azul-celeste hover:underline disabled:opacity-50"
          >
            {alternando ? "Aguarde..." : link.ativo ? "Desativar" : "Reativar"}
          </button>
          <Link
            href={`/admin/pesquisas/${pesquisaId}/respostas?link=${link.id}`}
            className="text-azul-celeste hover:underline"
          >
            Ver respostas
          </Link>
        </div>
      </td>
    </tr>
  );
}

interface GerenciadorLinksProps {
  pesquisaId: string;
  linksIniciais: PesquisaLink[];
}

export function GerenciadorLinks({ pesquisaId, linksIniciais }: GerenciadorLinksProps) {
  return (
    <div className="flex flex-col gap-bloco-interno">
      <Card className="hover:translate-y-0 hover:border-branco-frio/[0.06] hover:shadow-none">
        <h2 className="font-display text-h3-mobile font-medium text-branco-frio">Novo link</h2>
        <div className="mt-4">
          <FormularioLink pesquisaId={pesquisaId} />
        </div>
      </Card>

      {linksIniciais.length === 0 ? (
        <p className="text-corpo-mobile text-cinza-prata">Nenhum link criado ainda.</p>
      ) : (
        <Card className="hover:translate-y-0 hover:border-branco-frio/[0.06] hover:shadow-none">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-branco-frio/[0.06] text-cinza-prata">
                  <th className="py-2 pr-4 font-display font-medium">Rótulo</th>
                  <th className="py-2 pr-4 font-display font-medium">Origem</th>
                  <th className="py-2 pr-4 font-display font-medium">Usos</th>
                  <th className="py-2 pr-4 font-display font-medium">Expira em</th>
                  <th className="py-2 pr-4 font-display font-medium">Status</th>
                  <th className="py-2 pr-4 font-display font-medium">Criado em</th>
                  <th className="py-2 font-display font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {linksIniciais.map((link) => (
                  <LinhaLink key={link.id} pesquisaId={pesquisaId} link={link} />
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
