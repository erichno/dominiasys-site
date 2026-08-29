import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cursos",
  robots: { index: false, follow: false },
};

// Kanban de 5 colunas é tarefa própria — esta tela existe só pra sidebar
// não linkar pra um 404.
export default function CursosPage() {
  return (
    <div>
      <h1 className="font-display text-h2-mobile font-semibold text-branco-frio">Cursos</h1>
      <p className="mt-6 text-corpo-mobile text-cinza-prata">Em construção.</p>
    </div>
  );
}
