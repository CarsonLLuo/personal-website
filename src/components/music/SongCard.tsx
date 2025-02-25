import { motion } from 'framer-motion'
import { FaPlay, FaPause } from 'react-icons/fa'

interface SongCardProps {
  song: {
    id: string
    name: string
    artist: string
    cover: string
  }
  isPlaying: boolean
  isCurrentSong: boolean
  onPlay: () => void
}

export default function SongCard({ song, isPlaying, isCurrentSong, onPlay }: SongCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.2 }}
      className="group relative bg-black/20 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10"
    >
      <div className="relative aspect-square">
        <img 
          src={song.cover} 
          alt={song.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            onClick={onPlay}
            className="p-4 rounded-full bg-blue-500/80 hover:bg-blue-600/80 transition-colors transform hover:scale-110"
          >
            {isCurrentSong && isPlaying ? (
              <FaPause className="text-2xl text-white" />
            ) : (
              <FaPlay className="text-2xl text-white" />
            )}
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-white truncate">{song.name}</h3>
        <p className="text-sm text-gray-300 truncate">{song.artist}</p>
      </div>
      {isCurrentSong && (
        <div className="absolute top-2 right-2 w-2 h-2">
          <span className={`absolute w-full h-full rounded-full ${isPlaying ? 'bg-blue-500 animate-ping' : 'bg-blue-500'}`}></span>
          <span className={`absolute w-full h-full rounded-full ${isPlaying ? 'bg-blue-500' : 'bg-blue-500'}`}></span>
        </div>
      )}
    </motion.div>
  )
}