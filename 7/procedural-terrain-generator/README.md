# Procedural Terrain Generator

一个基于 Perlin 噪声的程序化地形生成器，使用 Angular 框架构建，支持实时调整地形参数。

## 项目结构

```
procedural-terrain-generator/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── terrain-generator/
│   │   │       ├── terrain-generator.component.ts
│   │   │       ├── terrain-generator.component.html
│   │   │       └── terrain-generator.component.css
│   │   ├── services/
│   │   │   ├── terrain-generator.service.ts    # Perlin 噪声地形生成逻辑
│   │   │   └── terrain-renderer.service.ts     # Canvas 渲染服务
│   │   ├── app-module.ts
│   │   ├── app-routing-module.ts
│   │   ├── app.ts
│   │   └── app.html
│   ├── styles.css
│   ├── index.html
│   └── main.ts
├── tailwind.config.js
├── postcss.config.js
├── angular.json
├── package.json
└── README.md
```

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Angular | 21.x | 前端框架 |
| TypeScript | 5.9.x | 编程语言 |
| Tailwind CSS | 4.x | CSS 框架 |
| Angular Material | 21.x | UI 组件库 |
| Angular Router | 21.x | 路由管理 |
| Angular CLI | 21.x | 构建工具 |
| simplex-noise | latest | Perlin 噪声生成库 |

## 功能特性

- **无限地形**: 基于 Perlin 噪声的程序化地形生成，支持无限滚动
- **实时参数调整**:
  - **高度比例**: 控制地形的最大高度
  - **粗糙度**: 调整地形的细节程度，值越大越粗糙
  - **纹理混合**: 控制颜色纹理的混合程度
  - **种子值**: 改变种子可以生成完全不同的地形
- **交互式导航**:
  - 鼠标拖拽: 平移视图
  - 滚轮: 缩放视图
- **多层地形颜色**:
  - 水域 (0-30%)
  - 沙滩 (30-35%)
  - 草地 (35-60%)
  - 森林 (60-75%)
  - 岩石 (75-90%)
  - 雪山 (90-100%)

## 环境要求

- Node.js >= 18.13.0
- npm 或 yarn 包管理器
- Angular CLI (可选，推荐安装)

## 安装与启动

### 1. 安装依赖

```bash
cd procedural-terrain-generator
npm install
```

### 2. 启动开发服务器

```bash
npm start
```

或者使用 Angular CLI:

```bash
ng serve
```

启动后，在浏览器中访问 `http://localhost:4200`

### 3. 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist/` 目录。

## 使用说明

1. **调整地形参数**: 使用左侧控制面板的滑块实时调整地形参数
2. **随机地形**: 点击"随机"按钮生成新的种子值，创建全新的地形
3. **重置视图**: 点击"重置视图"按钮将视图恢复到初始状态
4. **导航**:
   - 按住鼠标左键拖拽来平移地形
   - 使用鼠标滚轮缩放视图

## 开发说明

### 核心服务

- **TerrainGeneratorService**: 负责使用 Perlin 噪声生成地形数据
  - `generateTerrainChunk()`: 生成地形块数据
  - 支持多八度噪声叠加
  - 基于高度的颜色映射

- **TerrainRendererService**: 负责使用 Canvas 渲染地形
  - 分块加载和渲染
  - 支持缩放和平移
  - 视口裁剪优化

### 核心组件

- **TerrainGeneratorComponent**: 主组件
  - 集成参数控制面板
  - 处理用户交互
  - 协调生成和渲染服务

## 许可证

MIT License
