# Developer Portfolio

一个现代化的个人作品集网站，使用 React、Vite、Tailwind CSS 和 Chakra UI 构建。

## 功能特性

- **主页**: 展示头像、个人简介以及循环切换的技术栈/框架列表，带有淡入动画
- **关于页**: 展示个人简介和多条工作经历卡片，每张卡片包含日期、公司、职位、技术栈等信息
- **仪表盘页**: 展示 GitHub 关注者数量（通过 GitHub API 动态获取）、Twitter 关注者占位以及收藏的音乐列表
- **响应式布局**: 导航栏在移动端提供侧滑菜单，并在滚动到一定高度时显示头像
- **暗色模式**: 支持亮色/暗色模式切换
- **PWA 支持**: 提供 PWA manifest，支持渐进式 Web 应用

## 技术栈

- **前端框架**: React 19
- **构建工具**: Vite 8
- **样式框架**: Tailwind CSS 4
- **UI 组件库**: Chakra UI 3
- **路由**: React Router 7
- **动画**: Framer Motion
- **图标**: React Icons

## 项目结构

```
developer-portfolio/
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   └── manifest.json          # PWA 配置文件
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components/
│   │   ├── Navbar.jsx         # 导航栏组件（包含移动端侧滑菜单）
│   │   └── Footer.jsx         # 页脚组件
│   ├── contexts/
│   │   ├── ThemeContext.jsx   # 主题上下文（暗色模式）
│   │   └── NavigationContext.jsx  # 导航上下文（滚动检测、移动端菜单）
│   ├── pages/
│   │   ├── Home.jsx           # 主页（头像、个人简介、技术栈动画）
│   │   ├── About.jsx          # 关于页（个人简介、工作经历卡片）
│   │   └── Dashboard.jsx      # 仪表盘页（GitHub API、音乐列表）
│   ├── App.jsx                 # 应用主组件（路由配置）
│   ├── App.css                 # 应用样式
│   ├── index.css               # 全局样式（Tailwind CSS 配置）
│   └── main.jsx                # 应用入口
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── README.md
└── vite.config.js              # Vite 配置
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

启动开发服务器：

```bash
npm run dev
```

开发服务器将在 `http://localhost:5173` 运行。

### 生产构建

构建生产版本：

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 预览生产构建

预览生产构建的结果：

```bash
npm run preview
```

## 主要功能说明

### 1. 主页 (Home)

- 展示开发者头像和个人简介
- 技术栈/框架列表循环切换，带有淡入淡出动画
- 使用 Framer Motion 实现平滑的动画效果
- 展示所有使用的技术栈标签

### 2. 关于页 (About)

- 个人简介部分，包含开发者照片和详细介绍
- 工作经历时间线，每条经历包含：
  - 日期范围
  - 公司名称和位置
  - 职位头衔
  - 工作描述
  - 使用的技术栈标签

### 3. 仪表盘页 (Dashboard)

- **GitHub 关注者**: 通过 GitHub API 动态获取并展示关注者数量（示例中使用模拟数据）
- **Twitter 关注者**: 占位卡片，可后续集成真实 API
- **音乐收藏**: 展示喜欢的音乐列表，包含：
  - 专辑封面
  - 歌曲标题
  - 艺术家
  - 外部链接（如 Spotify）

### 4. 导航栏 (Navbar)

- 固定在顶部，滚动时背景变化
- 滚动超过一定高度时显示头像
- 桌面端显示完整导航链接
- 移动端显示汉堡菜单，点击打开侧滑菜单
- 包含亮色/暗色模式切换按钮

### 5. 暗色模式

- 支持系统主题检测
- 支持手动切换亮色/暗色模式
- 主题偏好存储在 localStorage 中
- 所有页面和组件都支持暗色模式

### 6. PWA 支持

- 包含完整的 PWA manifest.json
- 支持添加到主屏幕
- 支持独立显示模式
- 主题色配置

## 自定义配置

### 修改 GitHub 用户名

在 `src/pages/Dashboard.jsx` 中，找到 `fetchGithubFollowers` 函数，取消注释并修改 GitHub API 调用：

```javascript
const response = await fetch('https://api.github.com/users/yourusername');
```

### 修改个人信息

- **主页信息**: 修改 `src/pages/Home.jsx` 中的 `techStack` 数组和个人简介
- **工作经历**: 修改 `src/pages/About.jsx` 中的 `experiences` 数组
- **音乐收藏**: 修改 `src/pages/Dashboard.jsx` 中的 `musicCollection` 数组
- **社交链接**: 修改 `src/components/Footer.jsx` 中的 `socialLinks` 数组

### 修改主题颜色

在 `src/index.css` 中修改 CSS 变量：

```css
:root {
  --accent: #aa3bff;  /* 主色调 */
  /* 其他颜色变量 */
}
```

## 浏览器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！
