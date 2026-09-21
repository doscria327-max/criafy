"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Status = "checking" | "confirmed" | "pending" | "unknown";

export default function PagamentoRealizadoPage() {
  const [status, setStatus] = useState<Status>("checking");

  useEffect(() => {
    const verificar = async () => {
      try {
        const r = await fetch("/api/verificar-pagamento", { method: "POST" });
        if (r.status === 401) {
          setStatus("unknown");
          return;
        }
        const data = await r.json();
        if (data.status === "active_lifetime" || data.status === "active_monthly") {
          setStatus("confirmed");
        } else if (data.status === "payment_pending") {
          setStatus("pending");
        } else {
          setStatus("unknown");
        }
      } catch {
        setStatus("unknown");
      }
    };
    verificar();
  }, []);

  const mensagens = {
    checking: {
      titulo: "Verificando pagamento...",
      texto: "Aguarde enquanto confirmamos os dados da sua compra.",
      icone: "⏳",
    },
    confirmed: {
      titulo: "Pagamento confirmado!",
      texto:
        "Seu acesso ao Criafy foi liberado. Você já pode começar a criar produtos ilimitados.",
      icone: "✅",
    },
    pending: {
      titulo: "Recebemos sua solicitação",
      texto:
        "O pagamento ainda está sendo processado. Nossa equipe de suporte entrará em contato através dos dados informados durante a compra pra orientar os próximos passos e liberar seu acesso, quando aplicável.",
      icone: "⏳",
    },
    unknown: {
      titulo: "Tudo certo com o seu pagamento!",
      texto:
        "Seu pagamento foi identificado ou está em processo de confirmação. Nossa equipe de suporte entrará em contato através dos dados informados durante a compra pra orientar os próximos passos e liberar seu acesso, quando aplicável.",
      icone: "📩",
    },
  };

  const info = mensagens[status];

  return (
    <main className="min-h-screen bg-neutral-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl">
        <Link href="/" className="block text-center text-2xl font-black mb-8">
          Cria<span className="gradient-text">fy</span>
        </Link>

        <div className="bg-white p-10 rounded-3xl border border-neutral-200 shadow-sm">
          <div className="text-center">
            <div className="text-7xl mb-6">{info.icone}</div>
            <h1 className="text-3xl md:text-4xl font-black mb-4">{info.titulo}</h1>
            <p className="text-neutral-600 text-lg mb-8 max-w-lg mx-auto">
              {info.texto}
            </p>

            {status === "confirmed" && (
              <Link
                href="/dashboard"
                className="inline-block bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-neutral-800 transition"
              >
                Ir pro painel →
              </Link>
            )}

            {status !== "confirmed" && status !== "checking" && (
              <>
                <div className="p-5 rounded-2xl bg-brand-50 border border-brand-200 mb-6 text-left">
                  <p className="font-bold text-brand-900 mb-2">
                    ⚠️ Confira seus dados
                  </p>
                  <p className="text-sm text-brand-800">
                    Confira se o nome, email e telefone informados durante a compra
                    estão corretos. Isso agiliza a liberação do seu acesso.
                  </p>
                </div>

                <p className="text-sm text-neutral-600 mb-4">
                  Caso você tenha informado algum dado incorreto ou o suporte demore
                  para entrar em contato, fale diretamente conosco pelo WhatsApp.
                </p>

                <a
                  href="https://wa.me/5561920049241"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-4 rounded-full font-bold hover:bg-green-600 transition"
                >
                  <span>💬</span>
                  Falar com o suporte pelo WhatsApp
                </a>
              </>
            )}
          </div>
        </div>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-sm text-neutral-600 hover:text-brand-600 transition"
          >
            ← Voltar pra página inicial
          </Link>
        </div>

        <p className="text-center text-xs text-neutral-500 mt-8">
          🔒 Suas informações estão protegidas e não exibimos dados sensíveis do pagamento nesta página.
        </p>
      </div>
    </main>
  );
}
