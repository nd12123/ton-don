// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // чтобы в Docker работал node-рантайм из .next/standalone
  output: 'standalone',

  images: {
    // если грузишь картинки с внешних доменов — открой их тут.
    // Можно сузить до конкретных хостов вместо "**".
    //remotePatterns: [
      //{ protocol: 'https', hostname: '**' },
      // пример:
      // { protocol: 'https', hostname: 'cdn.yoursite.com' },
      // { protocol: 'https', hostname: 'images.unsplash.com' },
    //],
    // опционально:
    // formats: ['image/avif', 'image/webp'],
  },

  eslint: {
    // не останавливать prod build из-за ESLint
    ignoreDuringBuilds: true,
  },

  typescript: {
    // если хочешь, можно поставить true, чтобы не блокировало сборку
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
