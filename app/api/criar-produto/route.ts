import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { gerarProduto } from "@/lib/generator";
import { encodeProduto } from "@/lib/encoding";
import { extrairIP, jaUsou, marcarUso } from "@/lib/uso";

export const runtime = "nodejs";

const COOKIE_NAME = "criafy_uso";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 ano

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      nicho,
      publico,
      formato = "ebook",
      preco = 47,
      linkCheckout,
      fingerprint,
    } = body;

    if (!nicho || !publico) {
      return NextResponse.json({ error: "Informe nicho e público." }, { status: 400 });
    }

    // ============ CHECK DE USO GRÁTIS ============
    const cookieStore = cookies();
    const cookieUso = cookieStore.get(COOKIE_NAME)?.value;
    const ip = extrairIP(req);
    const fp = fingerprint || "sem-fp";

    const chaves = [
      cookieUso ? `cookie:${cookieUso}` : null,
      `fp:${fp}`,
      `ip:${ip}`,
    ].filter(Boolean) as string[];

    const bloqueado = cookieUso === "1" || chaves.some((k) => jaUsou(k));

    if (bloqueado) {
      return NextResponse.json(
        {
          error: "limite_atingido",
          mensagem:
            "Você já usou seu teste grátis. Escolha um plano pra criar produtos ilimitados.",
        },
        { status: 402 }
      );
    }

    await new Promise((r) => setTimeout(r, 500 + Math.random() * 400));

    const produto = gerarProduto({ nicho, publico, formato, preco, linkCheckout });
    const token = encodeProduto(produto);

    // Marca todas as chaves como usadas
    chaves.forEach((k) => marcarUso(k));

    const res = NextResponse.json({ produto, token });
    // Seta o cookie httpOnly — sobrevive a limpeza de localStorage
    res.cookies.set(COOKIE_NAME, "1", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    });

    return res;
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Erro interno." }, { status: 500 });
  }
}
