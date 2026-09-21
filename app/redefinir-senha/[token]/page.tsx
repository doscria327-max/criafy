"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function RedefinirSenhaPage() {
  const params = useParams<{ token: string }>();
  const router = useRouter();
  const [senha, setSenha] = useState("");
  const [conf, setConf] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    if (senha !== conf) return setErro("Senhas não conferem.");
    if (senha.length < 8) return setErro("Senha precisa ter 8+ caracteres.");

    setLoading(true);
    try {
      const r = await fetch("/api/redefinir-senha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: params.token, password: senha }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "Erro");
      setOk(true);
      setTimeout(() => router.push("/login"), 2000);
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
          {ok ? (
            <div className="text-center">
              <div className="text-5xl mb-4">✅</div>
              <h1 className="text-2xl font-black mb-2">Senha redefinida!</h1>
              <p className="text-neutral-600 text-sm">Você será redirecionado...</p>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-black mb-6">Nova senha</h1>
              {erro && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm">
                  {erro}
                </div>
              )}
              <form onSubmit={onSubmit} className="space-y-4">
                <input
                  required
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Nova senha"
                  minLength={8}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300"
                />
                <input
                  required
                  type="password"
                  value={conf}
                  onChange={(e) => setConf(e.target.value)}
                  placeholder="Confirmar nova senha"
                  minLength={8}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black text-white py-3 rounded-full font-bold hover:bg-neutral-800 disabled:opacity-50"
                >
                  {loading ? "Salvando..." : "Redefinir senha"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
