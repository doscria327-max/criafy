"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

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

export default function UsuarioDetalhe() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { data: session, status: authStatus } = useSession();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState(false);
  const [novaData, setNovaData] = useState("");

  useEffect(() => {
    if (authStatus === "unauthenticated") {
      router.push("/login");
      return;
    }
    if ((session?.user as any)?.role !== "admin" && authStatus === "authenticated") {
      router.push("/dashboard");
      return;
    }
    carregar();
  }, [authStatus, session, router, params.id]);

  async function carregar() {
    setLoading(true);
    const r = await fetch(`/api/admin/users/${params.id}`);
    const data = await r.json();
    setUser(data.user);
    if (data.user?.subscription?.expiresAt) {
      setNovaData(new Date(data.user.subscription.expiresAt).toISOString().slice(0, 10));
    }
    setLoading(false);
  }

  async function agir(action: string, extra: any = {}) {
    if (!confirm("Tem certeza dessa ação?")) return;
    setActing(true);
    try {
      const r = await fetch(`/api/admin/users/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, ...extra }),
      });
      if (!r.ok) throw new Error("Falha");
      await carregar();
    } catch {
      alert("Erro ao executar ação.");
    } finally {
      setActing(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-neutral-50">
        <p className="text-neutral-500">Carregando...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-neutral-600 mb-4">Usuário não encontrado.</p>
          <Link href="/admin/usuarios" className="text-brand-600 font-bold">
            Voltar
          </Link>
        </div>
      </main>
    );
  }

  const sub = user.subscription;
  const isAtivo = sub?.status === "active_monthly" || sub?.status === "active_lifetime";
  const isVitalicio = sub?.status === "active_lifetime";
  const isSuspenso = sub?.status === "suspended";

  return (
    <main className="min-h-screen bg-neutral-50">
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/admin" className="text-xl font-black">
            Cria<span className="gradient-text">fy</span>
            <span className="ml-2 text-xs bg-black text-white px-2 py-0.5 rounded-full font-bold">
              ADMIN
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-sm font-semibold text-neutral-700">Dashboard</Link>
            <Link href="/admin/usuarios" className="text-sm font-semibold text-brand-600">Usuários</Link>
            <button onClick={() => signOut({ callbackUrl: "/" })} className="text-sm text-neutral-600">Sair</button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <Link href="/admin/usuarios" className="text-sm text-brand-600 hover:underline mb-4 inline-block">
          ← Voltar
        </Link>

        <div className="bg-white rounded-2xl border border-neutral-200 p-8 mb-6">
          <h1 className="text-3xl font-black mb-1">{user.name}</h1>
          <p className="text-neutral-600">{user.email}</p>
          {user.phone && <p className="text-neutral-500 text-sm mt-1">📱 {user.phone}</p>}

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <Info label="Cadastro" value={new Date(user.createdAt).toLocaleDateString("pt-BR")} />
            <Info label="Papel" value={user.role} />
            <Info label="Plano atual" value={sub?.plan || "—"} />
            <Info label="Status" value={STATUS_LABELS[sub?.status] || "?"} />
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
              value={
                sub?.lastPaymentAt
                  ? new Date(sub.lastPaymentAt).toLocaleDateString("pt-BR")
                  : "—"
              }
            />
            <Info
              label="ID Applyfy"
              value={sub?.applyfyTransactionId || "—"}
            />
          </div>
        </div>

        {/* AÇÕES */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-8 mb-6">
          <h2 className="text-xl font-black mb-4">Ações administrativas</h2>

          {!isAtivo && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <p className="font-bold text-yellow-900 mb-2">🔓 Liberar acesso manualmente</p>
              <p className="text-sm text-yellow-800 mb-4">
                Use quando você confirmou o pagamento na Applyfy manualmente.
              </p>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => agir("liberar_mensal")}
                  disabled={acting}
                  className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-green-700 disabled:opacity-50"
                >
                  Liberar mensal (30 dias)
                </button>
                <button
                  onClick={() => agir("liberar_vitalicio")}
                  disabled={acting}
                  className="bg-brand-600 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-brand-700 disabled:opacity-50"
                >
                  Liberar vitalício
                </button>
              </div>
            </div>
          )}

          {isAtivo && !isVitalicio && (
            <div className="mb-6 p-4 bg-neutral-50 rounded-xl">
              <p className="font-bold mb-2">📅 Alterar data de expiração</p>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={novaData}
                  onChange={(e) => setNovaData(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border border-neutral-300"
                />
                <button
                  onClick={() => agir("alterar_expiracao", { expiresAt: novaData })}
                  disabled={acting || !novaData}
                  className="bg-black text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-neutral-800 disabled:opacity-50"
                >
                  Salvar
                </button>
              </div>
            </div>
          )}

          <div className="flex gap-2 flex-wrap">
            {isSuspenso ? (
              <button
                onClick={() => agir("reativar")}
                disabled={acting}
                className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-green-700 disabled:opacity-50"
              >
                Reativar acesso
              </button>
            ) : isAtivo ? (
              <button
                onClick={() => agir("suspender")}
                disabled={acting}
                className="bg-yellow-600 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-yellow-700 disabled:opacity-50"
              >
                Suspender acesso
              </button>
            ) : null}

            {sub?.status !== "canceled" && sub?.status !== "expired" && (
              <button
                onClick={() => agir("cancelar")}
                disabled={acting}
                className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-red-700 disabled:opacity-50"
              >
                Cancelar assinatura
              </button>
            )}
          </div>
        </div>

        {/* HISTÓRICO */}
        {user.purchaseIntents?.length > 0 && (
          <div className="bg-white rounded-2xl border border-neutral-200 p-8">
            <h2 className="text-xl font-black mb-4">Histórico de intenções de compra</h2>
            <div className="space-y-2">
              {user.purchaseIntents.map((p: any) => (
                <div key={p.id} className="p-3 bg-neutral-50 rounded-lg text-sm flex justify-between">
                  <span className="capitalize font-semibold">{p.plan}</span>
                  <span className="text-neutral-500">
                    {new Date(p.createdAt).toLocaleString("pt-BR")}
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
