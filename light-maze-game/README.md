# 光点迷阵 - Light Maze Game

一款基于 Angular 开发的迷宫探索游戏。玩家控制一个微小的光点在由简洁线条构成的迷宫中移动，探索未知区域，激活关键节点，找到出口。

## 游戏特色

- **迷雾探索**：迷宫并非完全可见，玩家的光点移动时会照亮周围有限区域
- **节点激活**：迷宫中散布着不同颜色的"节点"，触碰后会激活
- **关卡递进**：10个精心设计的关卡，难度逐步增加
- **极简风格**：深色背景配合几何图形，视觉效果简洁而富有科技感
- **多端控制**：支持键盘（方向键/WASD）和鼠标点击控制

## 技术栈

- **框架**: Angular 21.2+
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **UI 组件库**: Angular Material (准备中)
- **路由**: Angular Router
- **打包方式**: Angular CLI Application Builder

## 项目结构

```
light-maze-game/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── game-canvas/          # 游戏画布组件
│   │   │   │   ├── game-canvas.component.ts
│   │   │   │   ├── game-canvas.component.html
│   │   │   │   └── game-canvas.component.css
│   │   │   ├── start-screen/         # 开始界面组件
│   │   │   │   ├── start-screen.component.ts
│   │   │   │   ├── start-screen.component.html
│   │   │   │   └── start-screen.component.css
│   │   │   ├── level-info/           # 关卡信息组件
│   │   │   │   ├── level-info.component.ts
│   │   │   │   ├── level-info.component.html
│   │   │   │   └── level-info.component.css
│   │   │   └── level-complete/       # 关卡完成界面
│   │   │       ├── level-complete.component.ts
│   │   │       ├── level-complete.component.html
│   │   │       └── level-complete.component.css
│   │   ├── pages/
│   │   │   └── game/                  # 游戏主页面
│   │   │       ├── game.component.ts
│   │   │       ├── game.component.html
│   │   │       └── game.component.css
│   │   ├── services/
│   │   │   ├── maze-generator.service.ts      # 迷宫生成器服务
│   │   │   ├── game-logic.service.ts          # 游戏逻辑服务
│   │   │   └── level-data.service.ts          # 关卡数据服务
│   │   ├── types/
│   │   │   └── index.ts              # 类型定义
│   │   ├── utils/
│   │   │   └── game.utils.ts         # 工具函数
│   │   ├── app.ts                    # 根组件
│   │   ├── app.html                  # 根组件模板
│   │   ├── app.css                   # 根组件样式
│   │   ├── app.routes.ts             # 路由配置
│   │   └── app.config.ts             # 应用配置
│   ├── styles.css                    # 全局样式
│   └── main.ts                       # 入口文件
├── angular.json                      # Angular 配置
├── tailwind.config.js                # Tailwind 配置
├── postcss.config.js                 # PostCSS 配置
├── tsconfig.json                     # TypeScript 配置
├── package.json                      # 项目依赖
└── README.md                         # 项目说明
```

## 游戏玩法

### 操作方式

**键盘控制**：
- `↑ ↓ ← →` 方向键控制光点移动
- `W A S D` 键控制光点移动

**鼠标控制**：
- 点击迷宫任意位置，光点会朝该方向移动一格

### 游戏目标

1. 控制青色光点在迷宫中探索
2. 触碰黄色节点使其激活
3. 激活所有节点后，紫色出口会解锁
4. 找到并进入出口即可进入下一关
5. 完成所有10个关卡即通关

### 关卡特色

- **关卡1-2**：基础迷宫，只需激活所有节点
- **关卡3-5**：引入顺序节点，需要按特定顺序激活
- **关卡6-10**：更复杂的迷宫结构，引入切换节点和组合激活

## 快速开始

### 环境要求

- Node.js 18+ 
- npm 或 yarn 包管理器
- Angular CLI (可选，也可使用 npm 脚本)

### 安装依赖

```bash
cd light-maze-game
npm install
```

### 开发模式

```bash
npm run dev
```

或

```bash
npm start
```

访问 http://localhost:4200 即可开始游戏。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist/` 目录。

### 运行测试

```bash
npm run test
```

## 核心功能

### 迷宫生成

使用深度优先搜索（DFS）算法生成随机迷宫，确保每个关卡都有唯一的路径。

### 光照效果

实现了径向渐变光照效果，玩家光点只能照亮周围有限区域，增加了探索的神秘感。

### 节点系统

- **普通节点**：触碰即可激活
- **顺序节点**：需要按特定顺序激活
- **切换节点**：需要满足特定条件才能激活

### 响应式设计

游戏支持多种屏幕尺寸，迷宫会根据窗口大小自动缩放。

## 颜色方案

- **背景**: 深黑色 (#0a0a0f)
- **墙壁**: 白色 (#ffffff)
- **玩家光点**: 青色 (#00ffff)
- **节点**: 黄色 (#ffff00)
- **激活节点**: 绿色 (#00ff00)
- **出口（未解锁）**: 灰色 (#666666)
- **出口（已解锁）**: 紫色/粉色 (#ff00ff)

## 开发指南

### 项目架构

项目采用 Angular 独立组件（Standalone Components）架构，不使用 NgModule，具有更好的模块化和可维护性。

### 服务层

- `MazeGeneratorService`: 负责生成迷宫
- `GameLogicService`: 管理游戏状态、玩家移动、节点激活等核心逻辑
- `LevelDataService`: 提供关卡配置数据

### 组件层

组件采用响应式设计，使用 Angular Signals 进行状态管理。

## 后续计划

- [ ] 增加音效和背景音乐
- [ ] 添加更多关卡和节点类型
- [ ] 实现排行榜功能
- [ ] 增加存档和读档功能
- [ ] 优化移动端触控体验
- [ ] 添加动画和特效

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

---

享受探索光点迷阵的乐趣吧！ ✨
