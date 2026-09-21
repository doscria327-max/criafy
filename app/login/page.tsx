"use client";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email,
        password: senha,
        redirect: false,
      });
      if (res?.error) {
        setErro("Email ou senha incorretos.");
      } else {
        const callback = params.get("callbackUrl") || "/dashboard";
        router.push(callback);
        router.refresh();
      }
    } catch {
      setErro("Erro ao entrar. Tente novamente.");
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
          <h1 className="text-3xl font-black mb-2">Entrar</h1>
          <p className="text-neutral-600 mb-6 text-sm">Acesse sua conta Criafy.</p>

          {erro && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm">
              {erro}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
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
              <label className="block font-bold mb-1 text-sm">Senha</label>
              <input
                required
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-brand-500 focus:outline-none"
              />
            </div>

            <div className="text-right">
              <Link
                href="/esqueci-senha"
                className="text-sm text-brand-600 hover:underline"
              >
                Esqueci minha senha
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-full font-bold hover:bg-neutral-800 transition disabled:opacity-50"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <p className="text-center text-sm text-neutral-600 mt-6">
            Não tem conta?{" "}
            <Link href="/cadastro" className="text-brand-600 font-semibold hover:underline">
              Criar uma conta
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-neutral-50" />}>
      <LoginForm />
    </Suspense>
  );
}
