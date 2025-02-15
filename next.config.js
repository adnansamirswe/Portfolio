/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dribbble.com',
        port: '',
        pathname: '/users/**',
      },
      // Add other domains if needed
    ],
  },
}

module.exports = nextConfig
