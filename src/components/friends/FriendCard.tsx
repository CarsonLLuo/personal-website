'use client'
import { motion } from 'framer-motion'
import { FaTwitter, FaGlobe } from 'react-icons/fa'
import { type Friend } from '@/lib/types'

interface FriendCardProps {
  friend: Friend
}

export default function FriendCard({ friend }: FriendCardProps) {
  // 根据是否有个人网站来决定使用哪个链接
  const isWebsite = !!friend.website
  const linkUrl = friend.website || `https://twitter.com/${friend.twitterUsername}`
  
  // 提取网站域名，去除http(s)://和路径
  const getDisplayUrl = (url: string) => {
    try {
      const urlObj = new URL(url)
      return urlObj.hostname + (urlObj.pathname !== '/' ? urlObj.pathname : '')
    } catch (e) {
      return url
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 hover:bg-white/10 transition-all duration-300 flex flex-col h-full"
    >
      <div className="p-6 flex flex-col items-center flex-grow">
        {/* 头像区域 */}
        <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-blue-400/30">
          <img 
            src={friend.avatar} 
            alt={`${friend.name}的头像`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        
        <h3 className="text-xl font-semibold mb-2 text-gray-200">{friend.name}</h3>
        <p className="text-gray-300 text-center mb-4 text-sm h-12 overflow-y-auto flex items-center">{friend.description}</p>
        
        <div className="mt-auto pt-2">
          <a 
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 ${isWebsite ? 'bg-green-500/20 hover:bg-green-500/40 text-green-300' : 'bg-blue-500/20 hover:bg-blue-500/40 text-blue-300'} py-2 px-4 rounded-full transition-colors`}
          >
            {isWebsite ? (
              <>
                <FaGlobe />
                <span>{friend.website && getDisplayUrl(friend.website)}</span>
              </>
            ) : (
              <>
                <FaTwitter />
                <span>@{friend.twitterUsername}</span>
              </>
            )}
          </a>
        </div>
      </div>
    </motion.div>
  )
} 