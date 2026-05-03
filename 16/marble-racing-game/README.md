# Marble Racing Game 🏎️

一款刺激的弹珠赛车游戏，支持赛道障碍、弹珠物理模拟、车道切换、速度提升、终点线和实时比赛位置跟踪。

## 项目特性

- **赛道障碍系统**：赛道上分布有加速道具(⚡)和减速障碍(🚧)
- **弹珠物理模拟**：流畅的物理运动效果
- **车道切换**：玩家可以在5条赛道间自由切换
- **速度提升**：按住加速键或收集加速道具提升速度
- **终点线**：所有弹珠完成比赛后显示结果
- **实时位置跟踪**：比赛过程中实时显示排名和进度

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Angular | 21.2.x | 前端框架 |
| TypeScript | 5.9.x | 编程语言 |
| Tailwind CSS | 4.2.x | CSS框架 |
| PrimeNG | 21.1.x | UI组件库 |
| Angular Router | 21.2.x | 路由管理 |
| Angular CLI | 21.2.x | 项目构建工具 |

## 项目结构

```
marble-racing-game/
├── public/                    # 静态资源
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── game/             # 游戏组件
│   │   │   ├── game.component.ts
│   │   │   ├── game.component.html
│   │   │   └── game.component.css
│   │   ├── app.ts             # 根组件
│   │   ├── app.html
│   │   ├── app.css
│   │   ├── app.config.ts      # 应用配置
│   │   └── app.routes.ts      # 路由配置
│   ├── main.ts                 # 入口文件
│   ├── index.html              # HTML模板
│   └── styles.css              # 全局样式
├── postcss.config.js           # PostCSS配置
├── angular.json                # Angular配置
├── package.json                # 项目依赖
├── tsconfig.json               # TypeScript配置
└── README.md                   # 项目说明
```

## 游戏控制

| 按键 | 功能 |
|------|------|
| `←` 或 `A` | 向左切换车道 |
| `→` 或 `D` | 向右切换车道 |
| `↑` 或 `W` (按住) | 加速前进 |

## 道具说明

| 道具 | 颜色 | 效果 |
|------|------|------|
| ⚡ | 绿色 | 加速道具 - 获得2秒双倍速度 |
| 🚧 | 红色 | 减速障碍 - 速度降低70% |

## 安装与运行

### 前置要求

- Node.js (建议使用 v18+ 或 v20+)
- npm (通常随 Node.js 一起安装)

### 安装依赖

```bash
cd marble-racing-game
npm install
```

### 启动开发服务器

```bash
npm start
# 或
ng serve
```

应用将在 `http://localhost:4200/` 启动。

### 构建生产版本

```bash
npm run build
# 或
ng build
```

构建产物将输出到 `dist/` 目录。

### 运行测试

```bash
npm test
# 或
ng test
```

## 游戏玩法

1. 打开应用后，点击「开始比赛」按钮开始游戏
2. 控制你的红色弹珠(You)在赛道上前进
3. 使用方向键或 WASD 切换车道
4. 收集绿色加速道具(⚡)提升速度
5. 避开红色减速障碍(🚧)
6. 第一个到达终点线获得冠军！
7. 比赛结束后可选择再来一局或返回主菜单

## 开发说明

### 构建工具

项目使用 Angular CLI 的 Application Builder (`@angular/build:application`) 进行构建，这是 Angular 17+ 的推荐构建方式。

### 样式系统

- 使用 Tailwind CSS v4 进行样式开发
- 使用 `@tailwindcss/postcss` 插件进行 CSS 处理
- PrimeNG 组件使用 Lara Light Blue 主题

### 组件架构

- 采用 Angular Standalone Components 模式
- 所有组件独立导入依赖，无需 NgModule
- 路由配置直接声明 `Routes` 数组

## 许可证

MIT License
