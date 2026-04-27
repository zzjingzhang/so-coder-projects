# 游戏社交广场

一个现代化的娱乐游戏社交广场页面，提供用户动态墙、互动评论区和标签云筛选功能，采用灵活的流式布局设计。

## 功能特性

- 🎮 **用户动态墙** - 展示用户发布的游戏相关动态，支持图片展示、点赞、评论、分享等互动功能
- 💬 **互动评论区** - 完整的评论系统，支持发布评论、回复评论、点赞评论
- 🏷️ **标签云筛选** - 基于游戏标签的动态筛选功能，支持热门标签和更多标签展开
- 📱 **流式布局** - 响应式瀑布流布局，适配不同屏幕尺寸

## 技术栈

- **框架**: Vue 3
- **语言**: JavaScript
- **样式**: Tailwind CSS v4
- **UI 组件库**: Vuetify 4
- **路由**: Vue Router 5
- **构建工具**: Vite 8
- **图标**: Material Design Icons

## 项目结构

```
game-social-square/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── vite.svg
│   │   └── vue.svg
│   ├── components/
│   │   ├── CommentSection.vue    # 评论区组件
│   │   ├── HelloWorld.vue
│   │   ├── NavBar.vue             # 导航栏组件
│   │   ├── PostCard.vue           # 动态卡片组件
│   │   └── TagCloud.vue           # 标签云组件
│   ├── mock/
│   │   └── data.js                # 模拟数据
│   ├── router/
│   │   └── index.js               # 路由配置
│   ├── views/
│   │   ├── HomeView.vue           # 首页（动态墙）
│   │   ├── PostDetailView.vue     # 动态详情页
│   │   └── UserProfileView.vue    # 用户主页
│   ├── App.vue                    # 根组件
│   ├── main.js                    # 入口文件
│   └── style.css                  # 全局样式
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js                 # Vite 配置
```

## 页面说明

### 首页 (HomeView)
- 动态发布入口
- 热门/最新/关注 标签切换
- 流式布局动态墙
- 标签云筛选侧边栏
- 热门话题排行
- 推荐关注用户

### 动态详情页 (PostDetailView)
- 完整动态内容展示
- 图片网格展示
- 点赞/评论/分享操作
- 完整评论区

### 用户主页 (UserProfileView)
- 用户封面和信息展示
- 粉丝/关注/动态 统计
- 动态/喜欢/媒体 标签页
- 用户发布的动态列表

## 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

项目将在 `http://localhost:5173` 启动（端口可能会根据占用情况自动调整）。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 预览生产构建

```bash
npm run preview
```

## 组件说明

### PostCard
动态卡片组件，展示单条动态的完整内容，包括：
- 用户信息（头像、昵称、等级、发布时间）
- 动态内容（文字、图片网格）
- 标签展示
- 互动按钮（点赞、评论、分享、收藏）

### CommentSection
评论区组件，功能包括：
- 评论输入框
- 评论列表展示
- 评论回复功能
- 评论点赞
- 回复列表嵌套展示

### TagCloud
标签云组件，提供：
- 热门标签展示（按热度排序，字体大小差异化）
- 更多标签展开面板
- 标签点击筛选
- 全部动态重置按钮

### NavBar
导航栏组件，包含：
- Logo 和网站名称
- 搜索框
- 通知和消息图标（带角标）
- 用户头像和下拉菜单
- 发布动态按钮
- 发布动态对话框

## 样式特性

### 响应式布局
- 移动端：单列流式布局
- 平板端：双列布局
- 桌面端：三列/四列布局

### 自定义主题
- 主色调：Indigo/Purple 渐变
- 支持深色/浅色主题切换
- Tailwind CSS v4 CSS 主题配置

### 交互效果
- 卡片悬停上浮阴影
- 标签点击缩放动画
- 平滑滚动
- 自定义滚动条样式

## 开发说明

### 数据层
所有数据通过 `src/mock/data.js` 提供，包括：
- `users` - 用户列表
- `posts` - 动态列表
- `comments` - 评论数据（按 postId 索引）
- `tags` - 标签列表

### 路由配置
```javascript
/           → 首页（动态墙）
/post/:id   → 动态详情页
/user/:id   → 用户主页
```

### 添加新功能

1. **新增页面**：在 `src/views/` 目录创建视图组件，在 `src/router/index.js` 中添加路由配置。

2. **新增组件**：在 `src/components/` 目录创建可复用组件。

3. **修改样式**：全局样式在 `src/style.css` 中定义，组件样式使用 Tailwind 类或组件内 `<style>` 标签。

4. **添加数据**：在 `src/mock/data.js` 中扩展模拟数据。

## License

MIT
