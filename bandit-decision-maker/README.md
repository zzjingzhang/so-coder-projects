# Bandit Decision Maker (多臂老虎机决策助手)

一个使用多臂老虎机算法（汤普森采样）来帮助解决重复日常决策问题的 Web 应用程序。

## 项目简介

在日常生活中，我们经常面临重复的决策问题，比如：
- 今天午餐吃什么？
- 哪家咖啡店的咖啡最好？
- 哪个学习方法最有效？

Bandit Decision Maker 使用**汤普森采样（Thompson Sampling）**算法，通过贝叶斯推理来平衡探索（尝试新选项）和利用（选择已知好的选项），帮助您在反复尝试中找到最优决策。

## 核心功能

- 🎯 **创建决策问题**：定义您需要解决的决策问题和可选方案
- 🎰 **多臂老虎机算法**：后台使用汤普森采样算法智能推荐下一个尝试的选项
- 📊 **多种反馈类型**：
  - 标量评分（1-100）
  - 好/坏二元反馈
  - 星标评分（1-5 星）
- 📈 **实时学习**：每次反馈都会更新算法对每个选项的信念
- 🏆 **智能排名**：根据期望价值动态排序所有选项
- 💾 **本地存储**：所有数据保存在浏览器本地，无需后端服务器

## 技术栈

- **框架**: Vue 3 (Composition API)
- **语言**: JavaScript
- **样式**: Tailwind CSS 4
- **UI 组件库**: PrimeVue
- **路由**: Vue Router 4
- **打包工具**: Vite
- **算法**: 汤普森采样（Thompson Sampling）

## 项目结构

```
bandit-decision-maker/
├── src/
│   ├── router/
│   │   └── index.js          # 路由配置
│   ├── types/
│   │   └── index.js          # 类型定义
│   ├── utils/
│   │   └── thompsonSampling.js  # 汤普森采样算法实现
│   ├── views/
│   │   ├── HomeView.vue          # 首页（问题列表）
│   │   ├── ProblemCreateView.vue # 创建问题页面
│   │   └── ProblemDetailView.vue # 问题详情页面
│   ├── App.vue               # 主应用组件
│   ├── main.js               # 应用入口
│   └── style.css             # 全局样式
├── dist/                     # 构建输出目录
├── index.html                # HTML 模板
├── package.json              # 依赖配置
├── postcss.config.js         # PostCSS 配置
├── tailwind.config.js        # Tailwind CSS 配置
└── vite.config.js            # Vite 配置
```

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

应用将在 `http://localhost:5173` 启动（端口可能因实际情况调整）。

### 生产构建

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 预览生产构建

```bash
npm run preview
```

## 核心算法：汤普森采样

### 算法原理

汤普森采样是一种概率决策算法，使用贝叶斯推理来解决探索-利用困境：

1. **先验分布**：每个选项（臂）的奖励分布用 Beta 分布建模，初始参数 α=1, β=1（均匀分布）
2. **采样**：每次决策时，从每个选项的 Beta(α, β) 分布中采样一个值
3. **选择**：选择采样值最大的选项进行尝试
4. **更新**：根据获得的反馈更新对应选项的 α 和 β 参数

### Beta 分布更新规则

- 对于正反馈（奖励接近 1）：α += 奖励值
- 对于负反馈（奖励接近 0）：β += (1 - 奖励值)

### 反馈归一化

不同类型的反馈会被归一化到 [0, 1] 区间：
- **标量(1-100)**：(反馈 - 1) / 99
- **好/坏**：好=1，坏=0
- **星标(1-5)**：(星数 - 1) / 4

## 使用示例

1. **创建问题**：点击"创建新问题"，输入问题名称、描述、可选方案和反馈类型
2. **开始测试**：进入问题详情页，点击"推荐下一个选项"
3. **提供反馈**：尝试推荐的选项后，提供评分反馈
4. **观察学习**：算法会根据反馈更新，多次测试后会倾向于推荐更好的选项
5. **查看排名**：在选项状态排名中查看当前算法认为的最佳选项

## 浏览器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 数据存储

所有数据保存在浏览器的 `localStorage` 中，清除浏览器数据会导致数据丢失。

## 开发说明

### 添加新的反馈类型

1. 在 `src/types/index.js` 中添加新的反馈类型常量
2. 在 `src/utils/thompsonSampling.js` 的 `normalizeFeedback` 函数中添加归一化逻辑
3. 在 `src/views/ProblemCreateView.vue` 和 `ProblemDetailView.vue` 中添加对应的 UI 组件

### 自定义算法

核心算法位于 `src/utils/thompsonSampling.js`，可以修改 `selectNextArm` 函数来实现不同的多臂老虎机算法（如 ε-贪心、UCB 等）。

## License

MIT

## 贡献

欢迎提交 Issue 和 Pull Request！
