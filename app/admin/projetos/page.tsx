import { redirect } from "next/navigation";
import Link from "next/link";
import { requireAdmin } from "@/lib/session";
import { prisma } from "@/lib/db";
import AdminHeader from "@/components/AdminHeader";
import { adminUrl } from "@/lib/config";

export const dynamic = "force-dynamic";

export default async function ProjetosPage() {
  const admin = await requireAdmin();
  if (!admin) redirect("/login");

  const [total, produtos] = await Promise.all([
    prisma.produto.count(),
    prisma.produto.findMany({
      include: {
        user: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 200,
    }),
  ]);

  return (
    <main className="min-h-screen bg-neutral-50">
      <AdminHeader current="projetos" />

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-6">
          <p className="text-sm font-bold text-brand-600 uppercase tracking-widest mb-2">
            Administração
          </p>
          <h1 className="text-3xl font-black mb-2">
            Projetos <span className="text-lg font-normal text-neutral-500">({total} total)</span>
          </h1>
          <p className="text-neutral-600">
            Todos os infoprodutos criados pelos usuários do Criafy.
          </p>
        </div>

        {produtos.length === 0 ? (
          <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center">
            <p className="text-neutral-500">Nenhum projeto criado ainda.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="text-left px-4 py-3 font-bold">Nome</th>
                  <th className="text-left px-4 py-3 font-bold">Nicho</th>
                  <th className="text-left px-4 py-3 font-bold">Preço</th>
                  <th className="text-left px-4 py-3 font-bold">Proprietário</th>
                  <th className="text-left px-4 py-3 font-bold">Criado em</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {produtos.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-neutral-100 hover:bg-neutral-50"
                  >
                    <td className="px-4 py-3 font-semibold">{p.nome}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-bold bg-brand-100 text-brand-700 px-2 py-1 rounded-full">
                        {p.nicho}
                      </span>
                    </td>
                    <td className="px-4 py-3">R$ {p.preco}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="font-semibold">{p.user.name}</div>
                      <div className="text-neutral-500 text-xs">{p.user.email}</div>
                    </td>
                    <td className="px-4 py-3 text-neutral-500 text-xs">
                      {new Date(p.createdAt).toLocaleString("pt-BR")}
                    </td>
                    <td className="px-4 py-3 text-right space-x-3">
                      <Link
                        href={`/produto/${p.slug}?d=${p.token}`}
                        target="_blank"
                        className="text-brand-600 font-semibold hover:underline text-xs"
                      >
                        Ver página →
                      </Link>
                      <Link
                        href={adminUrl(`/usuarios/${p.userId}`)}
                        className="text-neutral-600 font-semibold hover:underline text-xs"
                      >
                        Usuário
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
