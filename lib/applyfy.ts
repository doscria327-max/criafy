/**
 * Integração com a API Applyfy.
 *
 * ⚠️ IMPORTANTE: os endpoints abaixo são placeholders. Quando você conseguir
 * a documentação oficial da API Applyfy, ajuste as constantes e a função
 * consultarTransacaoPorEmail() abaixo.
 *
 * O que a função precisa fazer:
 *   - Consultar transações no Applyfy filtrando pelo email do cliente
 *   - Retornar a mais recente com status "aprovada" ou "confirmada"
 *   - Se não houver nenhuma, retornar null
 */

const APPLYFY_API_BASE = process.env.APPLYFY_API_BASE || "https://api.applyfy.com.br";
const APPLYFY_KEY = process.env.APPLYFY_API_KEY;

export type TransacaoApplyfy = {
  id: string;
  status: "aprovada" | "pendente" | "recusada" | "estornada" | "chargeback";
  email: string;
  valor: number;
  createdAt: string;
  offerId?: string;
};

/**
 * Consulta se um email tem transação aprovada na Applyfy.
 * TODO: ajustar quando tivermos a documentação real da API.
 */
export async function consultarTransacaoPorEmail(
  email: string
): Promise<TransacaoApplyfy | null> {
  if (!APPLYFY_KEY) {
    console.warn("APPLYFY_API_KEY não configurada — verificação de pagamento desativada.");
    return null;
  }

  try {
    // ⚠️ AJUSTAR ESTE ENDPOINT quando tiver a doc oficial
    const url = `${APPLYFY_API_BASE}/v1/transactions?email=${encodeURIComponent(email)}&status=aprovada`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${APPLYFY_KEY}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.warn("Falha na API Applyfy:", res.status);
      return null;
    }

    const data: any = await res.json();

    // Ajustar o path conforme o formato real
    const transacoes: TransacaoApplyfy[] = data.data || data.transactions || data.items || [];

    if (!transacoes.length) return null;

    // Retorna a mais recente aprovada
    const aprovada = transacoes
      .filter((t) => t.status === "aprovada")
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];

    return aprovada || null;
  } catch (err) {
    console.error("Erro ao consultar Applyfy:", err);
    return null;
  }
}

// Mapeia offer ID -> plano
export const OFFER_TO_PLAN: Record<string, "monthly" | "lifetime"> = {
  HRFF64Q: "monthly",
  A3ZSAEW: "lifetime",
};

export const CHECKOUT_URLS = {
  monthly:
    "https://checkout.applyfy.com.br/checkout/cmubahyei00da01olqc4ksrtk?offer=HRFF64Q",
  lifetime:
    "https://checkout.applyfy.com.br/checkout/cmubahyei00da01olqc4ksrtk?offer=A3ZSAEW",
};
