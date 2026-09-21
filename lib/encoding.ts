import type { Produto } from "./storage";

/**
 * Codifica o produto em base64 URL-safe pra viajar em URLs.
 * Assim o app funciona 100% serverless sem storage nenhum.
 */
export function encodeProduto(p: Produto): string {
  const json = JSON.stringify(p);
  const b64 = Buffer.from(json, "utf-8").toString("base64");
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodeProduto(encoded: string): Produto | null {
  try {
    let b64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
    while (b64.length % 4) b64 += "=";
    const json = Buffer.from(b64, "base64").toString("utf-8");
    return JSON.parse(json) as Produto;
  } catch {
    return null;
  }
}
