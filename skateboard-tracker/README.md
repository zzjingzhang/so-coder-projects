# 🛹 个人滑板运动管理系统

一个纯前端的滑板运动网页应用，帮助你管理滑板技巧档案和练习记录。

## ✨ 功能特性

### 技巧档案管理
- 记录掌握的滑板动作
- 为每个技巧设置难度等级（入门/初级/中级/高级/专家）
- 跟踪掌握程度百分比
- 支持分类管理（平地基础、翻转动作、转板动作、转体动作、杆上动作、平衡动作）
- 支持标签和备注
- 高级搜索和筛选功能

### 练习记录管理
- 记录每次滑板训练的时间和地点
- 记录练习的具体技巧和尝试次数
- 追踪成功率和进步情况
- 支持日期范围筛选
- 练习评价和备注功能
- 详细的练习统计

### 数据仪表盘
- 技巧总数和已掌握数量统计
- 练习次数和总时长统计
- 最近练习记录展示
- 技巧掌握进度可视化
- 热门练习技巧排行榜

## 🛠️ 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Vue | 3.5.x | 渐进式 JavaScript 框架 |
| TypeScript | 6.0.x | 类型安全的 JavaScript 超集 |
| Vite | 8.0.x | 下一代前端构建工具 |
| Vue Router | 4.x | Vue.js 官方路由管理器 |
| Element Plus | 2.x | 基于 Vue 3 的桌面端组件库 |
| Tailwind CSS | 4.x | 实用优先的 CSS 框架 |

## 📁 项目结构

```
skateboard-tracker/
├── public/                     # 静态资源目录
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/                 # 资源文件
│   ├── components/             # 通用组件
│   ├── mock/                   # 模拟数据
│   │   └── data.ts             # 技巧和练习记录的模拟数据
│   ├── router/                 # 路由配置
│   │   └── index.ts            # Vue Router 路由定义
│   ├── types/                  # TypeScript 类型定义
│   │   └── index.ts            # 技巧、练习记录等类型定义
│   ├── views/                  # 页面视图
│   │   ├── Dashboard.vue       # 仪表盘页面
│   │   ├── Tricks.vue          # 技巧档案页面
│   │   └── Practice.vue        # 练习记录页面
│   ├── App.vue                 # 根组件
│   ├── main.ts                 # 应用入口
│   └── style.css               # 全局样式
├── .gitignore
├── index.html                  # HTML 入口文件
├── package.json                # 项目依赖配置
├── tsconfig.json               # TypeScript 配置
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts              # Vite 配置
```

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

```bash
cd skateboard-tracker
npm install
```

### 开发模式

```bash
npm run dev
```

应用将在 `http://localhost:5173` 启动（如果端口被占用，Vite 会自动使用其他端口）。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 预览生产版本

```bash
npm run preview
```

## 📱 页面说明

### 仪表盘 (Dashboard)
- **路径**: `/dashboard`
- 展示滑板运动的整体概览
- 包含统计卡片、最近练习记录、技巧掌握进度和热门技巧排行

### 技巧档案 (Tricks)
- **路径**: `/tricks`
- 管理所有滑板技巧
- 支持添加、编辑、删除技巧
- 支持按分类、难度、掌握状态筛选
- 支持关键词搜索

### 练习记录 (Practice)
- **路径**: `/practice`
- 管理每次滑板训练记录
- 支持添加、编辑、删除练习记录
- 记录练习时长、地点、评分
- 跟踪每个技巧的练习次数和成功率
- 支持日期范围筛选

## 📝 类型定义

### Trick (技巧)
```typescript
interface Trick {
  id: string
  name: string
  difficulty: DifficultyLevel  // 1-5
  category: string
  description: string
  mastered: boolean
  masteryLevel: number          // 0-100
  createdDate: string
  updatedDate: string
  tags: string[]
}
```

### PracticeRecord (练习记录)
```typescript
interface PracticeRecord {
  id: string
  date: string
  duration: number              // 分钟
  location: string
  tricks: PracticeTrick[]
  notes: string
  overallRating: number         // 1-5
}
```

## 🎨 设计特点

- **响应式设计**: 完美适配桌面和移动设备
- **现代化 UI**: 使用 Element Plus 组件库，界面简洁美观
- **流畅动画**: 卡片悬停效果、平滑过渡动画
- **数据可视化**: 进度条、评分组件直观展示数据
- **中文本地化**: Element Plus 组件完全中文化

## 🔧 开发说明

### 路径别名

项目已配置路径别名，可使用 `@/` 代替 `src/` 目录：

```typescript
import { mockTricks } from '@/mock/data'
import type { Trick } from '@/types'
```

### Tailwind CSS

项目使用 Tailwind CSS v4，通过 Vite 插件方式集成，无需额外配置。样式文件中使用 `@import "tailwindcss";` 即可。

### 数据持久化

当前版本数据存储在内存中，刷新页面后会重置。如需持久化存储，可考虑：

1. 使用 `localStorage` 或 `IndexedDB`
2. 对接后端 API
3. 使用状态管理库如 Pinia

## 📄 License

MIT

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

⭐ 如果这个项目对你有帮助，欢迎点个 Star！
