# 玻璃罐子流体效果

一个展示优雅透明玻璃罐子和波动液体动画的Vue 3项目。

## 项目概述

本项目展示了三个精美的透明玻璃罐子，每个罐子中都装有不同颜色的液体，液体具有流畅的波动动画效果。项目采用现代化的技术栈，提供了美观的视觉效果和良好的用户体验。

### 主要特性

- 🫙 三个透明玻璃罐子，带有真实的玻璃质感效果
- 🌊 液体波动动画，模拟真实的流体效果
- 🎨 三种不同颜色的液体：蓝色梦幻、红色热情、绿色清新
- ✨ 现代化的UI设计，使用深色主题
- 📱 响应式布局，适配不同屏幕尺寸
- 🔄 重新加载动画功能

## 技术栈

- **前端框架**: Vue 3 (Composition API)
- **构建工具**: Vite 5
- **样式框架**: Tailwind CSS 3
- **UI组件库**: Vuetify 3
- **路由管理**: Vue Router 4
- **编程语言**: JavaScript
- **动画实现**: CSS3 动画

## 项目结构

```
glass-jar-fluid/
├── src/
│   ├── components/
│   │   └── GlassJar.vue          # 玻璃罐子组件（核心组件）
│   ├── router/
│   │   └── index.js              # 路由配置
│   ├── views/
│   │   └── HomeView.vue          # 主页视图
│   ├── App.vue                    # 根组件
│   ├── main.js                    # 应用入口
│   └── style.css                  # 全局样式
├── index.html                     # HTML入口文件
├── package.json                   # 项目依赖配置
├── vite.config.js                 # Vite配置
├── tailwind.config.js             # Tailwind CSS配置
├── postcss.config.js              # PostCSS配置
└── README.md                      # 项目说明文档
```

## 核心组件说明

### GlassJar.vue

这是项目的核心组件，实现了透明玻璃罐子和波动液体动画效果。

**组件属性**:
- `liquidColor` (String): 液体颜色，默认为 `#00d4ff`
- `liquidName` (String): 液体名称，默认为 `未知液体`
- `fillLevel` (Number): 液体填充度（0-1之间），默认为 `0.7`

**实现的效果**:
1. **透明玻璃效果**: 使用 `backdrop-filter: blur()` 和半透明背景实现
2. **液体波动动画**: 使用CSS动画和多层波浪元素实现
3. **发光效果**: 液体底部带有柔和的发光动画
4. **反射效果**: 玻璃表面有微妙的反射效果

## 安装和运行

### 前置要求

确保你的开发环境已经安装了以下软件：
- Node.js (推荐 v18 或更高版本)
- npm (通常随 Node.js 一起安装)

### 安装步骤

1. **进入项目目录**
```bash
cd glass-jar-fluid
```

2. **安装依赖**
```bash
npm install
```

### 运行项目

1. **开发模式**
```bash
npm run dev
```

这将启动一个本地开发服务器，通常在 `http://localhost:5173` 运行。

2. **构建生产版本**
```bash
npm run build
```

构建完成后，生产文件将生成在 `dist` 目录中。

3. **预览生产版本**
```bash
npm run preview
```

## 使用说明

1. **查看效果**: 启动项目后，在浏览器中打开显示的地址
2. **三个罐子**: 页面中央展示了三个不同颜色的玻璃罐子
3. **液体信息**: 每个罐子下方显示液体名称和填充度
4. **重新加载**: 点击"重新加载动画"按钮可以刷新页面

## 自定义配置

### 修改液体颜色

在 `src/views/HomeView.vue` 文件中，可以修改每个罐子的颜色：

```javascript
<GlassJar 
  liquidColor="#ff6b6b"  // 修改这里的颜色值
  liquidName="自定义颜色" 
  :fillLevel="0.7"
/>
```

### 调整动画速度

在 `src/components/GlassJar.vue` 文件中，可以修改动画的持续时间：

```css
@keyframes wave {
  /* 默认是8秒，可以根据需要调整 */
  animation: wave 8s linear infinite;
}
```

## 浏览器兼容性

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

注意：`backdrop-filter` CSS属性在某些较旧的浏览器版本中可能不完全支持。

## 开发说明

### 代码规范

- 使用 Vue 3 Composition API
- 组件使用 `<script setup>` 语法
- 样式使用 Tailwind CSS 工具类结合 scoped CSS
- 保持代码简洁，注释清晰

### 扩展建议

- 添加更多颜色选项
- 实现点击罐子改变液体颜色的功能
- 添加控制液体填充度的滑块
- 实现罐子的3D旋转效果
- 添加更多动画效果

## 许可证

MIT License

## 贡献

欢迎提交问题和拉取请求！

## 联系方式

如有任何问题或建议，请通过以下方式联系：
- 提交 GitHub Issue
- 发送邮件至开发者邮箱

---

**享受这个优雅的玻璃罐子流体效果项目！** 🎉