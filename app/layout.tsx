import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Criafy — Da ideia à venda em minutos",
  description:
    "A IA cria seu produto digital, encontra seu público, escreve suas ofertas e publica sua página de vendas. Você só divulga e vende.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
