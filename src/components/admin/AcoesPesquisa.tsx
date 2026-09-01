"use client";

import { useTransition } from "react";
import Link from "next/link";
import { ativarPesquisa, duplicarPesquisa, encerrarPesquisa } from "@/app/admin/(protegido)/pesquisas/actions";
import type { PesquisaResumo } from "@/lib/db/queries/pesquisas-admin";

export function AcoesPesquisa({ pesquisa }: { pesquisa: PesquisaResumo }) {
  const [duplicando, startDuplicacao] = useTransition();
  const [alternando, startAlternancia] = useTransition();

  function duplicar() {
    startDuplicacao(async () => {
      await duplicarPesquisa(pesquisa.id);
    });
  }

  function alternarStatus() {
    startAlternancia(async () => {
      if (pesquisa.status === "ativa") {
        await encerrarPesquisa(pesquisa.id);
      } else {
        await ativarPesquisa(pesquisa.id);
      }
    });
  }

  return (
    <div className="flex flex-wrap gap-4 text-sm">
      <Link href={`/admin/pesquisas/${pesquisa.id}`} className="text-azul-celeste hover:underline">
        Editar
      </Link>
      <Link href={`/admin/pesquisas/${pesquisa.id}/links`} className="text-azul-celeste hover:underline">
        Links
      </Link>
      <button
        type="button"
        onClick={duplicar}
        disabled={duplicando}
        className="text-azul-celeste hover:underline disabled:opacity-50"
      >
        {duplicando ? "Duplicando..." : "Duplicar"}
      </button>
      {pesquisa.status !== "encerrada" && (
        <button
          type="button"
          onClick={alternarStatus}
          disabled={alternando}
          className="text-azul-celeste hover:underline disabled:opacity-50"
        >
          {alternando ? "Aguarde..." : pesquisa.status === "ativa" ? "Encerrar" : "Ativar"}
        </button>
      )}
    </div>
  );
}
