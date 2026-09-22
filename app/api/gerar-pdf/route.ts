import { NextRequest } from "next/server";
import PDFDocument from "pdfkit";
import { encontrarNicho } from "@/lib/nichos-db";
import type { Produto } from "@/lib/storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Paleta neutra tipo livro impresso
const INK = "#1a1a1a";
const INK_SOFT = "#3a3a3a";
const GRAY = "#767676";
const GRAY_LIGHT = "#c8c8c8";
const CREAM = "#faf7f2";
const ACCENT = "#7c3aed"; // usada só em detalhes discretos

const CORES_NICHO: Record<string, string> = {
  emagrecimento: "#c0392b",
  financas: "#0f766e",
  relacionamento: "#be185d",
  carreira: "#1e40af",
  marketing: "#5b21b6",
  espiritualidade: "#6d28d9",
  culinaria: "#c2410c",
  estudos: "#1e3a8a",
  generico: "#1a1a1a",
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
    const corNicho = CORES_NICHO[nicho.id] || INK;

    const buffer: Buffer = await new Promise((resolve, reject) => {
      const doc = new PDFDocument({
        size: "A5", // formato de livro
        margins: { top: 72, bottom: 72, left: 60, right: 60 },
        info: {
          Title: produto.nome,
          Author: produto.publico,
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

      // ===== HELPERS =====
      function ornamento(y: number) {
        // Divisor ornamental estilo livro
        const cx = PAGE_W / 2;
        doc.strokeColor(corNicho).lineWidth(0.6);
        doc.moveTo(cx - 45, y).lineTo(cx - 10, y).stroke();
        doc.moveTo(cx + 10, y).lineTo(cx + 45, y).stroke();
        // diamante central
        doc.fillColor(corNicho);
        doc.polygon([cx, y - 3], [cx + 3, y], [cx, y + 3], [cx - 3, y]).fill();
      }

      function dropCap(letter: string, x: number, y: number, cor: string) {
        // Letra capitular grande
        doc.fillColor(cor).font("Helvetica-Bold").fontSize(46);
        doc.text(letter, x, y - 6, { lineBreak: false, width: 40 });
      }

      function corner(y: number) {
        // Ornamento nos cantos das páginas de capítulo
        doc.strokeColor(GRAY_LIGHT).lineWidth(0.3);
        doc.moveTo(MARGIN, y).lineTo(MARGIN + 20, y).stroke();
        doc.moveTo(PAGE_W - MARGIN - 20, y).lineTo(PAGE_W - MARGIN, y).stroke();
      }

      function footer(paginaAtual: number, total: number) {
        // Só nas páginas de conteúdo, número da página estilo livro
        const y = PAGE_H - 40;
        doc.fillColor(GRAY).font("Helvetica").fontSize(9);
        doc.text(`${paginaAtual}`, MARGIN, y, {
          width: CONTENT_W,
          align: "center",
          lineBreak: false,
        });
      }

      function textoJustificado(
        txt: string,
        opts: { fontSize?: number; leading?: number; indent?: number; align?: any } = {}
      ) {
        doc.fillColor(INK).font("Helvetica").fontSize(opts.fontSize || 11);
        doc.text(txt, {
          width: CONTENT_W,
          align: opts.align || "justify",
          lineGap: opts.leading || 3,
          indent: opts.indent ?? 20,
        });
      }

      // ===== 1. CAPA (elegante, sem menção a nenhuma marca) =====
      // Moldura ornamental
      doc.strokeColor(corNicho).lineWidth(0.6);
      doc.rect(30, 30, PAGE_W - 60, PAGE_H - 60).stroke();
      doc.strokeColor(corNicho).lineWidth(0.3);
      doc.rect(36, 36, PAGE_W - 72, PAGE_H - 72).stroke();

      // Nicho pequeno topo
      doc.fillColor(corNicho).font("Helvetica-Bold").fontSize(9);
      doc.text(produto.nicho.toUpperCase(), MARGIN, 80, {
        width: CONTENT_W,
        align: "center",
        characterSpacing: 4,
      });

      // Ornamento
      ornamento(100);

      // Título principal
      doc.fillColor(INK).font("Helvetica-Bold").fontSize(28);
      doc.text(produto.nome, MARGIN, PAGE_H / 2 - 90, {
        width: CONTENT_W,
        align: "center",
        lineGap: -3,
      });

      // Subtítulo (promessa)
      doc.moveDown(1);
      doc.fillColor(INK_SOFT).font("Helvetica-Oblique").fontSize(12);
      doc.text(produto.promessa, MARGIN, doc.y, {
        width: CONTENT_W,
        align: "center",
        lineGap: 4,
      });

      // Ornamento inferior
      ornamento(PAGE_H - 130);

      // Para (público)
      doc.fillColor(GRAY).font("Helvetica").fontSize(9);
      doc.text("um guia para", MARGIN, PAGE_H - 110, {
        width: CONTENT_W,
        align: "center",
        characterSpacing: 2,
      });
      doc.moveDown(0.3);
      doc.fillColor(INK).font("Helvetica").fontSize(10);
      doc.text(produto.publico, MARGIN, doc.y, {
        width: CONTENT_W,
        align: "center",
      });

      // ===== 2. FOLHA DE ROSTO =====
      doc.addPage();
      doc.moveDown(6);
      doc.fillColor(INK).font("Helvetica-Bold").fontSize(20);
      doc.text(produto.nome, MARGIN, doc.y, { width: CONTENT_W, align: "center" });
      doc.moveDown(0.5);
      doc.fillColor(INK_SOFT).font("Helvetica-Oblique").fontSize(11);
      doc.text(produto.promessa, MARGIN, doc.y, {
        width: CONTENT_W,
        align: "center",
      });
      doc.moveDown(10);
      doc.fillColor(GRAY).font("Helvetica").fontSize(8);
      doc.text("Primeira edição", MARGIN, doc.y, {
        width: CONTENT_W,
        align: "center",
        characterSpacing: 1,
      });

      // ===== 3. DEDICATÓRIA =====
      doc.addPage();
      doc.moveDown(10);
      doc.fillColor(INK_SOFT).font("Helvetica-Oblique").fontSize(11);
      doc.text(
        `Para você,\nque decidiu que hoje era o dia certo\npara começar.`,
        MARGIN, doc.y,
        { width: CONTENT_W, align: "center", lineGap: 6 }
      );

      // ===== 4. SUMÁRIO =====
      doc.addPage();
      corner(50);
      doc.moveDown(2);
      doc.fillColor(INK).font("Helvetica-Bold").fontSize(20);
      doc.text("Sumário", MARGIN, doc.y, { width: CONTENT_W });
      doc.moveDown(0.5);
      ornamento(doc.y);
      doc.moveDown(1);

      doc.fillColor(INK_SOFT).font("Helvetica").fontSize(10);
      const capitulos = [
        { titulo: "Introdução" },
        ...nicho.capitulosPdf,
        { titulo: "Fechamento" },
      ];
      capitulos.forEach((cap, i) => {
        doc.moveDown(0.4);
        doc.fillColor(corNicho).text(`${String(i + 1).padStart(2, "0")}`, MARGIN, doc.y, {
          continued: true,
          width: 40,
        });
        doc.fillColor(INK).text(`  ${cap.titulo}`, { width: CONTENT_W - 40 });
      });

      // ===== 5. INTRODUÇÃO =====
      doc.addPage();
      corner(50);
      doc.moveDown(2);
      doc.fillColor(GRAY).font("Helvetica").fontSize(8);
      doc.text("01", MARGIN, doc.y, { width: CONTENT_W, align: "center", characterSpacing: 3 });
      doc.moveDown(0.3);
      doc.fillColor(INK).font("Helvetica-Bold").fontSize(18);
      doc.text("Introdução", MARGIN, doc.y, { width: CONTENT_W, align: "center" });
      doc.moveDown(0.5);
      ornamento(doc.y);
      doc.moveDown(1.5);

      // Introdução com drop cap
      const introTexto1 = produto.copyVendas;
      const letra1 = introTexto1.charAt(0).toUpperCase();
      const restoIntro1 = introTexto1.slice(1);

      const startYintro = doc.y;
      dropCap(letra1, MARGIN, startYintro, corNicho);
      doc.fillColor(INK).font("Helvetica").fontSize(11);
      doc.text(restoIntro1, MARGIN + 34, startYintro + 4, {
        width: CONTENT_W - 34,
        align: "justify",
        lineGap: 3,
      });

      doc.moveDown(1);
      textoJustificado(
        `Este material foi escrito para quem já experimentou vários caminhos e ainda não encontrou o método certo. Cada capítulo aborda uma etapa específica dessa jornada, com exemplos práticos, reflexões e passos concretos que você pode aplicar ainda esta semana.`
      );
      doc.moveDown(0.5);
      textoJustificado(
        `Não é um manual teórico. É um roteiro. Se você aplicar o que está aqui dentro, vai enxergar uma mudança concreta na sua realidade em pouco tempo. A garantia disso não está no papel. Está na sua disposição de fazer diferente.`
      );

      // ===== 6. CAPÍTULOS =====
      const capitulosData = nicho.capitulosPdf;
      capitulosData.forEach((cap, idx) => {
        doc.addPage();
        corner(50);
        doc.moveDown(2);

        // Número
        doc.fillColor(GRAY).font("Helvetica").fontSize(8);
        doc.text(String(idx + 2).padStart(2, "0"), MARGIN, doc.y, {
          width: CONTENT_W,
          align: "center",
          characterSpacing: 3,
        });
        doc.moveDown(0.3);

        // Título
        doc.fillColor(INK).font("Helvetica-Bold").fontSize(18);
        doc.text(cap.titulo, MARGIN, doc.y, { width: CONTENT_W, align: "center" });
        doc.moveDown(0.5);
        ornamento(doc.y);
        doc.moveDown(1.5);

        // Primeiro parágrafo com drop cap
        const primeiro = cap.paragrafos[0];
        const letra = primeiro.charAt(0).toUpperCase();
        const resto = primeiro.slice(1);
        const startY = doc.y;
        dropCap(letra, MARGIN, startY, corNicho);
        doc.fillColor(INK).font("Helvetica").fontSize(11);
        doc.text(resto, MARGIN + 34, startY + 4, {
          width: CONTENT_W - 34,
          align: "justify",
          lineGap: 3,
        });

        doc.moveDown(1);

        // Demais parágrafos
        cap.paragrafos.slice(1).forEach((p, pIdx) => {
          textoJustificado(p);
          doc.moveDown(0.6);

          // Quote destacado no meio do capítulo
          if (pIdx === 0 && idx < capitulosData.length - 1) {
            const angulo = nicho.angulosCopy[(idx + pIdx) % nicho.angulosCopy.length];
            doc.moveDown(0.5);
            const qY = doc.y;
            // Linha vertical
            doc.strokeColor(corNicho).lineWidth(2);
            doc.moveTo(MARGIN + 20, qY).lineTo(MARGIN + 20, qY + 55).stroke();
            // Texto do quote
            doc.fillColor(INK_SOFT).font("Helvetica-Oblique").fontSize(12);
            doc.text(`"${angulo}"`, MARGIN + 35, qY, {
              width: CONTENT_W - 35,
              align: "left",
              lineGap: 4,
            });
            doc.moveDown(1);
          }
        });
      });

      // ===== 7. FECHAMENTO =====
      doc.addPage();
      corner(50);
      doc.moveDown(2);
      doc.fillColor(GRAY).font("Helvetica").fontSize(8);
      doc.text(String(capitulosData.length + 2).padStart(2, "0"), MARGIN, doc.y, {
        width: CONTENT_W,
        align: "center",
        characterSpacing: 3,
      });
      doc.moveDown(0.3);
      doc.fillColor(INK).font("Helvetica-Bold").fontSize(18);
      doc.text("Fechamento", MARGIN, doc.y, { width: CONTENT_W, align: "center" });
      doc.moveDown(0.5);
      ornamento(doc.y);
      doc.moveDown(1.5);

      const fecha = `Você chegou até o fim. Isso, por si só, já é diferente. A maior parte das pessoas para no meio do caminho — para com uma promessa engavetada, um método que não experimentou, uma decisão que não tomou.`;
      const letra2 = fecha.charAt(0).toUpperCase();
      const rf = fecha.slice(1);
      const sy = doc.y;
      dropCap(letra2, MARGIN, sy, corNicho);
      doc.fillColor(INK).font("Helvetica").fontSize(11);
      doc.text(rf, MARGIN + 34, sy + 4, {
        width: CONTENT_W - 34,
        align: "justify",
        lineGap: 3,
      });
      doc.moveDown(1);

      textoJustificado(
        `Agora vem a parte mais importante: escolher uma coisa deste material — uma só — e colocar em prática nos próximos sete dias. Não tudo. Uma. E se comprometa com ela.`
      );
      doc.moveDown(0.5);
      textoJustificado(
        `Consistência bate ousadia. Um passo por dia, todo dia, chega mais longe do que uma corrida esporádica que se apaga na primeira dificuldade.`
      );
      doc.moveDown(0.5);
      textoJustificado(
        `A partir daqui, o caminho é seu. Boa jornada.`
      );

      doc.moveDown(3);
      ornamento(doc.y);
      doc.moveDown(1);
      doc.fillColor(GRAY).font("Helvetica-Oblique").fontSize(9);
      doc.text("— Fim —", MARGIN, doc.y, { width: CONTENT_W, align: "center" });

      // ===== NUMERAÇÃO DAS PÁGINAS =====
      const total = doc.bufferedPageRange().count;
      // Começa do 5 (pula capa, folha de rosto, dedicatória, sumário)
      for (let i = 4; i < total; i++) {
        doc.switchToPage(i);
        footer(i - 3, total - 4);
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
