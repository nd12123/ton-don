// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    // Не останавливать prod build из-за ESLint
    ignoreDuringBuilds: true,
  },
  typescript: {
    // (опционально) Не останавливать prod build из-за TS-ошибок
    // Если хочешь — можешь поставить false и исправлять типы.
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
