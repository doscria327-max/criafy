"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

type Metrics = {
  total: number;
  ativos: number;
  semPlano: number;
  mensais: number;
  vitalicios: number;
  pendentes: number;
  expirando: number;
  suspensos: number;
  cancelados: number;
};

export default function AdminDashboard() {
  const { data: session, status: authStatus } = useSession();
  const router = useRouter();
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authStatus === "unauthenticated") {
      router.push("/login?callbackUrl=/admin");
      return;
    }
    if (authStatus === "authenticated") {
      const role = (session?.user as any)?.role;
      if (role !== "admin") {
        router.push("/dashboard");
        return;
      }
      fetch("/api/admin/dashboard")
        .then((r) => r.json())
        .then((data) => setMetrics(data))
        .finally(() => setLoading(false));
    }
  }, [authStatus, session, router]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-neutral-50">
        <p className="text-neutral-500">Carregando...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-50">
      <AdminHeader />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8">
          <p className="text-sm font-bold text-brand-600 uppercase tracking-widest mb-2">
            Painel Administrativo
          </p>
          <h1 className="text-4xl font-black">Visão geral</h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          <Metric label="Total de usuários" value={metrics?.total || 0} highlight />
          <Metric label="Usuários ativos" value={metrics?.ativos || 0} color="green" />
          <Metric label="Sem plano" value={metrics?.semPlano || 0} color="neutral" />
          <Metric label="Pagamentos pendentes" value={metrics?.pendentes || 0} color="yellow" />
          <Metric label="Assinaturas mensais" value={metrics?.mensais || 0} color="brand" />
          <Metric label="Usuários vitalícios" value={metrics?.vitalicios || 0} color="brand" />
          <Metric label="Expirando em 7 dias" value={metrics?.expirando || 0} color="yellow" />
          <Metric label="Suspensos" value={metrics?.suspensos || 0} color="red" />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/admin/usuarios"
            className="p-6 bg-white rounded-2xl border border-neutral-200 hover:border-brand-400 hover:shadow-md transition"
          >
            <p className="text-2xl mb-2">👥</p>
            <h3 className="font-black text-lg mb-1">Gerenciar usuários</h3>
            <p className="text-sm text-neutral-600">
              Ver detalhes, liberar acesso, suspender, alterar planos.
            </p>
          </Link>

          <Link
            href="/admin/usuarios?status=payment_pending"
            className="p-6 bg-white rounded-2xl border border-neutral-200 hover:border-brand-400 hover:shadow-md transition"
          >
            <p className="text-2xl mb-2">⏳</p>
            <h3 className="font-black text-lg mb-1">Pagamentos pendentes</h3>
            <p className="text-sm text-neutral-600">
              Confira e libere manualmente quem já pagou na Applyfy.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}

function AdminHeader() {
  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/admin" className="text-xl font-black">
          Cria<span className="gradient-text">fy</span>
          <span className="ml-2 text-xs bg-black text-white px-2 py-0.5 rounded-full font-bold">
            ADMIN
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="text-sm font-semibold text-neutral-700 hover:text-brand-600"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/usuarios"
            className="text-sm font-semibold text-neutral-700 hover:text-brand-600"
          >
            Usuários
          </Link>
          <Link
            href="/dashboard"
            className="text-sm text-neutral-600 hover:text-brand-600"
          >
            Painel de usuário
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-sm text-neutral-600 hover:text-brand-600"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}

function Metric({
  label,
  value,
  color = "neutral",
  highlight = false,
}: {
  label: string;
  value: number;
  color?: "green" | "yellow" | "red" | "brand" | "neutral";
  highlight?: boolean;
}) {
  const colors: Record<string, string> = {
    green: "text-green-600",
    yellow: "text-yellow-600",
    red: "text-red-600",
    brand: "text-brand-600",
    neutral: "text-neutral-900",
  };
  return (
    <div
      className={`p-5 rounded-2xl border ${
        highlight
          ? "bg-black text-white border-black"
          : "bg-white border-neutral-200"
      }`}
    >
      <p
        className={`text-xs font-bold uppercase tracking-widest mb-2 ${
          highlight ? "text-neutral-400" : "text-neutral-500"
        }`}
      >
        {label}
      </p>
      <p className={`text-3xl font-black ${highlight ? "text-white" : colors[color]}`}>
        {value}
      </p>
    </div>
  );
}
