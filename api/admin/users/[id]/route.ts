import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "admin") return null;
  return session.user as any;
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Não autorizado" }, { status: 403 });

  const user = await prisma.user.findUnique({
    where: { id: params.id },
    include: {
      subscription: true,
      purchaseIntents: { orderBy: { createdAt: "desc" }, take: 20 },
    },
  });

  if (!user) return NextResponse.json({ error: "Não encontrado" }, { status: 404 });
  return NextResponse.json({ user });
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Não autorizado" }, { status: 403 });

  const body = await req.json();
  const { action, plan, expiresAt } = body as {
    action:
      | "liberar_mensal"
      | "liberar_vitalicio"
      | "suspender"
      | "reativar"
      | "cancelar"
      | "expirar"
      | "alterar_expiracao";
    plan?: "monthly" | "lifetime";
    expiresAt?: string;
  };

  const user = await prisma.user.findUnique({
    where: { id: params.id },
    include: { subscription: true },
  });
  if (!user) return NextResponse.json({ error: "Não encontrado" }, { status: 404 });

  let updateData: any = {};
  let logAction = "";

  switch (action) {
    case "liberar_mensal":
      updateData = {
        status: "active_monthly",
        plan: "monthly",
        startedAt: new Date(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        lastPaymentAt: new Date(),
      };
      logAction = "subscription.grant_monthly";
      break;
    case "liberar_vitalicio":
      updateData = {
        status: "active_lifetime",
        plan: "lifetime",
        startedAt: new Date(),
        expiresAt: null,
        lastPaymentAt: new Date(),
      };
      logAction = "subscription.grant_lifetime";
      break;
    case "suspender":
      updateData = { status: "suspended" };
      logAction = "user.suspend";
      break;
    case "reativar":
      const previousActive = user.subscription?.plan === "lifetime"
        ? "active_lifetime"
        : "active_monthly";
      updateData = { status: previousActive };
      logAction = "user.reactivate";
      break;
    case "cancelar":
      updateData = { status: "canceled" };
      logAction = "subscription.cancel";
      break;
    case "expirar":
      updateData = { status: "expired" };
      logAction = "subscription.expire";
      break;
    case "alterar_expiracao":
      updateData = { expiresAt: expiresAt ? new Date(expiresAt) : null };
      logAction = "subscription.change_expiration";
      break;
    default:
      return NextResponse.json({ error: "Ação inválida" }, { status: 400 });
  }

  await prisma.subscription.update({
    where: { userId: user.id },
    data: updateData,
  });

  await prisma.auditLog.create({
    data: {
      actorId: admin.id,
      action: logAction,
      targetId: user.id,
      metadata: body,
    },
  });

  return NextResponse.json({ ok: true });
}
