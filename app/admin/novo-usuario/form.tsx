"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminUrl } from "@/lib/config";

export default function NovoUsuarioForm() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [plano, setPlano] = useState<"monthly" | "lifetime">("monthly");
  const [dias, setDias] = useState(30);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  const dataExpiracaoCalc = new Date(
    Date.now() + dias * 24 * 60 * 60 * 1000
  ).toLocaleDateString("pt-BR");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setLoading(true);
    try {
      const body: any = {
        name: nome,
        email,
        phone: telefone,
        password: senha,
        plan: plano,
      };
      if (plano === "monthly") {
        body.expiresAt = new Date(Date.now() + dias * 24 * 60 * 60 * 1000).toISOString();
      }
      const r = await fetch("/api/admin/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "Erro ao criar usuário");
      setOk(true);
      setTimeout(() => {
        router.push(adminUrl(`/usuarios/${data.userId}`));
      }, 1000);
    } catch (err: any) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  }

  function gerarSenha() {
    const chars = "ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
    let s = "";
    for (let i = 0; i < 12; i++) s += chars[Math.floor(Math.random() * chars.length)];
    setSenha(s);
  }

  if (ok) {
    return (
      <div className="bg-white p-8 rounded-2xl border border-green-200 text-center">
        <div className="text-6xl mb-4">✅</div>
        <h2 className="text-2xl font-black mb-2">Usuário criado!</h2>
        <p className="text-neutral-600">Redirecionando pros detalhes...</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-8 rounded-2xl border border-neutral-200 space-y-5"
    >
      {erro && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm">
          {erro}
        </div>
      )}

      <div>
        <label className="block font-bold text-sm mb-1">Nome completo</label>
        <input
          required
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-brand-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block font-bold text-sm mb-1">Email</label>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-brand-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block font-bold text-sm mb-1">Telefone (opcional)</label>
        <input
          type="tel"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          placeholder="(11) 99999-9999"
          className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-brand-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block font-bold text-sm mb-1">Senha</label>
        <div className="flex gap-2">
          <input
            required
            type="text"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            minLength={8}
            className="flex-1 px-4 py-3 rounded-xl border border-neutral-300 focus:border-brand-500 focus:outline-none font-mono text-sm"
          />
          <button
            type="button"
            onClick={gerarSenha}
            className="bg-neutral-100 hover:bg-neutral-200 px-4 py-3 rounded-xl text-sm font-semibold"
          >
            🎲 Gerar
          </button>
        </div>
        <p className="text-xs text-neutral-500 mt-1">
          Mínimo 8 caracteres. A senha aparece visível — copie e envie ao usuário
          por um canal seguro. Ele pode alterá-la depois em /conta.
        </p>
      </div>

      <div className="pt-4 border-t border-neutral-100">
        <label className="block font-bold text-sm mb-2">Plano</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setPlano("monthly")}
            className={`p-4 rounded-xl border-2 text-left ${
              plano === "monthly"
                ? "border-brand-500 bg-brand-50"
                : "border-neutral-200 hover:border-neutral-300"
            }`}
          >
            <div className="font-black">Mensal</div>
            <div className="text-xs text-neutral-600">R$ 197 · com expiração</div>
          </button>
          <button
            type="button"
            onClick={() => setPlano("lifetime")}
            className={`p-4 rounded-xl border-2 text-left ${
              plano === "lifetime"
                ? "border-brand-500 bg-brand-50"
                : "border-neutral-200 hover:border-neutral-300"
            }`}
          >
            <div className="font-black">Vitalício</div>
            <div className="text-xs text-neutral-600">R$ 297 · sem expiração</div>
          </button>
        </div>
      </div>

      {plano === "monthly" && (
        <div>
          <label className="block font-bold text-sm mb-1">
            Duração do acesso (dias)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              min={1}
              max={3650}
              value={dias}
              onChange={(e) => setDias(Number(e.target.value))}
              className="w-32 px-4 py-3 rounded-xl border border-neutral-300"
            />
            <div className="flex gap-1 flex-wrap">
              {[30, 60, 90, 180, 365].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDias(d)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    dias === d
                      ? "bg-black text-white"
                      : "bg-neutral-100 hover:bg-neutral-200"
                  }`}
                >
                  {d}d
                </button>
              ))}
            </div>
          </div>
          <p className="text-xs text-neutral-500 mt-2">
            Expira em: <span className="font-bold">{dataExpiracaoCalc}</span>
          </p>
        </div>
      )}

      {plano === "lifetime" && (
        <div className="p-4 rounded-xl bg-brand-50 border border-brand-200 text-sm">
          <p className="font-bold text-brand-900 mb-1">🎁 Acesso vitalício</p>
          <p className="text-brand-800">
            Sem data de expiração. Acesso permanente enquanto a conta existir.
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white py-4 rounded-full font-bold hover:bg-neutral-800 disabled:opacity-50"
      >
        {loading ? "Criando usuário..." : "Criar usuário e liberar acesso"}
      </button>
    </form>
  );
}
