"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { autenticar } from "@/app/admin/login/actions";

function BotaoEntrar() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Entrando..." : "Entrar"}
    </Button>
  );
}

export function FormularioLogin({ callbackUrl }: { callbackUrl: string }) {
  const [erro, aoSubmeter] = useActionState(autenticar, undefined);

  return (
    <form action={aoSubmeter} className="flex flex-col gap-gap-form">
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <Input label="E-mail" type="email" name="email" autoComplete="email" required />
      <Input label="Senha" type="password" name="senha" autoComplete="current-password" required />
      {erro && <p className="font-body text-sm text-erro">{erro}</p>}
      <BotaoEntrar />
    </form>
  );
}
