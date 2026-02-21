const nextConfig = {
  output: 'export',
  distDir: 'out',
  eslint: {
    ignoreDuringBuilds: true,  // Add this
  },
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig