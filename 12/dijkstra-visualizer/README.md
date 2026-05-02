# Dijkstra 最短路径算法可视化工具

一个用于可视化 Dijkstra 最短路径算法执行过程的交互式 Web 应用。

## 项目简介

本项目提供了一个直观的算法可视化浏览器，帮助用户理解 Dijkstra 最短路径算法的工作原理。通过逐步动画展示算法的执行过程，包括节点访问、边松弛和最短路径构建。

## 技术栈

- **框架**: Angular 21.2
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **UI 组件库**: NG-ZORRO (Ant Design for Angular)
- **路由**: Angular Router
- **打包**: Angular CLI Application Builder

## 项目结构

```
dijkstra-visualizer/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── control-panel/          # 控制面板组件
│   │   │   │   ├── control-panel.component.css
│   │   │   │   ├── control-panel.component.html
│   │   │   │   └── control-panel.component.ts
│   │   │   ├── graph-visualization/    # 图可视化组件
│   │   │   │   ├── graph-visualization.component.css
│   │   │   │   ├── graph-visualization.component.html
│   │   │   │   └── graph-visualization.component.ts
│   │   │   └── visualizer/              # 主页面组件
│   │   │       ├── visualizer.component.css
│   │   │       ├── visualizer.component.html
│   │   │       └── visualizer.component.ts
│   │   ├── models/                       # 数据模型
│   │   │   └── graph.model.ts
│   │   ├── services/                     # 服务层
│   │   │   └── dijkstra.service.ts
│   │   ├── app-module.ts                 # 根模块
│   │   ├── app-routing-module.ts         # 路由配置
│   │   ├── app.ts                        # 根组件
│   │   ├── app.html
│   │   └── app.css
│   ├── main.ts                            # 应用入口
│   ├── index.html                         # HTML 模板
│   └── styles.css                         # 全局样式
├── tailwind.config.js                     # Tailwind CSS 配置
├── postcss.config.js                      # PostCSS 配置
├── angular.json                           # Angular 配置
├── package.json                           # 依赖配置
├── tsconfig.json                          # TypeScript 配置
└── README.md                              # 项目说明
```

## 功能特性

### 核心功能
- **算法可视化**: 使用 SVG 绘制加权图，实时展示算法执行过程
- **逐步执行**: 支持自动播放和单步执行两种模式
- **动画控制**: 可调节动画播放速度（快/中/慢）
- **控制面板**: 提供开始、单步、暂停、重置按钮
- **进度追踪**: 实时显示算法执行进度和当前步骤描述

### 可视化效果
- **节点状态**: 不同颜色表示节点状态（起始/目标/当前处理/已访问/未访问）
- **边状态**: 高亮显示正在松弛的边和最终最短路径
- **距离显示**: 实时显示每个节点到起始节点的距离
- **前驱追踪**: 显示每个节点的前驱节点，帮助理解路径构建过程

### 用户界面
- **响应式设计**: 适配不同屏幕尺寸
- **清晰布局**: 左侧图可视化，右侧控制面板和算法说明
- **直观图例**: 帮助理解图中各元素的含义
- **中文界面**: 全中文界面，易于理解

## 安装与运行

### 前置要求
- Node.js (建议版本 18.x 或更高)
- npm (通常随 Node.js 一起安装)
- Angular CLI 21.2.9

### 安装步骤

1. **进入项目目录**
```bash
cd dijkstra-visualizer
```

2. **安装依赖**
```bash
npm install
```

### 运行项目

**开发模式**
```bash
ng serve
```

项目启动后，在浏览器中访问 `http://localhost:4200/` 即可查看应用。

**生产构建**
```bash
ng build
```

构建产物将生成在 `dist/` 目录中。

## 使用说明

### 基本操作

1. **查看初始图**: 页面加载后显示一个包含 6 个节点和 8 条边的示例图
   - 蓝色节点 (A): 起始节点
   - 绿色节点 (F): 目标节点
   - 黄色节点: 未访问节点

2. **开始执行**: 点击"开始"按钮，算法将自动执行
   - 红色节点: 当前正在处理的节点
   - 青色节点: 已访问的节点
   - 蓝色边: 正在进行松弛操作的边
   - 红色边: 最终的最短路径

3. **单步执行**: 点击"单步"按钮，可逐步骤查看算法执行过程

4. **调整速度**: 使用滑块调节动画播放速度
   - 快: 500ms/步
   - 中: 1000ms/步 (默认)
   - 慢: 2000ms/步

5. **暂停执行**: 在自动执行过程中点击"暂停"按钮暂停

6. **重置状态**: 点击"重置"按钮将图恢复到初始状态

### 算法步骤说明

Dijkstra 算法的执行过程分为以下几个阶段：

1. **初始化**: 将起始节点距离设为 0，其他节点设为无穷大
2. **选择节点**: 从所有未访问节点中选择距离最小的节点
3. **松弛操作**: 更新该节点所有邻居的距离
4. **标记访问**: 将当前节点标记为已访问
5. **终止条件**: 当目标节点被访问或所有可达节点都已访问时结束

## 示例图说明

项目包含一个预定义的示例图：

- **节点**: A, B, C, D, E, F (共 6 个)
- **起始节点**: A (距离: 0)
- **目标节点**: F

**边及其权重**:
- A - B: 4
- A - C: 2
- B - C: 1
- B - D: 5
- C - E: 8
- D - E: 2
- D - F: 6
- E - F: 3

**最短路径**: A → C → B → D → E → F (总长度: 2+1+5+2+3 = 13)

## 开发说明

### 添加自定义图

如需使用自定义图，可修改 `src/app/services/dijkstra.service.ts` 中的 `generateSampleGraph()` 方法：

```typescript
generateSampleGraph(): Graph {
  const nodes: Node[] = [
    // 定义节点
    { id: 'A', label: 'A', x: 100, y: 200, ... },
    // ... 更多节点
  ];

  const edges: Edge[] = [
    // 定义边
    { id: 'AB', from: 'A', to: 'B', weight: 4, ... },
    // ... 更多边
  ];

  return { nodes, edges };
}
```

### 扩展功能

项目架构清晰，易于扩展：

- **添加更多算法**: 在 `services/` 目录下创建新的算法服务
- **自定义样式**: 修改 `tailwind.config.js` 或组件 CSS 文件
- **添加交互**: 支持点击选择起始/目标节点
- **保存/加载**: 添加图数据的导入导出功能

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目！
