# NestedMenuItem 组件演示

这是一个功能强大的可重用 Vue 组件，提供无限深度的嵌套菜单功能。

## 技术栈

- **框架**: Vue 3
- **语言**: JavaScript
- **样式**: Tailwind CSS 4
- **UI 组件库**: Vuetify 3
- **路由**: Vue Router 4
- **打包工具**: Vite

## 项目结构

```
nested-menu-item-demo/
├── src/
│   ├── components/
│   │   └── NestedMenuItem.vue   # 核心嵌套菜单组件
│   ├── views/
│   │   └── Demo.vue             # 演示页面
│   ├── router/
│   │   └── index.js             # 路由配置
│   ├── App.vue                  # 根组件
│   ├── main.js                  # 应用入口
│   └── style.css                # 全局样式
├── public/                      # 静态资源
├── index.html                   # HTML 模板
├── vite.config.js               # Vite 配置
├── package.json                 # 项目依赖
└── README.md                    # 项目文档
```

## NestedMenuItem 组件特性

### 核心功能

- ✅ 无限深度的嵌套菜单
- ✅ 悬停或聚焦时自动打开子菜单
- ✅ 完整的键盘导航支持
  - 右箭头: 打开子菜单
  - 左箭头: 关闭子菜单
  - Escape: 关闭菜单
  - Enter/空格: 点击菜单项
- ✅ 鼠标事件处理
- ✅ 焦点管理
- ✅ 平滑的过渡动画

### 可配置选项

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| parentMenuOpen | Boolean | false | 父菜单是否打开 |
| label | String | (必填) | 菜单标签文本 |
| rightIcon | Component | null | 自定义右侧图标 |
| containerProps | Object | {} | 容器元素的额外 props |
| menuProps | Object | {} | 子菜单的额外 props |
| button | Boolean | false | 是否渲染为按钮 |
| tag | String | 'div' | 容器标签名称 |

### 事件

| 事件 | 说明 |
|------|------|
| click | 点击菜单项时触发 |
| mouseenter | 鼠标进入时触发 |
| mouseleave | 鼠标离开时触发 |
| focus | 获取焦点时触发 |
| blur | 失去焦点时触发 |

## 安装和启动

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

开发服务器将在 http://localhost:5173 启动

### 3. 构建生产版本

```bash
npm run build
```

### 4. 预览生产版本

```bash
npm run preview
```

## 使用示例

### 基本用法

```vue
<template>
  <NestedMenuItem label="菜单项目" @click="handleClick">
    <NestedMenuItem label="子菜单 1" />
    <NestedMenuItem label="子菜单 2" />
  </NestedMenuItem>
</template>

<script setup>
import NestedMenuItem from './components/NestedMenuItem.vue'
</script>
```

### 上下文菜单示例

```vue
<template>
  <div @contextmenu="showContextMenu">
    <!-- 内容 -->
  </div>
  
  <div v-if="menuVisible" class="context-menu">
    <NestedMenuItem label="新建" />
    <NestedMenuItem label="设置">
      <NestedMenuItem label="主题" />
    </NestedMenuItem>
  </div>
</template>
```

### 自定义样式

```vue
<template>
  <NestedMenuItem
    label="自定义样式"
    :container-props="{ class: 'custom-menu-item' }"
    :menu-props="{ class: 'custom-submenu' }"
  />
</template>
```

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 许可证

MIT
