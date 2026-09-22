/**
 * Caminho do painel administrativo.
 * Nenhum link público aponta pra cá — só o admin conhece.
 * Segurança real vem da autenticação (validação server-side via requireAdmin).
 */
export const ADMIN_PATH = "/admin";

export function adminUrl(sub: string = "") {
  return ADMIN_PATH + (sub ? (sub.startsWith("/") ? sub : "/" + sub) : "");
}
