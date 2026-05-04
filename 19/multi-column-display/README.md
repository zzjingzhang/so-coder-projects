# 多栏数据展示系统 (Multi-Column Display)

一个高性能的多栏数据展示应用，支持黑色主题、可调整分栏宽度、联合滚动等特性。

## 功能特性

- **四栏数据展示**：当前屏幕宽度平均分四栏显示数据
- **黑色主题**：采用深色主题界面，护眼且现代
- **可调整分栏宽度**：鼠标可自由拖动分隔线调整各栏宽度
- **联合滚动**：鼠标滚动时四栏数据联动滚动，前后浏览数据
- **性能优化**：虚拟滚动技术，仅渲染可见区域数据
- **行号显示**：每条数据开头显示行号
- **无限数据**：支持1000条中文数据的流畅展示

## 项目结构

```
multi-column-display/
├── src/
│   ├── router/
│   │   └── index.ts           # 路由配置
│   ├── views/
│   │   └── DataDisplay.vue    # 核心数据展示组件
│   ├── App.vue                 # 根组件
│   ├── main.ts                 # 入口文件
│   └── style.css               # 全局样式
├── public/
│   └── favicon.svg             # 网站图标
├── index.html                  # HTML 入口
├── package.json                # 依赖配置
├── tailwind.config.js          # Tailwind CSS 配置
├── postcss.config.js           # PostCSS 配置
├── tsconfig.json               # TypeScript 配置
└── vite.config.ts              # Vite 配置
```

## 技术栈

- **框架**：Vue 3 (Composition API + `<script setup>`)
- **语言**：TypeScript
- **样式**：Tailwind CSS v4
- **UI 组件库**：Ant Design Vue v4
- **路由**：Vue Router v5
- **构建工具**：Vite v8

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

```bash
cd multi-column-display
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

## 使用说明

### 数据展示

- 系统自动生成 1000 条中文测试数据，每条 40 个汉字
- 每条数据开头显示行号（1-1000）
- 数据采用四栏布局，平均分配屏幕宽度

### 调整分栏宽度

- 将鼠标移动到两栏之间的分隔线上
- 当鼠标变为双向箭头时，按住左键拖动
- 释放左键完成宽度调整
- 每栏最小宽度限制为 10%

### 滚动浏览

- 使用鼠标滚轮在任意分栏上滚动
- 四栏数据将联动滚动，保持同步
- 向前滚动查看更早的数据，向后滚动查看更晚的数据
- 底部状态栏显示当前显示范围和总页数

### 性能优化

- 采用虚拟滚动技术，仅渲染屏幕可见的数据行
- 根据容器高度动态计算每栏可容纳的数据量
- 避免渲染 1000 条全部数据，显著提升性能
- 响应式设计，窗口大小变化时自动重新计算

## 核心实现细节

### 数据生成

```typescript
const generateChineseText = (length: number): string => {
  const chars = '天地玄黄宇宙洪荒...' // 中文字符库
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}
```

### 虚拟滚动逻辑

```typescript
const columnData = computed(() => {
  const startIndex = Math.floor(scrollOffset.value / itemHeight) * columnCount
  const maxStart = Math.max(0, totalItems - totalVisibleItems.value)
  const actualStart = Math.min(startIndex, maxStart)
  
  // 只计算可见数据的分栏分配
  const columns: DataItem[][] = Array(columnCount).fill(null).map(() => [])
  for (let i = 0; i < totalVisibleItems.value && actualStart + i < totalItems; i++) {
    const dataIndex = actualStart + i
    const columnIndex = i % columnCount
    columns[columnIndex].push(allData.value[dataIndex])
  }
  
  return columns
})
```

### 分栏宽度调整

```typescript
const startResize = (index: number, event: MouseEvent) => {
  isResizing.value = true
  resizeColumnIndex.value = index
  startX.value = event.clientX
  startWidths.value = [...columnWidths.value]
  
  // 全局事件监听，确保拖动流畅
  document.addEventListener('mousemove', handleResize)
  document.addEventListener('mouseup', stopResize)
}
```

## 设计规范

### 颜色方案（黑色主题）

- 背景色：`#1a1a2e` (深灰蓝)
- 卡片背景：`#16213e` (深蓝灰)
- 边框色：`#0f3460` (深蓝)
- 主文字：`rgba(255, 255, 255, 0.87)`
- 次要文字：`#a0aec0` (灰蓝)
- 强调色：`#3b82f6` (蓝色)
- 行号色：`#60a5fa` (浅蓝)

### 字体规范

- 主字体：`Segoe UI, Tahoma, Geneva, Verdana, sans-serif`
- 行高：1.5
- 基础字号：14px（数据行）
- 标题字号：16px-20px

### 间距规范

- 数据行高：40px
- 内边距：16px
- 外边距：8px-16px
- 分隔线宽度：4px

## 浏览器兼容性

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

## 开发说明

### 目录结构说明

- `src/router/`：路由配置，目前仅包含首页路由
- `src/views/`：页面级组件，DataDisplay.vue 是核心组件
- `src/components/`：通用组件（可扩展）
- `src/assets/`：静态资源

### 扩展建议

1. **添加数据加载功能**：从 API 或文件加载真实数据
2. **添加搜索过滤**：支持按关键词搜索数据
3. **添加数据排序**：支持按行号或内容排序
4. **添加数据导出**：支持导出为 CSV 或 Excel
5. **添加主题切换**：支持亮色/深色主题切换
6. **添加多语言支持**：支持中英文切换

### 性能优化建议

1. **使用 Vue 的 memo 优化**：对于大型列表使用 `<Memo>` 组件
2. **实现无限加载**：当接近数据末尾时自动加载更多
3. **添加数据缓存**：使用 localStorage 缓存已加载的数据
4. **使用 Web Worker**：将数据处理移到后台线程

## 常见问题

**Q: 为什么滚动时没有滚动条？**

A: 本系统采用虚拟滚动技术，通过 JavaScript 控制数据的显示和隐藏，而不是使用原生滚动条。这样可以获得更好的性能和更流畅的滚动体验。

**Q: 如何修改每栏的数据行数？**

A: 系统会根据容器高度自动计算每栏可容纳的数据行数。默认每行高度为 40px，可以通过修改 `itemHeight` 常量来调整。

**Q: 如何修改分栏数量？**

A: 当前固定为 4 栏。如需修改，可以调整 `columnCount` 常量，但需要同时调整样式和布局逻辑。

**Q: Tailwind CSS v4 与 v3 有什么不同？**

A: Tailwind CSS v4 采用了新的配置方式，使用 `@tailwindcss/postcss` 作为 PostCSS 插件，而不是直接使用 `tailwindcss`。配置文件也更加简洁。

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

---

**注意**：本项目使用随机生成的中文测试数据。如需使用真实数据，请修改 `generateData()` 函数或实现数据加载接口。
