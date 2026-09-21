import LZString from "lz-string";
import type { Produto } from "./storage";

/**
 * Codifica o produto usando compressão LZ + URL-safe base64.
 * Reduz o payload em 3-5x, permitindo levar o produto inteiro em URLs
 * sem estourar o limite de tamanho dos navegadores.
 */
export function encodeProduto(p: Produto): string {
  // Remove campos pesados que a página de vendas não usa
  const enxuto = {
    slug: p.slug,
    nome: p.nome,
    promessa: p.promessa,
    publico: p.publico,
    nicho: p.nicho,
    nichoId: p.nichoId,
    preco: p.preco,
    formato: p.formato,
    linkCheckout: p.linkCheckout,
    estrutura: p.estrutura,
    beneficios: p.beneficios,
    bonus: p.bonus,
    headline: p.headline,
    subheadline: p.subheadline,
    copyVendas: p.copyVendas,
    garantia: p.garantia,
    faq: p.faq,
    grupos: [],
    copies: [],
    criadoEm: p.criadoEm,
  };
  const json = JSON.stringify(enxuto);
  return LZString.compressToEncodedURIComponent(json);
}

export function decodeProduto(encoded: string): Produto | null {
  try {
    const json = LZString.decompressFromEncodedURIComponent(encoded);
    if (!json) return null;
    return JSON.parse(json) as Produto;
  } catch {
    return null;
  }
}
