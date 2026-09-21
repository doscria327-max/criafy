import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { consultarTransacaoPorEmail, OFFER_TO_PLAN } from "@/lib/applyfy";

export const runtime = "nodejs";

/**
 * Chamada após o cliente voltar do checkout Applyfy.
 * Consulta a API Applyfy e libera o acesso se encontrar transação aprovada.
 */
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: (session.user as any).id },
    include: { subscription: true },
  });
  if (!user) return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });

  // Já é ativo? só retorna
  if (
    user.subscription?.status === "active_monthly" ||
    user.subscription?.status === "active_lifetime"
  ) {
    return NextResponse.json({ status: user.subscription.status });
  }

  const transacao = await consultarTransacaoPorEmail(user.email);

  if (!transacao) {
    return NextResponse.json({ status: "payment_pending" });
  }

  const plano = transacao.offerId ? OFFER_TO_PLAN[transacao.offerId] : undefined;
  const planoFinal = plano || user.subscription?.plan || "monthly";

  const novo = planoFinal === "lifetime"
    ? {
        status: "active_lifetime",
        plan: "lifetime",
        startedAt: new Date(),
        expiresAt: null,
        applyfyTransactionId: transacao.id,
        lastPaymentAt: new Date(transacao.createdAt),
      }
    : {
        status: "active_monthly",
        plan: "monthly",
        startedAt: user.subscription?.startedAt || new Date(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        applyfyTransactionId: transacao.id,
        lastPaymentAt: new Date(transacao.createdAt),
      };

  await prisma.subscription.update({
    where: { userId: user.id },
    data: novo,
  });

  return NextResponse.json({ status: novo.status });
}
