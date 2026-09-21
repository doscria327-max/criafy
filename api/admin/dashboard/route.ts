import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "admin") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
  }

  const [total, ativos, semPlano, mensais, vitalicios, pendentes, expirando] = await Promise.all([
    prisma.user.count(),
    prisma.subscription.count({
      where: { status: { in: ["active_monthly", "active_lifetime"] } },
    }),
    prisma.subscription.count({
      where: { status: "registered_without_payment" },
    }),
    prisma.subscription.count({ where: { status: "active_monthly" } }),
    prisma.subscription.count({ where: { status: "active_lifetime" } }),
    prisma.subscription.count({ where: { status: "payment_pending" } }),
    prisma.subscription.count({
      where: {
        status: "active_monthly",
        expiresAt: {
          lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          gte: new Date(),
        },
      },
    }),
  ]);

  const suspensos = await prisma.subscription.count({ where: { status: "suspended" } });
  const cancelados = await prisma.subscription.count({
    where: { status: { in: ["canceled", "refunded", "chargeback", "expired"] } },
  });

  return NextResponse.json({
    total,
    ativos,
    semPlano,
    mensais,
    vitalicios,
    pendentes,
    expirando,
    suspensos,
    cancelados,
  });
}
