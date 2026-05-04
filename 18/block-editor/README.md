# 块状编辑器

一个功能强大的块状编辑器，支持插入段落、标题、图片和引用块，并提供丰富的样式定制功能。

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **Vite** - 下一代前端构建工具
- **Tailwind CSS** - 实用优先的 CSS 框架
- **Vuetify** - Vue UI 组件库
- **Vue Router** - Vue.js 官方路由管理器

## 项目结构

```
block-editor/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── vite.svg
│   │   └── vue.svg
│   ├── components/
│   │   ├── BlockItem.vue      # 块项组件（显示和编辑各种类型的块）
│   │   ├── Sidebar.vue        # 侧边栏组件（样式面板）
│   │   └── Toolbar.vue        # 工具栏组件（添加块操作）
│   ├── router/
│   │   └── index.js           # 路由配置
│   ├── views/
│   │   └── EditorView.vue     # 编辑器主视图
│   ├── App.vue                # 根组件
│   ├── main.js                # 应用入口
│   └── style.css              # 全局样式
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

## 功能特性

### 支持的块类型

1. **段落块** - 支持多行文本输入
2. **标题块** - 支持 H1-H4 级别
3. **图片块** - 支持 URL 输入和图片显示
4. **引用块** - 支持引用内容和作者信息

### 样式定制

- 字体大小调整
- 字体粗细（正常/粗体）
- 文字颜色选择
- 文本对齐方式
- 标题级别切换
- 引用块边框颜色

### 块操作

- 上移块
- 下移块
- 删除块
- 选中块进行样式编辑

## 安装和运行

### 前置要求

- Node.js 16+ 版本
- npm 或 yarn 包管理器

### 安装依赖

```bash
cd block-editor
npm install
```

### 开发模式

```bash
npm run dev
```

应用将在 `http://localhost:5173` 启动（端口可能会根据占用情况自动调整）。

### 构建生产版本

```bash
npm run build
```

构建产物将生成在 `dist` 目录中。

### 预览生产构建

```bash
npm run preview
```

## 使用说明

1. **添加块**：点击顶部工具栏的按钮（段落、标题、图片、引用）添加新的块
2. **编辑内容**：直接在块中输入内容
3. **编辑样式**：点击选中任意块，右侧样式面板会显示可用的样式选项
4. **移动块**：鼠标悬停在块上，会显示操作按钮，点击上移或下移
5. **删除块**：鼠标悬停在块上，点击删除按钮

## 界面布局

- **顶部工具栏**：添加各种类型的块、保存和预览功能
- **中央编辑区**：显示和编辑所有内容块
- **右侧样式面板**：选中块后，可以调整其样式属性

## 开发规范

- 使用 Vue 3 Composition API (`<script setup>`)
- 样式使用 Tailwind CSS 实用类
- UI 组件使用 Vuetify 3
- 路由使用 Vue Router 4
- 构建工具使用 Vite

## 许可证

MIT License
