/**
 * Script pra criar o administrador inicial do Criafy.
 *
 * Uso: npm run create:admin
 *
 * Requer variáveis de ambiente:
 *   ADMIN_EMAIL — email do admin (obrigatório)
 *   ADMIN_PASSWORD — senha inicial (opcional, gera aleatória se não fornecida)
 *   DATABASE_URL — string de conexão Neon
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  if (!email) {
    console.error("❌ ADMIN_EMAIL não configurada.");
    process.exit(1);
  }

  const senhaTemporaria =
    process.env.ADMIN_PASSWORD || crypto.randomBytes(16).toString("base64url");
  const passwordHash = await bcrypt.hash(senhaTemporaria, 12);

  const existente = await prisma.user.findUnique({ where: { email } });
  if (existente) {
    await prisma.user.update({
      where: { email },
      data: { role: "admin", passwordHash, forcePwdReset: true },
    });
    console.log(`✅ Usuário existente ${email} promovido a admin.`);
  } else {
    await prisma.user.create({
      data: {
        name: "Administrador",
        email,
        passwordHash,
        role: "admin",
        forcePwdReset: true,
        subscription: {
          create: { plan: "lifetime", status: "active_lifetime", startedAt: new Date() },
        },
      },
    });
    console.log(`✅ Admin criado: ${email}`);
  }

  console.log("");
  console.log("=======================================================");
  console.log(`  Email:  ${email}`);
  console.log(`  Senha:  ${senhaTemporaria}`);
  console.log("=======================================================");
  console.log("⚠️  Guarde essa senha e troque no primeiro login!");
  console.log("");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
