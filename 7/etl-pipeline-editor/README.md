# ETL Pipeline Editor

一个基于 Angular 的可视化 ETL 管道编辑器，支持拖放节点、连接节点、配置属性，并可将管道导出为 JSON 格式。

## 技术栈

- **框架**: Angular 21.2.0
- **语言**: TypeScript
- **样式**: Tailwind CSS 4.2.4
- **UI 组件库**: PrimeNG 18.x
- **路由**: Angular Router
- **打包**: Angular CLI Application Builder

## 功能特性

- **节点拖放**: 从左侧面板拖拽节点到画布上
- **节点连接**: 通过节点的输入/输出端口连接节点
- **属性配置**: 在右侧面板中配置选中节点的属性
- **JSON 导出**: 将管道导出为 JSON 格式
- **JSON 导入**: 从 JSON 文件导入管道
- **多种节点类型**:
  - **源节点**: Database Source, CSV Source, API Source
  - **转换节点**: Filter, Map, Aggregate, Join
  - **目标节点**: Database Target, CSV Target, API Target

## 项目结构

```
etl-pipeline-editor/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── pipeline-editor/
│   │   │   │   ├── pipeline-editor.component.ts
│   │   │   │   ├── pipeline-editor.component.html
│   │   │   │   └── pipeline-editor.component.css
│   │   │   ├── node/
│   │   │   │   ├── node.component.ts
│   │   │   │   ├── node.component.html
│   │   │   │   └── node.component.css
│   │   │   ├── node-sidebar/
│   │   │   │   ├── node-sidebar.component.ts
│   │   │   │   ├── node-sidebar.component.html
│   │   │   │   └── node-sidebar.component.css
│   │   │   └── properties-panel/
│   │   │       ├── properties-panel.component.ts
│   │   │       ├── properties-panel.component.html
│   │   │       └── properties-panel.component.css
│   │   ├── models/
│   │   │   └── pipeline.models.ts
│   │   ├── services/
│   │   │   └── pipeline.service.ts
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
├── tsconfig.json
└── README.md
```

## 安装和启动

### 前置要求

- Node.js 18.19.1 或更高版本
- npm 9.x 或更高版本
- Angular CLI 21.2.x

### 安装依赖

```bash
cd etl-pipeline-editor
npm install
```

### 启动开发服务器

```bash
npm start
# 或者
ng serve
```

启动后，打开浏览器访问 `http://localhost:4200/`。

### 构建生产版本

```bash
npm run build
# 或者
ng build
```

构建产物将输出到 `dist/` 目录。

## 使用说明

1. **添加节点**: 从左侧面板拖拽节点到画布中央
2. **连接节点**: 点击并拖拽一个节点的输出端口（右侧圆点）到另一个节点的输入端口（左侧圆点）
3. **配置属性**: 点击节点选中它，然后在右侧属性面板中配置节点属性
4. **删除节点**: 点击节点右上角的删除按钮，或在属性面板中点击 "Delete Node" 按钮
5. **删除连接**: 点击连接线即可删除
6. **导出管道**: 点击顶部导航栏的 "Export" 按钮，将管道保存为 JSON 文件
7. **导入管道**: 点击顶部导航栏的 "Import" 按钮，选择一个 JSON 文件导入管道
8. **清空管道**: 点击顶部导航栏的 "Clear" 按钮，清空所有节点和连接

## 节点类型

### 源节点 (Source Nodes)

- **Database Source**: 从数据库读取数据
  - 配置项: Connection String, Table Name, SQL Query

- **CSV Source**: 从 CSV 文件读取数据
  - 配置项: File Path, Delimiter, Has Header Row

- **API Source**: 从 API 读取数据
  - 配置项: API URL, HTTP Method, Headers (JSON)

### 转换节点 (Transform Nodes)

- **Filter**: 过滤数据
  - 配置项: Filter Condition

- **Map**: 映射字段
  - 配置项: Field Mappings (JSON)

- **Aggregate**: 聚合数据
  - 配置项: Group By Fields, Aggregations (JSON)

- **Join**: 连接多个数据源
  - 配置项: Join Type, Join Key

### 目标节点 (Target Nodes)

- **Database Target**: 写入数据到数据库
  - 配置项: Connection String, Table Name, Write Mode

- **CSV Target**: 写入数据到 CSV 文件
  - 配置项: Output File Path, Delimiter, Include Header

- **API Target**: 写入数据到 API
  - 配置项: API URL, HTTP Method, Headers (JSON)

## JSON 格式

导出的管道 JSON 文件格式如下：

```json
{
  "id": "id_xxxxx",
  "name": "Untitled Pipeline",
  "nodes": [
    {
      "id": "node_1",
      "type": "source",
      "subtype": "database",
      "label": "Database Source",
      "position": { "x": 100, "y": 100 },
      "properties": [
        { "name": "connectionString", "type": "string", "label": "Connection String", "value": "" },
        { "name": "tableName", "type": "string", "label": "Table Name", "value": "" },
        { "name": "query", "type": "textarea", "label": "SQL Query", "value": "" }
      ]
    }
  ],
  "connections": [
    {
      "id": "conn_1",
      "source": "node_1",
      "target": "node_2"
    }
  ]
}
```

## 许可证

MIT License
