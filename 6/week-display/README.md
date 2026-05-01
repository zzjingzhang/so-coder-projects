# Week Display

一个用于计算和显示当前星期数的 Angular 应用程序。

## 功能特性

- 自动计算当前日期所在的星期数（一年中的第几周）
- 根据星期数的奇偶性显示不同的文字：
  - 偶数周：显示 "Hose und Hoodie"（蓝色主题）
  - 奇数周：显示 "Hose"（绿色主题）
- 精美的 UI 设计，使用 Tailwind CSS 和 NG-ZORRO 组件库
- 响应式布局，适配不同屏幕尺寸

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Angular | 21.x | 前端框架 |
| TypeScript | 5.9.x | 编程语言 |
| Tailwind CSS | 3.4.x | CSS 框架 |
| NG-ZORRO | 19.x | UI 组件库 |
| Angular Router | 21.x | 路由模块 |
| Angular CLI Application Builder | 21.x | 打包构建工具 |

## 项目结构

```
week-display/
├── src/
│   ├── app/
│   │   ├── pages/
│   │   │   └── home/
│   │   │       ├── home.component.ts      # 主页面组件逻辑
│   │   │       ├── home.component.html    # 主页面模板
│   │   │       └── home.component.css     # 主页面样式
│   │   ├── services/
│   │   │   └── week-number.service.ts     # 星期数计算服务
│   │   ├── app-module.ts                  # 根模块
│   │   ├── app-routing-module.ts          # 路由配置
│   │   ├── app.ts                         # 根组件
│   │   └── app.html                       # 根组件模板
│   ├── main.ts                            # 应用入口
│   ├── styles.css                         # 全局样式（包含 Tailwind）
│   └── index.html                         # HTML 入口
├── tailwind.config.js                     # Tailwind CSS 配置
├── angular.json                           # Angular 项目配置
├── package.json                           # 项目依赖配置
└── README.md                              # 项目文档
```

## 快速开始

### 环境要求

- Node.js 18.x 或更高版本
- npm 9.x 或更高版本

### 安装依赖

```bash
cd week-display
npm install
```

### 启动开发服务器

```bash
npm start
# 或者
ng serve
```

启动后，在浏览器中访问 `http://localhost:4200` 即可查看应用。

### 构建生产版本

```bash
npm run build
# 或者
ng build
```

构建产物将输出到 `dist/` 目录。

### 运行测试

```bash
npm test
# 或者
ng test
```

## 使用说明

应用启动后会自动：

1. 计算当前日期所在的星期数（一年中的第几周）
2. 显示当前日期
3. 根据星期数的奇偶性显示不同的文字和主题颜色：
   - **偶数周**：显示 "Hose und Hoodie"，蓝色渐变背景
   - **奇数周**：显示 "Hose"，绿色渐变背景

点击 "Aktualisieren" 按钮可以刷新当前状态。

## 核心逻辑说明

### 星期数计算

星期数计算服务 (`week-number.service.ts`) 实现了以下功能：

- `getWeekNumber()`: 计算当前日期是一年中的第几周
- `isEvenWeek()`: 判断当前周是否为偶数周

计算逻辑：
- 计算从年初到当前日期的天数
- 考虑年初第一天是星期几的影响
- 向上取整得到星期数

### 主题切换

主页面组件 (`home.component.ts`) 根据星期数的奇偶性动态切换：
- 显示文字内容
- 文字颜色
- 背景渐变
- 卡片边框颜色
- 卡片阴影颜色

## 样式说明

- 使用 Tailwind CSS 进行响应式布局和样式设计
- 奇数周使用绿色系主题
- 偶数周使用蓝色系主题
- NG-ZORRO 组件提供了精美的卡片、标签和按钮组件

## 许可证

MIT License
