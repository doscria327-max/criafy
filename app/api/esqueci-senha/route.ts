import { NextResponse } from "next/server";
import crypto from "crypto";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { recoveryRateLimit } from "@/lib/rate-limit";
import { enviarEmailRecuperacao } from "@/lib/mail";

export const runtime = "nodejs";

const schema = z.object({ email: z.string().email() });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Email inválido" }, { status: 400 });

    const email = parsed.data.email.toLowerCase();
    const rl = await recoveryRateLimit.limit(email);
    if (!rl.success) {
      // Retorna genérico pra não vazar rate limit
      return NextResponse.json({ ok: true });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // Retorna sucesso mesmo se não achar (segurança)
      return NextResponse.json({ ok: true });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1h

    await prisma.verificationToken.create({
      data: { identifier: email, token, expires },
    });

    const link = `${process.env.NEXTAUTH_URL}/redefinir-senha/${token}`;
    await enviarEmailRecuperacao(email, link);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("esqueci-senha:", err);
    return NextResponse.json({ ok: true }); // não vaza erro
  }
}
