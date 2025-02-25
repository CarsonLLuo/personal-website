'use client'
import { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import { motion } from 'framer-motion'
import { SiNeteasecloudmusic } from 'react-icons/si'
import SongCard from '@/components/music/SongCard'
import MusicPlayer from '@/components/music/MusicPlayer'



interface Song {
  id: string
  name: string
  artist: string
  cover: string
  url?: string
  fullUrl?: string
}

interface PaginationResponse {
  songs: Song[]
  total: number
  currentPage: number
  totalPages: number
}

export default function MusicPage() {
  const [songs, setSongs] = useState<Song[]>([])
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // 添加分页相关状态
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const pageSize = 12 // 每页显示的歌曲数量
  const [showFixedPlayer, setShowFixedPlayer] = useState(false)

  // 添加滚动监听


  // 获取歌曲列表
  const fetchSongs = async (page: number) => {
    try {
      setIsLoadingMore(true)
      const response = await fetch(`/api/music?page=${page}&pageSize=${pageSize}`)
      if (!response.ok) {
        throw new Error('Failed to fetch songs')
      }
      const data: PaginationResponse = await response.json()

      if (page === 1) {
        setSongs(data.songs)
      } else {
        setSongs(prev => [...prev, ...data.songs])
      }
      
      setTotalPages(data.totalPages)
      setCurrentPage(data.currentPage)
    } catch (err) {
      console.error('Error fetching songs:', err)
      setError('无法加载音乐列表，请稍后再试')
    } finally {
      setIsLoading(false)
      setIsLoadingMore(false)
    }
  }
  useEffect(() => {
    setIsLoading(true)
    setError(null)
    fetchSongs(1)
  }, [])

  
  
  // 加载更多
  const loadMore = () => {
    if (currentPage < totalPages && !isLoadingMore) {
      fetchSongs(currentPage + 1)
    }
  }

  // 处理播放/暂停
  const handlePlaySong = (song: Song) => {
    if (currentSong?.id === song.id) {
      setIsPlaying(!isPlaying)
    } else {
      setCurrentSong(song)
      setIsPlaying(true)
    }
  }

  // 处理播放结束
  const handleSongEnd = () => {
    const currentIndex = songs.findIndex(song => song.id === currentSong?.id)
    if (currentIndex < songs.length - 1) {
      // 播放下一首
      setCurrentSong(songs[currentIndex + 1])
    } else {
      // 播放列表结束
      setIsPlaying(false)
      setCurrentSong(null)
    }
  }

  return (
    <>
      <Navbar />
      {/* 背景图层 */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/monet-sunrise.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 1,
        }}
      />

      {/* 添加固定底部播放器 */}
    
      
      {/* 渐变遮罩 */}
      <div 
        className="fixed inset-0 z-0 bg-gradient-to-b from-black/30 to-black/70"
      />

      {/* 页面内容 */}
      <div className="relative z-10 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 pt-20 pb-12">
          {/* 顶部介绍 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4 text-white">Carson最近在听的歌</h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              听点？都是在日推中感觉不错的歌，主要是钉鞋，后摇啥的。
            </p>
          </motion.div>

          {/* 音乐播放器 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div id="main-player">
      <MusicPlayer
        song={currentSong}
        isPlaying={isPlaying}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onEnded={handleSongEnd}
      />
    </div>
          </motion.div>

          {/* 歌曲网格 */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12"
          >
            {isLoading ? (
              <div className="col-span-full flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="col-span-full text-center py-12">
                <p className="text-red-400">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-blue-500/80 rounded-lg hover:bg-blue-600/80 transition-colors"
                >
                  重试
                </button>
              </div>
            ) : (
              songs.map((song) => (
                <SongCard
                  key={song.id}
                  song={song}
                  isPlaying={isPlaying}
                  isCurrentSong={currentSong?.id === song.id}
                  onPlay={() => handlePlaySong(song)}
                />
              ))
            )}

            
          {/* 加载更多按钮 */}
          {currentPage < totalPages && (
                  <div className="col-span-full flex justify-center mt-8">
                    <button
                      onClick={loadMore}
                      disabled={isLoadingMore}
                      className="px-6 py-2 bg-blue-500/80 rounded-lg hover:bg-blue-600/80 transition-colors disabled:opacity-50"
                    >
                      {isLoadingMore ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-t-2 border-white rounded-full animate-spin" />
                          加载中...
                        </div>
                      ) : (
                        '加载更多'
                      )}
                    </button>
                  </div>
                )}
              
          </motion.div>

          {/* 底部音乐理念 */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto mt-16 text-center"
          >
            <h3 className="text-2xl font-bold mb-4 text-white">我的音乐理念</h3>
            <p className="text-gray-300 mb-6">
              音乐不仅仅是声音的组合，更是情感的载体。
              每一个音符都讲述着一个故事，而这些故事构成了生活中最美好的片段。
            </p>
            <a 
              href="https://music.163.com/m/playlist?id=7219894624"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <SiNeteasecloudmusic className="text-xl" />
              <span>在网易云音乐中查看完整歌单</span>
            </a>
          </motion.div>
        </div>
      </div>
    </>
  )
}