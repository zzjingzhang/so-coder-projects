# Personal Portfolio

一个现代化的个人作品集网站，使用 Angular 19、Tailwind CSS 和 PrimeNG 构建。

## 功能特性

- 🎨 **响应式设计** - 完美适配桌面、平板和移动设备
- ✨ **流畅动画** - 精美的入场动画和过渡效果
- 🌙 **暗黑模式** - 支持明暗主题切换，自动记住用户偏好
- 📱 **移动端优先** - 专为现代移动设备优化
- 🔍 **技能分类** - 支持按类别过滤技能展示
- 👤 **关于我页面** - 展示个人背景、经验和技能亮点
- 📊 **滚动进度** - 顶部显示页面滚动进度条
- ⬆️ **返回顶部** - 快速返回页面顶部
- ⏳ **加载动画** - 优雅的全屏加载 Spinner
- 🔔 **Toast 通知** - 操作反馈提示

## 技术栈

### 核心框架
- **Angular 19** - 现代化的前端框架（Standalone Components）
- **TypeScript 5.7** - 类型安全的 JavaScript 超集

### 样式与 UI
- **Tailwind CSS 3.4** - 实用优先的 CSS 框架（支持暗黑模式）
- **PrimeNG 19** - 企业级 Angular UI 组件库
- **PrimeIcons** - PrimeNG 官方图标库

### 构建工具
- **Angular CLI** - Angular 官方命令行工具
- **Angular Application Builder** - 现代化的构建系统
- **PostCSS** - CSS 转换工具
- **Autoprefixer** - CSS 前缀自动添加

## 项目结构

```
personal-portfolio/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── about/
│   │   │   │   └── about.component.ts       # 关于我组件
│   │   │   ├── footer/
│   │   │   │   └── footer.component.ts      # 页脚组件
│   │   │   ├── hero/
│   │   │   │   └── hero.component.ts        # Hero 区块组件
│   │   │   ├── home/
│   │   │   │   └── home.component.ts        # 主页容器组件
│   │   │   ├── navbar/
│   │   │   │   └── navbar.component.ts      # 导航栏组件
│   │   │   ├── projects/
│   │   │   │   └── projects.component.ts    # 项目展示组件
│   │   │   └── skills/
│   │   │       └── skills.component.ts      # 技能展示组件
│   │   ├── data/
│   │   │   ├── projects.ts                   # 项目模拟数据
│   │   │   └── skills.ts                     # 技能模拟数据
│   │   ├── services/
│   │   │   └── theme.service.ts              # 主题服务（暗黑模式）
│   │   ├── types/
│   │   │   └── index.ts                      # TypeScript 类型定义
│   │   ├── app.component.ts                  # 根组件
│   │   ├── app.config.ts                     # 应用配置
│   │   └── app.routes.ts                     # 路由配置
│   ├── assets/                               # 静态资源
│   ├── styles/                               # 全局样式
│   ├── styles.css                            # 主样式文件
│   ├── main.ts                               # 应用入口
│   └── index.html                            # HTML 模板
├── angular.json                              # Angular 配置
├── package.json                              # 项目依赖
├── tailwind.config.js                        # Tailwind 配置
├── postcss.config.js                         # PostCSS 配置
├── tsconfig.json                             # TypeScript 配置
└── README.md                                 # 项目文档
```

## 组件说明

### 核心组件

1. **AppComponent** (`src/app/app.component.ts`)
   - 根组件，包含全局布局
   - 实现滚动进度条、加载 Spinner、返回顶部按钮
   - 集成主题服务

2. **HomeComponent** (`src/app/components/home/home.component.ts`)
   - 主页容器组件
   - 整合所有子组件（Navbar、Hero、About、Skills、Projects、Footer）
   - 处理 CV 下载 Toast 通知

3. **NavbarComponent** (`src/app/components/navbar/navbar.component.ts`)
   - 响应式导航栏
   - 支持桌面和移动端菜单
   - 包含主题切换按钮（明暗模式）
   - 包含 Download CV 按钮
   - 滚动时样式变化效果

4. **HeroComponent** (`src/app/components/hero/hero.component.ts`)
   - 首屏展示区块
   - 包含个人头像、介绍、社交链接
   - 背景渐变和动画效果

5. **AboutComponent** (`src/app/components/about/about.component.ts`)
   - 关于我页面
   - 展示个人背景、经验
   - 包含技能统计卡片
   - 展示工作亮点

6. **SkillsComponent** (`src/app/components/skills/skills.component.ts`)
   - 技能展示组件
   - 支持按类别过滤（Frontend、Backend、Database 等）
   - 使用 PrimeNG ProgressBar 显示技能熟练度
   - 卡片式布局带悬停效果

7. **ProjectsComponent** (`src/app/components/projects/projects.component.ts`)
   - 项目展示组件
   - 项目卡片包含：名称、描述、类型标签、技术栈、预览图
   - 悬停时显示 Live Demo 和 GitHub 链接
   - 使用 PrimeNG Tag 组件

8. **FooterComponent** (`src/app/components/footer/footer.component.ts`)
   - 页脚组件
   - 包含联系邮箱、位置信息
   - 社交媒体链接
   - 版权信息

### 服务

- **ThemeService** (`src/app/services/theme.service.ts`)
  - 主题管理服务
  - 支持明暗模式切换
  - 使用 localStorage 持久化用户偏好
  - 自动检测系统主题偏好

### 辅助功能

- **主题切换** - 支持明暗模式，自动记住用户选择
- **滚动进度条** - 页面顶部显示滚动进度
- **返回顶部按钮** - 滚动超过 300px 时显示
- **加载 Spinner** - 页面加载时显示（1.5秒）
- **Toast 通知** - 点击 Download CV 时显示成功提示

## 快速开始

### 环境要求

- **Node.js** >= 18.13.0
- **npm** >= 9.0.0
- **Angular CLI** >= 19.0.0

### 安装依赖

```bash
cd personal-portfolio
npm install
```

### 开发模式

启动本地开发服务器：

```bash
npm run dev
# 或
npm start
# 或
ng serve
```

访问 `http://localhost:4200` 查看应用。

### 构建生产版本

```bash
npm run build
# 或
ng build
```

构建产物将输出到 `dist/personal-portfolio/` 目录。

### 监听模式

```bash
npm run watch
```

## 自定义配置

### 修改个人信息

编辑以下文件来自定义内容：

1. **技能数据** - `src/app/data/skills.ts`
2. **项目数据** - `src/app/data/projects.ts`
3. **个人信息** - 在各组件中修改（如 HeroComponent 中的姓名、邮箱等）
4. **关于我信息** - `src/app/components/about/about.component.ts`

### 自定义主题

修改 `tailwind.config.js` 中的颜色配置：

```javascript
theme: {
  extend: {
    colors: {
      primary: { /* 自定义主色调 */ },
      secondary: { /* 自定义辅助色 */ }
    }
  }
}
```

### 修改 PrimeNG 主题

在 `angular.json` 中更改主题：

```json
"styles": [
  "node_modules/primeng/resources/themes/lara-dark-indigo/theme.css",
  // ...
]
```

可用主题：
- `lara-light-blue` (默认)
- `lara-light-indigo`
- `lara-light-purple`
- `lara-dark-blue`
- `lara-dark-indigo`
- 更多主题请参考 PrimeNG 文档

### 动画效果

项目内置多种动画效果类：

- `animate-fade-in` - 淡入效果
- `animate-slide-in-left/right/up/down` - 滑入效果
- `animate-scale-in` - 缩放进入
- `animate-bounce-in` - 弹跳进入
- `animate-float` - 浮动效果
- `hover-lift` - 悬停提升
- `hover-scale` - 悬停缩放

## 路由配置

当前路由配置（`src/app/app.routes.ts`）：

| 路径 | 组件 | 说明 |
|------|------|------|
| `/` | HomeComponent | 主页 |
| `**` | 重定向到 `/` | 通配符路由 |

## 页面区块

主页包含以下区块（按顺序）：

1. **Hero** - 首屏展示
2. **About** - 关于我
3. **Skills** - 技能展示
4. **Projects** - 项目展示
5. **Footer** - 页脚（包含联系信息）

## 暗黑模式特性

- 点击导航栏的月亮/太阳图标切换主题
- 主题偏好自动保存到 localStorage
- 首次访问时自动检测系统主题偏好
- 所有组件支持暗黑模式样式
- 平滑的主题切换过渡动画

## 浏览器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

---

**注意**：本项目使用的是 Angular 19 的 Standalone Components 模式，不包含 NgModule。
