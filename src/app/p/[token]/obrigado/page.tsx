import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recebido",
  robots: { index: false, follow: false },
};

export default function PesquisaObrigadoPage() {
  return (
    <div className="mx-auto flex w-full max-w-[560px] flex-col items-center text-center">
      <h1 className="font-display text-h2-mobile font-semibold text-branco-frio sm:text-h2">
        Recebido. Obrigado pelo tempo.
      </h1>
      <p className="mt-4 text-corpo-mobile text-cinza-prata sm:text-corpo">
        Sua resposta entra direto no desenho dos próximos cursos. Se você deixou e-mail, aviso
        quando a turma abrir.
      </p>
    </div>
  );
}
