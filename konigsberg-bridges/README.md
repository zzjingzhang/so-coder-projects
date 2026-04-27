# 哥尼斯堡七桥问题 - 交互式教育游戏

一个基于 React + Vite + TypeScript 构建的交互式教育游戏，让用户体验经典的哥尼斯堡七桥问题，理解图论的基本原理。

## 项目简介

哥尼斯堡七桥问题是18世纪著名的数学问题。普雷格尔河流经哥尼斯堡城，将城市分为四个区域，七座桥连接着这些区域。问题是：能否从任意一个区域出发，穿过每座桥恰好一次，最后回到起点？

瑞士数学家莱昂哈德·欧拉在1736年证明了这是不可能的，从而开创了图论这一数学分支。

## 技术栈

- **框架**: React 19
- **构建工具**: Vite 8
- **语言**: TypeScript
- **样式**: 原生 CSS (支持 CSS 动画)
- **图形**: HTML5 Canvas (水波纹动画) + SVG (游戏界面)

## 项目结构

```
konigsberg-bridges/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── ControlPanel.css
│   │   ├── ControlPanel.tsx       # 控制按钮组件（撤销、重置、提示）
│   │   ├── Footer.css
│   │   ├── Footer.tsx             # 底部版权信息组件
│   │   ├── GameBoard.css
│   │   ├── GameBoard.tsx          # 游戏主界面（四区域、七桥）
│   │   ├── MessageToast.css
│   │   ├── MessageToast.tsx       # 顶部消息提示组件
│   │   ├── WaterBackground.css
│   │   └── WaterBackground.tsx     # 水波纹动画背景组件
│   ├── hooks/
│   │   ├── useGameLogic.ts        # 游戏逻辑 hook（移动、撤销、重置）
│   │   └── useSecurity.ts         # 安全限制 hook
│   ├── types/
│   │   └── index.ts               # TypeScript 类型定义
│   ├── App.css
│   ├── App.tsx                    # 主应用组件
│   ├── index.css
│   └── main.tsx                   # 应用入口
├── .gitignore
├── README.md
├── eslint.config.js
├── index.html
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## 功能特性

### 🎮 游戏功能
- **起点选择**: 用户可以选择四个区域（A岛、B岛、C岸、D岸）之一作为起点
- **桥梁移动**: 点击可通行的桥梁进行移动
- **撤销功能**: 完整的历史记录撤销功能
- **重置功能**: 一键重置游戏状态
- **提示功能**: 显示七桥问题的数学原理解释

### 🎨 视觉效果
- **水波纹动画背景**: 使用 Canvas 绘制动态水波纹效果，模拟河流
- **脉动效果**: 当前位置显示红色脉动小球
- **虚线动画**: 已走过的桥梁显示虚线动画
- **平滑过渡**: 所有交互都有平滑的 CSS 过渡动画

### 🔒 安全限制
- 禁止右键菜单
- 禁止 F12 开发者工具
- 禁止 Ctrl+Shift+I 打开控制台
- 禁止 Ctrl+U 查看源代码
- 版权信息保护

### 💬 反馈系统
- 顶部弹出消息框，提供即时反馈
- 多种消息类型：信息、成功、错误、警告
- 消息自动 5 秒后消失

## 游戏规则

1. **选择起点**: 点击任意区域（A岛、B岛、C岸或D岸）选择起点
2. **移动**: 点击与当前位置相连的桥梁进行移动
3. **限制**: 每座桥只能走一次
4. **目标**: 尝试穿过所有 7 座桥

**提示**: 这个问题实际上是**无解**的！点击"提示"按钮了解图论原理。

## 数学原理

根据欧拉的**欧拉路径定理**（Eulerian Path Theorem）：

一个图存在**欧拉路径**（每条边恰好经过一次）的条件是：
- 图是连通的
- 图中**奇数度**的顶点数量必须是 **0** 或 **2**

在七桥问题中，四个区域的度数（连接的桥梁数）为：
- **A岛**: 5 座桥（奇数）
- **B岛**: 3 座桥（奇数）
- **C岸**: 3 座桥（奇数）
- **D岸**: 3 座桥（奇数）

共有 **4 个**奇数度顶点，所以**不存在这样的路径**！

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

项目将在 `http://localhost:5173` 启动（或其他可用端口）。

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

## 浏览器兼容性

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 注意事项

- 应用包含安全限制，禁止使用开发者工具
- 右键菜单已禁用
- 建议在现代浏览器中运行以获得最佳体验

## 学习资源

- [欧拉路径与欧拉回路](https://zh.wikipedia.org/wiki/欧拉路径)
- [哥尼斯堡七桥问题](https://zh.wikipedia.org/wiki/柯尼斯堡七桥问题)
- [图论入门](https://zh.wikipedia.org/wiki/图论)

## 许可证

本项目仅用于教育目的。
