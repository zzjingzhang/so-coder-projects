# Modern Portfolio

一个现代化的个人作品集网站，使用 Vue 3 + TypeScript + Tailwind CSS + PrimeVue 构建。

## ✨ 功能特性

- 📱 **响应式设计** - 完美适配桌面端、平板和移动端
- 🌙 **暗黑模式** - 支持明暗主题切换，自动检测系统偏好
- 🎨 **现代化 UI** - 基于 Tailwind CSS 构建的优雅界面
- 📝 **完整页面** - 首页、项目展示、博客、关于我、联系表单、法律页面
- 📋 **分类筛选** - 项目支持按前端、后端、全栈、移动端分类筛选
- 📧 **复制邮箱** - 一键复制邮箱功能，提升用户体验
- 🚀 **快速导航** - 移动端抽屉式导航菜单

## 🛠 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Vue | 3.4+ | 渐进式 JavaScript 框架 |
| TypeScript | 5.3+ | 类型安全的 JavaScript |
| Vite | 5.0+ | 下一代前端构建工具 |
| Vue Router | 4.2+ | Vue.js 官方路由 |
| Tailwind CSS | 3.4+ | 实用优先的 CSS 框架 |
| PrimeVue | 3.50+ | Vue UI 组件库 |

## 📁 项目结构

```
modern-portfolio/
├── src/
│   ├── components/          # 组件目录
│   │   ├── AppHeader.vue    # 顶部导航栏
│   │   ├── AppFooter.vue    # 页脚组件
│   │   └── MobileNavigation.vue  # 移动端导航
│   ├── composables/         # 组合式函数
│   │   └── useTheme.ts      # 主题管理（暗黑模式）
│   ├── data/                # 数据目录
│   │   └── mockData.ts      # 模拟数据
│   ├── types/               # 类型定义
│   │   └── index.ts         # TypeScript 类型
│   ├── utils/               # 工具函数
│   │   └── copyEmail.ts     # 复制到剪贴板工具
│   ├── views/               # 页面组件
│   │   ├── Home.vue         # 首页
│   │   ├── Projects.vue     # 项目展示页
│   │   ├── Blog.vue         # 博客页面
│   │   ├── About.vue        # 关于我页面
│   │   ├── Contact.vue      # 联系页面
│   │   ├── Legal.vue        # 法律页面
│   │   └── NotFound.vue     # 404 页面
│   ├── App.vue              # 根组件
│   ├── main.ts              # 应用入口
│   ├── style.css            # 全局样式
│   └── vite-env.d.ts        # Vite 环境类型
├── index.html               # HTML 入口
├── package.json             # 项目配置
├── tailwind.config.js       # Tailwind CSS 配置
├── vite.config.ts           # Vite 配置
├── tsconfig.json            # TypeScript 配置
├── postcss.config.js        # PostCSS 配置
└── README.md                # 项目说明
```

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0 或 pnpm >= 8.0.0

### 安装依赖

```bash
npm install
```

或者使用 pnpm：

```bash
pnpm install
```

### 开发模式

启动开发服务器（默认端口 3000）：

```bash
npm run dev
```

访问 http://localhost:3000 查看应用。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 预览生产版本

```bash
npm run preview
```

## 📄 页面说明

### 首页 (Home)
- Hero 区域展示个人信息和状态
- 技术栈展示
- 精选项目卡片
- 统计数据
- CTA 引导区域

### 项目展示 (Projects)
- 项目分类筛选（全部、前端、后端、全栈、移动端）
- 项目卡片展示（图片、标题、描述、标签）
- 悬停效果显示 GitHub 和预览链接

### 博客 (Blog)
- 精选文章大图展示
- 文章列表卡片
- 订阅表单

### 关于我 (About)
- 个人介绍
- 技能栈展示（前端、后端）
- 工作经历时间线

### 联系 (Contact)
- 联系方式卡片（邮箱、地点、工作时间）
- 邮箱一键复制功能
- 社交媒体链接
- 联系表单（姓名、邮箱、主题、消息）

### 法律声明 (Legal)
- 隐私政策
- 服务条款

### 404 页面 (NotFound)
- 友好的错误提示
- 快速导航链接

## 🎨 主题切换

项目支持明暗主题切换：

1. **手动切换**：点击导航栏右侧的太阳/月亮图标
2. **系统检测**：首次访问时自动检测系统主题偏好
3. **持久化**：主题选择保存在 localStorage 中

## 📱 响应式设计

- **桌面端** (lg)：水平导航栏、多列布局
- **平板端** (md)：响应式网格布局
- **移动端** (sm)：抽屉式导航菜单、单列布局

## 🔧 配置说明

### Tailwind CSS 配置

在 `tailwind.config.js` 中可以自定义：
- 主题颜色
- 字体
- 动画
- 断点

### Vite 配置

在 `vite.config.ts` 中可以配置：
- 开发服务器端口
- 路径别名
- 构建优化

## 📝 开发规范

- 使用 Vue 3 组合式 API (`<script setup>`)
- 所有组件使用 TypeScript
- 样式使用 Tailwind CSS 实用类
- 组件命名遵循 PascalCase
- 使用语义化 HTML 标签

## 🤝 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 📄 开源协议

本项目采用 MIT 协议 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 👤 作者

- GitHub: [@yourusername](https://github.com/yourusername)
- 邮箱: developer@example.com

---

⭐ 如果这个项目对你有帮助，欢迎给一个 Star！
