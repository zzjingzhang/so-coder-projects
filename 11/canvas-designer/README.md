# Canvas Designer - 画布设计器

一个功能强大的画布设计工具，支持绘图、形状、文本工具，以及图层管理、图像导入/编辑/导出功能。

## 项目结构

```
canvas-designer/
├── src/
│   ├── assets/              # 静态资源
│   ├── components/          # 组件目录
│   │   ├── CanvasLayer.vue      # 画布层组件（核心绘图组件）
│   │   ├── Toolbar.vue          # 工具栏组件
│   │   ├── LayerPanel.vue       # 图层面板组件
│   │   └── PropertyPanel.vue    # 属性面板组件
│   ├── views/               # 视图目录
│   │   └── CanvasEditor.vue     # 画布编辑器主视图
│   ├── router/              # 路由配置
│   │   └── index.js
│   ├── App.vue              # 根组件
│   ├── main.js              # 入口文件
│   └── style.css            # 全局样式
├── public/                  # 公共资源
├── index.html               # HTML 模板
├── vite.config.js           # Vite 配置
├── tailwind.config.js       # Tailwind CSS 配置
├── postcss.config.js        # PostCSS 配置
└── package.json             # 依赖配置
```

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **Vite** - 下一代前端构建工具
- **Tailwind CSS** - 实用优先的 CSS 框架
- **Naive UI** - Vue 3 组件库
- **Vue Router** - Vue.js 官方路由
- **HTML5 Canvas API** - 用于绘图功能

## 功能特性

### 🎨 绘图工具
- **画笔工具** - 自由手绘，支持自定义颜色和大小
- **橡皮擦工具** - 擦除画布内容，支持自定义大小

### 🔷 形状工具
- **矩形** - 绘制矩形，支持填充和描边
- **圆形** - 绘制圆形/椭圆，支持填充和描边
- **线条** - 绘制直线，支持自定义颜色和宽度

### 📝 文本工具
- 支持多种字体选择
- 自定义字体大小（8px - 72px）
- 自定义文本颜色
- 支持多行文本

### 📚 图层管理
- 创建新图层
- 删除图层（至少保留一个图层）
- 显示/隐藏图层
- 调整图层次序（上移/下移）
- 图层选择高亮

### 🖼️ 图像导入/导出
- **导入** - 支持导入 JPG、PNG、GIF 格式图像
- **导出** - 支持导出为 PNG、JPG、WebP 格式
- 撤销/重做功能（历史记录）

## 快速开始

### 环境要求
- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装依赖

```bash
cd canvas-designer
npm install
```

### 启动开发服务器

```bash
npm run dev
```

开发服务器启动后，访问 http://localhost:5173 即可使用画布设计器。

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

### 工具栏
- **撤销/重做** - 恢复或重做之前的操作
- **工具选择** - 选择画笔、橡皮擦、矩形、圆形、线条、文本、选择工具
- **导入/导出** - 导入外部图像或导出当前画布

### 图层面板
- 点击"新建图层"按钮创建新图层
- 点击图层项选择该图层
- 使用眼睛图标切换图层可见性
- 使用箭头图标调整图层次序
- 使用垃圾桶图标删除图层

### 属性面板
根据选择的工具，属性面板会显示不同的设置选项：
- **画笔/橡皮擦** - 颜色、大小
- **形状工具** - 填充颜色、描边颜色、描边宽度
- **文本工具** - 文本内容、字体、字号、颜色

## 开发指南

### 添加新工具
1. 在 `Toolbar.vue` 中添加工具按钮
2. 在 `CanvasLayer.vue` 中实现工具的绘图逻辑
3. 在 `PropertyPanel.vue` 中添加工具的属性设置

### 扩展图层功能
- 图层数据存储在 `CanvasEditor.vue` 的 `layers` 数组中
- 每个图层包含：id、name、type、visible、opacity、zIndex 等属性
- 可以在 `LayerPanel.vue` 中扩展图层操作

## License

MIT License

