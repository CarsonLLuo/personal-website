'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import { FaDownload, FaMoon, FaSun } from 'react-icons/fa'
import { useState, useEffect } from 'react'

export default function Academic() {
  const [darkMode, setDarkMode] = useState(false)
  
  useEffect(() => {
    // 检查本地存储中的主题设置
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])
  
  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }
    setDarkMode(!darkMode)
  }

  return (
    <>
      <Navbar />
      
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'} transition-colors duration-300 font-['Times_New_Roman',serif]`}>
        {/* Theme toggle button */}
        <div className="fixed top-20 right-6 z-50">
          <button 
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'} transition-colors duration-300`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
          </button>
        </div>
      
        {/* Header section */}
        <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'} border-b transition-colors duration-300`}>
          <div className="max-w-4xl mx-auto py-16 px-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Profile image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className={`w-40 h-40 rounded-full overflow-hidden border-4 ${darkMode ? 'border-gray-700' : 'border-white'} shadow-lg transition-colors duration-300`}
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
                <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>Carson Luo</h1>
                <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} mt-2 transition-colors duration-300`}>BSc (Hons) Software Engineering</p>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1 transition-colors duration-300`}>Oxford Brookes University & Chengdu University of Technology</p>
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
                <p className={`mt-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>
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
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white border-gray-700' : 'text-gray-900 border-gray-200'} mb-4 pb-2 border-b transition-colors duration-300`}>About Me</h2>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed transition-colors duration-300`}>
              My academic interests are centered on applying artificial intelligence to critical challenges in biomedical science. I am particularly drawn to developing multimodal systems for medical image recognition (as part of the broader AI for Science initiative) and ensuring these systems are transparent through Explainable AI (XAI).
            </p>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed transition-colors duration-300 mt-4`}>
              This passion for building robust AI has recently guided me toward the frontier of Large Language Models. I am currently honing my practical skills in this area through a Python development internship in Shenzhen, where my work involves architecting and implementing applications using Retrieval-Augmented Generation (RAG) and LLMs. I am excited to bridge this hands-on experience with my goal of building autonomous agents for future scientific discovery in medicine.
            </p>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed transition-colors duration-300 mt-4`}>
              When I'm not coding, you can find me immersed in the world of post-rock and shoegaze music, or keeping up with the latest Formula 1 race.
            </p>
          </motion.section>

          {/* Education section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white border-gray-700' : 'text-gray-900 border-gray-200'} mb-4 pb-2 border-b transition-colors duration-300`}>Education</h2>
            
            <div className="space-y-6">
              <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} p-6 rounded-lg border transition-colors duration-300`}>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div>
                    <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>BSc (Hons) Software Engineering</h3>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>Oxford Brookes University & Chengdu University of Technology</p>
                  </div>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} font-medium md:text-right mt-2 md:mt-0 transition-colors duration-300`}>2021 - 2025</p>
                </div>
                <div className="mt-4">
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} font-medium transition-colors duration-300`}>Overall Grade: 72.125/100 - First Class Honours (1:1)</p>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mt-2 transition-colors duration-300`}>Key Courses:</p>
                  <ul className={`list-disc list-inside ${darkMode ? 'text-gray-300' : 'text-gray-600'} mt-1 space-y-1 transition-colors duration-300`}>
                    <li>The Human Computer Interaction (71)</li>
                    <li>Machine Learning (75)</li>
                    <li>Mathematics for Computing (81)</li>
                    <li>DevOps (74)</li>
                    <li>Basic Communications and PC Networking (76)</li>
                  </ul>
                </div>
              </div>

              <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} p-6 rounded-lg border opacity-75 transition-colors duration-300`}>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div>
                    <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>Graduate Studies</h3>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>Overseas Study</p>
                  </div>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} font-medium md:text-right mt-2 md:mt-0 transition-colors duration-300`}>2026</p>
                </div>
                <div className="mt-4">
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} italic transition-colors duration-300`}>
                    Planning to continue advanced studies and explore more possibilities...
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Projects section - New Design */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-12"
          >
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white border-gray-700' : 'text-gray-900 border-gray-200'} mb-4 pb-2 border-b transition-colors duration-300`}>Projects</h2>
            
            <div className="space-y-6">
              {/* Project Card */}
              <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl overflow-hidden border shadow-sm transition-colors duration-300`}>
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Project Description - Now on the left */}
                  <div className="p-6">
                    <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3 transition-colors duration-300`}>
                      Multimodal Framework for Predictive Modeling of Chest Diseases
                    </h3>
                    
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-4 transition-colors duration-300 text-sm`}>
                      An innovative framework that enhances medical diagnostic accuracy by fusing four distinct patient data types, significantly outperforming traditional X-ray-only models.
                    </p>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className={`font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'} transition-colors duration-300`}>
                          Key Features
                        </h4>
                        <ul className="space-y-2 mt-2">
                          <li className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm transition-colors duration-300`}>
                            <span className="font-medium">Multimodal Fusion:</span> Integrates images, text notes, time series, and chart data.
                          </li>
                          <li className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm transition-colors duration-300`}>
                            <span className="font-medium">Ensemble Learning:</span> Employs 7 classifiers (XGBoost, etc.) with a weighted bagging strategy to boost predictive power.
                          </li>
                        </ul>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex flex-wrap gap-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${darkMode ? 'bg-gray-700 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>Python</span>
                          <span className={`px-2 py-1 text-xs rounded-full ${darkMode ? 'bg-gray-700 text-green-300' : 'bg-green-100 text-green-800'}`}>TensorFlow</span>
                          <span className={`px-2 py-1 text-xs rounded-full ${darkMode ? 'bg-gray-700 text-amber-300' : 'bg-amber-100 text-amber-800'}`}>BioBERT</span>
                          <span className={`px-2 py-1 text-xs rounded-full ${darkMode ? 'bg-gray-700 text-purple-300' : 'bg-purple-100 text-purple-800'}`}>XGBoost</span>
                          <span className={`px-2 py-1 text-xs rounded-full ${darkMode ? 'bg-gray-700 text-pink-300' : 'bg-pink-100 text-pink-800'}`}>Ensemble Methods</span>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <h4 className={`font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'} transition-colors duration-300`}>
                          Impact & Results
                        </h4>
                        <ul className="space-y-1 mt-2">
                          <li className="flex items-start">
                            <span className={`inline-block w-2 h-2 mt-1.5 mr-2 rounded-full ${darkMode ? 'bg-green-400' : 'bg-green-500'}`}></span>
                            <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} text-sm`}>
                              3%–20% AUC improvement for 11 chest diseases
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className={`inline-block w-2 h-2 mt-1.5 mr-2 rounded-full ${darkMode ? 'bg-green-400' : 'bg-green-500'}`}></span>
                            <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} text-sm`}>
                              Predicts 48-hour mortality (AUC 86.7%) and hospital stay duration (AUC 89.6%)
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  {/* Project Image - Now on the right */}
                  <div className="md:min-h-[400px] flex items-center justify-center p-4 bg-opacity-80">
                    <img 
                      src="/images/projects/multimodal-framework.jpg" 
                      alt="Multimodal Framework Project" 
                      className="w-full h-auto object-contain max-h-[380px]"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/800x600?text=Multimodal+Framework';
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Skills section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-12"
          >
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white border-gray-700' : 'text-gray-900 border-gray-200'} mb-4 pb-2 border-b transition-colors duration-300`}>Technical Skills</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Programming Languages */}
              <div>
                <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3 transition-colors duration-300`}>Programming Languages</h3>
                <div className="space-y-3">
                  <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} p-4 rounded-lg border h-[100px] flex flex-col justify-center transition-colors duration-300`}>
                    <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>Python</div>
                    <div className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm transition-colors duration-300`}>Data science stack (Pandas, NumPy, Matplotlib) and DL frameworks</div>
                  </div>
                  <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} p-4 rounded-lg border h-[100px] flex flex-col justify-center transition-colors duration-300`}>
                    <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>JavaScript / TypeScript</div>
                    <div className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm transition-colors duration-300`}>React ecosystem</div>
                  </div>
                  <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} p-4 rounded-lg border h-[100px] flex flex-col justify-center transition-colors duration-300`}>
                    <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>Java</div>
                    <div className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm transition-colors duration-300`}>Basic syntax and object-oriented programming</div>
                  </div>
                </div>
              </div>

              {/* Frameworks & Tools */}
              <div>
                <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3 transition-colors duration-300`}>Frameworks & Tools</h3>
                <div className="space-y-3">
                  <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} p-4 rounded-lg border h-[100px] flex flex-col justify-center transition-colors duration-300`}>
                    <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>React / Next.js</div>
                    <div className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm transition-colors duration-300`}>Modern frontend development</div>
                  </div>
                  <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} p-4 rounded-lg border h-[100px] flex flex-col justify-center transition-colors duration-300`}>
                    <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>TensorFlow / PyTorch</div>
                    <div className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm transition-colors duration-300`}>Deep learning model building</div>
                  </div>
                  <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} p-4 rounded-lg border h-[100px] flex flex-col justify-center transition-colors duration-300`}>
                    <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>Git & DevOps</div>
                    <div className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm transition-colors duration-300`}>Version control and collaborative development</div>
                  </div>
                </div>
              </div>

              {/* AI Skills */}
              <div className="md:col-span-2">
                <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3 transition-colors duration-300`}>AI Expertise</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} p-4 rounded-lg border h-[100px] flex flex-col justify-center transition-colors duration-300`}>
                    <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>Machine Learning Algorithms</div>
                    <div className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm transition-colors duration-300`}>Linear regression, SVM, XGBoost, etc.</div>
                  </div>
                  <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} p-4 rounded-lg border h-[100px] flex flex-col justify-center transition-colors duration-300`}>
                    <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>Deep Learning Models</div>
                    <div className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm transition-colors duration-300`}>CNN, RNN, GNN, Transformer architectures</div>
                  </div>
                  <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} p-4 rounded-lg border h-[100px] flex flex-col justify-center transition-colors duration-300`}>
                    <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>Feature Engineering & Explainability</div>
                    <div className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm transition-colors duration-300`}>EDA, LDA, LASSO, PCA, SHAP, Grad-CAM, LIME</div>
                  </div>
                  <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} p-4 rounded-lg border h-[100px] flex flex-col justify-center transition-colors duration-300`}>
                    <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>Prompt Engineering</div>
                    <div className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm transition-colors duration-300`}>Zero-shot, Few-shot, Chain of Thought techniques</div>
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
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white border-gray-700' : 'text-gray-900 border-gray-200'} mb-4 pb-2 border-b transition-colors duration-300`}>Research Interests</h2>
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} p-6 rounded-lg border transition-colors duration-300`}>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}><strong>Artificial Intelligence</strong>: Applying deep learning to critical challenges in biomedical science, with a focus on medical image recognition and multimodal data fusion (AI for Science).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}><strong>Machine Learning</strong>: Developing interpretable and explainable ML models (XAI) to ensure transparency and trust in clinical decision-making systems.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}><strong>Large Language Models</strong>: Building and fine-tuning LLMs and autonomous AI Agents for scientific discovery and automation in the medical domain.</span>
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
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white border-gray-700' : 'text-gray-900 border-gray-200'} mb-4 pb-2 border-b transition-colors duration-300`}>Future Plans</h2>
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} p-6 rounded-lg border transition-colors duration-300`}>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed transition-colors duration-300`}>
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
        <footer className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'} border-t py-8 transition-colors duration-300`}>
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="flex justify-center space-x-6 mb-4">
              <a href="https://github.com/CarsonLLuo" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-800'} transition-colors duration-300`}>
                GitHub
              </a>
              <a href="https://twitter.com/carsonluo2003" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-800'} transition-colors duration-300`}>
                Twitter
              </a>
              <a href="mailto:carsonluo2233@outlook.com" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-800'} transition-colors duration-300`}>
                Email
              </a>
            </div>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm transition-colors duration-300`}>
              © {new Date().getFullYear()} Carson Luo. All rights reserved.
            </p>
            <div className="mt-2">
              <Link href="/" className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} text-sm transition-colors duration-300`}>
                Back to Chinese Version
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
} 