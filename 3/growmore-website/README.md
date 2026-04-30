# GrowMore Inc. 企业官网

一个基于 Vue 3 + TypeScript + Tailwind CSS + PrimeVue 构建的响应式企业官网。

## 项目简介

这是 GrowMore Inc. 的官方企业网站，包含主页、服务、关于我们和联系我们四个主要页面。网站采用现代化设计，支持响应式布局，适配各种设备屏幕尺寸。

## 技术栈

- **框架**: Vue 3 (Composition API)
- **语言**: TypeScript
- **样式**: Tailwind CSS v4
- **UI 组件库**: PrimeVue
- **路由**: Vue Router v5
- **打包工具**: Vite v8
- **图标**: PrimeIcons

## 项目结构

```
growmore-website/
├── public/              # 静态资源文件
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/          # 资源文件
│   ├── components/      # 可重用组件
│   │   ├── Navbar.vue   # 导航栏组件
│   │   ├── Card.vue     # 服务卡片组件
│   │   └── Common.vue   # Hero 横幅组件
│   ├── router/          # 路由配置
│   │   └── index.ts
│   ├── views/           # 页面组件
│   │   ├── Home.vue     # 主页
│   │   ├── Services.vue # 服务页面
│   │   ├── About.vue    # 关于我们页面
│   │   └── Contact.vue  # 联系我们页面
│   ├── App.vue          # 根组件
│   ├── main.ts          # 应用入口
│   └── style.css        # 全局样式（含 Tailwind 配置）
├── index.html           # HTML 入口
├── package.json         # 项目配置
├── tsconfig.json        # TypeScript 配置
├── vite.config.ts       # Vite 配置
└── README.md            # 项目文档
```

## 功能特性

### 页面组件

1. **主页 (Home)**
   - Hero 横幅，展示公司标语和"开始"按钮
   - 公司优势介绍
   - 精选服务展示
   - 行动号召区域

2. **服务页面 (Services)**
   - Hero 横幅
   - 完整服务列表（卡片网格布局）
     - Android 开发
     - Web 开发
     - 数据库管理
     - 业务分析
     - 数字营销
     - 视频创建
   - 工作流程介绍

3. **关于我们页面 (About)**
   - Hero 横幅，链接到联系页面
   - 公司故事介绍
   - 核心价值观展示
   - 核心团队成员
   - 公司数据统计

4. **联系我们页面 (Contact)**
   - Hero 横幅
   - 联系信息展示（地址、电话、邮箱、工作时间）
   - 联系表单
     - 全名（必填）
     - 联系电话（必填）
     - 电子邮件（必填）
     - 消息内容（必填）
   - 表单提交防止默认行为，模拟异步提交

### 可重用组件

1. **Navbar 组件**
   - 响应式导航栏
   - 滚动时背景变化效果
   - 移动端汉堡菜单
   - 当前页面高亮

2. **Card 组件**
   - 服务卡片展示
   - 图片悬停缩放效果
   - "获取报价"按钮链接到联系页面

3. **Common (Hero) 组件**
   - 可重用的横幅组件
   - 背景图片 + 渐变叠加
   - 浮动动画效果
   - 向上滑动入场动画
   - 可配置的标题、副标题、按钮和图片

### 样式与动画

- **Tailwind CSS v4** 配置，自定义主题色
- **自定义动画**：
  - 浮动动画 (float)
  - 向上滑动动画 (slideUp)
- **响应式设计**：适配手机、平板、桌面设备

## 安装与运行

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

```bash
cd growmore-website
npm install
```

### 开发模式

```bash
npm run dev
```

项目将在 `http://localhost:5173` 启动开发服务器。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 预览生产版本

```bash
npm run preview
```

### 类型检查

```bash
npm run lint
```

## 部署到 GitHub Pages

### 1. 准备仓库

确保你的项目已经推送到 GitHub 仓库。

### 2. 配置仓库名称

如果你要部署到 `<username>.github.io`，请将仓库重命名为 `<username>.github.io`。

如果要部署到子路径（如 `<username>.github.io/my-project`），需要修改 `vite.config.ts` 中的 `base` 配置：

```typescript
// vite.config.ts
export default defineConfig({
  // ... 其他配置
  base: '/my-project/', // 替换为你的仓库名称
})
```

### 3. 执行部署

```bash
npm run deploy
```

该命令会：
1. 首先运行 `npm run build` 构建项目
2. 然后使用 `gh-pages` 将 `dist` 目录部署到 `gh-pages` 分支

### 4. 启用 GitHub Pages

1. 进入你的 GitHub 仓库
2. 点击 `Settings` 标签
3. 找到 `Pages` 选项
4. 在 `Source` 部分，选择 `gh-pages` 分支
5. 点击 `Save`

几分钟后，你的网站将可在以下地址访问：
- `https://<username>.github.io/`（用户/组织页面）
- `https://<username>.github.io/<repo-name>/`（项目页面）

## 自定义配置

### 修改主题色

在 `src/style.css` 中的 `@theme` 块中修改颜色变量：

```css
@theme {
  --color-primary: #4f46e5;      /* 主色 */
  --color-primary-dark: #4338ca; /* 主色深色 */
  --color-secondary: #10b981;    /* 辅助色 */
  --color-secondary-dark: #059669; /* 辅助色深色 */
  /* ... 其他配置 */
}
```

### 修改导航链接

在 `src/components/Navbar.vue` 中修改 `navLinks` 数组：

```typescript
const navLinks = [
  { name: '主页', path: '/' },
  { name: '服务', path: '/services' },
  { name: '关于我们', path: '/about' },
  { name: '联系我们', path: '/contact' }
]
```

## 开发指南

### 添加新页面

1. 在 `src/views/` 目录下创建新的 Vue 组件
2. 在 `src/router/index.ts` 中添加路由配置
3. 如果需要，在 `Navbar.vue` 中添加导航链接

### 使用 PrimeVue 组件

PrimeVue 组件已在 `main.ts` 中全局注册，可直接使用：

```vue
<template>
  <PrimeButton label="点击我" @click="handleClick" />
  <PrimeInputText v-model="value" placeholder="请输入内容" />
</template>
```

## 浏览器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 许可证

MIT License

## 联系方式

如有问题或建议，请联系：
- 邮箱: contact@growmore.com
- 电话: +86 400-123-4567

---

© 2024 GrowMore Inc. 保留所有权利。
