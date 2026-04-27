# Future Data Visualization Portal

一个未来感十足的数据可视化门户，采用冷蓝色和淡灰色调，展示动画图表和交互式仪表盘元素。

## 项目简介

本项目是一个现代化的数据分析仪表盘，具有未来感的UI设计和丰富的交互体验。通过实时数据更新、流畅的动画效果和精美的图表可视化，为用户提供直观的数据洞察。

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Angular | 19.1.x | 前端框架 |
| TypeScript | 5.7.x | 编程语言 |
| Tailwind CSS | 3.4.x | CSS框架 |
| PrimeNG | 19.0.x | UI组件库 |
| Chart.js | 4.4.x | 图表库 |
| RxJS | 7.8.x | 响应式编程 |
| Angular CLI | 19.1.x | 构建工具 |

## 项目结构

```
future-data-visualization/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── dashboard/
│   │   │       └── dashboard.component.ts    # 主仪表盘组件
│   │   ├── services/
│   │   │   └── data.service.ts               # 数据服务
│   │   ├── types/
│   │   │   └── index.ts                      # TypeScript类型定义
│   │   ├── app.component.ts                  # 根组件
│   │   ├── app.config.ts                     # 应用配置
│   │   └── app.routes.ts                     # 路由配置
│   ├── index.html                             # HTML入口文件
│   ├── main.ts                                # 应用入口
│   └── styles.css                             # 全局样式
├── angular.json                               # Angular配置
├── package.json                               # 项目依赖
├── tailwind.config.js                         # Tailwind配置
├── postcss.config.js                          # PostCSS配置
└── tsconfig.json                              # TypeScript配置
```

## 主要功能

### 📊 数据可视化
- **折线图**: 显示收入和支出的月度趋势
- **柱状图**: 显示每周访问者统计
- **环形图**: 显示设备分布比例
- **迷你趋势图**: 每个统计卡片显示历史趋势
- **仪表盘**: 实时系统资源监控(CPU、内存、存储、网络)

### 🎨 UI设计特点
- **未来感设计**: 冷蓝色和淡灰色调，深色主题
- **玻璃拟态效果**: 半透明卡片 + 模糊背景
- **霓虹效果**: 文字和边框发光效果
- **网格背景**: 科技感的网格图案
- **渐变和发光**: 精心设计的渐变和阴影效果

### ✨ 动画与交互
- **加载动画**: 页面加载时的旋转动画
- **滚动进度**: 顶部进度条显示滚动位置
- **数字流动**: 统计数字的流动动画
- **图表动画**: 图表数据的平滑过渡
- **悬停效果**: 卡片和按钮的悬停反馈
- **实时数据**: 定时自动刷新模拟数据

### 📋 功能模块
- **统计卡片**: 总用户数、收入、活跃会话、转化率
- **项目表格**: 项目列表，支持分页
- **活动流**: 系统活动实时更新
- **图表画廊**: 数据可视化展示
- **时间范围选择**: 切换不同时间周期

## 安装与运行

### 环境要求
- Node.js >= 18.x
- npm >= 9.x

### 安装依赖

```bash
cd future-data-visualization
npm install
```

### 开发模式

```bash
npm run dev
# 或者
ng serve
```

应用将在 `http://localhost:4200` 启动。

### 构建生产版本

```bash
npm run build
# 或者
ng build
```

构建产物将输出到 `dist/future-data-visualization` 目录。

### 其他命令

```bash
# 运行测试
npm run test

# 监视模式构建
npm run watch
```

## 设计规范

### 颜色方案

| 颜色名称 | 十六进制值 | 用途 |
|----------|------------|------|
| 主色-500 | #0ea5e9 | 主色调、按钮、强调 |
| 主色-600 | #0284c7 | 悬停状态 |
| 主色-700 | #0369a1 | 深色渐变 |
| 强调色 | #06b6d4 | 次要强调 |
| 背景-950 | #020617 | 页面背景 |
| 背景-900 | #0f172a | 卡片背景 |
| 文本-100 | #f1f5f9 | 主要文本 |
| 文本-400 | #94a3b8 | 次要文本 |

### 动画时间

- 页面加载: 1500ms
- 数据刷新: 2000ms - 5000ms (不同组件)
- 悬停过渡: 300ms
- 仪表盘更新: 1000ms

## 自定义配置

### Tailwind 主题扩展

在 `tailwind.config.js` 中可以扩展主题：

```javascript
theme: {
  extend: {
    colors: {
      // 添加自定义颜色
    },
    animation: {
      // 添加自定义动画
    }
  }
}
```

### PrimeNG 主题

当前使用 `lara-dark-blue` 主题，可在 `app.config.ts` 中修改：

```typescript
providePrimeNG({
  theme: {
    preset: 'lara-dark-blue', // 可更换为其他预设
    options: {
      prefix: 'p',
      darkModeSelector: '.p-dark'
    }
  },
  ripple: true
})
```

## 浏览器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 开发指南

### 组件结构

项目使用 Angular 独立组件 (Standalone Components) 架构，每个组件都是独立的，无需模块声明。

### 数据服务

`DataService` 提供所有模拟数据，使用 RxJS Observables 实现实时更新：

```typescript
// 获取统计数据
this.dataService.getStatCards().subscribe(data => {
  this.statCards = data;
});

// 手动刷新
this.dataService.refreshData();
```

### 添加新图表

1. 在 `types/index.ts` 中定义数据类型
2. 在 `data.service.ts` 中添加数据获取方法
3. 在 `dashboard.component.ts` 中集成组件
4. 使用 PrimeNG Chart 组件渲染

## 许可证

MIT License

## 联系方式

如有问题或建议，请提交 Issue 或 Pull Request。
