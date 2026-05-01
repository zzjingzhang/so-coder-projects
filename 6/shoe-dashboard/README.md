# 鞋类销售仪表盘

一个现代化的鞋类销售管理系统，采用暗色主题设计，提供直观的用户界面和强大的功能。

## 项目结构

```
shoe-dashboard/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.jsx
│   │   │   ├── card.jsx
│   │   │   ├── input.jsx
│   │   │   └── tabs.jsx
│   │   ├── LeftSidebar.jsx
│   │   ├── RightSidebar.jsx
│   │   └── TopNav.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── About.jsx
│   ├── lib/
│   │   └── utils.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

## 技术栈

- **React 18** - 前端框架
- **Vite** - 构建工具
- **Tailwind CSS** - CSS 框架
- **shadcn/ui** - UI 组件库
- **React Router** - 路由管理
- **Lucide React** - 图标库

## 主要功能

### 左侧导航抽屉
- 可收起/展开的侧边栏
- 包含首页、购物车、店铺、日历、应用等导航项
- 用户信息展示

### 右侧抽屉
- 固定在页面右侧
- 创建订单按钮
- 通知铃铛图标（带未读计数）
- 消息图标（带未读计数）

### 首页
- 搜索框
- 过滤和导出按钮
- 统计卡片（履约状态、实时追踪、销售视图、余额、交易、参与率）
- 多标签页界面（鞋子、订单、分析）
- 鞋子卡片列表（展示图片、价格、ID、时间、品牌、来源国家/地区、头像）
- 最近订单卡片列表

### 关于页
- 静态介绍页面
- 技术栈说明
- 功能介绍
- 联系方式

## 如何启动项目

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

项目将在 `http://localhost:5173` 启动（如果端口被占用，会自动选择其他端口）。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 预览生产构建

```bash
npm run preview
```

## 特性

- ✅ 暗色主题设计
- ✅ 响应式布局
- ✅ 可收起的侧边栏
- ✅ 图标集成（Lucide Icons）
- ✅ 路由管理
- ✅ 现代化 UI 组件
- ✅ 模拟数据展示

## License

MIT
