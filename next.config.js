/** @type {import('next').NextConfig} */
const nextConfig = {
  // 禁用图片优化，因为静态导出不支持
  images: {
    unoptimized: true,
    domains: [
      'p1.music.126.net', 
      'p2.music.126.net',
      'pbs.twimg.com' // 添加Twitter图片域名
    ],
  },
  // 在构建时忽略ESLint错误
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 输出配置
  output: 'export',
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ]
  },
}

module.exports = nextConfig 