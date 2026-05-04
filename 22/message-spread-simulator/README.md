# 📢 消息传播模拟器

一个帮助学生直观理解指数增长原理的交互式演示网页，专为小学数学教学设计。

## 🌟 功能特点

- **交互式模拟**：可以一步步演示消息传播过程
- **统计数据显示**：实时显示每分钟新增人数和累计总人数
- **传播树状图**：可视化展示消息传播的层级结构
- **数据变化表**：完整记录每一分钟的变化数据
- **控制按钮**：支持前进、后退、重置和直接播放到最后
- **数学原理解释**：清晰的指数增长公式和等比数列求和解释
- **可调整参数**：可以设置每人每分钟传递给几个人，以及模拟多少分钟

## 🛠️ 技术栈

- **前端框架**：React 18
- **编程语言**：JavaScript
- **样式框架**：Tailwind CSS
- **UI 组件库**：Chakra UI
- **路由**：React Router DOM
- **打包工具**：Vite

## 📁 项目结构

```
message-spread-simulator/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── App.css
│   ├── App.jsx          # 主应用组件
│   ├── index.css        # 全局样式（包含 Tailwind）
│   └── main.jsx         # 入口文件
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js    # PostCSS 配置
├── tailwind.config.js   # Tailwind CSS 配置
└── vite.config.js       # Vite 配置
```

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装依赖

```bash
cd message-spread-simulator
npm install
```

### 开发模式

```bash
npm run dev
```

项目将在 `http://localhost:5173` 启动。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 预览生产版本

```bash
npm run preview
```

## 📖 使用说明

1. **设置参数**：
   - 调整"每人每分钟传递给几个人"（1-5人）
   - 调整"模拟多少分钟"（1-20分钟）

2. **控制演示**：
   - 点击"下一分钟"按钮前进
   - 点击"上一分钟"按钮后退
   - 点击"重置"按钮回到初始状态
   - 点击"直接播放到最后"查看最终结果

3. **查看数据**：
   - 统计数据卡片显示当前分钟的新增和累计人数
   - 传播树状图可视化展示传播层级
   - 数据表格完整记录所有分钟的变化
   - 点击表格中的行可以直接跳转到对应分钟

4. **学习数学原理**：
   - 查看页面底部的数学原理解释
   - 理解指数增长公式
   - 学习等比数列求和

## 🎯 教育价值

这个模拟器特别适合：
- 小学数学课上讲解指数增长概念
- 让学生直观理解为什么消息会传播得如此之快
- 建立数学模型思维
- 理解复利效应的原理

## 🔧 自定义开发

### 修改样式

样式主要通过 Tailwind CSS 和 Chakra UI 实现。如需修改：

- Tailwind 样式：直接修改 JSX 中的 `className`
- Chakra UI 样式：通过组件的 `prop` 属性（如 `bg`、`color`、`size` 等）
- 全局样式：修改 `src/index.css`

### 扩展功能

主要逻辑都在 `src/App.jsx` 中：
- `simulationData`：使用 `useMemo` 生成模拟数据
- `renderTree()`：渲染传播树状图
- 控制按钮的回调函数：`handleNext`、`handlePrev`、`handleReset`、`handleGoTo`

## 📝 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！
