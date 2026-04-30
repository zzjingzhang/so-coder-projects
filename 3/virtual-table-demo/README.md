# Virtual Table Demo - 表格虚拟滚动演示项目

一个基于 Vue 3 + TypeScript 的高性能虚拟滚动表格组件演示项目，支持大数据量平滑滚动和动态高度渲染。

## 项目结构

```
virtual-table-demo/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── VirtualTable.vue      # 核心虚拟滚动表格组件
│   │   └── CodePreview.vue       # 代码预览组件
│   ├── layouts/
│   │   └── MainLayout.vue        # 统一布局组件
│   ├── router/
│   │   └── index.ts              # Vue Router 配置
│   ├── views/
│   │   └── VirtualTableDemo.vue  # 演示页面
│   ├── App.vue                   # 根组件
│   ├── main.ts                   # 应用入口
│   └── style.css                 # 全局样式
├── index.html                    # HTML 入口
├── package.json                  # 项目配置
├── vite.config.ts                # Vite 配置
├── tailwind.config.js            # Tailwind CSS 配置
├── tsconfig.json                 # TypeScript 配置
└── README.md                     # 项目文档
```

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Vue | ^3.4.21 | 渐进式 JavaScript 框架 |
| TypeScript | ^5.4.2 | JavaScript 超集，提供类型检查 |
| Vite | ^5.1.6 | 下一代前端构建工具 |
| Vuetify | ^3.5.8 | Material Design 组件库 |
| Vue Router | ^4.3.0 | Vue.js 官方路由管理 |
| Tailwind CSS | ^3.4.1 | 实用优先的 CSS 框架 |
| @vueuse/core | ^10.9.0 | Vue Composition API 工具集 |

## 功能特性

### 虚拟滚动表格组件
- **大数据量支持**: 可处理 10万+ 行数据，流畅滚动不卡顿
- **动态高度**: 支持不同行高、动态内容高度
- **缓冲渲染**: 可配置缓冲区，减少滚动时的白屏现象
- **灵活配置**: 支持自定义列宽、列标题、单元格渲染

### 演示页面
- **路由切换**: 支持多页面路由导航
- **统一布局**: 响应式布局组件
- **代码预览**: 语法高亮的代码展示功能
- **性能监控**: 实时 FPS 显示和性能指标

### 配置选项
- 可调节数据行数 (100 - 100,000)
- 可调节容器高度
- 可调节缓冲区大小
- 显示/隐藏代码预览

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

项目将在 `http://localhost:5173` 启动开发服务器。

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

### 基础使用

```vue
<template>
  <VirtualTable
    :columns="columns"
    :data="tableData"
    :row-height="50"
    :container-height="400"
    :buffer-size="5"
  />
</template>

<script setup lang="ts">
import VirtualTable from '@/components/VirtualTable.vue'

const columns = [
  { title: 'ID', key: 'id', width: 80 },
  { title: '姓名', key: 'name', width: 150 },
  { title: '邮箱', key: 'email', width: 220 },
]

const tableData = [
  { id: 1, name: '张三', email: 'zhangsan@example.com' },
  { id: 2, name: '李四', email: 'lisi@example.com' },
]
</script>
```

### 自定义列渲染

```vue
<script setup lang="ts">
const columns = [
  {
    title: '操作',
    key: 'action',
    width: 120,
    render: (row: any, column: any) => {
      return h('button', { onClick: () => handleClick(row.id) }, '查看')
    }
  }
]
</script>
```

## 性能优化

虚拟滚动通过以下方式确保高性能：

1. **仅渲染可见区域**: 只渲染当前可视窗口内的行
2. **DOM 复用**: 滚动时复用已创建的 DOM 元素
3. **缓冲区**: 预渲染上下缓冲区，减少白屏
4. **异步更新**: 使用 `requestAnimationFrame` 优化滚动处理

## 浏览器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## License

MIT
