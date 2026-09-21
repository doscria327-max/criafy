/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // pdfkit precisa ser tratado como pacote externo no server pra as fontes
  // internas (Helvetica.afm etc.) serem localizadas corretamente na Vercel.
  serverExternalPackages: ["pdfkit"],
  experimental: {
    serverComponentsExternalPackages: ["pdfkit"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
export default nextConfig;
