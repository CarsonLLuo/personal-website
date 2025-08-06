import { getAllPosts } from '@/lib/mdx'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'

export default async function BlogPage() {
  const posts = await getAllPosts()
  
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
          opacity: 0.6,
        }}
      />
      
      {/* 渐变遮罩 */}
      <div 
        className="fixed inset-0 z-0 bg-gradient-to-b from-black/50 to-black/80"
      />

      {/* 内容区域 */}
      <div className="relative z-10 min-h-screen">
        <div className="max-w-4xl mx-auto py-16 px-4">
          <h1 className="text-4xl font-bold mb-8">博客文章</h1>
          <div className="grid gap-6">
            {posts.map((post) => (
              <Link 
                key={post.slug} 
                href={`/blog/${post.slug}`}
                className="block p-6 rounded-lg bg-white/5 hover:bg-white/10 transition-all border border-white/10 backdrop-blur-sm"
              >
                <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-400 mb-2">{post.date}</p>
                <p className="text-gray-300">{post.description}</p>
                <div className="mt-4 flex gap-2">
                  {post.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}