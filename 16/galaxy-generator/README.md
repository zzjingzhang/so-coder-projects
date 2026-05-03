# 程序化星系生成器

一个基于 Three.js 的实时程序化星系生成器，支持自定义星系规模、星体密度、颜色分布和旋转速度。

## 功能特性

- 🌌 **实时渲染**：使用 Three.js 进行高性能 3D 渲染
- 🎨 **多种配色方案**：提供宇宙紫、烈焰红、冰蓝、翠绿、日落橙等多种配色
- 🔧 **灵活参数**：可调节星系规模、星体密度、旋转速度
- 🎲 **随机生成**：一键生成随机参数的独特星系
- 🎯 **交互控制**：支持鼠标拖动旋转视角，滚轮缩放
- 💫 **真实效果**：包含旋臂结构、核心区域、星际尘埃和背景星空

## 技术栈

- **前端框架**：Vue 3
- **构建工具**：Vite 5
- **UI 组件库**：Vuetify 3
- **3D 渲染引擎**：Three.js
- **样式框架**：Tailwind CSS
- **路由管理**：Vue Router 4
- **图标库**：Material Design Icons

## 项目结构

```
galaxy-generator/
├── index.html              # 入口 HTML 文件
├── package.json            # 项目依赖配置
├── postcss.config.js       # PostCSS 配置
├── tailwind.config.js      # Tailwind CSS 配置
├── vite.config.js          # Vite 构建配置
├── src/
│   ├── main.js             # 应用入口文件
│   ├── App.vue             # 根组件
│   ├── style.css           # 全局样式
│   ├── router/
│   │   └── index.js        # 路由配置
│   ├── views/
│   │   └── GalaxyGenerator.vue   # 主视图组件
│   └── components/
│       ├── GalaxyRenderer.vue     # 星系渲染核心组件
│       └── ControlPanel.vue       # 参数控制面板组件
└── README.md               # 项目说明文档
```

## 快速开始

### 环境要求

- Node.js 16+
- npm 或 yarn

### 安装依赖

```bash
cd galaxy-generator
npm install
```

### 启动开发服务器

```bash
npm run dev
```

项目将在 `http://localhost:3000` 启动。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 预览生产版本

```bash
npm run preview
```

## 使用说明

### 参数控制

- **星系规模 (Scale)**：控制星系的整体大小，范围 20-100
- **星体密度 (Density)**：控制星体的数量，范围 2000-50000
- **旋转速度 (Rotation)**：控制星系的自转速度，范围 0-2x
- **颜色方案 (Color Scheme)**：
  - 宇宙紫：经典的蓝紫色调
  - 烈焰红：温暖的红橙色调
  - 冰蓝：冷色系的蓝色调
  - 翠绿：清新的绿色调
  - 日落橙：温暖的橙粉调

### 操作方式

- **旋转视角**：按住鼠标左键拖动
- **缩放视图**：使用鼠标滚轮
- **随机生成**：点击"随机生成"按钮创建随机参数的星系
- **重置默认**：点击"重置默认"按钮恢复初始参数

## 核心实现

### 星系生成算法

本项目使用程序化方法生成螺旋星系结构：

1. **旋臂分布**：创建 4 条主要旋臂，每条旋臂上分布星体
2. **螺旋角度**：根据距离中心的距离计算螺旋角度
3. **随机散布**：在旋臂基础上添加随机分布，模拟真实星系的不规则性
4. **分层颜色**：根据距离中心的距离分配不同的颜色方案

### Three.js 渲染

- 使用 `Points` 和自定义 Shader 渲染数万颗星体
- 采用 `AdditiveBlending` 实现星体发光效果
- 背景星空与前景星系分离渲染
- OrbitControls 提供流畅的相机控制

## 性能建议

- **星体密度**：建议在普通设备上使用 10000-20000 颗星体
- **高密度模式**：50000 颗星体需要较新的显卡才能流畅运行
- **浏览器**：推荐使用 Chrome 或 Firefox 以获得最佳性能

## License

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！
