'use client'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import Navbar from '@/components/layout/Navbar'
import Link from 'next/link'
import Image from 'next/image'
import { FaGithub, FaTwitter, FaEnvelope } from 'react-icons/fa'
import { SiBilibili } from 'react-icons/si'

export default function Home() {
  return (
    <>
      <Navbar />
      {/* 背景图层 - 使用Next.js Image组件优化 */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/monet-sunrise.webp" 
          alt="莫奈日出印象背景"
          fill
          priority
          quality={75}
          sizes="100vw"
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      </div>
      
      {/* 渐变遮罩 */}
      <div 
        className="fixed inset-0 z-0 bg-gradient-to-b from-black/30 to-black/90"
      />

      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center p-3 sm:p-6 md:p-8">
        {/* 主标题区域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6 sm:mb-12 md:mb-16 w-full max-w-[90%] sm:max-w-3xl mx-auto"
        >
          <div className="mb-3 sm:mb-6 text-gray-300 text-sm sm:text-base md:text-lg">
          <TypeAnimation
              sequence={[
                '为明天到来的事',
                1000,
                '',
                1000,
                '说人生像没有选择会是唯一的路',
                1000,
                '',
                1000,
              ]}
              wrapper="span"
              speed={50}
              style={{ display: 'inline-block' }}
              repeat={Infinity}
              deletionSpeed={50}
            />
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-8">
            <span className="bg-gradient-to-r from-blue-400 to-orange-500 text-transparent bg-clip-text">
              Carson的小屋
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-gray-300 space-y-1 sm:space-y-2"
          >
            <p>👋 这里是 Carson</p>
            <p>🎓 现在是Gap Year</p>
            <p>💻 热爱探索 AI 技术</p>
            <p>🌱 希望这个世界变得更好</p>
          </motion.div>
        </motion.div>

        {/* 功能卡片区域 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 md:gap-8 w-full max-w-[90%] sm:max-w-4xl mx-auto"
        >
          <Link href="/blog" className="group transform hover:scale-105 transition-all duration-200">
            <div className="p-3 sm:p-6 md:p-8 rounded-lg bg-white/5 hover:bg-white/10 transition-all border border-white/10">
              <h2 className="text-lg sm:text-2xl font-semibold mb-1 sm:mb-3 group-hover:text-blue-400">博客文章</h2>
              <p className="text-xs sm:text-base text-gray-400">分享想法与技术</p>
            </div>
          </Link>

          <Link href="/about" className="group transform hover:scale-105 transition-all duration-200">
            <div className="p-3 sm:p-6 md:p-8 rounded-lg bg-white/5 hover:bg-white/10 transition-all border border-white/10">
              <h2 className="text-lg sm:text-2xl font-semibold mb-1 sm:mb-3 group-hover:text-blue-400">关于我</h2>
              <p className="text-xs sm:text-base text-gray-400">了解更多我的故事</p>
            </div>
          </Link>
        </motion.div>

        {/* 社交链接区域 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 sm:mt-12 md:mt-16 flex space-x-3 sm:space-x-6 md:space-x-8"
        >
          <a 
            href="https://github.com/CarsonLLuo" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-white transition-colors text-lg sm:text-2xl transform hover:scale-110 duration-200"
          >
            <FaGithub />
          </a>
          <a 
            href="https://twitter.com/carsonluo2003" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-white transition-colors text-lg sm:text-2xl transform hover:scale-110 duration-200"
          >
            <FaTwitter />
          </a>
          <a 
            href="https://space.bilibili.com/13818426" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-white transition-colors text-lg sm:text-2xl transform hover:scale-110 duration-200"
          >
            <SiBilibili />
          </a>
          <a 
            href="mailto:carsonluo2233@outlook.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-white transition-colors text-lg sm:text-2xl transform hover:scale-110 duration-200"
          >
            <FaEnvelope />
          </a>
        </motion.div>
      </main>
    </>
  )
}