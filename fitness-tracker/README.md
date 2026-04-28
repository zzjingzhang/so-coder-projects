# Fitness Tracker - 健身追踪应用

一个功能完整的纯前端健身追踪网页应用，帮助用户记录运动、管理体重、跟踪饮食、制定训练计划并获得成就激励。

## 功能特性

### 🏃 运动记录
- 记录多种运动类型（跑步、骑行、游泳、力量训练、瑜伽等）
- 记录运动时长、强度和消耗卡路里
- 运动统计和类型分布分析
- 支持添加、编辑和删除运动记录

### ⚖️ 体重管理
- 记录体重、体脂率和肌肉量
- 体重变化趋势可视化
- 设置体重目标和目标日期
- 目标进度跟踪和统计

### 🍎 饮食日志
- 记录每日三餐和零食
- 详细的营养成分分析（卡路里、蛋白质、碳水、脂肪、膳食纤维）
- 每日营养摄入统计
- 营养目标跟踪

### 💪 训练计划
- 创建和管理个人训练计划
- 每周训练日安排
- 详细的训练动作设置（组数、次数、重量）
- 今日训练提醒
- 支持激活/暂停训练计划

### 🏆 成就系统
- 多种成就类型（里程碑、连续打卡、目标达成、坚持）
- 成就进度跟踪
- 最近解锁成就展示
- 成就分类查看（全部、已解锁、未解锁）

## 技术栈

- **框架**: Vue 3 (Composition API)
- **语言**: TypeScript
- **UI 组件库**: Vuetify 3
- **路由**: Vue Router 4
- **样式**: Tailwind CSS
- **打包工具**: Vite 5
- **图表库**: Chart.js + Vue Chart.js (可选)
- **图标**: Material Design Icons

## 项目结构

```
fitness-tracker/
├── public/
│   └── vite.svg
├── src/
│   ├── data/
│   │   └── mockData.ts          # 模拟数据
│   ├── router/
│   │   └── index.ts             # Vue Router 配置
│   ├── types/
│   │   └── index.ts             # TypeScript 类型定义
│   ├── views/
│   │   ├── App.vue              # 主应用组件
│   │   ├── Dashboard.vue        # 仪表盘页面
│   │   ├── Exercise.vue         # 运动记录页面
│   │   ├── Weight.vue           # 体重管理页面
│   │   ├── Nutrition.vue        # 饮食日志页面
│   │   ├── Training.vue         # 训练计划页面
│   │   └── Achievements.vue     # 成就系统页面
│   ├── main.ts                  # 应用入口
│   └── style.css                # 全局样式（包含 Tailwind）
├── index.html                   # HTML 模板
├── package.json                 # 项目依赖
├── tsconfig.json                # TypeScript 配置
├── tsconfig.node.json           # TypeScript Node 配置
├── vite.config.ts               # Vite 配置
├── tailwind.config.js           # Tailwind CSS 配置
└── postcss.config.js            # PostCSS 配置
```

## 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0 或 yarn >= 1.22.0

### 安装依赖

```bash
# 使用 npm
npm install

# 或使用 yarn
yarn install
```

### 开发模式

```bash
# 使用 npm
npm run dev

# 或使用 yarn
yarn dev
```

应用将在 `http://localhost:5173` 启动。

### 构建生产版本

```bash
# 使用 npm
npm run build

# 或使用 yarn
yarn build
```

构建产物将输出到 `dist` 目录。

### 预览生产构建

```bash
# 使用 npm
npm run preview

# 或使用 yarn
yarn preview
```

## 页面说明

### 仪表盘 (Dashboard)
- 总览所有健身数据
- 展示关键统计指标（运动次数、时长、卡路里、连续打卡天数）
- 近期运动记录列表
- 今日营养摄入概览
- 体重趋势和目标进度

### 运动记录 (Exercise)
- 运动记录列表（数据表格）
- 运动统计卡片
- 运动类型分布
- 添加/编辑运动记录对话框

### 体重管理 (Weight)
- 当前体重展示
- 体重变化对比
- 体重目标设置和进度
- 体重记录列表
- 体重趋势图表占位

### 饮食日志 (Nutrition)
- 今日营养摄入统计
- 各餐次卡路里统计
- 今日饮食记录详情
- 添加餐食对话框（支持多食物条目）

### 训练计划 (Training)
- 训练计划统计
- 今日训练安排提醒
- 训练计划列表（可展开详情）
- 每周训练日安排展示
- 创建训练计划对话框（支持多日多动作配置）

### 成就系统 (Achievements)
- 成就统计概览
- 最近解锁成就
- 成就分类展示（全部/已解锁/未解锁）
- 成就进度条
- 成就卡片组件

## 数据说明

当前版本使用模拟数据 (`src/data/mockData.ts`)，数据存储在内存中。在实际应用中，可以：

1. 集成后端 API 进行数据持久化
2. 使用 localStorage 或 IndexedDB 进行本地存储
3. 集成 Firebase 或其他 BaaS 服务

## 自定义配置

### Tailwind CSS 配置

编辑 `tailwind.config.js` 来自定义颜色、间距、断点等。

### Vuetify 主题配置

在 `src/main.ts` 中修改 Vuetify 实例配置来自定义主题、颜色等。

### 添加新页面

1. 在 `src/views/` 下创建新的 Vue 组件
2. 在 `src/router/index.ts` 中添加路由配置
3. 在 `src/App.vue` 中更新导航菜单（如果需要）

## 扩展建议

- [ ] 添加用户认证系统
- [ ] 集成 Chart.js 实现数据可视化图表
- [ ] 添加数据导入导出功能
- [ ] 实现数据持久化（localStorage/后端 API）
- [ ] 添加通知和提醒功能
- [ ] 支持多语言国际化
- [ ] 添加深色主题
- [ ] 实现 PWA 支持

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！
