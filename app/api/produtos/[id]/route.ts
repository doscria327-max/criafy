import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

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
