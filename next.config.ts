import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable default image optimization
  },
  assetPrefix: isProd ? '/Real-Estate-App/' : '',
  basePath: isProd ? '/Real-Estate-App' : '',
  output: 'export',
};

export default nextConfig;
