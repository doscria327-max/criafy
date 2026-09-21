import { NextResponse } from "next/server";
import { encodeProduto } from "@/lib/encoding";
import type { Produto } from "@/lib/storage";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { produto } = (await req.json()) as { produto: Produto };
    if (!produto) return NextResponse.json({ error: "Produto ausente." }, { status: 400 });
    const token = encodeProduto(produto);
    return NextResponse.json({ url: `/produto/${produto.slug}?d=${token}`, ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Erro interno." }, { status: 500 });
  }
}
