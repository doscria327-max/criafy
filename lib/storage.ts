/**
 * Tipos e utilitários. Nenhuma persistência real —
 * o produto viaja codificado nas URLs e vive no estado do React.
 */

export type Produto = {
  slug: string;
  nome: string;
  promessa: string;
  publico: string;
  nicho: string;
  nichoId: string;
  preco: number;
  formato: string;
  linkCheckout?: string; // Link do checkout Applyfy do usuário
  estrutura: string[];
  beneficios: string[];
  bonus: string[];
  headline: string;
  subheadline: string;
  copyVendas: string;
  garantia: string;
  faq: { q: string; a: string }[];
  grupos: { nome: string; plataforma: string; link: string; risco: string; motivo: string }[];
  copies: { titulo: string; texto: string }[];
  criadoEm: string;
};

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}
