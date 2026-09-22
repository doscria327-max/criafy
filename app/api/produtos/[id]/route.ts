import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { decodeProduto, encodeProduto } from "@/lib/encoding";

export const runtime = "nodejs";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const produto = await prisma.produto.findUnique({ where: { id: params.id } });
  if (!produto) {
    return NextResponse.json({ error: "Não encontrado" }, { status: 404 });
  }
  if (produto.userId !== (session.user as any).id && (session.user as any).role !== "admin") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
  }

  await prisma.produto.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const produto = await prisma.produto.findUnique({ where: { id: params.id } });
  if (!produto) {
    return NextResponse.json({ error: "Não encontrado" }, { status: 404 });
  }
  if (produto.userId !== (session.user as any).id && (session.user as any).role !== "admin") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
  }

  const body = await req.json();
  const { linkCheckout } = body;

  // Valida URL se informada
  if (linkCheckout && linkCheckout.trim()) {
    try {
      const u = new URL(linkCheckout);
      if (!["http:", "https:"].includes(u.protocol)) {
        return NextResponse.json({ error: "URL inválida" }, { status: 400 });
      }
    } catch {
      return NextResponse.json({ error: "URL inválida" }, { status: 400 });
    }
  }

  // Decodifica o token, atualiza o linkCheckout e reencoda
  const dec = decodeProduto(produto.token);
  if (!dec) {
    return NextResponse.json({ error: "Produto corrompido" }, { status: 500 });
  }
  const cleanLink = linkCheckout?.trim() || undefined;
  const novo = { ...dec, linkCheckout: cleanLink };
  const novoToken = encodeProduto(novo as any);

  await prisma.produto.update({
    where: { id: params.id },
    data: {
      linkCheckout: cleanLink || null,
      token: novoToken,
    },
  });

  return NextResponse.json({ ok: true, token: novoToken });
}
