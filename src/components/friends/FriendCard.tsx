'use client'
import { motion } from 'framer-motion'
import { FaTwitter } from 'react-icons/fa'
import { Friend } from '@/app/api/friends/route'

interface FriendCardProps {
  friend: Friend
}

export default function FriendCard({ friend }: FriendCardProps) {
  const twitterUrl = `https://twitter.com/${friend.twitterUsername}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 hover:bg-white/10 transition-all duration-300"
    >
      <div className="p-6 flex flex-col items-center">
        {/* 头像区域 */}
        <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-blue-400/30">
          <img 
            src={friend.avatar} 
            alt={`${friend.name}的头像`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        
        <h3 className="text-xl font-semibold mb-2 text-gray-200">{friend.name}</h3>
        <p className="text-gray-300 text-center mb-4 text-sm">{friend.description}</p>
        
        <a 
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-blue-500/20 hover:bg-blue-500/40 text-blue-300 py-2 px-4 rounded-full transition-colors"
        >
          <FaTwitter />
          <span>@{friend.twitterUsername}</span>
        </a>
      </div>
    </motion.div>
  )
} 