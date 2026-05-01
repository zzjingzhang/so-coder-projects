# 🧩 拼图游戏 (Puzzle Game)

一个基于 Angular 框架开发的网页版拼图游戏，提供完整的游戏体验和精美的交互界面。

## 📋 项目概述

- **项目名称**: puzzle-game
- **项目类型**: Angular Standalone Application
- **主要功能**: 网页版拼图游戏，支持多种难度选择、图片选择、计时、步数统计等功能

## 🛠️ 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Angular | ^21.2.0 | 前端框架 |
| TypeScript | ~5.9.2 | 编程语言 |
| Tailwind CSS | 最新 | CSS 框架 |
| NG-ZORRO | 最新 | UI 组件库 |
| Angular Router | ^21.2.0 | 路由管理 |
| Angular CLI Application Builder | ^21.2.8 | 打包构建 |

## 📁 项目结构

```
puzzle-game/
├── public/                          # 静态资源目录
│   └── favicon.ico                  # 网站图标
├── src/                             # 源代码目录
│   ├── app/                         # 应用主目录
│   │   ├── pages/                   # 页面组件
│   │   │   ├── home/                # 开始页面
│   │   │   │   ├── home.component.ts
│   │   │   │   ├── home.component.html
│   │   │   │   └── home.component.css
│   │   │   ├── game/                # 游戏页面
│   │   │   │   ├── game.component.ts
│   │   │   │   ├── game.component.html
│   │   │   │   └── game.component.css
│   │   │   └── success/             # 成功页面
│   │   │       ├── success.component.ts
│   │   │       ├── success.component.html
│   │   │       └── success.component.css
│   │   ├── services/                # 服务层
│   │   │   └── puzzle.service.ts    # 拼图游戏核心逻辑
│   │   ├── app.ts                   # 根组件
│   │   ├── app.html                 # 根组件模板
│   │   ├── app.css                  # 根组件样式
│   │   ├── app.config.ts            # 应用配置
│   │   └── app.routes.ts            # 路由配置
│   ├── index.html                   # 入口 HTML
│   ├── main.ts                      # 应用入口
│   └── styles.css                   # 全局样式
├── .editorconfig                    # 编辑器配置
├── .gitignore                       # Git 忽略配置
├── .prettierrc                      # Prettier 配置
├── angular.json                     # Angular 配置
├── package.json                     # 项目依赖配置
├── postcss.config.js                # PostCSS 配置
├── tailwind.config.js               # Tailwind CSS 配置
├── tsconfig.json                    # TypeScript 配置
├── tsconfig.app.json                # 应用 TypeScript 配置
└── tsconfig.spec.json               # 测试 TypeScript 配置
```

## 🎮 游戏功能

### 主要功能

1. **多难度选择**
   - 3x3 (简单)
   - 4x4 (中等)
   - 5x5 (困难)

2. **多图片选择**
   - 提供 4 张精美图片供选择
   - 自然风景、日落海滩、樱花、极光等主题

3. **游戏统计**
   - 实时计时
   - 步数统计
   - 完成后显示成绩

4. **交互体验**
   - 点击交换图块
   - 选中图块高亮显示
   - 正确位置的图块标记
   - 流畅的动画效果

### 游戏流程

1. **开始页面** (`/`)
   - 选择图片
   - 选择难度
   - 点击"开始游戏"

2. **游戏页面** (`/game`)
   - 查看原图参考
   - 点击两个图块进行交换
   - 查看计时和步数
   - 支持重新开始和返回首页

3. **成功页面** (`/success`)
   - 显示完成图片
   - 展示用时和步数
   - 支持再玩一次或返回首页

## 🚀 快速开始

### 环境要求

- Node.js >= 18.13.0
- npm (随 Node.js 安装)
- Angular CLI >= 21.2.0

### 安装步骤

1. **进入项目目录**
```bash
cd puzzle-game
```

2. **安装依赖**
```bash
npm install
```

### 启动开发服务器

```bash
ng serve
# 或者
npm start
```

启动后，打开浏览器访问 `http://localhost:4200` 即可开始游戏。

### 构建生产版本

```bash
ng build
```

构建产物将输出到 `dist/` 目录。

### 运行测试

```bash
ng test
```

## ⚙️ 配置说明

### Tailwind CSS 配置

配置文件: `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### NG-ZORRO 配置

配置位置: `src/app/app.config.ts`

- 图标注册
- 主题配置 (主色调: #667eea)

### 路由配置

配置文件: `src/app/app.routes.ts`

| 路径 | 组件 | 说明 |
|------|------|------|
| `/` | HomeComponent | 开始页面 |
| `/game` | GameComponent | 游戏页面 |
| `/success` | SuccessComponent | 成功页面 |
| `**` | 重定向到 `/` | 通配符路由 |

## 🧩 核心类说明

### PuzzleService

位置: `src/app/services/puzzle.service.ts`

**属性**

| 属性 | 类型 | 说明 |
|------|------|------|
| `gameState` | `Signal<GameState>` | 游戏状态信号 |
| `currentImageIndex` | `Signal<number>` | 当前选中图片索引 |

**方法**

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `getImages()` | - | `string[]` | 获取所有图片列表 |
| `setCurrentImage(index)` | `number` | `void` | 设置当前选中图片 |
| `getCurrentImage()` | - | `string` | 获取当前图片 URL |
| `startNewGame(gridSize)` | `number` | `void` | 开始新游戏 |
| `selectPiece(index)` | `number` | `void` | 选择图块 |
| `swapPieces(index1, index2)` | `number, number` | `void` | 交换两个图块 |
| `resetGame()` | - | `void` | 重置游戏 |
| `formatTime(seconds)` | `number` | `string` | 格式化时间显示 |

### GameState 接口

```typescript
interface GameState {
  pieces: PuzzlePiece[];    // 所有图块
  gridSize: number;          // 网格大小
  moves: number;             // 移动步数
  time: number;              // 用时(秒)
  isCompleted: boolean;      // 是否完成
  selectedPiece: number | null;  // 选中的图块索引
  isPlaying: boolean;        // 是否正在游戏中
}
```

### PuzzlePiece 接口

```typescript
interface PuzzlePiece {
  id: number;              // 图块唯一标识
  currentIndex: number;    // 当前位置索引
  originalIndex: number;   // 原始位置索引
  isCorrect: boolean;      // 是否在正确位置
}
```

## 🎨 设计特点

1. **响应式设计**
   - 适配桌面端和移动端
   - 使用 Tailwind CSS 实现响应式布局

2. **视觉效果**
   - 渐变背景
   - 精美的卡片设计
   - 流畅的动画和过渡效果
   - 选中和正确位置的视觉反馈

3. **用户体验**
   - 直观的操作流程
   - 明确的视觉提示
   - 确认对话框防止误操作
   - 游戏状态实时更新

## 📝 开发说明

### 组件结构

- **HomeComponent**: 负责游戏设置和开始
- **GameComponent**: 负责游戏核心逻辑和交互
- **SuccessComponent**: 负责游戏完成后的展示

### 信号 (Signal) 使用

项目使用 Angular 17+ 的 Signals 进行状态管理:

- `gameState`: 游戏状态的响应式信号
- `currentImageIndex`: 当前图片索引
- 组件使用 `computed()` 派生状态
- 使用 `effect()` 监听状态变化并执行副作用

### 样式规范

- 使用 Tailwind CSS 进行样式开发
- 组件样式使用 `styleUrl` 关联
- 全局样式在 `src/styles.css` 中定义
- 使用 `::ng-deep` 覆盖 NG-ZORRO 组件样式

## 🐛 常见问题

**Q: 安装依赖失败?**
A: 确保 Node.js 版本 >= 18.13.0，并检查网络连接。

**Q: 图片加载失败?**
A: 检查网络连接，确保可以访问外部图片资源。

**Q: 游戏无法交换图块?**
A: 确保先点击第一个图块选中，再点击第二个图块进行交换。

## 📄 许可证

MIT License

## 👨‍💻 开发者

使用 Angular 17+ Standalone Components 开发

---

祝您游戏愉快！🎉
