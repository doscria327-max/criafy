import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { gerarProduto } from "@/lib/generator";
import { encodeProduto } from "@/lib/encoding";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    // Verifica se o usuário tem plano ativo
    const user = await prisma.user.findUnique({
      where: { id: (session.user as any).id },
      include: { subscription: true },
    });
    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }
    const st = user.subscription?.status;
    if (st !== "active_monthly" && st !== "active_lifetime" && user.role !== "admin") {
      return NextResponse.json(
        { error: "Sem plano ativo. Assine um plano pra criar produtos." },
        { status: 402 }
      );
    }

    const body = await req.json();
    const { nicho, publico, formato = "ebook", preco = 47, linkCheckout } = body;
    if (!nicho || !publico) {
      return NextResponse.json({ error: "Informe nicho e público." }, { status: 400 });
    }

    await new Promise((r) => setTimeout(r, 400 + Math.random() * 300));

    const produto = gerarProduto({ nicho, publico, formato, preco, linkCheckout });
    const token = encodeProduto(produto);

    // Salva no banco
    await prisma.produto.create({
      data: {
        userId: user.id,
        slug: produto.slug,
        nome: produto.nome,
        promessa: produto.promessa,
        publico: produto.publico,
        nicho: produto.nicho,
        nichoId: produto.nichoId,
        preco: produto.preco,
        formato: produto.formato,
        linkCheckout: produto.linkCheckout,
        token,
      },
    });

    return NextResponse.json({ produto, token });
  } catch (err: any) {
    console.error("criar-produto:", err);
    return NextResponse.json({ error: err.message || "Erro interno" }, { status: 500 });
  }
}
