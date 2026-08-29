import { SidebarAdmin } from "@/components/admin/SidebarAdmin";

// Toda a área logada é dado ao vivo por trás de sessão — nunca pode ser
// pré-renderizada estática no build (o dashboard mostraria pra sempre o
// estado do banco no momento do `next build`, não da requisição real).
export const dynamic = "force-dynamic";

/**
 * Sem malha de dados, sem animação de entrada: ferramenta de trabalho, não
 * peça de marca. O middleware já garante sessão válida + usuário ativo
 * antes de qualquer coisa aqui renderizar.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-surface-800">
      <SidebarAdmin />
      <main className="flex-1 overflow-x-auto p-8">{children}</main>
    </div>
  );
}
