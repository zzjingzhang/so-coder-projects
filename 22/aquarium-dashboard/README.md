# 水族箱智能管理系统 (Aquarium Dashboard)

一个功能完整的水族箱监控与管理仪表板，用于实时监控水箱温度、pH 值、鱼类数量、喂食时间表、过滤器状态和水质数据。

## 项目概述

本项目是一个基于 Angular 框架开发的水族箱智能管理系统，提供了以下核心功能：
- **实时监控**：水箱温度、pH 值、鱼类数量等关键指标
- **喂食管理**：可视化的喂食时间表，支持标记完成状态
- **过滤器监控**：实时显示过滤器运行状态和维护信息
- **水质分析**：直观的水质趋势图表，展示 10 天历史数据
- **响应式设计**：适配桌面和移动设备

## 技术栈

- **前端框架**: Angular 21.2.0
- **编程语言**: TypeScript
- **样式框架**: Tailwind CSS 4.2.4
- **UI 组件库**: Angular Material 21.2.9
- **路由**: Angular Router
- **打包工具**: Angular CLI Application Builder
- **测试框架**: Vitest

## 项目结构

```
aquarium-dashboard/
├── src/
│   ├── app/
│   │   ├── models/
│   │   │   └── aquarium-data.model.ts          # 数据模型定义
│   │   ├── services/
│   │   │   └── aquarium-data.service.ts        # 数据服务（包含样本数据）
│   │   ├── dashboard/
│   │   │   ├── dashboard.ts                     # 仪表板组件逻辑
│   │   │   ├── dashboard.html                   # 仪表板组件模板
│   │   │   └── dashboard.css                    # 仪表板组件样式
│   │   ├── app-module.ts                        # 应用模块
│   │   ├── app-routing-module.ts                # 路由配置
│   │   ├── app.ts                               # 根组件
│   │   ├── app.html                             # 根组件模板
│   │   └── app.css                              # 根组件样式
│   ├── index.html                               # 入口 HTML
│   ├── main.ts                                  # 入口文件
│   ├── styles.css                               # 全局样式（Tailwind CSS 配置）
│   └── material-theme.scss                      # Angular Material 主题配置
├── angular.json                                 # Angular 配置
├── package.json                                 # 依赖配置
├── postcss.config.js                            # PostCSS 配置
├── tsconfig.json                                # TypeScript 配置
└── README.md                                    # 项目文档
```

## 核心功能

### 1. 状态卡片区域

- **平均水温**：显示所有水箱的平均温度，目标范围 26.0°C - 28.0°C
- **pH 值**：显示平均 pH 值，目标范围 6.8 - 7.2
- **鱼类总数**：统计所有水箱中的鱼类总数
- **过滤器状态**：显示运行中的过滤器数量占比

### 2. 水箱详情区域

每个水箱展示：
- 实时水温与目标温度对比
- 实时 pH 值与目标 pH 对比
- 鱼类数量
- 上次/下次换水时间
- 状态指示器（正常/注意/警告）

### 3. 喂食时间表

- 按时间排序的喂食计划
- 显示食物类型、数量和对应水箱
- 支持点击按钮标记完成/未完成
- 完成状态视觉区分（绿色背景 + 划线文字）

### 4. 过滤器状态

- 实时显示每个过滤器的运行状态
- 运行状态指示器（绿色脉冲动画）
- 运行中过滤器显示效率进度条
- 维护信息（上次/下次维护时间）
- 状态颜色编码：
  - 绿色：运行中
  - 黄色：维护中
  - 红色：已停止

### 5. 水质趋势图表

可视化展示最近 10 天的水质数据：

- **水温与 pH 趋势图**：双柱图对比显示
- **硝酸盐含量趋势**：柱状图展示，包含警告阈值说明
- **氨氮与亚硝酸盐含量**：双柱图对比，标注安全标准

图表特性：
- 悬停提示（Tooltip）显示具体数值
- 渐变色彩增加视觉层次感
- 响应式宽度，支持横向滚动

### 6. 快捷操作区域

提供四个快捷操作按钮：
- 换水记录
- 维护计划
- 水质检测
- 数据报表

按钮特性：
- 渐变色背景
- 悬停阴影效果
- 图标 + 文字组合
- 文字水平垂直居中

## 样本数据

项目预先填充了丰富的样本数据：

### 水箱数据
- **主展示缸**：200L，水温 25.5°C，pH 7.2，15 条鱼
- **繁殖缸**：50L，水温 27.8°C，pH 6.8，8 条鱼
- **检疫缸**：30L，水温 26.2°C，pH 7.5，3 条鱼

### 喂食计划（7 条记录）
- 不同时间点的喂食安排
- 包含薄片饲料、冷冻丰年虾、颗粒饲料、鱼苗专用饲料、检疫专用饲料

### 过滤器数据（4 个过滤器）
- 主缸过滤系统（运行中，效率 95%）
- 前置过滤器（运行中，效率 98%）
- 繁殖缸过滤器（运行中，效率 90%）
- 检疫缸过滤器（维护中）

### 水质历史数据（10 天）
- 水温：25.3°C - 25.9°C
- pH 值：6.8 - 7.3
- 氨氮：0.01 - 0.02 mg/L
- 亚硝酸盐：0.01 - 0.02 mg/L
- 硝酸盐：15 - 22 mg/L

## 安装与运行

### 前置要求

确保您的开发环境已安装：
- Node.js (推荐版本 18.x 或更高)
- npm (通常随 Node.js 一起安装)
- Angular CLI (可选，也可以通过 npx 运行)

### 安装依赖

```bash
cd aquarium-dashboard
npm install
```

### 开发模式运行

```bash
npm start
```

或者使用 Angular CLI：

```bash
ng serve
```

启动后，在浏览器中访问 `http://localhost:4200/` 即可查看应用。

如果端口 4200 被占用，可以指定其他端口：

```bash
ng serve --port 4201
```

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist/` 目录。

### 运行测试

```bash
npm test
```

## 色彩搭配说明

### 主色调
- **背景**：从青色到蓝色的渐变 `bg-gradient-to-br from-cyan-50 to-blue-50`，营造清新专业的水族氛围
- **卡片背景**：白色 `bg-white`，确保内容清晰可读
- **圆角**：使用 `rounded-2xl` 和 `rounded-xl`，营造现代柔和的视觉效果

### 状态颜色
- **正常/运行中**：绿色系 `text-green-500`, `bg-green-100`
- **注意/维护中**：黄色系 `text-yellow-500`, `bg-yellow-100`
- **警告/已停止**：红色系 `text-red-500`, `bg-red-100`
- **信息**：蓝色系 `text-blue-600`, `bg-blue-100`

### 按钮样式
- **主按钮**：青色到蓝色渐变 `bg-gradient-to-r from-cyan-500 to-blue-600`
- **快捷操作按钮**：多种渐变配色，区分不同功能
- **悬停效果**：阴影加深 `hover:shadow-lg`，提升交互反馈
- **文字居中**：使用 `flex items-center justify-center` 确保文字水平垂直居中

### 图表颜色
- **水温**：青色到橙色渐变 `from-cyan-400 to-orange-400`
- **pH 值**：紫色系 `from-purple-300 to-purple-500`
- **硝酸盐**：绿色系 `from-green-300 to-green-500`
- **氨氮**：红色系 `from-red-200 to-red-500`
- **亚硝酸盐**：黄色系 `from-yellow-200 to-yellow-500`

## 响应式设计

项目使用 Tailwind CSS 的响应式断点：

- **移动设备** (`sm`)：单列布局
- **平板设备** (`md`)：双列/三列布局
- **桌面设备** (`lg`)：四列布局，完整显示所有内容

主要响应式特性：
- 网格布局自适应列数
- 字体大小根据屏幕宽度调整
- 图表区域支持横向滚动
- 按钮和卡片间距自动调整

## 开发与贡献

### 代码规范

- 使用 TypeScript 严格模式
- 遵循 Angular 风格指南
- 组件和服务使用独立的文件
- 模板中使用响应式布局
- 色彩和间距使用 Tailwind CSS 工具类

### 添加新功能

1. 在 `src/app/models/` 中添加新的数据模型
2. 在 `src/app/services/` 中添加新的服务
3. 在 `src/app/dashboard/` 或创建新组件目录
4. 在 `src/app/app-routing-module.ts` 中配置新路由
5. 在 `src/app/app-module.ts` 中声明新组件和导入所需模块

### 自定义样本数据

编辑 `src/app/services/aquarium-data.service.ts` 文件中的数据：

- `tanks`：水箱数据
- `waterQualityHistory`：水质历史数据
- `feedingSchedules`：喂食时间表
- `filters`：过滤器数据
- `fish`：鱼类详情

## 许可证

本项目仅供教育和学习用途。

## 联系方式

如有问题或建议，请提交 Issue 或 Pull Request。

---

**项目创建日期**：2026-05-03
**最后更新**：2026-05-03
