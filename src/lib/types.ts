// 好友数据类型
export interface Friend {
  id: string;
  name: string;
  description: string;
  twitterUsername: string;
  website?: string; // 个人网站URL，可选
  avatar: string; // 头像URL
} 