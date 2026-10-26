import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./next-intl.config.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  reactCompiler: false, // React 19 compatibility

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    // StoryFrame renders at 85 and CinematicBackground at 80; unlisted values are coerced to 75.
    qualities: [75, 80, 85],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Compression
  compress: true,

  // PoweredBy header removal for security
  poweredByHeader: false,

  // Experimental features for performance
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },

  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
};

export default withNextIntl(nextConfig);
