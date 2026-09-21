"use client";
import { useState } from "react";
import Link from "next/link";

export default function EsqueciSenhaPage() {
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/esqueci-senha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setEnviado(true);
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
          {enviado ? (
            <>
              <div className="text-5xl mb-4 text-center">📬</div>
              <h1 className="text-2xl font-black mb-2 text-center">
                Verifique seu email
              </h1>
              <p className="text-neutral-600 text-center text-sm">
                Se existe uma conta com esse email, enviamos um link pra redefinir sua senha.
                O link expira em 1 hora.
              </p>
              <Link
                href="/login"
                className="mt-6 block text-center text-brand-600 font-semibold hover:underline"
              >
                Voltar pro login
              </Link>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-black mb-2">Redefinir senha</h1>
              <p className="text-neutral-600 mb-6 text-sm">
                Informa o email da sua conta e a gente manda o link.
              </p>
              <form onSubmit={onSubmit} className="space-y-4">
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-brand-500 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black text-white py-3 rounded-full font-bold hover:bg-neutral-800 transition disabled:opacity-50"
                >
                  {loading ? "Enviando..." : "Enviar link de redefinição"}
                </button>
              </form>
              <Link
                href="/login"
                className="mt-6 block text-center text-sm text-neutral-600 hover:text-brand-600"
              >
                ← Voltar pro login
              </Link>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
