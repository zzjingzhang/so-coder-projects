import type {
  Skill,
  Service,
  PortfolioItem,
  Testimonial,
  NavItem,
  SocialLink,
  ContactInfo,
} from '@/types';

export const defaultUserProfile = {
  name: '张三',
  hobbies: '编程、摄影、旅行、阅读',
  bio: '我是一名热爱技术的全栈开发者，拥有5年的开发经验。专注于创建优雅、高性能的Web应用。我相信好的代码不仅要能工作，还要能讲述故事。在工作之余，我喜欢探索新技术、记录生活中的美好瞬间。',
  heroImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800&h=600',
  aboutImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600&h=800',
};

export const skills: Skill[] = [
  { id: 1, name: 'React', level: 95, icon: 'Code2' },
  { id: 2, name: 'TypeScript', level: 90, icon: 'FileCode' },
  { id: 3, name: 'Node.js', level: 85, icon: 'Server' },
  { id: 4, name: 'Python', level: 80, icon: 'Code' },
  { id: 5, name: 'PostgreSQL', level: 75, icon: 'Database' },
  { id: 6, name: 'Docker', level: 70, icon: 'Box' },
  { id: 7, name: 'AWS', level: 65, icon: 'Cloud' },
  { id: 8, name: 'GraphQL', level: 60, icon: 'Layout' },
];

export const services: Service[] = [
  {
    id: 1,
    title: 'Web 应用开发',
    description: '使用现代技术栈构建高性能、响应式的Web应用程序，确保最佳的用户体验和可维护性。',
    icon: 'Globe',
  },
  {
    id: 2,
    title: '移动端开发',
    description: '使用 React Native 或 Flutter 开发跨平台移动应用，一套代码，多端运行。',
    icon: 'Smartphone',
  },
  {
    id: 3,
    title: '后端开发',
    description: '设计和实现可扩展的后端服务，包括 API 开发、数据库设计、性能优化等。',
    icon: 'Server',
  },
  {
    id: 4,
    title: 'UI/UX 设计',
    description: '创建美观、直观的用户界面设计，注重用户体验和交互细节。',
    icon: 'Palette',
  },
  {
    id: 5,
    title: '云服务部署',
    description: '在 AWS、Azure、GCP 等云平台上部署和管理应用，确保高可用性和安全性。',
    icon: 'Cloud',
  },
  {
    id: 6,
    title: '技术咨询',
    description: '提供技术选型、架构设计、代码审查等专业咨询服务，帮助团队提升技术能力。',
    icon: 'Lightbulb',
  },
];

export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: '电商平台',
    description: '一个功能完整的电商平台，支持商品浏览、购物车、订单管理、支付集成等功能。',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800&h=600',
    category: 'Web 应用',
    link: '#',
  },
  {
    id: 2,
    title: '项目管理系统',
    description: '团队协作工具，支持任务分配、进度跟踪、文件共享、实时通讯等功能。',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800&h=600',
    category: 'SaaS',
    link: '#',
  },
  {
    id: 3,
    title: '社交媒体应用',
    description: '移动社交应用，支持动态发布、即时通讯、好友系统、内容推荐等功能。',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800&h=600',
    category: '移动端',
    link: '#',
  },
  {
    id: 4,
    title: '数据可视化平台',
    description: '企业级数据分析和可视化平台，支持多种图表类型、实时数据更新、报表导出。',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=600',
    category: '数据分析',
    link: '#',
  },
  {
    id: 5,
    title: '在线教育平台',
    description: '交互式在线学习平台，支持视频课程、实时直播、作业批改、学习进度跟踪。',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800&h=600',
    category: '教育科技',
    link: '#',
  },
  {
    id: 6,
    title: '健康追踪应用',
    description: '个人健康管理应用，记录运动数据、饮食习惯、睡眠质量，并提供个性化建议。',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800&h=600',
    category: '健康科技',
    link: '#',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: '李明',
    role: '产品经理',
    company: '科技创新公司',
    content: '与这位开发者合作非常愉快！他不仅技术精湛，而且能够很好地理解产品需求，提出很多有价值的建议。项目按时交付，质量超出预期。强烈推荐！',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 5,
  },
  {
    id: 2,
    name: '王芳',
    role: 'CEO',
    company: '初创企业',
    content: '作为一家初创公司，我们需要快速迭代产品。这位开发者帮助我们在很短的时间内构建了 MVP，并且代码质量非常高。他对技术选型的建议让我们少走了很多弯路。',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 5,
  },
  {
    id: 3,
    name: '陈强',
    role: '技术总监',
    company: '大型互联网公司',
    content: '我雇佣他来重构我们遗留的代码库。他不仅完成了任务，还建立了完善的文档和测试体系。团队成员都反馈说，现在的代码比之前好维护太多了。非常专业！',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 5,
  },
  {
    id: 4,
    name: '赵丽',
    role: 'UI 设计师',
    company: '设计工作室',
    content: '作为设计师，我很欣赏他对细节的关注。他总能精准地还原设计稿，甚至会提出一些优化建议。与他合作让我感到很放心，交付的项目总是超出预期。',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 5,
  },
];

export const navItems: NavItem[] = [
  { id: 'home', label: '首页', href: '#home' },
  { id: 'about', label: '关于', href: '#about' },
  { id: 'skills', label: '技能', href: '#skills' },
  { id: 'services', label: '服务', href: '#services' },
  { id: 'portfolio', label: '作品集', href: '#portfolio' },
  { id: 'testimonials', label: '推荐语', href: '#testimonials' },
  { id: 'contact', label: '联系', href: '#contact' },
];

export const socialLinks: SocialLink[] = [
  { id: 1, name: 'GitHub', url: 'https://github.com', icon: 'Github' },
  { id: 2, name: 'LinkedIn', url: 'https://linkedin.com', icon: 'Linkedin' },
  { id: 3, name: 'Twitter', url: 'https://twitter.com', icon: 'Twitter' },
  { id: 4, name: 'Email', url: 'mailto:example@email.com', icon: 'Mail' },
];

export const contactInfo: ContactInfo = {
  email: 'contact@example.com',
  phone: '+86 138 0000 0000',
  location: '中国 · 北京',
};
