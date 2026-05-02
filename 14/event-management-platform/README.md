# EventFlow - 在线活动管理平台

一个功能强大的在线活动管理平台，采用现代化的 UI 设计，配备交互式日程安排工具，帮助您轻松管理各类活动。

## 项目特点

- **现代化设计**：采用冷灰色调与鲜艳强调色的配色方案，提供专业且现代的视觉体验
- **交互式日程**：内置功能完善的日历视图，支持活动的添加、编辑、删除和查看
- **响应式布局**：完美适配各种屏幕尺寸，从移动端到桌面端都有出色的显示效果
- **组件化架构**：基于 Vue 3 + TypeScript 构建，代码结构清晰，易于维护和扩展

## 技术栈

- **前端框架**：Vue 3.5
- **开发语言**：TypeScript
- **样式框架**：Tailwind CSS 4.0
- **UI 组件库**：Element Plus 2.9
- **路由管理**：Vue Router 4.5
- **构建工具**：Vite 8.0

## 项目结构

```
event-management-platform/
├── public/
│   └── vite.svg              # Vite 默认图标
├── src/
│   ├── router/
│   │   └── index.ts          # 路由配置
│   ├── views/
│   │   ├── HomeView.vue      # 首页视图（包含主视觉区域）
│   │   └── ScheduleView.vue  # 日程安排视图
│   ├── App.vue                # 根组件
│   ├── main.ts                # 入口文件
│   └── style.css              # 全局样式
├── .gitignore                 # Git 忽略文件
├── index.html                 # HTML 模板
├── package.json               # 项目配置
├── postcss.config.js          # PostCSS 配置
├── tailwind.config.js         # Tailwind CSS 配置
├── tsconfig.app.json          # TypeScript 应用配置
├── tsconfig.json              # TypeScript 主配置
├── tsconfig.node.json         # TypeScript Node 配置
└── vite.config.ts             # Vite 配置
```

## 主要功能

### 1. 首页 (HomeView)

- **主视觉区域 (Hero Section)**：采用冷灰色渐变背景，配合青色 (accent) 强调色，突出平台核心价值
- **功能特性展示**：展示平台的 6 大核心功能，包括智能日程安排、参与者管理、数据分析报告等
- **行动召唤区域**：鼓励用户开始使用平台，提供免费试用

### 2. 日程安排 (ScheduleView)

- **日历视图**：直观的月份日历展示，支持切换月份、返回今天、选择日期
- **活动列表**：右侧显示活动列表，支持搜索、状态筛选、日期筛选
- **活动管理**：
  - 添加新活动
  - 编辑现有活动
  - 删除活动（带确认提示）
  - 查看活动详情
- **活动状态**：支持 4 种活动状态（进行中、筹备中、已完成、已取消）

## 安装与运行

### 前置要求

确保您的开发环境已安装：
- Node.js (推荐 18.0 或更高版本)
- npm (通常随 Node.js 一起安装)

### 安装步骤

1. **进入项目目录**

```bash
cd event-management-platform
```

2. **安装依赖**

```bash
npm install
```

### 运行项目

**开发模式**：

```bash
npm run dev
```

项目启动后，在浏览器中访问 `http://localhost:5173` 即可查看应用。

**构建生产版本**：

```bash
npm run build
```

构建完成后，生成的文件将位于 `dist` 目录中。

**预览生产版本**：

```bash
npm run preview
```

## 设计规范

### 配色方案

- **主色调 (冷灰色)**：用于背景、文本和次要元素
  - `cold-gray-50` 到 `cold-gray-950`
- **强调色 (青色)**：用于按钮、链接、高亮和交互元素
  - `accent-50` 到 `accent-950`
- **状态色**：
  - 成功/进行中：绿色
  - 警告/筹备中：黄色
  - 信息/已完成：蓝色
  - 危险/已取消：红色

### 排版

- 使用系统字体栈，优先使用 Inter 字体
- 标题使用粗体，正文使用常规字重
- 响应式字体大小，确保在各种屏幕尺寸上的可读性

### 组件规范

- 所有按钮文字水平垂直居中
- 输入框和表单元素有清晰的边框和焦点状态
- 卡片和容器使用圆角和阴影增加层次感
- 交互元素有明确的悬停和点击反馈

## 浏览器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 开发说明

### 组件开发

- 使用 Vue 3 的 Composition API
- 所有组件使用 TypeScript 编写
- 样式使用 Tailwind CSS 类名，配合 scoped style
- 遵循 Vue 3 和 TypeScript 的最佳实践

### 状态管理

- 当前使用 Vue 的响应式 API (ref, reactive) 进行状态管理
- 对于更复杂的应用，可以考虑引入 Pinia 状态管理库

### 路由

- 使用 Vue Router 4 进行路由管理
- 当前包含两个路由：
  - `/` - 首页
  - `/schedule` - 日程安排

## 后续扩展建议

1. **状态管理**：引入 Pinia 进行全局状态管理
2. **数据持久化**：添加本地存储或后端 API 集成
3. **用户认证**：添加登录、注册功能
4. **通知系统**：添加活动提醒和通知功能
5. **导出功能**：支持导出日程到日历应用
6. **多语言支持**：添加国际化功能
7. **主题切换**：支持亮色/暗色主题切换

## 许可证

MIT License

## 联系方式

如有问题或建议，请通过以下方式联系：
- 提交 Issue
- 发送 Pull Request

---

**EventFlow** - 让活动管理变得简单高效！