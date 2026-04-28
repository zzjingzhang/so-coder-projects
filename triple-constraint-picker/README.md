# Good, Cheap, Fast - 项目选择器

一个交互式的 "Good, Cheap, Fast" 选择页面，基于 Vue 3 + TypeScript + Vite 构建。

## 项目简介

这个项目实现了一个经典的项目管理三难困境选择器。用户可以在 "Good（质量好）"、"Cheap（价格低）" 和 "Fast（速度快）" 三个选项中进行选择，但系统会确保用户只能同时选择两个选项。当用户尝试选择第三个选项时，系统会自动取消最早选中的那个选项。

## 功能特性

- ✨ **三个切换开关**：分别对应 Good、Cheap、Fast
- 🔄 **智能选择限制**：只能同时选择两个选项
- 🎨 **精美的 UI 设计**：使用 Tailwind CSS 和 Vuetify
- ⚡ **平滑的动画效果**：切换时滑块平滑滑动并在中途放大
- 📱 **响应式设计**：适配不同屏幕尺寸
- 🔤 **Roboto 字体**：采用 Google Roboto 字体

## 技术栈

- **框架**：Vue 3
- **语言**：TypeScript
- **样式**：Tailwind CSS
- **UI 组件库**：Vuetify 3
- **路由**：Vue Router 4
- **构建工具**：Vite
- **图标**：Material Design Icons

## 项目结构

```
triple-constraint-picker/
├── public/                 # 静态资源
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/             # 资源文件
│   ├── components/         # 组件目录
│   │   └── HelloWorld.vue
│   ├── router/             # 路由配置
│   │   └── index.ts
│   ├── views/              # 页面视图
│   │   └── Main.vue        # 主页面
│   ├── App.vue             # 根组件
│   ├── main.ts             # 入口文件
│   └── style.css           # 全局样式
├── .gitignore
├── index.html              # HTML 模板
├── package.json            # 依赖配置
├── postcss.config.js       # PostCSS 配置
├── tailwind.config.js      # Tailwind CSS 配置
├── tsconfig.json           # TypeScript 配置
├── tsconfig.app.json       # 应用 TypeScript 配置
├── tsconfig.node.json      # Node TypeScript 配置
├── vite.config.ts          # Vite 配置
└── README.md               # 项目文档
```

## 核心实现

### 选择逻辑

项目使用 `lastSelected` 变量来跟踪用户最后选中的选项。当用户尝试选择第三个选项时，系统会自动取消最早选中的选项，确保始终只选中两个选项。

### 自定义切换开关

实现了自定义的 CSS 动画效果：
- 未选中状态：灰色背景 (`#ccc` → `#9ca3af`)
- 选中状态：紫色背景 (`#8e44ad`)
- 滑块动画：平滑滑动，在切换过程中放大
- 悬停效果：滑块轻微放大，增强交互体验

### 样式设计

- 使用 Tailwind CSS 进行快速布局
- 居中显示，符合用户需求
- 清晰的视觉层次和交互反馈

## 安装与运行

### 前置要求

确保你的开发环境已安装：
- Node.js (建议版本 18.x 或更高)
- npm (通常随 Node.js 一起安装)

### 安装依赖

```bash
# 进入项目目录
cd triple-constraint-picker

# 安装依赖
npm install
```

### 开发模式

```bash
# 启动开发服务器
npm run dev
```

开发服务器启动后，访问 http://localhost:5173/ 查看应用。

### 构建生产版本

```bash
# 构建生产版本
npm run build
```

构建完成后，生成的文件将位于 `dist` 目录中。

### 预览生产版本

```bash
# 预览生产构建结果
npm run preview
```

## 使用说明

1. 打开应用后，你会看到标题 "How do you want your project to be?"
2. 下方有三个选项：Good、Cheap、Fast，每个选项都有一个描述
3. 点击任意选项的切换开关来选择该选项
4. 你可以同时选择最多两个选项
5. 当你尝试选择第三个选项时，系统会自动取消最早选中的选项
6. 页面底部会显示当前选中的选项

## 设计细节

### 颜色方案

- 主色调：紫色 (`#8e44ad`) - 用于选中状态的切换开关和标签
- 背景色：浅灰色 (`#f8f9fa`, `#f3f4f6`)
- 文本色：深灰色 (`#1f2937`, `#374151`, `#6b7280`)
- 未选中状态：中灰色 (`#d1d5db`)

### 字体

- 主要字体：Roboto (Google Fonts)
- 字体权重：300, 400, 500, 700

### 动画效果

- 切换开关滑块：0.3s 平滑过渡
- 滑块缩放：选中时放大 1.1 倍，悬停时放大 1.15 倍，点击时放大 1.2 倍
- 卡片阴影：悬停时轻微增强阴影效果

## 开发说明

### 项目配置

- **TypeScript**：使用严格模式，确保类型安全
- **Vite**：快速的开发服务器和构建工具
- **Vue Router**：单页面应用路由管理
- **Vuetify**：Material Design 组件库
- **Tailwind CSS**：实用优先的 CSS 框架

### 自定义样式

如需修改样式，可以：
1. 修改 `src/style.css` 中的全局样式
2. 修改各组件内的 `<style scoped>` 部分
3. 在 `tailwind.config.js` 中扩展 Tailwind 配置

### 添加新页面

1. 在 `src/views/` 目录下创建新的 `.vue` 文件
2. 在 `src/router/index.ts` 中添加路由配置

## 浏览器兼容性

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

---

**注意**：本项目仅用于演示和学习目的。
