import type { Product, Announcement, NavItem, FooterSection } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: "Kind of Blue",
    artist: "Miles Davis",
    price: 299,
    rating: 4.9,
    reviews: 2341,
    tag: "热卖",
    category: "vinyl",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vinyl%20record%20cover%20jazz%20album%20blue%20background%20classic%20design&image_size=square_hd"
  },
  {
    id: 2,
    name: "Abbey Road",
    artist: "The Beatles",
    price: 399,
    rating: 4.8,
    reviews: 1876,
    tag: "经典",
    category: "vinyl",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vinyl%20record%20cover%20the%20beatles%20abbey%20road%20crosswalk&image_size=square_hd"
  },
  {
    id: 3,
    name: "Sony WH-1000XM5",
    artist: "Sony",
    price: 2699,
    rating: 4.7,
    reviews: 987,
    tag: "新品",
    category: "headphone",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=premium%20wireless%20noise%20cancelling%20headphones%20sleek%20modern%20design&image_size=square_hd"
  },
  {
    id: 4,
    name: "Dark Side of the Moon",
    artist: "Pink Floyd",
    price: 349,
    rating: 4.9,
    reviews: 3125,
    tag: "限量",
    category: "vinyl",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vinyl%20record%20cover%20pink%20floyd%20dark%20side%20of%20the%20moon%20prism&image_size=square_hd"
  },
  {
    id: 5,
    name: "Astell&Kern SR35",
    artist: "Astell&Kern",
    price: 6999,
    rating: 4.8,
    reviews: 356,
    tag: "旗舰",
    category: "player",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=premium%20digital%20audio%20player%20hi%20res%20music%20sleek%20metal%20design&image_size=square_hd"
  },
  {
    id: 6,
    name: "Thriller",
    artist: "Michael Jackson",
    price: 289,
    rating: 4.9,
    reviews: 5678,
    tag: "传奇",
    category: "vinyl",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vinyl%20record%20cover%20michael%20jackson%20thriller%20iconic%20design&image_size=square_hd"
  },
  {
    id: 7,
    name: "AirPods Pro 2",
    artist: "Apple",
    price: 1899,
    rating: 4.6,
    reviews: 12345,
    tag: "畅销",
    category: "headphone",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=apple%20airpods%20pro%20wireless%20earbuds%20white%20minimal%20design&image_size=square_hd"
  },
  {
    id: 8,
    name: "Nevermind",
    artist: "Nirvana",
    price: 269,
    rating: 4.8,
    reviews: 4321,
    tag: "经典",
    category: "vinyl",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vinyl%20record%20cover%20nirvana%20nevermind%20baby%20swimming%20pool&image_size=square_hd"
  }
];

export const announcements: Announcement[] = [
  { id: 1, text: "🎉 新品上线：Sony WH-1000XM5 降噪耳机，限时9折优惠！", type: "promo" },
  { id: 2, text: "🎵 黑胶唱片季：全场黑胶满500减100，满1000减250", type: "promo" },
  { id: 3, text: "📦 全场满299免运费，支持7天无理由退换", type: "info" },
  { id: 4, text: "🎧 数字专辑专区：最新流行专辑限时免费试听", type: "new" }
];

export const navItems: NavItem[] = [
  { id: 'home', label: '首页', icon: 'home', href: '/' },
  { id: 'category', label: '分类', icon: 'category', href: '/category' },
  { id: 'wishlist', label: '收藏', icon: 'heart', href: '/wishlist' },
  { id: 'cart', label: '购物车', icon: 'cart', href: '/cart' },
  { id: 'profile', label: '个人中心', icon: 'user', href: '/profile' }
];

export const footerSections: FooterSection[] = [
  {
    title: '购物指南',
    links: [
      { id: '1', label: '注册登录', href: '/register' },
      { id: '2', label: '如何下单', href: '/guide' },
      { id: '3', label: '支付方式', href: '/payment' },
      { id: '4', label: '订单查询', href: '/orders' }
    ]
  },
  {
    title: '客户服务',
    links: [
      { id: '1', label: '帮助中心', href: '/help' },
      { id: '2', label: '配送说明', href: '/shipping' },
      { id: '3', label: '退换政策', href: '/returns' },
      { id: '4', label: '隐私政策', href: '/privacy' }
    ]
  },
  {
    title: '关于我们',
    links: [
      { id: '1', label: '品牌故事', href: '/about' },
      { id: '2', label: '联系我们', href: '/contact' },
      { id: '3', label: '加入我们', href: '/careers' },
      { id: '4', label: '门店地址', href: '/stores' }
    ]
  }
];

export const heroData = {
  title: "聆听灵魂的声音",
  subtitle: "发现黑胶唱片、高端耳机与数字音乐的完美融合",
  ctaPrimary: "立即探索",
  ctaSecondary: "查看热卖"
};

export const aboutData = {
  title: "关于 VinylVibe",
  subtitle: "我们相信音乐的力量",
  description: "VinylVibe 成立于2015年，是一家专注于高品质音乐体验的专业商店。从经典黑胶唱片到现代数字播放器，我们精选全球优质音乐产品，为音乐爱好者打造沉浸式的聆听体验。",
  stats: [
    { value: "50,000+", label: "精选唱片" },
    { value: "100+", label: "品牌合作" },
    { value: "200K+", label: "满意顾客" }
  ]
};

export const brandSlogan = {
  slogan: "音乐，不只是声音",
  subtext: "它是情感，是回忆，是人生的原声带",
  signature: "— VinylVibe"
};
