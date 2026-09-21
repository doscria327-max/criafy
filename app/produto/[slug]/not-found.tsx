import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="text-center px-6">
        <p className="text-6xl mb-4">🤷</p>
        <h1 className="text-4xl font-black mb-2">Página não encontrada</h1>
        <p className="text-neutral-600 mb-8">
          Esse produto ainda não foi criado. Que tal criar agora?
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
