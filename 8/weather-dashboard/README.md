# 实时天气监控仪表盘

一个基于 React + TypeScript + Tailwind CSS + Ant Design + Recharts 的实时天气监控仪表盘应用。

## 功能特性

- 🌡️ **温度变化折线图**：展示城市过去24小时的温度和湿度变化趋势
- 🌧️ **降水概率饼图**：可视化展示不同天气状况的概率分布
- 🏙️ **城市选择**：支持切换多个城市的天气数据
- ⏰ **时间范围过滤**：支持选择不同的时间范围查看历史数据
- 📱 **响应式设计**：适配不同屏幕尺寸，提供良好的移动端体验

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| React | ^19.2.5 | 前端框架 |
| TypeScript | ~6.0.2 | 类型安全的 JavaScript |
| Vite | ^8.0.10 | 新一代前端构建工具 |
| Tailwind CSS | ^4.x | 实用优先的 CSS 框架 |
| Ant Design | ^5.x | 企业级 UI 设计语言和 React 组件库 |
| React Router | ^7.x | React 路由解决方案 |
| Recharts | ^2.x | 基于 React 的图表库 |

## 项目结构

```
weather-dashboard/
├── public/              # 静态资源目录
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/          # 资源文件
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components/      # 组件目录
│   │   ├── Header.tsx              # 顶部导航栏组件
│   │   ├── WeatherCard.tsx         # 天气信息卡片组件
│   │   ├── FilterPanel.tsx         # 过滤面板组件
│   │   ├── TemperatureChart.tsx    # 温度折线图组件
│   │   └── PrecipitationChart.tsx  # 降水概率饼图组件
│   ├── data/            # 数据目录
│   │   └── mockData.ts  # 模拟数据
│   ├── pages/           # 页面目录
│   │   └── Dashboard.tsx  # 仪表盘页面
│   ├── types/           # 类型定义
│   │   └── index.ts     # TypeScript 类型定义
│   ├── App.tsx          # 主应用组件
│   ├── main.tsx         # 应用入口
│   └── index.css        # 全局样式
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts       # Vite 配置文件
└── README.md
```

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

```bash
cd weather-dashboard
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

构建产物将输出到 `dist` 目录。

### 预览生产版本

```bash
npm run preview
```

### 代码检查

```bash
npm run lint
```

## 组件说明

### Header 组件

顶部导航栏，显示应用标题和当前日期。

### WeatherCard 组件

展示当前城市的天气概况，包括：
- 城市名称
- 当前温度
- 天气状况描述
- 湿度
- 最后更新时间

### FilterPanel 组件

过滤面板，提供：
- 城市选择下拉框
- 时间范围选择下拉框
- 日期选择器

### TemperatureChart 组件

温度变化折线图，使用 Recharts 的 AreaChart 和 LineChart 组合：
- 左侧 Y 轴：温度 (°C)，使用面积图展示
- 右侧 Y 轴：湿度 (%)，使用折线图展示
- X 轴：时间轴
- 交互式 Tooltip：鼠标悬停显示详细数据

### PrecipitationChart 组件

降水概率饼图，使用 Recharts 的 PieChart：
- 环形图样式，中心留白
- 自定义标签显示百分比
- 图例说明各天气类型
- 交互式 Tooltip

## 数据说明

当前版本使用模拟数据，数据位于 `src/data/mockData.ts`。

### 支持的城市

- 北京
- 上海
- 广州
- 深圳
- 杭州
- 成都

### 时间范围

- 过去24小时
- 过去7天
- 过去30天

## 扩展建议

### 接入真实天气 API

可以替换模拟数据，接入真实的天气 API，如：

- 和风天气 API
- OpenWeatherMap API
- 高德地图天气 API
- 百度地图天气 API

### 添加更多功能

- 空气质量指数 (AQI) 图表
- 未来7天天气预报
- 天气预警通知
- 城市收藏功能
- 数据导出功能
- 主题切换（亮色/暗色模式）

## License

MIT

## 贡献

欢迎提交 Issue 和 Pull Request！
