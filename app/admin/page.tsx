import { redirect } from "next/navigation";
import Link from "next/link";
import { requireAdmin } from "@/lib/session";
import { prisma } from "@/lib/db";
import AdminHeader from "@/components/AdminHeader";
import { adminUrl } from "@/lib/config";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const admin = await requireAdmin();
  if (!admin) redirect("/login?callbackUrl=/admin");

  const [total, ativos, semPlano, mensais, vitalicios, pendentes, expirando, suspensos] =
    await Promise.all([
      prisma.user.count(),
      prisma.subscription.count({
        where: { status: { in: ["active_monthly", "active_lifetime"] } },
      }),
      prisma.subscription.count({ where: { status: "registered_without_payment" } }),
      prisma.subscription.count({ where: { status: "active_monthly" } }),
      prisma.subscription.count({ where: { status: "active_lifetime" } }),
      prisma.subscription.count({ where: { status: "payment_pending" } }),
      prisma.subscription.count({
        where: {
          status: "active_monthly",
          expiresAt: {
            lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            gte: new Date(),
          },
        },
      }),
      prisma.subscription.count({ where: { status: "suspended" } }),
    ]);

  return (
    <main className="min-h-screen bg-neutral-50">
      <AdminHeader current="dashboard" />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8">
          <p className="text-sm font-bold text-brand-600 uppercase tracking-widest mb-2">
            Painel Administrativo
          </p>
          <h1 className="text-4xl font-black">Bem-vindo, {admin.name}</h1>
          <p className="text-neutral-600 mt-2">
            Aqui você gerencia todos os usuários e assinaturas do Criafy.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Metric label="Total de usuários" value={total} highlight />
          <Metric label="Ativos" value={ativos} color="green" />
          <Metric label="Sem plano" value={semPlano} color="neutral" />
          <Metric label="Pendentes" value={pendentes} color="yellow" />
          <Metric label="Mensais" value={mensais} color="brand" />
          <Metric label="Vitalícios" value={vitalicios} color="brand" />
          <Metric label="Expirando em 7 dias" value={expirando} color="yellow" />
          <Metric label="Suspensos" value={suspensos} color="red" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href={adminUrl("/novo-usuario")}
            className="p-6 bg-brand-600 text-white rounded-2xl border border-brand-700 hover:shadow-lg transition"
          >
            <p className="text-3xl mb-2">✨</p>
            <h3 className="font-black text-lg mb-1">Criar novo usuário</h3>
            <p className="text-sm text-brand-50">
              Cadastro manual com plano ativo (mensal ou vitalício).
            </p>
          </Link>
          <Link
            href={adminUrl("/usuarios")}
            className="p-6 bg-white rounded-2xl border border-neutral-200 hover:border-brand-400 hover:shadow-md transition"
          >
            <p className="text-3xl mb-2">👥</p>
            <h3 className="font-black text-lg mb-1">Usuários</h3>
            <p className="text-sm text-neutral-600">
              Ver todos, alterar planos, suspender, expiração.
            </p>
          </Link>
          <Link
            href={adminUrl("/pagamentos")}
            className="p-6 bg-white rounded-2xl border border-neutral-200 hover:border-brand-400 hover:shadow-md transition"
          >
            <p className="text-3xl mb-2">💳</p>
            <h3 className="font-black text-lg mb-1">Pagamentos</h3>
            <p className="text-sm text-neutral-600">
              Histórico de intenções e liberações.
            </p>
          </Link>
          <Link
            href={adminUrl("/projetos")}
            className="p-6 bg-white rounded-2xl border border-neutral-200 hover:border-brand-400 hover:shadow-md transition"
          >
            <p className="text-3xl mb-2">📦</p>
            <h3 className="font-black text-lg mb-1">Projetos</h3>
            <p className="text-sm text-neutral-600">
              Produtos criados pelos usuários.
            </p>
          </Link>
        </div>
      </div>
    </main>
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
