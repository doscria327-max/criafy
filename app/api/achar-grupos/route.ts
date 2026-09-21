import { NextResponse } from "next/server";
import { sugerirGrupos } from "@/lib/generator";
import { encodeProduto } from "@/lib/encoding";
import type { Produto } from "@/lib/storage";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { produto } = (await req.json()) as { produto: Produto };
    if (!produto) return NextResponse.json({ error: "Produto ausente." }, { status: 400 });

    await new Promise((r) => setTimeout(r, 400 + Math.random() * 400));

    const grupos = sugerirGrupos(produto);
    const novo = { ...produto, grupos };
    return NextResponse.json({ grupos, produto: novo, token: encodeProduto(novo) });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Erro interno." }, { status: 500 });
  }
}
