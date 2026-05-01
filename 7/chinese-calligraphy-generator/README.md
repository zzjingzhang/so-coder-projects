# 中文书法生成器 (Chinese Calligraphy Generator)

一个基于 Angular 的动态中文书法生成器，支持动画绘制笔画、自定义页面布局、选择笔画速度和颜色。

## 项目简介

本项目是一个交互式的中文书法展示工具，通过 Canvas 动画模拟毛笔书写过程，让用户能够直观地感受传统书法艺术的魅力。

### 主要功能

- **动画绘制**：模拟毛笔书写过程，逐笔展示汉字书写动画
- **速度控制**：可调节笔画书写速度（从慢到快）
- **墨色选择**：提供多种预设墨色（墨黑、朱砂、藏青、茶褐、金墨）及自定义颜色
- **布局定制**：支持单字展示、横向排列、纵向排列、网格布局四种展示模式
- **米字格背景**：传统书法练习格子背景，便于观察笔画位置

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Angular | 21.x | 前端框架 |
| TypeScript | 5.9.x | 编程语言 |
| Tailwind CSS | 3.4.x | 样式框架 |
| NG-ZORRO (Ant Design for Angular) | 21.x | UI 组件库 |
| Angular Router | 21.x | 路由管理 |
| Angular CLI Application Builder | 21.x | 构建工具 |

## 项目结构

```
chinese-calligraphy-generator/
├── .vscode/                    # VS Code 配置
│   ├── extensions.json
│   ├── launch.json
│   └── tasks.json
├── public/                     # 静态资源
├── src/
│   ├── app/
│   │   ├── calligraphy/        # 书法生成器组件
│   │   │   ├── calligraphy.component.ts
│   │   │   ├── calligraphy.component.html
│   │   │   └── calligraphy.component.css
│   │   ├── home/               # 首页组件
│   │   │   ├── home.component.ts
│   │   │   ├── home.component.html
│   │   │   └── home.component.css
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.css
│   │   ├── app.module.ts
│   │   └── app-routing.module.ts
│   ├── main.ts
│   ├── index.html
│   └── styles.css
├── .editorconfig
├── .gitignore
├── .prettierrc
├── angular.json
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
└── README.md
```

## 核心组件说明

### CalligraphyComponent (`src/app/calligraphy/`)

书法生成器核心组件，负责：

- **Canvas 绘制**：使用 HTML5 Canvas 绘制笔画动画
- **动画控制**：实现开始、暂停、清空功能
- **笔画数据**：内置"永"字的笔画数据（永字八法）
- **用户交互**：处理布局、速度、颜色的设置变更

#### 主要属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| layout | string | 'single' | 页面布局模式 |
| strokeSpeed | number | 50 | 笔画速度 (10-100) |
| inkColor | string | '#1a1a1a' | 墨色颜色值 |
| isPlaying | boolean | false | 是否正在播放动画 |

#### 主要方法

| 方法 | 说明 |
|------|------|
| startAnimation() | 开始笔画绘制动画 |
| stopAnimation() | 停止动画 |
| clearCanvas() | 清空画布 |
| drawBrushStroke() | 绘制单段毛笔线条 |

### HomeComponent (`src/app/home/`)

首页组件，提供：

- 项目介绍
- 功能特性展示
- 快速入口按钮

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0
- Angular CLI >= 18.0.0

### 安装依赖

```bash
cd chinese-calligraphy-generator
npm install
```

### 开发模式运行

```bash
npm start
```

或者使用 Angular CLI：

```bash
ng serve
```

访问地址：`http://localhost:4200`

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist/` 目录。

### 运行测试

```bash
npm test
```

## 使用指南

### 页面布局

1. **单字展示**：默认模式，单字大尺寸展示，适合欣赏
2. **横向排列**：多字水平排列
3. **纵向排列**：多字垂直排列（传统书法格式）
4. **网格布局**：2x2 网格排列

### 笔画速度

- 拖动滑块调节速度
- 左侧较慢（10%），右侧较快（100%）
- 慢速适合学习笔画顺序，快速适合欣赏整体效果

### 墨色选择

1. **预设颜色**：点击彩色圆点快速选择
   - 墨黑：传统黑色墨迹
   - 朱砂：红色印章风格
   - 藏青：深蓝色调
   - 茶褐：茶棕色
   - 金墨：金色装饰性

2. **自定义颜色**：使用颜色选择器任意选取颜色

### 操作按钮

- **开始书写**：逐笔绘制汉字
- **暂停**：暂停当前动画
- **清空**：清空画布恢复初始状态

## 自定义开发

### 添加新汉字

在 `CalligraphyComponent` 的 `createYongCharacter()` 方法基础上，可以添加更多汉字的笔画数据：

```typescript
private createNewCharacter(): Character {
  const centerX = 300;
  const centerY = 300;
  const scale = 80;

  return {
    character: '新',
    strokes: [
      {
        type: '横',
        points: [
          { x: centerX - scale * 0.8, y: centerY - scale },
          { x: centerX + scale * 0.8, y: centerY - scale }
        ]
      },
      // ... 更多笔画
    ]
  };
}
```

### 修改布局模式

在 `calligraphy.component.html` 中可以扩展布局选项，添加更多展示模式。

## 设计理念

### 动画原理

本项目采用逐点绘制的方式模拟毛笔书写：

1. **笔触粗细变化**：根据笔画位置和方向，动态调整线条粗细
2. **墨色渐变**：模拟墨水在宣纸上的渗透效果
3. **随机飞白**：添加随机墨点，增加真实感

### 书法美学

- 米字格背景：符合传统书法练习规范
- 楷书笔画顺序：遵循标准汉字书写顺序
- 宣纸质感：米色背景模拟传统宣纸效果

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！
