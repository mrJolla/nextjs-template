// @ts-check
/** @type {import('next').NextConfig} */
const svg = require('@neodx/svg/webpack');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

const config = {
  images: {
    deviceSizes: [475, 640, 920, 1240],
    domains: ['images.unsplash.com', 'robohash.org'],
    formats: ['image/avif', 'image/webp'],
    imageSizes: [150, 300]
  },
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Prevent doubling svg plugin, let's run it only for client build
    if (!isServer) {
      config.plugins.push(
        svg({
          root: 'assets/icons',
          output: 'public/imgs/svg-sprites',
          group: true,
          fileName: '{name}.{hash:8}.svg',
          metadata: {
            path: 'src/shared/types/icon.ts',
            runtime: {
              size: true,
              viewBox: true
            }
          }
        })
      );
    }
    return config;
  }
};

module.exports = withBundleAnalyzer(config);
