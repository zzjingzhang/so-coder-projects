# 个人网站生成器

一个功能强大的个人网站生成器，帮助用户快速创建精美的个人展示网站。

## 项目简介

该应用允许用户通过简单的表单输入个人信息（姓名、爱好、个人简介）并上传图片，然后一键生成一个完整的个人展示网站。生成的网站包含多个章节，具备响应式布局、主题切换、滚动交互等丰富功能。

## 项目结构

```
portfolio-generator/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components/
│   │   ├── BackToTop.tsx       # 返回顶部按钮组件
│   │   ├── Carousel.tsx        # 轮播组件（作品集、推荐语）
│   │   ├── LoadingSpinner.tsx  # 加载提示组件
│   │   └── Navbar.tsx          # 导航栏组件
│   ├── contexts/
│   │   └── ThemeContext.tsx    # 主题上下文（暗/亮主题切换）
│   ├── mock/
│   │   └── index.ts            # Mock 数据
│   ├── pages/
│   │   ├── GeneratorPage.tsx   # 表单页面（输入信息）
│   │   └── PortfolioPage.tsx   # 生成的个人网站页面
│   ├── types/
│   │   └── index.ts            # TypeScript 类型定义
│   ├── App.css
│   ├── App.tsx                 # 主应用组件（路由配置）
│   ├── index.css               # 全局样式（Tailwind CSS）
│   └── main.tsx                # 应用入口
├── .gitignore
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## 技术栈

### 核心框架
- **React 19** - 最新的 React 版本
- **TypeScript** - 类型安全的 JavaScript
- **Vite** - 下一代前端构建工具

### 路由
- **React Router v7** - 声明式路由管理

### 样式
- **Tailwind CSS v4** - 原子化 CSS 框架
- **@tailwindcss/vite** - Tailwind CSS Vite 插件

### 图标库
- **Lucide React** - 轻量级的图标库

## 功能特性

### 表单页面
- ✅ 个人信息输入（姓名、爱好、个人简介）
- ✅ 图片上传（主页照片、关于我的照片）
- ✅ 表单验证
- ✅ 图片预览和删除
- ✅ 加载状态显示

### 生成的个人网站
- ✅ **首页** - 个人介绍、社交媒体链接
- ✅ **关于** - 详细介绍、统计数据
- ✅ **技能** - 技能展示、进度条
- ✅ **服务** - 服务项目介绍
- ✅ **作品集** - 项目展示（轮播效果）
- ✅ **推荐语** - 客户评价（轮播效果）
- ✅ **联系** - 联系方式、留言表单

### 交互效果
- ✅ **响应式布局** - 完美适配手机、平板、桌面
- ✅ **暗/亮主题切换** - 支持系统偏好和手动切换
- ✅ **导航菜单** - 移动端汉堡菜单、滚动高亮
- ✅ **滚动高亮** - 自动高亮当前浏览的章节
- ✅ **返回顶部按钮** - 滚动时显示
- ✅ **平滑滚动** - 点击导航链接平滑滚动
- ✅ **轮播效果** - 作品集和推荐语支持自动播放和手动导航

## 快速开始

### 安装依赖

```bash
npm install
```

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

### 代码检查

```bash
npm run lint
```

## 使用说明

1. **访问应用** - 打开浏览器访问开发服务器地址
2. **填写信息** - 在表单页面输入您的姓名、爱好、个人简介
3. **上传图片** - 点击图片上传区域选择您的照片
4. **生成网站** - 点击"生成网站"按钮
5. **查看效果** - 系统会展示加载状态，然后跳转到生成的个人网站
6. **交互体验** - 尝试主题切换、滚动导航、轮播等功能

## Mock 数据

项目包含完整的 Mock 数据，位于 `src/mock/index.ts`：

- **defaultUserProfile** - 默认用户资料
- **skills** - 技能数据（8项）
- **services** - 服务数据（6项）
- **portfolioItems** - 作品集数据（6项）
- **testimonials** - 推荐语数据（4项）
- **navItems** - 导航菜单项
- **socialLinks** - 社交媒体链接
- **contactInfo** - 联系信息

您可以根据需要修改这些数据来自定义内容。

## 主题配置

项目使用 Tailwind CSS v4 的 `@theme` 指令定义主题变量，位于 `src/index.css`：

### 颜色变量

**主色调：**
- `--color-primary: #6366f1` (靛蓝)
- `--color-primary-dark: #4f46e5`
- `--color-secondary: #ec4899` (粉红)
- `--color-accent: #8b5cf6` (紫色)

**亮色模式：**
- `--color-light-bg: #ffffff`
- `--color-light-surface: #f8fafc`
- `--color-light-text: #1e293b`

**暗色模式：**
- `--color-dark-bg: #0f172a`
- `--color-dark-surface: #1e293b`
- `--color-dark-text: #f1f5f9`

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 许可证

MIT License
