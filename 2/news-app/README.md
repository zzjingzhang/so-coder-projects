# 新闻应用 (News App)

一个基于 NewsAPI 的现代化新闻阅读应用，提供来自全球各地的最新新闻资讯。

## 功能特性

- 📰 显示来自 NewsAPI 的热门头条新闻
- 📱 响应式布局，适配桌面端和移动端
- 🗂️ 侧导航抽屉，按类别列出可用新闻源
- 🎴 文章卡片展示，包含图像、标题、描述和源名称
- 🔗 社交分享图标（微信、微博、Twitter）
- 📖 "阅读更多"按钮，链接到原始文章
- ✨ 滚动动画和交互动画效果
- 🎨 遵循 Material Design 设计原则

## 技术栈

- **框架**: Vue 3 (Composition API)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **UI 组件库**: Ant Design Vue
- **路由**: Vue Router
- **打包工具**: Vite
- **数据来源**: NewsAPI

## 项目结构

```
news-app/
├── public/                     # 静态资源目录
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/                # 资源文件
│   ├── components/            # 组件目录
│   │   ├── AppFooter.vue      # 页脚组件
│   │   ├── ArticleCard.vue    # 文章卡片组件
│   │   └── NavigationDrawer.vue  # 导航抽屉组件
│   ├── router/                # 路由配置
│   │   └── index.ts
│   ├── services/              # 服务层
│   │   └── newsApi.ts         # NewsAPI 服务
│   ├── types/                 # 类型定义
│   │   └── index.ts
│   ├── views/                 # 视图组件
│   │   └── HomeView.vue       # 主页视图
│   ├── App.vue                 # 根组件
│   ├── main.ts                 # 入口文件
│   └── style.css               # 全局样式
├── index.html                  # HTML 模板
├── package.json                # 项目依赖
├── postcss.config.js           # PostCSS 配置
├── tailwind.config.js          # Tailwind CSS 配置
├── tsconfig.json               # TypeScript 配置
└── vite.config.ts              # Vite 配置
```

## 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装依赖

```bash
npm install
```

### 配置 NewsAPI 密钥

1. 访问 [NewsAPI 官网](https://newsapi.org) 注册账号并获取免费 API 密钥
2. 打开 `src/services/newsApi.ts` 文件
3. 将 `YOUR_NEWSAPI_KEY_HERE` 替换为您的实际 API 密钥：

```typescript
const API_KEY = 'your_actual_api_key_here';
```

> 注意：如果没有配置 API 密钥，应用将使用模拟数据进行展示。

### 开发模式

```bash
npm run dev
```

应用将在 `http://localhost:5173` 启动。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 预览生产版本

```bash
npm run preview
```

## 主要组件说明

### NavigationDrawer.vue
- 提供侧导航抽屉和顶部工具栏
- 支持响应式布局（移动端抽屉，桌面端侧边栏）
- 按类别显示新闻源列表
- 支持新闻源切换

### ArticleCard.vue
- 展示单篇文章的卡片组件
- 包含文章图片、标题、描述、源名称
- 支持社交分享（微信、微博、Twitter）
- 提供"阅读更多"按钮
- 实现滚动动画效果

### AppFooter.vue
- 应用页脚组件
- 包含快速链接、联系信息
- 社交媒体图标

### HomeView.vue
- 主页视图
- 整合所有组件
- 管理数据加载和状态
- 实现响应式布局

## 特性详情

### 响应式布局
- 桌面端：左侧固定侧边栏 + 主内容区
- 平板端：可切换抽屉导航
- 移动端：全屏抽屉 + 网格布局

### 动画效果
- 卡片滚动淡入动画
- 卡片悬停上浮效果
- 抽屉平滑切换动画
- 加载骨架屏动画

### Material Design
- 使用 Ant Design Vue 组件库
- 卡片阴影和层级效果
- 统一的配色方案
- 清晰的视觉层次

## License

MIT

## 贡献

欢迎提交 Issue 和 Pull Request！
