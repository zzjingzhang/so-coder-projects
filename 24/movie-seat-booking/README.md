# 电影座位预订系统

一个基于 Vue 3 + TypeScript + Tailwind CSS + Naive UI 的电影座位预订前端应用。

## 功能特性

- 🎬 电影选择下拉框，支持不同电影不同票价
- 🪑 交互式座位平面图，支持选中/取消选中座位
- 🎫 三种座位状态：可选、已选、已占用
- 💰 实时计算已选座位数量和总价
- 💾 页面刷新后保持选座状态和电影选择（使用 localStorage）
- 🎨 美观的深色主题设计

## 技术栈

- **框架**: Vue 3 (Composition API)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **UI 组件库**: Naive UI
- **路由**: Vue Router
- **打包工具**: Vite

## 项目结构

```
movie-seat-booking/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── router/
│   │   └── index.ts          # 路由配置
│   ├── views/
│   │   └── MovieSeatBooking.vue  # 座位预订页面组件
│   ├── App.vue               # 根组件
│   ├── main.ts               # 入口文件
│   └── style.css             # 全局样式
├── index.html                # HTML 模板
├── package.json              # 依赖配置
├── postcss.config.js         # PostCSS 配置
├── tailwind.config.js        # Tailwind CSS 配置
├── tsconfig.json             # TypeScript 配置
├── tsconfig.node.json        # TypeScript Node 配置
└── vite.config.ts            # Vite 配置
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

开发服务器启动后，访问 `http://localhost:5173` 即可查看应用。

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

1. **选择电影**：在顶部下拉框中选择你想看的电影，每部电影对应不同的票价。
2. **选择座位**：点击座位图中的座位进行选择（灰色为可选，绿色为已选，深红色为已占用）。
3. **取消选择**：再次点击已选中的座位可以取消选择。
4. **查看信息**：页面底部会实时显示已选座位、座位数量和总价。
5. **重新选择**：点击"重新选择"按钮可以清空所有已选座位。
6. **数据持久化**：页面刷新后，你的选座状态和电影选择会自动恢复。

## 座位状态说明

- **灰色**：可选座位，可以点击选择
- **绿色**：已选座位，再次点击可取消选择
- **深红色**：已占用座位，无法选择

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 开发环境

- Node.js >= 16.0.0
- npm >= 7.0.0

## 许可证

MIT License
