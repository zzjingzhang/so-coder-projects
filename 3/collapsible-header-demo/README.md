# Collapsible Header Demo

一个演示可折叠动画标题的 Angular 应用程序。

## 功能特性

- 🔄 可折叠动画标题，根据滚动位置改变高度
- 📱 响应式设计，支持 iOS 和 Android
- 🎬 平滑的文本和图像动画（移动、缩放、淡入淡出）
- 📜 垂直滚动列表，项目交替背景色
- ⚡ 滚动捕捉行为（Snap behavior）
- 📊 动画状态管理和计算服务

## 技术栈

- **框架**: Angular 21.2
- **语言**: TypeScript 5.9
- **样式**: Tailwind CSS 4.2
- **UI 组件库**: PrimeNG 21.1
- **路由**: Angular Router
- **打包方式**: Angular CLI Application Builder

## 项目结构

```
collapsible-header-demo/
├── public/                      # 静态资源
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── collapsible-header/    # 可折叠动画标题组件
│   │   │   │   ├── collapsible-header.component.ts
│   │   │   │   ├── collapsible-header.component.html
│   │   │   │   └── collapsible-header.component.css
│   │   │   └── scroll-list/          # 滚动列表组件
│   │   │       ├── scroll-list.component.ts
│   │   │       ├── scroll-list.component.html
│   │   │       └── scroll-list.component.css
│   │   ├── pages/
│   │   │   └── home/                 # 首页组件
│   │   │       ├── home.component.ts
│   │   │       ├── home.component.html
│   │   │       └── home.component.css
│   │   ├── services/
│   │   │   ├── scroll-state.service.ts   # 滚动状态管理服务
│   │   │   └── animation-calculator.service.ts  # 动画计算服务
│   │   ├── app-module.ts           # 应用模块
│   │   ├── app-routing-module.ts   # 路由模块
│   │   ├── app.ts                  # 根组件
│   │   ├── app.html
│   │   └── app.css
│   ├── main.ts                     # 入口文件
│   ├── styles.css                  # 全局样式
│   └── index.html
├── tailwind.config.js              # Tailwind CSS 配置
├── postcss.config.js               # PostCSS 配置
├── angular.json                    # Angular CLI 配置
├── package.json
└── README.md
```

## 核心服务说明

### ScrollStateService
管理滚动状态的服务，提供：
- 滚动位置和进度跟踪
- 滚动状态变化的 Observable 流
- 最大滚动范围和头部高度配置

### AnimationCalculatorService
动画计算实用函数，包括：
- `lerp()` - 线性插值
- `easeInOutQuad()` - 缓动函数
- `easeOutCubic()` - 缓动函数
- `easeInCubic()` - 缓动函数
- `calculateTransform()` - 根据进度计算变换值
- `calculateSnapOffset()` - 计算捕捉位置
- `getSnapPoints()` - 生成捕捉点

## 动画效果

### 标题折叠动画
- **高度**: 从 300px 折叠到 80px
- **背景图片**: 缩放从 1.2 → 1，上移 0 → -50px，透明度 1 → 0.8
- **标题**: 上移 0 → -30px，缩放 1 → 0.7
- **副标题**: 上移 0 → -20px，淡入淡出
- **Logo**: 反向动画，从隐藏变为显示

### 滚动捕捉
- 当用户停止滚动时，平滑地捕捉到最近的预定义位置
- 捕捉点包括顶部（0px）和每个项目的起始位置（100px + itemHeight）
- 300ms 的平滑滚动动画

## 安装和运行

### 1. 安装依赖

```bash
cd collapsible-header-demo
npm install
```

### 2. 开发模式启动

```bash
npm run dev
# 或者
npm start
```

应用将在 `http://localhost:4200` 启动。

### 3. 生产构建

```bash
npm run build
```

构建产物将输出到 `dist/` 目录。

### 4. 测试

```bash
npm run test
```

## 浏览器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)
- iOS Safari (iOS 14+)
- Android Chrome (Android 10+)

## 开发说明

### 添加新的动画效果

在 `AnimationCalculatorService` 中添加新的缓动函数或变换计算方法。

### 自定义滚动捕捉点

在 `ScrollListComponent` 中修改 `SNAP_OFFSET`、`ITEM_HEIGHT` 或 `calculateSnapPoints()` 方法。

### 调整动画参数

在 `CollapsibleHeaderComponent` 的 `updateAnimations()` 方法中修改变换配置对象。

## 许可证

MIT License
