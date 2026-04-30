# Vue Task App

一个使用 Vue 3 + TypeScript + Vite 构建的现代化单页面应用示例。

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架，使用 Composition API
- **TypeScript** - JavaScript 的超集，提供静态类型检查
- **Vite** - 下一代前端构建工具
- **Vuetify** - Vue UI 组件库，基于 Material Design
- **Vue Router** - Vue.js 官方路由管理器
- **Pinia** - Vue 状态管理库，新一代的 Vuex
- **Tailwind CSS** - 实用优先的 CSS 框架
- **Vitest** - 下一代前端单元测试框架
- **ESLint** - JavaScript/TypeScript 代码检查工具
- **Prettier** - 代码格式化工具

## 项目结构

```
vue-task-app/
├── src/
│   ├── components/          # 通用组件
│   │   ├── AppHeader.vue    # 顶部导航栏组件
│   │   └── AppSidebar.vue   # 可折叠侧边栏组件
│   ├── services/            # 服务层
│   │   ├── taskService.ts   # 任务服务（模拟异步请求）
│   │   └── __tests__/       # 服务层单元测试
│   │       └── taskService.test.ts
│   ├── stores/              # 状态管理（Pinia）
│   │   ├── taskStore.ts     # 任务状态 Store
│   │   └── __tests__/       # Store 单元测试
│   │       └── taskStore.test.ts
│   ├── views/               # 页面组件
│   │   ├── TaskView.vue     # 任务管理页面
│   │   ├── TableView.vue    # 数据表格页面
│   │   └── AboutView.vue    # 关于页面
│   ├── router/              # 路由配置
│   │   └── index.ts
│   ├── types/               # TypeScript 类型定义
│   │   └── index.ts
│   ├── App.vue               # 根组件
│   ├── main.ts               # 应用入口
│   └── style.css             # 全局样式
├── index.html                # HTML 入口文件
├── vite.config.ts            # Vite 配置
├── vitest.config.ts          # Vitest 测试配置
├── tailwind.config.js        # Tailwind CSS 配置
├── postcss.config.js         # PostCSS 配置
├── eslint.config.js          # ESLint 配置
├── prettier.config.js        # Prettier 配置
├── tsconfig.json             # TypeScript 配置
├── tsconfig.app.json         # 应用 TypeScript 配置
├── tsconfig.node.json        # Node TypeScript 配置
├── package.json              # 项目依赖配置
└── README.md                 # 项目说明文档
```

## 功能特性

### 1. 任务管理页面 (`/tasks`)
- 展示任务列表（支持加载状态显示）
- 添加新任务
- 标记任务为完成/未完成
- 删除任务
- 统计总任务数、已完成数、待完成数、完成率

### 2. 数据表格页面 (`/table`)
- 使用 Vuetify 数据表格展示甜点营养数据
- 支持搜索功能
- 支持排序功能
- 支持分页

### 3. 关于页面 (`/about`)
- 项目简介
- 技术栈展示
- 项目特性列表
- 开发工具列表

### 4. 导航系统
- 顶部导航栏（固定）
- 可折叠侧边栏菜单
- 路由图标和名称显示

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

应用将在 `http://localhost:5173` 启动。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 预览生产版本

```bash
npm run preview
```

### 运行测试

```bash
# 运行测试（watch 模式）
npm run test

# 运行测试并退出
npm run test:run
```

### 代码检查与格式化

```bash
# 运行 ESLint 检查并自动修复
npm run lint

# 使用 Prettier 格式化代码
npm run format
```

## 架构设计

### 服务层 (`services`)
- 独立于组件的业务逻辑层
- 模拟异步 API 请求（使用 `setTimeout` 模拟延迟）
- 提供任务的增删改查接口
- 易于替换为真实的 API 调用

### 状态管理 (`stores`)
- 使用 Pinia 进行全局状态管理
- 响应式状态更新
- 提供 computed 属性（已完成任务、待完成任务等）
- 统一的错误处理

### 组件设计
- 单文件组件 (SFC) 使用 `<script setup>` 语法
- 遵循 Composition API 最佳实践
- 组件职责单一
- 支持 TypeScript 类型推断

## 单元测试

测试覆盖率包括：

### 服务层测试
- `getTasks()` - 获取任务列表
- `getTaskById()` - 根据 ID 获取任务
- `createTask()` - 创建新任务
- `updateTask()` - 更新任务
- `deleteTask()` - 删除任务
- `toggleTaskComplete()` - 切换任务完成状态

### Monkey-Patch 测试
- 演示如何在测试中 mock 服务方法
- 模拟成功场景
- 模拟错误场景
- 自定义行为模拟

### Store 测试
- 初始状态验证
- `fetchTasks()` - 加载任务
- `addTask()` - 添加任务
- `toggleTask()` - 切换任务状态
- `removeTask()` - 删除任务
- 错误处理测试
- computed 属性验证

## 代码规范

- 使用 TypeScript 进行类型安全开发
- 遵循 ESLint 配置的代码规范
- 使用 Prettier 进行代码格式化
- 组件使用 Composition API + `<script setup>`
- 路径别名 `@/` 指向 `src/` 目录

## 许可证

MIT
