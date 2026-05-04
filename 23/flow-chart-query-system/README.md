# 流程图查询系统

一个基于 Angular 框架开发的业务流程图查询与可视化管理系统。

## 功能特性

- **流程图查询**：支持按流程图名称或描述进行模糊搜索
- **列表展示**：以表格形式展示流程图列表，包含流程图名称、功能描述、创建人、创建时间等信息
- **流程图可视化**：使用 SVG 绘制流程图，支持多种节点类型（开始、结束、处理、判断、并行）
- **节点详情查看**：点击流程图节点可查看该节点的详细技术信息，包括：
  - 代码类信息
  - 方法定义
  - 业务规则
  - 权限配置
  - 表模型结构
  - 静态配置

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Angular | 21.2.0 | 前端框架 |
| TypeScript | 5.9.2 | 开发语言 |
| Tailwind CSS | 4.2.4 | CSS 框架 |
| Angular Material | 21.2.9 | UI 组件库 |
| Angular Router | 21.2.0 | 路由管理 |
| Angular CLI | 21.2.9 | 项目构建工具 |
| RxJS | 7.8.0 | 响应式编程 |

## 项目结构

```
flow-chart-query-system/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── flow-chart-list/           # 流程图列表页面
│   │   │   │   ├── flow-chart-list.component.ts
│   │   │   │   ├── flow-chart-list.component.html
│   │   │   │   └── flow-chart-list.component.css
│   │   │   ├── flow-chart-detail/         # 流程图详情页面
│   │   │   │   ├── flow-chart-detail.component.ts
│   │   │   │   ├── flow-chart-detail.component.html
│   │   │   │   └── flow-chart-detail.component.css
│   │   │   └── node-detail-dialog/         # 节点详情弹窗
│   │   │       ├── node-detail-dialog.component.ts
│   │   │       ├── node-detail-dialog.component.html
│   │   │       └── node-detail-dialog.component.css
│   │   ├── models/                           # 数据模型
│   │   │   ├── flow-chart.model.ts          # 流程图和节点模型
│   │   │   └── node-detail.model.ts         # 节点详情模型
│   │   ├── services/                         # 服务层
│   │   │   └── flow-chart-data.service.ts   # 流程图数据服务
│   │   ├── app-module.ts                     # 根模块
│   │   ├── app-routing-module.ts             # 路由配置
│   │   ├── app.ts                            # 根组件
│   │   ├── app.html                          # 根组件模板
│   │   └── app.css                           # 根组件样式
│   ├── index.html                            # 入口 HTML
│   ├── main.ts                               # 应用入口
│   └── styles.css                            # 全局样式
├── angular.json                              # Angular 配置
├── tailwind.config.js                        # Tailwind CSS 配置
├── package.json                              # 依赖配置
├── tsconfig.json                             # TypeScript 配置
└── README.md                                 # 项目说明文档
```

## 页面说明

### 1. 流程图列表页面 (`/list`)

- **搜索功能**：支持按流程图名称或描述进行模糊搜索，输入时自动防抖（300ms）
- **数据表格**：展示流程图列表，包含以下列：
  - 流程图：显示名称和节点数量
  - 功能描述：流程图的功能说明
  - 创建人：流程创建者信息（带头像）
  - 创建时间：流程创建时间
  - 操作：提供"查看流程图"按钮
- **分页功能**：支持分页显示，每页 10 条，可切换 5/10/20 条
- **排序功能**：各列支持点击排序

### 2. 流程图详情页面 (`/detail/:id`)

- **基本信息卡片**：展示流程图名称、描述、创建人、创建时间、节点数量
- **流程图可视化**：使用 SVG 绘制流程图，包含：
  - 开始节点（绿色椭圆）
  - 结束节点（红色椭圆）
  - 处理节点（蓝色矩形）
  - 判断节点（黄色菱形）
  - 并行节点（紫色矩形，带分隔线）
- **节点交互**：
  - 鼠标悬停节点时有放大和高亮效果
  - 点击节点打开详情弹窗
- **图例说明**：顶部显示各节点类型的图例

### 3. 节点详情弹窗

使用标签页展示节点的详细技术信息：

- **代码类**：类名、包名、描述
- **方法**：方法名、返回类型、参数、描述
- **业务规则**：规则 ID、规则名称、规则内容
- **权限**：权限编码、权限名称、描述
- **表模型**：表名、表注释、字段信息（字段名、类型、注释、主键标识）
- **静态配置**：配置键、配置值、描述

## 安装与运行

### 前置要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

```bash
cd flow-chart-query-system
npm install
```

### 启动开发服务器

```bash
ng serve
```

或

```bash
npm start
```

启动后，在浏览器中访问 `http://localhost:4200/` 即可查看应用。

### 构建生产版本

```bash
ng build
```

构建产物将输出到 `dist/` 目录。

### 运行测试

```bash
ng test
```

## 路由配置

| 路径 | 组件 | 说明 |
|------|------|------|
| `/` | - | 重定向到 `/list` |
| `/list` | FlowChartListComponent | 流程图列表页面 |
| `/detail/:id` | FlowChartDetailComponent | 流程图详情页面 |
| `**` | - | 通配符路由，重定向到 `/list` |

## 样式说明

- 使用 Tailwind CSS 进行样式开发
- 色彩搭配合理，符合现代前端设计规范
- 按钮文字水平垂直居中显示
- 响应式布局，支持不同屏幕尺寸
- Material 组件使用 `azure-blue` 预构建主题

## 数据说明

项目使用模拟数据服务 (`FlowChartDataService`)，包含 3 个示例流程图：

1. **订单处理流程**：包含 7 个节点，展示订单创建、支付判断、发货处理等流程
2. **用户注册流程**：包含 7 个节点，展示信息填写、邮件验证、账号激活等流程
3. **商品上架流程**：包含 8 个节点，展示信息审核、价格审核、库存确认等流程

每个节点都包含完整的技术详情信息，可通过点击节点查看。

## 开发规范

- 使用 TypeScript 进行类型安全开发
- 组件采用标准的 Angular 组件结构
- 使用 RxJS 进行响应式编程
- 遵循 Angular 最佳实践
- 使用 Tailwind CSS 进行样式开发，避免内联样式

## 许可证

MIT License
