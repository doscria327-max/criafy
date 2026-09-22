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

// Node runtime — pode usar Prisma e bcrypt.
// Reaproveita os callbacks jwt/session do authConfig, e adiciona um
// segundo callback jwt (encadeado) que atualiza role do banco em cada renew.
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user, trigger }) {
      // Primeiro roda o callback do config (que copia campos do user pro token)
      if (user) {
        token.id = (user as any).id;
        token.role = (user as any).role;
        token.subscriptionStatus = (user as any).subscriptionStatus;
        token.name = (user as any).name;
        token.email = (user as any).email;
      }

      // Em cada renovação (sem novo login), atualiza role/status do banco
      // Assim promoções admin e mudanças de plano são refletidas sem novo login
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
          console.warn("jwt refresh:", e);
        }
      }
      return token;
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
