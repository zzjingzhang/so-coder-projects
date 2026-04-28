import type { Project, BlogPost } from '../types'

export const projects: Project[] = [
  {
    id: 1,
    title: '电商管理系统',
    description: '一个完整的电商后台管理系统，包含商品管理、订单处理、用户管理、数据统计等功能模块。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20ecommerce%20dashboard%20admin%20panel%20interface%20clean%20design&image_size=landscape_16_9',
    tags: ['Vue 3', 'TypeScript', 'Element Plus'],
    link: '#',
    github: '#'
  },
  {
    id: 2,
    title: '社交媒体应用',
    description: '实时社交平台，支持消息推送、动态分享、好友互动、群组管理等社交功能。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=social%20media%20app%20interface%20modern%20mobile%20first%20design&image_size=landscape_16_9',
    tags: ['React', 'Node.js', 'Socket.io'],
    link: '#',
    github: '#'
  },
  {
    id: 3,
    title: '数据可视化平台',
    description: '企业级数据可视化解决方案，支持多种图表类型、数据导入导出和实时数据更新。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=data%20visualization%20dashboard%20charts%20graphs%20analytics%20modern%20interface&image_size=landscape_16_9',
    tags: ['Vue 3', 'ECharts', 'Python'],
    link: '#',
    github: '#'
  }
]

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Vue 3 组合式 API 最佳实践指南',
    excerpt: '深入探讨 Vue 3 组合式 API 的设计理念和最佳实践，包括响应式数据管理、组件复用、代码组织等核心概念。',
    date: '2024年1月15日',
    readTime: '8 分钟阅读',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vue%203%20composition%20api%20code%20on%20screen%20modern%20developer%20workspace&image_size=landscape_16_9',
    category: 'Vue.js'
  },
  {
    id: 2,
    title: '使用 TypeScript 构建大型前端项目',
    excerpt: '分享在大型项目中使用 TypeScript 的经验，包括类型设计、模块组织、代码规范等实用技巧。',
    date: '2024年1月10日',
    readTime: '10 分钟阅读',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=typescript%20code%20editor%20syntax%20highlighting%20modern%20interface&image_size=landscape_16_9',
    category: 'TypeScript'
  }
]
