# 交互式几何图形变换工具

一个基于 Vue 3 + TypeScript + Tailwind CSS + Ant Design Vue 的交互式几何图形变换演示工具，支持平移、旋转等多种变换操作。

## 功能特性

- **图形选择**：支持三角形、矩形、五边形、六边形和自定义图形
- **平移变换**：通过四向按钮和滑块精确控制图形平移
- **旋转变换**：支持-180°到+180°的旋转，可选择任意顶点作为旋转中心
- **自定义图形**：支持通过点击画布添加顶点，双击完成绘制
- **实时预览**：变换过程中实时预览效果
- **网格背景**：40px网格背景，便于观察坐标变化
- **对比显示**：同时显示原始图形（蓝色系）和变换后图形（绿色系）
- **顶点标记**：红色圆点标记顶点，并用A、B、C等字母标识
- **跑马灯**：顶部自定义文本滚动显示

## 技术栈

- **前端框架**：Vue 3 (Composition API)
- **开发语言**：TypeScript
- **构建工具**：Vite
- **样式框架**：Tailwind CSS
- **UI组件库**：Ant Design Vue
- **路由管理**：Vue Router

## 项目结构

```
geometry-transformer/
├── src/
│   ├── components/
│   │   └── GeometryTransformer.vue  # 核心组件，包含所有变换逻辑
│   ├── App.vue                       # 根组件
│   ├── main.ts                       # 应用入口
│   └── style.css                     # 全局样式（包含Tailwind指令）
├── index.html                        # HTML入口文件
├── package.json                      # 项目依赖配置
├── tailwind.config.js                # Tailwind CSS配置
├── postcss.config.js                 # PostCSS配置
├── tsconfig.json                     # TypeScript配置
├── vite.config.ts                    # Vite配置
└── README.md                         # 项目说明文档
```

## 安装与运行

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装依赖

```bash
cd geometry-transformer
npm install
```

### 开发模式

```bash
npm run dev
```

项目将在本地启动，默认地址为 `http://localhost:5173`（如果端口被占用，会自动使用其他端口）。

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

### 图形选择

1. 在左侧"图形选择"面板中，从下拉菜单选择预设图形（三角形、矩形、五边形、六边形）
2. 或点击"绘制自定义图形"按钮，在画布上点击添加顶点，双击完成绘制

### 平移操作

1. 使用"平移控制"面板中的四个方向按钮进行粗略平移
2. 使用滑块进行精确的水平（X轴）和垂直（Y轴）平移控制
3. 平移范围：±300px

### 旋转操作

1. 在"旋转控制"面板中，从下拉菜单选择旋转中心（任意顶点）
2. 使用滑块调整旋转角度（范围：-180° 到 +180°）
3. 旋转中心在画布上以橙色圆环标记

### 操作按钮

- **应用变换**：确认当前变换（变换已实时应用，此按钮主要用于确认）
- **添加图形**：开始绘制自定义图形
- **重置**：恢复到初始状态（清除所有变换，回到默认三角形）

### 自定义图形绘制

1. 点击"添加图形"或"绘制自定义图形"按钮
2. 在画布上点击添加顶点（至少需要3个顶点）
3. 双击画布完成绘制
4. 新绘制的图形将自动应用当前的变换参数

### 图例说明

- **蓝色半透明图形**：原始图形
- **绿色半透明图形**：变换后图形
- **红色圆点**：图形顶点
- **橙色圆环**：旋转中心

## 核心功能实现

### 变换算法

**平移变换**：
```
x' = x + tx
y' = y + ty
```

**旋转变换**（以点(cx, cy)为中心）：
```
x' = (x - cx) * cos(θ) - (y - cy) * sin(θ) + cx
y' = (x - cx) * sin(θ) + (y - cy) * cos(θ) + cy
```

### 关键组件

- **GeometryTransformer.vue**：核心组件，包含所有变换逻辑和UI
- **Canvas绘制**：使用HTML5 Canvas API实现图形渲染
- **响应式布局**：使用Tailwind CSS实现自适应布局
- **表单控制**：使用Ant Design Vue组件提供交互界面

## 开发说明

### 代码风格

- 使用Vue 3的Composition API (`<script setup>`)
- 使用TypeScript进行类型安全开发
- 使用Tailwind CSS进行样式开发
- 组件化开发，功能模块化

### 自定义配置

- **Tailwind配置**：修改 `tailwind.config.js`
- **Vite配置**：修改 `vite.config.ts`
- **TypeScript配置**：修改 `tsconfig.json`
- **跑马灯文本**：修改 `GeometryTransformer.vue` 中的 `marqueeText` 变量
- **画布大小**：修改 `GeometryTransformer.vue` 中的 `canvasWidth` 和 `canvasHeight` 变量
- **网格大小**：修改 `GeometryTransformer.vue` 中的 `gridSize` 变量

## 浏览器兼容性

- Chrome >= 87
- Firefox >= 78
- Safari >= 14
- Edge >= 88

## 许可证

MIT License

## 贡献

欢迎提交Issue和Pull Request！

---

**提示**：本项目仅用于学习和演示几何图形变换原理，不建议用于生产环境。
