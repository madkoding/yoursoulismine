/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  allowedDevOrigins: ['tachikoma-1'],
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'http://tachikoma-1:3000',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
