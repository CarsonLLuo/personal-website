'use client'
import { motion } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'

export default function About() {
  return (
    <>
      <Navbar />
      
      {/* 背景和渐变效果 */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/monet-sunrise.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.8,
        }}
      />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/30 to-black/90" />

      <main className="relative z-10 min-h-screen p-8 max-w-4xl mx-auto">
        {/* 页面标题 */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12 pt-20"
        >
          <span className="bg-gradient-to-r from-blue-400 to-orange-500 text-transparent bg-clip-text">
            关于我
          </span>
        </motion.h1>


        <div className="space-y-12">
          {/* 个人简介部分 */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">

              {/* 头像 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-400/30"
              >
                <img 
                  src="/images/avatar.jpg" 
                  alt="Carson的头像" 
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* 简介文字 */}
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-4">
                <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-transparent bg-clip-text">
                    个人简介
                  </span>
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  你好，我是 Carson！目前是一名即将毕业的学生，对 AI 技术充满热情。
                  我相信技术能够改变世界，让生活变得更美好。在这个快速发展的时代，
                  我希望能够通过不断学习和探索，为世界带来一些积极的改变。
                </p>
              </div>
            </div>
          </motion.section>

          {/* 教育背景时间线 */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
          >
            <h2 className="text-2xl font-semibold mb-6">
            <span className="bg-gradient-to-r from-orange-400 to-amber-500 text-transparent bg-clip-text">
                教育背景
              </span>
            </h2>
            <div className="space-y-0">
              {/* 本科教育 */}
              <div className="relative pl-8 pb-8 border-l-2 border-blue-400/50">
                <div className="absolute w-4 h-4 bg-blue-400 rounded-full -left-[9px] mt-1.5">
                  <div className="w-2 h-2 bg-white rounded-full m-1"></div>
                </div>
                <div className="space-y-2">
                  <span className="text-blue-300 font-medium">2021 - 2025</span>
                  <h3 className="text-xl text-gray-200 ">牛津布鲁克斯大学 & 成都理工大学</h3>
                  <p className="text-gray-300 ">BSc (Hons) Software Engineering</p>
                  <div className="bg-white/5 rounded p-4 space-y-2 mt-2">
                    <p className="text-gray-300 ">
                      总成绩：68.631/100 - Upper Second Class Honours (2:1)
                    </p>
                    <p className="text-gray-300">主修课程：</p>
                    <ul className="list-disc list-inside text-gray-300 pl-4 space-y-1 ">
                      <li>Mathematics for Computing (81)</li>
                      <li>DevOps (74)</li>
                      <li>Basic Communications and PC Networking (76)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 硕士计划 */}
              <div className="relative pl-8 border-l-2 border-blue-400/50">
                <div className="absolute w-4 h-4 bg-blue-400/50 rounded-full -left-[9px] mt-1.5">
                  <div className="w-2 h-2 bg-white/50 rounded-full m-1"></div>
                </div>
                <div className="space-y-2">
                  <span className="text-blue-300/70 font-medium">2026</span>
                  <h3 className="text-xl text-gray-200 ">海外留学</h3>
                  <p className="text-gray-300/70 italic ">继续深造，探索更多可能...</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* 技能专长部分 */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
          >
            <h2 className="text-2xl font-semibold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-amber-400 text-transparent bg-clip-text">
                技能专长
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="text-xl text-gray-200">编程语言</h3>
                <ul className="text-gray-300 list-disc list-inside">
                  <li>Python</li>
                  <li>JavaScript / TypeScript</li>
                  <li>HTML / CSS</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl text-gray-200">技术框架</h3>
                <ul className="text-gray-300 list-disc list-inside">
                  <li>React / Next.js</li>
                  <li>TailwindCSS</li>
                  <li>机器学习相关框架</li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* 兴趣爱好部分 */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
          >
            <h2 className="text-2xl font-semibold mb-4">
            <span className="bg-gradient-to-r from-amber-500 to-orange-400 text-transparent bg-clip-text">
                兴趣爱好
              </span>
            </h2>
            <div className="text-gray-300 space-y-4">
              <p>🎵 音乐：热爱听各种类型的音乐，尤其是...</p>
              <p>📚 阅读：喜欢探索不同领域的知识</p>
              <p>🌏 旅行：享受探索世界的过程</p>
              <p>🤖 AI：对人工智能技术充满好奇</p>
            </div>
          </motion.section>

          {/* 未来计划部分 */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10"
          >
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">未来计划</h2>
            <p className="text-gray-300 leading-relaxed">
              计划在毕业后进行一段时间的 Gap，期间会专注于个人技能的提升，
              同时探索更多可能性。希望能在 AI 领域找到自己的方向，
              为技术的发展贡献自己的一份力量。
            </p>
          </motion.section>
        </div>
      </main>
    </>
  )
}