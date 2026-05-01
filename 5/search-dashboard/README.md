# Search Dashboard

一个基于 Vue 3 的搜索页面应用，支持文章、图片、用户三种类型的搜索和标签页切换。

## 项目结构

```
search-dashboard/
├── index.html                 # HTML 入口文件
├── package.json              # 项目依赖配置
├── vite.config.js            # Vite 构建配置
├── tailwind.config.js        # Tailwind CSS 配置
├── postcss.config.js         # PostCSS 配置
├── public/                   # 公共资源目录
│   └── vite.svg             # Vite 图标
└── src/
    ├── main.js               # 应用入口文件
    ├── App.vue               # 根组件
    ├── style.css             # 全局样式
    ├── router/
    │   └── index.js          # Vue Router 路由配置
    └── pages/
        └── SearchPage.vue    # 搜索主页面组件
```

## 技术栈

- **框架**: Vue 3 (Composition API)
- **路由**: Vue Router 4
- **UI 组件库**: Ant Design Vue 4
- **样式**: Tailwind CSS 3
- **打包工具**: Vite 5
- **语言**: JavaScript

## 功能特性

1. **搜索功能**: 支持输入关键字进行搜索，搜索关键字通过 URL 查询参数保存
2. **标签页切换**: 支持文章(/post)、图片(/img)、用户(/user)三个标签页
3. **路由状态同步**: 搜索和标签页状态通过 URL 保持，支持页面刷新和直接访问
4. **响应式布局**: 居中显示，最大宽度 1024px

## 启动项目

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 路由说明

- `/` - 重定向到 `/post`
- `/post` - 文章搜索页面
- `/img` - 图片搜索页面
- `/user` - 用户搜索页面

所有路由支持 `?keyword=xxx` 查询参数来保持搜索状态。