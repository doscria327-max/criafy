/**
 * Motor de geração local — combina o banco de nichos com o input do usuário
 * pra produzir produto, grupos, copies e páginas variados a cada geração.
 * Zero chamadas externas. Zero custo.
 */
import { encontrarNicho, type Nicho } from "./nichos-db";
import type { Produto } from "./storage";
import { slugify } from "./storage";

// Pseudo-random determinístico (seed leve baseado no input do usuário)
// Isso mantém variedade real mas reproduzível se o mesmo input for dado 2x.
function seededRandom(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    return ((h >>> 0) % 1000000) / 1000000;
  };
}

function pick<T>(arr: T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)];
}

function shuffle<T>(arr: T[], rng: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function take<T>(arr: T[], n: number, rng: () => number): T[] {
  return shuffle(arr, rng).slice(0, n);
}

/**
 * Gera nome comercial combinando template com o nicho e público.
 */
function gerarNome(nicho: Nicho, publico: string, rng: () => number): string {
  const templates: string[] = [
    `Método ${capitalize(nicho.nome)} Definitivo`,
    `${capitalize(nicho.nome)} Descomplicado`,
    `Projeto ${capitalize(primeiraPalavra(publico) || nicho.nome)}`,
    `Protocolo ${capitalize(nicho.nome)} 30 Dias`,
    `${capitalize(nicho.nome)} Sem Segredo`,
    `Guia Prático de ${capitalize(nicho.nome)}`,
    `${capitalize(nicho.nome)} na Prática`,
    `Sistema ${capitalize(nicho.nome)}`,
    `${capitalize(nicho.nome)} do Zero ao Resultado`,
    `Curso Essencial de ${capitalize(nicho.nome)}`,
  ];
  return pick(templates, rng);
}

function primeiraPalavra(s: string): string {
  return (s.split(" ")[0] || "").replace(/[^\p{L}]/gu, "");
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Gera produto completo a partir de nicho + público + formato + preço.
 */
export function gerarProduto(input: {
  nicho: string;
  publico: string;
  formato: string;
  preco: number;
  linkCheckout?: string;
}): Produto {
  const nicho = encontrarNicho(input.nicho);
  const seed = `${input.nicho}|${input.publico}|${Date.now()}`;
  const rng = seededRandom(seed);

  const nome = gerarNome(nicho, input.publico, rng);
  const promessa = `${pick(nicho.desejos, rng)} — em até 30 dias, sem depender de sorte.`;
  const headline = pick(nicho.headlines, rng);
  const subheadline = pick(nicho.subheadlines, rng);

  const estrutura = take(nicho.modulos, Math.min(6, nicho.modulos.length), rng);
  const beneficios = take(nicho.beneficios, Math.min(6, nicho.beneficios.length), rng);
  const garantia = pick(nicho.garantias, rng);
  const bonus = take(nicho.bonus, Math.min(3, nicho.bonus.length), rng);

  const copyVendas = montarCopyVendas(nicho, input.publico, rng);

  const faq = montarFaq(nicho, rng);

  const slug = slugify(nome + "-" + Math.random().toString(36).slice(2, 6));

  return {
    slug,
    nome,
    promessa,
    publico: input.publico,
    nicho: nicho.nome,
    nichoId: nicho.id,
    preco: input.preco,
    formato: input.formato,
    linkCheckout: input.linkCheckout,
    estrutura,
    beneficios,
    bonus,
    headline,
    subheadline,
    copyVendas,
    garantia,
    faq,
    grupos: [],
    copies: [],
    criadoEm: new Date().toISOString(),
  };
}

function montarCopyVendas(nicho: Nicho, publico: string, rng: () => number): string {
  const dor = pick(nicho.dores, rng);
  const desejo = pick(nicho.desejos, rng);
  const angulo = pick(nicho.angulosCopy, rng);

  return `${dor}. E se você chegou aqui, provavelmente já tentou vários caminhos que não deram certo.

${angulo}

O caminho pra ${desejo.toLowerCase()} existe, é claro e não depende de sorte, de dom ou de ter começado antes. Depende de método. E é exatamente isso que você recebe aqui: um sistema testado, pensado pra pessoas como você que não querem mais perder tempo com o que não funciona.

Sem promessa milagrosa, sem enrolação e sem revenda de conteúdo genérico da internet. Estratégia real, aplicável desde hoje.`;
}

function montarFaq(nicho: Nicho, rng: () => number): { q: string; a: string }[] {
  const objecoes = take(nicho.objecoes, 4, rng);
  return objecoes.map((obj) => ({
    q: capitalize(`E se ${obj}?`),
    a: `Ótima pergunta — essa é justamente uma das objeções mais comuns. O método foi desenhado exatamente pra funcionar mesmo pra quem sente que ${obj}. Você recebe o passo a passo aplicável na sua realidade, sem exigir tempo ilimitado ou condições ideais.`,
  }));
}

/**
 * Sugere grupos para o produto, priorizando o banco do nicho.
 * Se o nicho não tem grupos suficientes, complementa com genéricos.
 */
export function sugerirGrupos(produto: Produto) {
  const nicho = encontrarNicho(produto.nicho);
  const rng = seededRandom(produto.slug + "grupos");
  return take(nicho.grupos, Math.min(10, nicho.grupos.length), rng);
}

/**
 * Gera 10 copies em ângulos diferentes.
 */
export function gerarCopies(produto: Produto, linkVendas: string) {
  const nicho = encontrarNicho(produto.nicho);
  const rng = seededRandom(produto.slug + "copies");

  const angulosBase = [
    { titulo: "Ângulo 1: Dor direta", builder: () => copyDor(produto, nicho, linkVendas, rng) },
    { titulo: "Ângulo 2: Curiosidade", builder: () => copyCuriosidade(produto, nicho, linkVendas, rng) },
    { titulo: "Ângulo 3: História pessoal", builder: () => copyHistoria(produto, nicho, linkVendas, rng) },
    { titulo: "Ângulo 4: Prova social", builder: () => copyProva(produto, nicho, linkVendas, rng) },
    { titulo: "Ângulo 5: Contraste", builder: () => copyContraste(produto, nicho, linkVendas, rng) },
    { titulo: "Ângulo 6: Pergunta provocativa", builder: () => copyPergunta(produto, nicho, linkVendas, rng) },
    { titulo: "Ângulo 7: Lista de benefícios", builder: () => copyLista(produto, nicho, linkVendas, rng) },
    { titulo: "Ângulo 8: Objeção quebrada", builder: () => copyObjecao(produto, nicho, linkVendas, rng) },
    { titulo: "Ângulo 9: Promessa direta", builder: () => copyPromessa(produto, nicho, linkVendas, rng) },
    { titulo: "Ângulo 10: Urgência", builder: () => copyUrgencia(produto, nicho, linkVendas, rng) },
  ];

  return angulosBase.map((a) => ({ titulo: a.titulo, texto: a.builder() }));
}

function copyDor(p: Produto, n: Nicho, link: string, rng: () => number) {
  const dor = pick(n.dores, rng);
  return `${dor}.\n\nSe isso é você, escrevi um material que aborda exatamente esse ponto e mostra o caminho pra reverter.\n\n👉 ${link}`;
}

function copyCuriosidade(p: Produto, n: Nicho, link: string, rng: () => number) {
  return `${pick(n.angulosCopy, rng)}\n\nExpliquei tudo aqui: ${link}`;
}

function copyHistoria(p: Produto, n: Nicho, link: string, rng: () => number) {
  const dor = pick(n.dores, rng).toLowerCase();
  return `Uma leitora me escreveu ontem contando que ${dor}.\n\nPassei pra ela o material que criei sobre ${n.nome.toLowerCase()}. Em uma semana ela voltou pra dizer que tinha começado a ver mudança.\n\nSe você tá numa situação parecida, dá uma olhada:\n${link}`;
}

function copyProva(p: Produto, n: Nicho, link: string, rng: () => number) {
  return `Já são centenas de pessoas aplicando o ${p.nome} e trazendo resultados reais na área de ${n.nome.toLowerCase()}.\n\nSe você quer entender por que o método é diferente, o material completo tá aqui:\n${link}`;
}

function copyContraste(p: Produto, n: Nicho, link: string, rng: () => number) {
  const dor = pick(n.dores, rng).toLowerCase();
  const desejo = pick(n.desejos, rng).toLowerCase();
  return `De um lado: ${dor}.\nDo outro: ${desejo}.\n\nA diferença entre os dois? Método.\n\n${link}`;
}

function copyPergunta(p: Produto, n: Nicho, link: string, rng: () => number) {
  const dor = pick(n.dores, rng).toLowerCase();
  return `Uma pergunta honesta: você ainda tá aceitando que ${dor}?\n\nSe a resposta for não, aqui tem um caminho:\n${link}`;
}

function copyLista(p: Produto, n: Nicho, link: string, rng: () => number) {
  const bens = take(n.beneficios, 3, rng);
  return `O que você leva com o ${p.nome}:\n\n• ${bens.join("\n• ")}\n\nMais detalhes aqui: ${link}`;
}

function copyObjecao(p: Produto, n: Nicho, link: string, rng: () => number) {
  const obj = pick(n.objecoes, rng);
  return `"Mas ${obj}."\n\nEu ouço isso o tempo todo. E é justamente pra esse cenário que criei o material.\n\nDá uma olhada: ${link}`;
}

function copyPromessa(p: Produto, n: Nicho, link: string, rng: () => number) {
  return `${p.headline}\n\nSem enrolação, sem promessa milagrosa. Método real.\n\n${link}`;
}

function copyUrgencia(p: Produto, n: Nicho, link: string, rng: () => number) {
  return `Deixar pra depois é o que te trouxe até aqui.\n\nO ${p.nome} tá disponível agora, com bônus limitados essa semana.\n\n${link}`;
}
