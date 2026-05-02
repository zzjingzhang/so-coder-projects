# 🎨 Pixel Art Board - 像素画板

一个基于 Angular 构建的交互式像素画板应用，支持像素绘制、颜色选择和画布尺寸调整。

## 项目结构

```
pixel-art-board/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── pixel-board/
│   │   │       ├── pixel-board.component.ts
│   │   │       ├── pixel-board.component.html
│   │   │       └── pixel-board.component.css
│   │   ├── app.config.ts
│   │   ├── app.routes.ts
│   │   └── app.ts
│   ├── main.ts
│   ├── index.html
│   └── styles.css
├── angular.json
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── README.md
```

## 技术栈

- **框架**: Angular 21+ (Standalone Components)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **UI组件库**: Angular Material
- **路由**: Angular Router
- **打包方式**: Angular CLI Application Builder

## 功能特性

- ✏️ **像素绘制**: 点击并拖动鼠标在画布上绘制像素
- 🎨 **颜色选择**: 
  - 内置颜色面板（35种预设颜色）
  - 自定义颜色选择器
  - 最近使用颜色记录
- 🧹 **橡皮擦工具**: 快速擦除已绘制的像素
- 🪣 **填充功能**: 一键用当前颜色填充整个画布
- 🗑️ **清空画布**: 一键清空所有像素
- 📏 **尺寸调整**: 支持 4x4 到 64x64 的画布尺寸（步进为4）
- 💡 **交互提示**: 像素悬停效果、工具栏提示

## 安装与运行

### 环境要求

- Node.js >= 18.13.0
- npm >= 9.0.0

### 安装依赖

```bash
cd pixel-art-board
npm install
```

### 启动开发服务器

```bash
npm start
```

访问 `http://localhost:4200` 查看应用。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist/` 目录。

## 使用说明

1. **绘制**: 在画布上点击并拖动鼠标来绘制像素
2. **选择颜色**: 
   - 点击颜色面板中的预设颜色
   - 或使用颜色选择器自定义颜色
   - 最近使用的颜色会显示在"最近使用"区域
3. **橡皮擦**: 点击"橡皮"按钮切换到擦除模式，然后在画布上拖动即可擦除像素
4. **填充**: 选择颜色后点击"填充"按钮，将用当前颜色填满整个画布
5. **清空**: 点击"清空"按钮将重置整个画布为白色
6. **调整尺寸**: 使用滑块调整画布尺寸（从 4x4 到 64x64）

## 核心技术点

### DOM元素动态创建与样式修改
- 使用 Angular 的 `@for` 指令动态生成像素网格
- 通过 `[style.backgroundColor]` 动态绑定像素颜色
- 使用 `[style.width.px]` 和 `[style.height.px]` 动态调整像素大小
- 根据网格尺寸条件性显示/隐藏像素边框

### 事件监听与处理机制
- `(mousedown)`: 开始绘制
- `(mouseenter)`: 鼠标经过时继续绘制（实现连续绘制）
- `@HostListener('document:mouseup')`: 全局监听鼠标抬起结束绘制
- `(click)`: 颜色选择、工具切换等交互

### 逻辑与UI交互结合
- 使用 Angular Signals 和双向绑定 `[(ngModel)]` 管理状态
- 通过 `@for` 循环和条件类绑定 `[class.ring-2]` 实现UI状态反馈
- 工具切换（画笔/橡皮）通过状态变量 `isErasing` 控制
- 画布尺寸变更时重新初始化像素数组

## 开发模式

项目使用 Angular Standalone Components 模式，无需 NgModule，更加模块化和轻量化。

## License

MIT
