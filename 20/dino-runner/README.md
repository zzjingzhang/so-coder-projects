# 🦕 Dino Runner - Chrome 离线小恐龙游戏

一个基于 Vue 3 + Vite 开发的经典 Chrome 离线小恐龙跑酷游戏。

## 项目结构

```
dino-runner/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── vite.svg
│   │   └── vue.svg
│   ├── components/
│   │   ├── DinoRunner.vue    # 核心游戏组件
│   │   └── HelloWorld.vue    # 示例组件（已停用）
│   ├── pages/
│   │   └── GamePage.vue      # 游戏页面
│   ├── App.vue                # 根组件
│   ├── main.js                # 应用入口
│   └── style.css              # 全局样式
├── index.html
├── package.json
├── postcss.config.js          # PostCSS 配置
├── tailwind.config.js         # Tailwind CSS 配置
└── vite.config.js             # Vite 配置
```

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue | 3.x | 前端框架 |
| Vite | 8.x | 构建工具 |
| Tailwind CSS | 4.x | CSS 样式框架 |
| PrimeVue | 4.x | UI 组件库 |
| Vue Router | 4.x | 路由管理 |
| JavaScript | ES6+ | 开发语言 |

## 功能特性

- 🎮 **经典游戏玩法**：还原 Chrome 离线小恐龙的经典跑酷体验
- 🦖 **小恐龙角色**：支持跳跃和下蹲操作
- 🌵 **障碍物系统**：仙人掌（多种尺寸）、飞行的鸟
- ☁️ **动态背景**：飘动的云朵和地面装饰
- 💨 **粒子效果**：跑步时的尘土粒子
- ⚡ **难度递增**：游戏速度随时间逐渐加快
- 🏆 **分数系统**：实时分数显示和最高分记录
- 🎨 **精美 UI**：使用 Tailwind CSS 和 PrimeVue 打造的现代化界面

## 操作说明

| 按键 | 功能 |
|------|------|
| 空格键 / 上箭头 | 跳跃 |
| 下箭头 | 下蹲 |
| 鼠标点击 | 开始游戏 / 跳跃 |

## 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装依赖

```bash
cd dino-runner
npm install
```

### 开发模式

启动开发服务器，支持热更新：

```bash
npm run dev
```

默认访问地址：`http://localhost:5173`

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 预览生产构建

```bash
npm run preview
```

## 核心实现

### 游戏架构

游戏核心逻辑在 `src/components/DinoRunner.vue` 中实现，主要包含：

1. **游戏循环**：使用 `requestAnimationFrame` 实现流畅的 60fps 游戏循环
2. **物理引擎**：简单的重力和碰撞检测系统
3. **实体管理**：恐龙、障碍物、云朵、粒子等游戏实体
4. **输入处理**：键盘和鼠标事件监听

### 游戏机制

- **跳跃系统**：按下空格/上箭头时，恐龙获得向上的速度，受重力影响下落
- **下蹲系统**：按下下箭头时，恐龙高度降低，可躲避飞行的鸟
- **障碍物生成**：随机时间间隔生成仙人掌或飞鸟，难度随时间增加
- **碰撞检测**：AABB（轴对齐包围盒）碰撞检测算法
- **分数计算**：基于游戏速度和帧数动态计算分数

## 开发说明

### Tailwind CSS 配置

项目使用 Tailwind CSS 进行样式开发，配置文件为 `tailwind.config.js`。

### PrimeVue 组件

已全局注册 `Button` 组件，如需使用其他 PrimeVue 组件，请在 `main.js` 中注册：

```javascript
import Dialog from 'primevue/dialog'
app.component('Dialog', Dialog)
```

### 路由配置

路由配置在 `main.js` 中，当前仅包含一个游戏页面。如需扩展，请添加更多路由：

```javascript
const routes = [
  { path: '/', component: GamePage },
  { path: '/about', component: AboutPage }  // 示例
]
```

## License

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

---

享受游戏时光！🎮
