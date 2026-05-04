# 🧬 孟德尔遗传定律模拟实验

一个交互式的孟德尔遗传定律模拟实验网页应用，帮助高中生物学生直观理解遗传学基本原理。

## 📋 项目简介

本项目是一个基于Angular框架开发的孟德尔遗传定律模拟实验工具。学生可以通过这个工具：

- 学习孟德尔遗传定律的基本概念和理论知识
- 上传或选择显性和隐性性状（如紫色花和白色花）
- 模拟杂交过程，直观地观察P代、F1代和F2代的遗传结果
- 理解基因型和表型的区别
- 深入理解3:1表型分离比例和1:2:1基因型比例的由来

## 🛠️ 技术栈

- **框架**: Angular 21.2
- **语言**: TypeScript
- **样式**: Tailwind CSS 3.4
- **UI组件库**: NG-ZORRO (Ant Design for Angular)
- **路由**: Angular Router
- **打包工具**: Angular CLI Application Builder

## 📁 项目结构

```
mendel-genetics-simulator/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── knowledge/                    # 知识点讲解组件
│   │   │   │   ├── knowledge.component.ts
│   │   │   │   ├── knowledge.component.html
│   │   │   │   └── knowledge.component.css
│   │   │   ├── trait-upload/                 # 性状上传组件
│   │   │   │   ├── trait-upload.component.ts
│   │   │   │   ├── trait-upload.component.html
│   │   │   │   └── trait-upload.component.css
│   │   │   ├── hybrid-simulation/            # 杂交模拟组件
│   │   │   │   ├── hybrid-simulation.component.ts
│   │   │   │   ├── hybrid-simulation.component.html
│   │   │   │   └── hybrid-simulation.component.css
│   │   │   └── results-display/              # 结果展示组件
│   │   │       ├── results-display.component.ts
│   │   │       ├── results-display.component.html
│   │   │       └── results-display.component.css
│   │   ├── services/
│   │   │   └── genetics.service.ts           # 遗传模拟服务
│   │   ├── app.ts                            # 主应用组件
│   │   ├── app.html                          # 主应用模板
│   │   ├── app.css                           # 主应用样式
│   │   ├── app-module.ts                     # 应用模块
│   │   ├── app-routing-module.ts             # 路由模块
│   │   └── ng-zorro-antd.module.ts          # NG-ZORRO组件模块
│   ├── index.html                            # 入口HTML
│   ├── main.ts                               # 入口文件
│   └── styles.css                            # 全局样式
├── angular.json                              # Angular配置
├── package.json                              # 依赖配置
├── tailwind.config.js                        # Tailwind CSS配置
├── tsconfig.json                             # TypeScript配置
├── tsconfig.app.json                         # 应用TypeScript配置
├── tsconfig.spec.json                        # 测试TypeScript配置
└── README.md                                 # 项目文档
```

## 🎯 核心功能

### 1. 知识点学习模块
- 基本概念讲解（基因、等位基因、基因型、表型）
- 孟德尔分离定律详解
- 实验步骤说明
- 交互式标签页设计

### 2. 性状选择模块
- 预设经典性状（豌豆花色、种子形状、种子颜色、豆荚形状）
- 支持自定义图片上传（拖拽或点击上传）
- 显性和隐性性状对比展示
- 等位基因符号自定义

### 3. 杂交模拟模块
- P代（亲本）杂交动画
- F1代自交动画
- 棋盘法（Punnett Square）可视化
- 实时基因型和表型展示
- 步骤引导式交互

### 4. 结果分析模块
- 遗传概览（P代→F1代→F2代）
- 基因型比例分析（1:2:1）
- 表型比例分析（3:1）
- 可视化柱状图展示
- 知识总结和核心概念回顾

## 🚀 快速开始

### 环境要求

- Node.js 18.x 或更高版本
- npm 9.x 或更高版本

### 安装步骤

1. **进入项目目录**
```bash
cd mendel-genetics-simulator
```

2. **安装依赖**
```bash
npm install
```

3. **启动开发服务器**
```bash
npm start
```

4. **访问应用**

打开浏览器，访问 `http://localhost:4200/`

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist/` 目录。

## 📖 使用指南

### 实验流程

1. **学习知识**
   - 浏览基本概念、分离定律和实验步骤
   - 理解基因型和表型的区别

2. **选择性状**
   - 选择预设性状（推荐）或上传自定义图片
   - 确认显性和隐性性状组合

3. **模拟杂交**
   - 点击"开始杂交动画"观察P代杂交
   - 继续观察F1代自交过程
   - 通过棋盘法理解基因组合

4. **分析结果**
   - 查看遗传概览
   - 分析基因型比例（1:2:1）
   - 分析表型比例（3:1）
   - 回顾知识总结

### 关键概念理解

**基因型 vs 表型**
- 基因型：生物体的遗传组成（如 PP、Pp、pp）
- 表型：生物体表现出来的可观察性状（如紫色花、白色花）
- 表型相同 ≠ 基因型相同（PP 和 Pp 都表现为显性）

**分离定律**
- 在形成配子时，成对的等位基因彼此分离
- 每个配子只含有每对等位基因中的一个
- F2代表型比例为 3:1，基因型比例为 1:2:1

## 🎨 界面特点

- **响应式设计**: 支持桌面端和移动端
- **直观配色**: 使用蓝色、青色、橙色区分不同基因型
- **动画效果**: 平滑的杂交过程动画
- **清晰排版**: 层级分明的信息展示
- **交互友好**: 按钮和可点击元素状态明确

## 🧪 核心服务

### GeneticsService

遗传模拟核心服务，提供以下功能：

- `setTraits()`: 设置显性和隐性性状
- `createPureGenotype()`: 创建纯合基因型
- `createHeterozygousGenotype()`: 创建杂合基因型
- `cross()`: 执行杂交操作
- `generatePunnettSquare()`: 生成棋盘法分析
- `calculateGenotypeRatio()`: 计算基因型比例
- `calculatePhenotypeRatio()`: 计算表型比例

## 📝 开发说明

### 添加新性状预设

在 `TraitUploadComponent` 的 `presets` 数组中添加新的性状组合：

```typescript
presets: PresetTrait[] = [
  // ... 现有预设
  {
    name: '新性状名称',
    dominant: { name: '显性性状名', color: '#颜色代码' },
    recessive: { name: '隐性性状名', color: '#颜色代码' },
    allele: '等位基因符号'
  }
];
```

### 自定义样式

- 全局样式: `src/styles.css`
- 组件样式: 各组件目录下的 `.css` 文件
- Tailwind配置: `tailwind.config.js`

## 🤝 贡献指南

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证。

## 👥 作者

- 项目创建: 用于高中生物教学的孟德尔遗传定律模拟实验

## 🙏 致谢

- 格雷戈尔·孟德尔 - 遗传学之父
- Angular 团队 - 优秀的前端框架
- NG-ZORRO 团队 - 精美的UI组件库
- Tailwind CSS 团队 - 高效的样式工具

---

**帮助学生理解遗传学，让学习变得更有趣！** 🎓✨
