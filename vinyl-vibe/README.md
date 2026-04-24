# VinylVibe - 音乐商店首页模板

一个现代感强、具有品牌氛围的音乐商店首页模板，使用 React 19 + TypeScript + Vite 构建。

## 目录结构

```
vinyl-vibe/
├── public/
│   └── vite.svg              # 网站图标
├── src/
│   ├── assets/               # 静态资源
│   │   └── react.svg
│   ├── components/           # 可复用组件
│   │   ├── AboutUs.tsx       # 关于我们区块
│   │   ├── AnnouncementBar.tsx # 滚动公告条
│   │   ├── BrandSlogan.tsx   # 品牌宣传标语区
│   │   ├── Footer.tsx        # 页脚
│   │   ├── Header.tsx        # 顶部导航栏
│   │   ├── Hero.tsx          # 主视觉区域
│   │   ├── Icons.tsx         # SVG 图标组件
│   │   ├── Newsletter.tsx    # 新闻邮件订阅区
│   │   ├── ProductCard.tsx   # 商品卡片
│   │   └── ProductGrid.tsx   # 商品网格
│   ├── mock/                 # 模拟数据
│   │   └── index.ts          # 商品、公告、导航等数据
│   ├── pages/                # 页面组件
│   │   └── Home.tsx          # 首页
│   ├── router/               # 路由配置
│   │   └── index.tsx         # 路由定义
│   ├── types/                # TypeScript 类型定义
│   │   └── index.ts          # 商品、公告等类型
│   ├── App.tsx               # 应用入口组件
│   ├── index.css             # 全局样式 + Tailwind 配置
│   └── main.tsx              # 应用启动入口
├── .gitignore                # Git 忽略文件
├── eslint.config.js          # ESLint 配置
├── index.html                # HTML 入口文件
├── package.json              # 项目配置和依赖
├── tailwind.config.js        # Tailwind CSS 配置
├── tsconfig.json             # TypeScript 配置
└── vite.config.ts            # Vite 配置
```

## 技术栈

- **React 19** - 最新版本的 React 框架
- **TypeScript** - 类型安全的 JavaScript
- **Vite** - 下一代前端构建工具
- **React Router 6** - 声明式路由
- **Tailwind CSS** - 实用优先的 CSS 框架

## 启动项目

### 前置要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

```bash
cd vinyl-vibe
npm install
```

### 开发模式

```bash
npm run dev
```

项目将在 `http://localhost:5173` (或可用端口) 启动，支持热模块替换 (HMR)。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist/` 目录。

### 预览生产版本

```bash
npm run preview
```

预览构建后的生产版本。

### 代码检查

```bash
npm run lint
```

运行 ESLint 检查代码质量。

## 页面模块

| 模块 | 描述 |
|------|------|
| **Header** | 品牌 Logo + 导航图标（首页、分类、收藏、购物车、个人中心）+ 搜索栏展开/收起交互 + 移动端汉堡菜单 |
| **AnnouncementBar** | 横向滚动公告条，展示促销信息 |
| **Hero** | 大幅主视觉 + 波形 SVG + 动画音频条 + 品牌标语 + CTA 按钮 |
| **ProductGrid** | 响应式商品网格（移动端1列、平板2列、桌面4列） |
| **ProductCard** | 商品卡片：封面图、名称、艺术家、价格、评分、标签、收藏按钮、加入购物车 |
| **AboutUs** | 品牌理念介绍 + 数据统计 + 品牌故事配图 |
| **BrandSlogan** | "音乐，不只是声音" 品牌态度区块 |
| **Newsletter** | 邮箱订阅 + 表单校验 + 提交反馈状态 |
| **Footer** | 品牌信息 + 联系方式 + 社交媒体 + 辅助链接 + 版权信息 |

## 许可证

MIT License
