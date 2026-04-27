# 智能家居控制面板 (Smart Home Control Panel)

一个现代化的智能家居控制面板前端应用，支持设备控制、场景设置和自动化规则管理。

## 项目结构

```
smart-home-control-panel/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── vite.svg
│   │   └── vue.svg
│   ├── components/
│   │   └── HelloWorld.vue
│   ├── router/
│   │   └── index.js          # 路由配置
│   ├── views/
│   │   ├── Dashboard.vue      # 仪表板页面
│   │   ├── Devices.vue        # 设备控制页面
│   │   ├── Scenes.vue         # 场景设置页面
│   │   ├── Automation.vue     # 自动化规则页面
│   │   └── Settings.vue       # 设置页面
│   ├── App.vue                 # 根组件
│   ├── main.js                 # 入口文件
│   └── style.css               # 全局样式
├── .gitignore
├── README.md
├── index.html
├── package.json
├── postcss.config.js           # PostCSS 配置
├── tailwind.config.js          # Tailwind CSS 配置
└── vite.config.js              # Vite 配置
```

## 技术栈

- **框架**: Vue 3 (Composition API)
- **语言**: JavaScript
- **构建工具**: Vite
- **路由**: Vue Router 4
- **UI 组件库**: Naive UI
- **样式**: Tailwind CSS 3
- **图标**: @vicons/ionicons5

## 功能特性

### 1. 仪表板 (Dashboard)
- 设备状态统计
- 快捷场景入口
- 最近活动记录

### 2. 设备控制 (Devices)
- 按房间筛选设备
- 设备开关控制
- 灯光亮度调节
- 空调温度设置
- 窗帘开合度控制

### 3. 场景设置 (Scenes)
- 预设场景管理
- 场景激活/禁用
- 定时场景设置
- 新增/编辑/删除场景

### 4. 自动化规则 (Automation)
- 多种触发类型（温度、日落、移动检测、定时、PM2.5）
- 规则列表管理
- 启用/禁用规则
- 触发记录查看

### 5. 设置 (Settings)
- 主题模式切换（浅色/深色/跟随系统）
- 语言设置
- 通知开关
- 数据保留设置
- 关于信息

## 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装依赖

```bash
cd smart-home-control-panel
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:5173 查看应用

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录

### 预览生产版本

```bash
npm run preview
```

## 主要依赖说明

| 依赖名称 | 版本 | 用途 |
|---------|------|------|
| vue | ^3.5.32 | 前端框架 |
| vue-router | ^4.x | 路由管理 |
| naive-ui | ^2.x | UI 组件库 |
| @vicons/ionicons5 | ^0.12.x | 图标库 |
| tailwindcss | ^3.x | CSS 框架 |
| postcss | ^8.x | CSS 转换工具 |
| autoprefixer | ^10.x | CSS 前缀自动添加 |
| vite | ^8.x | 构建工具 |

## 页面路由

| 路由路径 | 页面名称 | 功能描述 |
|---------|---------|---------|
| `/` | Dashboard | 系统概览仪表板 |
| `/devices` | Devices | 设备控制管理 |
| `/scenes` | Scenes | 场景设置管理 |
| `/automation` | Automation | 自动化规则管理 |
| `/settings` | Settings | 系统设置 |

## 开发说明

### 组件结构

项目采用 Vue 3 Composition API 进行开发，主要组件包括：

- **App.vue**: 主布局组件，包含侧边栏导航和顶部栏
- **Dashboard.vue**: 仪表板页面，展示统计数据和快捷操作
- **Devices.vue**: 设备控制页面，管理所有智能设备
- **Scenes.vue**: 场景管理页面，配置和管理场景
- **Automation.vue**: 自动化规则页面，管理自动化规则
- **Settings.vue**: 设置页面，配置系统参数

### 样式规范

- 使用 Tailwind CSS 进行样式开发
- 组件内样式使用 `<style scoped>`
- 全局样式定义在 `src/style.css`

### 图标使用

项目使用 `@vicons/ionicons5` 图标库，使用方式：

```vue
<script setup>
import { HomeOutline, SettingsOutline } from '@vicons/ionicons5'
</script>

<template>
  <n-icon>
    <home-outline />
  </n-icon>
</template>
```

## 许可证

MIT License

## 联系方式

如有问题或建议，请提交 Issue 或 PR。
