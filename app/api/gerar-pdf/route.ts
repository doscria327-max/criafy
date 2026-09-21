import { NextRequest } from "next/server";
import PDFDocument from "pdfkit";
import { encontrarNicho } from "@/lib/nichos-db";
import type { Produto } from "@/lib/storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

/**
 * POST /api/gerar-pdf
 * Body: { produto: Produto }
 * Retorna o PDF binário como download.
 *
 * Recebemos via POST pra não estourar o limite de URL com o produto codificado.
 */
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

    const buffer: Buffer = await new Promise((resolve, reject) => {
      const doc = new PDFDocument({
        size: "A4",
        margins: { top: 60, bottom: 60, left: 60, right: 60 },
        info: { Title: produto.nome, Author: "Criafy", Subject: produto.promessa },
      });

      const chunks: Buffer[] = [];
      doc.on("data", (c) => chunks.push(c));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);

      // CAPA
      doc.fillColor("#7c3aed").fontSize(12).text(produto.nicho.toUpperCase(), { align: "center" });
      doc.moveDown(3);
      doc.fillColor("#0f0f14").fontSize(36).font("Helvetica-Bold").text(produto.nome, { align: "center" });
      doc.moveDown(1.5);
      doc.fillColor("#525252").fontSize(16).font("Helvetica").text(produto.promessa, { align: "center" });
      doc.moveDown(6);
      doc.fillColor("#a3a3a3").fontSize(10).text("Um guia prático pra", { align: "center" });
      doc.moveDown(0.5);
      doc.fillColor("#0f0f14").fontSize(12).font("Helvetica-Bold").text(produto.publico, { align: "center", width: 400 });
      doc.moveDown(6);
      doc.fillColor("#a3a3a3").fontSize(9).font("Helvetica").text("© " + new Date().getFullYear() + " · Gerado com Criafy", { align: "center" });

      // SUMÁRIO
      doc.addPage();
      doc.fillColor("#0f0f14").fontSize(28).font("Helvetica-Bold").text("Sumário");
      doc.moveDown(1);
      doc.fillColor("#525252").fontSize(12).font("Helvetica");
      nicho.capitulosPdf.forEach((cap, i) => {
        doc.moveDown(0.5);
        doc.fillColor("#7c3aed").text(`${String(i + 1).padStart(2, "0")}. `, { continued: true });
        doc.fillColor("#0f0f14").text(cap.titulo);
      });
      doc.moveDown(1);
      doc.fillColor("#7c3aed").text(`${String(nicho.capitulosPdf.length + 1).padStart(2, "0")}. `, { continued: true });
      doc.fillColor("#0f0f14").text("Próximos passos");

      // CAPÍTULOS
      nicho.capitulosPdf.forEach((cap) => {
        doc.addPage();
        doc.fillColor("#a3a3a3").fontSize(10).font("Helvetica").text(produto.nome.toUpperCase(), { align: "left" });
        doc.moveDown(2);
        doc.fillColor("#0f0f14").fontSize(22).font("Helvetica-Bold").text(cap.titulo);
        doc.moveDown(1);
        doc.strokeColor("#7c3aed").lineWidth(3);
        doc.moveTo(60, doc.y).lineTo(120, doc.y).stroke();
        doc.moveDown(1);
        doc.fillColor("#3f3f46").fontSize(12).font("Helvetica");
        cap.paragrafos.forEach((p) => {
          doc.text(p, { align: "justify", lineGap: 4 });
          doc.moveDown(0.8);
        });
      });

      // PRÓXIMOS PASSOS
      doc.addPage();
      doc.fillColor("#a3a3a3").fontSize(10).text(produto.nome.toUpperCase());
      doc.moveDown(2);
      doc.fillColor("#0f0f14").fontSize(22).font("Helvetica-Bold").text("Próximos passos");
      doc.moveDown(0.5);
      doc.strokeColor("#7c3aed").lineWidth(3);
      doc.moveTo(60, doc.y).lineTo(120, doc.y).stroke();
      doc.moveDown(1);
      doc.fillColor("#3f3f46").fontSize(12).font("Helvetica").text(
        "Você chegou ao fim do guia. Se aplicou o que leu, provavelmente já está sentindo o começo da mudança. Se ainda não aplicou, esse é o passo mais importante — porque conhecimento sem prática não vira resultado.",
        { align: "justify", lineGap: 4 }
      );
      doc.moveDown(1);
      doc.text(
        "Nos próximos 7 dias, escolha 3 coisas deste material pra colocar em prática. Não tudo — só 3. E se comprometa com elas todo dia. Em uma semana você já vai ter uma nova base pra continuar.",
        { align: "justify", lineGap: 4 }
      );
      doc.moveDown(2);
      doc.fillColor("#7c3aed").fontSize(14).font("Helvetica-Bold").text("Seus 3 primeiros passos:");
      doc.moveDown(0.5);
      doc.fillColor("#3f3f46").fontSize(12).font("Helvetica");
      produto.beneficios.slice(0, 3).forEach((b, i) => {
        doc.text(`${i + 1}. ${b}`, { indent: 10, lineGap: 3 });
        doc.moveDown(0.3);
      });
      doc.moveDown(3);
      doc.fillColor("#a3a3a3").fontSize(10).text("Boa jornada.", { align: "center" });
      doc.moveDown(0.5);
      doc.fillColor("#a3a3a3").fontSize(9).text(`© ${new Date().getFullYear()} · ${produto.nome} · Gerado com Criafy`, { align: "center" });

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
