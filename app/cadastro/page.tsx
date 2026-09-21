"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function CadastroPage() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [senha, setSenha] = useState("");
  const [conf, setConf] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);

    if (senha !== conf) {
      setErro("As senhas não conferem.");
      return;
    }
    if (senha.length < 8) {
      setErro("A senha precisa ter pelo menos 8 caracteres.");
      return;
    }

    setLoading(true);
    try {
      const r = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nome, email, phone, password: senha }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "Erro no cadastro");

      // Login automático
      const res = await signIn("credentials", {
        email,
        password: senha,
        redirect: false,
      });

      if (res?.error) throw new Error("Cadastro criado, mas login falhou. Tente entrar manualmente.");

      router.push("/planos");
    } catch (err: any) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-neutral-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="block text-center text-2xl font-black mb-8">
          Cria<span className="gradient-text">fy</span>
        </Link>

        <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm">
          <h1 className="text-3xl font-black mb-2">Criar conta</h1>
          <p className="text-neutral-600 mb-6 text-sm">
            É rápido — leva 30 segundos.
          </p>

          {erro && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm">
              {erro}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block font-bold mb-1 text-sm">Nome completo</label>
              <input
                required
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold mb-1 text-sm">Email</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold mb-1 text-sm">Telefone (opcional)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(11) 99999-9999"
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold mb-1 text-sm">Senha</label>
              <input
                required
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                minLength={8}
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-brand-500 focus:outline-none"
              />
              <p className="text-xs text-neutral-500 mt-1">Mínimo 8 caracteres</p>
            </div>
            <div>
              <label className="block font-bold mb-1 text-sm">Confirmar senha</label>
              <input
                required
                type="password"
                value={conf}
                onChange={(e) => setConf(e.target.value)}
                minLength={8}
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-brand-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-full font-bold hover:bg-neutral-800 transition disabled:opacity-50"
            >
              {loading ? "Criando conta..." : "Criar minha conta"}
            </button>
          </form>

          <p className="text-center text-sm text-neutral-600 mt-6">
            Já tem conta?{" "}
            <Link href="/login" className="text-brand-600 font-semibold hover:underline">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
