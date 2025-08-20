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
          backgroundImage: 'url(/images/monet-sunrise.webp)',
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
          transition={{ duration: 0.5 }}
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
                className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-400/30 relative"
              >
                <img 
                  src="/images/avatar.jpg" 
                  alt="Carson的头像" 
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>

              {/* 简介文字 */}
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-4">
                <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-transparent bg-clip-text">
                    个人简介
                  </span>
                </h2>
                <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm border border-white/10">
                  <p className="text-gray-300 leading-relaxed">
                    你好，我是Carson，你也可以叫我小罗。<br />
                    我花了一点时间来想这里的简介该写什么，但好像都有些词不达意。<br />
                    之前很喜欢酒精和咖啡因带来的快感，可惜被医生Ban掉了。<br />
                    F1车迷，喜欢Papaya。<br />
                    是拜仁慕尼黑和成都蓉城这两支红色队伍的拥趸。<br />
                    平时会听很多很多摇滚乐，同时也乐意创造自己的声音。<br />
                    目前正在享受Vibe Coding带来的眩晕感。<br />
                    永远把自己困在过去和未来。<br />
                    目前生活在成都。<br />
                    希望你在这里能找到一些有趣的东西。
                  </p>
                </div>
                <div className="mt-4 text-center border-t border-white/10 pt-4">
                  <p className="text-gray-400 italic text-sm font-serif">
                    "Cogito, ergo sum."
                  </p>
                  <p className="text-gray-300 text-sm mt-1">
                    我思故我在
                  </p>
                </div>
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
                      总成绩：72.125/100 - First Class Honours (1:1)
                    </p>
                    <p className="text-gray-300">主修课程：</p>
                    <ul className="list-disc list-inside text-gray-300 pl-4 space-y-1 ">
                      <li>The Human Computer Interaction (71)</li>
                      <li>Machine Learning (75)</li>
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
            <h2 className="text-2xl font-semibold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-amber-400 text-transparent bg-clip-text">
                技能专长
              </span>
            </h2>
            
            {/* 编程语言部分 */}
            <div className="mb-8">
              <h3 className="text-xl text-gray-100 mb-3 flex items-center">
                <span className="w-8 h-8 mr-2 flex items-center justify-center rounded-full bg-blue-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
                编程语言
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-white/5 p-3 rounded-lg border border-white/10 hover:bg-white/10 transition-all">
                  <div className="font-medium text-blue-300">Python</div>
                  <div className="text-gray-300 text-sm">精通数据科学栈(Pandas, NumPy, Matplotlib)及DL框架</div>
                </div>
                <div className="bg-white/5 p-3 rounded-lg border border-white/10 hover:bg-white/10 transition-all">
                  <div className="font-medium text-blue-300">JavaScript / TypeScript</div>
                  <div className="text-gray-300 text-sm">掌握React生态系统</div>
                </div>
                <div className="bg-white/5 p-3 rounded-lg border border-white/10 hover:bg-white/10 transition-all">
                  <div className="font-medium text-blue-300">数据库技术</div>
                  <div className="text-gray-300 text-sm">MySQL关系型数据库、Redis非关系型数据库</div>
                </div>
                <div className="bg-white/5 p-3 rounded-lg border border-white/10 hover:bg-white/10 transition-all">
                  <div className="font-medium text-blue-300">Java</div>
                  <div className="text-gray-300 text-sm">基础语法及面向对象编程</div>
                </div>
                <div className="bg-white/5 p-3 rounded-lg border border-white/10 hover:bg-white/10 transition-all">
                  <div className="font-medium text-blue-300">C++</div>
                  <div className="text-gray-300 text-sm">基础语法及数据结构实现</div>
                </div>
                <div className="bg-white/5 p-3 rounded-lg border border-white/10 hover:bg-white/10 transition-all">
                  <div className="font-medium text-blue-300">HTML / CSS</div>
                  <div className="text-gray-300 text-sm">现代化Web界面构建</div>
                </div>
                <div className="bg-white/5 p-3 rounded-lg border border-white/10 hover:bg-white/10 transition-all">
                  <div className="font-medium text-blue-300">Dart</div>
                  <div className="text-gray-300 text-sm">Flutter跨平台应用开发</div>
                </div>
              </div>
            </div>
            

            
            {/* AI技能部分 */}
            <div className="mb-8">
              <h3 className="text-xl text-gray-100 mb-3 flex items-center">
                <span className="w-8 h-8 mr-2 flex items-center justify-center rounded-full bg-amber-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </span>
                AI技能
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-white/5 p-3 rounded-lg border border-white/10 hover:bg-white/10 transition-all">
                  <div className="font-medium text-amber-300">机器学习算法</div>
                  <div className="text-gray-300 text-sm">线性回归、SVM、XGBoost等</div>
                </div>
                <div className="bg-white/5 p-3 rounded-lg border border-white/10 hover:bg-white/10 transition-all">
                  <div className="font-medium text-amber-300">深度学习模型</div>
                  <div className="text-gray-300 text-sm">CNN、RNN、GNN、Transformer架构</div>
                </div>
                <div className="bg-white/5 p-3 rounded-lg border border-white/10 hover:bg-white/10 transition-all">
                  <div className="font-medium text-amber-300">特征工程及可解释性</div>
                  <div className="text-gray-300 text-sm">EDA、LDA、LASSO、PCA、SHAP、Grad-CAM、LIME</div>
                </div>
                <div className="bg-white/5 p-3 rounded-lg border border-white/10 hover:bg-white/10 transition-all">
                  <div className="font-medium text-amber-300">Prompt Engineering</div>
                  <div className="text-gray-300 text-sm">Zero-shot、Few-shot、CoT技术</div>
                </div>
                <div className="bg-white/5 p-3 rounded-lg border border-white/10 hover:bg-white/10 transition-all">
                  <div className="font-medium text-amber-300">AI应用及Agent开发</div>
                  <div className="text-gray-300 text-sm">Dify、Coze、LangChain、AutoGen Studio</div>
                </div>
              </div>
            </div>
            
            {/* 技术框架部分 */}
            <div className="mb-8">
              <h3 className="text-xl text-gray-100 mb-3 flex items-center">
                <span className="w-8 h-8 mr-2 flex items-center justify-center rounded-full bg-blue-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z" clipRule="evenodd" />
                  </svg>
                </span>
                技术框架
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-white/5 p-3 rounded-lg border border-white/10 hover:bg-white/10 transition-all">
                  <div className="font-medium text-blue-300">React / Next.js</div>
                  <div className="text-gray-300 text-sm">现代化前端开发</div>
                </div>
                <div className="bg-white/5 p-3 rounded-lg border border-white/10 hover:bg-white/10 transition-all">
                  <div className="font-medium text-blue-300">TensorFlow / PyTorch</div>
                  <div className="text-gray-300 text-sm">深度学习模型构建</div>
                </div>
                <div className="bg-white/5 p-3 rounded-lg border border-white/10 hover:bg-white/10 transition-all">
                  <div className="font-medium text-blue-300">TailwindCSS</div>
                  <div className="text-gray-300 text-sm">响应式UI设计</div>
                </div>
                <div className="bg-white/5 p-3 rounded-lg border border-white/10 hover:bg-white/10 transition-all">
                  <div className="font-medium text-blue-300">Git</div>
                  <div className="text-gray-300 text-sm">版本控制及协作开发</div>
                </div>
                <div className="bg-white/5 p-3 rounded-lg border border-white/10 hover:bg-white/10 transition-all">
                  <div className="font-medium text-blue-300">Flutter</div>
                  <div className="text-gray-300 text-sm">跨平台移动应用开发</div>
                </div>
                <div className="bg-white/5 p-3 rounded-lg border border-white/10 hover:bg-white/10 transition-all">
                  <div className="font-medium text-blue-300">Flask / Django</div>
                  <div className="text-gray-300 text-sm">Python Web后端开发</div>
                </div>
              </div>
            </div>
            
            {/* 产品技能部分 */}
            <div>
              <h3 className="text-xl text-gray-100 mb-3 flex items-center">
                <span className="w-8 h-8 mr-2 flex items-center justify-center rounded-full bg-amber-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                  </svg>
                </span>
                产品技能
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-white/5 p-3 rounded-lg border border-white/10 hover:bg-white/10 transition-all">
                  <div className="font-medium text-amber-300">产品分析</div>
                  <div className="text-gray-300 text-sm">SWOT、用户体验五要素、KANO模型</div>
                </div>
                <div className="bg-white/5 p-3 rounded-lg border border-white/10 hover:bg-white/10 transition-all">
                  <div className="font-medium text-amber-300">设计工具</div>
                  <div className="text-gray-300 text-sm">Axure、X-mind、Figma</div>
                </div>
                <div className="bg-white/5 p-3 rounded-lg border border-white/10 hover:bg-white/10 transition-all">
                  <div className="font-medium text-amber-300">流程设计</div>
                  <div className="text-gray-300 text-sm">Vision、产品规划与七大定律</div>
                </div>
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
              <p>🎵 音乐：热爱听各种类型的音乐，尤其是独立摇滚，比如后摇和盯鞋</p>
              <p>📚 阅读：喜欢探索不同领域的知识，最近在看看了很多遍的《万水千山走遍》</p>
              <p>🤖 AI：对人工智能技术充满好奇（其实只是喜欢让这个技术让世界变得更好样子），但是最近在研究烂大街的CV</p>
            </div>
          </motion.section>

          {/* 我的音乐作品 */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
          >
            <h2 className="text-2xl font-semibold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                来点木柜子乐队Cover?
              </span>
            </h2>
            <div className="text-gray-300 mb-4">
              <p>就是喜欢听春日影！</p>
            </div>
            <div className="aspect-video w-full overflow-hidden rounded-lg">
              <iframe 
                src="//player.bilibili.com/player.html?isOutside=true&aid=113651830818685&bvid=BV1CvB7Y4E8b&cid=27342933254&p=1" 
                scrolling="no" 
                frameBorder="no" 
                style={{border: 0}}
                allowFullScreen={true}
                className="w-full h-full"
                title="木柜子乐队Cover - 春日影"
              ></iframe>
            </div>
          </motion.section>

          {/* 未来计划部分 */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
          >
            <h2 className="text-2xl font-semibold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
                未来计划
              </span>
            </h2>
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