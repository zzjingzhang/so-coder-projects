# 运势查询

一个基于中国传统命理学的2025年运势查询网页应用。

## 项目简介

输入您的农历生日，即可获取2025年（乙巳蛇年）的运势走向描述，包括整体运势、感情运势、财运、事业运势和健康运势五大方面。

## 技术栈

- **框架**: Vue 3
- **语言**: JavaScript
- **样式**: Tailwind CSS v4
- **UI组件库**: PrimeVue
- **路由**: Vue Router
- **打包工具**: Vite

## 项目结构

```
fortune-teller/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── vite.svg
│   │   └── vue.svg
│   ├── components/
│   │   └── HelloWorld.vue
│   ├── utils/
│   │   └── fortune.js          # 运势计算逻辑
│   ├── views/
│   │   └── HomeView.vue        # 主页面视图
│   ├── App.vue                  # 根组件
│   ├── main.js                  # 入口文件
│   └── style.css                # 全局样式（含Tailwind）
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

## 功能特性

- 🎨 清新的色彩搭配（翡翠绿、青绿、青色渐变背景）
- 🔤 超大字体设计，易于阅读
- 🐉 基于中国传统命理学（十二生肖、天干地支）
- 📅 支持农历生日输入
- 🌟 包含整体、感情、财运、事业、健康五大运势维度
- 📱 响应式设计，适配不同屏幕尺寸

## 安装与运行

### 前置要求

- Node.js (版本 16 或更高)
- npm 或 pnpm 或 yarn

### 安装依赖

```bash
cd fortune-teller
npm install
```

### 开发模式运行

```bash
npm run dev
```

项目将在本地启动，默认访问地址为 `http://localhost:5173`（如果端口被占用，会自动切换到其他端口）。

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

1. 在页面中输入您的农历生日年份（如：1990）
2. 选择农历生日月份（1-12月）
3. 选择农历生日日期（1-30日）
4. 点击"查看运势"按钮
5. 查看您的2025年运势解析

## 命理说明

本应用基于中国传统命理学原理：

- **十二生肖**: 根据出生年份确定生肖（鼠、牛、虎、兔、龙、蛇、马、羊、猴、鸡、狗、猪）
- **太岁关系**: 2025年为乙巳蛇年，根据生肖与太岁巳蛇的关系（三合、六合、相冲、相害、相刑等）确定运势等级
- **五行属性**: 结合生肖的五行属性（金、木、水、火、土）进行综合分析

**注意**: 本应用仅供娱乐参考，请勿过度迷信。

## 开发说明

### 主要文件说明

- `src/utils/fortune.js`: 核心运势计算逻辑，包含生肖计算、运势等级判断、运势文本生成
- `src/views/HomeView.vue`: 主页面组件，包含生日输入表单和运势展示
- `src/main.js`: 应用入口，配置 Vue Router 和 PrimeVue
- `src/style.css`: 全局样式，包含 Tailwind CSS v4 配置

### 自定义运势文本

如需修改或扩展运势文本内容，请编辑 `src/utils/fortune.js` 文件中的相关文本数组。

## License

MIT

## 贡献

欢迎提交 Issue 和 Pull Request！
