# 翻转时钟番茄计时器

一个基于 Vue 3 + Vite 构建的现代化翻转时钟番茄计时器应用，帮助学生提高学习效率。

## 项目简介

番茄工作法（Pomodoro Technique）是一种时间管理方法，使用计时器来将工作分成多个间隔，每个间隔称为一个"番茄时间"，通常为 25 分钟专注工作，然后是 5 分钟的休息时间。

本项目实现了一个美观的翻转时钟风格的番茄计时器，具有以下特点：
- 精美的翻转时钟动画效果
- 三种计时模式：专注工作、短暂休息、长时间休息
- 简洁现代的 UI 设计
- 响应式布局，适配各种屏幕尺寸
- 番茄钟完成计数功能

## 技术栈

- **前端框架**: Vue 3 (Composition API)
- **构建工具**: Vite
- **编程语言**: JavaScript
- **样式框架**: Tailwind CSS 4
- **UI 组件库**: Ant Design Vue 4
- **路由管理**: Vue Router 4

## 项目结构

```
flip-clock-pomodoro/
├── public/                  # 静态资源目录
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/             # 资源文件
│   │   ├── hero.png
│   │   ├── vite.svg
│   │   └── vue.svg
│   ├── components/         # 组件目录
│   │   ├── FlipClockPomodoro.vue   # 番茄计时器核心组件
│   │   └── FlipDigit.vue            # 翻转数字组件
│   ├── router/             # 路由配置
│   │   └── index.js
│   ├── views/              # 视图组件
│   │   └── HomeView.vue
│   ├── App.vue             # 根组件
│   ├── main.js             # 入口文件
│   └── style.css           # 全局样式
├── .gitignore
├── index.html              # HTML 入口
├── package.json            # 依赖配置
├── README.md               # 项目说明文档
└── vite.config.js          # Vite 配置
```

## 功能特性

### 1. 多种计时模式
- **专注工作**: 25 分钟专注学习/工作时间
- **短暂休息**: 5 分钟短休息
- **长时间休息**: 15 分钟长休息（每完成 4 个番茄钟后）

### 2. 翻转时钟动画
- 数字变化时展示流畅的 3D 翻转动画
- 渐变背景和阴影效果增强视觉层次感

### 3. 操作控制
- **开始/暂停**: 控制计时器运行
- **重置**: 重置当前模式的计时
- **模式切换**: 快速切换工作/休息模式

### 4. 统计功能
- 实时显示已完成的番茄钟数量
- 自动循环：工作完成后自动切换到休息模式

## 安装与运行

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装依赖

```bash
cd flip-clock-pomodoro
npm install
```

### 开发模式运行

```bash
npm run dev
```

运行后，访问控制台显示的本地地址（通常是 `http://localhost:5173`）即可在浏览器中查看应用。

### 生产环境构建

```bash
npm run build
```

构建完成后，生成的文件将位于 `dist` 目录中。

### 预览生产构建

```bash
npm run preview
```

## 使用说明

1. **选择模式**: 点击顶部的单选按钮选择需要的计时模式
   - 专注工作：25 分钟
   - 短暂休息：5 分钟
   - 长时间休息：15 分钟

2. **开始计时**: 点击"开始"按钮启动计时器

3. **暂停计时**: 点击"暂停"按钮暂停当前计时

4. **重置计时**: 点击"重置"按钮将计时器恢复到当前模式的初始时间

5. **自动切换**: 当专注时间结束后，会自动切换到休息模式；休息结束后自动切换回工作模式

## 开发说明

### 主要组件说明

- **`FlipDigit.vue`**: 实现单个数字的翻转动画效果
  - 使用 CSS 3D transforms 实现翻转动画
  - 监听 value 变化触发翻转动画

- **`FlipClockPomodoro.vue`**: 番茄计时器核心组件
  - 管理计时状态和逻辑
  - 集成 Ant Design Vue 组件（按钮、单选框、消息提示）
  - 实现三种计时模式的切换

### 样式说明

- 使用 Tailwind CSS 4 的 `@import "tailwindcss"` 方式引入
- 结合 Ant Design Vue 的组件样式
- 自定义了翻转动画的 keyframes

## 许可证

MIT License
