import { redirect } from "next/navigation";
import Link from "next/link";
import { requireAdmin } from "@/lib/session";
import { prisma } from "@/lib/db";
import AdminHeader from "@/components/AdminHeader";
import UsuariosSearch from "./search";

export const dynamic = "force-dynamic";

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  registered_without_payment: { label: "Sem plano", color: "bg-neutral-100 text-neutral-700" },
  payment_pending: { label: "Pendente", color: "bg-yellow-100 text-yellow-800" },
  active_monthly: { label: "Ativo (mensal)", color: "bg-green-100 text-green-800" },
  active_lifetime: { label: "Vitalício", color: "bg-brand-100 text-brand-800" },
  expired: { label: "Expirado", color: "bg-red-100 text-red-700" },
  suspended: { label: "Suspenso", color: "bg-red-100 text-red-800" },
  canceled: { label: "Cancelado", color: "bg-neutral-100 text-neutral-700" },
  refunded: { label: "Reembolsado", color: "bg-neutral-100 text-neutral-700" },
  chargeback: { label: "Chargeback", color: "bg-red-100 text-red-800" },
};

export default async function AdminUsuariosPage({
  searchParams,
}: {
  searchParams: { q?: string; status?: string };
}) {
  const admin = await requireAdmin();
  if (!admin) redirect("/login?callbackUrl=/admin/usuarios");

  const q = searchParams.q?.trim();
  const status = searchParams.status;
  const where: any = {};
  if (q) {
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { email: { contains: q, mode: "insensitive" } },
    ];
  }
  if (status) {
    where.subscription = { status };
  }

  const users = await prisma.user.findMany({
    where,
    include: { subscription: true },
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <main className="min-h-screen bg-neutral-50">
      <AdminHeader current="usuarios" />

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-6">
          <p className="text-sm font-bold text-brand-600 uppercase tracking-widest mb-2">
            Administração
          </p>
          <h1 className="text-3xl font-black mb-4">
            Usuários{" "}
            {status && (
              <span className="text-lg font-normal text-neutral-500">
                — filtro: {STATUS_LABELS[status]?.label || status}
              </span>
            )}
          </h1>

          <UsuariosSearch initialQ={q || ""} activeStatus={status || ""} />
        </div>

        {users.length === 0 ? (
          <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center">
            <p className="text-neutral-500">Nenhum usuário encontrado.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="text-left px-4 py-3 font-bold">Nome</th>
                  <th className="text-left px-4 py-3 font-bold">Email</th>
                  <th className="text-left px-4 py-3 font-bold">Papel</th>
                  <th className="text-left px-4 py-3 font-bold">Plano</th>
                  <th className="text-left px-4 py-3 font-bold">Status</th>
                  <th className="text-left px-4 py-3 font-bold">Cadastro</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => {
                  const s = STATUS_LABELS[u.subscription?.status || "registered_without_payment"];
                  return (
                    <tr
                      key={u.id}
                      className="border-b border-neutral-100 hover:bg-neutral-50"
                    >
                      <td className="px-4 py-3 font-semibold">{u.name}</td>
                      <td className="px-4 py-3 text-neutral-700">{u.email}</td>
                      <td className="px-4 py-3">
                        {u.role === "admin" ? (
                          <span className="text-xs font-bold px-2 py-1 rounded-full bg-black text-white">
                            ADMIN
                          </span>
                        ) : (
                          <span className="text-xs text-neutral-500">Usuário</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-neutral-600 capitalize">
                        {u.subscription?.plan === "none" ? "—" : u.subscription?.plan || "—"}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs font-bold px-2 py-1 rounded-full ${
                            s?.color || ""
                          }`}
                        >
                          {s?.label || "?"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-neutral-500 text-xs">
                        {new Date(u.createdAt).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link
                          href={`/admin/usuarios/${u.id}`}
                          className="text-brand-600 font-semibold hover:underline"
                        >
                          Detalhes →
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
