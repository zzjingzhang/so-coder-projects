# SprintHub - Agile Sprint Dashboard

一个功能丰富的敏捷冲刺仪表盘应用，使用 Angular 框架构建。

## 项目概述

SprintHub 是一个现代化的敏捷项目管理仪表盘，提供直观的界面来管理冲刺、跟踪团队进度和监控项目指标。

## 技术栈

- **框架**: Angular 17+
- **语言**: TypeScript 5.0+
- **样式**: Tailwind CSS 3.0+
- **UI 组件库**: Angular Material 17+
- **图标库**: 
  - FontAwesome 6.0+
  - Material Design Icons 7.0+
- **路由**: Angular Router
- **打包工具**: Angular CLI Application Builder

## 项目结构

```
sprint-dashboard/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── burn-chart/           # 燃尽图组件
│   │   │   │   ├── burn-chart.component.ts
│   │   │   │   ├── burn-chart.component.html
│   │   │   │   └── burn-chart.component.css
│   │   │   ├── left-sidebar/         # 左侧导航抽屉组件
│   │   │   │   ├── left-sidebar.component.ts
│   │   │   │   ├── left-sidebar.component.html
│   │   │   │   └── left-sidebar.component.css
│   │   │   ├── metric-cards/         # 指标卡片组件
│   │   │   │   ├── metric-cards.component.ts
│   │   │   │   ├── metric-cards.component.html
│   │   │   │   └── metric-cards.component.css
│   │   │   ├── progress-circle/      # 环形进度条组件
│   │   │   │   ├── progress-circle.component.ts
│   │   │   │   ├── progress-circle.component.html
│   │   │   │   └── progress-circle.component.css
│   │   │   ├── right-sidebar/        # 右侧抽屉组件
│   │   │   │   ├── right-sidebar.component.ts
│   │   │   │   ├── right-sidebar.component.html
│   │   │   │   └── right-sidebar.component.css
│   │   │   ├── story-table/          # 冲刺故事表格组件
│   │   │   │   ├── story-table.component.ts
│   │   │   │   ├── story-table.component.html
│   │   │   │   └── story-table.component.css
│   │   │   └── team-members/         # 团队成员列表组件
│   │   │       ├── team-members.component.ts
│   │   │       ├── team-members.component.html
│   │   │       └── team-members.component.css
│   │   ├── pages/
│   │   │   ├── dashboard/            # 仪表盘页面
│   │   │   │   ├── dashboard.component.ts
│   │   │   │   ├── dashboard.component.html
│   │   │   │   └── dashboard.component.css
│   │   │   └── about/                # About 页面
│   │   │       ├── about.component.ts
│   │   │       ├── about.component.html
│   │   │       └── about.component.css
│   │   ├── services/
│   │   │   └── dashboard.service.ts  # 数据服务（包含硬编码数据）
│   │   ├── app-module.ts             # 根模块
│   │   ├── app-routing-module.ts     # 路由配置
│   │   ├── app.ts                    # 根组件
│   │   ├── app.html                  # 根组件模板
│   │   └── app.css                   # 根组件样式
│   ├── styles.css                    # 全局样式
│   └── index.html                    # 入口 HTML
├── tailwind.config.js                # Tailwind CSS 配置
├── postcss.config.js                 # PostCSS 配置
├── angular.json                      # Angular 配置
├── package.json                      # 项目依赖
└── README.md                         # 项目文档
```

## 功能特性

### 左侧导航抽屉
- 可折叠的导航菜单
- FontAwesome 图标导航
- 底部通知铃铛（带数字徽章）
- 用户头像

### 右侧抽屉
- **Epics 列表**: 每项带有颜色图标、标题和子标题
- **进度卡片**: 
  - 项目进度环形进度条
  - 业务目标环形进度条
  - 预算使用环形进度条
- **Project Details 按钮**

### 主视图（仪表盘）
- **顶部工具栏**:
  - 左右箭头切换按钮组
  - "完成冲刺"按钮
- **指标卡片**:
  - 团队速度
  - 成员数量
  - 已交付任务
  - 已交付 Spike
  - 新闻事件
  - 点击后切换激活样式
- **燃尽图 (饼图)**: 标题为 "Burnsown chart"，显示不同流量来源的占比
- **冲刺故事表格**: 列出 ID、标题、状态、计数和操作图标
- **团队成员列表**: 展示头像、姓名和 Story Point，支持在线状态徽章

### 页面
- **首页 (仪表盘)**: 包含所有主要功能
- **About 页面**: 项目介绍、特性展示和技术栈说明

## 设计规范

- **主题**: 暗色主题
- **主色调**: `#49D9A0` (绿色)
- **背景色**: `#EEEEEE`
- **深色背景**: `#1a1a2e`, `#16213e`
- **图标库**: FontAwesome + Material Design Icons

## 数据说明

当前所有数据使用本地硬编码数组实现，可以轻松接入后端 API。数据位于 `src/app/services/dashboard.service.ts` 文件中。

### 硬编码数据包括：
- 导航菜单
- Epics 列表
- 进度数据
- 指标卡片数据
- 燃尽图数据
- 冲刺故事数据
- 团队成员数据

## 如何启动项目

### 前置要求
- Node.js (推荐 v18+)
- npm 或 yarn

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run start
# 或
ng serve
```

项目启动后，打开浏览器访问 `http://localhost:4200`

### 构建项目
```bash
npm run build
# 或
ng build
```

构建产物将输出到 `dist/` 目录。

### 监听模式（开发）
```bash
npm run watch
# 或
ng build --watch --configuration development
```

## 后续扩展建议

1. **接入后端 API**:
   - 修改 `dashboard.service.ts` 中的方法，使用 `HttpClient` 调用真实 API
   - 添加错误处理和加载状态

2. **添加状态管理**:
   - 使用 NgRx 或 Akita 进行状态管理

3. **添加更多图表**:
   - 集成 ngx-charts 或 Chart.js
   - 添加更多数据可视化组件

4. **用户认证**:
   - 添加登录/注册功能
   - 实现 JWT 认证

5. **国际化**:
   - 添加 i18n 支持

## 许可证

MIT License
