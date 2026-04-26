# 实时流体模拟演示

一个基于 Vue 3 + TypeScript + Vite + Tailwind CSS 构建的实时流体模拟演示应用，展示水波纹和波浪效果。

## 功能特性

- 🎨 **实时流体模拟**：基于 Canvas 的 2D 水波纹物理模拟
- 🖱️ **交互式体验**：点击或拖拽画布创建自定义波纹
- ⚙️ **参数可调**：通过滑块和输入框实时调节流体参数
- 🎯 **视觉效果**：渐变色彩、发光效果、流畅动画
- 📱 **响应式设计**：适配不同屏幕尺寸

## 技术栈

- **前端框架**：Vue 3 (Composition API)
- **编程语言**：TypeScript
- **构建工具**：Vite
- **样式框架**：Tailwind CSS
- **图形渲染**：HTML5 Canvas

## 项目结构

```
fluid-simulation/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── vite.svg
│   │   └── vue.svg
│   ├── components/
│   │   ├── FluidSimulation.vue    # 流体模拟组件
│   │   ├── ControlPanel.vue       # 控制面板组件
│   │   └── HelloWorld.vue         # 默认组件（可忽略）
│   ├── composables/
│   │   └── useFluidSimulation.ts  # 流体模拟核心算法
│   ├── App.vue                     # 主应用组件
│   ├── main.ts                     # 应用入口
│   └── style.css                   # 全局样式（含 Tailwind）
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js               # PostCSS 配置
├── tailwind.config.js              # Tailwind CSS 配置
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts                  # Vite 配置
```

## 核心组件说明

### 1. FluidSimulation.vue

流体模拟的核心组件，负责：

- 初始化 Canvas 和流体网格
- 处理鼠标交互（点击和拖拽创建波纹）
- 调用流体物理算法进行实时更新
- 渲染流体效果到 Canvas

### 2. ControlPanel.vue

控制面板组件，提供：

- **粘度 (Viscosity)**：控制流体的粘稠程度，值越高波动衰减越快（0-100）
- **重力 (Gravity)**：控制重力对流体的影响，值越高流体越容易恢复平静（0-100）
- **波幅 (Amplitude)**：控制波纹的振幅大小，值越高波纹越明显（0-200）
- **重置参数**：恢复到默认设置
- **添加波纹**：随机生成新的波纹

### 3. useFluidSimulation.ts

流体模拟的核心算法，基于简化的波浪方程：

- 使用双缓冲区（current 和 previous）存储高度场
- 基于邻接点的高度差计算波动传播
- 应用粘度阻尼使波动逐渐衰减
- 应用重力影响使流体恢复平静
- 支持鼠标交互创建波纹

## 安装与运行

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装依赖

```bash
cd fluid-simulation
npm install
```

### 开发模式

```bash
npm run dev
```

启动后，浏览器访问 `http://localhost:5173`

### 生产构建

```bash
npm run build
```

构建产物将生成在 `dist` 目录

### 预览生产构建

```bash
npm run preview
```

## 使用说明

1. **创建波纹**：点击画布任意位置创建波纹
2. **连续波纹**：按住鼠标拖拽可以连续创建波纹
3. **调节参数**：使用右侧控制面板的滑块或输入框调整流体参数
4. **重置参数**：点击"重置参数"按钮恢复默认设置
5. **随机波纹**：点击"添加波纹"按钮随机生成新的波纹

## 默认参数

- **粘度 (Viscosity)**：10
- **重力 (Gravity)**：5
- **波幅 (Amplitude)**：100

## 开发说明

### 流体物理算法

本项目使用简化的 2D 波浪方程进行流体模拟：

1. **高度场**：使用两个数组存储当前和上一帧的高度信息
2. **波动传播**：每个点的新高度基于其四个邻接点的平均高度计算
3. **阻尼效果**：应用粘度系数使波动逐渐衰减
4. **重力恢复**：应用重力系数使流体趋向恢复平静

### Canvas 渲染

- 使用 `ImageData` 进行像素级操作
- 根据高度值计算每个像素的 RGB 颜色
- 正值（凸起）显示较亮的青色，负值（凹陷）显示较暗的蓝色
- 使用 `putImageData` 进行高效渲染

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！
