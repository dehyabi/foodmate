import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: '/foodmate',  // Replace with your actual repo name
  assetPrefix: '/foodmate'
}

export default nextConfig
