# 🌸 花朵盛开动画 (Flower Blooming Animation)

一个精美的 Vue 3 项目，展示四种不同花朵的延时盛开动画，包括花瓣展开、雄蕊显露、颜色过渡等丰富效果。

## 🚀 功能特性

- **四种花朵类型**：玫瑰、向日葵、郁金香、莲花
- **丰富的动画效果**：
  - 花瓣分层展开动画
  - 雄蕊逐渐显露效果
  - 颜色平滑过渡变化
  - 花茎和叶子生长动画
- **交互控制**：
  - 自动启动动画
  - 播放/暂停控制
  - 重新开始动画
  - 延时依次盛开效果
- **响应式设计**：适配不同屏幕尺寸
- **美观的 UI**：使用 Tailwind CSS 和 Vuetify 构建

## 🛠 技术栈

- **框架**：Vue 3 + TypeScript
- **UI 组件库**：Vuetify 3
- **样式框架**：Tailwind CSS
- **路由**：Vue Router 4
- **构建工具**：Vite 5
- **语言**：TypeScript

## 📁 项目结构

```
flower-blooming-animation/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── vite.svg
│   │   └── vue.svg
│   ├── components/
│   │   ├── HelloWorld.vue          # 默认组件
│   │   ├── RoseFlower.vue          # 玫瑰花朵组件
│   │   ├── Sunflower.vue           # 向日葵组件
│   │   ├── TulipFlower.vue         # 郁金香组件
│   │   └── LotusFlower.vue         # 莲花组件
│   ├── plugins/
│   │   └── vuetify.ts              # Vuetify 配置
│   ├── router/
│   │   └── index.ts                # Vue Router 配置
│   ├── views/
│   │   └── FlowerGarden.vue        # 主页面视图
│   ├── App.vue                     # 根组件
│   ├── main.ts                     # 入口文件
│   └── style.css                   # 全局样式
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js               # PostCSS 配置
├── tailwind.config.js              # Tailwind CSS 配置
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts                  # Vite 配置
```

## 🔧 安装和运行

### 前置要求

- Node.js (建议版本 18+)
- npm 或 pnpm 或 yarn

### 安装依赖

```bash
npm install
```

### 开发模式运行

```bash
npm run dev
```

项目将在本地启动，默认地址为 `http://localhost:5173/`

### 构建生产版本

```bash
npm run build
```

构建产物将生成在 `dist` 目录中。

### 预览生产构建

```bash
npm run preview
```

## 🎨 花朵组件说明

### 1. 玫瑰 (RoseFlower.vue)
- 粉色渐变花瓣
- 三层花瓣结构（外、中、内）
- 金色雄蕊显露
- 绿色花茎和叶子

### 2. 向日葵 (Sunflower.vue)
- 金黄色花瓣
- 棕色花盘带有纹理
- 多层花瓣向外展开
- 高大的绿色花茎

### 3. 郁金香 (TulipFlower.vue)
- 紫色渐变花瓣
- 杯状花朵形态
- 简洁的花瓣结构
- 特有的宽大叶子

### 4. 莲花 (LotusFlower.vue)
- 粉白色渐变花瓣
- 漂浮在莲叶上
- 绿色莲蓬中心
- 多层花瓣优雅展开

## 📝 动画流程

1. **页面加载**：自动开始动画序列
2. **玫瑰**：0 秒后开始盛开
3. **向日葵**：2 秒后开始盛开
4. **郁金香**：4 秒后开始盛开
5. **莲花**：6 秒后开始盛开

每朵花的盛开过程包括：
- 花瓣从闭合到展开
- 颜色从深到浅过渡
- 雄蕊和花芯逐渐显露
- 花茎和叶子同步生长

## ⚙️ 自定义配置

### 修改动画速度

在 `FlowerGarden.vue` 中修改 `speed` 变量：
```typescript
const speed = ref(1) // 1 为正常速度，大于 1 加快，小于 1 减慢
```

### 修改延时时间

在 `FlowerGarden.vue` 中修改花朵数组的 `delay` 属性：
```typescript
const flowers = ref([
  { id: 1, type: 'rose', delay: 0 },      // 毫秒
  { id: 2, type: 'sunflower', delay: 2000 },
  { id: 3, type: 'tulip', delay: 4000 },
  { id: 4, type: 'lotus', delay: 6000 }
])
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目！

## 📄 许可证

MIT License

---

⭐ 如果这个项目对你有帮助，欢迎给个 Star！
