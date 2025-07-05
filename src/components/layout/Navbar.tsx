'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // 使用防抖来优化鼠标移动检测
  function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
    let timeout: NodeJS.Timeout
    return (...args: Parameters<T>) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func(...args), wait)
    }
  }

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (e.clientY <= 150) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [])

  // 使用防抖处理鼠标移动
  const debouncedHandleMouseMove = useCallback(() => {
    const debounced = debounce(handleMouseMove, 50)
    return debounced
  }, [handleMouseMove])

  useEffect(() => {
    const handler = debouncedHandleMouseMove()
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [debouncedHandleMouseMove])

  const navLinks = [
    { href: '/blog', text: '博客文章' },
    { href: '/about', text: '关于我' },
    { href: '/friends', text: '友链' },
  ]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ 
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1] // 使用 easeInOut 缓动函数
          }}
          className="fixed top-0 w-full z-50"
        >
          {/* 渐变背景遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent pointer-events-none" />
          
          <nav className="relative">
            <div className="container mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <Link 
                  href="/" 
                  className="text-xl font-bold text-white hover:text-blue-400 transition-colors"
                >
                  Carson Luo
                </Link>

                {/* 大屏幕导航 */}
                <ul className="hidden md:flex space-x-8">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link 
                        href={link.href}
                        className="text-gray-300 hover:text-blue-400 transition-colors"
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* 移动端菜单按钮 */}
                <button 
                  className="md:hidden p-2 text-gray-300 hover:text-blue-400 transition-colors"
                  onClick={() => setIsOpen(!isOpen)}
                  aria-label="Toggle menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>

              {/* 移动端下拉菜单 */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="md:hidden mt-4"
                  >
                    <ul className="space-y-4">
                      {navLinks.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="block text-gray-300 hover:text-blue-400 transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            {link.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>
        </motion.header>
      )}
    </AnimatePresence>
  )
} 