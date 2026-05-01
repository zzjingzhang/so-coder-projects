# 🎀 幸运点名器 🎀

一个可爱甜美的上课随机点名网页应用，使用 React + Tailwind CSS + Ant Design 构建。

## ✨ 功能特性

- 🎯 **随机点名**：点击按钮开始随机滚动姓名，再次点击暂停
- ⚡ **速度控制**：通过滑块调节名字滚动的速度，拉满时速度非常快
- 🎨 **可爱风格**：粉色渐变背景，漂浮的爱心和星星装饰
- 🔵 **选中效果**：暂停后放大字体并以蓝色突出显示选中的名字
- 📋 **名单展示**：底部展示所有参与点名的学生名单

## 🛠️ 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| React | ^19.2.5 | 前端框架 |
| Vite | ^8.0.10 | 构建工具 |
| Tailwind CSS | ^4.2.4 | CSS 框架 |
| Ant Design | ^6.3.7 | UI 组件库 |
| React Router | ^7.14.2 | 路由管理 |

## 📁 项目结构

```
lucky-student-picker/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── App.css          # 自定义样式
│   ├── App.jsx          # 主应用组件（随机点名页面）
│   ├── index.css        # 全局样式 + Tailwind CSS
│   └── main.jsx         # 应用入口（包含路由配置）
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js    # PostCSS 配置
├── vite.config.js       # Vite 配置
└── README.md
```

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

```bash
cd lucky-student-picker
npm install
```

### 启动开发服务器

```bash
npm run dev
```

启动后，打开浏览器访问 `http://localhost:5173` 即可使用。

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 📝 使用说明

1. **开始抽奖**：点击页面底部的「🎯 开始抽奖」按钮，姓名开始快速滚动
2. **停止抽奖**：再次点击按钮（此时按钮变为「🛑 停止抽奖」），滚动停止
3. **查看结果**：停止后，选中的名字会放大并以蓝色突出显示，同时显示「🎉 恭喜你被选中！🎉」的提示
4. **调节速度**：使用「⚡ 滚动速度」滑块可以调节名字滚动的快慢，滑块拉到最右侧时速度最快
5. **再次抽奖**：点击「🎯 开始抽奖」按钮即可开始新一轮抽奖

## 🎨 自定义配置

### 修改学生名单

在 `src/App.jsx` 文件中，找到第 7 行的 `students` 数组，修改其中的名字即可：

```javascript
const students = ['张三', '王五', '李四', '你的名字'];
```

### 修改主题颜色

项目使用了粉色和紫色的渐变主题。如需修改，可以在 `src/App.jsx` 中调整 Tailwind CSS 的颜色类名，或者修改 `ConfigProvider` 中的主题配置。

## 📦 依赖说明

### 生产依赖

- `react` & `react-dom`：React 核心库
- `antd`：Ant Design UI 组件库
- `react-router-dom`：React 路由库

### 开发依赖

- `vite`：构建工具
- `@vitejs/plugin-react`：Vite 的 React 插件
- `tailwindcss`：Tailwind CSS 框架
- `postcss` & `autoprefixer`：CSS 处理工具
- `eslint` 相关：代码检查工具

## 🐛 常见问题

**Q: 为什么 Tailwind CSS 样式没有生效？**

A: 确保已正确安装了 `tailwindcss`、`postcss` 和 `autoprefixer`，并且 `postcss.config.js` 配置正确。同时检查 `src/index.css` 中是否包含了 `@import "tailwindcss";`。

**Q: 如何修改滚动速度的范围？**

A: 在 `src/App.jsx` 的 `useEffect` 中，可以修改 `interval` 的计算逻辑。当前速度范围 0-100 对应 500ms-20ms 的间隔时间。

**Q: 如何添加更多的装饰元素？**

A: 在 `src/App.jsx` 的背景装饰部分（第 70-100 行），可以添加更多的爱心、星星或其他装饰元素。

## 📄 许可证

MIT License

## 👥 作者

Created with ❤️ using Trae AI
