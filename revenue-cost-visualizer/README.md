# 收入成本可视化工具

一个功能强大的 Web 应用程序，用于输入、上传和可视化收入与成本数据，帮助用户轻松分析财务趋势。

## 功能特性

- **数据输入**：支持手动输入收入和成本数据
- **文件上传**：支持拖拽或点击上传 CSV 格式的数据文件
- **数据可视化**：提供折线图、条形图、组合图、面积图等多种可视化方式
- **实时统计**：自动计算总收入、总成本、总利润、利润率等关键指标
- **趋势分析**：提供增长率分析、移动平均线、累计趋势等深度分析功能
- **响应式设计**：适配桌面端和移动端设备
- **自定义调色板**：使用专业的财务数据配色方案
- **示例数据**：内置示例数据，帮助用户快速上手

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| React | ^19.2.5 | 前端框架 |
| TypeScript | ~6.0.2 | 类型安全 |
| Vite | ^8.0.10 | 构建工具 |
| Tailwind CSS | ^4.x | CSS 框架（使用零配置模式） |
| shadcn/ui | - | UI 组件库 |
| React Router | ^7.x | 路由管理 |
| Recharts | ^2.x | 图表库 |
| Lucide React | - | 图标库 |
| Radix UI | - | 无障碍组件原语 |

## 项目结构

```
revenue-cost-visualizer/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── ui/                    # shadcn/ui 组件
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── select.tsx
│   │   │   └── tabs.tsx
│   │   └── Layout.tsx              # 布局组件
│   ├── context/
│   │   └── DataContext.tsx         # 数据状态管理
│   ├── lib/
│   │   └── utils.ts                # 工具函数
│   ├── pages/
│   │   ├── Home.tsx                # 首页/概览
│   │   ├── DataInput.tsx           # 数据输入页面
│   │   ├── Visualize.tsx           # 数据可视化页面
│   │   ├── Trends.tsx              # 趋势分析页面
│   │   └── NotFound.tsx            # 404 页面
│   ├── router/
│   │   └── index.tsx               # 路由配置
│   ├── types/
│   │   └── index.ts                # TypeScript 类型定义
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css                   # Tailwind CSS 配置 + 自定义主题
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

## 快速开始

### 前置要求

- Node.js >= 18.0.0
- npm 或 pnpm

### 安装依赖

```bash
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

### 代码检查

```bash
npm run lint
```

## 使用说明

### 1. 数据输入

- **手动输入**：在"数据输入"页面，填写日期、收入和成本，点击"添加数据"
- **CSV 上传**：点击"CSV 上传"标签，上传符合格式的 CSV 文件
- **加载示例数据**：点击"加载示例数据"按钮快速体验

**CSV 文件格式要求**：
```csv
date,revenue,cost
2024-01-31,125000,85000
2024-02-29,132000,92000
2024-03-31,148000,98000
```

### 2. 数据可视化

- 支持折线图、条形图、组合图三种图表类型
- 可切换是否显示利润线
- 提供趋势图和对比图两种视图
- 鼠标悬停查看详细数据

### 3. 趋势分析

- 利润构成分析
- 增长率分析（环比）
- 3期移动平均线
- 累计趋势图

## 自定义配置

### 调色板

在 `src/index.css` 中可以自定义主题颜色：

```css
@theme {
  --color-primary: #2563eb;        /* 主色 */
  --color-accent: #8b5cf6;         /* 强调色 */
  --color-chart-revenue: #22c55e;  /* 收入 - 绿色 */
  --color-chart-cost: #ef4444;     /* 成本 - 红色 */
  --color-chart-profit: #3b82f6;   /* 利润 - 蓝色 */
}
```

### 图表颜色

在各页面组件的 `COLORS` 常量中可以修改图表线条和填充颜色。

## 许可证

MIT

## 贡献

欢迎提交 Issue 和 Pull Request！
