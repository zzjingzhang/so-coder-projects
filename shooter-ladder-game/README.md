# 🎮 射击和梯子游戏 (Shooter & Ladder Game)

一个基于 Vue 3 + TypeScript + Tailwind CSS 的双游戏项目，包含射击游戏（玩家控制）和梯子游戏（AI 机器人自动游玩），采用移动优先设计，支持触摸交互。

## 📁 项目结构

```
shooter-ladder-game/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── vite.svg
│   │   └── vue.svg
│   ├── components/
│   │   ├── GameMenu.vue      # 游戏主菜单
│   │   ├── ShooterGame.vue    # 射击游戏（玩家控制）
│   │   └── LadderGame.vue     # 梯子游戏（AI机器人自动玩）
│   ├── router/
│   │   └── index.ts           # 路由配置
│   ├── types/
│   │   └── index.ts           # TypeScript 类型定义
│   ├── App.vue                # 根组件
│   ├── main.ts                # 入口文件
│   └── style.css              # 全局样式
├── .gitignore
├── index.html
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## 🛠️ 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| **Vue** | 3.x | 前端框架 |
| **TypeScript** | 5.x | 类型安全的 JavaScript |
| **Vite** | 6.x | 下一代前端构建工具 |
| **Tailwind CSS** | 4.x | 原子化 CSS 框架 |
| **Element Plus** | 2.x | Vue 3 UI 组件库 |
| **Vue Router** | 4.x | Vue 官方路由管理器 |

## 🎯 游戏介绍

### 🔫 射击游戏 (Shooter Game)

**玩家控制游戏**，支持触摸交互：
- **移动控制**：屏幕左侧的左右按钮控制角色水平移动
- **跳跃控制**：右侧绿色按钮让角色跳跃
- **射击控制**：右侧红色按钮发射子弹
- **游戏目标**：消灭所有敌人，收集金币，通过关卡

**游戏特性**：
- 物理引擎（重力、碰撞检测）
- 地面敌人和飞行敌人
- 平台跳跃系统
- 关卡递进机制
- 计分系统和生命值

### 🤖 梯子游戏 (Ladder Game)

**AI 机器人自动游玩**，观察模式：
- **智能路径寻找**：机器人会自动寻找最近的未收集金币
- **自动导航**：机器人会使用梯子在不同楼层间移动
- **攀爬系统**：支持在梯子上上下移动
- **目标追踪**：显示机器人当前目标位置的虚线

**游戏特性**：
- AI 决策系统（每 500ms 做一次决策）
- 多层平台结构
- 7 个梯子连接各层
- 10 个金币等待收集
- 能量系统和自动重开

## 📱 触摸交互设计

项目采用**移动优先设计**，所有游戏都支持触摸操作：

1. **触摸事件处理**：完整的 touchstart、touchmove、touchend 事件处理
2. **虚拟按钮**：屏幕底部的大尺寸触摸按钮，适合手指操作
3. **触摸反馈**：按钮按下时有视觉反馈
4. **防止误触**：按钮有足够间距，防止同时触发多个操作
5. **响应式设计**：游戏画布自动适应不同屏幕尺寸

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

```bash
cd shooter-ladder-game
npm install
```

### 开发模式

```bash
npm run dev
```

开发服务器启动后，打开浏览器访问显示的本地地址（通常是 `http://localhost:5173`）。

### 构建生产版本

```bash
npm run build
```

构建产物将生成在 `dist` 目录中。

### 预览生产版本

```bash
npm run preview
```

## 🎮 游戏操作指南

### 射击游戏操作

| 操作 | 按钮位置 | 说明 |
|------|----------|------|
| 向左移动 | 左下角 ← 按钮 | 按住持续向左移动 |
| 向右移动 | 左下角 → 按钮 | 按住持续向右移动 |
| 跳跃 | 右下角 跳 按钮 | 按下跳跃，支持平台跳跃 |
| 射击 | 右下角 射 按钮 | 按下发射子弹，有冷却时间 |

### 梯子游戏操作

这个游戏是**完全自动化**的！你只需要：
1. 点击"开始观察"按钮
2. 观看 AI 机器人如何智能地收集金币
3. 机器人会自动寻找路径、使用梯子、躲避掉落

## 🔧 项目配置

### Vite 配置 (vite.config.ts)

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
})
```

### Tailwind CSS 配置

使用 `@tailwindcss/vite` 插件，零配置即可使用 Tailwind CSS 4。

### 路由配置 (src/router/index.ts)

| 路径 | 组件 | 说明 |
|------|------|------|
| `/` | GameMenu | 游戏主菜单 |
| `/shooter` | ShooterGame | 射击游戏页面 |
| `/ladder` | LadderGame | 梯子游戏页面 |

## 🎨 设计特点

### 视觉设计

- **深色主题**：使用深色背景，减少眼睛疲劳
- **渐变色**：菜单使用渐变背景，增加视觉层次感
- **阴影效果**：卡片和按钮使用阴影，增加立体感
- **圆角设计**：使用圆角按钮和卡片，现代感更强

### 响应式设计

- **移动优先**：所有组件首先考虑移动端体验
- **弹性布局**：使用 Tailwind 的 flex 和 grid 布局
- **断点适配**：支持从手机到桌面的各种屏幕尺寸
- **触摸优化**：大按钮、足够间距、防止误触

## 📊 技术亮点

### 1. Canvas 游戏渲染

- 使用 HTML5 Canvas 进行高性能游戏渲染
- requestAnimationFrame 实现流畅动画
- 游戏循环分离更新和渲染逻辑

### 2. AI 决策系统

梯子游戏中的机器人采用简单但有效的 AI 系统：
- 最近邻居算法（寻找最近金币）
- 路径规划（寻找合适的梯子）
- 状态机（在平台上、在梯子上）

### 3. TypeScript 类型安全

- 完整的类型定义（Player、Enemy、Bullet、Platform 等）
- 编译时类型检查
- 更好的 IDE 支持和代码提示

### 4. Vue 3 Composition API

- 使用 `<script setup>` 语法糖
- 响应式状态管理（ref、reactive）
- 生命周期钩子（onMounted、onUnmounted）

## 🐛 故障排除

### 问题 1：游戏画面变形

**解决方案**：游戏画布会自动适应窗口大小，尝试调整浏览器窗口或刷新页面。

### 问题 2：触摸按钮无响应

**解决方案**：确保在移动设备或浏览器的响应式模式下测试。某些浏览器可能需要 `touch-action: manipulation` CSS 属性。

### 问题 3：构建失败

**解决方案**：
1. 确保 Node.js 版本 >= 18
2. 删除 `node_modules` 文件夹并重新运行 `npm install`
3. 检查控制台的具体错误信息

## 📝 更新日志

### v1.0.0 (2026-04-29)

- ✅ 初始化 Vue 3 + TypeScript + Vite 项目
- ✅ 集成 Tailwind CSS 4
- ✅ 集成 Element Plus UI 组件库
- ✅ 集成 Vue Router 4
- ✅ 创建射击游戏（ShooterGame.vue）
  - 玩家控制移动和射击
  - 敌人 AI 和碰撞检测
  - 触摸交互支持
- ✅ 创建梯子游戏（LadderGame.vue）
  - AI 机器人自动游玩
  - 路径寻找和智能决策
  - 梯子攀爬系统
- ✅ 创建游戏主菜单（GameMenu.vue）
  - 美观的渐变设计
  - 响应式布局
- ✅ 完整的 README 文档

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**享受游戏！** 🎮
