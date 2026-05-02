# 🏎️ Racing Game - 赛车游戏

一款基于 Angular 开发的简单有趣的赛车躲避游戏。玩家需要控制赛车在三条车道之间切换，躲避前方驶来的车辆，坚持越久分数越高！

## 📋 项目结构

```
racing-game/
├── src/
│   ├── app/
│   │   ├── pages/
│   │   │   ├── home/
│   │   │   │   ├── home.component.ts
│   │   │   │   ├── home.component.html
│   │   │   │   └── home.component.scss
│   │   │   └── game/
│   │   │       ├── game.component.ts
│   │   │       ├── game.component.html
│   │   │       └── game.component.scss
│   │   ├── services/
│   │   │   └── game.service.ts
│   │   ├── app.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── styles.scss
│   ├── index.html
│   └── main.ts
├── angular.json
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── tsconfig.json
└── README.md
```

## 🛠️ 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Angular | ^21.2.0 | 前端框架 |
| TypeScript | ~5.9.2 | 编程语言 |
| Tailwind CSS | ^3.x | CSS 框架 |
| NG-ZORRO | ^21.2.2 | UI 组件库 |
| Angular Router | ^21.2.0 | 路由管理 |
| Angular CLI | ^21.2.9 | 构建工具 |
| Application Builder | - | Angular 新的打包工具 |

## 🎮 游戏功能

- **三车道赛道**: 玩家可以在三条车道之间自由切换
- **障碍物系统**: 随机生成不同颜色的车辆作为障碍物
- **生命值系统**: 玩家有 3 条生命，每次碰撞减少一条
- **难度递增**: 随着分数增加，游戏速度和障碍物密度会增加
- **等级系统**: 每获得 500 分提升一个等级
- **最高分记录**: 游戏会保存历史最高分到本地存储
- **暂停功能**: 支持暂停/继续游戏
- **多设备支持**: 键盘控制 + 触摸按钮控制

## 🎯 操作说明

### 键盘操作
- `←` (左方向键): 向左移动
- `→` (右方向键): 向右移动
- `空格键` 或 `Escape`: 暂停/继续游戏

### 触摸/点击操作
- 点击左侧蓝色按钮: 向左移动
- 点击右侧蓝色按钮: 向右移动

## 🚀 快速开始

### 环境要求
- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

```bash
cd racing-game
npm install
```

### 启动开发服务器

```bash
npm start
```

启动后在浏览器中访问: `http://localhost:4200`

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist/` 目录。

### 运行测试

```bash
npm test
```

## 📁 核心模块说明

### GameService (`src/app/services/game.service.ts`)
游戏核心逻辑服务，负责：
- 管理游戏状态（分数、生命、等级、速度等）
- 玩家车辆移动控制
- 障碍物生成与移动
- 碰撞检测
- 分数计算与最高分存储
- 游戏循环与暂停控制

### HomeComponent (`src/app/pages/home/`)
游戏主菜单页面，展示：
- 游戏标题与图标
- 历史最高分
- 开始游戏按钮
- 游戏操作说明

### GameComponent (`src/app/pages/game/`)
游戏主场景页面，包含：
- 游戏状态栏（分数、等级、生命）
- 游戏画布（赛道、车辆、障碍物）
- 暂停/继续功能
- 游戏结束弹窗
- 控制按钮（左右移动）

## 🎨 样式与设计

项目使用 **Tailwind CSS** 进行样式开发，配合 **NG-ZORRO** UI 组件库，设计风格：

- **深色主题**: 采用深色渐变背景，适合游戏类应用
- **赛车配色**: 红色主题色配合黄色、绿色强调色
- **响应式设计**: 适配不同屏幕尺寸
- **平滑动画**: 车辆移动、按钮悬停等交互效果

## 🔧 配置说明

### Tailwind 配置 (`tailwind.config.js`)
- 自定义颜色: `racing-dark`, `racing-blue`, `racing-red`, `racing-yellow`, `racing-green`
- 自定义动画: `pulse-slow`

### Angular 配置 (`angular.json`)
- 使用 `@angular/build:application` 作为构建工具
- 支持 SCSS 样式

## 📝 开发说明

### 添加新组件
```bash
ng generate component components/new-component
```

### 添加新服务
```bash
ng generate service services/new-service
```

## 🐛 常见问题

**Q: 游戏无法正常运行？**
A: 请确保 Node.js 版本 >= 18.0.0，npm 版本 >= 9.0.0，并且已正确安装依赖。

**Q: 样式无法正常显示？**
A: 检查 Tailwind CSS 和 PostCSS 配置是否正确，确认 `tailwind.config.js` 中的 `content` 路径配置正确。

**Q: NG-ZORRO 组件无法正常工作？**
A: 确保在 `app.config.ts` 中正确导入了 NG-ZORRO 的 providers，并且组件中导入了需要的模块。

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

Enjoy the game! 🏎️
