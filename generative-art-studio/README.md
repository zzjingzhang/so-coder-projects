# 生成式艺术工作室 (Generative Art Studio)

一个基于 React 的交互式生成式艺术创作工具，允许用户实时调整参数来创建独特的抽象艺术作品。

## 项目结构

```
generative-art-studio/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components/
│   │   ├── ArtCanvas.jsx          # 核心画布组件 - 绘制抽象图形
│   │   └── ControlPanel.jsx       # 控制面板组件 - 参数调整UI
│   ├── pages/
│   │   └── ArtStudio.jsx          # 主页面组件
│   ├── utils/
│   │   └── colorSchemes.js        # 配色方案和颜色工具函数
│   ├── App.jsx                     # 应用入口组件（路由配置）
│   ├── main.jsx                    # 应用入口文件
│   └── index.css                   # 全局样式（Tailwind CSS）
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
└── vite.config.js
```

## 技术栈

- **框架**: React 19
- **语言**: JavaScript (JSX)
- **样式**: Tailwind CSS 4
- **UI 组件库**: PrimeReact
- **路由**: React Router DOM
- **构建工具**: Vite

## 功能特性

- **多种形状类型**: 圆形、方形、三角形、星形、线条、多边形、混合形状
- **多种布局方式**: 随机布局、网格布局、径向布局、螺旋布局
- **精美配色方案**: 日落、海洋、森林、霓虹、柔和、单色、火焰、宇宙等 8 种配色
- **实时交互控制**: 
  - 形状数量 (10-200)
  - 最小/最大尺寸
  - 动画速度
  - 透明度
  - 动画开关
- **动态动画效果**: 
  - 形状移动与边界反弹
  - 旋转动画
  - 大小脉动效果
- **响应式设计**: 适配不同屏幕尺寸

## 安装与运行

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

启动后在浏览器中访问 `http://localhost:5173`

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录

### 预览生产版本

```bash
npm run preview
```

### 代码检查

```bash
npm run lint
```

## 使用说明

1. **调整参数**: 使用右侧控制面板的滑块和下拉菜单调整各项参数
2. **实时预览**: 参数调整后画布会实时更新效果
3. **重新生成**: 点击"重新生成"按钮创建全新的随机布局
4. **重置参数**: 点击"重置参数"按钮恢复到默认设置
5. **暂停动画**: 关闭"启用动画"开关可以暂停当前画面

## 组件说明

### ArtCanvas.jsx
核心画布组件，使用 HTML5 Canvas API 绘制动态抽象图形。支持多种形状类型、布局算法和动画效果。

### ControlPanel.jsx
控制面板组件，使用 PrimeReact 提供的 UI 组件（Dropdown、Slider、InputSwitch、Button 等）实现友好的参数调整界面。

### colorSchemes.js
包含 8 种精心设计的配色方案，每种方案包含 5 种主题色和对应的背景色。同时提供颜色工具函数如 `hexToRgba` 和 `getRandomColor`。

## 开发说明

- 项目使用 React Hooks (useState, useRef, useEffect, useCallback)
- Canvas 动画使用 `requestAnimationFrame` 实现流畅的 60fps 动画
- 使用 `useRef` 管理 Canvas 元素、动画帧和形状数据，避免不必要的重渲染
- Tailwind CSS 4 采用 CSS 导入方式，无需额外配置文件

## 许可证

MIT License
