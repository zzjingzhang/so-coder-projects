# ETL Pipeline Visual Editor

一个基于 Web 的 ETL 管道可视化编辑器，使用 Angular 框架构建。

## 项目简介

ETL Pipeline Visual Editor 是一个可视化的 ETL（Extract, Transform, Load）管道编辑器，允许用户通过拖拽节点、连接节点、配置参数来构建数据处理工作流。

## 技术栈

- **框架**: Angular 19+ (Standalone Components)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **UI 组件库**: Angular Material
- **路由**: Angular Router
- **拖拽功能**: Angular CDK Drag & Drop
- **打包方式**: Angular CLI Application Builder

## 功能特性

### 节点调色板
- **源节点 (Source Nodes)**:
  - Database Source: 从数据库读取数据
  - File Source: 从文件读取数据（支持 CSV、JSON、Parquet、XML）
  - API Source: 从 API 接口读取数据

- **转换节点 (Transform Nodes)**:
  - Filter: 数据过滤
  - Map: 字段映射转换
  - Aggregate: 数据聚合
  - Join: 数据连接
  - Sort: 数据排序

- **接收器节点 (Sink Nodes)**:
  - Database Sink: 写入数据库
  - File Sink: 写入文件
  - API Sink: 发送到 API 接口

### 画布功能
- 拖拽节点到画布
- 节点拖拽移动
- 节点连接（通过端口点击连接）
- 节点删除
- 连接删除

### 节点配置
- 选中节点后显示配置表单
- 支持文本输入、下拉选择、多行文本
- 配置自动保存到工作流

### 工作流管理
- 创建新工作流
- 保存工作流到本地存储
- 加载已保存的工作流
- 删除工作流

## 项目结构

```
etl-pipeline-editor/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── editor/
│   │   │   │   ├── editor.component.ts
│   │   │   │   ├── editor.component.html
│   │   │   │   └── editor.component.css
│   │   │   ├── node-palette/
│   │   │   │   ├── node-palette.component.ts
│   │   │   │   ├── node-palette.component.html
│   │   │   │   └── node-palette.component.css
│   │   │   ├── canvas/
│   │   │   │   ├── canvas.component.ts
│   │   │   │   ├── canvas.component.html
│   │   │   │   └── canvas.component.css
│   │   │   └── node-config/
│   │   │       ├── node-config.component.ts
│   │   │       ├── node-config.component.html
│   │   │       └── node-config.component.css
│   │   ├── models/
│   │   │   └── node.model.ts
│   │   ├── services/
│   │   │   └── workflow.service.ts
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.css
│   │   ├── app.config.ts
│   │   └── app.routes.ts
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

## 安装和运行

### 前置要求

- Node.js 18.x 或更高版本
- npm 9.x 或更高版本

### 安装依赖

```bash
cd etl-pipeline-editor
npm install
```

### 开发模式运行

```bash
npm start
```

应用将在 `http://localhost:4200` 启动。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist/etl-pipeline-editor` 目录。

## 使用指南

### 创建节点
1. 在左侧的节点调色板中选择想要的节点类型
2. 拖拽节点到中间的画布区域
3. 节点将自动放置到画布上

### 连接节点
1. 点击一个节点的输出端口（右侧的小圆点）
2. 点击另一个节点的输入端口（左侧的小圆点）
3. 两个节点之间将创建连接

### 配置节点
1. 点击画布上的任意节点选中它
2. 右侧的配置面板将显示该节点的配置表单
3. 填写配置参数
4. 点击 "Save Changes" 保存配置

### 管理工作流
- **新建工作流**: 点击工具栏的 "+" 按钮
- **保存工作流**: 点击工具栏的 "Save" 按钮，输入名称后保存
- **加载工作流**: 点击工具栏的 "Load" 按钮，从列表中选择要加载的工作流

### 删除操作
- **删除节点**: 点击节点右上角的关闭按钮
- **删除连接**: 点击连接线条（悬停时线条会变红）
- **删除工作流**: 在加载对话框中点击工作流旁边的删除按钮

## 数据存储

所有工作流数据都保存在浏览器的 LocalStorage 中：
- `etl-pipeline-workflows`: 保存所有工作流列表
- `etl-current-workflow`: 当前正在编辑的工作流

## 开发者说明

### 节点类型扩展

要添加新的节点类型，请编辑 `src/app/models/node.model.ts` 中的 `NodeTemplates` 对象。

### 样式自定义

项目使用 Tailwind CSS 进行样式开发，自定义颜色配置在 `tailwind.config.js` 中。

### 组件架构

- **EditorComponent**: 主编辑器组件，负责整合所有子组件和状态管理
- **NodePaletteComponent**: 节点调色板，提供可拖拽的节点模板
- **CanvasComponent**: 画布组件，处理节点展示、拖拽和连接
- **NodeConfigComponent**: 节点配置表单组件

## License

MIT
