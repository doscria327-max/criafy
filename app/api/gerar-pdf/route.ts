import { NextRequest } from "next/server";
import PDFDocument from "pdfkit";
import { encontrarNicho } from "@/lib/nichos-db";
import { pegarLivroDoNicho, type LivroConteudo, type Capitulo, type Secao } from "@/lib/ebook-conteudo";
import type { Produto } from "@/lib/storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

// ============================================================
// PALETA DE CORES — livro editorial
// ============================================================
const INK = "#1a1a1a";           // preto tipografia
const INK_SOFT = "#3a3a3a";      // preto suavizado
const INK_MUTED = "#5a5a5a";     // preto muito suave (subtítulos)
const GRAY = "#767676";          // metadados
const GRAY_MID = "#a0a0a0";
const GRAY_LIGHT = "#d4d4d4";    // linhas discretas
const GRAY_BG = "#f5f2ec";       // fundo suave
const CREAM = "#faf7f2";         // fundo caixas
const CREAM_DARK = "#efe9de";    // fundo caixas mais fortes
const WHITE = "#ffffff";

// Cor principal por nicho (usada em detalhes, epígrafes, drop caps)
const CORES_NICHO: Record<string, { primary: string; light: string; dark: string; bg: string }> = {
  emagrecimento: { primary: "#c0392b", light: "#f5b7b1", dark: "#78281f", bg: "#fdedec" },
  financas:      { primary: "#0f766e", light: "#a7f3d0", dark: "#064e3b", bg: "#ecfdf5" },
  relacionamento:{ primary: "#be185d", light: "#fbcfe8", dark: "#831843", bg: "#fdf2f8" },
  carreira:      { primary: "#1e40af", light: "#bfdbfe", dark: "#1e3a8a", bg: "#eff6ff" },
  marketing:     { primary: "#5b21b6", light: "#ddd6fe", dark: "#4c1d95", bg: "#f5f3ff" },
  espiritualidade:{ primary: "#6d28d9", light: "#e9d5ff", dark: "#5b21b6", bg: "#faf5ff" },
  culinaria:     { primary: "#c2410c", light: "#fed7aa", dark: "#7c2d12", bg: "#fff7ed" },
  estudos:       { primary: "#1e3a8a", light: "#c7d2fe", dark: "#1e3a8a", bg: "#eef2ff" },
  generico:      { primary: "#1a1a1a", light: "#d4d4d4", dark: "#000000", bg: "#f5f2ec" },
};

function paletaDoNicho(nichoId: string) {
  return CORES_NICHO[nichoId] || CORES_NICHO.generico;
}

// ============================================================
// ROUTE HANDLER
// ============================================================
export async function POST(req: NextRequest) {
  try {
    const { produto } = (await req.json()) as { produto: Produto };
    if (!produto) {
      return new Response(JSON.stringify({ error: "produto obrigatório" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const nicho = encontrarNicho(produto.nicho);
    const livro = pegarLivroDoNicho(nicho.id);
    const paleta = paletaDoNicho(nicho.id);

    const buffer: Buffer = await new Promise((resolve, reject) => {
      const doc = new PDFDocument({
        size: "A5", // formato de livro
        margins: { top: 68, bottom: 72, left: 58, right: 58 },
        info: {
          Title: livro ? livro.titulo : produto.nome,
          Author: produto.publico,
          Subject: livro ? livro.subtitulo : produto.promessa,
          Keywords: produto.nicho,
        },
        bufferPages: true,
      });

      const chunks: Buffer[] = [];
      doc.on("data", (c) => chunks.push(c));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);

      // ============================================================
      // DIMENSÕES E CONSTANTES
      // ============================================================
      const PAGE_W = doc.page.width;
      const PAGE_H = doc.page.height;
      const MARGIN = 58;
      const CONTENT_W = PAGE_W - MARGIN * 2;
      const BOTTOM_LIMIT = PAGE_H - 90; // limite antes de estourar rodapé

      // ============================================================
      // HELPER: garantir espaço na página, senão nova página
      // ============================================================
      function precisaEspaco(altura: number) {
        if (doc.y + altura > BOTTOM_LIMIT) {
          doc.addPage();
          desenharCabecaloCorrente(doc.page.number);
        }
      }

      // ============================================================
      // ORNAMENTOS VETORIAIS
      // ============================================================
      function ornamento(y: number, corAtual = paleta.primary) {
        const cx = PAGE_W / 2;
        doc.strokeColor(corAtual).lineWidth(0.7);
        doc.moveTo(cx - 55, y).lineTo(cx - 12, y).stroke();
        doc.moveTo(cx + 12, y).lineTo(cx + 55, y).stroke();
        // Diamante central
        doc.fillColor(corAtual);
        doc.polygon([cx, y - 3.5], [cx + 3.5, y], [cx, y + 3.5], [cx - 3.5, y]).fill();
        // Pequenos círculos laterais
        doc.circle(cx - 62, y, 1.2).fill();
        doc.circle(cx + 62, y, 1.2).fill();
      }

      function ornamentoDuplo(y: number) {
        ornamento(y, paleta.primary);
        ornamento(y + 8, paleta.light);
      }

      function ornamentoFleuron(y: number) {
        // Padrão floral estilizado feito de círculos e linhas
        const cx = PAGE_W / 2;
        doc.strokeColor(paleta.primary).lineWidth(0.5);
        doc.fillColor(paleta.primary);

        // Linhas horizontais laterais
        doc.moveTo(cx - 70, y).lineTo(cx - 20, y).stroke();
        doc.moveTo(cx + 20, y).lineTo(cx + 70, y).stroke();

        // Padrão central (3 diamantes)
        for (let i = -1; i <= 1; i++) {
          const x = cx + i * 12;
          doc.polygon([x, y - 4], [x + 4, y], [x, y + 4], [x - 4, y]).fill();
        }
      }

      function corner(y: number) {
        doc.strokeColor(GRAY_LIGHT).lineWidth(0.3);
        doc.moveTo(MARGIN, y).lineTo(MARGIN + 22, y).stroke();
        doc.moveTo(PAGE_W - MARGIN - 22, y).lineTo(PAGE_W - MARGIN, y).stroke();
      }

      function dropCap(letra: string, x: number, y: number, cor: string) {
        doc.fillColor(cor).font("Helvetica-Bold").fontSize(48);
        doc.text(letra, x, y - 8, { lineBreak: false, width: 44 });
      }

      // ============================================================
      // ILUSTRAÇÕES VETORIAIS DE ABERTURA DE CAPÍTULO
      // Cada capítulo ganha uma composição geométrica única na abertura
      // ============================================================
      function ilustracaoCapitulo(numero: number, cx: number, cy: number) {
        doc.save();

        const p = paleta.primary;
        const l = paleta.light;
        const d = paleta.dark;

        // Padrão diferente para cada número de capítulo (1-8)
        const padrao = ((numero - 1) % 8) + 1;

        if (padrao === 1) {
          // Círculos concêntricos
          doc.strokeColor(p).lineWidth(0.8);
          doc.circle(cx, cy, 22).stroke();
          doc.strokeColor(l).lineWidth(0.6);
          doc.circle(cx, cy, 15).stroke();
          doc.fillColor(p).circle(cx, cy, 5).fill();
        } else if (padrao === 2) {
          // Triângulo com pontos
          doc.strokeColor(p).lineWidth(0.8);
          doc.polygon([cx, cy - 20], [cx + 18, cy + 12], [cx - 18, cy + 12]).stroke();
          doc.fillColor(p);
          doc.circle(cx, cy - 20, 2).fill();
          doc.circle(cx + 18, cy + 12, 2).fill();
          doc.circle(cx - 18, cy + 12, 2).fill();
          doc.fillColor(l).circle(cx, cy - 2, 3).fill();
        } else if (padrao === 3) {
          // Losango decorativo
          doc.strokeColor(p).lineWidth(0.8);
          doc.polygon([cx, cy - 22], [cx + 18, cy], [cx, cy + 22], [cx - 18, cy]).stroke();
          doc.strokeColor(l).lineWidth(0.6);
          doc.polygon([cx, cy - 12], [cx + 9, cy], [cx, cy + 12], [cx - 9, cy]).stroke();
          doc.fillColor(p).circle(cx, cy, 2.5).fill();
        } else if (padrao === 4) {
          // Sol estilizado
          doc.strokeColor(p).lineWidth(0.7);
          for (let i = 0; i < 8; i++) {
            const ang = (i * Math.PI) / 4;
            const x1 = cx + Math.cos(ang) * 12;
            const y1 = cy + Math.sin(ang) * 12;
            const x2 = cx + Math.cos(ang) * 22;
            const y2 = cy + Math.sin(ang) * 22;
            doc.moveTo(x1, y1).lineTo(x2, y2).stroke();
          }
          doc.fillColor(p).circle(cx, cy, 7).fill();
          doc.fillColor(l).circle(cx, cy, 3.5).fill();
        } else if (padrao === 5) {
          // Grid de pontos com quadrado
          doc.strokeColor(p).lineWidth(0.8);
          doc.rect(cx - 18, cy - 18, 36, 36).stroke();
          doc.fillColor(p);
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              doc.circle(cx + i * 10, cy + j * 10, 1.8).fill();
            }
          }
          doc.fillColor(l).circle(cx, cy, 3).fill();
        } else if (padrao === 6) {
          // Ondas concêntricas
          doc.strokeColor(p).lineWidth(0.7);
          for (let r = 8; r <= 24; r += 8) {
            doc.circle(cx, cy, r).stroke();
          }
          doc.fillColor(p).circle(cx, cy, 3).fill();
          doc.fillColor(l);
          doc.circle(cx - 24, cy, 1.5).fill();
          doc.circle(cx + 24, cy, 1.5).fill();
        } else if (padrao === 7) {
          // Estrela geométrica de 6 pontas
          doc.strokeColor(p).lineWidth(0.7);
          doc.polygon([cx, cy - 20], [cx + 17, cy - 10], [cx + 17, cy + 10], [cx, cy + 20], [cx - 17, cy + 10], [cx - 17, cy - 10]).stroke();
          doc.strokeColor(l).lineWidth(0.5);
          doc.polygon([cx, cy + 20], [cx - 17, cy - 10], [cx + 17, cy - 10]).stroke();
          doc.polygon([cx, cy - 20], [cx - 17, cy + 10], [cx + 17, cy + 10]).stroke();
          doc.fillColor(p).circle(cx, cy, 2.5).fill();
        } else {
          // Padrão 8: torre de losangos
          doc.fillColor(p);
          doc.polygon([cx, cy - 20], [cx + 10, cy - 10], [cx, cy], [cx - 10, cy - 10]).fill();
          doc.fillColor(l);
          doc.polygon([cx, cy], [cx + 10, cy + 10], [cx, cy + 20], [cx - 10, cy + 10]).fill();
          doc.strokeColor(d).lineWidth(0.6);
          doc.polygon([cx, cy - 22], [cx + 12, cy - 10], [cx + 12, cy + 10], [cx, cy + 22], [cx - 12, cy + 10], [cx - 12, cy - 10]).stroke();
        }

        doc.restore();
      }

      // ============================================================
      // ÍCONES para caixas especiais (exercícios, citações, estatísticas)
      // ============================================================
      function iconeExercicio(x: number, y: number, cor: string) {
        // Círculo com check estilizado
        doc.save();
        doc.fillColor(cor).circle(x, y, 7).fill();
        doc.strokeColor(WHITE).lineWidth(1.4).lineCap("round").lineJoin("round");
        doc.moveTo(x - 3, y).lineTo(x - 1, y + 2.5).lineTo(x + 3.5, y - 2.5).stroke();
        doc.restore();
      }

      function iconeCitacao(x: number, y: number, cor: string) {
        // Aspas grandes estilizadas
        doc.save();
        doc.fillColor(cor).font("Helvetica-Bold").fontSize(24);
        doc.text('"', x - 5, y - 14, { lineBreak: false, width: 20 });
        doc.restore();
      }

      function iconeEstatistica(x: number, y: number, cor: string) {
        // Barra de gráfico simplificada
        doc.save();
        doc.fillColor(cor);
        doc.rect(x - 6, y - 1, 2.5, 5).fill();
        doc.rect(x - 2, y - 4, 2.5, 8).fill();
        doc.rect(x + 2, y - 7, 2.5, 11).fill();
        doc.restore();
      }

      function iconeLista(x: number, y: number, cor: string) {
        doc.save();
        doc.fillColor(cor);
        doc.circle(x, y, 2).fill();
        doc.restore();
      }

      function iconeDestaque(x: number, y: number, cor: string) {
        // Losango pequeno
        doc.save();
        doc.fillColor(cor);
        doc.polygon([x, y - 5], [x + 5, y], [x, y + 5], [x - 5, y]).fill();
        doc.restore();
      }

      // ============================================================
      // RODAPÉ / CABEÇALHO CORRENTE
      // ============================================================
      function footer(paginaAtual: number, tituloLivro: string) {
        const y = PAGE_H - 40;
        // Linha fina
        doc.strokeColor(GRAY_LIGHT).lineWidth(0.3);
        doc.moveTo(MARGIN + 20, y - 8).lineTo(PAGE_W - MARGIN - 20, y - 8).stroke();
        doc.fillColor(GRAY).font("Helvetica").fontSize(8);
        doc.text(`${paginaAtual}`, MARGIN, y, {
          width: CONTENT_W,
          align: "center",
          lineBreak: false,
          characterSpacing: 1,
        });
      }

      function desenharCabecaloCorrente(pagina: number) {
        if (pagina < 5) return;
        // Cabeçalho corrente pequeno (nome do livro)
        const y = 32;
        const nomeAbrev = livro?.titulo || produto.nome;
        doc.fillColor(GRAY).font("Helvetica-Oblique").fontSize(7.5);
        doc.text(nomeAbrev.toUpperCase(), MARGIN, y, {
          width: CONTENT_W,
          align: pagina % 2 === 0 ? "left" : "right",
          characterSpacing: 2,
          lineBreak: false,
        });
        doc.strokeColor(GRAY_LIGHT).lineWidth(0.3);
        doc.moveTo(MARGIN + 20, y + 12).lineTo(PAGE_W - MARGIN - 20, y + 12).stroke();
      }

      // ============================================================
      // ESCRITA DE PARÁGRAFOS
      // ============================================================
      function paragrafo(
        txt: string,
        opts: { fontSize?: number; leading?: number; indent?: number; align?: any; cor?: string; italico?: boolean; bold?: boolean } = {}
      ) {
        precisaEspaco(30);
        const font = opts.bold ? "Helvetica-Bold" : opts.italico ? "Helvetica-Oblique" : "Helvetica";
        doc.fillColor(opts.cor || INK).font(font).fontSize(opts.fontSize || 10.5);
        doc.text(txt, {
          width: CONTENT_W,
          align: opts.align || "justify",
          lineGap: opts.leading ?? 2.5,
          indent: opts.indent ?? 16,
        });
      }

      function paragrafoComDropCap(txt: string) {
        precisaEspaco(80);
        const letra = txt.charAt(0).toUpperCase();
        const resto = txt.slice(1);
        const startY = doc.y;
        dropCap(letra, MARGIN, startY, paleta.primary);
        doc.fillColor(INK).font("Helvetica").fontSize(10.5);
        doc.text(resto, MARGIN + 36, startY + 6, {
          width: CONTENT_W - 36,
          align: "justify",
          lineGap: 2.5,
        });
      }

      function tituloSecao(txt: string) {
        precisaEspaco(50);
        doc.moveDown(0.8);
        // Marca decorativa
        const y0 = doc.y;
        doc.fillColor(paleta.primary);
        doc.rect(MARGIN, y0 + 3, 3, 12).fill();
        doc.fillColor(INK).font("Helvetica-Bold").fontSize(12.5);
        doc.text(txt, MARGIN + 10, y0, {
          width: CONTENT_W - 10,
          align: "left",
        });
        doc.moveDown(0.4);
      }

      // ============================================================
      // RENDERIZADORES DE SEÇÕES ESPECIAIS
      // ============================================================

      // LISTA — bullets com marcadores decorativos
      function renderLista(lista: { titulo?: string; itens: string[] }) {
        precisaEspaco(30 + lista.itens.length * 20);
        doc.moveDown(0.5);
        if (lista.titulo) {
          doc.fillColor(paleta.dark).font("Helvetica-Bold").fontSize(10);
          doc.text(lista.titulo, MARGIN, doc.y, {
            width: CONTENT_W,
            align: "left",
          });
          doc.moveDown(0.4);
        }
        lista.itens.forEach((item) => {
          precisaEspaco(20);
          const y = doc.y + 4;
          iconeLista(MARGIN + 6, y, paleta.primary);
          doc.fillColor(INK_SOFT).font("Helvetica").fontSize(10);
          doc.text(item, MARGIN + 16, doc.y, {
            width: CONTENT_W - 16,
            align: "left",
            lineGap: 2,
          });
          doc.moveDown(0.35);
        });
        doc.moveDown(0.4);
      }

      // CITAÇÃO — bloco com barra vertical e aspas
      function renderCitacao(cit: { texto: string; autor?: string }) {
        precisaEspaco(70);
        doc.moveDown(0.8);
        const startY = doc.y;

        // Aspas decorativa
        iconeCitacao(MARGIN + 14, startY + 6, paleta.light);

        // Texto da citação
        doc.fillColor(INK_SOFT).font("Helvetica-Oblique").fontSize(11.5);
        doc.text(cit.texto, MARGIN + 30, startY + 4, {
          width: CONTENT_W - 40,
          align: "left",
          lineGap: 3,
        });

        // Barra vertical
        const endY = doc.y + 2;
        doc.strokeColor(paleta.primary).lineWidth(2.5);
        doc.moveTo(MARGIN, startY + 4).lineTo(MARGIN, endY).stroke();

        // Autor
        if (cit.autor) {
          doc.moveDown(0.2);
          doc.fillColor(GRAY).font("Helvetica").fontSize(9);
          doc.text(`— ${cit.autor}`, MARGIN + 30, doc.y, {
            width: CONTENT_W - 40,
            align: "left",
          });
        }
        doc.moveDown(0.8);
      }

      // DESTAQUE — caixa colorida com fundo suave
      function renderDestaque(txt: string) {
        precisaEspaco(70);
        doc.moveDown(0.5);
        const startY = doc.y;

        // Simular o texto pra medir altura
        doc.fillColor(paleta.dark).font("Helvetica-Bold").fontSize(10.5);
        const alturaTexto = doc.heightOfString(txt, {
          width: CONTENT_W - 44,
          align: "left",
          lineGap: 2.5,
        });
        const alturaBox = alturaTexto + 24;

        // Fundo
        doc.fillColor(paleta.bg);
        doc.roundedRect(MARGIN, startY, CONTENT_W, alturaBox, 4).fill();
        // Barra lateral colorida
        doc.fillColor(paleta.primary);
        doc.rect(MARGIN, startY, 4, alturaBox).fill();
        // Ícone
        iconeDestaque(MARGIN + 20, startY + 14, paleta.primary);

        // Texto
        doc.fillColor(paleta.dark).font("Helvetica-Bold").fontSize(10.5);
        doc.text(txt, MARGIN + 32, startY + 12, {
          width: CONTENT_W - 44,
          align: "left",
          lineGap: 2.5,
        });

        doc.y = startY + alturaBox + 8;
      }

      // EXERCÍCIO — caixa estruturada com passos numerados
      function renderExercicio(ex: { titulo: string; passos: string[] }) {
        const alturaEstim = 60 + ex.passos.length * 22;
        precisaEspaco(alturaEstim);
        doc.moveDown(0.7);
        const startY = doc.y;

        // Simular altura real
        doc.fillColor(INK).font("Helvetica").fontSize(10);
        let alturaBox = 40; // header
        ex.passos.forEach((p) => {
          const h = doc.heightOfString(p, { width: CONTENT_W - 60, align: "left", lineGap: 2 });
          alturaBox += h + 8;
        });
        alturaBox += 12;

        // Fundo cream
        doc.fillColor(CREAM);
        doc.roundedRect(MARGIN, startY, CONTENT_W, alturaBox, 5).fill();
        // Borda
        doc.strokeColor(paleta.light).lineWidth(0.8);
        doc.roundedRect(MARGIN, startY, CONTENT_W, alturaBox, 5).stroke();

        // Ícone de exercício
        iconeExercicio(MARGIN + 18, startY + 20, paleta.primary);

        // Título
        doc.fillColor(paleta.dark).font("Helvetica-Bold").fontSize(11);
        doc.text("EXERCÍCIO PRÁTICO", MARGIN + 32, startY + 12, {
          width: CONTENT_W - 44,
          align: "left",
          characterSpacing: 1,
          lineBreak: false,
        });

        // Subtítulo
        doc.fillColor(INK).font("Helvetica-Bold").fontSize(10.5);
        doc.text(ex.titulo, MARGIN + 32, startY + 26, {
          width: CONTENT_W - 44,
          align: "left",
        });

        // Passos numerados
        let yAtual = startY + 46;
        ex.passos.forEach((passo, i) => {
          // Número circular
          doc.fillColor(paleta.primary).circle(MARGIN + 20, yAtual + 5, 8).fill();
          doc.fillColor(WHITE).font("Helvetica-Bold").fontSize(8);
          doc.text(String(i + 1), MARGIN + 12, yAtual + 1.5, {
            width: 16,
            align: "center",
            lineBreak: false,
          });
          // Texto do passo
          doc.fillColor(INK).font("Helvetica").fontSize(10);
          doc.text(passo, MARGIN + 34, yAtual, {
            width: CONTENT_W - 46,
            align: "left",
            lineGap: 2,
          });
          const h = doc.heightOfString(passo, { width: CONTENT_W - 46, align: "left", lineGap: 2 });
          yAtual += h + 8;
        });

        doc.y = startY + alturaBox + 10;
      }

      // ESTATÍSTICA — caixa com número grande e explicação
      function renderEstatistica(est: { numero: string; texto: string }) {
        precisaEspaco(80);
        doc.moveDown(0.7);
        const startY = doc.y;

        // Fundo escuro decorativo
        doc.fillColor(paleta.dark);
        doc.roundedRect(MARGIN, startY, CONTENT_W, 68, 5).fill();

        // Ícone gráfico
        iconeEstatistica(MARGIN + 22, startY + 32, paleta.light);

        // Número grande à esquerda
        doc.fillColor(WHITE).font("Helvetica-Bold").fontSize(26);
        doc.text(est.numero, MARGIN + 40, startY + 16, {
          width: 110,
          align: "left",
          lineBreak: false,
        });

        // Divisor vertical
        doc.strokeColor(paleta.light).lineWidth(0.6);
        doc.moveTo(MARGIN + 155, startY + 14).lineTo(MARGIN + 155, startY + 54).stroke();

        // Texto explicativo à direita
        doc.fillColor(WHITE).font("Helvetica").fontSize(9.5);
        doc.text(est.texto, MARGIN + 165, startY + 18, {
          width: CONTENT_W - 175,
          align: "left",
          lineGap: 2,
        });

        doc.y = startY + 76;
      }

      // ============================================================
      // RENDERIZAR SEÇÃO COMPLETA (título + parágrafos + extras)
      // ============================================================
      function renderSecao(secao: Secao) {
        if (secao.titulo) tituloSecao(secao.titulo);

        secao.paragrafos.forEach((p, idx) => {
          paragrafo(p);
          if (idx < secao.paragrafos.length - 1) doc.moveDown(0.4);
        });

        if (secao.lista) renderLista(secao.lista);
        if (secao.citacao) renderCitacao(secao.citacao);
        if (secao.destaque) renderDestaque(secao.destaque);
        if (secao.exercicio) renderExercicio(secao.exercicio);
        if (secao.estatistica) renderEstatistica(secao.estatistica);

        doc.moveDown(0.5);
      }

      // ============================================================
      // RENDERIZAR CAPÍTULO INTEIRO
      // ============================================================
      function renderCapitulo(cap: Capitulo, totalCapitulos: number) {
        doc.addPage();
        desenharCabecaloCorrente(doc.page.number);

        // Página de abertura: número, ilustração vetorial, título, subtítulo, epígrafe
        doc.moveDown(2);

        // Número decorativo (topo)
        doc.fillColor(paleta.primary).font("Helvetica-Bold").fontSize(9);
        doc.text(`CAPÍTULO ${String(cap.numero).padStart(2, "0")}`, MARGIN, doc.y, {
          width: CONTENT_W,
          align: "center",
          characterSpacing: 4,
        });
        doc.moveDown(1.5);

        // Ilustração vetorial centralizada
        const ilustY = doc.y + 30;
        ilustracaoCapitulo(cap.numero, PAGE_W / 2, ilustY);
        doc.y = ilustY + 45;

        // Título
        doc.moveDown(0.5);
        doc.fillColor(INK).font("Helvetica-Bold").fontSize(22);
        doc.text(cap.titulo, MARGIN, doc.y, {
          width: CONTENT_W,
          align: "center",
          lineGap: -1,
        });

        // Subtítulo
        if (cap.subtitulo) {
          doc.moveDown(0.4);
          doc.fillColor(INK_MUTED).font("Helvetica-Oblique").fontSize(11);
          doc.text(cap.subtitulo, MARGIN, doc.y, {
            width: CONTENT_W,
            align: "center",
            lineGap: 2,
          });
        }

        // Ornamento
        doc.moveDown(1);
        ornamento(doc.y, paleta.primary);

        // Epígrafe
        if (cap.epigrafe) {
          doc.moveDown(1);
          doc.fillColor(INK_MUTED).font("Helvetica-Oblique").fontSize(10.5);
          const epTxt = `"${cap.epigrafe.texto}"`;
          doc.text(epTxt, MARGIN + 30, doc.y, {
            width: CONTENT_W - 60,
            align: "center",
            lineGap: 3,
          });
          if (cap.epigrafe.autor) {
            doc.moveDown(0.3);
            doc.fillColor(GRAY).font("Helvetica").fontSize(9);
            doc.text(`— ${cap.epigrafe.autor}`, MARGIN, doc.y, {
              width: CONTENT_W,
              align: "center",
            });
          }
        }

        // ==== NOVA PÁGINA COM CONTEÚDO ====
        doc.addPage();
        desenharCabecaloCorrente(doc.page.number);
        doc.moveDown(1);

        // Primeira seção começa com drop cap
        const primeiraSecao = cap.secoes[0];
        if (primeiraSecao) {
          if (primeiraSecao.titulo) tituloSecao(primeiraSecao.titulo);

          if (primeiraSecao.paragrafos.length > 0) {
            paragrafoComDropCap(primeiraSecao.paragrafos[0]);
            doc.moveDown(0.5);
            primeiraSecao.paragrafos.slice(1).forEach((p, idx) => {
              paragrafo(p);
              if (idx < primeiraSecao.paragrafos.length - 2) doc.moveDown(0.4);
            });
          }

          if (primeiraSecao.lista) renderLista(primeiraSecao.lista);
          if (primeiraSecao.citacao) renderCitacao(primeiraSecao.citacao);
          if (primeiraSecao.destaque) renderDestaque(primeiraSecao.destaque);
          if (primeiraSecao.exercicio) renderExercicio(primeiraSecao.exercicio);
          if (primeiraSecao.estatistica) renderEstatistica(primeiraSecao.estatistica);
          doc.moveDown(0.5);
        }

        // Demais seções
        cap.secoes.slice(1).forEach((secao) => renderSecao(secao));

        // ==== RESUMO NO FIM DO CAPÍTULO ====
        precisaEspaco(120);
        doc.moveDown(1.5);

        // Ornamento antes do resumo
        ornamento(doc.y, paleta.primary);
        doc.moveDown(0.8);

        // Título "Resumo do capítulo"
        doc.fillColor(paleta.dark).font("Helvetica-Bold").fontSize(11);
        doc.text("RESUMO DO CAPÍTULO", MARGIN, doc.y, {
          width: CONTENT_W,
          align: "center",
          characterSpacing: 3,
        });
        doc.moveDown(0.5);

        // Caixa de resumo
        const yResumo = doc.y;
        doc.fillColor(paleta.bg);
        const alturaResumo = cap.resumo.length * 22 + 20;
        doc.roundedRect(MARGIN, yResumo, CONTENT_W, alturaResumo, 4).fill();

        let yBullet = yResumo + 14;
        cap.resumo.forEach((r) => {
          // Bullet
          doc.fillColor(paleta.primary).circle(MARGIN + 14, yBullet + 4, 2.5).fill();
          // Texto
          doc.fillColor(INK).font("Helvetica").fontSize(10);
          doc.text(r, MARGIN + 24, yBullet, {
            width: CONTENT_W - 32,
            align: "left",
            lineGap: 1.5,
          });
          const h = doc.heightOfString(r, { width: CONTENT_W - 32, align: "left", lineGap: 1.5 });
          yBullet += h + 6;
        });
        doc.y = yResumo + alturaResumo + 10;
      }

      // ============================================================
      // FALLBACK: nichos SEM livro completo — usa capitulosPdf simples
      // ============================================================
      function renderCapituloSimples(cap: { titulo: string; paragrafos: string[] }, idx: number) {
        doc.addPage();
        desenharCabecaloCorrente(doc.page.number);
        doc.moveDown(2);

        doc.fillColor(paleta.primary).font("Helvetica-Bold").fontSize(9);
        doc.text(`CAPÍTULO ${String(idx + 1).padStart(2, "0")}`, MARGIN, doc.y, {
          width: CONTENT_W,
          align: "center",
          characterSpacing: 4,
        });
        doc.moveDown(1.5);

        // Ilustração
        const ilustY = doc.y + 30;
        ilustracaoCapitulo(idx + 1, PAGE_W / 2, ilustY);
        doc.y = ilustY + 45;

        doc.moveDown(0.5);
        doc.fillColor(INK).font("Helvetica-Bold").fontSize(22);
        doc.text(cap.titulo, MARGIN, doc.y, {
          width: CONTENT_W,
          align: "center",
        });
        doc.moveDown(1);
        ornamento(doc.y, paleta.primary);

        doc.addPage();
        desenharCabecaloCorrente(doc.page.number);
        doc.moveDown(1);

        if (cap.paragrafos.length > 0) {
          paragrafoComDropCap(cap.paragrafos[0]);
          doc.moveDown(0.5);
          cap.paragrafos.slice(1).forEach((p, i) => {
            paragrafo(p);
            if (i < cap.paragrafos.length - 2) doc.moveDown(0.4);
          });
        }
      }

      // ============================================================
      // ============================================================
      // ========== INÍCIO DA GERAÇÃO DO DOCUMENTO PDF ==============
      // ============================================================
      // ============================================================

      const tituloLivro = livro?.titulo || produto.nome;
      const subtituloLivro = livro?.subtitulo || produto.promessa;
      const dedicatoria = livro?.dedicatoria || `Para você,\nque decidiu que hoje era o dia certo\npara começar.`;

      // ============================================================
      // PÁGINA 1 — CAPA
      // ============================================================

      // Fundo cor sólida sutil
      doc.fillColor(paleta.bg);
      doc.rect(0, 0, PAGE_W, PAGE_H).fill();

      // Moldura ornamental dupla
      doc.strokeColor(paleta.primary).lineWidth(0.8);
      doc.rect(28, 28, PAGE_W - 56, PAGE_H - 56).stroke();
      doc.strokeColor(paleta.primary).lineWidth(0.3);
      doc.rect(34, 34, PAGE_W - 68, PAGE_H - 68).stroke();

      // Cantos decorativos
      const cornerSize = 14;
      doc.strokeColor(paleta.primary).lineWidth(1.5);
      // top-left
      doc.moveTo(28, 28 + cornerSize).lineTo(28, 28).lineTo(28 + cornerSize, 28).stroke();
      // top-right
      doc.moveTo(PAGE_W - 28 - cornerSize, 28).lineTo(PAGE_W - 28, 28).lineTo(PAGE_W - 28, 28 + cornerSize).stroke();
      // bottom-left
      doc.moveTo(28, PAGE_H - 28 - cornerSize).lineTo(28, PAGE_H - 28).lineTo(28 + cornerSize, PAGE_H - 28).stroke();
      // bottom-right
      doc.moveTo(PAGE_W - 28 - cornerSize, PAGE_H - 28).lineTo(PAGE_W - 28, PAGE_H - 28).lineTo(PAGE_W - 28, PAGE_H - 28 - cornerSize).stroke();

      // Nicho pequeno topo
      doc.fillColor(paleta.primary).font("Helvetica-Bold").fontSize(9);
      doc.text(nicho.nome.toUpperCase(), MARGIN, 76, {
        width: CONTENT_W,
        align: "center",
        characterSpacing: 5,
      });

      // Ornamento superior
      ornamento(96);

      // Ilustração vetorial grande centralizada
      const capaIlustY = PAGE_H / 2 - 165;
      ilustracaoCapitulo(1, PAGE_W / 2, capaIlustY);
      // Ilustração adicional dupla
      ilustracaoCapitulo(3, PAGE_W / 2 - 60, capaIlustY);
      ilustracaoCapitulo(5, PAGE_W / 2 + 60, capaIlustY);

      // Título principal grande
      doc.fillColor(INK).font("Helvetica-Bold").fontSize(30);
      doc.text(tituloLivro, MARGIN, PAGE_H / 2 - 70, {
        width: CONTENT_W,
        align: "center",
        lineGap: -2,
      });

      // Divisor central
      doc.strokeColor(paleta.primary).lineWidth(0.8);
      doc.moveTo(PAGE_W / 2 - 30, doc.y + 14).lineTo(PAGE_W / 2 + 30, doc.y + 14).stroke();
      doc.moveDown(1.3);

      // Subtítulo (promessa)
      doc.fillColor(INK_SOFT).font("Helvetica-Oblique").fontSize(12);
      doc.text(subtituloLivro, MARGIN + 20, doc.y, {
        width: CONTENT_W - 40,
        align: "center",
        lineGap: 4,
      });

      // Ornamento inferior duplo
      ornamentoFleuron(PAGE_H - 140);

      // "Para" (público)
      doc.fillColor(GRAY).font("Helvetica").fontSize(8);
      doc.text("UM GUIA COMPLETO PARA", MARGIN, PAGE_H - 118, {
        width: CONTENT_W,
        align: "center",
        characterSpacing: 3,
      });
      doc.moveDown(0.3);
      doc.fillColor(INK_SOFT).font("Helvetica-Oblique").fontSize(11);
      doc.text(produto.publico, MARGIN, doc.y, {
        width: CONTENT_W,
        align: "center",
      });

      // ============================================================
      // PÁGINA 2 — FOLHA DE ROSTO
      // ============================================================
      doc.addPage();
      doc.moveDown(6);
      doc.fillColor(paleta.primary).font("Helvetica-Bold").fontSize(8);
      doc.text(nicho.nome.toUpperCase(), MARGIN, doc.y, {
        width: CONTENT_W,
        align: "center",
        characterSpacing: 5,
      });
      doc.moveDown(1.5);
      ornamento(doc.y, paleta.primary);
      doc.moveDown(1);
      doc.fillColor(INK).font("Helvetica-Bold").fontSize(24);
      doc.text(tituloLivro, MARGIN, doc.y, {
        width: CONTENT_W,
        align: "center",
        lineGap: -1,
      });
      doc.moveDown(0.5);
      doc.fillColor(INK_MUTED).font("Helvetica-Oblique").fontSize(11);
      doc.text(subtituloLivro, MARGIN, doc.y, {
        width: CONTENT_W,
        align: "center",
        lineGap: 3,
      });
      doc.moveDown(1);
      ornamentoFleuron(doc.y);
      doc.moveDown(8);
      doc.fillColor(GRAY).font("Helvetica").fontSize(8);
      doc.text("PRIMEIRA EDIÇÃO", MARGIN, doc.y, {
        width: CONTENT_W,
        align: "center",
        characterSpacing: 3,
      });
      doc.moveDown(0.3);
      doc.fillColor(GRAY_MID).font("Helvetica").fontSize(7);
      doc.text(new Date().getFullYear().toString(), MARGIN, doc.y, {
        width: CONTENT_W,
        align: "center",
      });

      // ============================================================
      // PÁGINA 3 — DEDICATÓRIA
      // ============================================================
      doc.addPage();
      doc.moveDown(10);
      doc.fillColor(INK_MUTED).font("Helvetica-Oblique").fontSize(12);
      doc.text(dedicatoria, MARGIN, doc.y, {
        width: CONTENT_W,
        align: "center",
        lineGap: 8,
      });
      doc.moveDown(2);
      // Ornamento pequeno
      const cx = PAGE_W / 2;
      doc.fillColor(paleta.primary);
      doc.polygon([cx, doc.y - 4], [cx + 4, doc.y], [cx, doc.y + 4], [cx - 4, doc.y]).fill();

      // ============================================================
      // PÁGINA 4 — SUMÁRIO
      // ============================================================
      doc.addPage();
      desenharCabecaloCorrente(doc.page.number);
      doc.moveDown(2);

      doc.fillColor(paleta.primary).font("Helvetica-Bold").fontSize(9);
      doc.text("SUMÁRIO", MARGIN, doc.y, {
        width: CONTENT_W,
        align: "center",
        characterSpacing: 5,
      });
      doc.moveDown(0.5);
      ornamento(doc.y, paleta.primary);
      doc.moveDown(1.5);

      // Lista de capítulos
      if (livro) {
        // Introdução
        renderItemSumario("Introdução", 0);
        // Capítulos
        livro.capitulos.forEach((cap) => {
          renderItemSumario(cap.titulo, cap.numero);
        });
        // Conclusão
        renderItemSumario("Conclusão", livro.capitulos.length + 1);
        // Posfácio
        renderItemSumario("Posfácio", livro.capitulos.length + 2);
      } else {
        renderItemSumario("Introdução", 0);
        nicho.capitulosPdf.forEach((cap, i) => {
          renderItemSumario(cap.titulo, i + 1);
        });
        renderItemSumario("Fechamento", nicho.capitulosPdf.length + 1);
      }

      function renderItemSumario(titulo: string, numero: number) {
        doc.moveDown(0.6);
        const y = doc.y;
        // Número
        doc.fillColor(paleta.primary).font("Helvetica-Bold").fontSize(10);
        doc.text(String(numero).padStart(2, "0"), MARGIN + 8, y, {
          width: 30,
          lineBreak: false,
        });
        // Título — usa font+fontSize já definidos antes de medir a largura
        doc.fillColor(INK).font("Helvetica").fontSize(10.5);
        const wTitulo = doc.widthOfString(titulo);
        const larguraMaxTitulo = Math.min(wTitulo, CONTENT_W - 90);
        doc.text(titulo, MARGIN + 40, y, {
          width: CONTENT_W - 90,
          lineBreak: false,
          ellipsis: true,
        });
        // Linha pontilhada conectando título ao número da página
        doc.strokeColor(GRAY_LIGHT).lineWidth(0.4).dash(1, { space: 2 });
        doc.moveTo(MARGIN + 40 + larguraMaxTitulo + 6, y + 8)
          .lineTo(PAGE_W - MARGIN - 8, y + 8)
          .stroke();
        doc.undash();
      }

      // ============================================================
      // PÁGINA 5 — INTRODUÇÃO
      // ============================================================
      doc.addPage();
      desenharCabecaloCorrente(doc.page.number);
      doc.moveDown(2);

      doc.fillColor(paleta.primary).font("Helvetica-Bold").fontSize(9);
      doc.text("INTRODUÇÃO", MARGIN, doc.y, {
        width: CONTENT_W,
        align: "center",
        characterSpacing: 5,
      });
      doc.moveDown(1.5);

      // Ilustração
      const introIlustY = doc.y + 30;
      ilustracaoCapitulo(1, PAGE_W / 2, introIlustY);
      doc.y = introIlustY + 45;

      doc.moveDown(1);
      ornamento(doc.y, paleta.primary);
      doc.moveDown(1);

      // ==== CONTEÚDO DA INTRODUÇÃO ====
      doc.addPage();
      desenharCabecaloCorrente(doc.page.number);
      doc.moveDown(1);

      if (livro) {
        // Introdução com drop cap
        paragrafoComDropCap(livro.introducao.paragrafos[0]);
        doc.moveDown(0.5);
        livro.introducao.paragrafos.slice(1).forEach((p, i) => {
          paragrafo(p);
          if (i < livro.introducao.paragrafos.length - 2) doc.moveDown(0.4);
        });
        // Promessa em destaque
        doc.moveDown(0.7);
        renderDestaque(livro.introducao.promessa);
      } else {
        // fallback introdução baseada em produto
        paragrafoComDropCap(produto.copyVendas);
        doc.moveDown(0.5);
        paragrafo(
          `Este material foi escrito para quem já experimentou vários caminhos e ainda não encontrou o método certo. Cada capítulo aborda uma etapa específica dessa jornada, com exemplos práticos, reflexões e passos concretos que você pode aplicar ainda esta semana.`
        );
        doc.moveDown(0.5);
        paragrafo(
          `Não é um manual teórico. É um roteiro. Se você aplicar o que está aqui dentro, vai enxergar uma mudança concreta na sua realidade em pouco tempo.`
        );
        doc.moveDown(0.5);
        renderDestaque(
          `Se você aplicar o que está aqui dentro pelos próximos 90 dias, você vai construir uma nova relação consigo mesmo. E essa mudança dura.`
        );
      }

      // ============================================================
      // CAPÍTULOS
      // ============================================================
      if (livro) {
        const total = livro.capitulos.length;
        livro.capitulos.forEach((cap) => renderCapitulo(cap, total));
      } else {
        // fallback
        nicho.capitulosPdf.forEach((cap, i) => renderCapituloSimples(cap, i));
      }

      // ============================================================
      // CONCLUSÃO
      // ============================================================
      doc.addPage();
      desenharCabecaloCorrente(doc.page.number);
      doc.moveDown(2);

      doc.fillColor(paleta.primary).font("Helvetica-Bold").fontSize(9);
      doc.text("CONCLUSÃO", MARGIN, doc.y, {
        width: CONTENT_W,
        align: "center",
        characterSpacing: 5,
      });
      doc.moveDown(1.5);

      const conclIlustY = doc.y + 30;
      ilustracaoCapitulo(6, PAGE_W / 2, conclIlustY);
      doc.y = conclIlustY + 45;

      doc.moveDown(1);
      doc.fillColor(INK).font("Helvetica-Bold").fontSize(20);
      doc.text("O caminho a partir daqui", MARGIN, doc.y, {
        width: CONTENT_W,
        align: "center",
      });
      doc.moveDown(0.7);
      ornamento(doc.y, paleta.primary);

      // Conteúdo da conclusão em nova página
      doc.addPage();
      desenharCabecaloCorrente(doc.page.number);
      doc.moveDown(1);

      if (livro) {
        paragrafoComDropCap(livro.conclusao.paragrafos[0]);
        doc.moveDown(0.5);
        livro.conclusao.paragrafos.slice(1).forEach((p, i) => {
          paragrafo(p);
          if (i < livro.conclusao.paragrafos.length - 2) doc.moveDown(0.4);
        });

        // Próximos passos
        doc.moveDown(1);
        tituloSecao("Seus próximos passos");
        renderLista({ itens: livro.conclusao.proximosPassos });
      } else {
        paragrafoComDropCap(
          `Você chegou até o fim. Isso, por si só, já é diferente. A maior parte das pessoas para no meio do caminho — para com uma promessa engavetada, um método que não experimentou, uma decisão que não tomou.`
        );
        doc.moveDown(0.5);
        paragrafo(
          `Agora vem a parte mais importante: escolher uma coisa deste material — uma só — e colocar em prática nos próximos sete dias. Não tudo. Uma. E se comprometa com ela.`
        );
        doc.moveDown(0.5);
        paragrafo(
          `Consistência bate ousadia. Um passo por dia, todo dia, chega mais longe do que uma corrida esporádica que se apaga na primeira dificuldade.`
        );
      }

      // ============================================================
      // POSFÁCIO
      // ============================================================
      if (livro && livro.posfacio && livro.posfacio.length > 0) {
        doc.addPage();
        desenharCabecaloCorrente(doc.page.number);
        doc.moveDown(6);

        doc.fillColor(paleta.primary).font("Helvetica-Bold").fontSize(9);
        doc.text("POSFÁCIO", MARGIN, doc.y, {
          width: CONTENT_W,
          align: "center",
          characterSpacing: 5,
        });
        doc.moveDown(1);
        ornamento(doc.y, paleta.primary);
        doc.moveDown(2);

        livro.posfacio.forEach((p, i) => {
          doc.fillColor(INK_SOFT).font("Helvetica-Oblique").fontSize(12);
          doc.text(p, MARGIN + 20, doc.y, {
            width: CONTENT_W - 40,
            align: "center",
            lineGap: 5,
          });
          if (i < livro.posfacio.length - 1) doc.moveDown(1);
        });

        doc.moveDown(3);
        ornamentoFleuron(doc.y);
        doc.moveDown(1);
        doc.fillColor(GRAY).font("Helvetica-Oblique").fontSize(9);
        doc.text("— Fim —", MARGIN, doc.y, {
          width: CONTENT_W,
          align: "center",
          characterSpacing: 2,
        });
      } else {
        // Fecho simples
        doc.moveDown(3);
        ornamento(doc.y, paleta.primary);
        doc.moveDown(1);
        doc.fillColor(GRAY).font("Helvetica-Oblique").fontSize(9);
        doc.text("— Fim —", MARGIN, doc.y, {
          width: CONTENT_W,
          align: "center",
          characterSpacing: 2,
        });
      }

      // ============================================================
      // COLOFÃO — última página, tipográfica, elegante
      // ============================================================
      doc.addPage();
      doc.moveDown(14);
      doc.fillColor(GRAY_MID).font("Helvetica").fontSize(8);
      doc.text("Este livro foi composto em tipografia digital", MARGIN, doc.y, {
        width: CONTENT_W,
        align: "center",
        characterSpacing: 1,
      });
      doc.moveDown(0.3);
      doc.text(`e encerrado no ano de ${new Date().getFullYear()}.`, MARGIN, doc.y, {
        width: CONTENT_W,
        align: "center",
        characterSpacing: 1,
      });
      doc.moveDown(2);
      const cxColofao = PAGE_W / 2;
      doc.fillColor(paleta.primary);
      doc.polygon([cxColofao, doc.y - 4], [cxColofao + 4, doc.y], [cxColofao, doc.y + 4], [cxColofao - 4, doc.y]).fill();

      // ============================================================
      // NUMERAÇÃO DE PÁGINAS
      // Começa numerar a partir da introdução (página 5)
      // ============================================================
      const totalPaginas = doc.bufferedPageRange().count;
      for (let i = 4; i < totalPaginas; i++) {
        doc.switchToPage(i);
        footer(i - 3, tituloLivro);
      }

      doc.end();
    });

    return new Response(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${produto.slug || "livro"}.pdf"`,
        "Cache-Control": "no-cache",
      },
    });
  } catch (err: any) {
    console.error("Erro ao gerar PDF:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Erro ao gerar PDF" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
