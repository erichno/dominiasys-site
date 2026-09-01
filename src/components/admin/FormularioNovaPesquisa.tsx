"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { criarPesquisa } from "@/app/admin/(protegido)/pesquisas/actions";

export function FormularioNovaPesquisa() {
  const [erro, formAction, pendente] = useActionState(criarPesquisa, undefined);

  return (
    <form action={formAction} className="flex flex-wrap items-end gap-3">
      <Input
        name="titulo"
        label="Nova pesquisa"
        placeholder="Título da pesquisa"
        required
        className="min-w-[280px]"
      />
      <Button type="submit" disabled={pendente} className="!min-h-0 !px-6 !py-2.5">
        {pendente ? "Criando..." : "Criar"}
      </Button>
      {erro && <p className="w-full font-body text-sm text-erro">{erro}</p>}
    </form>
  );
}
