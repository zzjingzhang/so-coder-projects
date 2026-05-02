# 勾股定理动画教学 (Pythagorean Theorem Animator)

一个用于教学勾股定理的交互式动画应用，包含直角三角形介绍、可视化面积转换动画、公式讲解、实际问题应用和互动练习功能。

## 项目简介

本项目是一个基于 Angular 框架开发的勾股定理教学应用，旨在通过直观的动画和互动练习帮助学习者理解勾股定理的核心概念和实际应用。

### 主要功能

- 📐 **直角三角形介绍** - 分步骤讲解直角三角形的基本概念和勾股定理的历史背景
- 🎬 **动画展示** - 可视化展示 a² + b² = c² 的面积转换过程，使用经典的 3-4-5 三角形进行演示
- 📝 **公式讲解** - 详细解释勾股定理的基本公式、变形形式、逆定理和常见勾股数
- 🏗️ **实际应用** - 展示勾股定理在建筑、导航、电子设备等领域的应用，包含交互式计算器
- ✅ **互动练习** - 通过选择题形式巩固所学知识，提供即时反馈和详细解析

## 技术栈

### 核心框架
- **Angular 17** - 前端框架，使用 Standalone Components 架构
- **TypeScript** - 开发语言
- **Angular Router** - 路由管理
- **Angular CLI Application Builder** - 项目构建工具

### UI 组件库
- **NG-ZORRO (Ant Design for Angular)** - UI 组件库
- **Tailwind CSS** - 实用优先的 CSS 框架

### 开发工具
- **Node.js & npm** - 运行环境和包管理器
- **Angular CLI** - 项目脚手架

## 项目结构

```
pythagorean-theorem-animator/
├── src/
│   ├── app/
│   │   ├── introduction/          # 直角三角形介绍页面
│   │   │   ├── introduction.component.ts
│   │   │   ├── introduction.component.html
│   │   │   └── introduction.component.css
│   │   ├── animation/             # 动画展示页面
│   │   │   ├── animation.component.ts
│   │   │   ├── animation.component.html
│   │   │   └── animation.component.css
│   │   ├── formula/               # 公式讲解页面
│   │   │   ├── formula.component.ts
│   │   │   ├── formula.component.html
│   │   │   └── formula.component.css
│   │   ├── application/           # 实际应用页面
│   │   │   ├── application.component.ts
│   │   │   ├── application.component.html
│   │   │   └── application.component.css
│   │   ├── quiz/                  # 互动练习页面
│   │   │   ├── quiz.component.ts
│   │   │   ├── quiz.component.html
│   │   │   └── quiz.component.css
│   │   ├── app.component.ts       # 主组件
│   │   ├── app.component.html
│   │   ├── app.component.css
│   │   ├── app.config.ts          # 应用配置
│   │   └── app.routes.ts          # 路由配置
│   ├── main.ts                     # 入口文件
│   ├── index.html                  # HTML 模板
│   └── styles.css                  # 全局样式
├── angular.json                    # Angular CLI 配置
├── package.json                    # 项目依赖配置
├── tsconfig.json                   # TypeScript 基础配置
├── tsconfig.app.json              # 应用 TypeScript 配置
├── tsconfig.spec.json             # 测试 TypeScript 配置
├── tailwind.config.js             # Tailwind CSS 配置
├── postcss.config.js              # PostCSS 配置
└── README.md                       # 项目说明文档
```

## 功能模块详解

### 1. 直角三角形介绍 (Introduction)
- 分步骤讲解直角三角形的定义和特性
- 介绍勾股定理的基本概念
- 使用 SVG 图形展示直角三角形的结构
- 包含导航按钮和进度指示器

### 2. 动画展示 (Animation)
- 核心功能：可视化展示 a² + b² = c² 的面积转换
- 使用经典的 3-4-5 直角三角形进行演示
- 支持自动播放、暂停、重置功能
- 可调节动画播放速度
- 实时验证面积关系：9 + 16 = 25

### 3. 公式讲解 (Formula)
- 核心公式展示：a² + b² = c²
- 公式变形形式：
  - c = √(a² + b²)
  - a = √(c² - b²)
  - b = √(c² - a²)
- 勾股定理逆定理讲解
- 常见勾股数列表（3,4,5）、（5,12,13）、（8,15,17）等
- 典型例题解析

### 4. 实际应用 (Application)
- 应用场景介绍（建筑工程、导航测量、电子设备等）
- 交互式计算器：
  - 🪜 梯子问题：计算梯子长度
  - 📺 屏幕尺寸：根据宽高比计算对角线
  - 📍 两点距离：计算坐标系中两点间距离
- 真实世界案例展示

### 5. 互动练习 (Quiz)
- 8 道精心设计的选择题
- 即时答案反馈和详细解析
- 进度追踪和得分统计
- 结果页面提供评价和建议
- 支持重新开始练习

## 安装和运行

### 环境要求

- Node.js >= 18.13.0
- npm >= 9.0.0
- Angular CLI >= 17.0.0

### 安装步骤

1. **进入项目目录**
```bash
cd pythagorean-theorem-animator
```

2. **安装依赖**
```bash
npm install
```

### 运行项目

**开发模式**
```bash
npm start
```
或
```bash
ng serve
```

项目启动后，在浏览器中访问 `http://localhost:4200` 即可查看应用。

**生产构建**
```bash
npm run build
```
或
```bash
ng build
```

构建产物将输出到 `dist/pythagorean-theorem-animator` 目录。

### 运行测试

```bash
npm test
```
或
```bash
ng test
```

## 使用指南

### 学习路径建议

1. **从介绍页面开始** - 了解直角三角形的基本概念
2. **观看动画演示** - 直观理解面积转换过程
3. **学习公式变形** - 掌握不同情况下的计算方法
4. **探索实际应用** - 了解勾股定理在现实中的用途
5. **完成互动练习** - 检验学习成果

### 交互功能

- **侧边栏导航** - 点击左侧菜单切换不同页面
- **动画控制** - 在动画页面使用播放/暂停/重置按钮
- **计算器** - 在应用页面输入数值进行实时计算
- **选择题** - 在练习页面选择答案并获得即时反馈

## 设计特点

### 教学友好设计
- 分步骤讲解，循序渐进
- 可视化演示，直观易懂
- 交互式练习，即时反馈
- 实际案例，学以致用

### 技术实现亮点
- **SVG 图形** - 使用原生 SVG 绘制几何图形，保证清晰度
- **响应式布局** - 使用 Tailwind CSS 实现移动端适配
- **组件化架构** - 每个功能模块独立为 Standalone Component
- **懒加载路由** - 按需加载组件，优化首屏加载速度
- **动画效果** - 使用 CSS 动画和 Angular 状态管理实现流畅过渡

## 扩展建议

### 功能扩展
- 添加更多勾股定理的证明方法动画
- 增加难度分级的练习题
- 添加用户进度保存功能
- 支持自定义三角形参数进行动画演示
- 添加 3D 空间中的勾股定理应用

### 技术优化
- 添加单元测试和端到端测试
- 实现国际化支持
- 添加深色/浅色主题切换
- 优化移动端交互体验

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目！

---

**注意**：本项目使用 Angular 17 的 Standalone Components 架构，所有组件都是独立的，不需要 NgModule。
