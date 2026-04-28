# JobBoard - 工作板应用

一个功能完善的工作板应用，支持按地点、薪资和工作类型筛选职位，提供直观的卡片式职位发布布局。

## 技术栈

- **React 19** - 前端框架
- **TypeScript** - 类型安全的 JavaScript
- **Tailwind CSS 4** - 实用优先的 CSS 框架
- **MUI (Material-UI)** - React UI 组件库
- **React Router 7** - 路由管理
- **Vite** - 下一代前端构建工具

## 项目结构

```
job-board/
├── src/
│   ├── assets/              # 静态资源
│   ├── components/          # 可复用组件
│   │   ├── Header.tsx       # 顶部导航栏
│   │   ├── FilterPanel.tsx  # 筛选面板
│   │   ├── JobCard.tsx      # 职位卡片
│   │   └── JobDetail.tsx    # 职位详情弹窗
│   ├── data/                # 数据文件
│   │   └── mockData.ts      # 模拟数据
│   ├── pages/               # 页面组件
│   │   └── Home.tsx         # 首页
│   ├── router/              # 路由配置
│   │   └── index.tsx        # 路由定义
│   ├── types/               # TypeScript 类型定义
│   │   └── index.ts         # 类型文件
│   ├── App.tsx              # 根组件
│   ├── index.css            # 全局样式
│   └── main.tsx             # 入口文件
├── index.html               # HTML 模板
├── package.json             # 项目依赖
├── tsconfig.json            # TypeScript 配置
├── vite.config.ts           # Vite 配置
└── README.md                # 项目文档
```

## 功能特性

### 1. 多维度筛选
- **地点筛选**：支持按城市（北京、上海、深圳、杭州、广州、成都、远程）筛选
- **工作类型筛选**：全职、兼职、合同、远程、实习
- **薪资范围筛选**：10k 以下、10k-20k、20k-30k、30k-50k、50k 以上

### 2. 关键词搜索
- 支持职位标题、公司名称、职位描述的关键词搜索
- 实时搜索匹配

### 3. 职位卡片展示
- 卡片式布局，关键信息一目了然
- 显示公司 Logo、职位标题、公司名称
- 工作地点、薪资范围、发布时间
- 职位类型和行业标签
- 收藏功能

### 4. 职位详情弹窗
- 完整的职位信息展示
- 职位描述、任职要求、福利待遇
- 快速申请和收藏按钮

### 5. 响应式设计
- 支持桌面端和移动端
- 自适应布局

## 安装与运行

### 环境要求
- Node.js >= 18
- npm 或 yarn 或 pnpm

### 安装依赖

```bash
cd job-board
npm install
```

### 开发模式

```bash
npm run dev
```

应用将在 `http://localhost:5173` 启动

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录

### 预览生产版本

```bash
npm run preview
```

### 代码检查

```bash
npm run lint
```

## 组件说明

### Header
顶部导航栏组件，包含：
- Logo 和应用名称
- 搜索框
- 功能按钮（发布职位、收藏、通知、用户）
- 移动端抽屉菜单

### FilterPanel
筛选面板组件，包含：
- 工作地点下拉选择
- 工作类型下拉选择
- 薪资范围下拉选择
- 筛选结果计数
- 清除筛选按钮

### JobCard
职位卡片组件，展示：
- 公司 Logo
- 职位标题和公司名称
- 职位类型和行业标签
- 工作地点
- 薪资范围
- 发布时间
- 职位描述预览
- 收藏按钮
- 查看详情按钮

### JobDetail
职位详情弹窗组件，展示：
- 完整的职位信息
- 工作地点、薪资范围、公司规模、发布时间
- 职位描述
- 任职要求列表
- 福利待遇标签
- 立即申请和收藏职位按钮

### Home
首页组件，整合所有功能：
- 状态管理（筛选条件、收藏状态、选中职位）
- 筛选逻辑
- 组件布局

## 数据结构

### Job 接口
```typescript
interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  salary: {
    min: number;
    max: number;
    currency: string;
    period: 'monthly' | 'yearly';
  };
  jobType: 'full-time' | 'part-time' | 'contract' | 'remote' | 'internship';
  description: string;
  requirements: string[];
  benefits: string[];
  postedDate: string;
  companySize: string;
  industry: string;
}
```

## 自定义与扩展

### 添加新的筛选条件
1. 在 `src/types/index.ts` 中更新 `Filters` 和 `FilterOptions` 接口
2. 在 `src/data/mockData.ts` 中更新 `filterOptions`
3. 在 `src/components/FilterPanel.tsx` 中添加新的筛选控件
4. 在 `src/pages/Home.tsx` 中更新筛选逻辑

### 添加新的页面
1. 在 `src/pages/` 目录下创建新的页面组件
2. 在 `src/router/index.tsx` 中添加路由配置
3. 在 `src/components/Header.tsx` 中添加导航链接

## 许可证

MIT
