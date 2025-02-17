import { getPostBySlug } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { MDXComponents } from '@/components/MDXComponents'
import Navbar from '@/components/layout/Navbar'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function PostPage({ params }: PageProps) {
  const resolvedParams = await params
  const { meta, content } = await getPostBySlug(resolvedParams.slug)
  
  return (
    <>
      <Navbar />
      {/* 背景图层 */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/monet-sunrise.jpg)',
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
          
            <div className="prose prose-invert prose-lg prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl max-w-none font-serif">
              <MDXRemote source={content} components={MDXComponents} />
            </div>

            
            <footer className="mt-16 pt-8 border-t border-white/10">
              <div className="flex flex-wrap gap-3">
                {meta.tags.map((tag: string) => (
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