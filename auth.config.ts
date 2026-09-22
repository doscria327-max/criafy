import type { NextAuthConfig } from "next-auth";

// Config edge-safe (usada no middleware).
// Callbacks jwt e session precisam estar AQUI (não só no auth.ts) pra que
// o middleware — que roda em edge runtime — consiga ler role do token.
export const authConfig: NextAuthConfig = {
  pages: { signIn: "/login" },
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 30 },
  callbacks: {
    async jwt({ token, user }) {
      // Ao logar, copia campos customizados pro token
      if (user) {
        token.id = (user as any).id;
        token.role = (user as any).role;
        token.subscriptionStatus = (user as any).subscriptionStatus;
        token.name = (user as any).name;
        token.email = (user as any).email;
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
    authorized({ auth, request: { nextUrl } }) {
      // Permite tudo — o middleware.ts trata as regras específicas
      return true;
    },
  },
  providers: [], // preenchido no auth.ts
};
