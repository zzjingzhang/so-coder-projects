# 动量守恒实验模拟器

一个基于 React 的虚拟物理实验工具，用于模拟小球碰撞过程中的动量守恒现象。

## 项目简介

本项目是一个交互式的动量守恒实验模拟器，通过可视化的方式展示两个小球在弹性碰撞前后的速度、动量和动能变化。用户可以实时调整小球的质量和初速度，观察不同条件下的碰撞效果，直观理解动量守恒定律的应用。

## 功能特性

- 🎯 **实时物理模拟**：基于真实物理公式的弹性碰撞模拟
- 🎨 **可视化展示**：Canvas 渲染的动态小球碰撞效果，带速度方向箭头
- ⚙️ **参数可调**：实时调整小球的质量（0.5-5kg）和初速度（-200 到 200 px/s）
- 📊 **数据监控**：实时显示时间、速度、总动量、总动能等物理参数
- 🎮 **交互控制**：开始/暂停/重置模拟，支持暂停时调整参数
- ✅ **守恒验证**：自动计算并显示动量和动能的变化百分比，验证守恒定律

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| React | 18.x | 前端框架 |
| JavaScript | ES6+ | 编程语言 |
| Vite | 5.x | 构建工具 |
| Tailwind CSS | 3.x | 样式框架 |
| Material-UI (MUI) | 5.x | UI 组件库 |
| React Router | 6.x | 路由管理 |

## 项目结构

```
momentum-conservation-simulator/
├── public/                     # 静态资源
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/                 # 资源文件
│   ├── components/             # React 组件
│   │   ├── ControlPanel.jsx    # 控制面板组件
│   │   ├── DataPanel.jsx       # 数据显示面板组件
│   │   ├── Simulation.jsx      # 主模拟组件
│   │   └── SimulationCanvas.jsx # Canvas 渲染组件
│   ├── utils/                  # 工具函数
│   │   └── physics.js          # 物理引擎核心
│   ├── App.jsx                 # 主应用组件
│   ├── App.css                 # 应用样式
│   ├── index.css               # 全局样式
│   └── main.jsx                # 应用入口
├── index.html                  # HTML 模板
├── package.json                # 依赖配置
├── postcss.config.js           # PostCSS 配置
├── tailwind.config.js          # Tailwind CSS 配置
├── vite.config.js              # Vite 配置
└── README.md                   # 项目说明
```

## 物理原理

### 动量守恒定律

在没有外力作用的封闭系统中，总动量保持不变：

```
m₁v₁ + m₂v₂ = m₁v₁' + m₂v₂'
```

其中：
- `m₁, m₂` = 两个小球的质量
- `v₁, v₂` = 碰撞前的速度
- `v₁', v₂'` = 碰撞后的速度

### 弹性碰撞

在完全弹性碰撞中，动能也守恒：

```
½m₁v₁² + ½m₂v₂² = ½m₁v₁'² + ½m₂v₂'²
```

碰撞后的速度计算公式：

```
v₁' = ((m₁ - m₂)v₁ + 2m₂v₂) / (m₁ + m₂)
v₂' = ((m₂ - m₁)v₂ + 2m₁v₁) / (m₁ + m₂)
```

## 安装与运行

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装依赖

```bash
cd momentum-conservation-simulator
npm install
```

### 开发模式

```bash
npm run dev
```

运行后访问 `http://localhost:5173` 查看应用。

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

1. **调整参数**：在开始模拟前或暂停时，使用滑块调整两个小球的质量和初速度
2. **开始模拟**：点击"开始模拟"按钮启动碰撞实验
3. **暂停/继续**：点击"暂停"按钮可暂停模拟，查看当前状态，点击"继续"恢复
4. **观察数据**：右侧面板实时显示各小球的速度、动量、动能，以及系统总动量和总动能
5. **验证守恒**：观察碰撞前后总动量和总动能的变化，验证守恒定律
6. **重置实验**：点击"重置"按钮恢复到初始状态，重新开始实验

## 核心代码说明

### 物理引擎 (`src/utils/physics.js`)

- `Ball` 类：封装小球的物理属性和方法
- `checkCollision()`：检测两个小球是否碰撞
- `handleCollision()`：处理弹性碰撞，计算碰撞后的速度
- `handleWallCollision()`：处理边界碰撞
- `calculateTotalMomentum()`：计算系统总动量
- `calculateTotalKineticEnergy()`：计算系统总动能
- `updateSimulation()`：更新整个模拟状态

### 主组件 (`src/components/Simulation.jsx`)

- 使用 `requestAnimationFrame` 实现流畅的动画循环
- 管理模拟状态（运行/暂停/停止）
- 协调各子组件的数据传递

## 扩展建议

- 添加更多小球支持（2个以上）
- 实现非弹性碰撞模式
- 添加摩擦力和重力选项
- 记录碰撞历史，支持回放功能
- 添加预设实验场景（等质量碰撞、不等质量碰撞等）
- 支持自定义小球颜色和大小

## License

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！
