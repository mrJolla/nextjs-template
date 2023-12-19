// @ts-check
const svg = require('@neodx/svg/webpack');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

/** @type {import('next').NextConfig} */
const config = {
  images: {
    formats: ['image/avif', 'image/webp'],
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
              viewBox: true,
            },
          },
        }),
      );
    }
    return config;
  }
};

module.exports = withBundleAnalyzer(config);
