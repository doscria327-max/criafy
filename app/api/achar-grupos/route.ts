import { NextResponse } from "next/server";
import { getProduto, saveProduto } from "@/lib/storage";
import { sugerirGrupos } from "@/lib/generator";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { slug } = await req.json();
    const produto = getProduto(slug);
    if (!produto) {
      return NextResponse.json(
        { error: "Produto não encontrado." },
        { status: 404 }
      );
    }

    await new Promise((r) => setTimeout(r, 400 + Math.random() * 400));

    const grupos = sugerirGrupos(produto);
    produto.grupos = grupos;
    saveProduto(produto);

    return NextResponse.json({ grupos });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Erro interno." },
      { status: 500 }
    );
  }
}
