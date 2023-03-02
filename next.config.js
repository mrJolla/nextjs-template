const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  distDir: 'build',
  compress: false,
  experimental: {
    isrMemoryCacheSize: 0,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
});
