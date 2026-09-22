import { redirect } from "next/navigation";
import Link from "next/link";
import { requireAdmin } from "@/lib/session";
import { prisma } from "@/lib/db";
import AdminHeader from "@/components/AdminHeader";
import { adminUrl } from "@/lib/config";

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

const PLAN_PRECOS: Record<string, string> = {
  monthly: "R$ 197",
  lifetime: "R$ 297",
};

export default async function PagamentosPage() {
  const admin = await requireAdmin();
  if (!admin) redirect("/login");

  const intents = await prisma.purchaseIntent.findMany({
    include: {
      user: { include: { subscription: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <main className="min-h-screen bg-neutral-50">
      <AdminHeader current="pagamentos" />

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-6">
          <p className="text-sm font-bold text-brand-600 uppercase tracking-widest mb-2">
            Administração
          </p>
          <h1 className="text-3xl font-black mb-2">Pagamentos</h1>
          <p className="text-neutral-600">
            Histórico completo de intenções de compra + status atual de assinatura.
          </p>
        </div>

        {intents.length === 0 ? (
          <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center">
            <p className="text-neutral-500">
              Nenhuma intenção de compra registrada ainda.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="text-left px-4 py-3 font-bold">Usuário</th>
                  <th className="text-left px-4 py-3 font-bold">Email</th>
                  <th className="text-left px-4 py-3 font-bold">Plano</th>
                  <th className="text-left px-4 py-3 font-bold">Valor</th>
                  <th className="text-left px-4 py-3 font-bold">Status assinatura</th>
                  <th className="text-left px-4 py-3 font-bold">Data</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {intents.map((i) => {
                  const s = STATUS_LABELS[
                    i.user.subscription?.status || "registered_without_payment"
                  ];
                  return (
                    <tr
                      key={i.id}
                      className="border-b border-neutral-100 hover:bg-neutral-50"
                    >
                      <td className="px-4 py-3 font-semibold">{i.user.name}</td>
                      <td className="px-4 py-3 text-neutral-700">{i.user.email}</td>
                      <td className="px-4 py-3 capitalize">{i.plan}</td>
                      <td className="px-4 py-3 font-semibold">
                        {PLAN_PRECOS[i.plan] || "—"}
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
                        {new Date(i.createdAt).toLocaleString("pt-BR")}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link
                          href={adminUrl(`/usuarios/${i.userId}`)}
                          className="text-brand-600 font-semibold hover:underline text-xs"
                        >
                          Ver usuário →
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 p-4 rounded-xl bg-neutral-100 text-xs text-neutral-600">
          <p className="font-bold mb-1">ℹ️ Sobre intenções de compra</p>
          <p>
            Cada linha representa um clique num plano seguido de redirecionamento
            ao checkout Applyfy. Nem toda intenção vira pagamento efetivo. Pra
            liberar acesso, acesse os detalhes do usuário e use "Liberar mensal"
            ou "Liberar vitalício".
          </p>
        </div>
      </div>
    </main>
  );
}
