import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// Config edge-safe (sem Prisma nem bcrypt aqui — vai no auth.ts)
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30, // 30 dias
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.role = (user as any).role;
        token.subscriptionStatus = (user as any).subscriptionStatus;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).role = token.role as string;
        (session.user as any).subscriptionStatus =
          token.subscriptionStatus as string;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const user = auth?.user as any;
      const isLoggedIn = !!user;
      const path = nextUrl.pathname;

      // Rotas públicas
      const rotasPublicas = [
        "/",
        "/login",
        "/cadastro",
        "/esqueci-senha",
        "/pagamento-realizado",
        "/planos",
      ];
      const isPublica =
        rotasPublicas.includes(path) ||
        path.startsWith("/produto/") ||
        path.startsWith("/redefinir-senha/") ||
        path.startsWith("/api/auth/") ||
        path.startsWith("/api/signup") ||
        path.startsWith("/api/esqueci-senha") ||
        path.startsWith("/api/redefinir-senha");

      if (isPublica) return true;

      // Admin routes
      if (path.startsWith("/admin") || path.startsWith("/api/admin")) {
        return isLoggedIn && user?.role === "admin";
      }

      // Dashboard e outras rotas privadas
      if (!isLoggedIn) return false;

      return true;
    },
  },
  providers: [], // preenchido no auth.ts
};
