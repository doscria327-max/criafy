import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

const ADMIN_PATH =
  process.env.ADMIN_PANEL_PATH?.trim().replace(/\/$/, "") || "/painel-criafy-9x7";

export default auth(async function middleware(req) {
  const url = req.nextUrl;
  const path = url.pathname;
  const user = (req.auth?.user as any) || null;

  // 1) Bloqueia acesso direto ao caminho interno /admin — retorna 404 sempre
  if (path === "/admin" || path.startsWith("/admin/")) {
    return NextResponse.rewrite(new URL("/404", url));
  }

  // 2) Rota oculta configurada: reescreve pra /admin internamente
  if (path === ADMIN_PATH || path.startsWith(ADMIN_PATH + "/")) {
    // Precisa ser admin, senão 404
    if (!user || user.role !== "admin") {
      return NextResponse.rewrite(new URL("/404", url));
    }
    const rewrittenPath =
      path === ADMIN_PATH ? "/admin" : "/admin" + path.slice(ADMIN_PATH.length);
    return NextResponse.rewrite(new URL(rewrittenPath, url));
  }

  // 3) APIs administrativas — validam authorized() do authConfig
  if (path.startsWith("/api/admin/")) {
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Não autorizado" }, { status: 404 });
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
