import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true
  },
  webpack(config) {
    // Exclui svg da regra padrão
    config.module.rules.forEach((rule: any) => {
      if (rule.test && rule.test.toString().includes('svg')) {
        rule.exclude = /\.svg$/i;
      }
    });

    // Adiciona loader do svgr
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/catalogo',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
