/**
 * Caminho oculto do painel administrativo.
 * Configure a variável ADMIN_PANEL_PATH em produção com um valor aleatório
 * único (ex: "/painel-x7k9p2m4q8"). O fallback só é usado em desenvolvimento
 * pra facilitar o teste local.
 *
 * A rota física do App Router continua sendo /admin — o middleware faz o
 * rewrite interno. Do lado externo, /admin retorna 404.
 */
export const ADMIN_PATH =
  process.env.ADMIN_PANEL_PATH?.trim().replace(/\/$/, "") || "/painel-criafy-9x7";

// Helper de UI
export function adminUrl(sub: string = "") {
  return ADMIN_PATH + (sub ? (sub.startsWith("/") ? sub : "/" + sub) : "");
}
