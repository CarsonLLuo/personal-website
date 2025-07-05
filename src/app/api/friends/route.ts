import { NextResponse } from 'next/server';

// 好友数据类型
export interface Friend {
  id: string;
  name: string;
  description: string;
  twitterUsername: string;
  avatar: string; // 头像URL
}

// 示例数据，实际应用中可以从数据库中获取
const friends: Friend[] = [
  {
    id: '1',
    name: 'Steven',
    description: '长得像易烊千玺的小哥哥',
    twitterUsername: 'Steven15911051',
    avatar: '/images/friends/Steven.jpg', // 使用本地默认头像
  },
  {
    id: '2',
    name: '益达今天减肥了吗',
    description: '推上的人好会玩又会说话，我超喜欢这里的！',
    twitterUsername: 'yida777777',
    avatar: '/images/friends/Yida.jpg', // 使用本地默认头像
  },
  {
    id: '3',
    name: '堂虫🐛',
    description: 'INFP/ I do theory./ lowkey stressed about everything.',
    twitterUsername: 'JACBERL',
    avatar: '/images/friends/Tang.jpg', // 使用本地默认头像
  },
  {
    id: '4',
    name: 'Clarrycy (探索中)',
    description: '喜报：如果在说话之前加上“喜报”两个字，那这段话看起来就真的像是喜报一样！',
    twitterUsername: 'Clarrycy',
    avatar: '/images/friends/Clarrycy.jpg', // 使用本地默认头像
  },
  {
    id: '5',
    name: '🪻杏明元一',
    description: '☀️💪🍎🙏爱和神谕来自阿波罗',
    twitterUsername: 'Shin_pryme25',
    avatar: '/images/friends/小明.jpg', // 使用本地默认头像
  },
  {
    id: '6',
    name: 'whywhy歪歪',
    description: '很闷骚的小哥哥',
    twitterUsername: 'yxxooxo',
    avatar: '/images/friends/YY.jpg', // 使用本地默认头像
  }
];

export async function GET() {
  // 返回静态数据
  return NextResponse.json(friends);
} 