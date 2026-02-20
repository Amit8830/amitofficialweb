/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  eslint: {
    dirs: ['app', 'components'],
  },
}

module.exports = nextConfig
