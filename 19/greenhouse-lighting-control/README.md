# 温室光照控制系统

一个基于 Vue 3 的温室光照控制系统交互式模拟演示。

## 项目简介

本项目是一个温室光照控制系统的模拟演示，可以展示自动补光功能。当光照强度低于 1000 lux 时自动启动补光灯，当达到 1500 lux 时自动关闭。

### 主要功能

- 🌱 温室环境可视化模拟
- 💡 自动补光功能（1000 lux 以下开启，1500 lux 以上关闭）
- 📊 实时显示光照强度
- 🎛️ 手动调节光照强度
- 🎮 控制面板（启动、停止、重置）
- 🌡️ 系统工作状态显示

## 技术栈

- **前端框架**: Vue 3
- **开发语言**: TypeScript
- **样式框架**: Tailwind CSS
- **UI 组件库**: PrimeVue
- **路由管理**: Vue Router
- **构建工具**: Vite

## 项目结构

```
greenhouse-lighting-control/
├── public/              # 静态资源
├── src/
│   ├── assets/          # 资源文件
│   ├── components/      # 组件
│   ├── router/          # 路由配置
│   │   └── index.ts
│   ├── views/           # 页面视图
│   │   └── GreenhouseView.vue  # 温室光照控制系统主页面
│   ├── App.vue          # 根组件
│   ├── main.ts          # 入口文件
│   └── style.css        # 全局样式
├── index.html           # HTML 入口
├── package.json         # 项目配置
├── postcss.config.js    # PostCSS 配置
├── tailwind.config.js   # Tailwind CSS 配置
├── tsconfig.json        # TypeScript 配置
└── vite.config.ts       # Vite 配置
```

## 安装与运行

### 前置要求

- Node.js (推荐使用 LTS 版本)
- npm 或 yarn

### 安装依赖

```bash
cd greenhouse-lighting-control
npm install
```

### 开发模式

```bash
npm run dev
```

项目将在 `http://localhost:5173` 启动。

### 构建生产版本

```bash
npm run build
```

构建完成后，产物将输出到 `dist` 目录。

### 预览生产构建

```bash
npm run preview
```

## 使用说明

### 控制面板

1. **启动**: 启动系统，开始自动控制补光灯
2. **停止**: 停止系统，关闭所有自动控制
3. **重置**: 重置系统到初始状态

### 光照调节

- 使用滑块手动调节光照强度（0-2000 lux）
- 系统运行时，手动调节会触发自动控制逻辑

### 自动控制逻辑

- **光照 < 1000 lux**: 自动开启补光灯，光照强度逐渐增加
- **光照 > 1500 lux**: 自动关闭补光灯，光照强度逐渐降低
- **1000 lux ≤ 光照 ≤ 1500 lux**: 如果补光灯开启，光照强度继续缓慢增加

### 状态显示

- **运行状态**: 显示系统当前是否运行
- **补光灯状态**: 显示补光灯是否开启
- **光照强度**: 实时显示当前光照强度（lux）

## 开发

### 项目配置

- **Vite 配置**: `vite.config.ts`
- **TypeScript 配置**: `tsconfig.json`
- **Tailwind CSS 配置**: `tailwind.config.js`
- **PostCSS 配置**: `postcss.config.js`

### 核心组件

`src/views/GreenhouseView.vue` 是主要组件，包含：

- 温室环境的可视化展示
- 光照控制系统的逻辑实现
- 控制面板和状态显示

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！
