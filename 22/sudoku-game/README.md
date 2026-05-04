# 🧩 数独游戏 (Sudoku Game)

一个功能完整、界面精美的数独游戏，支持多种难度和棋盘大小选择。

## ✨ 功能特性

- **🎯 难度选择**：支持初级、中级、高级、特级四种难度
- **📐 多种尺寸**：支持 4×4、6×6、9×9 三种数独大小
- **⏱️ 实时计时**：游戏开始后自动计时，记录完成时间
- **🎮 游戏控制**：支持开始、暂停、继续、结束游戏
- **⌨️ 键盘支持**：支持数字键输入、方向键导航、删除键清除
- **🎨 精美界面**：采用现代化渐变背景和毛玻璃效果
- **✅ 实时验证**：输入数字后实时校验是否正确
- **🏆 胜利提示**：完成游戏后显示用时统计

## 🛠️ 技术栈

- **React 18+** - 前端框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **Tailwind CSS** - 样式框架
- **Chakra UI** - UI 组件库
- **React Router** - 路由管理

## 📁 项目结构

```
sudoku-game/
├── public/                 # 静态资源
├── src/
│   ├── components/         # React 组件
│   │   ├── ControlButtons.tsx    # 控制按钮组件
│   │   ├── DifficultySelector.tsx # 难度选择器
│   │   ├── GamePage.tsx           # 主游戏页面
│   │   ├── NumberPad.tsx          # 数字键盘
│   │   ├── SizeSelector.tsx       # 大小选择器
│   │   ├── SudokuBoard.tsx        # 数独棋盘
│   │   └── Timer.tsx              # 计时器
│   ├── types/              # TypeScript 类型定义
│   │   └── index.ts
│   ├── utils/              # 工具函数
│   │   └── sudoku.ts       # 数独生成与验证逻辑
│   ├── App.tsx             # 主应用组件
│   ├── index.css           # 全局样式
│   └── main.tsx            # 应用入口
├── .gitignore
├── index.html              # HTML 模板
├── package.json            # 依赖配置
├── postcss.config.js       # PostCSS 配置
├── tailwind.config.js      # Tailwind CSS 配置
├── tsconfig.json           # TypeScript 配置
├── tsconfig.node.json      # TypeScript Node 配置
└── vite.config.ts          # Vite 配置
```

## 🚀 快速开始

### 环境要求

- Node.js 16+ 
- npm 或 yarn 或 pnpm

### 安装依赖

```bash
cd sudoku-game
npm install
```

### 开发模式

```bash
npm run dev
```

然后在浏览器中打开 `http://localhost:5173` 即可访问游戏。

### 构建生产版本

```bash
npm run build
```

构建产物将生成在 `dist` 目录中。

### 预览生产版本

```bash
npm run preview
```

## 🎮 游戏说明

### 开始游戏

1. 选择数独大小（4×4、6×6、9×9）
2. 选择难度级别（初级、中级、高级、特级）
3. 点击「开始游戏」按钮

### 游戏操作

- **鼠标点击**：点击格子选中，然后点击数字键盘输入数字
- **键盘操作**：
  - `方向键`：在格子间移动选择
  - `数字键 1-9`：在选中的格子中输入数字
  - `Backspace` 或 `Delete`：清除选中格子中的数字

### 游戏规则

- 每行、每列、每个小方块中的数字不能重复
- 不同大小的数独规则略有不同：
  - **4×4**：每行、每列、每个 2×2 方块包含数字 1-4
  - **6×6**：每行、每列、每个 2×3 方块包含数字 1-6
  - **9×9**：每行、每列、每个 3×3 方块包含数字 1-9

### 胜利条件

在没有错误的情况下填满所有格子即为胜利。

## ⚙️ 难度说明

| 难度 | 空穴比例 | 说明 |
|------|----------|------|
| 初级 | 40% | 适合新手入门 |
| 中级 | 50% | 需要一些技巧 |
| 高级 | 60% | 有一定挑战性 |
| 特级 | 75% | 数独高手的选择 |

## 📝 开发说明

### 核心算法

游戏使用回溯算法（Backtracking Algorithm）生成有效的数独谜题：
1. 先生成一个完整有效的数独解决方案
2. 根据难度级别随机移除一定数量的数字
3. 确保生成的谜题有唯一解（简化版本，仅保证可解）

### 类型定义

所有关键类型定义在 `src/types/index.ts` 中：
- `Difficulty` - 难度类型
- `GameStatus` - 游戏状态
- `SudokuConfig` - 数独配置
- `SudokuCell` - 单元格状态
- `GameState` - 游戏状态

## 📄 许可证

MIT License

---

祝你玩得开心！ 🎉
