// 音乐会活动数据
export interface ConcertEvent {
  id: string
  title: string
  artist: string
  date: Date
  time: string
  venue: string
  address: string
  image: string
  description: string
  priceRanges: PriceRange[]
  totalSeats: number
  availableSeats: number
}

// 价格区间
export interface PriceRange {
  id: string
  name: string
  price: number
  color: string
  count: number
  available: number
}

// 座位类型
export interface Seat {
  id: string
  row: string
  number: number
  priceRangeId: string
  status: 'available' | 'sold' | 'selected'
}

// 票务选项
export interface TicketOption {
  id: string
  name: string
  description: string
  price: number
  priceRangeId: string
  features: string[]
  isDefault: boolean
}

// 模拟音乐会数据
export const mockEvents: ConcertEvent[] = [
  {
    id: '1',
    title: '2026 周杰伦「嘉年华」世界巡回演唱会',
    artist: '周杰伦',
    date: new Date(2026, 5, 15), // 2026-06-15
    time: '19:30',
    venue: '北京工人体育场',
    address: '北京市朝阳区工人体育场北路',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=concert%20stage%20with%20bright%20lights%20and%20crowd%20celebrating%20music%20event%20night%20scene&image_size=landscape_16_9',
    description: '周杰伦2026年最新巡回演唱会「嘉年华」即将登陆北京！这是一场跨越时代的音乐盛宴，汇集了周杰伦出道以来的经典金曲，以及最新专辑中的热门歌曲。现场将采用最先进的舞台技术和音响设备，为观众带来前所未有的视听体验。',
    priceRanges: [
      { id: 'vip', name: 'VIP 区', price: 2880, color: '#f59e0b', count: 200, available: 45 },
      { id: 'premium', name: '内场 A 区', price: 1880, color: '#6366f1', count: 500, available: 120 },
      { id: 'b', name: '内场 B 区', price: 1280, color: '#10b981', count: 800, available: 350 },
      { id: 'c', name: '看台 C 区', price: 880, color: '#3b82f6', count: 1200, available: 800 },
      { id: 'd', name: '看台 D 区', price: 580, color: '#94a3b8', count: 1500, available: 1200 },
    ],
    totalSeats: 4200,
    availableSeats: 2515,
  },
  {
    id: '2',
    title: '林俊杰 JJ20 世界巡回演唱会',
    artist: '林俊杰',
    date: new Date(2026, 5, 20), // 2026-06-20
    time: '20:00',
    venue: '上海梅赛德斯奔驰文化中心',
    address: '上海市浦东新区世博大道1200号',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20concert%20hall%20interior%20with%20amazing%20lighting%20effects%20music%20performance&image_size=landscape_16_9',
    description: '林俊杰JJ20世界巡回演唱会，纪念出道20周年特别企划！这场演唱会将回顾林俊杰20年来的音乐历程，从《江南》到《不为谁而作的歌》，每一首都是青春的回忆。全新的舞台设计，360度环绕音响，让你沉浸在JJ的音乐世界中。',
    priceRanges: [
      { id: 'vip', name: 'VIP 内场', price: 2580, color: '#f59e0b', count: 300, available: 80 },
      { id: 'a', name: '内场 A 区', price: 1680, color: '#6366f1', count: 600, available: 200 },
      { id: 'b', name: '看台 B 区', price: 1080, color: '#10b981', count: 1000, available: 600 },
      { id: 'c', name: '看台 C 区', price: 680, color: '#94a3b8', count: 1500, available: 1100 },
    ],
    totalSeats: 3400,
    availableSeats: 1980,
  },
  {
    id: '3',
    title: '五月天 [人生无限公司] 巡回演唱会',
    artist: '五月天',
    date: new Date(2026, 6, 1), // 2026-07-01
    time: '19:00',
    venue: '广州天河体育中心',
    address: '广州市天河区天河路299号',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=rock%20concert%20outdoor%20stadium%20with%20fans%20waving%20light%20sticks%20exciting%20atmosphere&image_size=landscape_16_9',
    description: '五月天「人生无限公司」巡回演唱会再度来袭！这场被称为「人生无限公司」的演唱会，将五月天的音乐与人生哲学完美结合。从《倔强》到《突然好想你》，从《温柔》到《后来的我们》，每一首歌都将引发全场大合唱。',
    priceRanges: [
      { id: 'vip', name: '摇滚区 VIP', price: 2280, color: '#f59e0b', count: 400, available: 150 },
      { id: 'a', name: '内场 A 区', price: 1580, color: '#6366f1', count: 800, available: 350 },
      { id: 'b', name: '看台 B 区', price: 980, color: '#10b981', count: 1200, available: 800 },
      { id: 'c', name: '看台 C 区', price: 580, color: '#94a3b8', count: 1800, available: 1500 },
    ],
    totalSeats: 4200,
    availableSeats: 2800,
  },
  {
    id: '4',
    title: '邓紫棋 I AM GLORIA 世界巡回演唱会',
    artist: '邓紫棋',
    date: new Date(2026, 6, 10), // 2026-07-10
    time: '19:30',
    venue: '深圳湾体育中心',
    address: '深圳市南山区滨海大道3001号',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=female%20singer%20concert%20powerful%20performance%20dramatic%20stage%20lighting%20music%20event&image_size=landscape_16_9',
    description: '邓紫棋「I AM GLORIA」世界巡回演唱会深圳站！G.E.M.邓紫棋将带来她最震撼的现场表演，从《光年之外》到《泡沫》，从《喜欢你》到《摩天动物园》，展现她独特的音乐魅力和强大的现场实力。',
    priceRanges: [
      { id: 'vip', name: 'VIP 内场', price: 2380, color: '#f59e0b', count: 250, available: 60 },
      { id: 'a', name: '内场 A 区', price: 1680, color: '#6366f1', count: 500, available: 180 },
      { id: 'b', name: '看台 B 区', price: 1080, color: '#10b981', count: 1000, available: 650 },
      { id: 'c', name: '看台 C 区', price: 680, color: '#94a3b8', count: 1200, available: 950 },
    ],
    totalSeats: 2950,
    availableSeats: 1840,
  },
]

// 生成座位数据
export const generateSeats = (eventId: string): Seat[] => {
  const event = mockEvents.find(e => e.id === eventId)
  if (!event) return []

  const seats: Seat[] = []
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
  
  // VIP 区 (前2排)
  for (let rowIndex = 0; rowIndex < 2; rowIndex++) {
    for (let seatNum = 1; seatNum <= 20; seatNum++) {
      const isSold = Math.random() > 0.3
      seats.push({
        id: `vip-${rows[rowIndex]}-${seatNum}`,
        row: rows[rowIndex],
        number: seatNum,
        priceRangeId: 'vip',
        status: isSold ? 'sold' : 'available',
      })
    }
  }

  // Premium 区 (第3-5排)
  for (let rowIndex = 2; rowIndex < 5; rowIndex++) {
    for (let seatNum = 1; seatNum <= 25; seatNum++) {
      const isSold = Math.random() > 0.4
      seats.push({
        id: `premium-${rows[rowIndex]}-${seatNum}`,
        row: rows[rowIndex],
        number: seatNum,
        priceRangeId: 'premium',
        status: isSold ? 'sold' : 'available',
      })
    }
  }

  // B 区 (第6-8排)
  for (let rowIndex = 5; rowIndex < 8; rowIndex++) {
    for (let seatNum = 1; seatNum <= 30; seatNum++) {
      const isSold = Math.random() > 0.6
      seats.push({
        id: `b-${rows[rowIndex]}-${seatNum}`,
        row: rows[rowIndex],
        number: seatNum,
        priceRangeId: 'b',
        status: isSold ? 'sold' : 'available',
      })
    }
  }

  // C 区 (第9-12排)
  for (let rowIndex = 8; rowIndex < 12; rowIndex++) {
    for (let seatNum = 1; seatNum <= 35; seatNum++) {
      const isSold = Math.random() > 0.75
      seats.push({
        id: `c-${rows[rowIndex]}-${seatNum}`,
        row: rows[rowIndex],
        number: seatNum,
        priceRangeId: 'c',
        status: isSold ? 'sold' : 'available',
      })
    }
  }

  return seats
}

// 票务选项
export const getTicketOptions = (eventId: string): TicketOption[] => {
  const event = mockEvents.find(e => e.id === eventId)
  if (!event) return []

  const options: TicketOption[] = []

  event.priceRanges.forEach(priceRange => {
    // 基础票
    options.push({
      id: `${priceRange.id}-standard`,
      name: `${priceRange.name} - 标准票`,
      description: `标准入场票，可享受全场精彩演出。`,
      price: priceRange.price,
      priceRangeId: priceRange.id,
      features: [
        '标准座位',
        '电子票入场',
        '演出手册（电子版）',
      ],
      isDefault: true,
    })

    // 套票
    if (priceRange.price > 1000) {
      options.push({
        id: `${priceRange.id}-package`,
        name: `${priceRange.name} - 豪华套票`,
        description: `包含标准票所有权益，额外赠送精美周边大礼包。`,
        price: priceRange.price + 300,
        priceRangeId: priceRange.id,
        features: [
          '优选座位',
          '电子票入场',
          '精美周边大礼包',
          '演出手册（实体版）',
          '专属入场通道',
        ],
        isDefault: false,
      })
    }

    // VIP 专属选项
    if (priceRange.id === 'vip') {
      options.push({
        id: 'vip-ultimate',
        name: 'VIP 区 - 至尊体验',
        description: `最顶级的演唱会体验，包含独家见面会机会和专属服务。`,
        price: priceRange.price + 800,
        priceRangeId: priceRange.id,
        features: [
          '最前排 VIP 座位',
          '电子票入场',
          '艺术家见面会机会',
          '豪华周边大礼包',
          '专属休息室',
          '免费饮品和小吃',
          '专业摄影师合影',
        ],
        isDefault: false,
      })
    }
  })

  return options
}
