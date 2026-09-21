import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

const schema = z.object({
  token: z.string().min(10),
  password: z.string().min(8).max(120),
});

export async function POST(req: Request) {
  try {
    const parsed = schema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }
    const { token, password } = parsed.data;

    const registro = await prisma.verificationToken.findUnique({
      where: { token },
    });
    if (!registro || registro.expires < new Date()) {
      return NextResponse.json(
        { error: "Link expirado ou inválido" },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);
    await prisma.user.update({
      where: { email: registro.identifier },
      data: { passwordHash, forcePwdReset: false },
    });

    await prisma.verificationToken.delete({ where: { token } });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("redefinir-senha:", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
