export const users = [
  {
    id: 1,
    name: '游戏达人小明',
    avatar: 'https://i.pravatar.cc/150?img=1',
    level: 50,
    followers: 12580,
    following: 890,
    bio: '🎮 热爱游戏，分享快乐 | LOL王者段位 | CS:GO资深玩家',
    tags: ['英雄联盟', 'CSGO', '王者荣耀']
  },
  {
    id: 2,
    name: '电竞女神小梦',
    avatar: 'https://i.pravatar.cc/150?img=5',
    level: 42,
    followers: 28900,
    following: 1200,
    bio: '🎯 职业电竞选手 | 虎牙签约主播 | 原神深渊满星',
    tags: ['原神', '王者荣耀', '电竞直播']
  },
  {
    id: 3,
    name: '独立游戏开发者',
    avatar: 'https://i.pravatar.cc/150?img=3',
    level: 38,
    followers: 5600,
    following: 340,
    bio: '💻 独立游戏开发者 | Unity/Unreal | 正在开发一款像素风RPG',
    tags: ['独立游戏', 'Unity', '游戏开发']
  },
  {
    id: 4,
    name: 'FPS老司机',
    avatar: 'https://i.pravatar.cc/150?img=8',
    level: 65,
    followers: 8900,
    following: 450,
    bio: '🔫 FPS游戏狂热者 | 枪法精准，意识一流',
    tags: ['CSGO', 'Valorant', '使命召唤']
  },
  {
    id: 5,
    name: '二次元收藏家',
    avatar: 'https://i.pravatar.cc/150?img=10',
    level: 55,
    followers: 15600,
    following: 780,
    bio: '✨ 二次元游戏爱好者 | 手办收藏家 | 抽卡玄学大师',
    tags: ['原神', '崩坏星穹铁道', '明日方舟']
  }
]

export const tags = [
  { id: 1, name: '英雄联盟', count: 256, color: '#3b82f6' },
  { id: 2, name: '王者荣耀', count: 342, color: '#ef4444' },
  { id: 3, name: 'CSGO', count: 189, color: '#f59e0b' },
  { id: 4, name: '原神', count: 423, color: '#10b981' },
  { id: 5, name: 'Valorant', count: 156, color: '#8b5cf6' },
  { id: 6, name: '独立游戏', count: 98, color: '#06b6d4' },
  { id: 7, name: '电竞直播', count: 167, color: '#ec4899' },
  { id: 8, name: '游戏攻略', count: 234, color: '#6366f1' },
  { id: 9, name: '游戏开发', count: 76, color: '#14b8a6' },
  { id: 10, name: '崩坏星穹铁道', count: 198, color: '#f97316' },
  { id: 11, name: '明日方舟', count: 145, color: '#0ea5e9' },
  { id: 12, name: '使命召唤', count: 123, color: '#84cc16' },
  { id: 13, name: 'Unity', count: 67, color: '#a855f7' },
  { id: 14, name: '游戏资讯', count: 312, color: '#f43f5e' },
  { id: 15, name: '游戏评测', count: 178, color: '#0284c7' }
]

export const posts = [
  {
    id: 1,
    userId: 1,
    user: users[0],
    content: '刚刚打完一把LOL，用德莱文拿了五杀！对面直接投降了哈哈哈 🎮 德莱文真的是版本之子，装备起来后简直无解。分享一下我的出装思路：先出收集者，然后无尽，第三件看情况出饮血或者水银弯刀。有什么问题可以在评论区问我！',
    images: [
      'https://picsum.photos/seed/game1/600/400',
      'https://picsum.photos/seed/game2/600/300'
    ],
    tags: ['英雄联盟', '游戏攻略'],
    likes: 256,
    comments: 45,
    shares: 12,
    createdAt: '2026-04-26T14:30:00Z',
    isLiked: false
  },
  {
    id: 2,
    userId: 2,
    user: users[1],
    content: '原神4.5版本前瞻直播来了！这次枫丹的新地图看起来超级美，还有新角色闲云，我已经准备好原石了！大家准备抽吗？另外听说要出个新的常驻玩法，叫什么「幻想真境剧诗」，看起来很有趣的样子。',
    images: [
      'https://picsum.photos/seed/genshin1/600/500'
    ],
    tags: ['原神', '游戏资讯'],
    likes: 892,
    comments: 156,
    shares: 67,
    createdAt: '2026-04-26T12:00:00Z',
    isLiked: true
  },
  {
    id: 3,
    userId: 3,
    user: users[2],
    content: '独立游戏开发日志第30天：今天完成了玩家角色的动画状态机，现在角色可以流畅地切换 idle、walk、run、jump 等状态了。下一步准备开始做敌人AI。分享一段调试截图，像素风格的小人可爱吗？ 🎨',
    images: [
      'https://picsum.photos/seed/dev1/600/450',
      'https://picsum.photos/seed/dev2/600/350'
    ],
    tags: ['独立游戏', 'Unity', '游戏开发'],
    likes: 345,
    comments: 78,
    shares: 23,
    createdAt: '2026-04-26T10:15:00Z',
    isLiked: false
  },
  {
    id: 4,
    userId: 4,
    user: users[3],
    content: 'CSGO新地图Ancient的几个实用烟雾弹点位分享！这些烟雾在残局中特别有用：\n\n1. A大烟雾 - 封死A大视野\n2. 中路连接烟 - 阻断敌人回防路线\n3. B区假打烟 - 迷惑敌人\n\n大家还有什么好的点位分享吗？',
    images: [
      'https://picsum.photos/seed/csgo1/600/400'
    ],
    tags: ['CSGO', '游戏攻略'],
    likes: 567,
    comments: 98,
    shares: 45,
    createdAt: '2026-04-25T20:45:00Z',
    isLiked: true
  },
  {
    id: 5,
    userId: 5,
    user: users[4],
    content: '崩坏星穹铁道新版本黄泉终于抽出来了！！！零命加专武，花了我180抽，非酋本酋了😭 不过黄泉的战斗动画真的太帅了，值了值了！分享一下配队思路：黄泉、加拉赫、符玄、阮梅，这个队伍循环真的流畅。',
    images: [
      'https://picsum.photos/seed/hsr1/600/600',
      'https://picsum.photos/seed/hsr2/600/400',
      'https://picsum.photos/seed/hsr3/600/300'
    ],
    tags: ['崩坏星穹铁道', '原神'],
    likes: 1234,
    comments: 234,
    shares: 89,
    createdAt: '2026-04-25T18:30:00Z',
    isLiked: false
  },
  {
    id: 6,
    userId: 1,
    user: users[0],
    content: '王者荣耀S40赛季开始了！新英雄影看起来很强，机动性拉满。我准备冲一波荣耀王者，有没有一起组队的？目前星耀2，来个会玩的辅助或者打野。另外吐槽一下新的匹配机制，感觉还是有点坑...',
    images: [],
    tags: ['王者荣耀', '电竞直播'],
    likes: 456,
    comments: 123,
    shares: 34,
    createdAt: '2026-04-25T15:20:00Z',
    isLiked: false
  },
  {
    id: 7,
    userId: 2,
    user: users[1],
    content: '今天直播的时候遇到个超级搞笑的队友，全程在念诗，把对面都给整不会了 🤣 不过最后还是赢了，因为他操作真的很厉害，就是话有点多。直播切片已经剪辑好了，晚点发出来给大家乐一乐！',
    images: [
      'https://picsum.photos/seed/stream1/600/338'
    ],
    tags: ['电竞直播', '英雄联盟'],
    likes: 678,
    comments: 89,
    shares: 56,
    createdAt: '2026-04-25T22:00:00Z',
    isLiked: true
  },
  {
    id: 8,
    userId: 3,
    user: users[2],
    content: '给独立游戏开发者推荐几个超级好用的免费资源网站：\n\n1. itch.io - 有超多免费游戏素材\n2. Kenney - 免费像素风格资源\n3. OpenGameArt - 开源游戏资源库\n4. Mixamo - 免费角色动画\n\n大家还有什么推荐的吗？',
    images: [],
    tags: ['独立游戏', '游戏开发', 'Unity'],
    likes: 890,
    comments: 156,
    shares: 234,
    createdAt: '2026-04-24T14:00:00Z',
    isLiked: false
  },
  {
    id: 9,
    userId: 4,
    user: users[3],
    content: 'Valorant新角色Clove真的是太强了！作为一个辅助位，她的技能机制太灵活了。复活队友、烟雾弹、还有个传送门，战术性拉满。我已经用她上了两个段位，推荐大家都去试试！',
    images: [
      'https://picsum.photos/seed/val1/600/400'
    ],
    tags: ['Valorant', '游戏评测'],
    likes: 345,
    comments: 67,
    shares: 23,
    createdAt: '2026-04-24T11:30:00Z',
    isLiked: true
  },
  {
    id: 10,
    userId: 5,
    user: users[4],
    content: '明日方舟新活动「不义之财」太好玩了！剧情写得真的很不错，尤其是那几个新干员的故事线。另外新干员止颂的强度也在线，精二后那个立绘真的太美了。已经把活动全通关了，有需要攻略的可以问我！',
    images: [
      'https://picsum.photos/seed/ark1/600/500',
      'https://picsum.photos/seed/ark2/600/350'
    ],
    tags: ['明日方舟', '游戏攻略'],
    likes: 567,
    comments: 89,
    shares: 45,
    createdAt: '2026-04-23T20:15:00Z',
    isLiked: false
  }
]

export const comments = {
  1: [
    {
      id: 1,
      userId: 2,
      user: users[1],
      content: '德莱文确实强！但我觉得这个版本卡莎更稳一些',
      likes: 23,
      createdAt: '2026-04-26T15:00:00Z',
      replies: [
        {
          id: 11,
          userId: 1,
          user: users[0],
          content: '卡莎也强，但德莱文玩起来更爽啊！',
          likes: 5,
          createdAt: '2026-04-26T15:10:00Z'
        }
      ]
    },
    {
      id: 2,
      userId: 4,
      user: users[3],
      content: '五杀截图呢？无图言屌',
      likes: 45,
      createdAt: '2026-04-26T15:30:00Z',
      replies: []
    }
  ],
  2: [
    {
      id: 3,
      userId: 5,
      user: users[4],
      content: '闲云必须抽！XP党狂喜',
      likes: 67,
      createdAt: '2026-04-26T12:30:00Z',
      replies: []
    },
    {
      id: 4,
      userId: 1,
      user: users[0],
      content: '原石已经准备好了，就等上线！',
      likes: 34,
      createdAt: '2026-04-26T13:00:00Z',
      replies: [
        {
          id: 41,
          userId: 3,
          user: users[2],
          content: '我也一样，存了2万多原石',
          likes: 12,
          createdAt: '2026-04-26T13:15:00Z'
        }
      ]
    }
  ],
  3: [
    {
      id: 5,
      userId: 4,
      user: users[3],
      content: '期待成品！像素风格确实很有味道',
      likes: 23,
      createdAt: '2026-04-26T11:00:00Z',
      replies: []
    }
  ],
  4: [
    {
      id: 6,
      userId: 1,
      user: users[0],
      content: '收藏了！正好缺这些点位',
      likes: 12,
      createdAt: '2026-04-25T21:30:00Z',
      replies: []
    }
  ],
  5: [
    {
      id: 7,
      userId: 2,
      user: users[1],
      content: '恭喜恭喜！我也是180抽出的',
      likes: 45,
      createdAt: '2026-04-25T19:00:00Z',
      replies: [
        {
          id: 71,
          userId: 5,
          user: users[4],
          content: '同是非酋，握个手 🤝',
          likes: 8,
          createdAt: '2026-04-25T19:15:00Z'
        }
      ]
    }
  ],
  6: [
    {
      id: 8,
      userId: 3,
      user: users[2],
      content: '带带我！我钻石守门员',
      likes: 8,
      createdAt: '2026-04-25T16:00:00Z',
      replies: []
    }
  ],
  7: [
    {
      id: 9,
      userId: 5,
      user: users[4],
      content: '坐等切片！听起来就很有意思',
      likes: 23,
      createdAt: '2026-04-25T22:30:00Z',
      replies: []
    }
  ],
  8: [
    {
      id: 10,
      userId: 1,
      user: users[0],
      content: '感谢分享！Kenney的资源确实好用',
      likes: 34,
      createdAt: '2026-04-24T15:00:00Z',
      replies: []
    }
  ]
}

export function getPostById(id) {
  return posts.find(p => p.id === parseInt(id))
}

export function getUserById(id) {
  return users.find(u => u.id === parseInt(id))
}

export function getCommentsByPostId(postId) {
  return comments[postId] || []
}

export function getPostsByTag(tagName) {
  if (!tagName) return posts
  return posts.filter(p => p.tags.includes(tagName))
}

export function getPostsByUserId(userId) {
  return posts.filter(p => p.userId === parseInt(userId))
}

export function searchPosts(keyword) {
  if (!keyword || !keyword.trim()) return posts
  
  const lowerKeyword = keyword.toLowerCase().trim()
  
  return posts.filter(post => {
    if (post.content.toLowerCase().includes(lowerKeyword)) return true
    if (post.tags.some(tag => tag.toLowerCase().includes(lowerKeyword))) return true
    if (post.user.name.toLowerCase().includes(lowerKeyword)) return true
    if (post.user.bio && post.user.bio.toLowerCase().includes(lowerKeyword)) return true
    return false
  })
}

export function searchUsers(keyword) {
  if (!keyword || !keyword.trim()) return users
  
  const lowerKeyword = keyword.toLowerCase().trim()
  
  return users.filter(user => {
    if (user.name.toLowerCase().includes(lowerKeyword)) return true
    if (user.bio && user.bio.toLowerCase().includes(lowerKeyword)) return true
    if (user.tags.some(tag => tag.toLowerCase().includes(lowerKeyword))) return true
    return false
  })
}

export function searchTags(keyword) {
  if (!keyword || !keyword.trim()) return tags
  
  const lowerKeyword = keyword.toLowerCase().trim()
  
  return tags.filter(tag => 
    tag.name.toLowerCase().includes(lowerKeyword)
  )
}
