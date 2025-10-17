import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  experimental: {
    // optimizeCss is deprecated in Next.js 15+
  },
  compress: true,
  generateEtags: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // swcMinify is deprecated - SWC is enabled by default in Next.js 13+
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/:path*`,
      },
    ];
  },
  devIndicators: false
};

export default nextConfig;
