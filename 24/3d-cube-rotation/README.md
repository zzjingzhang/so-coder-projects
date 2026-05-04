# 3D 立方体旋转场景

一个基于 Angular 框架开发的交互式 3D 立方体旋转应用，实现了立方体的平滑旋转、翻转以及丰富的交互控制功能。

## 项目概述

本项目展示了一个视觉效果精美的 3D 立方体，可以通过多种方式进行交互控制，包括自动旋转、方向按钮控制、滑块精确控制等。界面设计采用现代化的渐变背景和毛玻璃效果，提供了优秀的用户体验。

## 技术栈

- **框架**: Angular 21.2.0
- **语言**: TypeScript
- **样式**: Tailwind CSS 3.4.0
- **UI 组件库**: Angular Material (@angular/material, @angular/cdk)
- **路由**: Angular Router
- **打包方式**: Angular CLI Application Builder
- **测试框架**: Vitest

## 项目结构

```
3d-cube-rotation/
├── public/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── cube-rotation/
│   │   │   ├── cube-rotation.ts      # 立方体组件逻辑
│   │   │   ├── cube-rotation.html    # 立方体组件模板
│   │   │   └── cube-rotation.css     # 立方体组件样式
│   │   ├── app.ts                     # 根组件
│   │   ├── app.html                   # 根组件模板
│   │   ├── app.css                    # 根组件样式
│   │   ├── app.config.ts              # 应用配置
│   │   ├── app.routes.ts              # 路由配置
│   │   └── app.spec.ts                # 根组件测试
│   ├── main.ts                        # 应用入口
│   ├── index.html                     # HTML 入口
│   └── styles.css                     # 全局样式
├── tailwind.config.js                 # Tailwind CSS 配置
├── postcss.config.js                  # PostCSS 配置
├── angular.json                       # Angular 配置
├── package.json                       # 项目依赖
├── tsconfig.json                      # TypeScript 配置
└── README.md                          # 项目说明文档
```

## 功能特性

### 🎯 核心功能

1. **自动旋转**
   - 支持一键启动/停止自动旋转
   - 可调节旋转速度（0.5x - 5x）
   - 流畅的 3D 旋转动画效果

2. **手动控制**
   - 方向按钮控制（上、下、左、右）
   - 翻转功能（180度翻转）
   - 精确的滑块控制（X、Y、Z 三轴独立控制）

3. **状态管理**
   - 实时显示当前旋转角度
   - 显示当前工作模式（自动/手动）
   - 一键重置功能

4. **视觉效果**
   - 六面不同颜色的渐变色立方体
   - 现代化渐变背景
   - 毛玻璃效果的控制面板
   - 响应式设计，支持多种屏幕尺寸

### 🎨 UI 设计

- **配色方案**: 渐变紫色背景配合多彩立方体表面
- **按钮样式**: Angular Material 风格的凸起按钮，文字水平垂直居中
- **交互反馈**: 平滑的过渡动画和悬停效果
- **响应式布局**: 适配桌面和移动设备

## 安装和启动

### 前置要求

确保你的开发环境已安装：
- Node.js (推荐版本 18.x 或更高)
- npm (Node.js 包管理器)
- Angular CLI (可选，通过 npm 安装)

### 安装步骤

1. **进入项目目录**
   ```bash
   cd 3d-cube-rotation
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

### 启动开发服务器

```bash
ng serve
```

或者使用 npm 脚本：

```bash
npm run start
```

启动后，在浏览器中访问 `http://localhost:4200` 即可查看应用。

### 构建生产版本

```bash
ng build
```

构建产物将输出到 `dist/` 目录。

### 运行测试

```bash
ng test
```

## 使用说明

### 自动旋转模式

1. 点击 **"开始旋转"** 按钮启动自动旋转
2. 使用速度滑块调节旋转速度（0.5 到 5 倍速）
3. 点击 **"停止旋转"** 按钮暂停自动旋转

### 手动控制模式

1. **方向按钮**: 点击上、下、左、右箭头按钮控制立方体旋转（每次 90 度）
2. **翻转按钮**: 点击中间的 **"翻转"** 按钮使立方体翻转 180 度
3. **滑块控制**: 使用 X、Y、Z 轴滑块精确控制旋转角度（0-360 度）

### 重置功能

点击 **"重置"** 按钮将立方体恢复到初始状态，同时停止自动旋转。

### 实时状态显示

页面底部实时显示：
- 当前各轴旋转角度（X、Y、Z）
- 当前工作模式（自动旋转中 / 手动模式）
- 当前旋转速度

## 组件说明

### CubeRotationComponent

主要组件，包含所有 3D 立方体逻辑和 UI。

**主要属性**:
- `rotateX`: X 轴旋转角度（signal）
- `rotateY`: Y 轴旋转角度（signal）
- `rotateZ`: Z 轴旋转角度（signal）
- `isAutoRotating`: 自动旋转状态（signal）
- `rotationSpeed`: 旋转速度（signal）

**主要方法**:
- `toggleAutoRotation()`: 切换自动旋转状态
- `rotate(direction, angle)`: 手动旋转立方体
- `reset()`: 重置所有状态
- `getCubeStyle()`: 获取立方体的 3D 变换样式

## 技术实现细节

### 3D 变换实现

使用 CSS 3D 变换实现立方体效果：
- `perspective: 1000px` 创建 3D 透视空间
- `transform-style: preserve-3d` 保持 3D 空间关系
- `backface-visibility: visible` 显示背面
- 六个面通过 `translateZ`、`rotateX`、`rotateY` 定位在 3D 空间中

### 动画性能

- 使用 `requestAnimationFrame` 实现流畅的自动旋转动画
- Angular Signals 进行响应式状态管理
- CSS `transition` 实现平滑的状态切换

### 响应式设计

- 使用 Tailwind CSS 的响应式工具类（`md:`、`lg:`）
- 移动端适配的按钮和控件大小
- 弹性布局确保在各种屏幕尺寸下的良好显示

## 开发说明

### 添加新功能

1. 在 `src/app/cube-rotation/` 目录下修改组件
2. 如需创建新组件，使用 Angular CLI：
   ```bash
   ng generate component component-name
   ```

### 样式修改

- 全局样式在 `src/styles.css`
- 组件样式在对应组件的 `.css` 文件
- Tailwind CSS 配置在 `tailwind.config.js`

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

---

**注意**: 本项目使用 Angular 21.x 版本，确保你的开发环境兼容。
