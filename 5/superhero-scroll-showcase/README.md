# Superhero Scroll Showcase

一个以超级英雄为主题的滚动动画展示 Web 应用程序。

## 技术栈

- **框架**: Angular 21
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **UI 组件库**: Angular Material
- **路由**: Angular Router
- **构建工具**: Angular CLI

## 项目结构

```
superhero-scroll-showcase/
├── src/
│   ├── app/
│   │   ├── app.ts                    # 主应用组件
│   │   ├── app.html                  # 主应用模板
│   │   ├── app.scss                  # 主应用样式
│   │   ├── app.config.ts             # 应用配置
│   │   ├── app.routes.ts             # 路由配置
│   │   ├── hero-card.component.ts    # 英雄卡片组件
│   │   ├── hero.model.ts             # 英雄数据模型
│   │   └── scroll-animate.directive.ts # 滚动动画指令
│   ├── styles.scss                   # 全局样式
│   ├── index.html
│   └── main.ts
├── tailwind.config.js                # Tailwind CSS 配置
├── postcss.config.js                 # PostCSS 配置
├── angular.json                      # Angular 配置
├── package.json
└── README.md
```

## 功能特性

✨ **滚动触发动画** - 使用 IntersectionObserver API 实现流畅的滚动动画
🎨 **响应式设计** - 完美适配桌面端和移动端
🚀 **高性能动画** - 使用 CSS transforms 和 transitions
🎭 **超级英雄主题** - 展示 6 位独特的超级英雄
📦 **生产级构建** - 优化的生产构建配置

## 快速开始

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm start
# 或者
npm run dev
```

访问 http://localhost:4200 查看应用

### 生产构建

```bash
npm run build
```

构建产物将输出到 `dist/superhero-scroll-showcase/` 目录

### 部署到 GitHub Pages

```bash
npm run deploy
```

这将自动构建并部署到 GitHub Pages

## 主要组件说明

### ScrollAnimateDirective

滚动动画指令，使用 IntersectionObserver 监测元素是否进入视口，触发动画效果。

### HeroCardComponent

英雄卡片组件，展示英雄信息，包括头像、名称、别名、描述和超能力。

### 数据模型

`Hero` 接口定义了英雄的数据结构，包含：
- id: 唯一标识
- name: 英雄名称
- alias: 别名
- powers: 超能力列表
- description: 描述
- color: 主题色
- image: 头像图片

## 动画效果

- **淡入上滑** - 默认动画效果
- **延迟加载** - 卡片依次出现的层次感
- **悬停效果** - 卡片悬浮和缩放效果
- **渐变背景** - 美观的渐变色设计

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 开发指南

### 添加新英雄

编辑 `src/app/hero.model.ts` 中的 `HEROES` 数组，添加新的英雄对象。

### 自定义动画

编辑 `tailwind.config.js` 中的动画配置，或修改 `src/styles.scss` 中的 CSS 类。

### 修改主题色

编辑 `tailwind.config.js` 中的 `colors` 配置，添加或修改颜色。

## License

MIT
