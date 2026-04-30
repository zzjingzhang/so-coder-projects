# 可视化表单构建器

一个功能强大的可视化表单构建器，支持拖拽式添加表单元素、实时预览、主题自定义等功能。

## 技术栈

- Vue 3
- Vite
- Vue Router
- Pinia (状态管理)
- Tailwind CSS
- vuedraggable (拖拽功能)
- @vueup/vue-quill (富文本编辑)

## 项目结构

```
visual-form-builder/
├── src/
│   ├── components/
│   │   ├── form-elements/    # 表单元素组件
│   │   ├── layout/           # 布局组件
│   │   ├── properties/       # 属性面板
│   │   └── theming/          # 主题设置
│   ├── views/                # 页面组件
│   ├── stores/               # Pinia 状态管理
│   ├── router/               # 路由配置
│   ├── styles/               # 全局样式
│   ├── config/               # 配置文件
│   └── main.js               # 入口文件
├── vite.config.js            # Vite 配置
├── tailwind.config.js        # Tailwind 配置
├── postcss.config.js         # PostCSS 配置
└── package.json
```

## 功能特性

### 1. 表单元素库
支持以下表单元素：
- 文本输入
- 长文本
- 数字输入
- 下拉列表
- 单选框
- 复选框
- 日期/时间选择器
- 评分
- 按钮
- 富文本编辑器

### 2. 拖拽功能
- 从元素库拖拽元素到画布
- 画布内拖拽排序
- 唯一元素限制（按钮和富文本只能添加一个）

### 3. 属性编辑
- 编辑表单元素属性：标签、占位符、必填、帮助文本
- 选项增删（针对下拉、单选、复选等）

### 4. 主题自定义
- 全局字体和颜色
- 标签样式
- 输入框样式
- 按钮样式
- 所有主题设置实时生效

### 5. 页面
- 编辑页面：完整的表单构建功能
- 预览页面：查看最终表单效果

## 安装和运行

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览生产构建
```bash
npm run preview
```

### 运行测试
```bash
npm run test
```

## 部署

### 使用静态服务器

构建完成后，可以使用任何静态文件服务器部署 `dist` 目录：

```bash
# 使用 http-server
npm install -g http-server
cd dist
http-server -p 8080

# 或使用 Python
cd dist
python3 -m http.server 8080
```

## 许可证

MIT
