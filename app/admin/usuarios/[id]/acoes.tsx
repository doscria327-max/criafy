"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UsuarioAcoes({
  userId,
  isSelf,
  status,
  plan,
  role,
  currentExpires,
}: {
  userId: string;
  isSelf: boolean;
  status: string;
  plan: string;
  role: string;
  currentExpires: string;
}) {
  const router = useRouter();
  const [acting, setActing] = useState(false);
  const [novaData, setNovaData] = useState(currentExpires);

  const isAtivo = status === "active_monthly" || status === "active_lifetime";
  const isVitalicio = status === "active_lifetime";
  const isSuspenso = status === "suspended";

  async function agir(action: string, extra: any = {}) {
    if (!confirm("Tem certeza dessa ação?")) return;
    setActing(true);
    try {
      const r = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, ...extra }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "Falha");
      router.refresh();
    } catch (err: any) {
      alert("Erro: " + err.message);
    } finally {
      setActing(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6">
      <h2 className="text-xl font-black mb-4">Ações administrativas</h2>

      {!isAtivo && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
          <p className="font-bold text-yellow-900 mb-2">🔓 Liberar acesso manualmente</p>
          <p className="text-sm text-yellow-800 mb-4">
            Use quando você confirmou o pagamento na Applyfy manualmente.
          </p>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => agir("liberar_mensal")}
              disabled={acting}
              className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-green-700 disabled:opacity-50"
            >
              Liberar mensal (30 dias)
            </button>
            <button
              onClick={() => agir("liberar_vitalicio")}
              disabled={acting}
              className="bg-brand-600 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-brand-700 disabled:opacity-50"
            >
              Liberar vitalício
            </button>
          </div>
        </div>
      )}

      {isAtivo && !isVitalicio && (
        <div className="mb-6 p-4 bg-neutral-50 rounded-xl">
          <p className="font-bold mb-2">📅 Alterar data de expiração</p>
          <div className="flex gap-2">
            <input
              type="date"
              value={novaData}
              onChange={(e) => setNovaData(e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg border border-neutral-300"
            />
            <button
              onClick={() => agir("alterar_expiracao", { expiresAt: novaData })}
              disabled={acting || !novaData}
              className="bg-black text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-neutral-800 disabled:opacity-50"
            >
              Salvar
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-2 flex-wrap mb-4">
        {isSuspenso ? (
          <button
            onClick={() => agir("reativar")}
            disabled={acting}
            className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-green-700 disabled:opacity-50"
          >
            Reativar acesso
          </button>
        ) : isAtivo ? (
          <button
            onClick={() => agir("suspender")}
            disabled={acting || isSelf}
            className="bg-yellow-600 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-yellow-700 disabled:opacity-50"
          >
            Suspender acesso
          </button>
        ) : null}

        {status !== "canceled" && status !== "expired" && !isSelf && (
          <button
            onClick={() => agir("cancelar")}
            disabled={acting}
            className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-red-700 disabled:opacity-50"
          >
            Cancelar assinatura
          </button>
        )}
      </div>

      {/* Promoção admin */}
      <div className="pt-4 border-t border-neutral-100">
        <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">
          Permissões
        </p>
        {role === "admin" ? (
          <button
            onClick={() => agir("rebaixar_user")}
            disabled={acting || isSelf}
            className="text-sm text-red-600 font-bold hover:underline disabled:opacity-50"
          >
            {isSelf ? "Você não pode rebaixar a si mesmo" : "Rebaixar para usuário comum"}
          </button>
        ) : (
          <button
            onClick={() => agir("promover_admin")}
            disabled={acting}
            className="text-sm text-brand-600 font-bold hover:underline disabled:opacity-50"
          >
            Promover a administrador
          </button>
        )}
      </div>
    </div>
  );
}
