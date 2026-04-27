# AI 乒乓球对决 (AI Ping Pong Match)

一个基于 Angular 框架开发的 AI 乒乓球对决游戏，模拟两名人工智能选手之间的精彩对决。

## 项目概述

本项目是一个交互式的乒乓球游戏，其中两名 AI 选手会自动进行比赛。玩家可以调整 AI 的难度级别，观看不同强度的比赛。

## 技术栈

- **框架**: Angular 21.2.0
- **语言**: TypeScript
- **样式**: Tailwind CSS 3.4.19
- **UI 组件库**: PrimeNG 21.1.6
- **路由**: Angular Router
- **打包工具**: Angular CLI Application Builder
- **图标库**: PrimeIcons 7.0.0

## 项目结构

```
ai-ping-pong-match/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── game-court/
│   │   │   │   └── game-court.component.ts      # 游戏场地组件
│   │   │   ├── scoreboard/
│   │   │   │   └── scoreboard.component.ts      # 记分板组件
│   │   │   └── control-panel/
│   │   │       └── control-panel.component.ts   # 控制面板组件
│   │   ├── pages/
│   │   │   └── game-page/
│   │   │       └── game-page.component.ts       # 游戏页面组件
│   │   ├── services/
│   │   │   └── game.service.ts                   # 游戏逻辑服务
│   │   ├── types/
│   │   │   └── game.types.ts                     # 类型定义
│   │   ├── app.ts                                 # 根组件
│   │   ├── app.html                               # 根模板
│   │   ├── app.css                                # 根样式
│   │   ├── app.config.ts                          # 应用配置
│   │   └── app.routes.ts                          # 路由配置
│   ├── main.ts                                    # 入口文件
│   ├── index.html                                 # HTML 模板
│   └── styles.css                                 # 全局样式
├── angular.json                                   # Angular 配置
├── tailwind.config.js                             # Tailwind 配置
├── postcss.config.js                              # PostCSS 配置
├── package.json                                   # 项目依赖
└── README.md                                      # 项目文档
```

## 功能特性

- 🏓 **实时模拟**: 两名 AI 选手实时对战
- 🎮 **三种难度**: 简单、中等、困难三种 AI 难度级别
- 📊 **实时比分**: 实时显示比分和比赛状态
- ⏯️ **游戏控制**: 支持开始、暂停、继续、重置功能
- 🎨 **现代 UI**: 使用 Tailwind CSS 和 PrimeNG 打造的现代化界面
- 📱 **响应式设计**: 适配不同屏幕尺寸

## 核心组件说明

### GameService (游戏服务)

游戏的核心逻辑服务，包含：

- **物理引擎**: 处理球的运动、碰撞检测
- **AI 逻辑**: 实现 AI 选手的移动预测和决策
- **游戏状态管理**: 管理游戏的开始、暂停、结束等状态
- **比分系统**: 处理得分和胜负判断

### GameCourtComponent (游戏场地)

渲染游戏的可视化界面，包括：

- 乒乓球桌
- 两名 AI 选手的球拍
- 乒乓球
- 游戏状态提示信息

### ScoreboardComponent (记分板)

显示比赛的实时信息：

- 双方选手名称
- 当前比分
- 比赛状态
- 获胜分数

### ControlPanelComponent (控制面板)

提供游戏控制功能：

- AI 难度选择
- 开始/暂停/继续/重置按钮

## 安装和运行

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

```bash
npm install
```

### 开发模式

启动开发服务器：

```bash
npm run dev
```

或使用 Angular CLI：

```bash
ng serve
```

服务器启动后，在浏览器中访问 `http://localhost:4200` 即可查看应用。

### 构建生产版本

构建生产环境版本：

```bash
npm run build
```

构建产物将输出到 `dist/` 目录。

### 运行测试

运行单元测试：

```bash
npm run test
```

## 游戏规则

1. **获胜条件**: 先得 11 分的选手获胜
2. **AI 行为**: AI 会根据球的位置和速度预测落点并移动球拍
3. **难度差异**: 
   - 简单: AI 反应较慢，预测精度较低
   - 中等: AI 反应适中，预测精度一般
   - 困难: AI 反应迅速，预测精度高

## 开发说明

### 添加新组件

使用 Angular CLI 生成新组件：

```bash
ng generate component components/new-component
```

### 添加新服务

使用 Angular CLI 生成新服务：

```bash
ng generate service services/new-service
```

### 样式说明

- 项目使用 Tailwind CSS 进行样式开发
- 自定义颜色定义在 `tailwind.config.js` 中
- PrimeNG 组件使用内置主题样式

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目。
