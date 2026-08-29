import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pesquisas",
  robots: { index: false, follow: false },
};

// CRUD completo (listar, criar, duplicar, editor de perguntas, links) é
// tarefa própria — esta tela existe só pra sidebar não linkar pra um 404.
export default function PesquisasPage() {
  return (
    <div>
      <h1 className="font-display text-h2-mobile font-semibold text-branco-frio">Pesquisas</h1>
      <p className="mt-6 text-corpo-mobile text-cinza-prata">Em construção.</p>
    </div>
  );
}
