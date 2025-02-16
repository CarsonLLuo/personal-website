'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 w-full z-50"
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className="text-xl font-bold text-white hover:text-blue-400 transition-colors"
          >
            Carson Luo
          </Link>
          <ul className="flex space-x-8">
            <li>
              <Link 
                href="/blog" 
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                博客文章
              </Link>
            </li>
            <li>
              <Link 
                href="/about" 
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                关于我
              </Link>
            </li>
            <li>
              <Link 
                href="/music" 
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                音乐推荐
              </Link>
            </li>
            <li>
              <Link 
                href="/reading" 
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                阅读清单
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </motion.header>
  )
}