# 供应链流程可视化

一个基于 Angular 的交互式供应链流程可视化应用，使用桑基图展示工厂、仓库和零售商之间的物料流动。

## 功能特性

- 📊 **桑基图可视化**：直观展示工厂 → 仓库 → 零售商 的完整物料流动
- 🔍 **多维度过滤**：支持按节点类型、产品类型和最小流量值筛选数据
- 📈 **实时统计**：图例面板显示各类型节点数量和总流量统计
- 🎨 **精美界面**：使用 Tailwind CSS 和 Angular Material 构建的现代化 UI
- 🖱️ **交互体验**：鼠标悬停显示节点和连接的详细信息

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Angular | 21.2 | 前端框架 |
| TypeScript | 5.9 | 编程语言 |
| Tailwind CSS | 3.x | CSS 框架 |
| Angular Material | 21.2 | UI 组件库 |
| Angular Router | 21.2 | 路由管理 |
| D3.js | 7.9 | 数据可视化库 |
| d3-sankey | 0.12 | 桑基图布局算法 |

## 项目结构

```
supply-chain-visualizer/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── sankey-chart/          # 桑基图组件
│   │   │   │   └── sankey-chart.component.ts
│   │   │   ├── filter-panel/          # 过滤器面板组件
│   │   │   │   └── filter-panel.component.ts
│   │   │   └── legend/                # 图例组件
│   │   │       └── legend.component.ts
│   │   ├── models/                    # 数据模型
│   │   │   └── supply-chain.model.ts
│   │   ├── pages/                     # 页面组件
│   │   │   └── dashboard/
│   │   │       └── dashboard.component.ts
│   │   ├── services/                  # 数据服务
│   │   │   └── supply-chain-data.service.ts
│   │   ├── app.config.ts              # 应用配置
│   │   ├── app.routes.ts              # 路由配置
│   │   ├── app.ts                     # 根组件
│   │   ├── app.html                   # 根模板
│   │   └── app.css                    # 根样式
│   ├── main.ts                        # 入口文件
│   ├── index.html                     # HTML 模板
│   └── styles.css                     # 全局样式
├── angular.json                       # Angular 配置
├── package.json                       # 依赖配置
├── tailwind.config.js                 # Tailwind CSS 配置
├── postcss.config.js                  # PostCSS 配置
├── tsconfig.json                      # TypeScript 配置
└── README.md                          # 项目文档
```

## 数据结构

### 节点类型

- **工厂 (Factory)**：蓝色 (#2563eb) - 生产产品的起点
- **仓库 (Warehouse)**：绿色 (#059669) - 存储和中转节点
- **零售商 (Retailer)**：橙色 (#d97706) - 最终销售节点

### 示例数据

应用包含预设的供应链数据：

**工厂**：
- 上海工厂
- 深圳工厂
- 北京工厂

**仓库**：
- 华东仓库
- 华南仓库
- 华北仓库

**零售商**：
- 天猫旗舰店
- 京东商城
- 苏宁易购
- 线下门店

## 快速开始

### 环境要求

- Node.js 18.x 或更高版本
- npm 9.x 或更高版本

### 安装依赖

```bash
cd supply-chain-visualizer
npm install
```

### 启动开发服务器

```bash
npm start
# 或
ng serve
```

启动后，在浏览器中访问 `http://localhost:4200`

### 构建生产版本

```bash
npm run build
# 或
ng build
```

构建产物将输出到 `dist/` 目录。

## 使用指南

### 过滤器功能

1. **节点类型筛选**：勾选/取消勾选工厂、仓库、零售商，控制显示的节点类型
2. **产品类型筛选**：按产品类型（电子产品、服装、家电）筛选物料流动
3. **最小流量值**：使用滑块设置最小流量阈值，过滤掉流量较小的连接

### 交互功能

- **悬停节点**：显示节点名称、类型和总流量
- **悬停连接**：显示从源节点到目标节点的流动详情，包括流量和产品类型

### 图例说明

图例面板位于左侧，显示：
- 各类型节点的颜色标识和数量统计
- 总流量统计
- 当前显示的节点数量和连接数量

## 开发命令

| 命令 | 说明 |
|------|------|
| `npm start` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run watch` | 监听模式构建 |
| `npm test` | 运行单元测试 |

## 自定义数据

如需使用自定义供应链数据，请修改 `src/app/services/supply-chain-data.service.ts` 文件中的 `rawData` 对象。

## 许可证

MIT License
