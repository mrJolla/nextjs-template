const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  images: {
    deviceSizes: [475, 640, 920, 1240],
    domains: ['images.unsplash.com', 'robohash.org'],
    formats: ['image/avif', 'image/webp'],
    imageSizes: [150, 300],
  },
  reactStrictMode: true,
});
