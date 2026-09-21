import { NextResponse } from "next/server";
import { getProduto } from "@/lib/storage";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { slug } = await req.json();
    const produto = getProduto(slug);
    if (!produto) {
      return NextResponse.json({ error: "Produto não encontrado." }, { status: 404 });
    }
    return NextResponse.json({ url: `/produto/${produto.slug}`, ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Erro interno." }, { status: 500 });
  }
}
