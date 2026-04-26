# Shortly - URL 缩短工具

一个功能完整的响应式 URL 缩短前端应用，使用 React + TypeScript + Vite 构建。

## 项目简介

Shortly 是一个现代化的 URL 缩短工具，提供以下功能：
- 快速将长 URL 转换为短链接
- 一键复制短链接到剪贴板
- 响应式设计，适配桌面和移动设备
- 优雅的用户界面和流畅的交互体验

## 技术栈

- **React 19** - 用于构建用户界面
- **TypeScript** - 提供类型安全
- **Vite** - 快速的前端构建工具
- **Tailwind CSS** - 实用优先的 CSS 框架
- **Shrtco.de API** - 用于 URL 缩短的外部 API

## 项目结构

```
url-shortener/
├── public/
│   ├── assets/
│   │   ├── bg-boost-desktop.svg      # Boost 区块桌面版背景
│   │   ├── bg-boost-mobile.svg       # Boost 区块移动端背景
│   │   ├── bg-shorten-desktop.svg    # 缩短表单桌面版背景
│   │   ├── bg-shorten-mobile.svg     # 缩短表单移动端背景
│   │   ├── icon-brand-recognition.svg # 品牌识别图标
│   │   ├── icon-detailed-records.svg  # 详细记录图标
│   │   ├── icon-fully-customizable.svg # 完全可定制图标
│   │   └── illustration-working.svg   # Hero 区域插图
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── AdvancedStatistics.tsx     # 高级统计区块组件
│   │   ├── AdvancedStatistics.css
│   │   ├── BoostCTA.tsx               # Boost CTA 区块组件
│   │   ├── BoostCTA.css
│   │   ├── Footer.tsx                 # 页脚组件
│   │   ├── Footer.css
│   │   ├── Hero.tsx                   # Hero 区域组件
│   │   ├── Hero.css
│   │   ├── Navbar.tsx                 # 导航栏组件
│   │   ├── Navbar.css
│   │   ├── UrlShortener.tsx           # URL 缩短表单组件
│   │   └── UrlShortener.css
│   ├── types/
│   │   └── index.ts                   # 类型定义
│   ├── utils/
│   │   └── urlShortener.ts            # URL 缩短工具函数
│   ├── App.css
│   ├── App.tsx                        # 主应用组件
│   ├── index.css
│   └── main.tsx                       # 入口文件
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

## 功能特性

1. **响应式导航栏**
   - 桌面版显示完整菜单
   - 移动端使用汉堡图标展开/收起菜单

2. **Hero 区域**
   - 展示大标题和描述文字
   - 包含圆形 CTA 按钮

3. **URL 缩短功能**
   - 输入长链接后点击 "Shorten It!" 按钮
   - 调用 `https://api.shrtco.de/v2/shorten` API 获取短链
   - 成功后展示原始链接和短链
   - 点击 "Copy" 按钮复制短链，2 秒内显示 "Copied!" 状态
   - 输入无效或 API 错误时显示错误提示，并给输入框添加错误样式

4. **Advanced Statistics 区块**
   - 三张功能卡片：品牌识别、详细记录、完全可定制
   - 卡片之间用横向连线连接

5. **Boost CTA 区块**
   - 使用背景图片
   - 居中展示 "Get Started" 按钮

6. **页脚**
   - 多列链接：Features、Resources、Company
   - 社交媒体图标

## 安装和运行

### 前置要求

确保你的系统已经安装了以下工具：
- Node.js (推荐使用 18.x 或更高版本)
- npm (通常随 Node.js 一起安装)

### 安装依赖

```bash
cd url-shortener
npm install
```

### 启动开发服务器

```bash
npm run dev
```

应用将在 `http://localhost:5173/` 上运行。

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

## API 集成

本项目使用 [shrtco.de API](https://shrtco.de/) 来缩短 URL。API 调用是通过 `src/utils/urlShortener.ts` 中的 `shortenUrl` 函数实现的。

API 端点：`https://api.shrtco.de/v2/shorten?url={encoded_url}`

## 自定义配置

### Tailwind 配置

你可以在 `tailwind.config.js` 中自定义颜色、字体等：

```js
theme: {
  extend: {
    colors: {
      primary: '#2acfcf',
      'primary-hover': '#9be3e3',
      secondary: '#3b3054',
      // ... 更多颜色
    },
  },
}
```

## 浏览器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 许可证

MIT License
