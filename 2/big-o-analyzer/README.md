# Big-O Notation Analyzer

一个用于可视化和比较算法时间复杂度的交互式 Web 应用程序。

## 功能特性

- **交互式折线图**：可视化展示六种常见的 Big-O 复杂度（O(1)、O(log n)、O(n)、O(n²)、O(2ⁿ)、O(n!)）
- **实时计算器**：输入任意整数 n，实时计算并显示所有复杂度的具体数值
- **递归阶乘函数**：使用递归算法实现阶乘计算
- **响应式设计**：适配不同屏幕尺寸
- **深色主题**：现代深色界面设计

## 项目结构

```
big-o-analyzer/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── BigOChart.tsx        # 单个折线图组件
│   │   └── CalculatorPanel.tsx  # 计算器面板组件
│   ├── utils/
│   │   └── calculations.ts      # 计算工具函数（含递归阶乘）
│   ├── App.tsx                   # 主应用组件
│   ├── main.tsx                  # 应用入口
│   └── index.css                 # 全局样式
├── index.html                    # HTML 模板
├── package.json                  # 项目配置
├── tsconfig.json                 # TypeScript 配置
├── vite.config.ts                # Vite 配置
├── tailwind.config.js            # Tailwind CSS 配置
└── postcss.config.js             # PostCSS 配置
```

## 技术栈

- **框架**：React 18.3
- **语言**：TypeScript 5.7
- **样式**：Tailwind CSS 3.4
- **UI 组件**：原生 Tailwind 组件（可扩展 shadcn/ui）
- **路由**：React Router 6.28
- **图表**：Recharts 2.15
- **图标**：Lucide React 0.483
- **打包工具**：Vite 6.2

## Big-O 复杂度说明

| 复杂度 | 名称 | 示例算法 | 描述 |
|--------|------|----------|------|
| O(1) | 常数时间 | 数组访问 | 最佳情况，执行时间恒定 |
| O(log n) | 对数时间 | 二分查找 | 执行时间随 n 对数增长 |
| O(n) | 线性时间 | 线性搜索 | 执行时间与 n 成正比 |
| O(n²) | 平方时间 | 冒泡排序 | 执行时间与 n² 成正比 |
| O(2ⁿ) | 指数时间 | 斐波那契递归 | 执行时间指数级增长 |
| O(n!) | 阶乘时间 | 旅行商问题 | 执行时间阶乘级增长（最坏） |

## 如何启动项目

### 前置要求

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

### 代码检查

```bash
npm run lint
```

## 使用说明

1. **查看图表**：左窗格显示六种 Big-O 复杂度的交互式折线图，鼠标悬停可查看具体数值。

2. **使用计算器**：
   - 在右窗格的输入框中输入任意非负整数 n
   - 实时查看所有复杂度的计算结果
   - 观察递归阶乘函数的计算过程

3. **复杂度比较**：
   - O(1) < O(log n) < O(n) < O(n²) < O(2ⁿ) < O(n!)
   - 注意：当 n > 15 时，阶乘和指数值会变得极其巨大

## 核心算法

### 递归阶乘函数

```typescript
export const recursiveFactorial = (n: number): number => {
  if (n < 0) return NaN
  if (n === 0 || n === 1) return 1
  return n * recursiveFactorial(n - 1)
}
```

### 复杂度计算

```typescript
export const calculateBigOValues = (n: number) => {
  const factorial = recursiveFactorial(n)
  return {
    constant: 1,
    logN: n > 0 ? Math.log2(n) : NaN,
    linear: n,
    quadratic: n * n,
    exponential: Math.pow(2, n),
    factorial: factorial,
  }
}
```

## 许可证

MIT License
