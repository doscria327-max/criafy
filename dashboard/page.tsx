"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

type Produto = {
  slug: string;
  nome: string;
  promessa: string;
  publico: string;
  nicho: string;
  nichoId: string;
  preco: number;
  formato: string;
  linkCheckout?: string;
  estrutura: string[];
  beneficios: string[];
  bonus: string[];
  headline: string;
  subheadline: string;
  copyVendas: string;
  garantia: string;
  faq: { q: string; a: string }[];
  grupos: { nome: string; plataforma: string; link: string; risco: string; motivo: string }[];
  copies: { titulo: string; texto: string }[];
};

export default function Dashboard() {
  const { data: session, status: authStatus } = useSession();
  const router = useRouter();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [statusAcesso, setStatusAcesso] = useState<string>("");

  const [nicho, setNicho] = useState("");
  const [publico, setPublico] = useState("");
  const [formato, setFormato] = useState("ebook");
  const [preco, setPreco] = useState(47);
  const [linkCheckout, setLinkCheckout] = useState("");

  const [produto, setProduto] = useState<Produto | null>(null);
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    if (authStatus === "unauthenticated") {
      router.push("/login?callbackUrl=/dashboard");
      return;
    }
    if (session?.user) {
      const sub = (session.user as any).subscriptionStatus;
      setStatusAcesso(sub);
    }
  }, [authStatus, session, router]);

  async function criarProduto(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setLoading(true);
    try {
      const r = await fetch("/api/criar-produto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nicho, publico, formato, preco, linkCheckout }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "Erro");
      setProduto(data.produto);
      setToken(data.token);
      setStep(2);
    } catch (err: any) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function acharGrupos() {
    if (!produto) return;
    setLoading(true);
    setErro(null);
    try {
      const r = await fetch("/api/achar-grupos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ produto }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "Erro");
      setProduto(data.produto);
      setToken(data.token);
      setStep(3);
    } catch (err: any) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function gerarCopy() {
    if (!produto) return;
    setLoading(true);
    setErro(null);
    try {
      const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
      const r = await fetch("/api/gerar-copy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ produto, baseUrl }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "Erro");
      setProduto(data.produto);
      setToken(data.token);
      setStep(4);
    } catch (err: any) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function baixarPdf() {
    if (!produto) return;
    try {
      const r = await fetch("/api/gerar-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ produto }),
      });
      if (!r.ok) throw new Error("Erro");
      const blob = await r.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${produto.slug}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      alert("Não foi possível gerar o PDF agora.");
    }
  }

  function reset() {
    setProduto(null);
    setToken("");
    setNicho("");
    setPublico("");
    setLinkCheckout("");
    setStep(1);
    setErro(null);
  }

  const paginaUrl = token && produto ? `/produto/${produto.slug}?d=${token}` : "";

  // Estados de loading e sem acesso
  if (authStatus === "loading") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-neutral-50">
        <p className="text-neutral-500">Carregando...</p>
      </main>
    );
  }

  const temAcesso = statusAcesso === "active_monthly" || statusAcesso === "active_lifetime";

  if (!temAcesso && authStatus === "authenticated") {
    return (
      <main className="min-h-screen bg-neutral-50">
        <header className="bg-white border-b border-neutral-200 py-4 px-6">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <Link href="/" className="text-xl font-black">
              Cria<span className="gradient-text">fy</span>
            </Link>
            <div className="flex items-center gap-4">
              {(session?.user as any)?.role === "admin" && (
                <Link
                  href="/admin"
                  className="text-sm font-bold text-brand-600 hover:text-brand-800"
                >
                  Painel admin
                </Link>
              )}
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-sm text-neutral-600 hover:text-brand-600"
              >
                Sair
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <div className="text-6xl mb-6">🔒</div>
          <h1 className="text-4xl font-black mb-4">Assine pra começar</h1>
          <p className="text-lg text-neutral-600 mb-8 max-w-xl mx-auto">
            Você ainda não tem um plano ativo. Escolha um plano pra desbloquear o Criafy
            e começar a criar produtos ilimitados.
          </p>
          <Link
            href="/planos"
            className="inline-block bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-neutral-800"
          >
            Ver planos →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-50">
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-black">
            Cria<span className="gradient-text">fy</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="text-sm text-neutral-500">Passo {step} de 5</div>
            {(session?.user as any)?.role === "admin" && (
              <Link
                href="/admin"
                className="text-sm font-bold text-brand-600 hover:text-brand-800"
              >
                Painel admin
              </Link>
            )}
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-sm text-neutral-600 hover:text-brand-600"
            >
              Sair
            </button>
          </div>
        </div>
        <div className="h-1 bg-neutral-100">
          <div
            className="h-full bg-gradient-to-r from-brand-600 to-pink-500 transition-all"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {erro && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-sm">
            {erro}
          </div>
        )}

        {step === 1 && (
          <div>
            <h1 className="text-4xl font-black mb-3">Vamos criar seu produto</h1>
            <p className="text-neutral-600 mb-8">
              Responda algumas perguntas. O motor de geração cuida do resto.
            </p>

            <form onSubmit={criarProduto} className="bg-white p-8 rounded-3xl border border-neutral-200 space-y-6">
              <div>
                <label className="block font-bold mb-2">Qual é o seu nicho?</label>
                <input
                  required
                  value={nicho}
                  onChange={(e) => setNicho(e.target.value)}
                  placeholder="ex: emagrecimento, finanças, relacionamento, culinária..."
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-brand-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold mb-2">Quem é o público?</label>
                <textarea
                  required
                  value={publico}
                  onChange={(e) => setPublico(e.target.value)}
                  rows={3}
                  placeholder="ex: mulheres 30-45 anos que já tentaram várias dietas..."
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-brand-500 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-2">Formato</label>
                  <select
                    value={formato}
                    onChange={(e) => setFormato(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300"
                  >
                    <option value="ebook">Ebook</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-2">Preço (R$)</label>
                  <input
                    type="number"
                    min={7}
                    value={preco}
                    onChange={(e) => setPreco(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300"
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold mb-2">Link do checkout Applyfy</label>
                <input
                  type="url"
                  value={linkCheckout}
                  onChange={(e) => setLinkCheckout(e.target.value)}
                  placeholder="https://checkout.applyfy.com.br/..."
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300"
                />
                <div className="mt-3 p-4 rounded-xl bg-brand-50 border border-brand-200 text-sm">
                  <p className="font-bold text-brand-900 mb-1">Ainda não tem conta Applyfy?</p>
                  <a
                    href="https://app.applyfy.com.br/auth/register?code=9OOX7XKB"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-brand-700 hover:underline"
                  >
                    Criar minha conta Applyfy grátis →
                  </a>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-4 rounded-full font-bold hover:bg-neutral-800 disabled:opacity-50"
              >
                {loading ? "Criando..." : "Criar meu produto →"}
              </button>
            </form>
          </div>
        )}

        {step === 2 && produto && (
          <div>
            <div className="mb-6 flex items-center gap-2 text-green-700 font-semibold">
              <span className="text-2xl">✓</span> Produto criado
            </div>
            <h1 className="text-4xl font-black mb-3">{produto.nome}</h1>
            <p className="text-xl text-neutral-600 mb-8">{produto.promessa}</p>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <Card title="Estrutura">
                <ul className="space-y-2 text-sm">
                  {produto.estrutura.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
              </Card>
              <Card title="Benefícios">
                <ul className="space-y-2 text-sm">
                  {produto.beneficios.map((b, i) => <li key={i}>✓ {b}</li>)}
                </ul>
              </Card>
            </div>

            <Card title="Bônus">
              <ul className="space-y-2 text-sm">
                {produto.bonus.map((b, i) => <li key={i}>🎁 {b}</li>)}
              </ul>
            </Card>

            <button
              onClick={baixarPdf}
              className="mt-4 w-full bg-brand-600 text-white py-4 rounded-full font-bold hover:bg-brand-700"
            >
              📥 Baixar PDF do ebook
            </button>

            <button
              onClick={acharGrupos}
              disabled={loading}
              className="w-full mt-3 bg-black text-white py-4 rounded-full font-bold hover:bg-neutral-800 disabled:opacity-50"
            >
              {loading ? "Achando grupos..." : "Próximo: achar grupos →"}
            </button>
          </div>
        )}

        {step === 3 && produto && (
          <div>
            <div className="mb-6 flex items-center gap-2 text-green-700 font-semibold">
              <span className="text-2xl">✓</span> {produto.grupos.length} grupos encontrados
            </div>
            <h1 className="text-4xl font-black mb-8">Onde seu público está</h1>
            <div className="space-y-3 mb-8">
              {produto.grupos.map((g, i) => (
                <div key={i} className="p-5 bg-white rounded-2xl border border-neutral-200">
                  <p className="text-xs font-bold text-brand-700 mb-1">{g.plataforma}</p>
                  <p className="font-bold">{g.nome}</p>
                  <p className="text-xs text-neutral-600 mt-2">{g.motivo}</p>
                </div>
              ))}
            </div>
            <button
              onClick={gerarCopy}
              disabled={loading}
              className="w-full bg-black text-white py-4 rounded-full font-bold hover:bg-neutral-800 disabled:opacity-50"
            >
              {loading ? "Escrevendo..." : "Próximo: gerar copies →"}
            </button>
          </div>
        )}

        {step === 4 && produto && (
          <div>
            <div className="mb-6 flex items-center gap-2 text-green-700 font-semibold">
              <span className="text-2xl">✓</span> 10 copies prontas
            </div>
            <h1 className="text-4xl font-black mb-8">Ofertas prontas</h1>
            <div className="space-y-4 mb-8">
              {produto.copies.map((c, i) => (
                <div key={i} className="p-5 bg-white rounded-2xl border border-neutral-200">
                  <p className="font-bold text-sm text-brand-700 mb-3">{c.titulo}</p>
                  <p className="text-sm whitespace-pre-wrap">{c.texto}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => setStep(5)}
              className="w-full bg-black text-white py-4 rounded-full font-bold hover:bg-neutral-800"
            >
              Próximo: ver minha página →
            </button>
          </div>
        )}

        {step === 5 && produto && (
          <div className="text-center">
            <div className="text-6xl mb-6">🚀</div>
            <h1 className="text-4xl font-black mb-4">Sua página está no ar!</h1>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <Link
                href={paginaUrl}
                target="_blank"
                className="bg-black text-white px-8 py-4 rounded-full font-bold"
              >
                Ver página →
              </Link>
              <button
                onClick={baixarPdf}
                className="bg-brand-600 text-white px-8 py-4 rounded-full font-bold"
              >
                📥 Baixar PDF
              </button>
              <button
                onClick={reset}
                className="border border-neutral-300 px-8 py-4 rounded-full font-bold hover:bg-neutral-50"
              >
                Criar outro
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-neutral-200 mb-4">
      <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-3">{title}</p>
      {children}
    </div>
  );
}
