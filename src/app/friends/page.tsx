'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import FriendCard from '@/components/friends/FriendCard'
import { type Friend } from '@/lib/types'
import friendsData from '@/content/friends.json'

export default function FriendsPage() {
  const [friends, setFriends] = useState<Friend[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // 在静态导出模式下直接使用静态数据
    try {
      setFriends(friendsData);
      setIsLoading(false);
    } catch (err) {
      console.error('获取友链数据出错:', err)
      setError('无法加载友链数据，请稍后再试')
      setIsLoading(false)
    }
  }, [])

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

      <main className="relative z-10 min-h-screen p-8 max-w-6xl mx-auto">
        {/* 页面标题 */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12 pt-20"
        >
          <span className="bg-gradient-to-r from-blue-400 to-orange-500 text-transparent bg-clip-text">
            友情链接
          </span>
        </motion.h1>

        {/* 友链介绍 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center text-gray-300 mb-12 max-w-2xl mx-auto"
        >
          这里是我的好友们，他们都是有趣且充满才华的人。点击链接可以前往他们的Twitter主页。
        </motion.p>

        {/* 友链展示区域 */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-400 p-8 bg-black/20 rounded-lg max-w-md mx-auto">
            <p>{error}</p>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {friends.map(friend => (
              <FriendCard key={friend.id} friend={friend} />
            ))}
          </motion.div>
        )}
      </main>
    </>
  )
} 