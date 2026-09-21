import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "Criafy <onboarding@resend.dev>"; // Troque quando conectar domínio

export async function enviarEmailRecuperacao(email: string, link: string) {
  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: "Redefinir sua senha do Criafy",
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; color: #0f0f14;">
          <h2 style="color: #7c3aed;">Redefinir senha do Criafy</h2>
          <p>Recebemos uma solicitação pra redefinir sua senha. Se foi você, clica no botão abaixo:</p>
          <p style="text-align: center; margin: 32px 0;">
            <a href="${link}" style="background: #0f0f14; color: white; padding: 12px 24px; border-radius: 999px; text-decoration: none; font-weight: bold;">
              Redefinir senha
            </a>
          </p>
          <p style="color: #737373; font-size: 13px;">
            O link expira em 1 hora. Se você não pediu isso, pode ignorar esse email.
          </p>
          <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 32px 0;" />
          <p style="color: #a3a3a3; font-size: 11px; text-align: center;">
            Criafy · Da ideia à venda em minutos
          </p>
        </div>
      `,
    });
  } catch (err) {
    console.error("Erro Resend:", err);
    throw new Error("Não foi possível enviar o email agora.");
  }
}

export async function enviarBoasVindas(email: string, nome: string) {
  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: "Bem-vindo ao Criafy!",
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; color: #0f0f14;">
          <h2 style="color: #7c3aed;">Bem-vindo(a), ${nome}!</h2>
          <p>Sua conta no Criafy foi criada com sucesso.</p>
          <p>Pra começar a criar seus produtos digitais, escolha um plano no painel.</p>
          <p style="text-align: center; margin: 32px 0;">
            <a href="${process.env.NEXTAUTH_URL}/planos" style="background: #0f0f14; color: white; padding: 12px 24px; border-radius: 999px; text-decoration: none; font-weight: bold;">
              Ver planos
            </a>
          </p>
          <p style="color: #a3a3a3; font-size: 11px; text-align: center; margin-top: 32px;">
            Criafy · criafy.site
          </p>
        </div>
      `,
    });
  } catch (err) {
    console.error("Erro Resend:", err);
  }
}
