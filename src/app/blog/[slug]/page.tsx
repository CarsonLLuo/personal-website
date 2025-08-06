import { getPostBySlug, getAllPosts } from '@/lib/mdx'
import Navbar from '@/components/layout/Navbar'

// 生成静态路径
export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map(post => ({
    slug: post.slug,
  }))
}

// 页面组件 - 使用 Next.js 15.1.7 的标准类型定义
export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  // 使用解构赋值直接获取 slug
  const { slug } = params
  
  // 获取文章内容
  const { meta, content } = await getPostBySlug(slug)
  
  return (
    <>
      <Navbar />
      {/* 背景图层 */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/monet-sunrise.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center', 
          backgroundRepeat: 'no-repeat',
          opacity: 0.5,
        }}
      />
      
      {/* 渐变遮罩 */}
      <div 
        className="fixed inset-0 z-0 bg-gradient-to-b from-black/20 to-black/500"
      />

      {/* 文章内容 */}
      <article className="relative z-10 min-h-screen">
        <div className="max-w-7xl mx-auto py-20 px-6">
          {/* 文章头部 */}
          <header className="mb-16 text-center">
            <h1 className="text-6xl font-bold mb-8 font-serif tracking-tight leading-tight">
              {meta.title}
            </h1>
            <div className="flex items-center justify-center gap-6 text-gray-300 text-base">
              <time className="font-mono bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm">
                {meta.date}
              </time>
              <span className="text-white/40">·</span>
              <span className="font-sans text-white/80">{meta.author}</span>
            </div>
          </header>

          <div className="bg-black/40 backdrop-blur-md rounded-3xl p-12 border border-white/10 shadow-2xl">
            {/* 文章内容 - 使用简单的文本渲染替代 MDXRemote */}
            <div className="prose prose-invert prose-lg max-w-none han-serif">
              <div dangerouslySetInnerHTML={{ __html: `<div class="markdown-content">${content}</div>` }} />
            </div>
            
            {/* 文章标签 */}
            <footer className="mt-16 pt-8 border-t border-white/10">
              <div className="flex flex-wrap gap-3">
                {meta.tags && meta.tags.map((tag: string) => (
                  <span 
                    key={tag}
                    className="px-4 py-2 bg-blue-500/15 text-blue-200 rounded-full text-sm font-mono hover:bg-blue-500/25 transition-colors duration-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </footer>
          </div>
        </div>
      </article>
    </>
  )
}