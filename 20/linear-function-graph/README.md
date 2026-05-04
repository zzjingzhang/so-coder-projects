# 📊 一次函数图像探索器

一个交互式的一次函数（y = kx + b）图像可视化工具，帮助学生直观理解斜率 k 和截距 b 对函数图像的影响。

## ✨ 功能特点

- 🎛️ **交互式滑块控制**：通过滑块实时调整斜率 k 和截距 b 的值
- 📈 **实时图像绘制**：参数变化时，函数图像即时更新
- 🎯 **交点标注**：自动标注直线与坐标轴的交点坐标
- 📚 **知识要点**：内置数学知识点解释，辅助学习
- 🎨 **精美UI设计**：现代化界面设计，色彩搭配合理，吸引学生注意力

## 🛠️ 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| React | 18.x | 前端框架 |
| TypeScript | 5.x | 类型安全的 JavaScript |
| Vite | 6.x | 快速的构建工具 |
| Tailwind CSS | 3.4.x | 实用优先的 CSS 框架 |
| PrimeReact | 10.x | 丰富的 React UI 组件库 |
| React Router | 6.x | React 路由管理 |

## 📁 项目结构

```
linear-function-graph/
├── public/
│   └── vite.svg              # Vite 默认图标
├── src/
│   ├── assets/
│   │   └── react.svg         # React 图标
│   ├── App.css               # 应用自定义样式
│   ├── App.tsx               # 主应用组件（一次函数图像探索器）
│   ├── index.css             # 全局样式（包含 Tailwind 指令）
│   ├── main.tsx              # 应用入口文件
│   └── vite-env.d.ts         # Vite 环境类型声明
├── .gitignore                # Git 忽略文件配置
├── eslint.config.js          # ESLint 配置
├── index.html                # HTML 入口文件
├── package.json              # 项目依赖配置
├── postcss.config.js         # PostCSS 配置
├── tailwind.config.js        # Tailwind CSS 配置
├── tsconfig.app.json         # TypeScript 应用配置
├── tsconfig.json             # TypeScript 根配置
├── tsconfig.node.json        # TypeScript Node 配置
├── vite.config.ts            # Vite 构建配置
└── README.md                 # 项目说明文档
```

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

```bash
cd linear-function-graph
npm install
```

### 启动开发服务器

```bash
npm run dev
```

项目启动后，在浏览器中访问 `http://localhost:5173` 即可查看应用。

### 构建生产版本

```bash
npm run build
```

构建产物将生成在 `dist` 目录中。

### 预览生产构建

```bash
npm run preview
```

## 📖 使用说明

1. **观察函数图像**：页面中央显示一次函数 y = kx + b 的图像
2. **调整斜率 k**：使用右侧的"斜率 k"滑块，范围为 -5 到 5
   - k > 0：直线从左下向右上倾斜（递增函数）
   - k < 0：直线从左上向右下倾斜（递减函数）
   - k = 0：直线平行于 x 轴（水平线）
3. **调整截距 b**：使用"截距 b"滑块，范围为 -10 到 10
   - b 决定直线与 y 轴的交点位置
4. **查看交点**：红色圆点标注了直线与坐标轴的交点坐标
5. **重置参数**：点击"重置参数"按钮可将 k 和 b 恢复为初始值（k=1, b=0）

## 🎨 设计特点

- **色彩搭配**：采用蓝色和靛蓝色渐变主题，清新且专业
- **文字可读性**：所有文字与背景对比度高，字体大小适中，易于阅读
- **响应式布局**：适配不同屏幕尺寸，在手机、平板、电脑上均有良好体验
- **按钮设计**：按钮文字水平垂直居中，悬停时有视觉反馈
- **知识卡片**：采用左侧边框和渐变色背景，突出重要知识点

## 📝 数学知识点

### 斜率 k 的作用

斜率 k 决定了直线的倾斜程度和方向：
- **k > 0**：直线从左下向右上延伸，y 随 x 增大而增大
- **k < 0**：直线从左上向右下延伸，y 随 x 增大而减小
- **k = 0**：直线为水平线，y 值恒定等于 b
- **|k| 越大**：直线越陡峭
- **|k| 越小**：直线越平缓

### 截距 b 的作用

截距 b 是直线与 y 轴交点的纵坐标：
- 交点坐标为 **(0, b)**
- **b > 0**：交点在 y 轴正半轴
- **b < 0**：交点在 y 轴负半轴
- **b = 0**：直线经过原点

### 与 x 轴的交点

当 y = 0 时：
- kx + b = 0
- x = -b/k （当 k ≠ 0 时）
- 交点坐标为 **(-b/k, 0)**

## 🔧 开发说明

### 核心组件

- **App.tsx**：主应用组件，包含所有功能实现
  - 使用 `useState` 管理 k 和 b 的状态
  - 使用 `useRef` 获取 Canvas 元素引用
  - 使用 `useEffect` 监听参数变化并重新绘制图像
  - 使用 HTML5 Canvas API 绘制坐标系和函数图像

### 样式说明

- 主要使用 Tailwind CSS 进行样式开发
- 部分 PrimeReact 组件使用自定义 CSS 进行样式覆盖
- Canvas 绘制使用原生 Canvas API 进行颜色和线条配置

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目！

---

🎉 祝学习愉快！让数学变得更加直观有趣！
