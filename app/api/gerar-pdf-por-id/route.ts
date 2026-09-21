import { NextRequest } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { decodeProduto } from "@/lib/encoding";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return new Response(JSON.stringify({ error: "Não autenticado" }), { status: 401 });
  }

  const { id } = await req.json();
  const produtoDb = await prisma.produto.findUnique({ where: { id } });
  if (!produtoDb) {
    return new Response(JSON.stringify({ error: "Não encontrado" }), { status: 404 });
  }
  if (produtoDb.userId !== (session.user as any).id && (session.user as any).role !== "admin") {
    return new Response(JSON.stringify({ error: "Não autorizado" }), { status: 403 });
  }

  const produto = decodeProduto(produtoDb.token);
  if (!produto) {
    return new Response(JSON.stringify({ error: "Produto inválido" }), { status: 500 });
  }

  // Repassa pro endpoint existente
  const origin = req.nextUrl.origin;
  const r = await fetch(`${origin}/api/gerar-pdf`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ produto }),
  });

  const buffer = Buffer.from(await r.arrayBuffer());
  return new Response(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${produtoDb.slug}.pdf"`,
      "Cache-Control": "no-cache",
    },
  });
}
