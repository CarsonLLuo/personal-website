import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

type Post = {
    slug: string;
    title: string;
    date: string;
    tags: string[];
    description: string;
    author: string;
  }

// 将 Markdown 转换为 HTML
async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(html)
    .process(markdown)
  return result.toString()
}

// 获取所有文章
export async function getAllPosts() {
  const postsDirectory = join(process.cwd(), 'content/blog')
  const files = readdirSync(postsDirectory)
  
  const posts = files
    .filter(file => file.endsWith('.mdx'))
    .map(file => {
      const fullPath = join(postsDirectory, file)
      const fileContents = readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)
      const slug = file.replace(/\.mdx$/, '')
      
      return {
        slug,
        ...(data as Omit<Post, 'slug'>),
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
  
  return posts
}

// 获取单篇文章
export async function getPostBySlug(slug: string) {
  const fullPath = join(process.cwd(), 'content/blog', `${slug}.mdx`)
  const fileContents = readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  
  // 将 Markdown 转换为 HTML
  const contentHtml = await markdownToHtml(content)
  
  return {
    meta: data,
    content: contentHtml,
    slug
  }
}

