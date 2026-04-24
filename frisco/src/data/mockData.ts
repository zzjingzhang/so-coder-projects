import type { BlogPost, FAQ, Feature, Testimonial, ProcessStep, TeamMember, Stat, ContactInfo } from '@/types'

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: '如何打造高效的 SaaS 产品营销策略',
    slug: 'saas-product-marketing-strategy',
    excerpt: '探索现代 SaaS 产品营销的最佳实践，从用户获取到留存转化的全流程策略。',
    content: `<p>在当今竞争激烈的 SaaS 市场中，有效的产品营销策略是成功的关键。本文将深入探讨如何打造一个高效的 SaaS 产品营销体系。</p>
    
    <h2>1. 了解你的目标用户</h2>
    <p>任何成功的营销策略都始于对目标用户的深入理解。你需要明确：</p>
    <ul>
      <li>你的理想用户画像是什么？</li>
      <li>他们的痛点和需求是什么？</li>
      <li>他们如何做出购买决策？</li>
    </ul>
    
    <h2>2. 构建强大的价值主张</h2>
    <p>你的产品能够为用户带来什么独特价值？清晰、简洁的价值主张是吸引用户的第一步。</p>
    
    <h2>3. 多渠道获客策略</h2>
    <p>结合内容营销、搜索引擎优化、社交媒体营销、付费广告等多种渠道，建立全面的获客体系。</p>
    
    <h2>4. 数据驱动的优化</h2>
    <p>持续跟踪关键指标，基于数据进行决策和优化。关注用户转化率、留存率、LTV/CAC 等核心指标。</p>
    
    <h2>总结</h2>
    <p>成功的 SaaS 营销是一个持续迭代的过程。保持对市场的敏锐洞察，不断学习和优化，才能在竞争中脱颖而出。</p>`,
    coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20SaaS%20dashboard%20interface%20with%20charts%20and%20analytics%20minimalist%20design&image_size=landscape_16_9',
    author: {
      name: '张明远',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20asian%20male%20business%20portrait%20minimalist&image_size=square',
      role: '产品营销总监'
    },
    publishDate: '2024-03-15',
    tags: ['SaaS', '产品营销', '增长策略'],
    category: '营销',
    readTime: '8 分钟'
  },
  {
    id: 2,
    title: 'Vue 3 Composition API 最佳实践指南',
    slug: 'vue3-composition-api-best-practices',
    excerpt: '深入理解 Vue 3 Composition API 的设计理念，掌握响应式编程的最佳实践。',
    content: `<p>Vue 3 的 Composition API 为我们提供了更灵活的代码组织方式。本文将分享一些实用的最佳实践。</p>
    
    <h2>1. 组合式函数的命名</h2>
    <p>使用 'use' 前缀是一个常见的约定，例如 useMouse、useFetch。这有助于区分普通函数和组合式函数。</p>
    
    <h2>2. 响应式数据的管理</h2>
    <p>合理使用 ref 和 reactive。ref 适用于基础类型，reactive 适用于对象类型。</p>
    
    <h2>3. 生命周期钩子</h2>
    <p>在 Composition API 中，生命周期钩子需要显式导入并在 setup 中调用。</p>
    
    <h2>4. 组件之间的状态共享</h2>
    <p>使用组合式函数是在组件之间共享状态的好方法。你可以创建可复用的状态管理逻辑。</p>`,
    coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vuejs%20logo%20with%20modern%20code%20editor%20background%20tech%20design&image_size=landscape_16_9',
    author: {
      name: '李晓华',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20asian%20female%20developer%20portrait%20minimalist&image_size=square',
      role: '前端架构师'
    },
    publishDate: '2024-03-10',
    tags: ['Vue 3', 'Composition API', '前端开发'],
    category: '技术',
    readTime: '6 分钟'
  },
  {
    id: 3,
    title: '2024 年用户体验设计趋势',
    slug: 'ux-design-trends-2024',
    excerpt: '探索 2024 年最值得关注的用户体验设计趋势，保持你的产品设计竞争力。',
    content: `<p>设计趋势不断演变，保持对新趋势的了解是设计师的必修课。让我们看看 2024 年的 UX 设计趋势。</p>
    
    <h2>1. 沉浸式体验</h2>
    <p>随着 AR/VR 技术的发展，沉浸式体验设计变得越来越重要。用户期望更具参与感的交互。</p>
    
    <h2>2. AI 驱动的个性化</h2>
    <p>人工智能正在改变我们设计产品的方式。个性化体验不再是奢侈品，而是必需品。</p>
    
    <h2>3. 无障碍设计优先</h2>
    <p>包容性设计越来越受到重视。确保你的产品对所有人都可用。</p>
    
    <h2>4. 微交互的精细化</h2>
    <p>好的微交互能够大幅提升用户体验。关注细节，让每一次交互都有意义。</p>`,
    coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20UI%20UX%20design%20interface%20with%20color%20palette%20and%20wireframes&image_size=landscape_16_9',
    author: {
      name: '王美琪',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=creative%20designer%20woman%20portrait%20artistic%20minimalist&image_size=square',
      role: 'UX 设计主管'
    },
    publishDate: '2024-03-05',
    tags: ['UX设计', '用户体验', '设计趋势'],
    category: '设计',
    readTime: '7 分钟'
  },
  {
    id: 4,
    title: 'TypeScript 高级类型技巧',
    slug: 'typescript-advanced-types',
    excerpt: '掌握 TypeScript 的高级类型系统，写出更安全、更可维护的代码。',
    content: `<p>TypeScript 的类型系统非常强大。本文将介绍一些高级类型技巧，帮助你编写更好的 TypeScript 代码。</p>
    
    <h2>1. 条件类型</h2>
    <p>条件类型允许我们基于类型关系选择不同的类型。例如：type IsString<T> = T extends string ? true : false</p>
    
    <h2>2. 映射类型</h2>
    <p>映射类型可以基于已有类型创建新类型。Partial、Required、Pick 都是常见的映射类型。</p>
    
    <h2>3. 模板字面量类型</h2>
    <p>TypeScript 4.1 引入的模板字面量类型让我们能够操作字符串类型。</p>
    
    <h2>4. 递归类型</h2>
    <p>递归类型对于表示嵌套数据结构非常有用。</p>`,
    coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=typescript%20logo%20with%20code%20syntax%20highlight%20dark%20theme&image_size=landscape_16_9',
    author: {
      name: '陈志远',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=senior%20developer%20man%20portrait%20professional%20minimalist&image_size=square',
      role: '技术负责人'
    },
    publishDate: '2024-02-28',
    tags: ['TypeScript', '类型系统', '前端开发'],
    category: '技术',
    readTime: '10 分钟'
  },
  {
    id: 5,
    title: '产品经理如何做用户调研',
    slug: 'product-manager-user-research',
    excerpt: '系统性的用户调研方法论，帮助产品经理更好地理解用户需求。',
    content: `<p>用户调研是产品经理的核心能力之一。本文将分享一些实用的用户调研方法。</p>
    
    <h2>1. 调研目标设定</h2>
    <p>在开始调研之前，你需要明确调研目标。你想要回答什么问题？</p>
    
    <h2>2. 选择合适的调研方法</h2>
    <p>不同的场景需要不同的方法。用户访谈、问卷调查、可用性测试各有其适用场景。</p>
    
    <h2>3. 如何设计好的问题</h2>
    <p>好的问题设计是获得有价值信息的关键。避免引导性问题，保持中立。</p>
    
    <h2>4. 数据分析与洞察提取</h2>
    <p>收集数据只是第一步。真正的价值在于从数据中提取出可执行的洞察。</p>`,
    coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=product%20manager%20doing%20user%20research%20with%20data%20charts%20modern%20office&image_size=landscape_16_9',
    author: {
      name: '林小燕',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=product%20manager%20woman%20portrait%20confident%20professional&image_size=square',
      role: '资深产品经理'
    },
    publishDate: '2024-02-20',
    tags: ['产品经理', '用户调研', '用户研究'],
    category: '产品',
    readTime: '9 分钟'
  },
  {
    id: 6,
    title: '性能优化：从理论到实践',
    slug: 'performance-optimization-guide',
    excerpt: '全面的 Web 性能优化指南，涵盖加载性能、运行时性能和感知性能。',
    content: `<p>性能是用户体验的关键因素。本文将系统性地介绍 Web 性能优化的各个方面。</p>
    
    <h2>1. 理解性能指标</h2>
    <p>Core Web Vitals 是 Google 提出的关键性能指标。理解 LCP、FID、CLS 这些指标。</p>
    
    <h2>2. 加载性能优化</h2>
    <p>代码分割、懒加载、资源压缩、CDN 优化等都是提升加载性能的有效手段。</p>
    
    <h2>3. 运行时性能优化</h2>
    <p>减少重排重绘、使用虚拟列表、优化事件处理等提升运行时性能。</p>
    
    <h2>4. 感知性能</h2>
    <p>有时候，让用户感觉快比实际上快更重要。骨架屏、加载动画等都是提升感知性能的方法。</p>`,
    coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=web%20performance%20speed%20meter%20with%20fast%20loading%20graph%20tech%20design&image_size=landscape_16_9',
    author: {
      name: '周宇轩',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=performance%20engineer%20man%20portrait%20focused%20professional&image_size=square',
      role: '性能优化专家'
    },
    publishDate: '2024-02-15',
    tags: ['性能优化', 'Web性能', '前端开发'],
    category: '技术',
    readTime: '12 分钟'
  }
]

export const faqs: FAQ[] = [
  {
    id: 1,
    question: 'Frisco 是什么类型的产品？',
    answer: 'Frisco 是一个现代化的 SaaS 应用营销网站模板，专为科技公司、创业团队和软件企业设计。我们提供专业、简洁、具有科技感的网站解决方案，帮助企业有效地展示产品价值、吸引潜在客户和提升品牌形象。'
  },
  {
    id: 2,
    question: '如何开始使用 Frisco？',
    answer: '使用 Frisco 非常简单。你可以通过两种方式开始：1) 联系我们的销售团队，我们会根据你的需求提供定制化服务；2) 下载我们的模板包，自行进行二次开发。无论选择哪种方式，我们都提供完整的技术文档和支持服务。'
  },
  {
    id: 3,
    question: 'Frisco 支持哪些集成？',
    answer: 'Frisco 支持多种主流的第三方服务集成，包括但不限于：Google Analytics（网站统计）、Hotjar（用户行为分析）、Mailchimp（邮件营销）、Intercom（在线客服）、Stripe（支付处理）等。如果有特殊的集成需求，我们的技术团队也可以为你提供定制开发服务。'
  },
  {
    id: 4,
    question: '技术支持服务包括哪些内容？',
    answer: '我们提供多层次的技术支持服务：基础版用户享有邮件支持（24小时内响应）；专业版用户享有优先邮件支持（4小时内响应）和电话支持；企业版用户享有专属客户经理、7x24小时紧急支持和定制化培训服务。所有版本均享有在线文档和社区论坛访问权限。'
  },
  {
    id: 5,
    question: 'Frisco 是否支持多语言？',
    answer: '是的，Frisco 完全支持国际化。我们的模板架构支持多语言配置，你可以轻松添加和管理多种语言版本。同时，我们也提供专业的翻译和本地化服务，帮助你的产品触达全球市场。'
  }
]

export const features: Feature[] = [
  {
    id: 1,
    icon: '🎯',
    title: '精准定位',
    description: '基于用户行为数据和智能算法，精准触达你的目标用户群体，提升营销效率。'
  },
  {
    id: 2,
    icon: '📊',
    title: '数据驱动',
    description: '实时数据分析和可视化报表，让每一个营销决策都有数据支撑。'
  },
  {
    id: 3,
    icon: '🚀',
    title: '快速部署',
    description: '一键部署、即开即用的设计理念，让你的营销网站在分钟级上线。'
  },
  {
    id: 4,
    icon: '🔒',
    title: '安全可靠',
    description: '企业级安全标准，数据加密存储，多重防护机制保障你的数据安全。'
  },
  {
    id: 5,
    icon: '🔧',
    title: '灵活定制',
    description: '模块化设计架构，支持高度定制化，轻松扩展功能满足业务需求。'
  },
  {
    id: 6,
    icon: '📱',
    title: '全端适配',
    description: '响应式设计完美适配桌面端、平板端和移动端，提供一致的用户体验。'
  }
]

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: '刘建国',
    role: 'CEO',
    company: '云启科技',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20businessman%20ceo%20portrait%20confident%20professional&image_size=square',
    content: '使用 Frisco 后，我们的网站转化率提升了 35%。专业的设计和流畅的用户体验，让我们的品牌形象焕然一新。强烈推荐给所有追求品质的 SaaS 企业。',
    rating: 5
  },
  {
    id: 2,
    name: '陈雪梅',
    role: '市场总监',
    company: '数智未来',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20marketing%20director%20woman%20portrait%20professional&image_size=square',
    content: 'Frisco 的 SEO 优化做得非常出色。上线三个月后，我们的自然搜索流量增长了 180%。技术支持团队也非常专业，响应速度快，解决问题及时。',
    rating: 5
  },
  {
    id: 3,
    name: '张伟',
    role: 'CTO',
    company: '新维科技',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20cto%20tech%20leader%20man%20portrait%20professional&image_size=square',
    content: '作为技术负责人，我非常欣赏 Frisco 的代码质量。架构清晰、文档完善，二次开发成本很低。组件化设计让我们的前端团队效率提升明显。',
    rating: 5
  }
]

export const processSteps: ProcessStep[] = [
  {
    id: 1,
    step: 1,
    title: '需求分析',
    description: '深入了解你的业务需求、目标用户和市场定位，制定专属的营销网站策略。',
    icon: '📋'
  },
  {
    id: 2,
    step: 2,
    title: '方案设计',
    description: '基于需求分析结果，设计网站架构、内容布局和交互原型，确保方案满足所有需求。',
    icon: '✏️'
  },
  {
    id: 3,
    step: 3,
    title: '开发实现',
    description: '我们的专业开发团队将方案变为现实，使用最新的技术栈确保代码质量和性能。',
    icon: '💻'
  },
  {
    id: 4,
    step: 4,
    title: '部署上线',
    description: '严格的测试流程后，一键部署上线。同时提供持续的监控和优化建议。',
    icon: '🚀'
  }
]

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: '张明远',
    role: 'CEO & 创始人',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20founder%20ceo%20man%20portrait%20visionary%20professional&image_size=square',
    bio: '拥有 12 年互联网行业经验，曾在多家知名科技公司担任产品和市场负责人。2019 年创立 Frisco，致力于帮助 SaaS 企业打造专业的数字化品牌形象。',
    social: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com'
    }
  },
  {
    id: 2,
    name: '李晓华',
    role: 'CTO',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20female%20cto%20tech%20expert%20portrait%20professional&image_size=square',
    bio: '全栈开发专家，Vue 生态核心贡献者。曾负责多个大型 SaaS 产品的技术架构设计。加入 Frisco 后，主导产品技术路线规划和核心功能开发。',
    social: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com'
    }
  },
  {
    id: 3,
    name: '王美琪',
    role: '设计总监',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20designer%20creative%20director%20woman%20portrait%20artistic&image_size=square',
    bio: '资深 UX/UI 设计师，曾获多项国际设计大奖。擅长将复杂的技术概念转化为优雅的用户体验。她领导的设计团队始终追求极致的视觉体验和交互细节。',
    social: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com'
    }
  },
  {
    id: 4,
    name: '陈志远',
    role: '产品负责人',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20product%20manager%20man%20portrait%20thoughtful%20professional&image_size=square',
    bio: '前 Google 产品经理，拥有丰富的 B2B SaaS 产品经验。以用户为中心的产品思维，带领团队持续迭代优化产品功能，确保 Frisco 始终满足市场需求。',
    social: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com'
    }
  }
]

export const stats: Stat[] = [
  { id: 1, value: '500+', label: '企业客户' },
  { id: 2, value: '98%', label: '客户满意度' },
  { id: 3, value: '24h', label: '技术支持响应' },
  { id: 4, value: '5年', label: '行业经验' }
]

export const contactInfo: ContactInfo = {
  email: 'contact@frisco.com',
  phone: '+86 400-888-8888',
  address: '中国上海市浦东新区张江高科技园区博云路 123 号 创意大厦 5 层',
  social: [
    { name: 'Twitter', url: 'https://twitter.com', icon: '𝕏' },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'in' },
    { name: 'GitHub', url: 'https://github.com', icon: '⌘' },
    { name: 'WeChat', url: '#', icon: '💬' }
  ]
}

export const tags = [
  { name: '全部', count: 6 },
  { name: 'SaaS', count: 1 },
  { name: '产品营销', count: 1 },
  { name: 'Vue 3', count: 1 },
  { name: 'TypeScript', count: 1 },
  { name: 'UX设计', count: 1 },
  { name: '前端开发', count: 3 },
  { name: '产品经理', count: 1 }
]

export const categories = [
  { name: '营销', count: 1 },
  { name: '技术', count: 3 },
  { name: '设计', count: 1 },
  { name: '产品', count: 1 }
]
