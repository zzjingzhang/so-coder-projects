# CITY PULSE - 城市文化在线杂志

一个关于城市文化的动态在线杂志，采用大胆的黑白配色和充满活力的霓虹元素，展示艺术、音乐、时尚、电影等城市文化领域的深度内容。

## ✨ 项目特点

- **大胆的主打板块**：全屏英雄区域，展示精选文章
- **高对比度黑白配色**：经典黑白主题，确保文字清晰可读
- **霓虹元素**：粉色、蓝色、绿色等霓虹色调，增添现代感和活力
- **交互式文章网格**：支持分类筛选、加载更多等功能
- **响应式设计**：完美适配桌面、平板和移动设备

## 🛠 技术栈

- **框架**：React 19
- **语言**：TypeScript
- **样式**：Tailwind CSS 4
- **UI 组件库**：Ant Design 5
- **路由**：React Router 7
- **打包工具**：Vite 8

## 📁 项目结构

```
city-pulse-magazine/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   └── ...
│   ├── components/
│   │   ├── Header.tsx          # 导航栏组件
│   │   ├── HeroSection.tsx     # 主打板块组件
│   │   ├── ArticleCard.tsx     # 文章卡片组件
│   │   ├── ArticleGrid.tsx     # 文章网格组件
│   │   └── Footer.tsx          # 页脚组件
│   ├── data/
│   │   └── articles.ts         # 文章数据
│   ├── pages/
│   │   ├── HomePage.tsx        # 主页
│   │   ├── ArticleDetailPage.tsx  # 文章详情页
│   │   ├── CategoryPage.tsx    # 分类页面
│   │   └── AboutPage.tsx       # 关于页面
│   ├── App.tsx                 # 应用主组件（路由配置）
│   ├── main.tsx                # 应用入口
│   └── index.css               # 全局样式（Tailwind CSS）
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173 查看应用

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 🎨 设计特点

### 配色方案

- **主色调**：黑色 (#0a0a0a) 背景，白色 (#ffffff) 文字
- **霓虹色**：
  - 霓虹粉 (#ff00ff) - 强调色、按钮
  - 霓虹蓝 (#00ffff) - 次要强调
  - 霓虹绿 (#00ff00) - 成功状态
  - 霓虹黄 (#ffff00) - 警告状态
  - 霓虹橙 (#ff6600) - 温暖色调

### 字体

- **主要字体**：Inter（无衬线字体，确保可读性）
- **标题字体**：Orbitron（科幻感字体，用于 LOGO 和标题）

### 动画效果

- **霓虹脉冲**：标题文字的发光呼吸效果
- **悬停效果**：卡片悬停时的边框发光和缩放
- **滚动动画**：页面加载时的滑入效果
- **浮动效果**：背景装饰元素的缓慢浮动

## 📱 功能页面

### 首页 (HomePage)

- 全屏英雄区域展示精选文章
- 分类筛选标签（全部、艺术、音乐、时尚、电影、文学、生活方式、美食）
- 交互式文章网格，支持"加载更多"功能
- 特色介绍板块（每日更新、独家内容、社区互动）
- CTA 号召行动区域

### 文章详情页 (ArticleDetailPage)

- 文章头图和元信息展示
- 文章内容完整呈现
- 相关文章推荐
- 分享和喜欢功能
- 订阅推广区域

### 分类页面 (CategoryPage)

- 分类标题展示
- 该分类下所有文章列表
- 文章统计信息
- 其他分类推荐

### 关于页面 (AboutPage)

- 品牌介绍（我们是谁、我们的使命）
- 关注领域介绍
- 为什么选择 CITY PULSE
- 加入社区 CTA

## 🔧 主要组件

### Header

- 固定顶部导航栏
- 滚动时背景变化效果
- 响应式菜单（桌面端导航、移动端抽屉）
- 搜索功能

### HeroSection

- 全屏背景图片
- 文章标题和摘要
- 作者、阅读时间等元信息
- 阅读全文按钮
- 向下滚动指示器

### ArticleCard

- 文章卡片组件
- 悬停发光效果
- 响应式设计
- 支持普通和精选两种样式

### ArticleGrid

- 文章网格布局
- 分类筛选功能
- 加载更多功能
- 空状态处理

### Footer

- 品牌信息
- 导航链接
- 订阅表单
- 社交媒体链接

## 📦 数据结构

### Article 接口

```typescript
interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
  neonColor: 'pink' | 'blue' | 'green' | 'yellow' | 'orange';
}
```

## 🎯 设计原则

1. **可读性优先**：高对比度黑白配色确保文字清晰可见
2. **视觉层次**：通过大小、颜色、间距建立清晰的信息层级
3. **交互反馈**：所有可交互元素都有明确的悬停和点击状态
4. **响应式设计**：从移动设备到大屏幕都有最佳体验
5. **性能优化**：使用 Vite 构建工具，确保快速加载和热更新

## 📝 开发说明

- 所有组件都使用 TypeScript 编写，提供完整的类型安全
- 使用 Tailwind CSS 进行样式开发，支持原子化 CSS
- Ant Design 提供复杂 UI 组件（Drawer、Input、Button 等）
- React Router 处理客户端路由
- Vite 提供极速开发体验和优化的生产构建

## 🔗 相关链接

- [React 文档](https://react.dev/)
- [TypeScript 文档](https://www.typescriptlang.org/)
- [Tailwind CSS 文档](https://tailwindcss.com/)
- [Ant Design 文档](https://ant.design/)
- [React Router 文档](https://reactrouter.com/)
- [Vite 文档](https://vitejs.dev/)

## 📄 许可证

MIT License

---

**CITY PULSE** - 探索城市文化的无限可能 🌆
