import { NextRequest } from "next/server";
import PDFDocument from "pdfkit";
import { encontrarNicho } from "@/lib/nichos-db";
import type { Produto } from "@/lib/storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Paleta Criafy + acento do nicho
const CRIAFY_ROXO = "#7c3aed";
const CRIAFY_ROXO_ESCURO = "#5b21b6";
const CRIAFY_PINK = "#ec4899";
const CRIAFY_ROXO_CLARO = "#ede9fe";
const CRIAFY_50 = "#f5f3ff";
const DARK = "#0f0f14";
const TEXT_800 = "#27272a";
const TEXT_600 = "#525252";
const TEXT_400 = "#a3a3a3";
const WHITE = "#ffffff";
const GREEN = "#10b981";

// Cores por nicho (acento da capa)
const CORES_NICHO: Record<string, string> = {
  emagrecimento: "#ef4444",
  financas: "#10b981",
  relacionamento: "#ec4899",
  carreira: "#3b82f6",
  marketing: "#8b5cf6",
  espiritualidade: "#a78bfa",
  culinaria: "#f97316",
  estudos: "#2563eb",
  generico: "#7c3aed",
};

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
    const corNicho = CORES_NICHO[nicho.id] || CRIAFY_ROXO;

    const buffer: Buffer = await new Promise((resolve, reject) => {
      const doc = new PDFDocument({
        size: "A4",
        margins: { top: 60, bottom: 60, left: 60, right: 60 },
        info: {
          Title: produto.nome,
          Author: "Criafy",
          Subject: produto.promessa,
          Keywords: produto.nicho,
        },
        bufferPages: true,
      });

      const chunks: Buffer[] = [];
      doc.on("data", (c) => chunks.push(c));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);

      const PAGE_W = doc.page.width;
      const PAGE_H = doc.page.height;
      const MARGIN = 60;
      const CONTENT_W = PAGE_W - MARGIN * 2;

      // ========== HELPERS DE DESENHO ==========
      function fundoGradient(cor1: string, cor2: string) {
        const steps = 40;
        for (let i = 0; i < steps; i++) {
          const t = i / steps;
          const c = misturar(cor1, cor2, t);
          doc.rect(0, (PAGE_H / steps) * i, PAGE_W, PAGE_H / steps + 1).fillColor(c).fill();
        }
      }

      function misturar(hex1: string, hex2: string, t: number): string {
        const p1 = parseInt(hex1.slice(1), 16);
        const p2 = parseInt(hex2.slice(1), 16);
        const r1 = (p1 >> 16) & 0xff, g1 = (p1 >> 8) & 0xff, b1 = p1 & 0xff;
        const r2 = (p2 >> 16) & 0xff, g2 = (p2 >> 8) & 0xff, b2 = p2 & 0xff;
        const r = Math.round(r1 + (r2 - r1) * t);
        const g = Math.round(g1 + (g2 - g1) * t);
        const b = Math.round(b1 + (b2 - b1) * t);
        return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
      }

      function badge(x: number, y: number, num: number, cor: string, size = 60) {
        doc.circle(x + size / 2, y + size / 2, size / 2).fillColor(cor).fill();
        doc.fillColor(WHITE).font("Helvetica-Bold").fontSize(24);
        const s = String(num);
        const w = doc.widthOfString(s);
        doc.text(s, x + size / 2 - w / 2, y + size / 2 - 12, { lineBreak: false });
      }

      function barraLateral(cor: string) {
        doc.rect(0, 0, 8, PAGE_H).fillColor(cor).fill();
      }

      function callout(texto: string, opts: {
        titulo?: string;
        fundo?: string;
        borda?: string;
        cor?: string;
        largura?: number;
      } = {}) {
        const largura = opts.largura || CONTENT_W;
        const yStart = doc.y;
        const paddingH = 20;
        const paddingV = 16;

        // calcula altura
        doc.fillColor(opts.cor || DARK).font("Helvetica").fontSize(11);
        const altTexto = doc.heightOfString(texto, {
          width: largura - paddingH * 2 - 4,
          align: "left",
        });
        const altTitulo = opts.titulo ? 18 : 0;
        const alt = altTexto + altTitulo + paddingV * 2;

        // caixa
        doc.roundedRect(MARGIN, yStart, largura, alt, 12)
           .fillColor(opts.fundo || CRIAFY_ROXO_CLARO).fill();
        // barra
        doc.rect(MARGIN, yStart, 4, alt).fillColor(opts.borda || CRIAFY_ROXO).fill();

        // conteúdo
        if (opts.titulo) {
          doc.fillColor(opts.borda || CRIAFY_ROXO).font("Helvetica-Bold").fontSize(9)
             .text(opts.titulo.toUpperCase(), MARGIN + paddingH, yStart + paddingV, {
               width: largura - paddingH * 2,
             });
        }
        doc.fillColor(opts.cor || DARK).font("Helvetica").fontSize(11)
           .text(texto, MARGIN + paddingH, yStart + paddingV + altTitulo, {
             width: largura - paddingH * 2 - 4,
             align: "left",
             lineGap: 3,
           });

        doc.y = yStart + alt + 10;
      }

      function divisor(cor: string, largura = 60, altura = 4) {
        const y = doc.y;
        doc.rect(MARGIN, y, largura, altura).fillColor(cor).fill();
        doc.y = y + altura + 10;
      }

      function footer(paginaAtual: number) {
        const y = PAGE_H - 30;
        doc.strokeColor("#e5e5e5").lineWidth(0.5)
           .moveTo(MARGIN, y - 8).lineTo(PAGE_W - MARGIN, y - 8).stroke();
        doc.fillColor(TEXT_400).font("Helvetica").fontSize(8);
        doc.text(produto.nome.toUpperCase(), MARGIN, y, {
          lineBreak: false, width: 200,
        });
        doc.fillColor(DARK).font("Helvetica-Bold").fontSize(8)
           .text("criafy.site", 0, y, { align: "center", lineBreak: false });
        doc.fillColor(TEXT_400).font("Helvetica").fontSize(8)
           .text(String(paginaAtual), PAGE_W - MARGIN - 20, y, {
             lineBreak: false, width: 20, align: "right",
           });
      }

      // ========== 1. CAPA ==========
      fundoGradient(CRIAFY_ROXO, corNicho);
      doc.fillColor(WHITE).font("Helvetica-Bold").fontSize(11);
      doc.text("EBOOK EXCLUSIVO · CRIAFY", MARGIN, 120, {
        width: CONTENT_W, align: "center", characterSpacing: 2,
      });

      // Faixa branca com nicho
      const faixaY = 170;
      doc.roundedRect(PAGE_W / 2 - 90, faixaY, 180, 26, 13)
         .fillColor(WHITE).fill();
      doc.fillColor(corNicho).font("Helvetica-Bold").fontSize(10)
         .text(produto.nicho.toUpperCase(), PAGE_W / 2 - 90, faixaY + 9, {
           width: 180, align: "center", characterSpacing: 1,
         });

      // Título principal
      doc.fillColor(WHITE).font("Helvetica-Bold").fontSize(44);
      doc.text(produto.nome, MARGIN, 240, {
        width: CONTENT_W, align: "center", lineGap: -6,
      });

      // Promessa
      doc.moveDown(1);
      doc.fillColor(WHITE).font("Helvetica").fontSize(16);
      doc.text(produto.promessa, MARGIN, doc.y, {
        width: CONTENT_W, align: "center", lineGap: 4,
      });

      // Público
      doc.fillColor("#ffffff").fillOpacity(0.7);
      doc.font("Helvetica").fontSize(10);
      doc.text("Um guia prático pra:", MARGIN, PAGE_H - 200, {
        width: CONTENT_W, align: "center",
      });
      doc.fillOpacity(1).fillColor(WHITE).font("Helvetica-Bold").fontSize(12);
      doc.text(produto.publico, MARGIN, doc.y + 4, {
        width: CONTENT_W, align: "center",
      });

      // Rodapé da capa
      doc.fillColor(WHITE).fillOpacity(0.8).font("Helvetica-Bold").fontSize(14);
      doc.text("criafy.site", MARGIN, PAGE_H - 90, {
        width: CONTENT_W, align: "center",
      });
      doc.fillOpacity(0.6).font("Helvetica").fontSize(9);
      doc.text("© " + new Date().getFullYear() + " · Feito com Criafy", MARGIN, PAGE_H - 65, {
        width: CONTENT_W, align: "center",
      });
      doc.fillOpacity(1);

      // ========== 2. APRESENTAÇÃO ==========
      doc.addPage();
      doc.fillColor(CRIAFY_ROXO).font("Helvetica-Bold").fontSize(10);
      doc.text("APRESENTAÇÃO", MARGIN, MARGIN, {
        width: CONTENT_W, characterSpacing: 2,
      });
      doc.moveDown(0.6);
      doc.fillColor(DARK).font("Helvetica-Bold").fontSize(30);
      doc.text("Antes de começar", MARGIN, doc.y, { width: CONTENT_W });
      doc.moveDown(0.3);
      divisor(CRIAFY_ROXO, 80, 4);

      doc.fillColor(TEXT_600).font("Helvetica").fontSize(13);
      doc.text(
        `Se você chegou aqui, provavelmente já se perguntou se ${produto.publico.toLowerCase()} é mesmo você. E se a resposta pra sua situação existe.`,
        MARGIN, doc.y, { width: CONTENT_W, align: "justify", lineGap: 5 }
      );
      doc.moveDown(0.7);

      doc.fillColor(TEXT_800).font("Helvetica").fontSize(11);
      doc.text(
        produto.copyVendas,
        MARGIN, doc.y, { width: CONTENT_W, align: "justify", lineGap: 4 }
      );
      doc.moveDown(1);

      callout(
        `Este material foi feito pra ir direto ao ponto. Sem enrolação, sem discurso motivacional vazio. Se você aplicar o que tá aqui dentro nos próximos ${produto.nicho.toLowerCase().includes("estud") ? "30" : "30"} dias, você vai enxergar uma mudança concreta na sua realidade.`,
        {
          titulo: "Uma promessa honesta",
          fundo: CRIAFY_50,
          borda: CRIAFY_ROXO,
        }
      );

      // ========== 3. SUMÁRIO ==========
      doc.addPage();
      doc.fillColor(CRIAFY_ROXO).font("Helvetica-Bold").fontSize(10)
         .text("SUMÁRIO", MARGIN, MARGIN, { width: CONTENT_W, characterSpacing: 2 });
      doc.moveDown(0.6);
      doc.fillColor(DARK).font("Helvetica-Bold").fontSize(32)
         .text("O que você vai aprender", MARGIN, doc.y, { width: CONTENT_W });
      doc.moveDown(0.3);
      divisor(CRIAFY_ROXO, 80, 4);
      doc.moveDown(0.5);

      nicho.capitulosPdf.forEach((cap, i) => {
        const y = doc.y;
        doc.fillColor(CRIAFY_ROXO).font("Helvetica-Bold").fontSize(14);
        doc.text(`${String(i + 1).padStart(2, "0")}`, MARGIN, y, {
          width: 40, lineBreak: false,
        });
        doc.fillColor(DARK).font("Helvetica-Bold").fontSize(13);
        doc.text(cap.titulo, MARGIN + 40, y, {
          width: CONTENT_W - 40, lineGap: 2,
        });
        doc.moveDown(0.4);
      });

      // Adicional
      doc.moveDown(0.3);
      const idxExtra = nicho.capitulosPdf.length + 1;
      doc.fillColor(CRIAFY_ROXO).font("Helvetica-Bold").fontSize(14)
         .text(`${String(idxExtra).padStart(2, "0")}`, MARGIN, doc.y, {
           width: 40, lineBreak: false,
         });
      doc.fillColor(DARK).font("Helvetica-Bold").fontSize(13)
         .text("Próximos passos", MARGIN + 40, doc.y);

      // ========== 4. CAPÍTULOS ==========
      nicho.capitulosPdf.forEach((cap, idx) => {
        doc.addPage();
        barraLateral(corNicho);

        // "Capítulo N"
        doc.fillColor(corNicho).font("Helvetica-Bold").fontSize(10);
        doc.text(`CAPÍTULO ${String(idx + 1).padStart(2, "0")}`, MARGIN, MARGIN, {
          width: CONTENT_W, characterSpacing: 2,
        });
        doc.moveDown(0.5);

        // Título
        doc.fillColor(DARK).font("Helvetica-Bold").fontSize(26);
        doc.text(cap.titulo, MARGIN, doc.y, { width: CONTENT_W, lineGap: -2 });
        doc.moveDown(0.4);

        divisor(corNicho, 60, 4);
        doc.moveDown(0.5);

        // Parágrafos
        cap.paragrafos.forEach((p, pIdx) => {
          if (pIdx === 0) {
            // Primeiro parágrafo em destaque
            doc.fillColor(TEXT_600).font("Helvetica").fontSize(13);
            doc.text(p, MARGIN, doc.y, {
              width: CONTENT_W, align: "justify", lineGap: 5,
            });
          } else {
            doc.fillColor(TEXT_800).font("Helvetica").fontSize(11.5);
            doc.text(p, MARGIN, doc.y, {
              width: CONTENT_W, align: "justify", lineGap: 4,
            });
          }
          doc.moveDown(0.8);
        });

        // Callout de reflexão a cada capítulo
        if (idx < nicho.capitulosPdf.length - 1) {
          if (doc.y < PAGE_H - 180) {
            doc.moveDown(0.5);
            const reflex = nicho.angulosCopy[idx % nicho.angulosCopy.length];
            callout(reflex, {
              titulo: "Pra pensar",
              fundo: WHITE,
              borda: corNicho,
              cor: DARK,
            });
          }
        }
      });

      // ========== 5. BENEFÍCIOS + BÔNUS ==========
      doc.addPage();
      barraLateral(CRIAFY_ROXO);
      doc.fillColor(CRIAFY_ROXO).font("Helvetica-Bold").fontSize(10)
         .text("O QUE VOCÊ LEVA", MARGIN, MARGIN, {
           width: CONTENT_W, characterSpacing: 2,
         });
      doc.moveDown(0.5);
      doc.fillColor(DARK).font("Helvetica-Bold").fontSize(28)
         .text("Recursos incluídos", MARGIN, doc.y, { width: CONTENT_W });
      doc.moveDown(0.3);
      divisor(CRIAFY_ROXO, 60, 4);
      doc.moveDown(0.5);

      doc.fillColor(DARK).font("Helvetica-Bold").fontSize(16)
         .text("Benefícios", MARGIN, doc.y, { width: CONTENT_W });
      doc.moveDown(0.4);

      produto.beneficios.forEach((b, i) => {
        const y = doc.y;
        doc.fillColor(GREEN).font("Helvetica-Bold").fontSize(13)
           .text("✓", MARGIN, y, { width: 20, lineBreak: false });
        doc.fillColor(TEXT_800).font("Helvetica").fontSize(11)
           .text(b, MARGIN + 20, y, { width: CONTENT_W - 20, lineGap: 3 });
        doc.moveDown(0.4);
      });

      if (produto.bonus && produto.bonus.length > 0) {
        doc.moveDown(0.6);
        doc.fillColor(DARK).font("Helvetica-Bold").fontSize(16)
           .text("Bônus especiais", MARGIN, doc.y, { width: CONTENT_W });
        doc.moveDown(0.4);

        produto.bonus.forEach((b) => {
          const yStart = doc.y;
          const alt = doc.heightOfString(b, { width: CONTENT_W - 44 }) + 24;
          doc.roundedRect(MARGIN, yStart, CONTENT_W, alt, 10)
             .fillColor(CRIAFY_50).fill();
          doc.rect(MARGIN, yStart, 4, alt).fillColor(CRIAFY_PINK).fill();
          doc.fillColor(CRIAFY_PINK).font("Helvetica-Bold").fontSize(14)
             .text("🎁", MARGIN + 14, yStart + 8, { lineBreak: false });
          doc.fillColor(DARK).font("Helvetica").fontSize(11)
             .text(b, MARGIN + 40, yStart + 12, {
               width: CONTENT_W - 44, lineGap: 3,
             });
          doc.y = yStart + alt + 8;
        });
      }

      // ========== 6. PRÓXIMOS PASSOS ==========
      doc.addPage();
      barraLateral(CRIAFY_ROXO);
      doc.fillColor(CRIAFY_ROXO).font("Helvetica-Bold").fontSize(10)
         .text("CONCLUSÃO", MARGIN, MARGIN, {
           width: CONTENT_W, characterSpacing: 2,
         });
      doc.moveDown(0.5);
      doc.fillColor(DARK).font("Helvetica-Bold").fontSize(30)
         .text("Próximos passos", MARGIN, doc.y, { width: CONTENT_W });
      doc.moveDown(0.3);
      divisor(CRIAFY_ROXO, 80, 4);
      doc.moveDown(0.4);

      doc.fillColor(TEXT_600).font("Helvetica").fontSize(13);
      doc.text(
        "Você chegou ao fim do guia. Agora vem o que separa quem lê de quem transforma: a ação. Muita gente lê material assim, guarda no drive e nunca aplica. Não seja essa pessoa.",
        MARGIN, doc.y, { width: CONTENT_W, align: "justify", lineGap: 5 }
      );
      doc.moveDown(0.8);

      doc.fillColor(DARK).font("Helvetica-Bold").fontSize(18)
         .text("Seus 3 primeiros passos", MARGIN, doc.y, { width: CONTENT_W });
      doc.moveDown(0.5);

      const passos = produto.beneficios.slice(0, 3);
      passos.forEach((p, i) => {
        const y = doc.y;
        badge(MARGIN, y, i + 1, CRIAFY_ROXO, 32);
        doc.fillColor(DARK).font("Helvetica-Bold").fontSize(13)
           .text(p, MARGIN + 48, y + 4, { width: CONTENT_W - 48, lineGap: 3 });
        doc.y = Math.max(doc.y, y + 40);
        doc.moveDown(0.4);
      });
      doc.moveDown(0.8);

      callout(
        "Escolha 1 passo pra fazer nos próximos 24 horas. Não os três — só um. Feito é melhor que perfeito. E consistência bate ousadia.",
        {
          titulo: "Uma regra pra fechar",
          fundo: DARK,
          borda: CRIAFY_PINK,
          cor: WHITE,
        }
      );

      // ========== 7. CRÉDITOS ==========
      doc.addPage();
      fundoGradient(CRIAFY_ROXO_ESCURO, CRIAFY_ROXO);

      doc.fillColor(WHITE).fillOpacity(0.7).font("Helvetica").fontSize(12);
      doc.text("Feito com carinho por", MARGIN, PAGE_H / 2 - 100, {
        width: CONTENT_W, align: "center",
      });
      doc.fillOpacity(1).fillColor(WHITE).font("Helvetica-Bold").fontSize(36);
      doc.text("Criafy", MARGIN, PAGE_H / 2 - 70, {
        width: CONTENT_W, align: "center",
      });

      doc.moveDown(1);
      doc.fillColor(WHITE).font("Helvetica").fontSize(12);
      doc.text(
        "A gente acredita que qualquer pessoa deveria conseguir criar seu próprio produto digital, vender online e viver disso — sem depender de programador, agência ou orçamento gordo.",
        MARGIN + 40, doc.y, {
          width: CONTENT_W - 80, align: "center", lineGap: 4,
        }
      );

      doc.moveDown(2);
      doc.fillOpacity(0.85);
      doc.font("Helvetica-Oblique").fontSize(14);
      doc.text('"Da ideia à venda em minutos."', MARGIN, doc.y, {
        width: CONTENT_W, align: "center",
      });
      doc.fillOpacity(1);

      doc.font("Helvetica-Bold").fontSize(18);
      doc.text("criafy.site", MARGIN, PAGE_H - 130, {
        width: CONTENT_W, align: "center",
      });

      doc.fillOpacity(0.6).font("Helvetica").fontSize(9);
      doc.text(
        `© ${new Date().getFullYear()} Criafy · Todos os direitos reservados\nEste material foi gerado especialmente para ${produto.publico}`,
        MARGIN, PAGE_H - 90, { width: CONTENT_W, align: "center", lineGap: 3 }
      );
      doc.fillOpacity(1);

      // ========== ADICIONAR RODAPÉ EM TODAS AS PÁGINAS DE CONTEÚDO ==========
      const totalPaginas = doc.bufferedPageRange().count;
      for (let i = 1; i < totalPaginas - 1; i++) {
        doc.switchToPage(i);
        footer(i);
      }

      doc.end();
    });

    return new Response(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${produto.slug}.pdf"`,
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
