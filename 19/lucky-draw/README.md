# 洪老师抽奖系统

一个可爱风格的抽奖网页应用，支持滚动抽奖、速度调节等功能。

## 功能特性

- 🎉 可爱风格的 UI 设计
- 🎰 支持随机滚动抽奖
- ⚡ 滑轮控制滚动速度（右边快，左边慢）
- 🎁 支持暂停并高亮显示中奖奖品
- 🎨 粉色渐变背景，动画装饰效果

## 项目结构

```
lucky-draw/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── vite.svg
│   │   └── vue.svg
│   ├── components/
│   │   ├── HelloWorld.vue
│   │   └── LuckyDraw.vue       # 抽奖组件（主要组件）
│   ├── router/
│   │   └── index.js            # 路由配置
│   ├── App.vue                 # 根组件
│   ├── main.js                 # 入口文件
│   └── style.css               # 全局样式
├── .gitignore
├── README.md
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js           # PostCSS 配置
├── tailwind.config.js          # Tailwind CSS 配置
└── vite.config.js              # Vite 配置
```

## 技术栈

- **框架**: Vue 3 (使用 `<script setup>` 语法)
- **打包工具**: Vite
- **样式**: Tailwind CSS
- **UI 组件库**: Element Plus
- **路由**: Vue Router 4
- **语言**: JavaScript

## 奖品列表

系统包含以下奖品：
- 棒棒糖、小薯片、小挂扣、铅笔
- 班级群表扬券、一项作业指定券
- 小辣条、小软糖、便利贴、涂改带
- 免作业券、中性笔、免值日一次
- 为自己和任选3位好朋友各加2分
- 选择班内任意位置体验1天
- 批评免责卡

## 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0

## 安装和启动

### 1. 安装依赖

```bash
cd lucky-draw
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

启动后，浏览器访问显示的本地地址（如 `http://localhost:5177/`）即可使用。

### 3. 构建生产版本

```bash
npm run build
```

### 4. 预览生产版本

```bash
npm run preview
```

## 使用说明

1. **开始抽奖**: 点击「开始抽奖」按钮，奖品名称开始随机滚动
2. **停止抽奖**: 再次点击按钮（此时按钮显示「停止抽奖」），滚动停止，随机选中一个奖品
3. **速度调节**: 使用滑轮控件调节滚动速度：
   - 滑轮向左（值越大）：滚动越慢
   - 滑轮向右（值越小）：滚动越快
4. **中奖结果**: 停止后，中奖奖品会以蓝色、更大字号加粗显示

## 主要文件说明

### src/components/LuckyDraw.vue
抽奖页面的核心组件，包含：
- 可爱风格的背景和动画装饰
- 标题显示区域
- 奖品滚动显示区域
- 速度调节滑块
- 开始/停止按钮

### src/router/index.js
路由配置，目前只有一个首页路由指向抽奖组件。

### src/main.js
应用入口文件，配置了 Vue Router 和 Element Plus。

### tailwind.config.js
Tailwind CSS 配置文件，配置了内容路径。

## 设计说明

- **可爱风格**: 使用粉色渐变背景 (`from-pink-100 via-purple-100 to-blue-100`)
- **动画效果**: 背景装饰元素有脉冲和弹跳动画
- **响应式设计**: 适配不同屏幕尺寸
- **交互体验**: 按钮悬停有缩放效果，状态变化有视觉反馈

## 开发说明

项目使用 Vite 作为开发服务器，支持：
- 热模块替换 (HMR)
- 快速编译
- 自动依赖优化

如需修改奖品列表，请编辑 `src/components/LuckyDraw.vue` 中的 `prizes` 数组。

## 许可证

MIT License
