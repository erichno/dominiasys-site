import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leads",
  robots: { index: false, follow: false },
};

// Tabela com as duas origens, score, UTM e export CSV é tarefa própria —
// esta tela existe só pra sidebar não linkar pra um 404.
export default function LeadsPage() {
  return (
    <div>
      <h1 className="font-display text-h2-mobile font-semibold text-branco-frio">Leads</h1>
      <p className="mt-6 text-corpo-mobile text-cinza-prata">Em construção.</p>
    </div>
  );
}
