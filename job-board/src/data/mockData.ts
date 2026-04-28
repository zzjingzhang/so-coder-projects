import type { Job, FilterOptions } from '../types';

export const mockJobs: Job[] = [
  {
    id: '1',
    title: '高级前端工程师',
    company: '字节跳动',
    companyLogo: 'https://ui-avatars.com/api/?name=字节&background=6366f1&color=fff',
    location: '北京',
    salary: {
      min: 30000,
      max: 50000,
      currency: '¥',
      period: 'monthly'
    },
    jobType: 'full-time',
    description: '负责公司核心产品的前端架构设计与开发，优化用户体验和页面性能。',
    requirements: ['5年以上前端开发经验', '精通 React/Vue 等框架', '熟悉 TypeScript', '有大型项目架构经验'],
    benefits: ['六险一金', '弹性工作制', '免费三餐', '健身房'],
    postedDate: '2024-01-15',
    companySize: '10000+',
    industry: '互联网'
  },
  {
    id: '2',
    title: '全栈开发工程师',
    company: '阿里巴巴',
    companyLogo: 'https://ui-avatars.com/api/?name=阿里&background=10b981&color=fff',
    location: '杭州',
    salary: {
      min: 25000,
      max: 45000,
      currency: '¥',
      period: 'monthly'
    },
    jobType: 'full-time',
    description: '参与电商平台的全栈开发，负责前后端功能实现和性能优化。',
    requirements: ['3年以上全栈开发经验', '熟悉 Node.js', '掌握 React/Vue', '了解数据库设计'],
    benefits: ['年终奖金', '股票期权', '带薪年假', '年度体检'],
    postedDate: '2024-01-14',
    companySize: '10000+',
    industry: '电商'
  },
  {
    id: '3',
    title: 'React 开发工程师',
    company: '腾讯科技',
    companyLogo: 'https://ui-avatars.com/api/?name=腾讯&background=f59e0b&color=fff',
    location: '深圳',
    salary: {
      min: 20000,
      max: 35000,
      currency: '¥',
      period: 'monthly'
    },
    jobType: 'full-time',
    description: '负责微信生态产品的前端开发，实现复杂交互和动画效果。',
    requirements: ['2年以上 React 开发经验', '熟悉微信小程序开发', '掌握 CSS 动画', '了解性能优化'],
    benefits: ['免费班车', '员工宿舍', '节日福利', '团建活动'],
    postedDate: '2024-01-13',
    companySize: '10000+',
    industry: '互联网'
  },
  {
    id: '4',
    title: '前端开发实习生',
    company: '美团点评',
    companyLogo: 'https://ui-avatars.com/api/?name=美团&background=ef4444&color=fff',
    location: '北京',
    salary: {
      min: 5000,
      max: 8000,
      currency: '¥',
      period: 'monthly'
    },
    jobType: 'internship',
    description: '参与前端项目开发，学习企业级开发流程和最佳实践。',
    requirements: ['在校大学生', '了解 HTML/CSS/JavaScript', '有 React/Vue 基础优先'],
    benefits: ['转正机会', '导师指导', '实习补贴', '下午茶'],
    postedDate: '2024-01-12',
    companySize: '10000+',
    industry: '生活服务'
  },
  {
    id: '5',
    title: '远程前端开发',
    company: '创业公司',
    companyLogo: 'https://ui-avatars.com/api/?name=创业&background=8b5cf6&color=fff',
    location: '远程',
    salary: {
      min: 15000,
      max: 25000,
      currency: '¥',
      period: 'monthly'
    },
    jobType: 'remote',
    description: '负责公司产品的前端开发，完全远程办公，灵活工作时间。',
    requirements: ['2年以上前端开发经验', '熟悉 Vue.js', '能够独立完成项目', '良好沟通能力'],
    benefits: ['远程办公', '灵活时间', '设备补贴', '年度旅游'],
    postedDate: '2024-01-11',
    companySize: '50-100',
    industry: '互联网'
  },
  {
    id: '6',
    title: '兼职前端开发',
    company: '设计工作室',
    companyLogo: 'https://ui-avatars.com/api/?name=设计&background=ec4899&color=fff',
    location: '上海',
    salary: {
      min: 8000,
      max: 12000,
      currency: '¥',
      period: 'monthly'
    },
    jobType: 'part-time',
    description: '负责官网和营销页面的前端开发，每周工作3天。',
    requirements: ['1年以上前端经验', '熟悉响应式开发', '了解 SEO 优化'],
    benefits: ['灵活时间', '项目奖金', '学习机会'],
    postedDate: '2024-01-10',
    companySize: '10-50',
    industry: '设计'
  },
  {
    id: '7',
    title: '合同前端开发',
    company: '金融科技公司',
    companyLogo: 'https://ui-avatars.com/api/?name=金融&background=06b6d4&color=fff',
    location: '广州',
    salary: {
      min: 35000,
      max: 55000,
      currency: '¥',
      period: 'monthly'
    },
    jobType: 'contract',
    description: '参与金融产品的前端开发，为期6个月的合同项目。',
    requirements: ['4年以上前端开发经验', '熟悉金融业务优先', '有数据可视化经验', 'TypeScript 熟练'],
    benefits: ['高薪待遇', '项目奖金', '五险一金'],
    postedDate: '2024-01-09',
    companySize: '100-500',
    industry: '金融'
  },
  {
    id: '8',
    title: 'TypeScript 工程师',
    company: '科技公司',
    companyLogo: 'https://ui-avatars.com/api/?name=科技&background=14b8a6&color=fff',
    location: '成都',
    salary: {
      min: 22000,
      max: 38000,
      currency: '¥',
      period: 'monthly'
    },
    jobType: 'full-time',
    description: '负责企业级应用的前端架构和开发，使用 TypeScript 进行大型项目开发。',
    requirements: ['3年以上 TypeScript 经验', '熟悉 React 生态', '了解系统设计', '有团队协作经验'],
    benefits: ['年终分红', '股票期权', '免费午餐', '健身房'],
    postedDate: '2024-01-08',
    companySize: '500-1000',
    industry: '软件服务'
  }
];

export const filterOptions: FilterOptions = {
  locations: ['全部', '北京', '上海', '深圳', '杭州', '广州', '成都', '远程'],
  jobTypes: ['全部', '全职', '兼职', '合同', '远程', '实习'],
  salaryRanges: [
    { label: '全部', min: 0, max: null },
    { label: '10k 以下', min: 0, max: 10000 },
    { label: '10k-20k', min: 10000, max: 20000 },
    { label: '20k-30k', min: 20000, max: 30000 },
    { label: '30k-50k', min: 30000, max: 50000 },
    { label: '50k 以上', min: 50000, max: null }
  ]
};

export const jobTypeMap: Record<string, string> = {
  'full-time': '全职',
  'part-time': '兼职',
  'contract': '合同',
  'remote': '远程',
  'internship': '实习'
};
