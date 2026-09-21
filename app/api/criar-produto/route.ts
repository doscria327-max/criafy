import { NextResponse } from "next/server";
import { gerarProduto } from "@/lib/generator";
import { saveProduto } from "@/lib/storage";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nicho, publico, formato = "ebook", preco = 47 } = body;

    if (!nicho || !publico) {
      return NextResponse.json(
        { error: "Informe nicho e público." },
        { status: 400 }
      );
    }

    // Delay artificial pra dar a sensação de "IA pensando" (300–800ms).
    await new Promise((r) => setTimeout(r, 500 + Math.random() * 400));

    const produto = gerarProduto({ nicho, publico, formato, preco });
    saveProduto(produto);

    return NextResponse.json({ produto });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Erro interno." },
      { status: 500 }
    );
  }
}
