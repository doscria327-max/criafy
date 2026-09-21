import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: (session.user as any).id },
    include: {
      subscription: true,
      _count: { select: { produtos: true } },
    },
  });

  if (!user) return NextResponse.json({ error: "Não encontrado" }, { status: 404 });

  return NextResponse.json({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    createdAt: user.createdAt,
    subscription: user.subscription,
    totalProdutos: user._count.produtos,
  });
}

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const { action, name, phone, currentPassword, newPassword } = await req.json();

  if (action === "profile") {
    await prisma.user.update({
      where: { id: (session.user as any).id },
      data: {
        ...(name ? { name: name.trim() } : {}),
        ...(phone !== undefined ? { phone: phone || null } : {}),
      },
    });
    return NextResponse.json({ ok: true });
  }

  if (action === "password") {
    if (!newPassword || newPassword.length < 8) {
      return NextResponse.json(
        { error: "Nova senha precisa ter 8+ caracteres" },
        { status: 400 }
      );
    }
    const user = await prisma.user.findUnique({
      where: { id: (session.user as any).id },
    });
    if (!user) return NextResponse.json({ error: "Não encontrado" }, { status: 404 });

    const ok = await bcrypt.compare(currentPassword || "", user.passwordHash);
    if (!ok) {
      return NextResponse.json(
        { error: "Senha atual incorreta" },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash, forcePwdReset: false },
    });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Ação inválida" }, { status: 400 });
}
