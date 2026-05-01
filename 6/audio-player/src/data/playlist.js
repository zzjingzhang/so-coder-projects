export const samplePlaylist = [
  {
    id: '1',
    title: '星空下的梦想',
    artist: '李云飞',
    album: '夜的旋律',
    duration: 245,
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=music%20album%20cover%20starry%20night%20dream%20purple%20blue%20gradient%20modern%20minimalist&image_size=square',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    id: '2',
    title: '海边的早晨',
    artist: '张雨晴',
    album: '阳光海岸',
    duration: 198,
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=music%20album%20cover%20ocean%20beach%20morning%20light%20blue%20waves%20peaceful%20serene&image_size=square',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  },
  {
    id: '3',
    title: '城市节拍',
    artist: '王俊杰',
    album: '都市节奏',
    duration: 312,
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=music%20album%20cover%20city%20night%20neon%20lights%20urban%20beat%20modern%20geometric&image_size=square',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
  },
  {
    id: '4',
    title: '森林低语',
    artist: '陈小美',
    album: '自然之声',
    duration: 276,
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=music%20album%20cover%20forest%20nature%20green%20leaves%20peaceful%20whisper%20organic%20texture&image_size=square',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
  },
  {
    id: '5',
    title: '午夜爵士',
    artist: '刘文华',
    album: '爵士时光',
    duration: 223,
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=music%20album%20cover%20jazz%20midnight%20dark%20blue%20gold%20saxophone%20elegant%20sophisticated&image_size=square',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3'
  },
  {
    id: '6',
    title: '电子风暴',
    artist: '赵小东',
    album: '未来世界',
    duration: 189,
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=music%20album%20cover%20electronic%20storm%20cyberpunk%20neon%20purple%20pink%20glitch%20effect&image_size=square',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3'
  },
  {
    id: '7',
    title: '古典情怀',
    artist: '孙思琪',
    album: '永恒经典',
    duration: 356,
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=music%20album%20cover%20classical%20music%20violin%20orchestra%20warm%20sepia%20elegant%20romantic&image_size=square',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3'
  },
  {
    id: '8',
    title: '摇滚青春',
    artist: '周大鹏',
    album: '燃烧的岁月',
    duration: 267,
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=music%20album%20cover%20rock%20music%20electric%20guitar%20fire%20red%20black%20energy%20power&image_size=square',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3'
  }
]

export const createTrack = (options) => ({
  id: Date.now().toString(),
  title: options.title || '未知歌曲',
  artist: options.artist || '未知艺术家',
  album: options.album || '',
  duration: options.duration || 180,
  cover: options.cover || '',
  src: options.src || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
})
