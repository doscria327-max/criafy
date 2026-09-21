import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { signupRateLimit, extrairIP } from "@/lib/rate-limit";
import { enviarBoasVindas } from "@/lib/mail";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().trim().min(2, "Nome muito curto").max(80),
  email: z.string().email("Email inválido"),
  phone: z.string().trim().min(8).max(20).optional().or(z.literal("")),
  password: z.string().min(8, "Senha precisa ter 8+ caracteres").max(120),
});

export async function POST(req: Request) {
  try {
    const ip = extrairIP(req);
    const rl = await signupRateLimit.limit(ip);
    if (!rl.success) {
      return NextResponse.json(
        { error: "Muitas tentativas. Tente novamente em 1 hora." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "Dados inválidos" },
        { status: 400 }
      );
    }

    const { name, email, phone, password } = parsed.data;
    const emailLower = email.toLowerCase();

    const existente = await prisma.user.findUnique({ where: { email: emailLower } });
    if (existente) {
      return NextResponse.json(
        { error: "Já existe uma conta com esse email." },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: emailLower,
        phone: phone || null,
        passwordHash,
        role: "user",
        subscription: {
          create: { plan: "none", status: "registered_without_payment" },
        },
      },
    });

    // Envia boas-vindas (não bloqueia se falhar)
    enviarBoasVindas(emailLower, name).catch(() => {});

    return NextResponse.json({ ok: true, userId: user.id });
  } catch (err: any) {
    console.error("signup:", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
