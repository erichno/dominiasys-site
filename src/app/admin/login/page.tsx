import type { Metadata } from "next";
import { FormularioLogin } from "@/components/admin/FormularioLogin";

export const metadata: Metadata = {
  title: "Entrar",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const params = await searchParams;
  const callbackUrl = params.callbackUrl || "/admin";

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-900 px-6">
      <div className="w-full max-w-[380px] rounded-card border border-branco-frio/10 bg-surface-800 p-padding-card">
        <h1 className="font-display text-h3-mobile font-medium text-branco-frio">
          Painel administrativo
        </h1>
        <p className="mt-2 text-sm text-cinza-prata">Entre com seu e-mail e senha.</p>
        <div className="mt-6">
          <FormularioLogin callbackUrl={callbackUrl} />
        </div>
      </div>
    </div>
  );
}
