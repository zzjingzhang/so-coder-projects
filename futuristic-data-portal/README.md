# Futuristic Data Portal

一个未来感十足的数据可视化门户，采用冷蓝色和淡灰色调，展示动画图表和交互式仪表盘元素。

## 🎨 预览

该项目具有以下特点：
- 赛博朋克风格的 UI 设计
- 霓虹蓝色和紫色配色方案
- 玻璃态效果的卡片组件
- 实时动画图表
- 响应式布局

## 🛠️ 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Angular | 19.x | 前端框架 |
| TypeScript | 5.7.x | 编程语言 |
| Tailwind CSS | 3.4.x | CSS 框架 |
| PrimeNG | 19.x | UI 组件库 |
| Chart.js | 4.4.x | 图表库 |
| Angular Router | 19.x | 路由管理 |
| Angular CLI | 19.x | 构建工具 |

## 📁 项目结构

```
futuristic-data-portal/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── sidebar/
│   │   │   │   └── sidebar.component.ts      # 侧边栏导航组件
│   │   │   └── header/
│   │   │       └── header.component.ts       # 顶部导航栏组件
│   │   ├── pages/
│   │   │   ├── dashboard/
│   │   │   │   └── dashboard.component.ts    # 仪表盘页面（主页面）
│   │   │   ├── analytics/
│   │   │   │   └── analytics.component.ts    # 数据分析页面
│   │   │   ├── realtime/
│   │   │   │   └── realtime.component.ts     # 实时监控页面
│   │   │   └── reports/
│   │   │       └── reports.component.ts      # 报告管理页面
│   │   ├── app.component.ts                   # 根组件
│   │   ├── app.config.ts                      # 应用配置
│   │   └── app.routes.ts                      # 路由配置
│   ├── index.html                             # HTML 入口文件
│   ├── main.ts                                # 应用入口文件
│   └── styles.css                             # 全局样式（包含 Tailwind）
├── angular.json                               # Angular 配置
├── tailwind.config.js                         # Tailwind 配置
├── postcss.config.js                          # PostCSS 配置
├── tsconfig.json                              # TypeScript 配置
├── package.json                               # 依赖管理
└── README.md                                  # 项目文档
```

## 🚀 快速开始

### 前置要求

确保您的开发环境已安装以下工具：

- **Node.js**: >= 18.13.0
- **npm**: >= 9.x 或 **yarn**
- **Angular CLI**: >= 19.x (可选，已包含在 devDependencies 中)

### 安装依赖

```bash
cd futuristic-data-portal
npm install
```

### 开发模式

启动开发服务器：

```bash
npm run dev
# 或
npm start
# 或
ng serve
```

应用将在 `http://localhost:4200` 运行。

### 构建生产版本

```bash
npm run build
# 或
ng build
```

构建产物将输出到 `dist/futuristic-data-portal` 目录。

### 其他命令

| 命令 | 说明 |
|------|------|
| `npm run watch` | 监听模式构建 |
| `npm run test` | 运行单元测试 |
| `npm run ng` | Angular CLI 命令 |

## 📊 功能特性

### 1. 仪表盘页面 (Dashboard)
- **实时统计卡片**: 展示访问量、页面浏览量、跳出率、转化率等关键指标
- **流量趋势图**: 折线图展示实时访问数据
- **设备分布**: 环形图展示桌面端、移动端、平板设备占比
- **收入概览**: 柱状图展示月度收入数据
- **性能指标**: 雷达图展示系统健康状况
- **服务监控**: 数据表格展示各服务节点状态

### 2. 数据分析页面 (Analytics)
- **标签页导航**: 流量分析、用户行为、转化率三个标签页
- **流量趋势**: 面积图对比今日与昨日数据
- **页面分类**: 堆叠柱状图展示各类别页面浏览量
- **流量来源**: 数据表格展示各渠道访问数据
- **会话时长**: 折线图展示平均会话时长
- **转化漏斗**: 可视化展示用户转化路径

### 3. 实时监控页面 (Realtime)
- **实时指标**: 每秒请求数、活跃用户、错误率、响应时间
- **实时数据流**: 动态更新的折线图展示实时流量
- **活动日志**: 滚动面板展示系统实时事件
- **系统节点**: 表格展示分布式系统各节点状态
- **自动刷新**: 可配置的自动刷新间隔

### 4. 报告管理页面 (Reports)
- **快速模板**: 预设报告模板（流量分析、转化漏斗、收入报告、用户留存）
- **统计卡片**: 总报告数、就绪、生成中、已计划
- **报告列表**: 数据表格展示所有报告
- **创建报告**: 对话框式报告创建向导
- **导出格式**: 支持 PDF、Excel、CSV、JSON 多种格式
- **定时任务**: 支持单次、每日、每周定时生成

## 🎨 设计系统

### 配色方案

| 颜色名称 | 色值 | 用途 |
|----------|------|------|
| Neon Blue | `#00f3ff` | 主色调、强调色 |
| Neon Purple | `#bd00ff` | 次要色调 |
| Neon Pink | `#ff00aa` | 警告色、强调 |
| Cyber Dark | `#0f172a` | 背景色 |
| Cyber 800 | `#1e293b` | 卡片背景 |
| Cyber 700 | `#334155` | 边框色 |
| Cyber 500 | `#64748b` | 次要文字 |
| Cyber 400 | `#94a3b8` | 主要文字 |

### 动画效果

- **脉冲发光 (Pulse Glow)**: 元素呼吸式发光效果
- **浮动 (Float)**: 元素上下浮动动画
- **扫描线 (Scan Line)**: 赛博朋克扫描线效果
- **渐入 (Fade In)**: 页面元素淡入效果
- **进度条动画 (Progress Shine)**: 进度条光泽流动效果

### 玻璃态效果

```css
.glass-panel {
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 243, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(0, 243, 255, 0.1);
}
```

## 🔧 配置说明

### Tailwind 配置 (`tailwind.config.js`)

项目已扩展 Tailwind 配置，添加了以下自定义内容：

- **自定义颜色**: `cyber`, `neon`, `glass` 系列颜色
- **自定义动画**: `glow-pulse`, `float`, `scan-line` 等
- **自定义背景图**: 赛博网格、电路图案
- **自定义阴影**: 霓虹发光阴影效果

### PrimeNG 配置

- 主题: `lara-dark-blue` (深色主题)
- 启用 Ripple 效果
- 暗色模式选择器: `.dark`

## 📝 开发指南

### 添加新页面

1. 在 `src/app/pages/` 目录下创建新的页面组件
2. 在 `src/app/app.routes.ts` 中添加路由配置
3. 在侧边栏 `sidebar.component.ts` 中添加导航项

### 自定义主题

修改 `tailwind.config.js` 中的 `theme.extend.colors` 配置来自定义配色方案。

### 使用 Chart.js

项目使用 PrimeNG 的 `ChartModule` 封装 Chart.js，支持以下图表类型：
- `line`: 折线图
- `bar`: 柱状图
- `doughnut`: 环形图
- `radar`: 雷达图
- `polarArea`: 极坐标图

## 🤝 贡献

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

MIT License - 详见 LICENSE 文件

## 📧 联系方式

如有问题或建议，请通过以下方式联系：

- 提交 Issue
- 发送邮件

---

⭐ 如果这个项目对您有帮助，请给它一个星标！
