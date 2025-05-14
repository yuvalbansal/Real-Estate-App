const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable default image optimization
  },
  assetPrefix: isProd ? '/Real-Estate-App/' : '',
  basePath: isProd ? '/Real-Estate-App' : '',
  output: 'export',
};

module.exports = nextConfig;
