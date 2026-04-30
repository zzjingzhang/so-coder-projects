# Google Search Clone

一个模仿 Google 搜索界面的 React 应用，使用 TypeScript、Tailwind CSS、PrimeReact 和 React Router 构建。

## 技术栈

- **框架**: React 18
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **UI 组件库**: PrimeReact
- **路由**: React Router v6
- **打包工具**: Vite

## 项目结构

```
google-search-clone/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   ├── context/
│   │   └── SearchContext.tsx      # 全局搜索状态管理
│   ├── data/
│   │   └── mockData.ts            # 模拟搜索数据
│   ├── pages/
│   │   ├── Home.tsx               # 首页组件
│   │   └── SearchResults.tsx      # 搜索结果页面
│   ├── services/
│   │   └── mockSearchApi.ts       # 模拟搜索 API 服务
│   ├── types/
│   │   └── search.ts              # TypeScript 类型定义
│   ├── App.css
│   ├── App.tsx                    # 应用根组件
│   ├── index.css                  # 全局样式（Tailwind 指令）
│   ├── main.tsx                   # 应用入口
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tailwind.config.js             # Tailwind CSS 配置
├── postcss.config.js              # PostCSS 配置
├── vite.config.ts                 # Vite 配置
├── tsconfig.json                  # TypeScript 配置
├── tsconfig.app.json
├── tsconfig.node.json
└── README.md
```

## 功能特性

- **首页**
  - Google 标志展示
  - 搜索栏（带图标按钮）
  - 导航链接（Gmail、图片等）
  - 响应式设计

- **搜索结果页面**
  - 显示搜索结果总数和搜索时间
  - 每个结果包含标题、摘要、显示链接和缩略图
  - 分页导航
  - 顶部搜索栏（可重新搜索）
  - 搜索类型选项卡

- **全局状态管理**
  - 使用 React Context 管理搜索词
  - 支持页面间状态共享

- **模拟数据**
  - 离线测试用的模拟搜索 API
  - 模拟搜索响应（包含延迟）

## 启动项目

### 安装依赖

```bash
cd google-search-clone
npm install
```

### 开发模式

```bash
npm run dev
```

应用将在 `http://localhost:5173` 启动。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 预览生产版本

```bash
npm run preview
```

## 路由说明

- `/` - 首页（Google 搜索入口）
- `/search` - 搜索结果页面（支持 URL 参数 `?q=搜索词`）

## 离线测试

项目使用模拟数据（`src/data/mockData.ts` 和 `src/services/mockSearchApi.ts`），无需外部 API 即可进行测试和开发。
