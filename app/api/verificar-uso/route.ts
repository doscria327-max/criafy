import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { extrairIP, jaUsou } from "@/lib/uso";

export const runtime = "nodejs";

/**
 * POST /api/verificar-uso
 * Body: { fingerprint: string }
 * Retorna { bloqueado: boolean }
 * Usado pelo dashboard pra saber se deve mostrar tela de bloqueio antes mesmo
 * de deixar a pessoa preencher o formulário.
 */
export async function POST(req: Request) {
  try {
    const { fingerprint } = await req.json();
    const cookieStore = cookies();
    const cookieUso = cookieStore.get("criafy_uso")?.value;
    const ip = extrairIP(req);
    const fp = fingerprint || "sem-fp";

    const bloqueado =
      cookieUso === "1" ||
      jaUsou(`fp:${fp}`) ||
      jaUsou(`ip:${ip}`);

    return NextResponse.json({ bloqueado });
  } catch {
    return NextResponse.json({ bloqueado: false });
  }
}
