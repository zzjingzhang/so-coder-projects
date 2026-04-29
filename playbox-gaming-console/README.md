# PLAYBOX - 便携式游戏主机营销页面

一个现代化的营销型单页应用，用于展示 PLAYBOX 便携式游戏主机。采用霓虹游戏主题设计，包含丰富的动画效果和响应式布局。

## 项目简介

PLAYBOX 是一个用于展示便携式游戏主机的营销页面，具有以下特色：

- 🎮 霓虹游戏主题设计，包含脉冲、漂浮、发光等动画效果
- 📱 完全响应式布局，支持桌面端和移动端
- 🎨 自定义游戏主题颜色变量和动画关键帧
- 🧭 移动端汉堡菜单导航
- ⭐ 用户评价展示和信任评分
- 🛒 产品展示和购物车功能

## 技术栈

- **框架**: React 19
- **语言**: TypeScript
- **样式**: Tailwind CSS 4
- **路由**: React Router 7
- **构建工具**: Vite 8

## 项目结构

```
playbox-gaming-console/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components/
│   │   ├── RatingStars.tsx      # 评分星星组件
│   │   ├── Header.tsx           # 导航栏组件
│   │   ├── Hero.tsx             # 首页 Hero 组件
│   │   ├── ProductShowcase.tsx  # 产品展示组件
│   │   ├── Reviews.tsx          # 用户评价组件
│   │   └── Footer.tsx           # 页脚组件
│   ├── pages/
│   │   ├── Home.tsx             # 首页
│   │   └── NotFound.tsx         # 404 页面
│   ├── router/
│   │   └── index.tsx            # 路由配置
│   ├── types/
│   │   └── index.ts             # TypeScript 类型定义
│   ├── data/
│   │   └── mockData.ts          # 模拟数据
│   ├── App.tsx                  # 应用入口组件
│   ├── main.tsx                 # 应用入口文件
│   └── index.css                # 全局样式和主题配置
├── .gitignore
├── README.md
├── eslint.config.js
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

## 主要功能

### 1. 首页（Hero 区块）
- 全屏背景图叠加霓虹渐变
- 标题使用 neon 文本动画效果
- 提供 "Buy Now" 与 "Watch Demo" 两个 CTA 按钮
- 使用自定义 gaming 变体按钮样式
- 展示核心指标：20K+ 游戏、8小时电池、4.9 评分

### 2. 导航栏（Header）
- 桌面端水平导航
- 移动端汉堡菜单（侧滑抽屉）
- 滚动时背景变化效果
- 包含 Home、Shop、Reviews、Contact 链接
- 搜索、用户、购物车图标

### 3. 产品展示（ProductShowcase）
- 特性卡片网格（20,000+ 游戏、8 小时电池、WiFi、音频等）
- 产品卡片展示（PLAYBOX Pro、Lite、Max）
- 颜色选择器
- 评分星星显示
- "Add to Cart" 按钮（带动画效果）
- 服务保障展示（免费配送、1年保修、30天退换、24/7支持）

### 4. 用户评价（Reviews）
- 信任评分展示（4.9）
- 评分分布可视化
- 多条 5 星评论展示
- 包含评分星星、日期、标题、内容
- Verified 认证徽章
- 信任徽章图片

### 5. 页脚（Footer）
- 品牌简介
- 快速链接导航
- 支持链接导航
- 订阅表单（邮件输入 + 按钮）
- 社交媒体图标（Facebook、Twitter、Instagram、YouTube、Discord）
- 版权信息和法律链接

### 6. 主题与动画
- 游戏专属颜色变量：
  - `--gaming-neon`: 霓虹粉色 (#ff00ff)
  - `--gaming-purple`: 紫色 (#9333ea)
  - `--gaming-cyan`: 青色 (#06b6d4)
  - `--gaming-dark`: 深色背景 (#0f0f1a)
- 动画关键帧：
  - `pulse-neon`: 霓虹脉冲动画
  - `float`: 漂浮动画
  - `glow`: 发光效果
  - `slideUp`: 滑入动画
  - `fadeIn`: 淡入动画

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

### 代码检查

```bash
npm run lint
```

## 路由配置

- `/`: 首页（Home）
- `*`: 404 页面（NotFound）

## 响应式设计

- **移动端 (< 768px)**: 单列布局，汉堡菜单导航
- **平板 (768px - 1024px)**: 双列布局，水平导航
- **桌面 (> 1024px)**: 多列布局，完整导航

## 自定义主题

主题颜色和动画定义在 `src/index.css` 文件中，您可以根据需要进行修改：

```css
:root {
  --gaming-neon: #ff00ff;
  --gaming-purple: #9333ea;
  --gaming-cyan: #06b6d4;
  --gaming-dark: #0f0f1a;
  /* 更多颜色变量... */
}
```

## 许可证

MIT License

## 联系方式

如有任何问题或建议，请通过以下方式联系：

- GitHub: [项目仓库](https://github.com/your-username/playbox-gaming-console)
- 邮箱: support@playbox.com
