# 当代舞蹈学院网站 (Contemporary Dance Academy)

一个现代化的当代舞蹈学院网站，采用醒目的黑色和鲜艳的洋红色主题，配有动画运动轨迹和交互式课程调度器。

## 项目简介

本项目是一个为当代舞蹈学院设计的企业展示网站，旨在展示学院的课程、师资力量、教学环境等信息，并提供便捷的课程预约功能。

## 技术栈

- **框架**: React 19
- **语言**: JavaScript (JSX)
- **样式**: Tailwind CSS 4
- **UI 组件库**: Ant Design 5
- **路由**: React Router 7
- **打包工具**: Vite 8

## 项目结构

```
contemporary-dance-academy/
├── public/
│   └── favicon.svg          # 网站图标
├── src/
│   ├── components/          # 通用组件
│   │   ├── Layout.jsx       # 布局组件（包含 Header 和 Footer）
│   │   ├── Header.jsx       # 头部导航组件
│   │   ├── Footer.jsx       # 底部组件
│   │   ├── Hero.jsx         # 动态头部区域（包含动画运动轨迹）
│   │   └── CourseScheduler.jsx  # 交互式课程调度器组件
│   ├── pages/               # 页面组件
│   │   ├── Home.jsx         # 首页
│   │   ├── Classes.jsx      # 课程页面
│   │   ├── About.jsx        # 关于我们页面
│   │   └── Schedule.jsx     # 课程预约页面
│   ├── App.jsx              # 主应用组件
│   ├── main.jsx             # 应用入口文件
│   └── index.css            # 全局样式
├── index.html               # HTML 模板
├── vite.config.js           # Vite 配置
├── tailwind.config.js       # Tailwind CSS 配置
├── postcss.config.js        # PostCSS 配置
├── package.json             # 项目依赖配置
└── README.md                # 项目说明文档
```

## 功能特性

### 1. 动态头部区域 (Hero)
- 采用黑色和洋红色主题配色
-  Canvas 绘制的动画运动轨迹效果
- 渐变色彩和发光效果
- 响应式设计，适配各种屏幕尺寸
- 实时统计数据展示

### 2. 交互式课程调度器
- 日历视图展示课程安排
- 课程类型筛选功能
- 课程详情弹窗展示
- 在线预约表单
- 已预约课程列表展示
- 课程名额进度条显示

### 3. 主要页面

#### 首页
- 动态 Hero 区域
- 学院数据统计
- 教学特色介绍
- 热门课程推荐
- 师资力量展示
- 学员评价
- 预约引导

#### 课程页面
- 课程分类标签页
- 搜索和筛选功能
- 课程卡片展示
- 课程详情信息
- 预约引导

#### 关于我们页面
- 学院介绍
- 发展历程时间线
- 师资力量详细介绍
- 教学环境展示
- 联系方式

#### 课程预约页面
- 完整的课程调度器
- 预约流程指引
- 预约须知

## 设计规范

### 色彩方案
- **主色调**: 黑色 (#000000)
- **强调色**: 洋红色 (#ec4899)
- **辅助色**: 粉色渐变 (#f472b6, #db2777)
- **文字色**: 白色 (#ffffff)、浅灰色 (#e5e7eb)
- **背景色**: 深灰色 (#111111)、黑色 (#000000)

### 排版规范
- **字体**: Segoe UI, system-ui, -apple-system, sans-serif
- **标题**: 加粗，白色
- **正文**: 16px，行高 1.6
- **行间距**: 舒适的行高确保可读性

### 交互规范
- 按钮文字水平垂直居中显示
- 悬停效果：颜色变化、阴影、缩放
- 平滑的过渡动画
- 清晰的点击反馈

## 安装与运行

### 前置要求
- Node.js 版本 >= 18.0.0
- npm 版本 >= 9.0.0

### 安装依赖

```bash
cd contemporary-dance-academy
npm install
```

### 开发模式运行

```bash
npm run dev
```

项目将在本地启动，默认地址为 `http://localhost:5173`

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录

### 预览生产版本

```bash
npm run preview
```

### 代码检查

```bash
npm run lint
```

## 主要依赖说明

```json
{
  "dependencies": {
    "react": "^19.2.5",           // React 框架核心
    "react-dom": "^19.2.5",       // React DOM 渲染
    "react-router-dom": "^7.14.2", // 路由管理
    "antd": "^5.22.6"             // UI 组件库
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^6.0.1",  // Vite React 插件
    "tailwindcss": "^4.2.4",            // CSS 框架
    "postcss": "^8.5.13",               // CSS 后处理器
    "autoprefixer": "^10.5.0",          // CSS 前缀自动添加
    "vite": "^8.0.10"                   // 构建工具
  }
}
```

## 浏览器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 响应式设计

项目完全支持响应式设计，适配以下设备：
- 桌面端 (1024px+)
- 平板端 (768px - 1023px)
- 移动端 (320px - 767px)

## 开发指南

### 添加新页面
1. 在 `src/pages/` 目录下创建新的页面组件
2. 在 `src/App.jsx` 中添加路由配置

### 添加新组件
1. 在 `src/components/` 目录下创建新的组件文件
2. 在需要使用的页面中导入并使用

### 自定义主题
- 全局样式在 `src/index.css` 中定义
- Ant Design 主题在 `src/main.jsx` 中配置
- Tailwind CSS 配置在 `tailwind.config.js` 中

## 注意事项

1. 所有图片资源建议使用相对路径或 CDN 地址
2. 确保按钮文字始终水平垂直居中显示
3. 保持颜色搭配的一致性，主色调为黑色和洋红色
4. 确保文字显示完整，避免被裁剪
5. 确保文字颜色与背景对比足够，保证可读性

## 联系方式

如有问题或建议，请联系：
- 邮箱: support@dance-academy.com
- 电话: 400-888-9999

## 许可证

MIT License
