# Avana LLC 官方网站

一个现代化的创意设计公司官网，使用 React + TypeScript + Tailwind CSS + Vite 构建。

## 项目简介

Avana LLC 是一家专注于创意设计和数字体验的专业团队。本项目是 Avana LLC 的官方网站，展示公司服务、作品集、博客文章和联系信息。

### 主要特点

- **响应式设计**：完美适配桌面端、平板和移动端
- **现代技术栈**：React 19 + TypeScript + Tailwind CSS v4
- **丰富动画**：基于 Intersection Observer 的滚动动画
- **多级导航**：桌面端悬停菜单，移动端手风琴展开
- **完整功能**：博客系统、作品展示、联系表单

## 技术栈

### 核心框架

- **React 19** - 前端框架
- **TypeScript** - 类型安全的 JavaScript
- **Vite** - 下一代前端构建工具

### 样式与 UI

- **Tailwind CSS v4** - 实用优先的 CSS 框架
- **shadcn/ui** - 基于 Tailwind CSS 的可定制组件库
- **Lucide React** - 现代化图标库

### 路由与状态

- **React Router v7** - 声明式路由库

### 开发工具

- **ESLint** - 代码质量检查
- **TypeScript ESLint** - TypeScript 特定的 lint 规则

## 项目结构

```
avana-llc/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/              # 静态资源
│   │   ├── hero.png
│   │   └── ...
│   ├── components/          # 通用组件
│   │   ├── Header.tsx       # 头部导航（含多级菜单）
│   │   ├── Footer.tsx       # 底部导航
│   │   ├── Layout.tsx       # 布局组件
│   │   ├── BlogCard.tsx     # 博客卡片组件
│   │   └── PortfolioCard.tsx # 作品集卡片组件
│   ├── data/                # 数据文件
│   │   ├── blogs.ts         # 博客数据
│   │   └── portfolio.ts     # 作品集数据
│   ├── hooks/               # 自定义 Hooks
│   │   └── useScrollAnimation.ts # 滚动动画 Hook
│   ├── lib/                 # 工具函数
│   │   └── utils.ts         # cn 合并类名函数
│   ├── pages/               # 页面组件
│   │   ├── Home.tsx         # 首页
│   │   ├── About.tsx        # 关于我们
│   │   ├── Blog.tsx         # 博客列表
│   │   ├── BlogDetail.tsx   # 博客详情
│   │   ├── PortfolioDetail.tsx # 作品详情
│   │   ├── Contact.tsx      # 联系我们
│   │   └── NotFound.tsx     # 404 页面
│   ├── routes/              # 路由配置
│   │   └── index.tsx        # 路由定义
│   ├── App.tsx              # 根组件
│   ├── index.css            # 全局样式（Tailwind 配置）
│   └── main.tsx             # 入口文件
├── index.html               # HTML 模板
├── package.json             # 依赖配置
├── tsconfig.json            # TypeScript 配置
├── vite.config.ts           # Vite 配置
└── README.md                # 项目说明
```

## 页面说明

| 页面 | 路径 | 描述 |
|------|------|------|
| 首页 | `/` | 公司介绍、服务展示、精选作品、客户评价、最新博客 |
| 关于我们 | `/about` | 公司介绍、价值观、团队成员、发展历程 |
| 博客列表 | `/blog` | 博客文章列表、搜索、分类筛选 |
| 博客详情 | `/blog/:id` | 单篇博客文章、分享功能、相关推荐 |
| 作品详情 | `/portfolio/:id` | 项目详情、图片画廊、技术栈 |
| 联系我们 | `/contact` | 联系表单、公司地图、联系方式 |
| 404 页面 | `*` | 页面未找到友好提示 |

## 功能特性

### 1. 多级导航菜单

- **桌面端**：悬停显示下拉菜单（服务、作品集）
- **移动端**：点击展开汉堡菜单，手风琴式展开子菜单
- **滚动效果**：滚动时添加背景模糊和阴影

### 2. 滚动动画效果

- 使用 `IntersectionObserver API` 实现
- 自定义 `useScrollAnimation` 和 `useScrollAnimationMulti` Hooks
- 支持单个元素和多个元素的依次出现动画

### 3. 响应式布局

- 移动端优先的设计理念
- 使用 Tailwind CSS 响应式前缀（`sm:`, `md:`, `lg:`）
- 适配从手机到大屏幕

### 4. 联系表单

- 表单验证（姓名、邮箱、电话、主题、留言）
- 加载状态和提交反馈
- 成功/错误提示
- 服务类型下拉选择

### 5. 自定义地图展示

- Google Maps 嵌入
- 自定义标记动画
- 地址、电话、工作时间信息展示

### 6. 博客系统

- 博客列表网格布局
- 搜索和分类筛选
- 热门文章侧边栏
- 文章详情页面包屑导航
- 分享功能

## 主题配置

### 主色调

项目使用红色 `#fb5353` 作为主色调：

```css
--primary: #fb5353;
--primary-light: #ff7a7a;
--primary-dark: #e04040;
```

### 颜色变量

在 `src/index.css` 中定义了完整的主题变量，支持亮色和暗色模式。

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0 或 pnpm/yarn

### 安装依赖

```bash
cd avana-llc
npm install
```

### 开发模式

启动本地开发服务器：

```bash
npm run dev
```

默认访问地址：`http://localhost:5173`

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist/` 目录。

### 预览生产版本

```bash
npm run preview
```

### 代码检查

```bash
npm run lint
```

## 路径别名

项目配置了路径别名，简化导入路径：

```typescript
// 传统方式
import { cn } from '../../lib/utils';

// 使用别名
import { cn } from '@/lib/utils';
```

`@/*` 指向 `src/` 目录。

## 开发规范

### 组件命名

- 使用 PascalCase 命名组件（如 `BlogCard.tsx`）
- 页面组件放置在 `pages/` 目录
- 通用组件放置在 `components/` 目录

### 样式规范

- 使用 Tailwind CSS 实用类
- 复杂样式使用 `@layer utilities` 或 `cn()` 函数
- 响应式优先使用 `sm:`, `md:`, `lg:` 前缀

### TypeScript 规范

- 所有组件使用函数组件 + TypeScript
- 接口使用 `interface` 而非 `type`
- 避免使用 `any`，使用 `unknown` 或泛型

## 浏览器支持

| 浏览器 | 版本 |
|--------|------|
| Chrome | >= 90 |
| Firefox | >= 88 |
| Safari | >= 14 |
| Edge | >= 90 |

## 性能优化

- **路由懒加载**：使用 `lazy()` 和 `Suspense` 实现按需加载
- **图片优化**：使用适当格式和尺寸
- **动画性能**：使用 `transform` 和 `opacity` 属性
- **代码分割**：Vite 自动进行代码分割

## 部署

### 静态站点部署

项目可以部署到任何支持静态文件托管的平台：

- **Vercel**：推荐，自动检测 Vite 项目
- **Netlify**：简单易用的部署平台
- **Cloudflare Pages**：免费且快速
- **GitHub Pages**：适合开源项目
- **传统服务器**：Nginx、Apache 等

### 部署命令示例（Vercel）

```bash
npm install -g vercel
vercel
```

## 相关链接

- [React 官方文档](https://react.dev/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [Tailwind CSS 文档](https://tailwindcss.com/)
- [Vite 官方文档](https://vitejs.dev/)
- [React Router 文档](https://reactrouter.com/)
- [shadcn/ui 文档](https://ui.shadcn.com/)
- [Lucide 图标](https://lucide.dev/)

## 更新日志

### v1.0.0 (2024)

- 初始版本发布
- 完整的 7 个页面实现
- 响应式布局
- 多级导航菜单
- 滚动动画效果
- 联系表单功能
- 自定义地图展示

## 许可证

本项目仅供 Avana LLC 使用。

## 联系方式

- **邮箱**：hello@avana-llc.com
- **电话**：+86 21 8888 8888
- **地址**：上海市浦东新区世纪大道 1000 号环球金融中心 28 层

---

**Avana LLC** - 创意驱动，设计未来
