# 🚿 管道连接益智游戏

一款基于 Vue 3 + TypeScript 开发的管道连接益智游戏。玩家需要通过旋转管道，将水从喷泉引导到池塘。

## 🎮 游戏玩法

1. 选择一个关卡开始游戏
2. 点击管道可以旋转它（每次旋转 90 度）
3. 目标是将所有管道正确连接，使水能从喷泉流向池塘
4. 当管道连接正确时，水流动画会显示出来
5. 成功将水引导到池塘即为通关

## 🛠️ 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Vue | 3.4+ | 渐进式 JavaScript 框架 |
| TypeScript | 5.4+ | JavaScript 的超集，提供类型系统 |
| Vite | 5.2+ | 下一代前端构建工具 |
| Vue Router | 4.3+ | Vue.js 官方路由管理器 |
| Element Plus | 2.6+ | Vue 3 组件库 |
| Tailwind CSS | 3.4+ | 实用优先的 CSS 框架 |

## 📁 项目结构

```
water-pipeline-puzzle/
├── src/
│   ├── components/          # 组件目录
│   │   ├── GameBoard.vue    # 游戏棋盘组件
│   │   └── GameCell.vue     # 管道单元格组件
│   ├── data/                # 数据目录
│   │   └── levels.ts        # 游戏关卡数据
│   ├── router/              # 路由配置
│   │   └── index.ts         # 路由定义
│   ├── types/               # 类型定义
│   │   └── index.ts         # TypeScript 类型
│   ├── utils/               # 工具函数
│   │   └── gameUtils.ts     # 游戏逻辑工具函数
│   ├── views/               # 页面视图
│   │   ├── GameView.vue     # 游戏页面
│   │   └── HomeView.vue     # 首页/关卡选择
│   ├── App.vue               # 根组件
│   ├── main.ts               # 入口文件
│   └── style.css             # 全局样式
├── index.html                # HTML 入口
├── package.json              # 项目配置
├── tsconfig.json             # TypeScript 配置
├── tsconfig.node.json        # Node TypeScript 配置
├── vite.config.ts            # Vite 配置
├── tailwind.config.js        # Tailwind CSS 配置
└── postcss.config.js         # PostCSS 配置
```

## 🎯 功能特性

### 游戏功能
- **多个关卡**：包含简单、中等、困难三个难度的关卡
- **多种管道类型**：支持直线、拐角、T型、十字等多种管道
- **水流动画**：实时显示水在管道中的流动状态
- **胜利检测**：自动检测是否完成管道连接
- **重置功能**：随时可以重置当前关卡

### 界面特性
- **响应式设计**：适配不同屏幕尺寸
- **精美动画**：管道旋转、水流动画效果
- **直观交互**：点击管道即可旋转
- **关卡导航**：支持上一关、下一关切换
- **胜利提示**：通关后显示祝贺弹窗

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0 或 yarn >= 1.22.0

### 安装依赖

```bash
cd water-pipeline-puzzle
npm install
```

### 启动开发服务器

```bash
npm run dev
```

启动后，浏览器访问 `http://localhost:5173` 即可开始游戏。

### 构建生产版本

```bash
npm run build
```

构建完成后，`dist` 目录包含生产环境的所有文件。

### 预览生产版本

```bash
npm run preview
```

## 🎨 游戏关卡

### 第 1 关：入门教程（简单）
- 棋盘大小：3 × 3
- 目标：学习基本的管道连接操作

### 第 2 关：拐角挑战（中等）
- 棋盘大小：4 × 4
- 目标：掌握拐角管道的使用

### 第 3 关：复杂迷宫（困难）
- 棋盘大小：5 × 5
- 目标：综合运用各种管道类型

## 🔧 自定义开发

### 添加新关卡

在 `src/data/levels.ts` 文件中，可以添加新的关卡配置：

```typescript
export const myCustomLevel: GameLevel = {
  id: 4,
  name: '我的自定义关卡',
  rows: 5,
  cols: 5,
  cells: [
    // 使用 createCell 函数创建单元格
    createCell(row, col, type, rotation, isFixed)
  ]
};

// 添加到 allLevels 数组
export const allLevels: GameLevel[] = [level1, level2, level3, myCustomLevel];
```

### 管道类型说明

| 类型 | 说明 | 连接方向（默认） |
|------|------|------------------|
| `straight` | 直线管道 | 上-下 |
| `corner` | 拐角管道 | 上-右 |
| `t-shape` | T型管道 | 上-右-下 |
| `cross` | 十字管道 | 上-右-下-左 |
| `fountain` | 喷泉 | 右（固定） |
| `pond` | 池塘 | 左（固定） |
| `empty` | 空单元格 | 无 |

## 📝 开发说明

### 项目架构

- **组件化设计**：使用 Vue 3 Composition API 进行组件开发
- **类型安全**：使用 TypeScript 提供完整的类型支持
- **状态管理**：使用 Vue 3 响应式 API 管理游戏状态
- **路由管理**：使用 Vue Router 管理页面导航

### 核心逻辑

游戏的核心逻辑位于 `src/utils/gameUtils.ts`：

- `getPipeConnections`：根据管道类型和旋转角度获取连接方向
- `rotatePipe`：旋转管道（每次 90 度）
- `areConnected`：检查两个相邻管道是否连接
- `checkWin`：使用 BFS 算法检查是否从喷泉到池塘有连通路径
- `getWaterPath`：获取水流动的路径（用于显示水流动画）

## 🐛 问题反馈

如果遇到任何问题或有改进建议，请：

1. 检查是否使用了正确的 Node.js 版本
2. 确保所有依赖都已正确安装
3. 查看浏览器控制台是否有错误信息

## 📄 许可证

MIT License

## 👥 贡献

欢迎提交 Issue 和 Pull Request！

---

祝你游戏愉快！🎮
