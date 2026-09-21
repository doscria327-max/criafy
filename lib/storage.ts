import fs from "fs";
import path from "path";

// Storage local em JSON. Em produção séria troque por Vercel KV / Postgres.
const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "produtos.json");

export type Produto = {
  slug: string;
  nome: string;
  promessa: string;
  publico: string;
  nicho: string;
  nichoId: string;
  preco: number;
  formato: string;
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

function ensureDb(): Produto[] {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, "[]");
  return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
}

export function saveProduto(p: Produto) {
  const all = ensureDb();
  const idx = all.findIndex((x) => x.slug === p.slug);
  if (idx >= 0) all[idx] = p;
  else all.push(p);
  fs.writeFileSync(DB_FILE, JSON.stringify(all, null, 2));
}

export function getProduto(slug: string): Produto | null {
  const all = ensureDb();
  return all.find((x) => x.slug === slug) || null;
}

export function listProdutos(): Produto[] {
  return ensureDb();
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}
