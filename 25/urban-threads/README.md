# Urban Threads - 城市街头服饰品牌网站

一个现代化的城市街头服饰品牌网站，采用大胆的黑白主视觉设计，以鲜艳的红色点缀，并添加了丰富的交互式悬停效果。

## 项目概述

Urban Threads 是一个基于 Vue 3 + TypeScript + Vite 构建的街头服饰品牌展示网站，致力于展现街头文化与时尚设计的完美融合。

### 设计特点

- **黑白主视觉**：采用经典的黑白配色方案，营造出强烈的视觉冲击力
- **红色点缀**：以鲜艳的红色作为强调色，突出关键元素和交互按钮
- **交互式悬停效果**：丰富的悬停动画和过渡效果，提升用户体验
- **响应式设计**：完美适配各种屏幕尺寸，从移动端到桌面端

## 技术栈

- **框架**：Vue 3 (Composition API)
- **语言**：TypeScript
- **样式**：Tailwind CSS 4
- **UI 组件库**：Ant Design Vue
- **路由**：Vue Router
- **状态管理**：Pinia
- **打包工具**：Vite

## 项目结构

```
urban-threads/
├── public/                 # 静态资源
├── src/
│   ├── assets/           # 资源文件
│   ├── components/       # 组件目录
│   │   ├── CollectionSection.vue    # 系列展示组件
│   │   ├── FeaturedSection.vue      # 精选商品组件
│   │   ├── FooterComponent.vue      # 页脚组件
│   │   ├── HeaderComponent.vue      # 头部导航组件
│   │   ├── HeroSection.vue            # 主页横幅组件
│   │   ├── NewsletterSection.vue  # 邮件订阅组件
│   │   └── HelloWorld.vue            # 示例组件
│   ├── router/             # 路由配置
│   │   └── index.ts
│   ├── views/              # 页面视图
│   │   ├── AboutView.vue        # 关于我们页面
│   │   ├── ContactView.vue    # 联系我们页面
│   │   ├── HomeView.vue          # 首页
│   │   └── ProductsView.vue    # 商品页面
│   ├── App.vue              # 根组件
│   ├── main.ts              # 入口文件
│   └── style.css            # 全局样式
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

## 页面路由

| 路由路径 | 页面名称 | 描述 |
|-----------|----------|------|
| `/` | 首页 | 品牌主页，包含英雄区域、精选商品、系列展示等 |
| `/products` | 商品页面 | 展示所有商品列表 |
| `/about` | 关于我们 | 品牌故事、价值观介绍 |
| `/contact` | 联系我们 | 联系表单和联系信息 |

## 核心组件

### 布局组件

- **HeaderComponent**：响应式导航栏，支持移动端菜单
- **FooterComponent**：包含导航链接、社交媒体、版权信息

### 首页区域组件

- **HeroSection**：主页横幅，包含品牌标语和行动按钮
- **FeaturedSection**：精选商品展示区域
- **CollectionSection**：系列分类展示
- **NewsletterSection**：邮件订阅区域

## 安装与运行

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

项目将在 `http://localhost:5173/` 启动（端口可能会根据实际情况调整）。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 预览生产版本

```bash
npm run preview
```

## 设计规范

### 配色方案

- **主色**：黑色 (#000000)、白色 (#FFFFFF)
- **强调色**：红色 (#EF4444)、悬停红色 (#DC2626)
- **中性色**：从浅灰 (#F3F4F6) 到深灰 (#111827)

### 字体

- **默认字体**：Inter, system-ui, sans-serif
- **标题字体**：Oswald, Impact, sans-serif

### 交互效果

- **按钮悬停**：颜色变化、缩放效果
- **卡片悬停**：图片缩放、内容淡入
- **导航链接**：下划线动画
- **系列卡片**：内容上移、描述淡入

## 开发指南

### 添加新页面

1. 在 `src/views/` 目录下创建新的页面组件
2. 在 `src/router/index.ts` 中添加路由配置
3. 在 `HeaderComponent.vue` 和 `FooterComponent.vue` 中添加导航链接（如需要）

### 添加新组件

1. 在 `src/components/` 目录下创建新组件
2. 使用 `<script setup lang="ts">` 语法
3. 遵循现有的组件命名规范

### 样式开发

- 使用 Tailwind CSS 4 的 CSS-first 配置方式
- 在 `src/style.css` 中定义主题变量
- 使用 `@theme` 指令扩展 Tailwind 主题

## 许可证

MIT License

## 联系方式

如有问题或建议，请通过以下方式联系：

- 邮箱：info@urbanthreads.com
- 网站：https://urbanthreads.com

---

© 2026 Urban Threads. 保留所有权利。
