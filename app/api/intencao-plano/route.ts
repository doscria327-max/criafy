import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { CHECKOUT_URLS } from "@/lib/applyfy";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const { plan } = await req.json();
  if (plan !== "monthly" && plan !== "lifetime") {
    return NextResponse.json({ error: "Plano inválido" }, { status: 400 });
  }

  const checkoutUrl = CHECKOUT_URLS[plan as "monthly" | "lifetime"];

  await prisma.purchaseIntent.create({
    data: {
      userId: (session.user as any).id,
      plan,
      checkoutUrl,
    },
  });

  await prisma.subscription.update({
    where: { userId: (session.user as any).id },
    data: { plan, status: "payment_pending" },
  });

  return NextResponse.json({ url: checkoutUrl });
}
