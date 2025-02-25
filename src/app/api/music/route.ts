import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

const BASE_URL = 'http://localhost:4000'
const PLAYLIST_ID = '7219894624'

// 定义类型
interface TrackId {
  id: number
}

interface Artist {
  name: string
}

interface Song {
  id: number
  name: string
  ar: Artist[]
  al: {
    picUrl: string
  }
  dt: number
}

interface UrlInfo {
  id: number
  url: string | null
}

// 获取音乐URL的重试函数
async function getUrlWithRetry(songId: string, retries = 3): Promise<string | null> {
  for (let i = 0; i < retries; i++) {
    try {
      const retryRes = await fetch(
        `${BASE_URL}/song/url/v1?id=${songId}&level=exhigh`,
        {
          headers: {
            'Cookie': process.env.MUSIC_COOKIE || '',
          }
        }
      )
      
      if (!retryRes.ok) {
        throw new Error(`URL API responded with status: ${retryRes.status}`)
      }

      const retryData = await retryRes.json()
      if (retryData.data[0]?.url) {
        return retryData.data[0].url
      }

      // 如果没有获取到高质量版本，尝试标准质量
      if (i === retries - 1) {
        const standardRes = await fetch(
          `${BASE_URL}/song/url/v1?id=${songId}&level=standard`,
          {
            headers: {
              'Cookie': process.env.MUSIC_COOKIE || '',
            }
          }
        )
        const standardData = await standardRes.json()
        return standardData.data[0]?.url || null
      }

      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)))
    } catch (error) {
      console.error(`Retry ${i + 1} failed for song ${songId}:`, error)
      if (i === retries - 1) return null
    }
  }
  return null
}

export async function GET(request: NextRequest) {
  try {

    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '12')
    
    // 1. 获取歌单详情
    const playlistRes = await fetch(
      `${BASE_URL}/playlist/detail?id=${PLAYLIST_ID}`,
      {
        headers: {
          'Cookie': process.env.MUSIC_COOKIE || '',
        }
      }
    )
    
    if (!playlistRes.ok) {
      throw new Error(`Playlist API responded with status: ${playlistRes.status}`)
    }
    
    const playlistData = await playlistRes.json()

    if (!playlistData.playlist || !playlistData.playlist.trackIds) {
      throw new Error('Invalid playlist data format')
    }

    // 计算分页
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const totalTracks = playlistData.playlist.trackIds.length
    const totalPages = Math.ceil(totalTracks / pageSize)

    // 获取当前页的歌曲ID
    const trackIds = playlistData.playlist.trackIds
      .slice(start, end)
      .map((track: any) => track.id)

    // 2. 获取歌曲详情和URL
    const songRes = await fetch(
      `${BASE_URL}/song/detail?ids=${trackIds.join(',')}`,
      {
        headers: {
          'Cookie': process.env.MUSIC_COOKIE || '',
        }
      }
    )

    if (!songRes.ok) {
      throw new Error(`Song API responded with status: ${songRes.status}`)
    }


    const songData = await songRes.json()

    // 3. 获取音乐URL（批量）
    const urlRes = await fetch(
      `${BASE_URL}/song/url/v1?id=${trackIds.join(',')}&level=exhigh`,
      {
        headers: {
          'Cookie': process.env.MUSIC_COOKIE || '',
        }
      }
    )

    if (!urlRes.ok) {
      throw new Error(`URL API responded with status: ${urlRes.status}`)
    }

    const urlData = await urlRes.json()

    // 4. 合并数据
    const songs = await Promise.all(songData.songs.map(async (song: Song) => {
      // 首先尝试从批量请求中获取URL
      const urlInfo = urlData.data.find((url: UrlInfo) => url.id === song.id)
      let songUrl = urlInfo?.url

      // 如果批量请求没有获取到URL，进行单独重试
      if (!songUrl) {
        songUrl = await getUrlWithRetry(song.id.toString())
      }

      return {
        id: song.id.toString(),
        name: song.name,
        artist: song.ar.map((artist: Artist) => artist.name).join(', '),
        cover: song.al.picUrl,
        url: songUrl,
        duration: song.dt / 1000, // 转换为秒
        quality: songUrl ? (songUrl.includes('m8') ? '标准音质' : '高音质') : '未知'
      }
    }))

    // 5. 过滤掉没有URL的歌曲
    const availableSongs = songs.filter(song => song.url)

    return NextResponse.json({ 
      songs: availableSongs,
      total: availableSongs.length,
      currentPage: page,
      totalPages: totalPages
    })

  } catch (error: any) {
    console.error('API Error:', error.message || error)
    return NextResponse.json(
      { 
        error: '无法获取音乐数据', 
        message: error.message || '未知错误' 
      },
      { status: 500 }
    )
  }
}