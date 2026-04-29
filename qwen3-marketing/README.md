# Qwen 3 营销网站

一个展示阿里巴巴研发的 Qwen 3 大语言模型的单页营销网站。

## 项目结构

```
qwen3-marketing/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── vite.svg
│   │   └── vue.svg
│   ├── components/
│   │   ├── Header.vue        # 固定顶部导航栏
│   │   ├── Hero.vue          # 首页英雄区块
│   │   ├── Features.vue      # 核心特性区块
│   │   ├── Architecture.vue  # 双路径架构区块
│   │   └── Performance.vue   # 性能展示区块
│   ├── data/
│   │   └── qwen3Data.js      # Qwen 3 模型数据
│   ├── App.vue               # 根组件
│   ├── main.js               # 入口文件
│   └── style.css             # 全局样式（含 Tailwind 配置）
├── .gitignore
├── README.md
├── index.html
├── package.json
└── vite.config.js
```

## 技术栈

- **框架**: Vue 3
- **语言**: JavaScript
- **样式**: Tailwind CSS 4
- **UI 组件库**: Naive UI
- **路由**: Vue Router
- **打包工具**: Vite

## 页面模块

### 1. Header（固定在页面顶部）
- 显示模型名称 "Qwen 3"
- 提供指向 Features、Architecture、Performance 区块的锚点导航
- 桌面端显示 "通义" 与 "Qwen Chat" 两个外部链接按钮
- 移动端提供折叠菜单实现同样功能
- 所有链接在新标签页打开

### 2. Hero 区块
- 大标题 "Introducing Qwen 3"
- 简要描述模型的先进特性和训练规模
- 两个 CTA 按钮（分别链接到通义和 Qwen Chat）
- 三项关键统计：
  - 支持语言数量：110+
  - 训练 Token 数量：50T
  - 模型尺寸：0.6B / 235B

### 3. Features 区块
- 混合推理系统展示（快速响应模式和详细思考模式）
- MoE 架构描述
- 模型能力列表网格：
  - 增强推理
  - 先进编码
  - 数学求解
  - 多语言支持
  - 上下文理解
  - 知识整合

### 4. Architecture 区块
- 双路径架构说明（Dense model 与 MoE model）
- 可选模型规模卡片展示：
  - 0.6B（Dense 架构，轻量级部署）
  - 235B（MoE 架构，企业级应用）

### 5. Performance 区块
- 三大基准成绩展示：
  - 编码能力：95.2/100
  - 数学能力：93.7/100
  - 推理能力：94.5/100
- 竞争对手对比：
  - OpenAI o3
  - Google Gemini 2.5 Pro
- 性能亮点描述

## 设计特点

- **配色方案**: 以紫色 (#7e22ce) 为主色调
- **响应式设计**: 完美适配桌面端和移动端
- **动画效果**: 平滑滚动、悬停效果
- **组件化**: 所有模块独立封装，易于维护

## 快速开始

### 安装依赖

```bash
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

## 数据文件

模型数据位于 `src/data/qwen3Data.js`，包含以下字段：

- `modelName`: 模型名称
- `developer`: 开发者
- `description`: 模型描述
- `trainingInfo`: 训练信息（支持语言数量、训练 Token、模型尺寸）
- `architecture`: 架构信息（双路径组件、模型变体）
- `keyFeatures`: 核心特性（混合推理系统、MoE 架构、能力列表）
- `performance`: 性能数据（基准成绩、竞争对手对比、亮点）
- `externalLinks`: 外部链接（通义、Qwen Chat）

## 自定义

### 修改主题色

在 `src/style.css` 中修改 `@theme` 块中的颜色变量：

```css
@theme {
  --color-purple-700: #7e22ce; /* 主色调 */
  /* 其他颜色变量... */
}
```

### 更新模型数据

编辑 `src/data/qwen3Data.js` 文件中的数据对象。

## 许可证

本项目仅供展示用途。

## 联系方式

- 通义: https://tongyi.aliyun.com/
- Qwen Chat: https://chat.qwen.ai/