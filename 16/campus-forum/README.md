# 校园论坛首页

一个基于 React + TypeScript + Tailwind CSS + Ant Design 的校园论坛首页。

## 技术栈

- **React 19**: 前端框架
- **TypeScript**: 类型安全的 JavaScript
- **Tailwind CSS 4**: 实用优先的 CSS 框架
- **Ant Design 6**: 企业级 UI 组件库
- **React Router 7**: 路由管理
- **Vite 8**: 下一代前端构建工具

## 项目结构

```
campus-forum/
├── public/              # 静态资源
├── src/
│   ├── components/      # 组件目录
│   │   ├── SearchBar.tsx      # 搜索栏组件
│   │   ├── CategoryNav.tsx    # 分类导航栏组件
│   │   ├── PostCard.tsx       # 帖子卡片组件
│   │   └── PostList.tsx       # 帖子列表组件
│   ├── data/            # 数据目录
│   │   └── mockData.ts        # 模拟数据
│   ├── types/           # 类型定义
│   │   └── index.ts            # TypeScript 类型定义
│   ├── App.tsx          # 主应用组件
│   ├── App.css          # 应用样式
│   ├── index.css        # 全局样式（Tailwind 配置）
│   └── main.tsx         # 入口文件
├── index.html           # HTML 模板
├── package.json         # 项目配置
├── tsconfig.json        # TypeScript 配置
├── vite.config.ts       # Vite 配置
└── README.md            # 项目文档
```

## 页面结构

首页包含以下区域，从上到下依次为：

1. **搜索栏** (顶部)
   - 固定在顶部的搜索框
   - 支持搜索帖子、用户、话题
   - 左侧有搜索图标

2. **分类导航栏** (搜索栏下方)
   - 横向滚动的分类标签
   - 包含：全部、学习交流、校园活动、二手交易、情感分享、求职招聘、美食分享、兴趣爱好
   - 选中状态高亮显示

3. **帖子概览列表** (主体内容区)
   每个帖子卡片包含以下内容，从上到下依次为：
   - **发帖人信息**: 头像 + 昵称 + 发布时间
   - **帖子标题**: 加粗显示，支持多行
   - **帖子内容预览**: 最多显示 3 行
   - **媒体内容**: 图片或视频（可选）
   - **板块标签**: 蓝色标签显示所属分类
   - **交互按钮**: 分享、评论、点赞，按钮文字水平垂直居中

## 功能特性

- ✅ 响应式设计，适配不同屏幕尺寸
- ✅ 搜索功能：支持按标题、内容、作者昵称搜索
- ✅ 分类筛选：点击分类标签筛选对应帖子
- ✅ 点赞功能：点击点赞按钮切换状态
- ✅ 卡片式布局，视觉层次分明
- ✅ 按钮文字水平垂直居中显示
- ✅ 色彩搭配合理，文字清晰可读

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

```bash
cd campus-forum
npm install
```

### 启动开发服务器

```bash
npm run dev
```

开发服务器启动后，访问 `http://localhost:5173` 即可查看页面。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 预览生产版本

```bash
npm run preview
```

### 代码检查

```bash
npm run lint
```

## 设计说明

### 色彩搭配

- **主色调**: 蓝色 (#3b82f6) - 用于按钮、标签、高亮状态
- **背景色**: 浅灰色 (#f9fafb) - 页面背景
- **卡片背景**: 白色 (#ffffff) - 帖子卡片
- **文字颜色**: 
  - 标题: 深灰色 (#111827)
  - 内容: 中灰色 (#4b5563)
  - 次要文字: 浅灰色 (#9ca3af)

### 空间分配

- **搜索栏**: 高度约 56px，固定在顶部
- **分类导航栏**: 高度约 48px，可横向滚动
- **帖子卡片**: 
  - 内边距: 16px
  - 头像区域: 高度约 60px
  - 标题区域: 自适应，最多 2 行
  - 内容预览: 自适应，最多 3 行
  - 媒体区域: 最大高度 320px，自适应
  - 交互按钮: 高度约 48px，三等分分布

## 开发说明

### 添加新分类

在 `src/data/mockData.ts` 中的 `categories` 数组添加新分类：

```typescript
export const categories: Category[] = [
  // ... 现有分类
  { id: '9', name: '新分类名称' },
];
```

### 添加新帖子

在 `src/data/mockData.ts` 中的 `posts` 数组添加新帖子：

```typescript
export const posts: Post[] = [
  // ... 现有帖子
  {
    id: '6',
    author: {
      id: '106',
      avatar: '头像URL',
      nickname: '用户昵称',
    },
    title: '帖子标题',
    content: '帖子内容',
    mediaType: 'image', // 'image' | 'video' | 'none'
    mediaUrl: '媒体URL',
    category: '分类名称',
    shareCount: 0,
    commentCount: 0,
    likeCount: 0,
    isLiked: false,
    createdAt: '2026-05-01 12:00',
  },
];
```

## License

MIT
