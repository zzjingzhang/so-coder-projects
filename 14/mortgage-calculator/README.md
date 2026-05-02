# 房贷计算器

一个功能完善的房贷计算器，支持公积金贷款和商业贷款两种模式，以及等额本息和等额本金两种还款方式。

## 功能特性

- 💰 支持输入房屋购买价格
- 📅 支持选择贷款年限（1-30年）
- 🏦 支持两种贷款类型：
  - 公积金贷款（年利率 3.3%）
  - 商业贷款（年利率 4.9%）
- 📊 支持两种还款方式：
  - 等额本息：每月还款金额固定
  - 等额本金：每月还款本金固定，利息逐月递减
- 🎯 实时计算并显示：
  - 每月还款金额
  - 贷款总额
  - 还款总额
  - 支付利息总额
  - 还款月数

## 技术栈

- **框架**: Vue 3
- **语言**: JavaScript
- **样式**: Tailwind CSS
- **UI 组件库**: Vuetify
- **路由**: Vue Router
- **打包工具**: Vite

## 项目结构

```
mortgage-calculator/
├── public/                    # 静态资源
│   ├── favicon.svg
│   └── icons.svg
├── src/                       # 源代码
│   ├── assets/               # 资源文件
│   │   ├── hero.png
│   │   ├── vite.svg
│   │   └── vue.svg
│   ├── components/           # 公共组件
│   │   └── HelloWorld.vue
│   ├── router/                # 路由配置
│   │   └── index.js
│   ├── views/                 # 页面视图
│   │   └── MortgageCalculator.vue
│   ├── App.vue                # 根组件
│   ├── main.js                # 入口文件
│   └── style.css              # 全局样式
├── .gitignore                 # Git 忽略文件
├── index.html                 # HTML 入口文件
├── package.json               # 项目配置
├── postcss.config.js          # PostCSS 配置
├── tailwind.config.js         # Tailwind CSS 配置
└── vite.config.js             # Vite 配置
```

## 安装和运行

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装依赖

```bash
cd mortgage-calculator
npm install
```

### 开发模式运行

```bash
npm run dev
```

运行后访问 `http://localhost:5173` 即可查看应用。

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 使用说明

1. 在"购买价格"输入框中输入房屋总价（单位：元）
2. 在"贷款年限"下拉框中选择贷款年限（1-30年）
3. 选择贷款类型：公积金贷款（3.3%）或商业贷款（4.9%）
4. 选择还款方式：等额本息或等额本金
5. 计算结果会实时显示在右侧面板中

## 计算公式

### 等额本息

每月还款金额 = [贷款本金 × 月利率 × (1 + 月利率) ^ 还款月数] / [(1 + 月利率) ^ 还款月数 - 1]

### 等额本金

每月还款金额 = (贷款本金 / 还款月数) + (贷款本金 - 已归还本金累计额) × 月利率

## 注意事项

- 计算结果仅供参考，实际还款金额以银行最终合同为准
- 本计算器假设利率在整个贷款期间保持不变
- 实际贷款可能涉及其他费用（如评估费、保险费等），本计算器未包含这些费用

## 许可证

MIT License
