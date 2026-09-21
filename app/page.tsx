import Link from "next/link";

export default function TelaInicial() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-neutral-950 text-white">
      {/* Background gradient */}
      <div className="absolute inset-0 opacity-40">
        <div
          className="absolute top-0 -left-20 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, #7c3aed, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 -right-20 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, #ec4899, transparent 70%)" }}
        />
      </div>

      {/* Admin link discreto no canto */}
      <div className="absolute top-6 right-6 z-20">
        <Link
          href="/login?admin=1"
          className="text-xs text-neutral-500 hover:text-neutral-300 transition"
        >
          Painel admin
        </Link>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-16">
        {/* Logo */}
        <div className="text-4xl md:text-5xl font-black mb-8">
          Cria<span className="gradient-text">fy</span>
        </div>

        {/* Título */}
        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6 text-center max-w-3xl">
          Da ideia à venda<br />
          <span className="gradient-text">em minutos.</span>
        </h1>

        {/* Descrição */}
        <p className="text-xl text-neutral-300 max-w-xl text-center mb-12">
          A plataforma no-code que transforma sua ideia em um infoproduto pronto pra vender:
          nome, copy, página de vendas e ebook em PDF — tudo automático.
        </p>

        {/* Botões */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <Link
            href="/cadastro"
            className="flex-1 bg-white text-black px-6 py-4 rounded-full text-center font-bold hover:bg-neutral-100 transition"
          >
            Criar minha conta
          </Link>
          <Link
            href="/login"
            className="flex-1 border-2 border-white/20 px-6 py-4 rounded-full text-center font-bold hover:bg-white/10 transition"
          >
            Já tenho uma conta
          </Link>
        </div>

        <p className="text-sm text-neutral-500 mt-8">
          Planos a partir de R$ 197/mês · Cancele quando quiser
        </p>
      </div>
    </main>
  );
}
