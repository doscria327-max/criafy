"use client";
export default function BaixarPdfBotao({ id, slug }: { id: string; slug: string }) {
  async function baixar() {
    try {
      const r = await fetch("/api/gerar-pdf-publico", {
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
      alert("Não foi possível gerar o PDF agora. Tente novamente.");
    }
  }
  return (
    <button
      onClick={baixar}
      className="inline-block bg-white border-2 border-neutral-900 text-neutral-900 px-8 py-4 rounded-full font-bold hover:bg-neutral-900 hover:text-white transition"
    >
      📥 Baixar PDF de amostra
    </button>
  );
}
