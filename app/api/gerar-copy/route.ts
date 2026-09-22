import { NextResponse } from "next/server";
import { gerarCopies } from "@/lib/generator";
import { encodeProduto } from "@/lib/encoding";
import type { Produto } from "@/lib/storage";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { produto, baseUrl, produtoId } = (await req.json()) as {
      produto: Produto;
      baseUrl: string;
      produtoId?: string;
    };
    if (!produto) return NextResponse.json({ error: "Produto ausente." }, { status: 400 });

    await new Promise((r) => setTimeout(r, 500 + Math.random() * 500));

    // Se temos o id do banco, gera link curto. Senão, fallback pro formato antigo.
    const link = produtoId
      ? `${baseUrl || ""}/p/${produtoId}`
      : `${baseUrl || ""}/produto/${produto.slug}?d=${encodeProduto(produto)}`;

    const copies = gerarCopies(produto, link);

    const novo = { ...produto, copies };
    return NextResponse.json({ copies, produto: novo, token: encodeProduto(novo) });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Erro interno." }, { status: 500 });
  }
}
