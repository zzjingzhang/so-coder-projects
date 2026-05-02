# NewsHub - 新闻门户网站

一个现代化的新闻门户网站，采用干净的排版设计和清晰的文章分类，提供优秀的阅读体验和用户友好的导航。

## 项目简介

NewsHub 是一个功能完整的新闻门户网站，具有以下特点：

- 📰 清晰的新闻分类导航
- 🎨 现代化的 UI 设计和干净的排版
- 📱 响应式布局，支持各种设备
- 🔍 强大的新闻搜索功能
- ⭐ 精选头条和最新资讯展示
- 📖 优秀的文章阅读体验

## 技术栈

- **框架**: Angular 21.2
- **语言**: TypeScript 5.9
- **样式**: Tailwind CSS 3
- **UI 组件库**: PrimeNG
- **路由**: Angular Router
- **打包工具**: Angular CLI Application Builder

## 项目结构

```
news-hub/
├── src/
│   ├── app/
│   │   ├── components/          # 可复用组件
│   │   │   ├── header/          # 导航栏组件
│   │   │   │   ├── header.component.ts
│   │   │   │   ├── header.component.html
│   │   │   │   └── header.component.css
│   │   │   ├── footer/          # 页脚组件
│   │   │   │   ├── footer.component.ts
│   │   │   │   ├── footer.component.html
│   │   │   │   └── footer.component.css
│   │   │   └── news-card/       # 新闻卡片组件
│   │   │       ├── news-card.component.ts
│   │   │       ├── news-card.component.html
│   │   │       └── news-card.component.css
│   │   ├── pages/               # 页面组件
│   │   │   ├── home/            # 首页
│   │   │   │   ├── home.component.ts
│   │   │   │   ├── home.component.html
│   │   │   │   └── home.component.css
│   │   │   ├── category/        # 分类页面
│   │   │   │   ├── category.component.ts
│   │   │   │   ├── category.component.html
│   │   │   │   └── category.component.css
│   │   │   ├── article/         # 文章详情页面
│   │   │   │   ├── article.component.ts
│   │   │   │   ├── article.component.html
│   │   │   │   └── article.component.css
│   │   │   └── search/          # 搜索结果页面
│   │   │       ├── search.component.ts
│   │   │       ├── search.component.html
│   │   │       └── search.component.css
│   │   ├── models/              # 数据模型
│   │   │   └── news.model.ts
│   │   ├── services/            # 服务层
│   │   │   └── news.service.ts
│   │   ├── app.ts                # 根组件
│   │   ├── app.html
│   │   ├── app.css
│   │   ├── app-module.ts         # 根模块
│   │   └── app-routing-module.ts # 路由配置
│   ├── styles.css               # 全局样式
│   ├── index.html               # HTML 入口
│   └── main.ts                  # 应用入口
├── tailwind.config.js           # Tailwind CSS 配置
├── postcss.config.js            # PostCSS 配置
├── angular.json                 # Angular 配置
├── package.json                 # 项目依赖
└── README.md                    # 项目说明文档
```

## 功能特性

### 页面导航

- **首页**: 展示头条新闻、新闻分类导航和最新资讯
- **分类页面**: 按类别浏览新闻（政治、科技、商业、体育、健康、娱乐）
- **文章详情页面**: 完整的文章阅读体验，包含相关推荐
- **搜索页面**: 关键词搜索功能

### 核心功能

1. **响应式设计**: 完美适配桌面、平板和手机设备
2. **新闻分类**: 6 大新闻类别，轻松浏览不同主题
3. **搜索功能**: 支持按标题、摘要和标签搜索
4. **多种卡片样式**: 头条卡片、横向卡片、标准卡片
5. **面包屑导航**: 清晰的页面路径指示
6. **标签系统**: 文章标签便于内容分类和发现

## 快速开始

### 环境要求

- Node.js 18.x 或更高版本
- npm 9.x 或更高版本
- Angular CLI 21.x

### 安装步骤

1. **进入项目目录**

```bash
cd news-hub
```

2. **安装依赖**

```bash
npm install
```

3. **启动开发服务器**

```bash
ng serve
```

或者使用 npm 脚本：

```bash
npm start
```

4. **访问应用**

打开浏览器，访问 `http://localhost:4200/`

### 构建项目

**开发环境构建**:

```bash
ng build
```

**生产环境构建**:

```bash
ng build --configuration production
```

构建产物将输出到 `dist/` 目录。

### 运行测试

```bash
ng test
```

## 新闻分类

- **政治** 🏛️ - 国内外政治新闻与政策动态
- **科技** 💻 - 最新科技趋势与产品资讯
- **商业** 📈 - 全球经济与商业动态
- **体育** ⚽ - 体育赛事与运动员动态
- **健康** 🏥 - 健康生活与医学资讯
- **娱乐** 🎬 - 影视音乐与明星八卦

## 组件说明

### NewsCardComponent

新闻卡片组件，支持多种显示变体：

- `default`: 标准卡片（图片在上，文字在下）
- `horizontal`: 横向卡片（图片在左，文字在右）
- `featured`: 头条卡片（大图展示，突出显示）

### HeaderComponent

导航栏组件，包含：

- Logo 和网站名称
- 分类导航菜单
- 搜索框
- 移动端响应式菜单

### FooterComponent

页脚组件，包含：

- 网站信息
- 分类链接
- 关于我们链接
- 订阅表单
- 社交媒体链接

## 设计规范

### 配色方案

- **主色 (Primary)**: 蓝色系 (#3b82f6) - 用于强调和交互元素
- **辅助色 (Secondary)**: 灰蓝色系 (#64748b) - 用于文本和背景
- **中性色**: 白色、浅灰、深灰 - 用于背景和文本

### 排版

- **字体**: Inter, system-ui, sans-serif
- **行高**: 1.6 (正文), 1.2 (标题)
- **字号层级**: 从 xs (0.75rem) 到 4xl (2.25rem)

### 响应式断点

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

## 开发指南

### 添加新的新闻分类

在 `src/app/services/news.service.ts` 中更新 `categories` 数组。

### 添加模拟新闻数据

在 `src/app/services/news.service.ts` 中更新 `articles` 数组。

### 创建新组件

```bash
ng generate component components/my-component
```

### 创建新页面

```bash
ng generate component pages/my-page
```

然后在 `app-routing-module.ts` 中添加路由配置。

## License

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目。
