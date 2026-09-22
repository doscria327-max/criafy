"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

type ContaInfo = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  createdAt: string;
  subscription: {
    plan: string;
    status: string;
    startedAt: string | null;
    expiresAt: string | null;
    lastPaymentAt: string | null;
  } | null;
  totalProdutos: number;
};

const STATUS_INFO: Record<string, { label: string; color: string; desc: string }> = {
  registered_without_payment: {
    label: "Sem plano",
    color: "bg-neutral-100 text-neutral-800",
    desc: "Você ainda não assinou um plano.",
  },
  payment_pending: {
    label: "Pagamento pendente",
    color: "bg-yellow-100 text-yellow-800",
    desc: "Estamos verificando seu pagamento.",
  },
  active_monthly: {
    label: "Mensal ativo",
    color: "bg-green-100 text-green-800",
    desc: "Sua assinatura mensal está ativa.",
  },
  active_lifetime: {
    label: "Vitalício",
    color: "bg-brand-100 text-brand-800",
    desc: "Você tem acesso vitalício ao Criafy.",
  },
  expired: {
    label: "Expirado",
    color: "bg-red-100 text-red-700",
    desc: "Sua assinatura expirou.",
  },
  suspended: {
    label: "Suspenso",
    color: "bg-red-100 text-red-700",
    desc: "Sua conta está suspensa. Fale com o suporte.",
  },
  canceled: {
    label: "Cancelado",
    color: "bg-neutral-100 text-neutral-700",
    desc: "Sua assinatura foi cancelada.",
  },
};

const PLAN_PRICES: Record<string, string> = {
  monthly: "R$ 197 / mês",
  lifetime: "R$ 297 (pagamento único)",
  none: "—",
};

export default function ContaPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [conta, setConta] = useState<ContaInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  // Form perfil
  const [nome, setNome] = useState("");
  const [phone, setPhone] = useState("");

  // Form senha
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confSenha, setConfSenha] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/conta");
      return;
    }
    if (status === "authenticated") carregar();
  }, [status, router]);

  async function carregar() {
    const r = await fetch("/api/conta");
    if (!r.ok) return;
    const data = await r.json();
    setConta(data);
    setNome(data.name);
    setPhone(data.phone || "");
    setLoading(false);
  }

  async function salvarPerfil(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setOk(null);
    const r = await fetch("/api/conta", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "profile", name: nome, phone }),
    });
    if (r.ok) {
      setOk("Perfil atualizado!");
      carregar();
    } else {
      const d = await r.json();
      setErro(d.error || "Erro");
    }
  }

  async function alterarSenha(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setOk(null);
    if (novaSenha !== confSenha) {
      setErro("Senhas novas não conferem.");
      return;
    }
    const r = await fetch("/api/conta", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "password",
        currentPassword: senhaAtual,
        newPassword: novaSenha,
      }),
    });
    if (r.ok) {
      setOk("Senha alterada com sucesso!");
      setSenhaAtual("");
      setNovaSenha("");
      setConfSenha("");
    } else {
      const d = await r.json();
      setErro(d.error || "Erro");
    }
  }

  if (loading || !conta) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-neutral-50">
        <p className="text-neutral-500">Carregando...</p>
      </main>
    );
  }

  const st = STATUS_INFO[conta.subscription?.status || "registered_without_payment"];
  const isVitalicio = conta.subscription?.status === "active_lifetime";
  const isAtivo =
    conta.subscription?.status === "active_monthly" || isVitalicio;

  return (
    <main className="min-h-screen bg-neutral-50">
      <UserHeader isAdmin={conta.role === "admin"} />

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-8">
          <p className="text-sm font-bold text-brand-600 uppercase tracking-widest mb-2">
            Minha conta
          </p>
          <h1 className="text-4xl font-black">{conta.name}</h1>
          <p className="text-neutral-600">{conta.email}</p>
        </div>

        {ok && (
          <div className="mb-4 p-3 rounded-xl bg-green-50 border border-green-200 text-green-800 text-sm">
            ✓ {ok}
          </div>
        )}
        {erro && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm">
            {erro}
          </div>
        )}

        {/* PLANO ATUAL */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">
                Plano atual
              </p>
              <h2 className="text-2xl font-black capitalize mb-1">
                {conta.subscription?.plan === "none" || !conta.subscription?.plan
                  ? "Sem plano"
                  : conta.subscription.plan === "monthly"
                  ? "Mensal"
                  : "Vitalício"}
              </h2>
              <p className="text-neutral-600 text-sm">{st.desc}</p>
            </div>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${st.color}`}>
              {st.label}
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-neutral-100">
            <Info
              label="Preço"
              value={PLAN_PRICES[conta.subscription?.plan || "none"] || "—"}
            />
            <Info
              label="Início do acesso"
              value={
                conta.subscription?.startedAt
                  ? new Date(conta.subscription.startedAt).toLocaleDateString("pt-BR")
                  : "—"
              }
            />
            <Info
              label={isVitalicio ? "Validade" : "Expira em"}
              value={
                isVitalicio
                  ? "Nunca (vitalício)"
                  : conta.subscription?.expiresAt
                  ? new Date(conta.subscription.expiresAt).toLocaleDateString("pt-BR")
                  : "—"
              }
            />
          </div>

          {!isAtivo && (
            <Link
              href="/planos"
              className="mt-6 inline-block bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-neutral-800"
            >
              {conta.subscription?.status === "registered_without_payment"
                ? "Ver planos"
                : "Renovar assinatura"}
            </Link>
          )}
        </div>

        {/* PERFIL */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 mb-6">
          <h2 className="text-xl font-black mb-4">Perfil</h2>
          <form onSubmit={salvarPerfil} className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-1">Nome</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-neutral-300 focus:border-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Email</label>
              <input
                type="email"
                value={conta.email}
                disabled
                className="w-full px-4 py-2 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-500"
              />
              <p className="text-xs text-neutral-500 mt-1">
                O email não pode ser alterado.
              </p>
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Telefone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(11) 99999-9999"
                className="w-full px-4 py-2 rounded-xl border border-neutral-300 focus:border-brand-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded-full font-bold hover:bg-neutral-800"
            >
              Salvar perfil
            </button>
          </form>
        </div>

        {/* SENHA */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 mb-6">
          <h2 className="text-xl font-black mb-4">Alterar senha</h2>
          <form onSubmit={alterarSenha} className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-1">Senha atual</label>
              <input
                required
                type="password"
                value={senhaAtual}
                onChange={(e) => setSenhaAtual(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-neutral-300"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Nova senha</label>
              <input
                required
                type="password"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                minLength={8}
                className="w-full px-4 py-2 rounded-xl border border-neutral-300"
              />
              <p className="text-xs text-neutral-500 mt-1">Mínimo 8 caracteres</p>
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Confirmar nova senha</label>
              <input
                required
                type="password"
                value={confSenha}
                onChange={(e) => setConfSenha(e.target.value)}
                minLength={8}
                className="w-full px-4 py-2 rounded-xl border border-neutral-300"
              />
            </div>
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded-full font-bold hover:bg-neutral-800"
            >
              Alterar senha
            </button>
          </form>
        </div>

        {/* DADOS DA CONTA */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6">
          <h2 className="text-xl font-black mb-4">Dados da conta</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Info
              label="Cadastro"
              value={new Date(conta.createdAt).toLocaleDateString("pt-BR")}
            />
            <Info label="Total de produtos criados" value={String(conta.totalProdutos)} />
          </div>
        </div>
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
      <p className="text-neutral-800">{value}</p>
    </div>
  );
}

export function UserHeader({ isAdmin }: { isAdmin: boolean }) {
  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/dashboard" className="text-xl font-black">
          Cria<span className="gradient-text">fy</span>
        </Link>
        <div className="flex items-center gap-6 text-sm font-semibold">
          <Link href="/dashboard" className="text-neutral-700 hover:text-brand-600">
            Criar produto
          </Link>
          <Link href="/meus-produtos" className="text-neutral-700 hover:text-brand-600">
            Meus produtos
          </Link>
          <Link href="/conta" className="text-brand-600">
            Conta
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-neutral-600 hover:text-brand-600"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}
