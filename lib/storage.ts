import fs from "fs";
import path from "path";

// Em produção (Vercel) o único diretório gravável é /tmp.
// Localmente, usa a pasta data/ do projeto.
const IS_VERCEL = process.env.VERCEL === "1";
const DATA_DIR = IS_VERCEL
  ? path.join("/tmp", "criafy-data")
  : path.join(process.cwd(), "data");

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
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, "[]");
    return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
  } catch (e) {
    console.error("Erro ao acessar storage:", e);
    return [];
  }
}

export function saveProduto(p: Produto) {
  try {
    const all = ensureDb();
    const idx = all.findIndex((x) => x.slug === p.slug);
    if (idx >= 0) all[idx] = p;
    else all.push(p);
    fs.writeFileSync(DB_FILE, JSON.stringify(all, null, 2));
  } catch (e) {
    console.error("Erro ao salvar produto:", e);
  }
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
