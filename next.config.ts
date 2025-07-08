import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        and: [/\.(ts|tsx|js|jsx|mdx)$/],
      },
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
  }
};

export default nextConfig;
