import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { authConfig } from "./auth.config";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 30 }, // 30 dias
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user, trigger }) {
      // Ao logar
      if (user) {
        token.id = (user as any).id;
        token.role = (user as any).role;
        token.subscriptionStatus = (user as any).subscriptionStatus;
        token.name = (user as any).name;
        token.email = (user as any).email;
      }

      // Se já tem token, atualiza role/status do banco a cada acesso
      // (garante que promoção admin/mudança de plano seja refletida sem novo login)
      if (token.id && !user) {
        try {
          const fresh = await prisma.user.findUnique({
            where: { id: token.id as string },
            include: { subscription: true },
          });
          if (fresh) {
            token.role = fresh.role;
            token.subscriptionStatus =
              fresh.subscription?.status || "registered_without_payment";
            token.name = fresh.name;
          }
        } catch (e) {
          // Falha na consulta não invalida a sessão
          console.warn("jwt refresh:", e);
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).subscriptionStatus = token.subscriptionStatus;
      }
      return session;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() },
          include: { subscription: true },
        });
        if (!user) return null;

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          subscriptionStatus:
            user.subscription?.status || "registered_without_payment",
        } as any;
      },
    }),
  ],
});
