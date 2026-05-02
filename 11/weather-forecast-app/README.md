# Weather Forecast App

一款简洁且易于浏览的天气应用程序，提供美观的每日天气预报和每小时天气细分。

## 项目概述

该天气应用程序专注于提供清晰、直观的天气预报体验，包括：

- **每日天气预报**：展示未来7天的天气概览，点击可查看详细信息
- **每小时天气细分**：24小时温度趋势图和详细的每小时数据
- **视觉吸引力设计**：使用渐变色、动画和现代 UI 元素

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Angular | 19.2.x | 前端框架 |
| TypeScript | 5.9.x | 编程语言 |
| Tailwind CSS | 4.2.x | 样式框架 |
| Angular Material | 19.2.x | UI 组件库 |
| Angular Router | 19.2.x | 路由管理 |
| Angular CLI | 19.2.x | 项目构建工具 |

## 项目结构

```
weather-forecast-app/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── daily-forecast/
│   │   │   │   ├── daily-forecast.component.ts
│   │   │   │   ├── daily-forecast.component.html
│   │   │   │   └── daily-forecast.component.css
│   │   │   └── hourly-forecast/
│   │   │       ├── hourly-forecast.component.ts
│   │   │       ├── hourly-forecast.component.html
│   │   │       └── hourly-forecast.component.css
│   │   ├── data/
│   │   │   └── mock-weather.data.ts
│   │   ├── models/
│   │   │   └── weather.model.ts
│   │   ├── services/
│   │   │   └── weather.service.ts
│   │   ├── app.config.ts
│   │   ├── app.routes.ts
│   │   ├── app.ts
│   │   ├── app.html
│   │   └── app.css
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── angular.json
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
└── README.md
```

## 功能特性

### 每日天气预报
- 显示当前和未来7天的天气预报
- 点击某天可查看详细信息（温度、湿度、风速、降水概率）
- 最高/最低温度显示
- 天气状况图标和描述

### 每小时天气细分
- 24小时温度趋势图表
- 可切换查看全部、白天或夜间时段
- 点击某小时查看详细数据
- 当前时间高亮显示
- 可水平滚动的小时卡片列表
- 体感温度、湿度、风速、降水概率等详细信息

## 安装

### 前置要求

确保你的开发环境已安装：
- Node.js (推荐 v18.x 或更高版本)
- npm (通常随 Node.js 一起安装)
- Angular CLI (如果需要全局安装)

### 安装依赖

```bash
cd weather-forecast-app
npm install
```

## 启动项目

### 开发模式

```bash
npm start
```

或使用 Angular CLI：

```bash
ng serve
```

项目启动后，在浏览器中访问 `http://localhost:4200/`

### 生产构建

```bash
npm run build
```

构建产物将输出到 `dist/` 目录。

## 开发说明

### 组件结构

- **AppComponent**：主应用组件，包含导航栏和路由出口
- **DailyForecastComponent**：每日天气预报页面
- **HourlyForecastComponent**：每小时天气预报页面

### 数据模型

在 `src/app/models/weather.model.ts` 中定义：
- `DailyForecast`：每日天气预报接口
- `HourlyForecast`：每小时天气预报接口
- `WeatherCondition`：天气状况类型（晴天、多云、下雨等）
- `weatherIcons`：天气图标映射
- `weatherGradients`：天气渐变色映射

### 服务

`WeatherService` 提供以下方法：
- `getDailyForecast()`：获取每日天气预报
- `getHourlyForecast()`：获取每小时天气预报
- `getCurrentWeather()`：获取当前天气

### 样式

- 使用 Tailwind CSS v4 的 `@import "tailwindcss"` 方式
- 自定义颜色主题：`weather-sunny`, `weather-cloudy`, `weather-rainy`, `weather-night`
- 渐变色背景根据天气状况动态应用

## 路由配置

| 路径 | 组件 | 说明 |
|------|------|------|
| `/` | 重定向到 `/daily` | 默认路由 |
| `/daily` | DailyForecastComponent | 每日天气预报 |
| `/hourly` | HourlyForecastComponent | 每小时天气预报 |

## 设计特点

1. **响应式设计**：适配各种屏幕尺寸
2. **毛玻璃效果**：使用 `backdrop-filter: blur()` 实现现代视觉效果
3. **渐变色彩**：根据天气状况动态应用渐变背景
4. **平滑动画**：页面切换和元素悬停动画
5. **交互体验**：点击、悬停等交互反馈

## 未来扩展建议

- 集成真实的天气 API（如 OpenWeatherMap、Weather API）
- 添加位置搜索功能
- 实现天气预警通知
- 添加用户偏好设置（温度单位、主题等）
- 支持多语言
- 添加离线缓存功能

## 许可证

MIT License
