export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  image: string;
  gallery: string[];
  client: string;
  date: string;
  technologies: string[];
  features: string[];
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: '1',
    title: '现代企业官网重新设计',
    category: '网页设计',
    description: '为一家科技初创公司设计并开发了全新的企业官网，采用现代简约风格，提升品牌形象和用户体验。',
    fullDescription: `## 项目背景

我们的客户是一家快速成长的科技初创公司，他们的旧网站已经无法满足业务发展的需求。网站设计过时，用户体验不佳，严重影响了品牌形象和潜在客户的转化。

## 设计理念

我们采用了现代简约的设计理念，以红色 #fb5353 作为主色调，传达活力和创新精神。设计重点包括：

### 1. 响应式布局

确保网站在桌面端、平板和手机上都能提供完美的浏览体验。使用 Flexbox 和 Grid 布局，配合 Tailwind CSS 的响应式类，实现流畅的适配。

### 2. 清晰的信息架构

重新组织网站内容，创建清晰的导航结构，让用户能够快速找到他们需要的信息。

### 3. 视觉层次

使用排版、色彩和间距来创建清晰的视觉层次，引导用户的视线，突出重要内容。

### 4. 交互体验

添加微妙的动画效果和交互反馈，提升用户体验，同时保持网站的专业感。

## 技术实现

- **前端框架**: React 18
- **样式方案**: Tailwind CSS
- **构建工具**: Vite
- **动画效果**: CSS Transition 和 Framer Motion
- **图标库**: Lucide React

## 项目成果

网站上线后，客户报告了以下成果：
- 页面停留时间增加 45%
- 跳出率降低 30%
- 潜在客户转化率提高 60%
- 品牌认知度显著提升

这个项目展示了我们如何通过精心的设计和技术实现，帮助企业提升在线形象和业务成果。`,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20corporate%20website%20redesign%20showcase%20with%20clean%20layout%20and%20professional%20aesthetics%20red%20accent&image_size=landscape_16_9',
    gallery: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20corporate%20website%20homepage%20hero%20section%20with%20red%20accent%20color&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=corporate%20website%20services%20section%20with%20card%20layout%20modern%20design&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=corporate%20website%20about%20section%20with%20team%20showcase%20professional&image_size=landscape_16_9'
    ],
    client: '创新科技有限公司',
    date: '2026-03',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Framer Motion'],
    features: [
      '完全响应式设计',
      '现代化UI组件',
      '流畅的动画效果',
      '优化的页面性能',
      'SEO友好结构',
      '无障碍访问支持'
    ]
  },
  {
    id: '2',
    title: '电商平台界面设计',
    category: 'UI/UX设计',
    description: '为在线零售商设计了完整的电商平台界面，包括产品展示、购物车、结账流程等核心功能。',
    fullDescription: `## 项目概述

我们为一家快速发展的在线零售商设计了全新的电商平台界面。项目目标是提升用户购物体验，增加转化率，并建立现代化的品牌形象。

## 设计挑战

- 如何在保持视觉吸引力的同时，确保购物流程的简洁高效
- 如何在移动端提供与桌面端同等优质的购物体验
- 如何通过设计引导用户完成购买流程

## 设计方案

### 1. 用户旅程优化

我们重新设计了整个购物流程，从产品浏览到完成购买，确保每一步都清晰、直观。

### 2. 产品展示优化

- 大图展示，让用户能够清晰看到产品细节
- 产品信息层次清晰，突出关键卖点
- 添加产品视频展示选项

### 3. 购物车体验

- 直观的购物车图标，显示商品数量
- 侧边栏购物车，无需跳转页面即可查看
- 实时价格计算和促销信息展示

### 4. 结账流程优化

- 简化的三步结账流程
- 支持多种支付方式
- 清晰的进度指示

## 视觉设计

- **主色调**: 红色 #fb5353（传达紧迫感和活力）
- **辅助色**: 深灰色和白色（保持专业感）
- **字体**: 现代无衬线字体，确保可读性
- **图标**: 简洁的线性图标，保持一致性

## 技术实现

- **设计工具**: Figma
- **原型设计**: Figma Prototypes
- **设计系统**: 创建了完整的设计系统，包括组件库和样式指南
- **交接文档**: 详细的设计规格说明，确保开发团队能够准确实现

## 项目成果

- 购物车转化率提升 35%
- 平均订单价值增加 20%
- 用户满意度评分达到 4.8/5
- 移动端订单占比增加 50%

这个项目展示了我们如何通过以用户为中心的设计方法，创造既美观又实用的电商体验。`,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20ecommerce%20platform%20interface%20design%20with%20product%20showcase%20and%20shopping%20cart%20red%20accent&image_size=landscape_16_9',
    gallery: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ecommerce%20product%20listing%20page%20with%20grid%20layout%20modern%20design&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ecommerce%20product%20detail%20page%20with%20image%20gallery%20and%20buy%20button&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ecommerce%20checkout%20process%20with%20payment%20form%20clean%20design&image_size=landscape_16_9'
    ],
    client: '优品商城',
    date: '2026-02',
    technologies: ['Figma', 'React', 'Next.js', 'Tailwind CSS', 'Stripe'],
    features: [
      '产品搜索和筛选',
      '购物车功能',
      '多步骤结账流程',
      '用户账户系统',
      '订单跟踪',
      '移动端优化'
    ]
  },
  {
    id: '3',
    title: '品牌视觉识别系统',
    category: '品牌设计',
    description: '为新创品牌设计了完整的视觉识别系统，包括Logo、色彩方案、字体选择和应用指南。',
    fullDescription: `## 项目背景

我们的客户是一家新成立的创意工作室，需要一个能够传达他们创意、专业和活力的品牌形象。

## 品牌定位

在开始设计之前，我们与客户进行了深入的品牌定位讨论：

- **目标受众**: 创意行业的企业客户和高端个人客户
- **品牌价值**: 创意、专业、可靠、创新
- **品牌个性**: 年轻、活力、现代、国际化

## 设计过程

### 1. Logo设计

我们探索了多个设计方向，最终选择了一个融合了字母"A"（Avana的首字母）和几何元素的设计：

- **形状**: 简洁的几何形状，传达现代感
- **色彩**: 红色 #fb5353 作为主色，传达活力和热情
- **含义**: 向上的箭头形状，象征成长和进步

### 2. 色彩系统

我们建立了完整的色彩系统：

- **主色**: #fb5353（红色）- 活力、热情、注意力
- **辅助色**: 
  - #08060d（深灰）- 专业、稳重
  - #ffffff（白色）- 干净、简约
  - #6b6375（中灰）- 辅助文字

### 3. 字体选择

- **标题字体**: 现代无衬线字体，传达专业和现代感
- **正文字体**: 高可读性的无衬线字体，确保在各种尺寸下的可读性

### 4. 视觉元素

- **图标风格**: 简洁的线性图标，保持一致性
- **图形元素**: 几何形状和渐变，增加视觉层次
- **摄影风格**: 真实、专业的人物和场景摄影

## 应用设计

我们设计了品牌在各种媒介上的应用：

### 1. 办公用品

- 名片设计
- 信纸和信封
- 笔记本和文件夹
- 办公文具

### 2. 数字应用

- 网站和应用界面
- 社交媒体模板
- 演示文稿模板
- 电子邮件签名

### 3. 营销材料

- 宣传册和传单
- 海报和横幅
- 产品包装
- 展会材料

## 品牌手册

我们创建了详细的品牌手册，包括：

- 品牌故事和愿景
- Logo使用规范（尺寸、间距、色彩变体）
- 色彩系统（色值、使用场景）
- 字体系统（字体选择、层级、大小）
- 视觉元素（图标、图形、摄影风格）
- 应用示例（各种媒介的具体应用）

## 项目成果

- 建立了清晰、一致的品牌形象
- 提高了品牌认知度和记忆度
- 为未来的品牌应用提供了明确的指导
- 帮助客户在竞争激烈的市场中脱颖而出

这个项目展示了我们如何从战略层面出发，创建完整、有效且具有辨识度的品牌视觉识别系统。`,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=brand%20identity%20system%20design%20with%20logo%20color%20palette%20typography%20and%20brand%20applications%20red%20accent&image_size=landscape_16_9',
    gallery: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=logo%20design%20variations%20with%20different%20color%20schemes%20and%20backgrounds&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=brand%20business%20card%20design%20with%20logo%20and%20contact%20information%20modern%20style&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=brand%20color%20palette%20and%20typography%20guide%20with%20font%20specimens&image_size=landscape_16_9'
    ],
    client: 'Avana LLC',
    date: '2026-01',
    technologies: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma', 'InDesign'],
    features: [
      'Logo设计及变体',
      '色彩系统',
      '字体系统',
      '图标系统',
      '品牌应用设计',
      '品牌手册'
    ]
  }
];

export function getPortfolioItemById(id: string): PortfolioItem | undefined {
  return portfolioItems.find(item => item.id === id);
}

export function getRelatedPortfolioItems(currentId: string, limit: number = 3): PortfolioItem[] {
  return portfolioItems
    .filter(item => item.id !== currentId)
    .slice(0, limit);
}
