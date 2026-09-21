import { NextResponse } from "next/server";
import { getProduto, saveProduto } from "@/lib/storage";
import { gerarCopies } from "@/lib/generator";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { slug, baseUrl } = await req.json();
    const produto = getProduto(slug);
    if (!produto) {
      return NextResponse.json(
        { error: "Produto não encontrado." },
        { status: 404 }
      );
    }

    await new Promise((r) => setTimeout(r, 500 + Math.random() * 500));

    const link = `${baseUrl || ""}/produto/${produto.slug}`;
    const copies = gerarCopies(produto, link);
    produto.copies = copies;
    saveProduto(produto);

    return NextResponse.json({ copies });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Erro interno." },
      { status: 500 }
    );
  }
}
