'use client'
import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa'

interface MusicPlayerProps {
  song: {
    id: string
    name: string
    artist: string
    cover: string
    url?: string
  } | null
  isPlaying: boolean
  onPlayPause: () => void
  onEnded: () => void
  className?: string 
}

export default function MusicPlayer({ song, isPlaying, onPlayPause }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.5)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    if (song?.url) {
      if (audioRef.current) {
        audioRef.current.src = song.url
        if (isPlaying) {
          audioRef.current.play()
        }
      }
    }
  }, [song])

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying])

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime)
      setDuration(audioRef.current.duration)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value)
    setProgress(time)
    if (audioRef.current) {
      audioRef.current.currentTime = time
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    setVolume(value)
    if (audioRef.current) {
      audioRef.current.volume = value
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-black/20 backdrop-blur-sm rounded-xl p-8 border border-white/10">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => onPlayPause()}
      />
      
      {song ? (
        <div className="flex items-center gap-8">
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={song.cover}
            alt={song.name}
            className="w-48 h-48 rounded-lg shadow-xl"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2 text-white">{song.name}</h2>
            <p className="text-gray-300 mb-4">{song.artist}</p>
            
            <div className="space-y-4">
              {/* 播放控制 */}
              <div className="flex items-center gap-4">
                <button
                  onClick={onPlayPause}
                  className="p-3 bg-blue-500/80 rounded-full hover:bg-blue-600/80 transition-colors"
                >
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                
                {/* 进度条 */}
                <div className="flex-1 flex items-center gap-2">
                  <span className="text-sm text-gray-400">{formatTime(progress)}</span>
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    value={progress}
                    onChange={handleSeek}
                    className="flex-1 h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
                  />
                  <span className="text-sm text-gray-400">{formatTime(duration)}</span>
                </div>
              </div>

              {/* 音量控制 */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="text-gray-400 hover:text-white"
                >
                  {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-24 h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400">选择一首歌曲开始播放</p>
        </div>
      )}
    </div>
  )
}