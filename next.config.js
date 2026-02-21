/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Add this line
  distDir: '.next',  // Ensure this matches your publish directory
}

module.exports = nextConfig