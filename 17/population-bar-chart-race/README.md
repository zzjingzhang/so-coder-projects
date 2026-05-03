# 人口增长柱状图竞赛

一个基于 Vue 3 + TypeScript + Tailwind CSS + PrimeVue 构建的人口增长可视化动画应用。

## 项目简介

本项目展示了世界各国从 1950 年到 2050 年的人口增长变化，通过动态柱状图竞赛的形式直观地呈现人口数据的演变过程。

## 功能特性

- 📊 **动态柱状图竞赛**: 平滑的动画过渡效果，展示各国人口排名变化
- ⏯️ **播放控制**: 支持播放、暂停、重置操作
- ⚡ **速度调节**: 提供多种播放速度选项（0.5x - 5x）
- 📅 **年份选择**: 可精确跳转到任意年份查看数据
- 🔢 **显示数量**: 可选择显示排名前 5、10 或 15 个国家
- 📋 **数据表格**: 完整的人口数据表格，支持排序功能
- 🎨 **美观界面**: 现代化的 UI 设计，响应式布局

## 技术栈

- **框架**: Vue 3 (Composition API)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **UI 组件库**: PrimeVue
- **路由**: Vue Router
- **构建工具**: Vite
- **图标**: PrimeIcons

## 项目结构

```
population-bar-chart-race/
├── src/
│   ├── components/          # 组件目录
│   │   ├── BarChartRace.vue       # 柱状图竞赛组件
│   │   ├── ControlPanel.vue       # 控制面板组件
│   │   └── DataTableView.vue      # 数据表格组件
│   ├── data/                # 数据目录
│   │   └── populationData.ts       # 人口数据生成与格式化
│   ├── types/               # 类型定义目录
│   │   └── index.ts                # TypeScript 类型定义
│   ├── views/               # 视图目录
│   │   └── PopulationRaceView.vue  # 主视图组件
│   ├── App.vue              # 根组件
│   ├── main.ts              # 入口文件
│   └── style.css            # 全局样式
├── public/                  # 静态资源目录
├── index.html               # HTML 模板
├── package.json             # 项目依赖配置
├── tsconfig.json            # TypeScript 配置
├── vite.config.ts           # Vite 配置
├── tailwind.config.js       # Tailwind CSS 配置 (v4)
└── postcss.config.js        # PostCSS 配置
```

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

```bash
cd population-bar-chart-race
npm install
```

### 启动开发服务器

```bash
npm run dev
```

应用将在 `http://localhost:5173` 启动。

### 构建生产版本

```bash
npm run build
```

构建产物将生成在 `dist` 目录。

### 预览生产版本

```bash
npm run preview
```

## 使用说明

1. **播放动画**: 点击控制面板中的「播放」按钮开始动画
2. **暂停动画**: 点击「暂停」按钮暂停当前动画
3. **重置动画**: 点击「重置」按钮回到起始年份（1950年）
4. **调节速度**: 选择不同的速度按钮（0.5x - 5x）改变播放速度
5. **跳转年份**: 使用滑块或直接选择跳转到任意年份
6. **调整显示数量**: 选择显示排名前 5、10 或 15 个国家
7. **数据排序**: 在数据表格中点击表头可以按排名、国家名称或人口排序

## 数据说明

本项目使用模拟数据，包含 16 个主要国家的人口数据：

- 中国、印度、美国、印度尼西亚、巴基斯坦
- 巴西、尼日利亚、孟加拉国、俄罗斯、日本
- 墨西哥、埃塞俄比亚、菲律宾、埃及、越南

数据时间范围：1950 年 - 2050 年

## 开发指南

### 添加新国家数据

在 `src/data/populationData.ts` 文件中，修改 `countries` 数组添加新国家：

```typescript
const countries = [
  // ... 现有国家
  { 
    id: 'country-code', 
    name: '国家名称', 
    basePopulation: 起始人口(百万), 
    growthRate: 年增长率, 
    color: '颜色值' 
  },
]
```

### 修改时间范围

在 `src/data/populationData.ts` 文件中修改起始和结束年份：

```typescript
const startYear = 1950
const endYear = 2050
```

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！
