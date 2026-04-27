# Future Data Portal

一个未来感十足的数据可视化门户，采用冷蓝色和淡灰色调，展示动画图表和交互式仪表盘元素。

## 项目简介

Future Data Portal 是一个基于 Angular 框架构建的现代化数据可视化门户，具有未来感的 UI 设计，冷蓝色和淡灰色的配色方案，以及丰富的动画效果和交互式元素。

## 技术栈

- **框架**: Angular 19
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **UI 组件库**: PrimeNG
- **路由**: Angular Router
- **打包工具**: Angular CLI Application Builder
- **图表库**: Chart.js

## 项目结构

```
future-data-portal/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── navbar/                    # 导航栏组件
│   │   │   │   ├── navbar.component.ts
│   │   │   │   ├── navbar.component.html
│   │   │   │   └── navbar.component.css
│   │   │   ├── sidebar/                   # 侧边栏组件
│   │   │   │   ├── sidebar.component.ts
│   │   │   │   ├── sidebar.component.html
│   │   │   │   └── sidebar.component.css
│   │   │   └── stat-card/                 # 统计卡片组件
│   │   │       ├── stat-card.component.ts
│   │   │       ├── stat-card.component.html
│   │   │       └── stat-card.component.css
│   │   ├── pages/
│   │   │   ├── analytics/                 # 数据分析页面
│   │   │   │   ├── analytics.component.ts
│   │   │   │   ├── analytics.component.html
│   │   │   │   └── analytics.component.css
│   │   │   ├── charts/                    # 图表展示页面
│   │   │   │   ├── charts.component.ts
│   │   │   │   ├── charts.component.html
│   │   │   │   └── charts.component.css
│   │   │   ├── dashboard/                 # 仪表板主页面
│   │   │   │   ├── dashboard.component.ts
│   │   │   │   ├── dashboard.component.html
│   │   │   │   └── dashboard.component.css
│   │   │   ├── settings/                  # 设置页面
│   │   │   │   ├── settings.component.ts
│   │   │   │   ├── settings.component.html
│   │   │   │   └── settings.component.css
│   │   │   └── tables/                    # 数据表格页面
│   │   │       ├── tables.component.ts
│   │   │       ├── tables.component.html
│   │   │       └── tables.component.css
│   │   ├── app.component.ts               # 主组件
│   │   ├── app.component.html
│   │   ├── app.component.css
│   │   ├── app.config.ts                  # 应用配置
│   │   └── app.routes.ts                  # 路由配置
│   ├── index.html                         # 主 HTML 文件
│   ├── main.ts                            # 入口文件
│   └── styles.css                         # 全局样式
├── angular.json                           # Angular 配置
├── package.json                           # 项目依赖
├── tailwind.config.js                     # Tailwind CSS 配置
├── postcss.config.js                      # PostCSS 配置
├── tsconfig.json                          # TypeScript 配置
├── tsconfig.app.json                      # TypeScript 应用配置
└── README.md                              # 项目文档
```

## 功能特性

### 1. 仪表盘 (Dashboard)
- 统计卡片展示关键指标（用户数、收入、活跃会话、转化率）
- 动画数字计数效果
- 多系列折线图展示收入和用户增长趋势
- 环形图展示流量来源分布
- 柱状图展示每周统计数据
- 时间线展示系统事件
- 最近活动列表

### 2. 数据分析 (Analytics)
- 详细的性能指标展示
- 进度条可视化
- 流量概览折线图
- 性能雷达图
- 类别分布极坐标图

### 3. 图表展示 (Charts)
- 多标签页图表展示
- 折线图、柱状图、饼图、环形图
- 极坐标图、雷达图
- 交互式图例和悬停效果

### 4. 数据表格 (Tables)
- 高级数据表格
- 全局搜索和列级筛选
- 排序和分页功能
- 多选功能
- 状态标签显示
- 快速统计卡片

### 5. 设置 (Settings)
- 个人资料管理
- 主题切换（赛博蓝、霓虹紫、矩阵绿、太阳耀斑）
- 语言选择
- 通知偏好设置
- 安全设置（双因素认证）
- 数据管理（导出、清除缓存）

## 设计特色

### 未来感 UI 设计
- **冷蓝色调**: 主色调使用冷蓝色 (#00f3ff)，配合淡灰色背景
- **霓虹效果**: 霓虹紫色 (#bd00ff)、霓虹粉色 (#ff009d)、霓虹青色 (#00ffe1) 作为强调色
- **赛博朋克风格**: 网格背景、发光边框、数据流效果

### 动画效果
- 数字计数动画
- 图表淡入动画
- 卡片悬停发光效果
- 侧边栏滑动动画
- 脉冲动画

### 响应式设计
- 支持桌面端
- 平板适配
- 移动端响应式布局

## 安装和运行

### 环境要求
- Node.js 18.x 或更高版本
- npm 9.x 或更高版本
- Angular CLI 19.x

### 安装依赖

```bash
# 进入项目目录
cd future-data-portal

# 安装依赖
npm install
```

### 开发模式

```bash
# 启动开发服务器
npm run dev

# 或者使用 start 命令
npm run start
```

应用将在 `http://localhost:4200` 启动

### 生产构建

```bash
# 构建生产版本
npm run build
```

构建产物将输出到 `dist/future-data-portal` 目录

### 其他命令

```bash
# 监视模式构建
npm run watch

# 运行测试
npm run test
```

## 路由配置

| 路径 | 组件 | 描述 |
|------|------|------|
| `/` | 重定向到 `/dashboard` | 首页 |
| `/dashboard` | DashboardComponent | 仪表板 |
| `/analytics` | AnalyticsComponent | 数据分析 |
| `/charts` | ChartsComponent | 图表展示 |
| `/tables` | TablesComponent | 数据表格 |
| `/settings` | SettingsComponent | 系统设置 |

## 配置说明

### Tailwind CSS 配置 (`tailwind.config.js`)
- 扩展了颜色系统，包含赛博朋克风格的色彩
- 自定义动画效果（发光、浮动、闪烁等）
- 背景图案（网格、渐变等）

### PrimeNG 配置 (`angular.json`)
- 使用 `lara-dark-blue` 主题
- 集成 PrimeIcons 图标库
- 响应式布局支持

## 浏览器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 开发说明

### 组件开发规范
- 使用独立组件 (Standalone Components)
- 遵循 Angular 19 最佳实践
- 使用 PrimeNG 组件库
- 使用 Tailwind CSS 进行样式开发

### 状态管理
- 轻量级状态通过服务管理
- 使用 RxJS 进行响应式编程
- 组件间通信通过输入输出属性

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

## 联系方式

如有问题或建议，请通过以下方式联系：
- 提交 GitHub Issue
- 发送邮件至项目维护者

---

© 2024 Future Data Portal. All rights reserved.
