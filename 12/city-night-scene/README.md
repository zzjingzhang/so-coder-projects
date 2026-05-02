# 城市夜景物理渲染 (City Night Scene)

一个基于 Canvas 的物理渲染城市夜景动画，包含霓虹灯光和车流光轨效果。

## 项目结构

```
city-night-scene/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── vite.svg
│   │   └── vue.svg
│   ├── components/
│   │   ├── CityNightScene.vue  # 城市夜景渲染核心组件
│   │   ├── ControlPanel.vue     # 控制面板组件
│   │   └── HelloWorld.vue       # 默认组件
│   ├── router/
│   │   └── index.ts             # 路由配置
│   ├── views/
│   │   └── CityNightView.vue    # 主页面视图
│   ├── App.vue                   # 根组件
│   ├── main.ts                   # 入口文件
│   └── style.css                 # 全局样式
├── .gitignore
├── index.html
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

## 技术栈

- **框架**: Vue 3 (Composition API)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **UI 组件库**: Naive UI
- **路由**: Vue Router
- **打包工具**: Vite

## 功能特性

- 🌙 基于 Canvas 的物理渲染城市夜景
- ✨ 动态霓虹灯光效果，支持颜色切换
- 🚗 车流模拟，带有光轨效果
- 💡 实时调节光照强度
- 🎨 6 种预设霓虹颜色可选
- 🚦 车流密度可调节
- 🎮 简洁美观的控制面板

## 安装

```bash
cd city-night-scene
npm install
```

## 启动开发服务器

```bash
npm run dev
```

然后在浏览器中打开显示的本地地址（通常是 `http://localhost:5173`）

## 构建生产版本

```bash
npm run build
```

## 预览生产构建

```bash
npm run preview
```

## 核心组件说明

### CityNightScene.vue

城市夜景渲染核心组件，使用 HTML5 Canvas 实现：

- **天空渐变**: 从深蓝到紫的夜间天空渐变
- **星星闪烁**: 随机生成的星星，带有闪烁动画
- **月亮**: 带光晕效果的月亮
- **建筑群**: 随机生成的建筑物，带有发光窗户和霓虹招牌
- **道路**: 多车道道路，带有虚线分隔线
- **车流模拟**: 
  - 双向行驶的车辆
  - 车流光轨效果
  - 车头灯光束（来车方向）
  - 尾灯（驶离方向）

### ControlPanel.vue

控制面板组件，提供以下控制项：

- **光照强度滑块**: 调节整体场景亮度 (0% - 100%)
- **霓虹颜色选择器**: 6 种预设颜色：紫、蓝、红、黄、绿、橙
- **车流密度滑块**: 调节路上车辆数量 (0% - 100%)

### CityNightView.vue

主页面视图，组合场景渲染和控制面板：

- 全屏场景渲染
- 可折叠的控制面板
- 底部标题显示
- 右上角的面板显示/隐藏按钮

## 使用说明

1. 启动项目后，你将看到一个动态的城市夜景
2. 使用左侧的控制面板调节场景参数：
   - 拖动「光照强度」滑块调节整体亮度
   - 点击颜色按钮切换霓虹主色调
   - 拖动「车流密度」滑块增加或减少车辆
3. 点击右上角「隐藏面板」按钮可以收起控制面板，获得更佳的观赏体验

## 浏览器兼容性

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 开发建议

本项目使用 Vue 3 Composition API 和 `<script setup>` 语法。如需扩展功能：

- 添加更多视觉效果请修改 `CityNightScene.vue`
- 添加更多控制项请修改 `ControlPanel.vue`
- 添加新页面请在 `router/index.ts` 中配置路由
