# 摆锤物理模拟器

一个基于 Vue 3 的交互式单摆物理模拟器，用于演示单摆运动的物理规律。

## 项目简介

本项目是一个教育性质的物理模拟器，通过可视化的方式展示单摆运动的物理规律。用户可以通过滑块调整摆长、质量、重力加速度和初始角度等参数，实时观察摆锤的运动变化，并查看动能、势能、总能量等物理量的实时数值。

## 技术栈

- **框架**: Vue 3 (Composition API)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **UI 组件库**: Naive UI
- **路由**: Vue Router
- **打包工具**: Vite

## 项目结构

```
pendulum-physics-simulator/
├── public/
│   ├── favicon.svg
│   └── vite.svg
├── src/
│   ├── components/
│   │   └── PendulumSimulator.vue  # 核心摆锤模拟器组件
│   ├── views/
│   │   └── HomeView.vue            # 主页面视图
│   ├── App.vue                      # 根组件
│   ├── main.ts                      # 入口文件
│   └── style.css                    # 全局样式
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

## 功能特性

1. **实时物理模拟**: 基于牛顿力学方程的精确物理计算
2. **交互式控制**: 通过滑块调整摆长、质量、重力加速度和初始角度
3. **可视化展示**: 使用 Canvas 渲染流畅的摆锤运动动画
4. **实时数据**: 显示当前角度、角速度、运行时间、动能、势能、总能量和振幅
5. **触摸支持**: 支持鼠标和触摸设备的交互操作
6. **物理公式**: 显示单摆运动的理论周期和相关物理公式

## 物理原理

单摆运动基于以下物理原理：

- **角加速度公式**: α = -(g/L)·sin(θ)
- **周期公式**: T = 2π√(L/g)

其中：
- θ 为摆角（弧度）
- L 为摆长（米）
- m 为质量（千克）
- g 为重力加速度（米/秒²）

## 安装和运行

### 前置要求

确保你的开发环境已经安装了：
- Node.js (版本 >= 16.0.0)
- npm 或 yarn 或 pnpm

### 安装依赖

```bash
npm install
# 或者
yarn install
# 或者
pnpm install
```

### 开发模式

```bash
npm run dev
# 或者
yarn dev
# 或者
pnpm dev
```

项目启动后，浏览器会自动打开 `http://localhost:3000`

### 构建生产版本

```bash
npm run build
# 或者
yarn build
# 或者
pnpm build
```

构建产物将输出到 `dist` 目录。

### 预览生产版本

```bash
npm run preview
# 或者
yarn preview
# 或者
pnpm preview
```

## 使用说明

1. **调整参数**: 使用右侧控制面板的滑块调整以下参数：
   - **摆长**: 0.5m - 3.0m
   - **质量**: 1.0kg - 10.0kg
   - **重力加速度**: 1.0m/s² - 20.0m/s²
   - **初始角度**: 5° - 85°（运行时不可调整）

2. **开始模拟**: 点击「开始」按钮启动摆锤运动

3. **暂停模拟**: 点击「暂停」按钮暂停当前运动状态

4. **重置模拟**: 点击「重置」按钮将摆锤恢复到初始状态

5. **拖动调整**: 你可以直接用鼠标或手指拖动摆锤来调整初始角度

## 注意事项

- 质量参数不影响单摆的运动周期（这是单摆的物理特性）
- 增大摆长会使运动变慢
- 增大会重力加速度会使运动变快
- 模拟器包含轻微的阻尼效果，使摆锤运动逐渐减速

## 开发说明

### 组件结构

- **PendulumSimulator.vue**: 核心组件，包含：
  - Canvas 渲染逻辑
  - 物理计算引擎
  - 动画循环
  - 鼠标/触摸事件处理

- **HomeView.vue**: 主页面，包含：
  - 参数控制面板
  - 滑块组件
  - 控制按钮
  - 物理公式展示

### 物理计算

物理计算使用数值积分方法，通过 `requestAnimationFrame` 实现流畅的动画效果。主要计算在 `updatePhysics` 函数中进行。

## License

MIT License
