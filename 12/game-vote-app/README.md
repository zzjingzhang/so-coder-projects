# 游戏投票推荐应用 (Game Vote App)

一个基于 Vue 3 + TypeScript 的游戏投票推荐平台，支持用户创建投票、参与投票、查看排行榜等功能。

## 项目结构

```
game-vote-app/
├── src/
│   ├── components/          # 公共组件
│   │   ├── GameCard.vue     # 游戏卡片组件
│   │   └── NavHeader.vue    # 导航栏组件
│   ├── stores/              # 状态管理
│   │   ├── auth.ts          # 用户认证状态
│   │   └── game.ts          # 游戏和投票数据状态
│   ├── types/               # TypeScript 类型定义
│   │   └── index.ts
│   ├── views/               # 页面组件
│   │   ├── Home.vue         # 首页/投票列表
│   │   ├── Login.vue        # 登录页
│   │   ├── Register.vue     # 注册页
│   │   ├── CreatePoll.vue   # 创建投票页
│   │   ├── PollDetail.vue   # 投票详情/参与投票页
│   │   ├── PollResults.vue  # 投票结果页 (排行榜)
│   │   └── MyVotes.vue      # 我的投票记录页
│   ├── App.vue              # 根组件
│   ├── main.ts              # 入口文件
│   ├── router/              # 路由配置
│   │   └── index.ts
│   └── style.css            # 全局样式
├── index.html               # HTML 模板
├── package.json             # 依赖配置
├── tsconfig.json            # TypeScript 配置
├── tsconfig.node.json       # TypeScript Node 配置
└── vite.config.ts           # Vite 配置
```

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Vue | 3.5.x | 前端框架 |
| TypeScript | 6.0.x | 类型安全的 JavaScript |
| Vite | 8.0.x | 下一代前端构建工具 |
| Vue Router | 4.4.x | Vue 官方路由 |
| Element Plus | 2.8.x | Vue 3 组件库 |
| Tailwind CSS | 4.0.x | 原子化 CSS 框架 |
| @element-plus/icons-vue | 2.3.x | Element Plus 图标库 |

## 功能特性

### 核心功能
1. **用户认证系统**
   - 用户注册/登录
   - 本地存储保持登录状态
   - 路由守卫保护需要登录的页面

2. **投票管理**
   - 浏览所有投票列表
   - 创建新投票（需登录）
   - 设置投票标题、描述
   - 选择显示 Top 5 或 Top 10
   - 可限制投票的游戏类型（标签）

3. **游戏搜索与添加**
   - AJAX 实时搜索游戏（模拟 IGDB API）
   - 选择游戏添加到投票选项
   - 类型过滤（如果投票设置了类型限制）

4. **参与投票**
   - 浏览投票候选游戏
   - 为喜欢的游戏投票
   - 每个用户每个投票只能投一次
   - 投票管理员可添加更多游戏

5. **投票结果展示**
   - 前三名颁奖台展示
   - 完整排行榜列表（Top 5/10 可切换）
   - 投票进度条和百分比显示
   - 总票数统计

6. **个人中心**
   - 查看自己的投票记录
   - 时间线形式展示
   - 投票统计：参与投票数、支持游戏数等

### UI 特性
- 响应式设计，支持移动端
- 渐变色卡片和动画效果
- 按钮文字水平垂直居中
- 合理的色彩搭配
- 文字清晰易读

## 快速开始

### 环境要求
- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

```bash
cd game-vote-app
npm install
```

### 启动开发服务器

```bash
npm run dev
```

项目将在 `http://localhost:5173` 启动。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 预览生产构建

```bash
npm run preview
```

## 演示账号

项目内置了演示数据，可使用以下账号登录体验：

| 用户名 | 密码 | 说明 |
|--------|------|------|
| admin | 123456 | 管理员账号 |
| game_lover | 123456 | 普通用户账号 |

## 数据存储说明

本项目使用 `localStorage` 进行数据持久化：
- 用户数据：`users` 键
- 投票数据：`polls` 键
- 投票记录：`userVotes` 键
- 当前登录用户：`currentUser` 键

## IGDB API 集成说明

当前版本使用模拟数据演示游戏搜索功能。如需接入真实的 IGDB API，请：

1. 注册 Twitch Developer 账号获取 Client ID 和 Access Token
2. 在 `src/views/CreatePoll.vue` 和 `src/views/PollDetail.vue` 中替换模拟搜索函数
3. IGDB API 文档：https://api-docs.igdb.com/

## 路由说明

| 路径 | 页面 | 是否需要登录 |
|------|------|-------------|
| `/` | 首页/投票列表 | 否 |
| `/login` | 登录页 | 否 |
| `/register` | 注册页 | 否 |
| `/create-poll` | 创建投票 | 是 |
| `/poll/:id` | 投票详情 | 否 |
| `/poll/:id/results` | 投票结果 | 否 |
| `/my-votes` | 我的投票记录 | 是 |

## 开发说明

### 项目规范
- 使用 TypeScript 确保类型安全
- 组件使用 `<script setup>` 语法
- 样式优先使用 Tailwind CSS
- 公共组件放在 `src/components/`
- 页面组件放在 `src/views/`

### 状态管理
使用 Vue 3 reactive API 进行简单状态管理，结合 localStorage 持久化：
- `useAuthStore()` - 用户认证状态
- `useGameStore()` - 游戏和投票数据

## License

MIT
