import { NextResponse } from "next/server";
import { gerarProduto } from "@/lib/generator";
import { encodeProduto } from "@/lib/encoding";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nicho, publico, formato = "ebook", preco = 47 } = body;

    if (!nicho || !publico) {
      return NextResponse.json({ error: "Informe nicho e público." }, { status: 400 });
    }

    await new Promise((r) => setTimeout(r, 500 + Math.random() * 400));

    const produto = gerarProduto({ nicho, publico, formato, preco });
    const token = encodeProduto(produto);

    return NextResponse.json({ produto, token });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Erro interno." }, { status: 500 });
  }
}
