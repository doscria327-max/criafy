import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

// Middleware simples: só valida acesso a /admin/*
// A validação real e granular é feita nas próprias páginas via requireAdmin()
export default auth(async function middleware(req) {
  const path = req.nextUrl.pathname;
  const user = (req.auth?.user as any) || null;

  if (path === "/admin" || path.startsWith("/admin/")) {
    // Se não for admin, mostra 404 (URL parece que não existe)
    if (!user || user.role !== "admin") {
      return NextResponse.rewrite(new URL("/nao-encontrado", req.nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api/auth|api/admin|_next/static|_next/image|favicon.ico).*)"],
};
