/**
 * Controle de uso do teste grátis.
 * Armazena in-memory no servidor (zera em cada cold-start da Vercel — pra 100%
 * de robustez use Vercel KV, veja o guia no final do arquivo).
 * Também salva cookie e verifica IP + fingerprint enviados pelo cliente.
 */

// Set em memória global. Persiste durante o "warm" da lambda serverless.
// Em cold-start reseta — mas o cookie httpOnly + localStorage pegam esses casos.
declare global {
  // eslint-disable-next-line no-var
  var __criafy_usos: Set<string> | undefined;
}

const USADOS = () => {
  if (!globalThis.__criafy_usos) globalThis.__criafy_usos = new Set<string>();
  return globalThis.__criafy_usos;
};

export function marcarUso(chave: string) {
  USADOS().add(chave);
}

export function jaUsou(chave: string): boolean {
  return USADOS().has(chave);
}

export function extrairIP(req: Request): string {
  const headers = req.headers;
  return (
    headers.get("x-vercel-forwarded-for") ||
    headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    headers.get("x-real-ip") ||
    "0.0.0.0"
  );
}

/**
 * ================================================================
 * PRA 100% DE ROBUSTEZ, TROCAR O USADOS() ACIMA POR VERCEL KV:
 * ================================================================
 *
 * 1. Na Vercel, vá em Storage > Create Database > KV
 * 2. Conecte ao seu projeto (variáveis já vão configuradas)
 * 3. npm install @vercel/kv
 * 4. Substitua as funções acima por:
 *
 * import { kv } from "@vercel/kv";
 *
 * export async function marcarUso(chave: string) {
 *   await kv.set(`uso:${chave}`, 1, { ex: 60 * 60 * 24 * 365 }); // 1 ano
 * }
 *
 * export async function jaUsou(chave: string): Promise<boolean> {
 *   return (await kv.get(`uso:${chave}`)) === 1;
 * }
 *
 * E marque as chamadas com await nas rotas.
 */
