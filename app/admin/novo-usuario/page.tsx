import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/session";
import AdminHeader from "@/components/AdminHeader";
import NovoUsuarioForm from "./form";

export const dynamic = "force-dynamic";

export default async function NovoUsuarioPage() {
  const admin = await requireAdmin();
  if (!admin) redirect("/login");

  return (
    <main className="min-h-screen bg-neutral-50">
      <AdminHeader current="novo-usuario" />

      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="mb-6">
          <p className="text-sm font-bold text-brand-600 uppercase tracking-widest mb-2">
            Administração
          </p>
          <h1 className="text-3xl font-black mb-2">Criar novo usuário</h1>
          <p className="text-neutral-600">
            Cadastre um usuário manualmente já com plano ativo. Útil pra clientes
            que pagaram por outro meio ou pra liberar acessos administrativamente.
          </p>
        </div>

        <NovoUsuarioForm />
      </div>
    </main>
  );
}
