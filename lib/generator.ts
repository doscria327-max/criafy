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

// ============================================================
// COPIES PROFISSIONAIS — 10 ângulos com estrutura persuasiva
// Cada copy tem: hook forte, desenvolvimento com dor/solução,
// prova ou lógica, quebra de objeção e CTA claro com link.
// ============================================================

function copyDor(p: Produto, n: Nicho, link: string, rng: () => number) {
  const dor1 = pick(n.dores, rng);
  const dor2 = pick(n.dores.filter(d => d !== dor1), rng);
  const desejo = pick(n.desejos, rng).toLowerCase();
  return `${dor1}.

E o pior: você já tentou de tudo. ${dor2.toLowerCase()}. E cada nova tentativa frustrada vai minando um pouco mais a esperança de que um dia isso possa mudar.

Eu passei anos entendendo por que a maioria das abordagens falha — e o que finalmente faz a diferença. O resultado desse trabalho está no ${p.nome}: um método construído pra quem quer ${desejo} sem passar pelos mesmos erros.

Se você chegou até aqui, provavelmente é o momento de tentar de forma diferente.

👉 ${link}`;
}

function copyCuriosidade(p: Produto, n: Nicho, link: string, rng: () => number) {
  const angulo = pick(n.angulosCopy, rng);
  const beneficio = pick(n.beneficios, rng).toLowerCase();
  return `${angulo}

Sério. E a resposta contraria quase tudo que te falaram até hoje sobre ${n.nome.toLowerCase()}.

Não é sobre esforço. Não é sobre disciplina. Não é sobre "querer mais". É sobre um princípio simples que quase ninguém aplica — e que muda completamente o jogo pra quem entende.

Explico tudo, passo a passo, no ${p.nome}. Você vai sair de lá sabendo exatamente por que nada funcionou até agora, e o que fazer pra ${beneficio}.

Acesso completo aqui 👇
${link}`;
}

function copyHistoria(p: Produto, n: Nicho, link: string, rng: () => number) {
  const dor = pick(n.dores, rng).toLowerCase();
  const desejo = pick(n.desejos, rng).toLowerCase();
  return `Semana passada uma pessoa me mandou mensagem dizendo o seguinte:

"${capitalize(dor)}. Já tentei tantas coisas que perdi a conta. Não acredito mais em nada."

Passei pra ela o ${p.nome}. Sem promessa mirabolante, sem prazo apertado. Só o método, do jeito que faço com todo mundo.

12 dias depois ela voltou. Não pra dizer que resolveu tudo — mas pra dizer que, pela primeira vez em muito tempo, ela conseguiu enxergar o caminho. E que finalmente parece possível ${desejo}.

Se você tá vivendo algo parecido, talvez seja hora de olhar por outro ângulo:
${link}`;
}

function copyProva(p: Produto, n: Nicho, link: string, rng: () => number) {
  const beneficio = pick(n.beneficios, rng).toLowerCase();
  return `Centenas de pessoas já aplicaram o ${p.nome}. E o feedback que mais se repete não é sobre a rapidez do resultado — é sobre a clareza do caminho.

A maior parte das pessoas não falha em ${n.nome.toLowerCase()} por preguiça. Falha por confusão. Recebe informação demais, de fontes contraditórias, e não sabe o que priorizar. O ${p.nome} organiza tudo em uma sequência lógica — o que fazer primeiro, o que fazer depois, o que ignorar completamente.

O resultado é gente que sai de anos travada e, em semanas, começa a ${beneficio}.

Se você quer entender por que este método é diferente:
${link}`;
}

function copyContraste(p: Produto, n: Nicho, link: string, rng: () => number) {
  const dor = pick(n.dores, rng).toLowerCase();
  const desejo1 = pick(n.desejos, rng).toLowerCase();
  const desejo2 = pick(n.desejos.filter(d => d.toLowerCase() !== desejo1), rng).toLowerCase();
  return `Existem dois tipos de pessoa lendo isso agora.

A primeira ainda acredita que vai conseguir sozinha. Que basta esforço, disciplina, "só mais uma tentativa". E enquanto tenta pela enésima vez, continua no lugar onde está: ${dor}.

A segunda entendeu que método bate esforço. Que quem tem um caminho mapeado chega mais rápido do que quem só tenta com força. Essa pessoa está a semanas de finalmente ${desejo1} e ${desejo2}.

A diferença entre as duas não é talento. É a decisão de parar de tentar aleatório e começar a fazer certo.

O ${p.nome} é esse caminho. Está aqui:
${link}`;
}

function copyPergunta(p: Produto, n: Nicho, link: string, rng: () => number) {
  const dor = pick(n.dores, rng).toLowerCase();
  const desejo = pick(n.desejos, rng).toLowerCase();
  return `Uma pergunta honesta pra você começar o dia:

Quanto tempo mais você vai aceitar que ${dor}?

Não é retórica. É uma pergunta prática. Porque cada semana que passa sem uma decisão real é mais uma semana no mesmo lugar. E daqui a 3 meses, 6 meses, 1 ano, a mesma frustração vai estar aí — só que multiplicada.

Ou você toma uma decisão diferente agora. E daqui a 90 dias começa a ${desejo}.

O ${p.nome} é a decisão diferente. Custa menos que um jantar e resolve o que anos de tentativa aleatória não resolveram:
${link}`;
}

function copyLista(p: Produto, n: Nicho, link: string, rng: () => number) {
  const bens = take(n.beneficios, 5, rng);
  const obj = pick(n.objecoes, rng);
  return `O que você leva com o ${p.nome}:

✅ ${bens[0]}
✅ ${bens[1]}
✅ ${bens[2]}
✅ ${bens[3]}
✅ ${bens[4]}

E antes que você pense "${obj.toLowerCase()}" — esse método foi construído justamente pra quem já pensou isso. Todos os passos são aplicáveis na sua realidade, do seu jeito, no seu ritmo.

Acesso imediato assim que confirmar:
${link}`;
}

function copyObjecao(p: Produto, n: Nicho, link: string, rng: () => number) {
  const obj = pick(n.objecoes, rng);
  const desejo = pick(n.desejos, rng).toLowerCase();
  return `"Mas ${obj.toLowerCase()}."

Eu ouço essa frase todo dia. E entendo — faz sentido pensar assim depois de tantas tentativas frustradas. Mas deixa eu te contar uma coisa: essa objeção específica é exatamente o que o ${p.nome} resolve.

Não vou te pedir pra acreditar em promessa. Vou te pedir pra ler o material, aplicar por 14 dias, e ver por si mesmo se faz sentido. Se não fizer, você não perdeu quase nada. Se fizer, você acabou de encontrar o caminho pra finalmente ${desejo}.

O acesso completo tá aqui:
${link}`;
}

function copyPromessa(p: Produto, n: Nicho, link: string, rng: () => number) {
  const desejo = pick(n.desejos, rng).toLowerCase();
  const beneficio = pick(n.beneficios, rng).toLowerCase();
  return `${p.headline}

Sem promessa milagrosa. Sem "resultado em 7 dias". Sem prometer que sua vida vai mudar do nada.

O que o ${p.nome} entrega é método real: um caminho estruturado pra você ${desejo}, aplicando um passo por vez, no seu ritmo. Você vai ${beneficio} porque o método foi construído pra isso — não porque a copy prometeu bonito.

Se você prefere resultado real a discurso motivacional, esse material foi feito pra você:
${link}`;
}

function copyUrgencia(p: Produto, n: Nicho, link: string, rng: () => number) {
  const dor = pick(n.dores, rng).toLowerCase();
  return `Deixar pra depois é exatamente o que te trouxe até aqui.

Cada vez que você adiou a decisão, cada vez que "amanhã começo", cada vez que "esse mês tá corrido" — o resultado foi o mesmo: ${dor}. E não é falha sua. É natural. Só que a única forma de sair desse ciclo é fazer uma escolha diferente hoje.

O ${p.nome} está com condições especiais essa semana + bônus que só entram nas primeiras adesões. Depois disso, o valor volta ao normal e alguns bônus saem.

Se hoje é o dia em que você decide diferente:
${link}`;
}

// Helper
function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
