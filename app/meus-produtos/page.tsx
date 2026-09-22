"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

type Produto = {
  id: string;
  slug: string;
  nome: string;
  promessa: string;
  publico: string;
  nicho: string;
  preco: number;
  token: string;
  linkCheckout: string | null;
  createdAt: string;
};

export default function MeusProdutosPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [editandoId, setEditandoId] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/meus-produtos");
      return;
    }
    if (status === "authenticated") carregar();
  }, [status, router]);

  async function carregar() {
    const r = await fetch("/api/produtos");
    if (!r.ok) return;
    const data = await r.json();
    setProdutos(data.produtos || []);
    setLoading(false);
  }

  async function baixarPdf(id: string, slug: string) {
    try {
      const r = await fetch("/api/gerar-pdf-por-id", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!r.ok) throw new Error();
      const blob = await r.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${slug}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      alert("Erro ao gerar PDF");
    }
  }

  async function excluir(id: string) {
    if (!confirm("Excluir esse produto? Essa ação é permanente.")) return;
    await fetch(`/api/produtos/${id}`, { method: "DELETE" });
    carregar();
  }

  async function salvarLink(id: string, link: string) {
    const r = await fetch(`/api/produtos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ linkCheckout: link }),
    });
    const data = await r.json();
    if (!r.ok) {
      alert("Erro: " + (data.error || "não foi possível salvar"));
      return;
    }
    setEditandoId(null);
    carregar();
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-neutral-50">
        <p className="text-neutral-500">Carregando...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-50">
      <UserNav />

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8 flex items-start justify-between flex-wrap gap-4">
          <div>
            <p className="text-sm font-bold text-brand-600 uppercase tracking-widest mb-2">
              Seu histórico
            </p>
            <h1 className="text-4xl font-black">Meus infoprodutos</h1>
            <p className="text-neutral-600 mt-2">
              Todos os produtos que você criou no Criafy. Baixe o PDF, edite o
              link de checkout ou compartilhe a página de vendas.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-neutral-800"
          >
            + Criar novo produto
          </Link>
        </div>

        {produtos.length === 0 ? (
          <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-black mb-2">
              Você ainda não criou nenhum produto
            </h3>
            <p className="text-neutral-600 mb-6">
              Crie seu primeiro infoproduto em menos de 1 minuto.
            </p>
            <Link
              href="/dashboard"
              className="inline-block bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-neutral-800"
            >
              Criar meu primeiro produto →
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {produtos.map((p) => {
              const paginaUrl = `/p/${p.id}`;
              const temLink = p.linkCheckout && p.linkCheckout.trim();
              return (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-neutral-200 p-6 hover:shadow-md transition"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs font-bold bg-brand-100 text-brand-700 px-2 py-1 rounded-full">
                      {p.nicho.toUpperCase()}
                    </span>
                    <span className="text-xs text-neutral-400">
                      {new Date(p.createdAt).toLocaleDateString("pt-BR")}
                    </span>
                  </div>

                  <h3 className="font-black text-lg mb-1 line-clamp-1">{p.nome}</h3>
                  <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
                    {p.promessa}
                  </p>

                  <div className="text-2xl font-black text-brand-600 mb-4">
                    R$ {p.preco}
                  </div>

                  {/* Link de checkout */}
                  <div className="mb-4 p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-bold text-neutral-500 uppercase">
                        🛒 Link de checkout
                      </p>
                      {editandoId !== p.id && (
                        <button
                          onClick={() => setEditandoId(p.id)}
                          className="text-xs font-bold text-brand-600 hover:underline"
                        >
                          {temLink ? "Editar" : "Adicionar"}
                        </button>
                      )}
                    </div>
                    {editandoId === p.id ? (
                      <EditLinkForm
                        atual={p.linkCheckout || ""}
                        onCancel={() => setEditandoId(null)}
                        onSalvar={(link) => salvarLink(p.id, link)}
                      />
                    ) : temLink ? (
                      <p className="text-xs text-neutral-700 break-all font-mono">
                        {p.linkCheckout}
                      </p>
                    ) : (
                      <p className="text-xs text-neutral-500 italic">
                        Nenhum link definido. Sem link, os botões da página só rolam
                        pra seção de preço.
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <Link
                      href={paginaUrl}
                      target="_blank"
                      className="bg-black text-white px-3 py-1.5 rounded-full text-xs font-bold hover:bg-neutral-800"
                    >
                      Ver página
                    </Link>
                    <button
                      onClick={() => baixarPdf(p.id, p.slug)}
                      className="bg-brand-600 text-white px-3 py-1.5 rounded-full text-xs font-bold hover:bg-brand-700"
                    >
                      📥 PDF
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          window.location.origin + paginaUrl
                        );
                        alert("Link copiado!");
                      }}
                      className="border border-neutral-300 px-3 py-1.5 rounded-full text-xs font-bold hover:bg-neutral-50"
                    >
                      🔗 Copiar link
                    </button>
                    <button
                      onClick={() => excluir(p.id)}
                      className="text-red-600 text-xs font-bold px-3 py-1.5 hover:underline"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

function EditLinkForm({
  atual,
  onSalvar,
  onCancel,
}: {
  atual: string;
  onSalvar: (link: string) => void;
  onCancel: () => void;
}) {
  const [link, setLink] = useState(atual);
  const [saving, setSaving] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await onSalvar(link);
    setSaving(false);
  }

  return (
    <form onSubmit={submit} className="space-y-2">
      <input
        type="url"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="https://checkout.applyfy.com.br/..."
        className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs focus:border-brand-500 focus:outline-none"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={saving}
          className="bg-black text-white px-3 py-1.5 rounded-full text-xs font-bold hover:bg-neutral-800 disabled:opacity-50"
        >
          {saving ? "Salvando..." : "Salvar"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="border border-neutral-300 px-3 py-1.5 rounded-full text-xs font-bold hover:bg-neutral-50"
        >
          Cancelar
        </button>
      </div>
      <p className="text-xs text-neutral-500">
        Cole o link do checkout Applyfy desse produto. Deixe vazio pra remover.
      </p>
    </form>
  );
}

function UserNav() {
  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/dashboard" className="text-xl font-black">
          Cria<span className="gradient-text">fy</span>
        </Link>
        <div className="flex items-center gap-6 text-sm font-semibold">
          <Link
            href="/dashboard"
            className="text-neutral-700 hover:text-brand-600"
          >
            Criar produto
          </Link>
          <Link href="/meus-produtos" className="text-brand-600">
            Meus produtos
          </Link>
          <Link
            href="/conta"
            className="text-neutral-700 hover:text-brand-600"
          >
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
