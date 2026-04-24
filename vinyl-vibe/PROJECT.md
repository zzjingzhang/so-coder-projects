# VinylVibe - 音乐商店首页模板

一个现代感强、具有品牌氛围的音乐商店首页模板，使用 React 19 + TypeScript + Vite 构建。

## 项目概述

VinylVibe 是一个专注于高品质音乐体验的专业商店首页模板。主营黑胶唱片、耳机、播放器、数字专辑和音乐周边。整体视觉风格偏现代、潮流、沉浸式，突出音乐氛围与商品展示，兼顾品牌感与购买转化。

## 技术栈

- **React 19** - 最新版本的 React 框架
- **TypeScript** - 类型安全的 JavaScript
- **Vite** - 下一代前端构建工具
- **React Router 6** - 声明式路由
- **Tailwind CSS** - 实用优先的 CSS 框架

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
│   ├── App.css               # 应用样式（已弃用，使用 Tailwind）
│   ├── App.tsx               # 应用入口组件
│   ├── index.css             # 全局样式 + Tailwind 配置
│   ├── main.tsx              # 应用启动入口
│   └── vite-env.d.ts         # Vite 环境类型
├── .gitignore                # Git 忽略文件
├── eslint.config.js          # ESLint 配置
├── index.html                # HTML 入口文件
├── package-lock.json         # 依赖锁文件
├── package.json              # 项目配置和依赖
├── tailwind.config.js        # Tailwind CSS 配置
├── tsconfig.app.json         # 应用 TypeScript 配置
├── tsconfig.json             # 根 TypeScript 配置
├── tsconfig.node.json        # Node TypeScript 配置
└── vite.config.ts            # Vite 配置
```

## 页面模块

### 1. 顶部导航栏 (Header)
- 展示品牌 Logo（渐变色图标 + 品牌名）
- 包含导航图标：首页、分类、收藏、购物车、个人中心
- 搜索栏展开/收起交互（点击搜索图标展开，再次点击或失焦收起）
- 支持移动端汉堡菜单
- 固定定位 + 毛玻璃效果

### 2. 滚动公告条 (AnnouncementBar)
- 展示促销信息、新品上线、满减活动或免邮信息
- 横向自动滚动效果
- 渐变紫色背景，醒目但不喧宾夺主

### 3. 主视觉区域 (Hero)
- 大幅深色渐变背景
- 波形 SVG 元素 + 动画音频条，体现音乐主题
- 品牌宣传标语、副标题和主 CTA 按钮
- "立即探索" 和 "查看热卖" 按钮
- 统计数据展示（50K+ 精选唱片、100+ 品牌合作、24/7 在线客服）
- 脉冲动画背景光效

### 4. 热卖商品网格 (ProductGrid)
- 响应式卡片网格（移动端1列、平板2列、桌面4列）
- 商品卡片包含：封面图、商品名、艺术家/品牌名、价格、评分、标签
- 悬停效果：图片放大、卡片上浮、阴影加深
- 收藏按钮（心形图标，点击变色）
- 悬停显示"加入购物车"按钮
- 不同标签有不同颜色（热卖红色、经典黄色、新品绿色等）

### 5. 关于我们 (AboutUs)
- 品牌理念、音乐文化和产品定位介绍
- 搭配数据统计卡片（50,000+ 精选唱片、100+ 品牌合作、200K+ 满意顾客）
- 品牌故事配图
- 左侧文字 + 右侧图片的布局

### 6. 品牌宣传标语区 (BrandSlogan)
- 强调品牌态度的视觉区块
- "音乐，不只是声音" 标语
- 动态音频波形装饰
- 深色背景 + 模糊效果
- "它是情感，是回忆，是人生的原声带" 副标题

### 7. 新闻邮件订阅区 (Newsletter)
- 邮箱输入框和订阅按钮
- 基础邮箱格式校验
- 提交反馈状态（加载中、成功、错误）
- 渐变色卡片设计
- 隐私声明文案

### 8. 页脚 (Footer)
- 品牌信息和联系方式（地址、邮箱、电话）
- 社交媒体链接（Instagram、Twitter、Facebook、YouTube）
- 辅助链接分类：购物指南、客户服务、关于我们
- 版权信息
- 隐私政策、服务条款、Cookie 设置链接

## 设计与体验特点

### 视觉风格
- **深色主题**：以 `#111827` (gray-900) 为主背景色
- **点缀色**：紫色 `#8B5CF6` 和粉色 `#EC4899` 渐变色
- **品牌识别**：一致的渐变品牌色贯穿全站

### 交互体验
- **所有按钮**：hover/active/focus 状态明确
- **所有卡片**：hover 时有上浮和阴影效果
- **搜索栏**：平滑展开/收起动画
- **滚动公告**：无限循环滚动动画
- **音频条**：Hero 区域的动态波形动画
- **商品卡片**：图片悬停放大、收藏按钮状态切换

### 响应式设计
- **移动端** (< 640px)：单列布局、汉堡菜单、垂直按钮排列
- **平板端** (640px - 1024px)：2列商品网格、水平导航
- **桌面端** (> 1024px)：4列商品网格、完整导航、全宽布局

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

## 扩展建议

### 添加更多页面
在 `src/pages/` 目录下创建新页面：
- `Category.tsx` - 商品分类页
- `ProductDetail.tsx` - 商品详情页
- `Cart.tsx` - 购物车页
- `Wishlist.tsx` - 收藏页
- `Profile.tsx` - 用户中心

### 添加状态管理
可以集成：
- Zustand（轻量级状态管理）
- Redux Toolkit（完整状态管理）
- React Context（简单全局状态）

### 添加后端 API 集成
- 修改 `src/mock/index.ts` 中的数据来源
- 创建 `src/services/` 目录存放 API 服务
- 使用 TanStack Query (React Query) 管理服务器状态

### 添加动画库
- Framer Motion - 复杂动画
- GSAP - 高级动画控制

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 许可证

MIT License
