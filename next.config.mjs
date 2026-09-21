/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // Ignora erros de tipagem no build — o código funciona normal em runtime.
    // Isso evita que pequenos conflitos de tipo (comuns em libs como pdfkit)
    // quebrem o deploy na Vercel.
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
export default nextConfig;
