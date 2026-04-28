# Fleet Alerts Dashboard

车队远程信息处理车队经理仪表板的警报和通知屏幕，专为每天处理驾驶员、车辆、行程、安全事件、合规性和分数的车队经理而设计。

## 功能特性

- 企业级 UI 设计，平静、值得信赖和高效运营的感觉
- 三个标签页分类：全部、关键、需要注意
- 18 条模拟数据（4 条关键、8 条需要注意、6 条信息性）
- 已读/未读状态管理
- 点击卡片标记为已读
- 全部标记为已读功能
- 顶部导航栏，包含响铃图标和通知计数器

## 技术栈

- **框架**: Angular 21.2.0
- **语言**: TypeScript 5.9.2
- **样式**: Tailwind CSS 3.x
- **UI 组件库**: Angular Material 19.x
- **路由**: Angular Router
- **打包方式**: Angular CLI Application Builder

## 项目结构

```
fleet-alerts-dashboard/
├── src/
│   ├── app/
│   │   ├── alert-card/           # 警报卡片组件
│   │   │   ├── alert-card.component.css
│   │   │   ├── alert-card.component.html
│   │   │   └── alert-card.component.ts
│   │   ├── alerts/               # 警报通知屏幕组件
│   │   │   ├── alerts.component.css
│   │   │   ├── alerts.component.html
│   │   │   └── alerts.component.ts
│   │   ├── models/               # 数据模型
│   │   │   └── alert.model.ts
│   │   ├── navbar/               # 导航栏组件
│   │   │   ├── navbar.component.css
│   │   │   ├── navbar.component.html
│   │   │   └── navbar.component.ts
│   │   ├── services/             # 服务
│   │   │   └── alert.service.ts
│   │   ├── app.config.ts         # 应用配置
│   │   ├── app.html              # 根组件模板
│   │   ├── app.routes.ts         # 路由配置
│   │   └── app.ts                # 根组件
│   ├── index.html                # 入口 HTML
│   ├── main.ts                   # 入口文件
│   └── styles.css                # 全局样式
├── angular.json                  # Angular 配置
├── package.json                  # 依赖配置
├── postcss.config.js             # PostCSS 配置
├── tailwind.config.js            # Tailwind CSS 配置
├── tsconfig.json                 # TypeScript 配置
└── README.md                     # 项目文档
```

## 视觉设计

### 配色方案

- **背景**: 柔和的灰白色/浅灰色 (#F7F9FB)
- **卡片**: 纯白色，带有微妙的阴影
- **关键警报**: 柔和的红色 (#D64545)
- **需要注意**: 琥珀色/橙色 (#F2A93B)
- **信息性**: 中性蓝/板岩色 (#475569)

### 设计原则

- 仅灯光模式
- 圆角 (8–12px)
- 干净的排版（Inter / SF Pro 风格）
- 没有视觉混乱、没有厚重的边框、没有过多的图标
- 卡片可在 2 秒内完成扫描
- 通过内容 + 微妙的颜色而不是噪音传达优先级

## 警报类型

### 关键警报 (4 条)

- 检测到严重碰撞（车辆 + 位置）
- 检测到反复超速（同一车辆，多个事件）
- 车辆设备离线（离线 > X 小时）
- 驾驶员分数进入不良类别

### 需要注意 (8 条)

- 提交验证文件
- 车辆保养到期
- 未分配的行程已完成
- 车辆得分低于车队中位数
- 驾驶员得分低于中位数
- 机队得分进入较差类别
- 设备连接不稳定
- 文档即将过期

### 信息性 (6 条)

- 新司机上任
- 分配给驾驶员的车辆
- 新增车辆
- 资产已删除
- 舰队得分每周更新
- FM 加入通知

## 安装和运行

### 前置要求

- Node.js 18.x 或更高版本
- npm 11.x 或更高版本

### 安装依赖

```bash
npm install
```

### 开发模式

运行以下命令启动开发服务器：

```bash
npm run dev
```

或

```bash
ng serve
```

服务器启动后，在浏览器中访问 `http://localhost:4200/`。应用程序会在您修改任何源文件时自动重新加载。

### 构建生产版本

运行以下命令构建项目：

```bash
npm run build
```

构建产物将存储在 `dist/` 目录中。默认情况下，生产构建会优化应用程序的性能和速度。

## 使用说明

1. **查看警报**: 打开应用程序后，您会看到所有警报列表
2. **切换标签页**: 点击 "全部"、"关键" 或 "需要注意" 标签页来筛选警报
3. **标记为已读**: 点击任何警报卡片将其标记为已读
4. **全部标记为已读**: 点击右上角的 "全部标记为已读" 按钮将所有警报标记为已读
5. **通知计数**: 顶部导航栏的响铃图标显示未读警报数量

## 开发

### 代码脚手架

Angular CLI 包含强大的代码脚手架工具。要生成新组件，运行：

```bash
ng generate component component-name
```

有关可用的示意图（如 `components`、`directives` 或 `pipes`）的完整列表，运行：

```bash
ng generate --help
```

### 运行单元测试

使用 [Vitest](https://vitest.dev/) 测试运行器执行单元测试：

```bash
ng test
```

## 额外资源

有关使用 Angular CLI 的更多信息，包括详细的命令参考，请访问 [Angular CLI 概述和命令参考](https://angular.dev/tools/cli) 页面。
