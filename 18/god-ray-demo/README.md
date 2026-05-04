# God-Ray 体积光演示

一个实时体积光（God-Ray）效果演示应用，使用 React + TypeScript + Canvas 2D 实现。

## 功能特性

- 🎨 **实时体积光渲染**：使用 Canvas 2D API 实现实时的体积光效果
- 🎯 **交互式控制**：
  - 调节光源位置（X/Y 坐标）
  - 调节光束密度
  - 调节衰减系数
  - 调节光线强度
  - 调节光线扩散角度
- 🖱️ **点击交互**：点击画布任意位置快速移动光源
- 📱 **响应式设计**：完美适配桌面和移动设备
- 🎲 **随机参数**：一键生成随机效果参数

## 技术栈

- **框架**: React 18
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **UI 组件库**: shadcn/ui (基于 Radix UI)
- **路由**: React Router v6
- **打包工具**: Vite 5
- **图标**: Lucide React

## 项目结构

```
god-ray-demo/
├── src/
│   ├── components/
│   │   ├── ui/                    # shadcn/ui 组件
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── label.tsx
│   │   │   └── slider.tsx
│   │   ├── GodRayCanvas.tsx       # 体积光画布组件
│   │   └── ControlPanel.tsx       # 控制面板组件
│   ├── pages/
│   │   └── Home.tsx               # 主页面
│   ├── lib/
│   │   └── utils.ts               # 工具函数
│   ├── App.tsx                    # 应用主组件
│   ├── main.tsx                   # 应用入口
│   └── index.css                  # 全局样式
├── index.html                     # HTML 入口
├── package.json                   # 依赖配置
├── tsconfig.json                  # TypeScript 配置
├── vite.config.ts                 # Vite 配置
├── tailwind.config.js             # Tailwind CSS 配置
└── postcss.config.js              # PostCSS 配置
```

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0 或 yarn >= 1.22.0

### 安装依赖

```bash
cd god-ray-demo
npm install
```

### 启动开发服务器

```bash
npm run dev
```

应用将在 `http://localhost:5173` 启动。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 预览生产构建

```bash
npm run preview
```

## 使用说明

### 控制面板参数

1. **光源位置**
   - X 坐标：控制光源在水平方向的位置
   - Y 坐标：控制光源在垂直方向的位置

2. **光束密度**
   - 控制光线的数量和密集程度
   - 范围：4 - 80
   - 推荐值：24

3. **衰减系数**
   - 控制光线随距离衰减的速度
   - 范围：0.5 - 3.0
   - 值越大，光线传播距离越短
   - 推荐值：1.5

4. **光线强度**
   - 控制光源的整体亮度
   - 范围：10% - 100%
   - 推荐值：80%

5. **光线扩散**
   - 控制每条光线的扩散角度
   - 范围：10% - 100%
   - 推荐值：50%

### 快捷操作

- **点击画布**：将光源移动到点击位置
- **重置参数**：恢复所有参数到默认值
- **随机参数**：生成随机效果参数

## 体积光效果原理

体积光（God Rays）是一种光学现象，当光线穿过含有微小颗粒的介质（如雾、尘埃、水汽）时，光线会被散射，形成可见的光束。

### 本项目实现方式

1. **径向渐变光束**：使用 Canvas `createRadialGradient` 创建从光源中心向外衰减的渐变效果
2. **扇形光束**：通过绘制多个扇形区域模拟光束从光源向外发射
3. **叠加模式**：使用 `globalCompositeOperation = 'lighter'` 实现光束叠加效果
4. **粒子系统**：动态粒子模拟雾气，根据距离光源的距离调整可见度
5. **实时渲染**：使用 `requestAnimationFrame` 实现 60fps 的流畅动画

## 开发说明

### 添加新的 UI 组件

项目使用 shadcn/ui 组件库，可以通过以下方式添加新组件：

1. 安装相应的 Radix UI 依赖
2. 在 `src/components/ui/` 目录下创建组件文件
3. 参考现有组件的实现方式

### 自定义体积光效果

可以在 `GodRayCanvas.tsx` 中修改以下参数来自定义效果：

- 光线颜色渐变
- 粒子数量和运动方式
- 背景颜色
- 光源光晕大小

## License

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！
