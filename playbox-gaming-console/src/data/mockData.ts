import type { NavItem, Product, Review, Feature, ColorOption } from '@/types';

export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Contact', href: '/contact' },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'PLAYBOX Pro',
    description: 'The ultimate portable gaming experience with 20,000+ retro games, 8-hour battery life, and stunning HD display.',
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.9,
    reviewCount: 1247,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=PLAYBOX%20Pro%20portable%20gaming%20console%20with%20neon%20lights%20and%20sleek%20design%20on%20dark%20background&image_size=square_hd',
    colors: ['#ff00ff', '#06b6d4', '#9333ea', '#10b981'],
    features: ['20,000+ Games', '8 Hour Battery', 'WiFi Enabled', 'HD Audio'],
    inStock: true,
  },
  {
    id: '2',
    name: 'PLAYBOX Lite',
    description: 'Compact and lightweight, perfect for gaming on the go. Features 10,000+ classic games and 6-hour battery.',
    price: 149.99,
    originalPrice: 179.99,
    rating: 4.7,
    reviewCount: 892,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=PLAYBOX%20Lite%20compact%20portable%20gaming%20console%20modern%20design%20dark%20theme&image_size=square_hd',
    colors: ['#ff00ff', '#06b6d4', '#9333ea'],
    features: ['10,000+ Games', '6 Hour Battery', 'Compact Design', 'Stereo Speakers'],
    inStock: true,
  },
  {
    id: '3',
    name: 'PLAYBOX Max',
    description: 'Premium gaming experience with larger display, enhanced speakers, and 25,000+ games. The ultimate gaming companion.',
    price: 299.99,
    originalPrice: 349.99,
    rating: 4.9,
    reviewCount: 567,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=PLAYBOX%20Max%20premium%20portable%20gaming%20console%20large%20screen%20neon%20aesthetic&image_size=square_hd',
    colors: ['#ff00ff', '#06b6d4', '#9333ea', '#f59e0b', '#10b981'],
    features: ['25,000+ Games', '10 Hour Battery', '5" HD Display', 'Bluetooth 5.0'],
    inStock: true,
  },
];

export const reviews: Review[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20headshot%20of%20a%20young%20man%20smiling%20neutral%20background&image_size=square',
    rating: 5,
    date: '2024-03-15',
    title: 'Absolutely amazing!',
    content: 'I have been using the PLAYBOX Pro for a month now, and I am completely blown away. The build quality is exceptional, the screen is crystal clear, and the battery life is exactly as advertised. The retro game selection is incredible - I\'ve been rediscovering my childhood favorites every day.',
    verified: true,
  },
  {
    id: '2',
    name: 'Sarah Williams',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20headshot%20of%20a%20young%20woman%20smiling%20professional%20setting&image_size=square',
    rating: 5,
    date: '2024-03-10',
    title: 'Best purchase this year!',
    content: 'The PLAYBOX Pro has exceeded all my expectations. The neon design is stunning, and the performance is flawless. I love how compact it is - I take it everywhere with me. The WiFi feature is a nice touch for downloading additional games. Highly recommend to any retro gaming enthusiast!',
    verified: true,
  },
  {
    id: '3',
    name: 'Michael Chen',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20headshot%20of%20a%20middle-aged%20asian%20man%20friendly%20expression&image_size=square',
    rating: 5,
    date: '2024-03-05',
    title: 'Perfect gift for my son',
    content: 'I bought this for my son\'s birthday, and it has been an absolute hit. The game selection is massive, and the controls are very responsive. The build quality feels premium, and the battery life is impressive. The neon lights make it look really cool, especially at night. Great value for money!',
    verified: true,
  },
  {
    id: '4',
    name: 'Emily Davis',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20headshot%20of%20a%20woman%20in%20her%2030s%20warm%20smile%20casual%20professional&image_size=square',
    rating: 5,
    date: '2024-02-28',
    title: 'Retro gaming at its finest!',
    content: 'As someone who grew up playing classic games, the PLAYBOX Pro is a dream come true. The emulation is perfect, and the controls feel just like the original consoles. The HD screen makes everything look crisp and vibrant. I especially love the save state feature - no more losing progress!',
    verified: true,
  },
];

export const features: Feature[] = [
  {
    icon: '🎮',
    title: '20,000+ Games',
    description: 'Access thousands of classic retro games from NES, SNES, Sega Genesis, and more.',
  },
  {
    icon: '🔋',
    title: '8 Hour Battery',
    description: 'Long-lasting rechargeable battery for extended gaming sessions on the go.',
  },
  {
    icon: '📶',
    title: 'WiFi Enabled',
    description: 'Connect to WiFi to download additional games and updates.',
  },
  {
    icon: '🎧',
    title: 'HD Audio',
    description: 'Immersive stereo speakers and headphone jack for the ultimate audio experience.',
  },
];

export const colorOptions: ColorOption[] = [
  { name: 'Neon Pink', value: '#ff00ff' },
  { name: 'Cyber Cyan', value: '#06b6d4' },
  { name: 'Purple Pulse', value: '#9333ea' },
  { name: 'Green Glow', value: '#10b981' },
  { name: 'Orange Flame', value: '#f59e0b' },
];

export const trustScore = 4.9;

export const footerLinks = {
  quickLinks: [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'About Us', href: '/about' },
    { label: 'Blog', href: '/blog' },
  ],
  supportLinks: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Shipping', href: '/shipping' },
    { label: 'Returns', href: '/returns' },
    { label: 'Contact Us', href: '/contact' },
  ],
};
