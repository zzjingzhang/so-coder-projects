# ⏱️ Stopwatch App

一款功能丰富的秒表应用程序，支持暗模式、快照记录和多种动画效果。

## ✨ 功能特性

- **高精度计时**: 使用 `requestAnimationFrame` 实现毫秒级精度计时
- **快照功能**: 记录拍摄快照时的时间以及自启动以来的时间
- **Lap时间**: 显示相邻快照之间的间隔时间
- **暗模式**: 支持亮色/暗色主题切换，自动保存用户偏好
- **丰富动画**: 包含时间跳动、脉冲、涟漪、滑入等多种动画效果
- **响应式设计**: 适配各种屏幕尺寸

## 🛠️ 技术栈

- **框架**: Angular 19
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **UI组件库**: PrimeNG
- **路由**: Angular Router
- **打包**: Angular CLI Application Builder

## 📁 项目结构

```
stopwatch-app/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── stopwatch/
│   │   │       ├── stopwatch.component.ts
│   │   │       ├── stopwatch.component.html
│   │   │       └── stopwatch.component.css
│   │   ├── services/
│   │   │   └── theme.service.ts
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.css
│   │   ├── app.module.ts
│   │   └── app-routing.module.ts
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── angular.json
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
└── README.md
```

## 🚀 快速开始

### 前提条件

确保你的开发环境已安装：
- Node.js (推荐 v18 或更高版本)
- npm (通常随 Node.js 一起安装)
- Angular CLI (`npm install -g @angular/cli`)

### 安装依赖

```bash
cd stopwatch-app
npm install
```

### 启动开发服务器

```bash
npm start
# 或者
ng serve
```

应用将在 `http://localhost:4200` 启动。

### 构建生产版本

```bash
npm run build
# 或者
ng build
```

构建产物将输出到 `dist/stopwatch-app/` 目录。

### 运行测试

```bash
npm test
# 或者
ng test
```

## 📖 使用说明

### 基本操作

1. **开始计时**: 点击绿色的 "Start" 按钮开始计时
2. **暂停计时**: 点击黄色的 "Pause" 按钮暂停计时
3. **继续计时**: 暂停后点击 "Start" 按钮继续计时
4. **重置秒表**: 点击红色的 "Reset" 按钮重置所有时间和快照
5. **拍摄快照**: 点击蓝色的 "Snapshot" 按钮记录当前时间

### 快照功能

每个快照记录以下信息：
- **自启动时间**: 从秒表启动到拍摄快照的总时间
- **Lap时间**: 与上一个快照之间的时间间隔
- **Wall时间**: 拍摄快照的实际时间（系统时间）

### 主题切换

- 点击右上角的 🌙 图标切换到暗模式
- 点击右上角的 ☀️ 图标切换到亮模式
- 主题偏好会自动保存到本地存储

### 动画效果

- **运行中**: 分钟和秒数字会有轻微的弹跳动画
- **暂停时**: 计时圆盘会有缓慢的脉冲效果
- **点击按钮**: 按钮会有缩放和涟漪效果
- **新增快照**: 快照项会有滑入动画

## 🎨 设计特点

### 色彩方案

- **亮色模式**: 浅蓝到淡紫的渐变背景，白色半透明卡片
- **暗色模式**: 深灰到灰黑的渐变背景，深色半透明卡片
- **按钮配色**:
  - 开始: 绿色渐变
  - 暂停: 黄色渐变
  - 快照: 蓝色渐变
  - 重置: 红色渐变

### 响应式布局

- 移动端: 单列布局，按钮自适应
- 平板/桌面: 居中卡片，最大宽度限制
- 使用 Tailwind CSS 的响应式工具类

## 🔧 配置说明

### Tailwind CSS 配置

在 `tailwind.config.js` 中配置了：
- 自定义动画: `pulse-slow`, `bounce-slow`, `fade-in`, `slide-up`, `scale-in`
- 暗色模式支持: `darkMode: 'class'`

### PrimeNG 配置

在 `angular.json` 中配置了 PrimeNG 的：
- 默认主题: `lara-light-blue`
- 核心样式: `primeng.min.css`

## 📝 开发说明

### 服务

- **ThemeService**: 管理主题切换，使用 RxJS BehaviorSubject 发布状态

### 组件

- **StopwatchComponent**: 主秒表组件，包含所有计时逻辑和UI

### 性能优化

- 使用 `requestAnimationFrame` 而非 `setInterval` 进行计时更新
- 使用 `trackBy` 优化 `*ngFor` 渲染
- 组件销毁时清理动画帧

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！
