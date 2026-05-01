# Digital Magazine - 数字杂志

一个具有交互式翻页效果的现代数字杂志应用，采用 Vue 3 + TypeScript + Tailwind CSS 构建。

## 项目特性

- 📚 **交互式翻页书** - 真实的翻页效果，仿佛在阅读实体杂志
- ✨ **精美动画过渡** - 流畅的页面切换和元素动画效果
- 🎨 **现代设计** - 高对比度文本，鲜艳图像，视觉效果出色
- 📱 **响应式布局** - 完美适配各种设备屏幕尺寸
- ⌨️ **键盘导航** - 支持方向键和空格键进行翻页

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Vue | 3.5+ | 渐进式 JavaScript 框架 |
| TypeScript | 6.0+ | JavaScript 的超集，添加类型系统 |
| Vite | 8.0+ | 下一代前端构建工具 |
| Vue Router | 5.0+ | Vue.js 官方路由管理器 |
| Tailwind CSS | 4.2+ | 实用优先的 CSS 框架 |
| Element Plus | 2.13+ | Vue 3 组件库 |

## 项目结构

```
digital-magazine/
├── public/                  # 静态资源目录
│   ├── favicon.svg
│   └── icons.svg
├── src/                     # 源代码目录
│   ├── assets/              # 资源文件
│   │   ├── hero.png
│   │   ├── vite.svg
│   │   └── vue.svg
│   ├── components/          # 组件目录
│   │   ├── Footer.vue       # 页脚组件
│   │   ├── Header.vue       # 头部导航组件
│   │   ├── HelloWorld.vue   # 示例组件
│   │   └── MagazineBook.vue # 翻页书核心组件
│   ├── router/              # 路由配置
│   │   └── index.ts
│   ├── views/               # 页面视图
│   │   ├── AboutView.vue    # 关于我们页面
│   │   ├── HomeView.vue     # 首页
│   │   └── MagazineView.vue # 杂志阅读页面
│   ├── App.vue              # 根组件
│   ├── main.ts              # 入口文件
│   └── style.css            # 全局样式
├── .gitignore
├── index.html               # HTML 入口文件
├── package.json
├── tailwind.config.js       # Tailwind CSS 配置
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts           # Vite 配置
```

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

```bash
cd digital-magazine
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

## 主要功能

### 1. 交互式翻页书

核心功能位于 `src/components/MagazineBook.vue`，支持：

- 双页显示模式（左右页并排）
- 点击页面翻页
- 键盘导航（方向键 ← → 和空格键）
- 页码显示和进度条
- 不同类型页面（封面、内容页、图片页、封底）

### 2. 页面路由

- `/` - 首页：展示杂志概览和特色介绍
- `/magazine` - 杂志阅读页面：交互式翻页阅读
- `/about` - 关于我们：团队介绍和发展历程

### 3. 样式设计

- 使用 Tailwind CSS 进行响应式布局
- 自定义颜色主题（primary 主色、accent 强调色）
- 渐变背景和阴影效果
- 平滑过渡动画
- Google Fonts（Playfair Display + Inter）

## 自定义配置

### Tailwind CSS 配置

在 `tailwind.config.js` 中可以自定义：

- 颜色主题
- 字体
- 动画效果
- 断点

### 页面数据

在 `src/views/MagazineView.vue` 中可以自定义杂志内容：

```typescript
const magazinePages = ref([
  {
    id: 1,
    title: '封面标题',
    subtitle: '副标题',
    content: '页面内容',
    image: '图片URL',
    type: 'cover' // 'cover' | 'content' | 'image' | 'back'
  }
])
```

## 浏览器支持

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

## 开发建议

1. **组件开发**：使用 Vue 3 Composition API (`<script setup>`)
2. **类型安全**：充分利用 TypeScript 类型定义
3. **样式编写**：优先使用 Tailwind CSS 工具类
4. **性能优化**：合理使用 `v-if`、`v-show`、`computed`
5. **响应式设计**：使用 Tailwind 断点前缀（`md:`、`lg:` 等）

## License

MIT

## 贡献

欢迎提交 Issue 和 Pull Request！
