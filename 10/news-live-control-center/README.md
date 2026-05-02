# 新闻媒体直播管理中心

## 项目简介

新闻媒体直播管理中心是一个现代化的直播管理系统，提供实时数据监测、频道管理、直播进度可视化等功能。该系统采用 React + TypeScript 技术栈构建，使用 Tailwind CSS 进行样式设计，Ant Design 提供 UI 组件。

## 技术栈

- **React 18** - 前端框架
- **TypeScript** - 类型安全的 JavaScript
- **Vite** - 快速的前端构建工具
- **Tailwind CSS** - 实用优先的 CSS 框架
- **Ant Design** - 企业级 UI 设计语言和 React 组件库
- **React Router** - React 应用的声明式路由

## 项目结构

```
news-live-control-center/
├── src/
│   ├── components/          # 组件目录
│   │   ├── Header.tsx              # 顶部导航栏组件
│   │   ├── ChannelList.tsx         # 频道列表组件
│   │   ├── LivePlayer.tsx          # 直播播放器组件
│   │   ├── LiveProgressBar.tsx     # 直播进度条组件
│   │   └── RealTimeMonitor.tsx     # 实时数据监测组件
│   ├── data/               # 模拟数据
│   │   └── mockData.ts            # 模拟频道和实时数据
│   ├── types/              # 类型定义
│   │   └── index.ts               # TypeScript 接口定义
│   ├── App.tsx             # 主应用组件
│   ├── main.tsx            # 应用入口文件
│   └── index.css           # 全局样式
├── public/                 # 静态资源
├── index.html              # HTML 模板
├── package.json            # 项目依赖配置
├── tsconfig.json           # TypeScript 配置
├── vite.config.ts          # Vite 配置
├── tailwind.config.js      # Tailwind CSS 配置
└── postcss.config.js       # PostCSS 配置
```

## 功能特性

### 1. 实时数据监测
- 总观看人数统计
- 活跃频道数量
- 网络带宽监测
- 视频码率显示
- 直播延迟监控
- 帧率追踪
- 系统运行时间
- 错误计数

### 2. 可切换频道列表
- 多频道展示（CCTV-1、CCTV-2、CCTV-13、东方卫视、湖南卫视、浙江卫视）
- 频道状态标识（直播中、已结束、即将开播）
- 观看人数实时更新
- 频道预览和描述
- 点击切换频道

### 3. 可视化直播进度条
- 直播时间显示（当前时间/总时长）
- 动态进度条
- 播放/暂停控制
- 重新开始
- 音量控制
- 全屏模式
- 高清标识

## 安装与运行

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装依赖

```bash
cd news-live-control-center
npm install
```

### 启动开发服务器

```bash
npm run dev
```

项目启动后，在浏览器中访问 `http://localhost:5173` 即可查看应用。

### 构建生产版本

```bash
npm run build
```

构建完成后，生成的文件将位于 `dist` 目录中。

### 预览生产版本

```bash
npm run preview
```

## 使用说明

1. **选择频道**：在左侧频道列表中点击任意频道卡片
2. **查看直播**：右侧直播播放器将显示选中频道的内容
3. **控制播放**：使用进度条下方的控制按钮进行播放控制
4. **监控数据**：实时数据监测区域会显示当前系统的各项指标

## 组件说明

### Header 组件
位于页面顶部，包含系统标题、通知、设置和用户信息。

### ChannelList 组件
展示所有可用频道，支持点击切换选中频道。

### LivePlayer 组件
显示当前选中频道的直播内容，包含频道信息和观看人数。

### LiveProgressBar 组件
提供直播进度可视化和播放控制功能，支持播放/暂停、重新开始、音量控制等。

### RealTimeMonitor 组件
实时监测并显示系统各项性能指标，包括观众数、带宽、延迟等。

## 开发说明

- 项目使用 TypeScript 进行类型检查
- 样式采用 Tailwind CSS 实用类
- UI 组件来自 Ant Design
- 数据使用模拟数据，实际项目中可替换为真实 API 调用
- 实时数据更新使用 `setInterval` 模拟

## 后续优化建议

1. **添加真实 API 集成**：替换模拟数据为真实后端 API
2. **实现 WebSocket 实时通信**：使用 WebSocket 实现真正的实时数据推送
3. **添加用户认证**：实现登录、权限管理等功能
4. **增加直播录制功能**：支持直播内容的录制和回放
5. **优化移动端适配**：进一步优化移动端响应式布局
6. **添加数据可视化图表**：使用 ECharts 或 Chart.js 展示历史数据趋势

## 许可证

MIT License
