'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import { FaDownload } from 'react-icons/fa'

export default function Academic() {
  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-white text-gray-800">
        {/* Header section */}
        <header className="bg-gray-100 border-b border-gray-200">
          <div className="max-w-4xl mx-auto py-16 px-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Profile image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg"
              >
                <img 
                  src="/images/avatar.jpg" 
                  alt="Carson Luo" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              {/* Name and title */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center md:text-left"
              >
                <h1 className="text-4xl font-bold text-gray-900">Carson Luo</h1>
                <p className="text-xl text-gray-600 mt-2">BSc (Hons) Software Engineering</p>
                <p className="text-gray-500 mt-1">Oxford Brookes University & Chengdu University of Technology</p>
                <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">AI Research</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Software Engineering</span>
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">Machine Learning</span>
                </div>
                
                {/* CV Download Button */}
                <div className="mt-6">
                  <a 
                    href="/documents/XinyuLuo_CV.pdf" 
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <FaDownload className="mr-2" />
                    Download CV
                  </a>
                </div>
                <p className="mt-4 text-gray-600">
                  <strong>Email:</strong> carsonluo2233@outlook.com
                </p>
              </motion.div>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto py-12 px-6">
          {/* About section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">About Me</h2>
            <p className="text-gray-700 leading-relaxed">
              Hello, I'm Carson. I'm currently on a gap year after completing my undergraduate studies in Software Engineering.
              My academic interests focus on artificial intelligence, machine learning, and their applications in solving real-world problems.
              I'm passionate about technology that makes the world a better place and enjoy exploring the intersection of AI and human creativity.
              In my free time, I listen to rock music, particularly post-rock and shoegaze, and enjoy following Formula 1 racing.
              Currently based in Chengdu, China.
            </p>
            <div className="mt-4 text-center">
              <p className="text-gray-600 italic font-serif">
                "Cogito, ergo sum."
              </p>
              <p className="text-gray-500 text-sm mt-1">
                I think, therefore I am
              </p>
            </div>
          </motion.section>

          {/* Education section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">Education</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">BSc (Hons) Software Engineering</h3>
                    <p className="text-gray-600">Oxford Brookes University & Chengdu University of Technology</p>
                  </div>
                  <p className="text-gray-500 font-medium md:text-right mt-2 md:mt-0">2021 - 2025</p>
                </div>
                <div className="mt-4">
                  <p className="text-gray-700 font-medium">Overall Grade: 72.125/100 - First Class Honours (1:1)</p>
                  <p className="text-gray-700 mt-2">Key Courses:</p>
                  <ul className="list-disc list-inside text-gray-600 mt-1 space-y-1">
                    <li>The Human Computer Interaction (71)</li>
                    <li>Machine Learning (75)</li>
                    <li>Mathematics for Computing (81)</li>
                    <li>DevOps (74)</li>
                    <li>Basic Communications and PC Networking (76)</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 opacity-75">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Graduate Studies</h3>
                    <p className="text-gray-600">Overseas Study</p>
                  </div>
                  <p className="text-gray-500 font-medium md:text-right mt-2 md:mt-0">2026</p>
                </div>
                <div className="mt-4">
                  <p className="text-gray-700 italic">
                    Planning to continue advanced studies and explore more possibilities...
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Skills section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">Technical Skills</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Programming Languages */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Programming Languages</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="font-medium text-gray-900">Python</div>
                    <div className="text-gray-600 text-sm">Data science stack (Pandas, NumPy, Matplotlib) and DL frameworks</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="font-medium text-gray-900">JavaScript / TypeScript</div>
                    <div className="text-gray-600 text-sm">React ecosystem</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="font-medium text-gray-900">Java</div>
                    <div className="text-gray-600 text-sm">Basic syntax and object-oriented programming</div>
                  </div>
                </div>
              </div>

              {/* Frameworks & Tools */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Frameworks & Tools</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="font-medium text-gray-900">React / Next.js</div>
                    <div className="text-gray-600 text-sm">Modern frontend development</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="font-medium text-gray-900">TensorFlow / PyTorch</div>
                    <div className="text-gray-600 text-sm">Deep learning model building</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="font-medium text-gray-900">Git & DevOps</div>
                    <div className="text-gray-600 text-sm">Version control and collaborative development</div>
                  </div>
                </div>
              </div>

              {/* AI Skills */}
              <div className="md:col-span-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">AI Expertise</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="font-medium text-gray-900">Machine Learning Algorithms</div>
                    <div className="text-gray-600 text-sm">Linear regression, SVM, XGBoost, etc.</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="font-medium text-gray-900">Deep Learning Models</div>
                    <div className="text-gray-600 text-sm">CNN, RNN, GNN, Transformer architectures</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="font-medium text-gray-900">Feature Engineering & Explainability</div>
                    <div className="text-gray-600 text-sm">EDA, LDA, LASSO, PCA, SHAP, Grad-CAM, LIME</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="font-medium text-gray-900">Prompt Engineering</div>
                    <div className="text-gray-600 text-sm">Zero-shot, Few-shot, Chain of Thought techniques</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Research Interests */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">Research Interests</h2>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span className="text-gray-700"><strong>Artificial Intelligence</strong>: Exploring applications of AI in solving real-world problems</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span className="text-gray-700"><strong>Machine Learning</strong>: Developing interpretable and explainable ML models</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span className="text-gray-700"><strong>Human-Computer Interaction</strong>: Designing intuitive interfaces for complex AI systems</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span className="text-gray-700"><strong>AI Ethics</strong>: Investigating the ethical implications of AI deployment in society</span>
                </li>
              </ul>
            </div>
          </motion.section>

          {/* Future Plans */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">Future Plans</h2>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <p className="text-gray-700 leading-relaxed">
                I'm planning to take a gap year after graduation to focus on personal skill development
                and explore various opportunities. My goal is to find my direction in the AI field and
                contribute to technological advancement that makes a positive impact on society.
                I'm particularly interested in pursuing graduate studies to deepen my knowledge and
                research capabilities in artificial intelligence and machine learning.
              </p>
            </div>
          </motion.section>
        </main>

        {/* Footer */}
        <footer className="bg-gray-100 border-t border-gray-200 py-8">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="flex justify-center space-x-6 mb-4">
              <a href="https://github.com/CarsonLLuo" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-800">
                GitHub
              </a>
              <a href="https://twitter.com/carsonluo2003" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-800">
                Twitter
              </a>
              <a href="mailto:carsonluo2233@outlook.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-800">
                Email
              </a>
            </div>
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Carson Luo. All rights reserved.
            </p>
            <div className="mt-2">
              <Link href="/" className="text-blue-600 hover:text-blue-800 text-sm">
                Back to Chinese Version
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
} 