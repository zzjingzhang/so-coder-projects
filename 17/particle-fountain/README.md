# 粒子喷泉模拟器

一个基于物理的粒子喷泉模拟应用，使用 Vue 3 + TypeScript + Vite 构建。

## 项目介绍

粒子喷泉模拟器是一个交互式的物理模拟应用，通过 Canvas 渲染真实的粒子运动轨迹。用户可以通过滑块实时调整重力和发射率等参数，观察不同物理条件下粒子喷泉的变化。

## 技术栈

- **前端框架**: Vue 3 (Composition API)
- **开发语言**: TypeScript
- **构建工具**: Vite
- **样式框架**: Tailwind CSS
- **UI 组件库**: Ant Design Vue
- **路由管理**: Vue Router

## 项目结构

```
particle-fountain/
├── public/                 # 静态资源
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/            # 资源文件
│   │   ├── hero.png
│   │   ├── vite.svg
│   │   └── vue.svg
│   ├── components/        # 公共组件
│   │   └── HelloWorld.vue
│   ├── router/            # 路由配置
│   │   └── index.ts
│   ├── views/             # 页面视图
│   │   └── ParticleFountain.vue
│   ├── App.vue            # 根组件
│   ├── main.ts            # 入口文件
│   └── style.css          # 全局样式
├── .gitignore
├── index.html             # HTML 模板
├── package.json           # 项目配置
├── postcss.config.js      # PostCSS 配置
├── tailwind.config.js     # Tailwind CSS 配置
├── tsconfig.json          # TypeScript 配置
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts         # Vite 配置
```

## 主要功能

- **真实物理模拟**: 粒子遵循牛顿运动定律，受重力影响
- **实时参数控制**: 
  - 重力滑块 (0-20 m/s²)
  - 发射率滑块 (1-30 粒子/秒)
- **交互控制**:
  - 开始/暂停模拟
  - 重置粒子
- **实时状态显示**:
  - 活动粒子数量
  - 模拟运行状态
- **响应式设计**: 支持桌面端和移动端

## 物理原理

- 粒子从喷泉口以随机角度和速度向上发射
- 重力持续作用于粒子，产生向下的加速度
- 粒子具有生命周期，会逐渐淡出消失
- 使用时间积分计算粒子运动轨迹

## 安装与运行

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装依赖

```bash
cd particle-fountain
npm install
```

### 开发模式

```bash
npm run dev
```

应用将在 `http://localhost:5173` 启动。

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

1. **调整重力**: 使用重力滑块改变粒子下落的加速度
   - 设为 0 体验失重环境
   - 设为 9.8 模拟地球重力
   - 设为更大值体验超强重力

2. **调整发射率**: 使用发射率滑块控制每秒生成的粒子数量
   - 低值: 稀疏的粒子流
   - 高值: 密集的喷泉效果

3. **控制模拟**:
   - 点击「开始/暂停」按钮控制模拟状态
   - 点击「重置」按钮清除所有粒子

## 开发说明

- 粒子逻辑位于 `src/views/ParticleFountain.vue`
- 使用 `requestAnimationFrame` 实现流畅动画
- 粒子更新与渲染分离，便于维护和扩展
- 响应式布局使用 Tailwind CSS 实现

## License

MIT
