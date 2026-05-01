# 后台管理系统

一个基于 Vue 3 的现代化后台管理系统。

## 技术栈

- Vue 3
- Vite
- Vuetify 3
- Vue Router 4
- Pinia
- Tailwind CSS
- Axios

## 项目结构

```
admin-system/
├── index.html              # 入口 HTML 文件
├── package.json            # 项目配置和依赖
├── vite.config.js          # Vite 配置
├── postcss.config.js       # PostCSS 配置
├── tailwind.config.js      # Tailwind CSS 配置
├── src/
│   ├── main.js             # 项目入口文件
│   ├── App.vue             # 根组件
│   ├── api/                # API 请求
│   │   ├── request.js      # 请求工具封装
│   │   └── login.js        # 登录 API
│   ├── assets/             # 静态资源
│   ├── components/         # 通用组件
│   ├── layouts/            # 布局组件
│   │   ├── Layout.vue      # 主布局
│   │   ├── Sidebar.vue     # 侧边栏
│   │   ├── Header.vue      # 顶部导航
│   │   └── Breadcrumb.vue  # 面包屑导航
│   ├── plugins/            # 插件
│   │   └── vuetify.js      # Vuetify 配置
│   ├── router/             # 路由配置
│   │   ├── index.js        # 路由入口
│   │   └── permission.js   # 权限配置
│   ├── store/              # 状态管理
│   │   ├── index.js        # Store 入口
│   │   ├── user.js         # 用户模块
│   │   └── getters.js      # Getter 配置
│   ├── styles/             # 样式文件
│   │   └── main.css        # 主样式
│   └── views/              # 页面视图
│       ├── login/          # 登录页面
│       │   ├── Login.vue   # 登录组件
│       │   └── Captcha.vue # 验证码组件
│       └── dashboard/      # Dashboard 页面
│           └── Dashboard.vue
```

## 功能特性

1. 登录页面：包含用户名、密码、验证码，登录后调用后端接口
2. 全局布局：顶部导航栏、可折叠侧边栏、面包屑导航
3. Dashboard 主页面
4. 路由管理和权限拦截
5. 状态管理：用户信息、Token 等
6. HTTP 请求统一封装
7. 主题定制：主色调 #30A679

## 快速开始

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

### 预览生产构建

```bash
npm run preview
```

## 默认配置

- 开发服务器端口：3000
- API 基础地址：http://cloud.imgrids.com
- 主题主色：#30A679