# Game Tournament Platform

一个功能完善的在线游戏锦标赛平台，具备动态排行榜、动画比赛进度指示器和可折叠的团队简介。

## 项目简介

本项目是一个现代化的在线游戏锦标赛平台，采用深色主题设计，提供以下核心功能：

- **动态排行榜** - 实时更新选手排名，支持动画过渡效果，每5秒自动刷新
- **动画比赛进度指示器** - 可视化展示比赛进行状态，包含实时比分、回合进度和动画效果
- **可折叠的团队简介** - 展示参赛战队信息，支持展开/收起查看详细内容和成员信息

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Angular | 21.2.0 | 前端框架 |
| TypeScript | ~5.9.2 | 编程语言 |
| Tailwind CSS | 4.2.4 | CSS 框架 |
| Angular Material | 最新 | UI 组件库 |
| Angular Router | 21.2.0 | 路由管理 |
| Angular CLI | 21.2.9 | 项目构建工具 |

## 项目结构

```
game-tournament-platform/
├── public/
│   └── favicon.ico              # 网站图标
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── leaderboard/
│   │   │   │   ├── leaderboard.ts        # 排行榜组件逻辑
│   │   │   │   ├── leaderboard.html      # 排行榜模板
│   │   │   │   └── leaderboard.css       # 排行榜样式
│   │   │   ├── match-progress/
│   │   │   │   ├── match-progress.ts     # 比赛进度组件逻辑
│   │   │   │   ├── match-progress.html   # 比赛进度模板
│   │   │   │   └── match-progress.css    # 比赛进度样式
│   │   │   └── team-profile/
│   │   │       ├── team-profile.ts       # 团队简介组件逻辑
│   │   │       ├── team-profile.html     # 团队简介模板
│   │   │       └── team-profile.css      # 团队简介样式
│   │   ├── app.ts             # 主应用组件
│   │   ├── app.html           # 主应用模板
│   │   ├── app.css            # 主应用样式
│   │   ├── app-module.ts      # 应用根模块
│   │   └── app-routing-module.ts  # 路由配置
│   ├── styles.css             # 全局样式（Tailwind CSS 配置）
│   ├── main.ts                # 应用入口
│   └── index.html             # HTML 入口文件
├── angular.json               # Angular 配置
├── package.json               # 项目依赖
├── tsconfig.json              # TypeScript 配置
└── README.md                  # 项目文档
```

## 功能模块

### 1. 排行榜 (Leaderboard)

- 展示前三名选手的特殊卡片展示
- 完整的选手列表，包含头像、姓名、队伍、分数等信息
- 每5秒自动更新分数和排名
- 平滑的动画过渡效果
- 支持排名变化的视觉反馈

### 2. 比赛进度 (Match Progress)

- 实时比分展示，支持动画效果
- 进度条可视化比赛进行状态
- 比赛阶段和回合信息
- 即将开始和已结束比赛列表
- 直播状态指示器

### 3. 团队简介 (Team Profile)

- 可折叠的战队卡片
- 战队基本信息（成立年份、赛区、胜率等）
- 战队成员详情展示
- 成员个人数据统计（胜场、负场、胜率、KDA）
- 支持全部展开/收起功能

## 安装和运行

### 前置要求

确保你的开发环境已安装以下软件：

- Node.js (推荐 v20 或更高版本)
- npm (通常随 Node.js 一起安装)
- Angular CLI (v21 或更高版本)

### 安装依赖

```bash
cd game-tournament-platform
npm install
```

### 启动开发服务器

```bash
ng serve
```

或使用 npm 脚本：

```bash
npm run start
```

启动成功后，打开浏览器访问 `http://localhost:4200`

### 构建生产版本

```bash
ng build
```

构建产物将输出到 `dist/` 目录。

### 运行测试

```bash
ng test
```

## 路由配置

| 路径 | 组件 | 说明 |
|------|------|------|
| `/` | 重定向到 `/leaderboard` | 默认路由 |
| `/leaderboard` | Leaderboard | 排行榜页面 |
| `/matches` | MatchProgress | 比赛进度页面 |
| `/teams` | TeamProfile | 参赛战队页面 |

## 设计特点

### 视觉设计

- **深色主题** - 适合电竞场景的深色背景
- **渐变色彩** - 使用蓝紫渐变作为主色调
- **卡片式布局** - 清晰的信息层级
- **响应式设计** - 适配桌面和移动设备

### 动画效果

- 排行榜更新时的脉冲动画
- 比赛进度条的平滑过渡
- 团队卡片展开/收起的动画
- 导航栏和按钮的悬停效果

### 可访问性

- 合理的文字大小和颜色对比
- 清晰的按钮和交互元素
- 完整的标签和语义化 HTML

## 开发指南

### 添加新组件

```bash
ng generate component components/your-component-name
```

### 添加新路由

在 `src/app/app-routing-module.ts` 中添加路由配置：

```typescript
const routes: Routes = [
  // ... 现有路由
  { path: 'your-path', component: YourComponent, title: '页面标题' }
];
```

### 自定义主题颜色

主题颜色定义在 `src/styles.css` 中的 `@theme` 块：

```css
@theme {
  --color-primary: #6366f1;      /* 主色调 */
  --color-secondary: #10b981;    /* 次要色 */
  --color-accent: #f59e0b;       /* 强调色 */
  --color-dark-bg: #0f172a;       /* 背景色 */
  /* ... 更多颜色 */
}
```

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！
