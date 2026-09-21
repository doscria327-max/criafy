"use client";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

type UserItem = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  createdAt: string;
  subscription: {
    plan: string;
    status: string;
    expiresAt: string | null;
    startedAt: string | null;
  } | null;
};

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

function UsuariosInner() {
  const params = useSearchParams();
  const router = useRouter();
  const { data: session, status: authStatus } = useSession();
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState(params.get("q") || "");
  const statusFilter = params.get("status") || "";

  useEffect(() => {
    if (authStatus === "unauthenticated") {
      router.push("/login?callbackUrl=/admin/usuarios");
      return;
    }
    if ((session?.user as any)?.role !== "admin" && authStatus === "authenticated") {
      router.push("/dashboard");
      return;
    }
  }, [authStatus, session, router]);

  async function carregar() {
    setLoading(true);
    const url = new URL("/api/admin/users", window.location.origin);
    if (q) url.searchParams.set("q", q);
    if (statusFilter) url.searchParams.set("status", statusFilter);
    const r = await fetch(url.toString());
    const data = await r.json();
    setUsers(data.users || []);
    setLoading(false);
  }

  useEffect(() => {
    carregar();
  }, [statusFilter]);

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    carregar();
  }

  return (
    <main className="min-h-screen bg-neutral-50">
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/admin" className="text-xl font-black">
            Cria<span className="gradient-text">fy</span>
            <span className="ml-2 text-xs bg-black text-white px-2 py-0.5 rounded-full font-bold">
              ADMIN
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-sm font-semibold text-neutral-700 hover:text-brand-600">Dashboard</Link>
            <Link href="/admin/usuarios" className="text-sm font-semibold text-brand-600">Usuários</Link>
            <Link href="/dashboard" className="text-sm text-neutral-600 hover:text-brand-600">Painel</Link>
            <button onClick={() => signOut({ callbackUrl: "/" })} className="text-sm text-neutral-600 hover:text-brand-600">Sair</button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-6">
          <p className="text-sm font-bold text-brand-600 uppercase tracking-widest mb-2">
            Administração
          </p>
          <h1 className="text-3xl font-black mb-4">
            Usuários {statusFilter && (
              <span className="text-lg font-normal text-neutral-500">
                — filtro: {STATUS_LABELS[statusFilter]?.label || statusFilter}
              </span>
            )}
          </h1>

          <form onSubmit={onSearch} className="flex gap-2 max-w-lg">
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por nome ou email..."
              className="flex-1 px-4 py-2 rounded-xl border border-neutral-300 focus:border-brand-500 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded-xl font-semibold hover:bg-neutral-800"
            >
              Buscar
            </button>
            {statusFilter && (
              <Link
                href="/admin/usuarios"
                className="border border-neutral-300 px-4 py-2 rounded-xl text-sm hover:bg-neutral-50"
              >
                Limpar
              </Link>
            )}
          </form>
        </div>

        {loading ? (
          <p className="text-neutral-500">Carregando...</p>
        ) : users.length === 0 ? (
          <p className="text-neutral-500">Nenhum usuário encontrado.</p>
        ) : (
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="text-left px-4 py-3 font-bold">Nome</th>
                  <th className="text-left px-4 py-3 font-bold">Email</th>
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
                    <tr key={u.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                      <td className="px-4 py-3 font-semibold">{u.name}</td>
                      <td className="px-4 py-3 text-neutral-700">{u.email}</td>
                      <td className="px-4 py-3 text-neutral-600 capitalize">
                        {u.subscription?.plan || "—"}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${s?.color || ""}`}>
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

export default function UsuariosPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-neutral-50" />}>
      <UsuariosInner />
    </Suspense>
  );
}
