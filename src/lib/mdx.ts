import { compileMDX } from 'next-mdx-remote/rsc'
import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

type Post = {
    slug: string;
    title: string;
    date: string;
    tags: string[];
    description: string;
    author: string;
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
  
  return {
    meta: data,
    content,
    slug
  }
}

