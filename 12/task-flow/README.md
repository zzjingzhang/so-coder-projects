# TaskFlow - 项目管理工具

一个功能完善的项目管理工具，支持项目创建、任务管理、团队协作，界面美观且操作简单。

## 功能特性

- **项目管理**: 创建、编辑、删除项目，支持项目颜色标签
- **任务管理**: 任务看板视图，支持待办/进行中/已完成三种状态
- **成员管理**: 添加、编辑、删除团队成员，支持角色管理
- **任务分配**: 将任务分配给指定成员，设置优先级和截止日期
- **实时更新**: 数据实时更新，支持本地存储持久化
- **响应式设计**: 支持桌面端和移动端，界面美观友好

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Angular | 21.2.x | 前端框架 |
| TypeScript | 5.9.x | 编程语言 |
| Tailwind CSS | 4.2.x | CSS 框架 |
| NG-ZORRO | 21.2.x | UI 组件库 |
| Angular Router | 21.2.x | 路由管理 |
| Angular CLI | 21.2.x | 构建工具 |

## 项目结构

```
task-flow/
├── src/
│   ├── app/
│   │   ├── models/
│   │   │   └── project.model.ts        # 数据模型定义
│   │   ├── services/
│   │   │   ├── project.service.ts      # 项目服务
│   │   │   ├── task.service.ts         # 任务服务
│   │   │   └── member.service.ts       # 成员服务
│   │   ├── pages/
│   │   │   ├── dashboard/              # 仪表盘页面
│   │   │   │   ├── dashboard.component.ts
│   │   │   │   ├── dashboard.component.html
│   │   │   │   └── dashboard.component.css
│   │   │   ├── project-list/           # 项目列表页面
│   │   │   │   ├── project-list.component.ts
│   │   │   │   ├── project-list.component.html
│   │   │   │   └── project-list.component.css
│   │   │   ├── project-detail/         # 项目详情页面
│   │   │   │   ├── project-detail.component.ts
│   │   │   │   ├── project-detail.component.html
│   │   │   │   └── project-detail.component.css
│   │   │   └── member-list/            # 成员管理页面
│   │   │       ├── member-list.component.ts
│   │   │       ├── member-list.component.html
│   │   │       └── member-list.component.css
│   │   ├── app.ts                      # 根组件
│   │   ├── app.html                    # 根组件模板
│   │   ├── app.css                     # 根组件样式
│   │   ├── app-module.ts               # 根模块
│   │   └── app-routing-module.ts       # 路由配置
│   ├── main.ts                         # 应用入口
│   ├── index.html                      # HTML 模板
│   └── styles.css                      # 全局样式
├── angular.json                        # Angular 配置
├── package.json                        # 依赖配置
├── tsconfig.json                       # TypeScript 配置
├── tailwind.config.js                  # Tailwind 配置
├── postcss.config.js                   # PostCSS 配置
└── README.md                           # 项目文档
```

## 页面功能

### 1. 仪表盘 (Dashboard)
- 显示项目和任务统计数据
- 任务进度可视化
- 最近任务列表
- 项目概览卡片

### 2. 项目管理 (Projects)
- 项目列表展示
- 创建新项目
- 编辑项目信息
- 删除项目（含确认对话框）
- 项目卡片展示进度和成员

### 3. 项目详情 (Project Detail)
- 看板视图展示任务（待办/进行中/已完成）
- 任务状态快速切换
- 创建、编辑、删除任务
- 项目成员管理
- 任务分配给成员
- 设置任务优先级和截止日期

### 4. 成员管理 (Members)
- 成员列表展示
- 添加新成员
- 编辑成员信息
- 删除成员
- 角色标签显示（管理员/成员/访客）

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 8.0.0

### 安装依赖

```bash
cd task-flow
npm install
```

### 启动开发服务器

```bash
npm start
```

启动后访问 http://localhost:4200 即可查看应用。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist/` 目录。

## 数据存储

应用使用浏览器的 `localStorage` 进行数据持久化存储，包括：
- 项目数据 (`taskflow_projects`)
- 任务数据 (`taskflow_tasks`)
- 成员数据 (`taskflow_members`)

刷新页面或重新打开浏览器后，数据会自动恢复。

## 开发说明

### 添加新组件

```bash
ng generate component pages/new-page
# 或简写
ng g c pages/new-page
```

### 添加新服务

```bash
ng generate service services/new-service
# 或简写
ng g s services/new-service
```

### 样式规范

- 使用 Tailwind CSS 进行样式开发
- 组件内样式使用 `component.css` 文件
- 全局样式在 `src/styles.css` 中定义
- 按钮文字自动水平垂直居中显示
- 色彩搭配遵循 NG-ZORRO 设计规范

## 浏览器支持

| 浏览器 | 版本 |
|--------|------|
| Chrome | 最新版 |
| Firefox | 最新版 |
| Safari | 最新版 |
| Edge | 最新版 |

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

---

**TaskFlow** - 让项目管理更简单高效 🚀
