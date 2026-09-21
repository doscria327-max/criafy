import { auth } from "@/auth";
import { prisma } from "@/lib/db";

/**
 * Retorna o usuário logado com dados frescos do banco.
 * Use isto em API routes e server components pra ter sempre o role atualizado.
 */
export async function getCurrentUser() {
  const session = await auth();
  if (!session?.user) return null;
  const id = (session.user as any).id;
  if (!id) return null;

  const user = await prisma.user.findUnique({
    where: { id },
    include: { subscription: true },
  });
  return user;
}

export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") return null;
  return user;
}
