# 在线学习平台 (Edu Platform)

一个基于 Angular 的在线课程学习平台，包含课程进度跟踪和用户个人资料功能。

## 项目简介

本项目是一个功能完整的在线学习平台，提供以下核心功能：

- **课程页面**：查看所有注册的课程，包括进行中和已完成的课程
- **课程详情页**：查看课程内容、课程目录、学习进度，支持课时导航和进度标记
- **个人资料页**：查看用户信息、学习统计、注册的课程和成就系统

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Angular | 21.2 | 前端框架 |
| TypeScript | 5.9 | 编程语言 |
| Tailwind CSS | 最新 | CSS 框架 |
| Angular Material | 最新 | UI 组件库 |
| Angular Router | 21.2 | 路由管理 |
| Angular CLI Application Builder | 21.2 | 构建工具 |

## 项目结构

```
edu-platform/
├── src/
│   ├── app/
│   │   ├── data/                    # 模拟数据
│   │   │   └── mock-data.ts        # 模拟用户、课程、成就数据
│   │   ├── models/                  # 数据模型
│   │   │   ├── course.model.ts     # 课程相关接口
│   │   │   ├── achievement.model.ts # 成就接口
│   │   │   └── user.model.ts       # 用户接口
│   │   ├── pages/                   # 页面组件
│   │   │   ├── courses/             # 课程相关页面
│   │   │   │   ├── courses-list/   # 课程列表页
│   │   │   │   └── course-detail/  # 课程详情页
│   │   │   └── profile/            # 个人资料页
│   │   ├── services/                # 服务层
│   │   │   ├── course.service.ts   # 课程服务
│   │   │   ├── user.service.ts     # 用户服务
│   │   │   └── achievement.service.ts # 成就服务
│   │   ├── shared/                  # 共享组件
│   │   │   ├── navbar/              # 导航栏组件
│   │   │   ├── progress-bar/        # 进度条组件
│   │   │   └── course-card/         # 课程卡片组件
│   │   ├── app.html                 # 根组件模板
│   │   ├── app.ts                   # 根组件
│   │   ├── app.css                  # 根组件样式
│   │   ├── app.routes.ts            # 路由配置
│   │   └── app.config.ts            # 应用配置
│   ├── styles.css                   # 全局样式
│   └── main.ts                      # 应用入口
├── tailwind.config.js               # Tailwind CSS 配置
├── postcss.config.js                # PostCSS 配置
├── angular.json                     # Angular 配置
├── package.json                     # 依赖配置
└── tsconfig.json                    # TypeScript 配置
```

## 主要功能

### 课程页面

- **课程列表**：按状态（进行中/已完成）分类展示所有注册的课程
- **课程卡片**：显示课程封面、标题、讲师、评分、学员数、课时数和学习进度
- **进度跟踪**：直观的进度条显示课程完成百分比

### 课程详情页面

- **课程信息**：显示课程封面、标题、讲师、评分等基本信息
- **进度跟踪**：实时显示课程整体学习进度
- **课程导航**：侧边栏展示课程目录，按章节分组显示所有课时
- **可展开章节**：章节支持展开/折叠，显示每个章节的完成进度
- **课时状态**：清晰标记已完成和未完成的课时
- **上一节/下一节**：便捷的课时导航按钮
- **标记完成**：支持将课时标记为已完成/未完成

### 个人资料页面

- **用户信息**：显示头像、姓名、邮箱、简介和加入日期
- **等级系统**：显示当前等级和升级进度
- **学习统计**：
  - 已完成课程数
  - 总学习时长（小时）
  - 连续学习天数
  - 已获得成就数
- **我的课程**：按进行中和已完成分类展示课程
- **成就系统**：
  - 成就统计（已获得/待解锁/总计）
  - 已获得成就列表（含获得日期）
  - 待解锁成就列表（含成就分类）
  - 成就分类：学习成就、连续学习、社交成就、里程碑

## 快速开始

### 环境要求

- Node.js >= 18.13.0
- npm >= 8.0.0

### 安装依赖

```bash
cd edu-platform
npm install
```

### 启动开发服务器

```bash
npm start
```

或者使用 Angular CLI：

```bash
ng serve
```

启动后，在浏览器中访问 `http://localhost:4200` 即可查看应用。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist/` 目录。

### 运行测试

```bash
npm test
```

## 路由配置

| 路径 | 组件 | 描述 |
|------|------|------|
| `/` | 重定向到 `/courses` | 首页 |
| `/courses` | `CoursesListComponent` | 课程列表页 |
| `/courses/:id` | `CourseDetailComponent` | 课程详情页 |
| `/profile` | `ProfileComponent` | 个人资料页 |
| `**` | 重定向到 `/courses` | 404 页面 |

## 开发指南

### 添加新组件

使用 Angular CLI 生成新组件：

```bash
ng generate component pages/new-component
```

### 添加新服务

```bash
ng generate service services/new-service
```

### 样式规范

- 使用 Tailwind CSS 进行样式开发
- 组件特定样式放在组件的 `.css` 文件中
- 全局样式放在 `src/styles.css` 中

## 许可证

MIT License
