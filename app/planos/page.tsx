"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PlanosPage() {
  const router = useRouter();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  async function selecionarPlano(plan: "monthly" | "lifetime") {
    setLoadingPlan(plan);
    try {
      const r = await fetch("/api/intencao-plano", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await r.json();
      if (!r.ok) {
        if (r.status === 401) {
          router.push("/login");
          return;
        }
        throw new Error(data.error);
      }
      window.location.href = data.url;
    } catch (err) {
      alert("Erro ao selecionar plano. Tente novamente.");
      setLoadingPlan(null);
    }
  }

  return (
    <main className="min-h-screen bg-neutral-50">
      <header className="bg-white border-b border-neutral-200 py-4 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-black">
            Cria<span className="gradient-text">fy</span>
          </Link>
          <Link href="/dashboard" className="text-sm text-neutral-600 hover:text-brand-600">
            Voltar ao painel
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <p className="text-sm font-bold text-brand-600 uppercase tracking-widest mb-3">
            Escolha seu plano
          </p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Comece a vender hoje
          </h1>
          <p className="text-lg text-neutral-600 max-w-xl mx-auto">
            Acesso completo ao Criafy — produtos ilimitados, ebooks, páginas de vendas e copies prontas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* MENSAL */}
          <div className="p-8 rounded-3xl bg-white border border-neutral-200">
            <h3 className="text-2xl font-black mb-1">Mensal</h3>
            <p className="text-sm text-neutral-600 mb-6">Sem compromisso longo.</p>
            <div className="mb-6">
              <span className="text-5xl font-black">R$ 197</span>
              <span className="text-sm text-neutral-500"> / mês</span>
            </div>
            <ul className="space-y-3 mb-8 text-sm">
              <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span><span>Produtos ilimitados</span></li>
              <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span><span>Todos os nichos disponíveis</span></li>
              <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span><span>PDF do ebook gerado automaticamente</span></li>
              <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span><span>Cancele quando quiser</span></li>
            </ul>
            <button
              onClick={() => selecionarPlano("monthly")}
              disabled={!!loadingPlan}
              className="w-full block text-center bg-black text-white py-3 rounded-full font-semibold hover:bg-neutral-800 transition disabled:opacity-50"
            >
              {loadingPlan === "monthly" ? "Redirecionando..." : "Assinar plano mensal"}
            </button>
          </div>

          {/* VITALÍCIO */}
          <div className="p-8 rounded-3xl bg-black text-white border-2 border-brand-500 shadow-2xl md:scale-105">
            <span className="inline-block bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
              MAIS ESCOLHIDO
            </span>
            <h3 className="text-2xl font-black mb-1">Vitalício</h3>
            <p className="text-sm text-neutral-400 mb-6">Pague uma vez, use pra sempre.</p>
            <div className="mb-6">
              <span className="text-5xl font-black">R$ 297</span>
              <span className="text-sm text-neutral-400"> pagamento único</span>
            </div>
            <ul className="space-y-3 mb-8 text-sm">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span><span>Tudo do plano mensal</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span><span>Acesso vitalício — sem renovação</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span><span>Todas as atualizações inclusas</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span><span>Economia de ~8 meses do mensal</span></li>
            </ul>
            <button
              onClick={() => selecionarPlano("lifetime")}
              disabled={!!loadingPlan}
              className="w-full block text-center bg-white text-black py-3 rounded-full font-semibold hover:bg-neutral-100 transition disabled:opacity-50"
            >
              {loadingPlan === "lifetime" ? "Redirecionando..." : "Garantir acesso vitalício"}
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-neutral-500 mt-8">
          🔒 Pagamento seguro processado pela Applyfy
        </p>
      </div>
    </main>
  );
}
