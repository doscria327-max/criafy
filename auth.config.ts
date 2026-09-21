import type { NextAuthConfig } from "next-auth";

// Config edge-safe (middleware). Sem Prisma nem bcrypt aqui.
export const authConfig: NextAuthConfig = {
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const user = auth?.user as any;
      const isLoggedIn = !!user;
      const path = nextUrl.pathname;

      // Rotas 100% públicas
      const rotasPublicas = [
        "/",
        "/login",
        "/cadastro",
        "/esqueci-senha",
        "/pagamento-realizado",
      ];
      const isPublica =
        rotasPublicas.includes(path) ||
        path.startsWith("/produto/") ||
        path.startsWith("/redefinir-senha/") ||
        path.startsWith("/api/auth/") ||
        path.startsWith("/api/signup") ||
        path.startsWith("/api/esqueci-senha") ||
        path.startsWith("/api/redefinir-senha") ||
        path.startsWith("/_next/") ||
        path.startsWith("/favicon");

      if (isPublica) return true;

      // Rotas admin — só pra role admin
      if (path.startsWith("/admin") || path.startsWith("/api/admin")) {
        if (!isLoggedIn) return false;
        return user?.role === "admin";
      }

      // Rotas privadas gerais (dashboard, conta, meus-produtos, /planos, APIs)
      if (!isLoggedIn) return false;
      return true;
    },
  },
  providers: [], // preenchido no auth.ts
};
