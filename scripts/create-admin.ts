/**
 * Script pra criar o administrador inicial do Criafy.
 *
 * Variáveis:
 *   ADMIN_EMAIL — email do admin (obrigatório)
 *   ADMIN_INITIAL_PASSWORD — senha inicial (obrigatória)
 *
 * Segurança:
 *   - Não recria admin se já existir com esse email
 *   - Só imprime senha se você passar --show-password
 *   - Marca forcePwdReset=true pra forçar troca no primeiro login
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const senha = process.env.ADMIN_INITIAL_PASSWORD;
  const mostrarSenha = process.argv.includes("--show-password");

  if (!email) {
    console.error("❌ ADMIN_EMAIL não definida no ambiente.");
    process.exit(1);
  }
  if (!senha || senha.length < 12) {
    console.error(
      "❌ ADMIN_INITIAL_PASSWORD ausente ou fraca. Use pelo menos 12 caracteres."
    );
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(senha, 12);

  const existente = await prisma.user.findUnique({ where: { email } });
  if (existente) {
    if (existente.role === "admin") {
      console.log(`✓ Admin ${email} já existe. Nada foi alterado.`);
    } else {
      await prisma.user.update({
        where: { email },
        data: { role: "admin" },
      });
      console.log(`✓ Usuário ${email} promovido a admin.`);
    }
  } else {
    await prisma.user.create({
      data: {
        name: "Administrador",
        email,
        passwordHash,
        role: "admin",
        forcePwdReset: true,
        subscription: {
          create: {
            plan: "lifetime",
            status: "active_lifetime",
            startedAt: new Date(),
          },
        },
      },
    });
    console.log(`✓ Admin criado: ${email}`);
  }

  if (mostrarSenha) {
    console.log("");
    console.log("⚠️  Senha inicial (rode uma vez, não guarde em logs):");
    console.log("    " + senha);
    console.log("");
    console.log("Recomendação: troque a senha no primeiro login (/conta).");
  } else {
    console.log("");
    console.log("Senha não impressa. Use --show-password se precisar.");
  }
}

main()
  .catch((e) => {
    console.error("Erro:", e?.message || e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
