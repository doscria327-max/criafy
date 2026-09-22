import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { requireAdmin } from "@/lib/session";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().trim().min(2, "Nome muito curto").max(80),
  email: z.string().email("Email inválido"),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  password: z.string().min(8, "Senha precisa ter 8+ caracteres").max(120),
  plan: z.enum(["monthly", "lifetime"]),
  expiresAt: z.string().optional(), // ISO date string, só relevante pra monthly
});

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.errors[0]?.message || "Dados inválidos" },
      { status: 400 }
    );
  }

  const { name, email, phone, password, plan, expiresAt } = parsed.data;
  const emailLower = email.toLowerCase();

  const existente = await prisma.user.findUnique({ where: { email: emailLower } });
  if (existente) {
    return NextResponse.json(
      { error: "Já existe uma conta com esse email." },
      { status: 409 }
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);

  // Define datas de acordo com o plano
  const now = new Date();
  const status = plan === "lifetime" ? "active_lifetime" : "active_monthly";
  const exp =
    plan === "lifetime"
      ? null
      : expiresAt
      ? new Date(expiresAt)
      : new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  const user = await prisma.user.create({
    data: {
      name: name.trim(),
      email: emailLower,
      phone: phone || null,
      passwordHash,
      role: "user",
      subscription: {
        create: {
          plan,
          status,
          startedAt: now,
          expiresAt: exp,
          lastPaymentAt: now,
        },
      },
    },
  });

  await prisma.auditLog.create({
    data: {
      actorId: admin.id,
      action: "user.create_by_admin",
      targetId: user.id,
      metadata: { plan, expiresAt: exp?.toISOString() || null },
    },
  });

  return NextResponse.json({ ok: true, userId: user.id });
}
