/** @type {import('next').NextConfig} */
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${BACKEND_URL}/:path*`,
      },
    ]
  },
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'http', hostname: '84.247.128.114' },
    ],
  },
  // Aumenta timeout per il proxy verso backend VPS
  // outputFileTracingIncludes: bundle degli ebook privati nella route /api/ebook su Vercel
  experimental: {
    proxyTimeout: 60000,
    outputFileTracingIncludes: {
      '/api/ebook': ['./private/ebook/**'],
    },
  },
}

module.exports = nextConfig
