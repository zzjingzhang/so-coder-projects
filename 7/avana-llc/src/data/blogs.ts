export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
}

export const blogs: Blog[] = [
  {
    id: '1',
    title: '如何设计现代简约的企业网站',
    excerpt: '探索现代企业网站设计的最佳实践，从色彩搭配到用户体验的全方位指南。',
    content: `现代企业网站设计已经从复杂的视觉效果转向简约、功能导向的设计理念。在这篇文章中，我们将深入探讨如何创建一个既美观又实用的企业网站。

## 简约设计的核心原则

简约设计并不意味着缺乏内容，而是通过精心的布局和设计，让用户能够快速找到他们需要的信息。以下是几个关键原则：

### 1. 留白的重要性

留白是设计中最容易被忽视但又最重要的元素之一。适当的留白可以：
- 提高内容的可读性
- 引导用户的视线
- 创造优雅、专业的视觉效果

### 2. 色彩搭配

现代企业网站通常使用有限的色彩方案。主色调应该反映品牌的个性，同时保持专业感。对于 Avana LLC，我们选择了红色 #fb5353 作为主色，传达活力和热情。

### 3. 排版层次

清晰的排版层次是良好用户体验的基础。使用不同的字体大小、粗细和颜色来区分标题、副标题和正文内容。

## 响应式设计

在移动设备优先的时代，响应式设计不再是可选项，而是必需品。确保你的网站在各种设备上都能提供一致的体验。

## 结论

现代企业网站设计的核心是为用户提供价值。通过简约的设计、清晰的导航和优质的内容，你可以创建一个既美观又实用的网站。`,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20minimalist%20corporate%20website%20design%20concept%20with%20clean%20layout%20and%20professional%20aesthetics&image_size=landscape_16_9',
    author: '张设计师',
    date: '2026-04-28',
    category: '设计',
    readTime: '5 分钟'
  },
  {
    id: '2',
    title: '前端开发中使用 Tailwind CSS 的最佳实践',
    excerpt: '深入了解如何高效使用 Tailwind CSS 构建现代、可维护的前端应用程序。',
    content: `Tailwind CSS 已经成为现代前端开发中最受欢迎的 CSS 框架之一。它的实用优先方法提供了前所未有的开发速度和灵活性。

## 为什么选择 Tailwind CSS

### 1. 快速开发

使用 Tailwind，你可以直接在 HTML 中应用样式，无需在 CSS 文件和 HTML 文件之间来回切换。

### 2. 一致性

Tailwind 提供了一套预设的设计系统，确保你的项目在视觉上保持一致。

### 3. 可定制性

虽然 Tailwind 提供了默认的设计系统，但你可以完全自定义颜色、间距、字体等。

## Tailwind CSS 最佳实践

### 1. 使用组件抽象

虽然 Tailwind 鼓励直接在 HTML 中使用类名，但对于重复的 UI 模式，建议创建组件。

### 2. 合理组织代码

将相关的样式类组织在一起，提高代码的可读性。

### 3. 利用响应式前缀

Tailwind 的响应式前缀（如 md:, lg:）使得创建响应式设计变得非常简单。

## 结论

Tailwind CSS 改变了我们编写 CSS 的方式。通过遵循最佳实践，你可以充分利用 Tailwind 的优势，同时保持代码的可维护性。`,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20web%20development%20with%20Tailwind%20CSS%20showing%20code%20and%20design%20elements&image_size=landscape_16_9',
    author: '李开发',
    date: '2026-04-25',
    category: '开发',
    readTime: '7 分钟'
  },
  {
    id: '3',
    title: 'React 19 新特性全面解析',
    excerpt: '了解 React 19 带来的激动人心的新特性和改进，以及如何在项目中应用它们。',
    content: `React 19 带来了许多令人期待的新特性，从性能优化到开发体验的改进。让我们深入了解这些新特性。

## 主要新特性

### 1. Server Components 改进

React 19 进一步优化了 Server Components 的性能和开发体验。

### 2. 新的 Hooks

React 19 引入了几个新的 Hooks，包括 useFormStatus 和 useOptimistic。

### 3. 自动批处理改进

React 19 改进了状态更新的批处理机制，提供更好的性能。

## 性能优化

### 1. 编译器优化

React 19 包含了对 React 编译器的改进，自动优化渲染性能。

### 2. 减少包体积

React 19 对核心库进行了瘦身，减少了应用程序的包体积。

## 开发体验改进

### 1. 更好的错误信息

React 19 提供了更清晰、更有帮助的错误信息。

### 2. 改进的 DevTools

React DevTools 也得到了更新，提供更好的调试体验。

## 如何升级

升级到 React 19 相对简单。确保你的项目依赖兼容，然后按照官方迁移指南进行操作。

## 结论

React 19 是一个重要的版本，带来了许多改进和新特性。无论是性能优化还是开发体验，React 19 都值得期待。`,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=React%2019%20new%20features%20concept%20with%20modern%20JavaScript%20code%20and%20components&image_size=landscape_16_9',
    author: '王技术',
    date: '2026-04-20',
    category: '技术',
    readTime: '8 分钟'
  },
  {
    id: '4',
    title: '企业数字化转型的关键步骤',
    excerpt: '探讨企业如何成功进行数字化转型，从战略规划到技术实施的全面指南。',
    content: `数字化转型已经成为现代企业生存和发展的必要条件。但是，成功的数字化转型需要仔细的规划和执行。

## 什么是数字化转型

数字化转型不仅仅是采用新技术，更是一种业务模式的变革。它涉及到：
- 流程自动化
- 数据驱动决策
- 客户体验优化
- 组织文化变革

## 数字化转型的关键步骤

### 1. 战略规划

在开始任何技术实施之前，首先需要明确数字化转型的战略目标。这包括：
- 评估当前业务状况
- 识别数字化机会
- 设定明确的目标和 KPIs

### 2. 技术架构设计

选择合适的技术栈是成功的关键。考虑因素包括：
- 可扩展性
- 安全性
- 集成能力
- 总拥有成本

### 3. 数据战略

数据是数字化转型的核心。建立有效的数据战略包括：
- 数据治理
- 数据分析能力
- 数据安全和隐私

### 4. 组织变革

数字化转型需要组织文化的变革。这包括：
- 技能培训
- 敏捷工作方式
- 创新文化

## 常见挑战

### 1. 遗留系统集成

许多企业面临的最大挑战是如何将新系统与遗留系统集成。

### 2. 变更管理

员工对变革的抵制是另一个常见障碍。

### 3. 投资回报

证明数字化转型的投资回报是一个持续的挑战。

## 结论

数字化转型是一个持续的旅程，而不是一个终点。通过战略规划、技术投资和组织变革，企业可以成功实现数字化转型，获得竞争优势。`,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=digital%20transformation%20concept%20for%20enterprise%20with%20modern%20technology%20and%20business%20integration&image_size=landscape_16_9',
    author: '陈顾问',
    date: '2026-04-15',
    category: '商业',
    readTime: '10 分钟'
  },
  {
    id: '5',
    title: 'UI/UX 设计中的色彩心理学',
    excerpt: '了解色彩如何影响用户情绪和行为，以及如何在设计中有效应用色彩心理学。',
    content: `色彩是设计中最强大的工具之一。正确的色彩选择可以影响用户的情绪、感知和行为。

## 色彩心理学基础

### 红色 (#fb5353)

红色是一种充满活力的颜色，通常与：
- 激情和能量
- 紧迫感
- 注意力吸引

红色非常适合：
- 行动号召按钮
- 重要通知
- 需要引起注意的元素

### 蓝色

蓝色通常与：
- 信任和可靠
- 平静和专业
- 技术感

蓝色是企业网站最常用的颜色之一。

### 绿色

绿色通常与：
- 自然和环保
- 成长和成功
- 积极的情绪

绿色常用于：
- 成功状态
- 环保品牌
- 金融应用

### 紫色

紫色通常与：
- 奢华和高端
- 创造力
- 神秘感

紫色常用于：
- 高端品牌
- 创意产品
- 需要独特感的设计

## 在设计中应用色彩心理学

### 1. 了解目标受众

不同文化对颜色的理解可能不同。在设计之前，了解你的目标受众的文化背景。

### 2. 创建色彩层次

使用主色、辅助色和强调色来创建清晰的视觉层次。

### 3. 考虑可访问性

确保你的色彩选择符合可访问性标准，包括足够的对比度。

### 4. 保持一致性

在整个设计中保持色彩使用的一致性，建立品牌识别度。

## 案例研究：Avana LLC

对于 Avana LLC，我们选择了红色 #fb5353 作为主色。这个选择是基于：
- 红色传达活力和热情，符合现代企业的形象
- 红色能够有效吸引用户注意力
- 红色在白色背景上有很好的对比度

## 结论

色彩心理学是设计中的一个强大工具。通过理解色彩的情感影响，你可以创建更有效、更有吸引力的用户体验。`,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=color%20psychology%20in%20UI%20UX%20design%20showing%20various%20colors%20and%20their%20emotional%20impact&image_size=landscape_16_9',
    author: '刘设计',
    date: '2026-04-10',
    category: '设计',
    readTime: '6 分钟'
  },
  {
    id: '6',
    title: 'Vite vs Webpack：现代前端构建工具对比',
    excerpt: '深入对比 Vite 和 Webpack 这两种主流的前端构建工具，帮助你选择最适合项目的工具。',
    content: `前端构建工具的选择对开发体验和项目性能有重大影响。让我们深入对比 Vite 和 Webpack。

## Vite 简介

Vite 是一个相对较新的构建工具，由 Vue.js 的作者尤雨溪创建。它的主要特点是：

### 1. 极快的冷启动

Vite 使用 ES 模块，无需打包即可启动开发服务器。

### 2. 即时热更新

Vite 的热更新速度非常快，几乎是即时的。

### 3. 优化的生产构建

Vite 使用 Rollup 进行生产构建，提供优化的输出。

## Webpack 简介

Webpack 是目前最流行的前端构建工具，已经存在多年。它的主要特点是：

### 1. 成熟的生态系统

Webpack 有一个庞大的插件生态系统，几乎可以处理任何构建需求。

### 2. 高度可配置

Webpack 提供了非常详细的配置选项，可以精确控制构建过程。

### 3. 广泛的采用

Webpack 被大多数主流框架和项目使用，社区支持非常好。

## 详细对比

### 开发体验

**Vite 的优势：**
- 更快的冷启动
- 更快的热更新
- 更简单的配置

**Webpack 的优势：**
- 更成熟的生态系统
- 更丰富的插件
- 更好的大型项目支持

### 性能

**开发环境：**
- Vite 明显更快，特别是对于大型项目
- Webpack 在首次构建后也能提供不错的性能

**生产构建：**
- Vite 使用 Rollup，输出通常更小
- Webpack 经过多年优化，输出也非常高效

### 配置复杂度

**Vite：**
- 默认配置已经很好
- 配置文件通常更简单

**Webpack：**
- 配置可能非常复杂
- 需要更多的学习和调试时间

### 生态系统和社区

**Webpack：**
- 更大的插件生态系统
- 更多的教程和资源
- 更长的历史记录

**Vite：**
- 快速增长的生态系统
- 现代化的设计理念
- 被 Vue 和 React 等框架官方推荐

## 如何选择

### 选择 Vite 如果：
- 你正在开始一个新项目
- 你重视开发体验和速度
- 你使用 Vue、React 或 Svelte 等现代框架
- 你想要更简单的配置

### 选择 Webpack 如果：
- 你有一个现有的大型项目
- 你需要高度定制的构建流程
- 你依赖特定的 Webpack 插件
- 你需要支持非常旧的浏览器

## 结论

Vite 和 Webpack 都是优秀的构建工具，各有优势。对于大多数新项目，Vite 可能是更好的选择，因为它提供了更好的开发体验。但是，Webpack 仍然是一个可靠的选择，特别是对于有特定需求的大型项目。

重要的是要根据你的具体需求和项目情况来选择，而不是盲目跟风。`,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Vite%20vs%20Webpack%20comparison%20concept%20showing%20modern%20frontend%20build%20tools%20with%20code%20and%20performance%20metrics&image_size=landscape_16_9',
    author: '赵工程师',
    date: '2026-04-05',
    category: '技术',
    readTime: '9 分钟'
  }
];

export function getBlogById(id: string): Blog | undefined {
  return blogs.find(blog => blog.id === id);
}

export function getRelatedBlogs(currentId: string, limit: number = 3): Blog[] {
  return blogs
    .filter(blog => blog.id !== currentId)
    .slice(0, limit);
}
