"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getFingerprint } from "@/lib/fingerprint";

type Produto = {
  slug: string;
  nome: string;
  promessa: string;
  publico: string;
  nicho: string;
  nichoId: string;
  preco: number;
  formato: string;
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
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [bloqueado, setBloqueado] = useState(false);
  const [checando, setChecando] = useState(true);

  const [nicho, setNicho] = useState("");
  const [publico, setPublico] = useState("");
  const [formato, setFormato] = useState("ebook");
  const [preco, setPreco] = useState(47);
  const [linkCheckout, setLinkCheckout] = useState("");

  const [produto, setProduto] = useState<Produto | null>(null);
  const [token, setToken] = useState<string>("");

  // ============ CHECAGEM DE USO GRÁTIS ============
  useEffect(() => {
    const check = async () => {
      try {
        // Camada 1: localStorage
        const local = localStorage.getItem("criafy_usado");
        if (local === "1") {
          setBloqueado(true);
          setChecando(false);
          return;
        }

        // Camada 2: fingerprint + cookie + IP no servidor
        const fp = getFingerprint();
        const r = await fetch("/api/verificar-uso", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fingerprint: fp }),
        });
        const data = await r.json();
        if (data.bloqueado) {
          localStorage.setItem("criafy_usado", "1");
          setBloqueado(true);
        }
      } catch {
        // Se der erro na verificação, deixa passar (não trava a UX)
      } finally {
        setChecando(false);
      }
    };
    check();
  }, []);

  async function criarProduto(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setLoading(true);
    try {
      const fingerprint = getFingerprint();
      const r = await fetch("/api/criar-produto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nicho, publico, formato, preco, linkCheckout, fingerprint }),
      });
      const data = await r.json();
      if (r.status === 402) {
        // Limite atingido no server
        localStorage.setItem("criafy_usado", "1");
        setBloqueado(true);
        return;
      }
      if (!r.ok) throw new Error(data.error || "Erro");
      setProduto(data.produto);
      setToken(data.token);
      // Marca no localStorage que já criou o produto grátis
      localStorage.setItem("criafy_usado", "1");
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

  function reset() {
    setProduto(null);
    setToken("");
    setNicho("");
    setPublico("");
    setLinkCheckout("");
    setStep(1);
    setErro(null);
  }

  async function baixarPdf() {
    if (!produto) return;
    setErro(null);
    try {
      const r = await fetch("/api/gerar-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ produto }),
      });
      if (!r.ok) {
        const t = await r.text();
        throw new Error("Falha ao gerar PDF: " + t.slice(0, 200));
      }
      const blob = await r.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${produto.slug}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err: any) {
      setErro(err.message);
    }
  }

  const paginaUrl = token && produto ? `/produto/${produto.slug}?d=${token}` : "";

  if (checando) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-neutral-50">
        <p className="text-neutral-500">Carregando...</p>
      </main>
    );
  }

  if (bloqueado) {
    return <TelaBloqueada />;
  }

  return (
    <main className="min-h-screen bg-neutral-50">
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-black">
            Cria<span className="gradient-text">fy</span>
          </Link>
          <div className="text-sm text-neutral-500">Passo {step} de 5</div>
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
              Responda duas perguntas. O motor de geração cuida do resto — em segundos.
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
                <p className="text-xs text-neutral-500 mt-2">
                  Nichos disponíveis: emagrecimento, finanças, relacionamento, carreira,
                  marketing digital, espiritualidade, culinária, estudos/concursos. Outros
                  nichos usam o modelo genérico.
                </p>
              </div>

              <div>
                <label className="block font-bold mb-2">Quem é o público?</label>
                <textarea
                  required
                  value={publico}
                  onChange={(e) => setPublico(e.target.value)}
                  rows={3}
                  placeholder="ex: mulheres 30-45 anos que já tentaram várias dietas e nunca conseguiram manter..."
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
                  <p className="text-xs text-neutral-500 mt-1">
                    Por enquanto só ebook — outros formatos em breve.
                  </p>
                </div>
                <div>
                  <label className="block font-bold mb-2">Preço sugerido (R$)</label>
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
                <label className="block font-bold mb-2">
                  Link do seu checkout na Applyfy
                </label>
                <input
                  type="url"
                  value={linkCheckout}
                  onChange={(e) => setLinkCheckout(e.target.value)}
                  placeholder="https://checkout.applyfy.com.br/checkout/..."
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-brand-500 focus:outline-none"
                />
                <div className="mt-3 p-4 rounded-xl bg-brand-50 border border-brand-200 text-sm">
                  <p className="font-bold text-brand-900 mb-1">
                    Ainda não tem conta na Applyfy?
                  </p>
                  <p className="text-brand-800 mb-2">
                    A Applyfy é a plataforma que vai receber os pagamentos das suas vendas.
                    É rápido, gratuito e você já sai com o link do checkout pronto.
                  </p>
                  <a
                    href="https://app.applyfy.com.br/auth/register?code=9OOX7XKB"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-brand-700 hover:underline"
                  >
                    Criar minha conta Applyfy grátis →
                  </a>
                </div>
                <p className="text-xs text-neutral-500 mt-2">
                  Se você deixar em branco, os botões de compra da sua página vão apenas
                  rolar até o preço — sem redirecionar pra checkout.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-4 rounded-full font-bold hover:bg-neutral-800 transition disabled:opacity-50"
              >
                {loading ? "Criando seu produto..." : "Criar meu produto →"}
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

            <Card title="Bônus inclusos">
              <ul className="space-y-2 text-sm">
                {produto.bonus.map((b, i) => <li key={i}>🎁 {b}</li>)}
              </ul>
            </Card>

            <Card title="Headline da página">
              <p className="text-2xl font-bold mb-2">{produto.headline}</p>
              <p className="text-neutral-600">{produto.subheadline}</p>
            </Card>

            <button
              onClick={baixarPdf}
              className="mt-4 w-full block text-center bg-brand-600 text-white py-4 rounded-full font-bold hover:bg-brand-700 transition"
            >
              📥 Baixar PDF do ebook
            </button>

            <button
              onClick={acharGrupos}
              disabled={loading}
              className="w-full mt-3 bg-black text-white py-4 rounded-full font-bold hover:bg-neutral-800 disabled:opacity-50"
            >
              {loading ? "Achando grupos ideais..." : "Próximo: achar grupos →"}
            </button>
          </div>
        )}

        {step === 3 && produto && (
          <div>
            <div className="mb-6 flex items-center gap-2 text-green-700 font-semibold">
              <span className="text-2xl">✓</span> {produto.grupos.length} grupos encontrados
            </div>
            <h1 className="text-4xl font-black mb-8">Onde seu público está agora</h1>

            <div className="space-y-3 mb-8">
              {produto.grupos.map((g, i) => (
                <div key={i} className="p-5 bg-white rounded-2xl border border-neutral-200">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-brand-100 text-brand-700">
                      {g.plataforma}
                    </span>
                    <RiscoBadge risco={g.risco} />
                  </div>
                  <p className="font-bold">{g.nome}</p>
                  <p className="text-xs font-mono text-neutral-500 mt-1">{g.link}</p>
                  <p className="text-xs text-neutral-600 mt-2 italic">{g.motivo}</p>
                </div>
              ))}
            </div>

            <button
              onClick={gerarCopy}
              disabled={loading}
              className="w-full bg-black text-white py-4 rounded-full font-bold hover:bg-neutral-800 disabled:opacity-50"
            >
              {loading ? "Escrevendo as ofertas..." : "Próximo: gerar copies →"}
            </button>
          </div>
        )}

        {step === 4 && produto && (
          <div>
            <div className="mb-6 flex items-center gap-2 text-green-700 font-semibold">
              <span className="text-2xl">✓</span> 10 copies prontas pra postar
            </div>
            <h1 className="text-4xl font-black mb-8">Ofertas prontas</h1>

            <div className="space-y-4 mb-8">
              {produto.copies.map((c, i) => (
                <CopyCard key={i} titulo={c.titulo} texto={c.texto} />
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
            <p className="text-neutral-600 mb-8">
              Página profissional gerada. É só divulgar.
            </p>

            <div className="bg-white p-6 rounded-2xl border border-neutral-200 mb-6">
              <p className="text-xs text-neutral-500 mb-1">Link da página</p>
              <p className="font-mono text-brand-600 break-all text-xs">
                {typeof window !== "undefined" ? `${window.location.origin}${paginaUrl}` : paginaUrl}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={paginaUrl}
                target="_blank"
                className="bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-neutral-800"
              >
                Ver página →
              </a>
              <button
                onClick={baixarPdf}
                className="bg-brand-600 text-white px-8 py-4 rounded-full font-bold hover:bg-brand-700"
              >
                📥 Baixar PDF
              </button>
              <button
                onClick={() => setBloqueado(true)}
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

function RiscoBadge({ risco }: { risco: string }) {
  const lower = risco.toLowerCase();
  const nivel = lower.startsWith("baixo")
    ? { label: "Baixo risco", color: "bg-green-100 text-green-700" }
    : lower.startsWith("medio") || lower.startsWith("médio")
    ? { label: "Médio risco", color: "bg-yellow-100 text-yellow-700" }
    : { label: "Alto risco", color: "bg-red-100 text-red-700" };
  return <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${nivel.color}`}>{nivel.label}</span>;
}

function TelaBloqueada() {
  return (
    <main className="min-h-screen bg-neutral-50">
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-black">
            Cria<span className="gradient-text">fy</span>
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 rounded-full px-4 py-1.5 text-xs font-bold mb-6">
            🔒 TESTE GRÁTIS UTILIZADO
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Você já testou o Criafy.<br />
            <span className="gradient-text">Hora de destravar tudo.</span>
          </h1>
          <p className="text-xl text-neutral-600 max-w-xl mx-auto">
            Assine agora e crie produtos ilimitados, com todos os nichos, copies e páginas
            profissionais que quiser — quando quiser.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* MENSAL */}
          <div className="p-8 rounded-3xl bg-white border border-neutral-200">
            <h3 className="text-2xl font-black mb-1">Mensal</h3>
            <p className="text-sm text-neutral-600 mb-6">
              Comece agora, sem compromisso longo.
            </p>
            <div className="mb-6">
              <span className="text-5xl font-black">R$ 197</span>
              <span className="text-sm text-neutral-500"> / mês</span>
            </div>
            <ul className="space-y-3 mb-8 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Produtos ilimitados</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Todos os nichos disponíveis</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>PDF do ebook gerado automaticamente</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Cancele quando quiser</span>
              </li>
            </ul>
            <a
              href="https://checkout.applyfy.com.br/checkout/cmubahyei00da01olqc4ksrtk?offer=HRFF64Q"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-black text-white py-3 rounded-full font-semibold hover:bg-neutral-800 transition"
            >
              Assinar plano mensal
            </a>
          </div>

          {/* VITALÍCIO */}
          <div className="p-8 rounded-3xl bg-black text-white border-2 border-brand-500 shadow-2xl md:scale-105">
            <span className="inline-block bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
              MAIS ESCOLHIDO
            </span>
            <h3 className="text-2xl font-black mb-1">Vitalício</h3>
            <p className="text-sm text-neutral-400 mb-6">
              Pague uma vez, use pra sempre.
            </p>
            <div className="mb-6">
              <span className="text-5xl font-black">R$ 297</span>
              <span className="text-sm text-neutral-400"> pagamento único</span>
            </div>
            <ul className="space-y-3 mb-8 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Tudo do plano mensal</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Acesso vitalício — sem renovação</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Todas as atualizações futuras inclusas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Economia de ~8 meses do plano mensal</span>
              </li>
            </ul>
            <a
              href="https://checkout.applyfy.com.br/checkout/cmubahyei00da01olqc4ksrtk?offer=A3ZSAEW"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-white text-black py-3 rounded-full font-semibold hover:bg-neutral-100 transition"
            >
              Garantir acesso vitalício
            </a>
          </div>
        </div>

        <div className="text-center text-sm text-neutral-500">
          <p className="mb-2">
            Já é assinante?{" "}
            <a
              href="mailto:contato@criafy.site"
              className="text-brand-600 font-semibold hover:underline"
            >
              Entre em contato pra liberar o acesso
            </a>
          </p>
          <p>
            <Link href="/" className="hover:text-brand-600">
              ← Voltar pra página inicial
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

function CopyCard({ titulo, texto }: { titulo: string; texto: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="p-5 bg-white rounded-2xl border border-neutral-200">
      <div className="flex justify-between items-start gap-3 mb-3">
        <p className="font-bold text-sm text-brand-700">{titulo}</p>
        <button
          onClick={() => {
            navigator.clipboard.writeText(texto);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="text-xs font-bold px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200"
        >
          {copied ? "✓ Copiado" : "Copiar"}
        </button>
      </div>
      <p className="text-sm text-neutral-700 whitespace-pre-wrap">{texto}</p>
    </div>
  );
}
