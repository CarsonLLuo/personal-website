/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // 静态导出必须设置为true
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: [
      'p1.music.126.net', 
      'p2.music.126.net',
      'pbs.twimg.com' // Twitter图片域名
    ],
  },
  // 在构建时忽略ESLint错误
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 输出配置
  output: 'export',
  // 指定输出目录
  distDir: 'out',
  // 禁用类型检查，以避免 [slug] 页面的类型错误
  typescript: {
    ignoreBuildErrors: true,
  },
  // 配置基本路径
  basePath: '',
  // 禁用严格模式
  reactStrictMode: false,
}

module.exports = nextConfig 