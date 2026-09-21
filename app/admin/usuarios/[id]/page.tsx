import { redirect } from "next/navigation";
import Link from "next/link";
import { requireAdmin } from "@/lib/session";
import { prisma } from "@/lib/db";
import AdminHeader from "@/components/AdminHeader";
import UsuarioAcoes from "./acoes";

export const dynamic = "force-dynamic";

const STATUS_LABELS: Record<string, string> = {
  registered_without_payment: "Sem plano",
  payment_pending: "Pagamento pendente",
  active_monthly: "Ativo (mensal)",
  active_lifetime: "Vitalício",
  expired: "Expirado",
  suspended: "Suspenso",
  canceled: "Cancelado",
  refunded: "Reembolsado",
  chargeback: "Chargeback",
};

export default async function UsuarioDetalhePage({
  params,
}: {
  params: { id: string };
}) {
  const admin = await requireAdmin();
  if (!admin) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: params.id },
    include: {
      subscription: true,
      purchaseIntents: { orderBy: { createdAt: "desc" }, take: 20 },
      produtos: { orderBy: { createdAt: "desc" }, take: 20 },
    },
  });

  if (!user) {
    return (
      <main className="min-h-screen bg-neutral-50">
        <AdminHeader current="usuarios" />
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <p className="text-neutral-600 mb-4">Usuário não encontrado.</p>
          <Link href="/admin/usuarios" className="text-brand-600 font-bold">
            ← Voltar
          </Link>
        </div>
      </main>
    );
  }

  const sub = user.subscription;
  const isVitalicio = sub?.status === "active_lifetime";

  return (
    <main className="min-h-screen bg-neutral-50">
      <AdminHeader current="usuarios" />

      <div className="max-w-4xl mx-auto px-6 py-8">
        <Link
          href="/admin/usuarios"
          className="text-sm text-brand-600 hover:underline mb-4 inline-block"
        >
          ← Voltar
        </Link>

        <div className="bg-white rounded-2xl border border-neutral-200 p-8 mb-6">
          <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-black mb-1">{user.name}</h1>
              <p className="text-neutral-600">{user.email}</p>
              {user.phone && (
                <p className="text-neutral-500 text-sm mt-1">📱 {user.phone}</p>
              )}
            </div>
            {user.role === "admin" && (
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-black text-white">
                ADMIN
              </span>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-neutral-100">
            <Info label="Cadastro" value={new Date(user.createdAt).toLocaleDateString("pt-BR")} />
            <Info label="Papel" value={user.role} />
            <Info label="Plano atual" value={sub?.plan === "none" ? "—" : sub?.plan || "—"} />
            <Info label="Status" value={STATUS_LABELS[sub?.status || ""] || "?"} />
            <Info
              label="Início do acesso"
              value={sub?.startedAt ? new Date(sub.startedAt).toLocaleDateString("pt-BR") : "—"}
            />
            <Info
              label="Expiração"
              value={
                isVitalicio
                  ? "Acesso vitalício"
                  : sub?.expiresAt
                  ? new Date(sub.expiresAt).toLocaleDateString("pt-BR")
                  : "—"
              }
            />
            <Info
              label="Último pagamento"
              value={sub?.lastPaymentAt ? new Date(sub.lastPaymentAt).toLocaleDateString("pt-BR") : "—"}
            />
            <Info label="ID Applyfy" value={sub?.applyfyTransactionId || "—"} />
            <Info label="Produtos criados" value={String(user.produtos?.length || 0)} />
          </div>
        </div>

        <UsuarioAcoes
          userId={user.id}
          isSelf={user.id === admin.id}
          status={sub?.status || "registered_without_payment"}
          plan={sub?.plan || "none"}
          role={user.role}
          currentExpires={
            sub?.expiresAt
              ? new Date(sub.expiresAt).toISOString().slice(0, 10)
              : ""
          }
        />

        {user.produtos && user.produtos.length > 0 && (
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 mt-6">
            <h2 className="text-xl font-black mb-4">Produtos criados ({user.produtos.length})</h2>
            <div className="space-y-2">
              {user.produtos.map((p: any) => (
                <div
                  key={p.id}
                  className="p-3 bg-neutral-50 rounded-lg text-sm flex justify-between items-center"
                >
                  <div>
                    <span className="font-semibold">{p.nome}</span>
                    <span className="text-neutral-500 ml-2">· {p.nicho}</span>
                  </div>
                  <span className="text-neutral-500 text-xs">
                    {new Date(p.createdAt).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {user.purchaseIntents && user.purchaseIntents.length > 0 && (
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 mt-6">
            <h2 className="text-xl font-black mb-4">Intenções de compra</h2>
            <div className="space-y-2">
              {user.purchaseIntents.map((pi: any) => (
                <div
                  key={pi.id}
                  className="p-3 bg-neutral-50 rounded-lg text-sm flex justify-between"
                >
                  <span className="capitalize font-semibold">{pi.plan}</span>
                  <span className="text-neutral-500">
                    {new Date(pi.createdAt).toLocaleString("pt-BR")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className="text-sm text-neutral-800">{value}</p>
    </div>
  );
}
