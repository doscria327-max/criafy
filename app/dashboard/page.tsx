"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { decodeProduto } from "@/lib/encoding";
import type { Produto } from "@/lib/storage";

export default function ProdutoPage() {
  const params = useSearchParams();
  const [p, setP] = useState<Produto | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const d = params.get("d");
    if (d) {
      const dec = decodeProduto(d);
      setP(dec);
    }
    setReady(true);
  }, [params]);

  async function baixarPdf() {
    if (!p) return;
    try {
      const r = await fetch("/api/gerar-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ produto: p }),
      });
      if (!r.ok) throw new Error("Falha ao gerar PDF");
      const blob = await r.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${p.slug}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      alert("Não foi possível gerar o PDF agora. Tente novamente em instantes.");
    }
  }

  if (!ready) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-neutral-500">Carregando...</p>
      </main>
    );
  }

  if (!p) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center px-6">
          <p className="text-6xl mb-4">🤷</p>
          <h1 className="text-4xl font-black mb-2">Página não encontrada</h1>
          <p className="text-neutral-600 mb-8">
            O link parece incompleto. Crie um produto no dashboard pra gerar uma página.
          </p>
          <Link
            href="/dashboard"
            className="inline-block bg-black text-white px-8 py-4 rounded-full font-bold"
          >
            Criar produto →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* HERO */}
      <section className="relative bg-neutral-950 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-30" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="inline-block bg-brand-500/20 border border-brand-500/40 rounded-full px-4 py-1.5 text-xs font-bold text-brand-300 mb-6">
            {p.nicho.toUpperCase()}
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.05] mb-6">
            {p.headline}
          </h1>
          <p className="text-xl text-neutral-300 mb-10 max-w-2xl mx-auto">{p.subheadline}</p>
          <a
            href="#comprar"
            className="inline-block bg-white text-black px-10 py-5 rounded-full text-lg font-black hover:bg-neutral-100 transition"
          >
            QUERO AGORA — R$ {p.preco}
          </a>
          <p className="text-xs text-neutral-500 mt-4">{p.garantia}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-sm font-bold text-brand-600 uppercase tracking-widest mb-4">
            Por que isso funciona
          </p>
          <div className="prose prose-lg max-w-none text-neutral-800 whitespace-pre-wrap">
            {p.copyVendas}
          </div>
        </div>
      </section>

      <section className="py-20 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12">
            O que você recebe
          </h2>
          <div className="space-y-3">
            {p.estrutura.map((mod, i) => (
              <div key={i} className="p-5 bg-white rounded-2xl border border-neutral-200 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center font-black flex-shrink-0">
                  {i + 1}
                </div>
                <p className="font-semibold text-neutral-800">{mod}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12">Benefícios reais</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {p.beneficios.map((b, i) => (
              <div key={i} className="p-5 rounded-2xl border border-neutral-200 flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <p className="font-medium">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {p.bonus && p.bonus.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-brand-50 to-pink-50">
          <div className="max-w-3xl mx-auto px-6">
            <p className="text-sm font-bold text-brand-600 uppercase tracking-widest text-center mb-3">
              Bônus especiais
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-center mb-12">
              Além do curso principal, você recebe:
            </h2>
            <div className="space-y-4">
              {p.bonus.map((b, i) => (
                <div key={i} className="p-5 bg-white rounded-2xl border border-brand-200 flex items-center gap-4">
                  <span className="text-3xl">🎁</span>
                  <p className="font-semibold">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-neutral-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-3">Preview</p>
          <h3 className="text-2xl font-black mb-6">Baixe uma amostra do material</h3>
          <button
            onClick={baixarPdf}
            className="inline-block bg-white border-2 border-neutral-900 text-neutral-900 px-8 py-4 rounded-full font-bold hover:bg-neutral-900 hover:text-white transition"
          >
            📥 Baixar PDF de amostra
          </button>
        </div>
      </section>

      <section id="comprar" className="py-24 bg-black text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Você pode continuar tentando sozinho.<br />
            <span className="gradient-text">Ou pode começar agora.</span>
          </h2>
          <p className="text-xl text-neutral-400 mb-8">{p.subheadline}</p>

          <div className="inline-block bg-white text-black rounded-3xl p-8 mb-6">
            <p className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-2">
              De R$ {p.preco * 3}
            </p>
            <div className="text-6xl font-black mb-2">R$ {p.preco}</div>
            <p className="text-sm text-neutral-600 mb-6">Pagamento único</p>
            <button className="bg-black text-white px-10 py-4 rounded-full font-black hover:bg-neutral-800">
              QUERO ACESSO AGORA →
            </button>
          </div>

          <p className="text-sm text-neutral-500">🔒 {p.garantia}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12">
            Perguntas frequentes
          </h2>
          <div className="space-y-3">
            {p.faq.map((f, i) => (
              <details key={i} className="group bg-neutral-50 rounded-2xl p-6 cursor-pointer">
                <summary className="flex justify-between items-center font-bold list-none">
                  {f.q}
                  <span className="text-brand-600 group-open:rotate-45 transition text-2xl">+</span>
                </summary>
                <p className="mt-3 text-neutral-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-10 bg-neutral-950 text-neutral-500 text-sm text-center">
        <p className="mb-2">
          Página gerada com{" "}
          <Link href="/" className="text-brand-400 hover:underline font-bold">
            Criafy
          </Link>
        </p>
        <p className="text-xs">© {new Date().getFullYear()} · Todos os direitos reservados</p>
      </footer>
    </main>
  );
}
