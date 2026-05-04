# 气体浓度模拟器 (Gas Concentration Simulator)

一个交互式的科学教育工具，用于可视化展示惰性气体（氦气）对氮气和氢气浓度的影响，基于理想气体定律。

## 项目概述

该模拟器支持两种不同条件下的气体变化模拟：
- **恒温恒容条件**：体积保持不变，添加惰性气体会增加总压力
- **恒温恒压条件**：压力保持不变，添加惰性气体会使体积增大

## 技术栈

- **框架**: Vue 3 + TypeScript
- **构建工具**: Vite
- **样式框架**: Tailwind CSS
- **UI 组件库**: PrimeVue
- **路由**: Vue Router
- **图表库**: Chart.js + vue-chartjs

## 项目结构

```
gas-concentration-simulator/
├── src/
│   ├── components/
│   │   ├── ParticleSimulation.vue    # 粒子动画组件
│   │   └── ConcentrationChart.vue    # 浓度曲线图组件
│   ├── composables/
│   │   └── useGasSimulation.ts       # 气体模拟逻辑
│   ├── router/
│   │   └── index.ts                  # 路由配置
│   ├── types/
│   │   └── gas.ts                    # 类型定义
│   ├── views/
│   │   └── GasSimulator.vue          # 主视图组件
│   ├── styles/
│   │   └── main.css                  # 全局样式
│   ├── App.vue                       # 根组件
│   └── main.ts                       # 入口文件
├── index.html                        # HTML 模板
├── package.json                      # 依赖配置
├── tsconfig.json                     # TypeScript 配置
├── tsconfig.node.json                # Node TypeScript 配置
├── vite.config.ts                    # Vite 配置
├── tailwind.config.js                # Tailwind CSS 配置
├── postcss.config.js                 # PostCSS 配置
└── README.md                         # 项目文档
```

## 核心功能

### 1. 双场景模拟
- **恒温恒容模式**：体积恒定，添加氦气会增加总压力，但 N₂ 和 H₂ 浓度保持不变
- **恒温恒压模式**：压力恒定，添加氦气会使体积增大，导致 N₂ 和 H₂ 浓度降低

### 2. 实时粒子动画
- Canvas 驱动的粒子动画系统
- 不同气体使用不同颜色表示：
  - 蓝色 (🔵)：N₂ 氮气
  - 红色 (🔴)：H₂ 氢气
  - 绿色 (🟢)：He 氦气
- 粒子碰撞边界时自动反弹
- 根据物质的量比例动态调整粒子数量

### 3. 浓度变化曲线图
- 实时记录并绘制浓度变化
- 支持悬停查看详细数值
- 清晰的图例和坐标轴说明

### 4. 控制系统
- 一键添加 0.1mol 氦气
- 重置系统到初始状态
- 切换不同模拟场景

## 科学原理

### 理想气体定律
```
PV = nRT
```
- P: 压力 (Pressure)
- V: 体积 (Volume)
- n: 物质的量 (Amount of substance)
- R: 气体常数 (Gas constant)
- T: 温度 (Temperature)

### 浓度计算
```
C = n / V
```
浓度 = 物质的量 / 体积

### 两种条件的区别

| 条件 | 体积 | 压力 | N₂/H₂ 浓度 |
|------|------|------|-----------|
| 恒温恒容 | 不变 | 增加 | 不变 |
| 恒温恒压 | 增大 | 不变 | 降低 |

## 安装和运行

### 环境要求
- Node.js >= 16.0.0
- npm >= 7.0.0 或 yarn >= 1.22.0

### 安装依赖

```bash
# 进入项目目录
cd gas-concentration-simulator

# 使用 npm 安装
npm install

# 或使用 yarn 安装
yarn install
```

### 开发模式

```bash
# 使用 npm
npm run dev

# 或使用 yarn
yarn dev
```

项目将在 `http://localhost:3000` 启动，浏览器会自动打开。

### 构建生产版本

```bash
# 使用 npm
npm run build

# 或使用 yarn
yarn build
```

构建产物将输出到 `dist` 目录。

### 预览生产版本

```bash
# 使用 npm
npm run preview

# 或使用 yarn
yarn preview
```

## 使用说明

1. **选择模拟场景**：点击顶部的"恒温恒容"或"恒温恒压"按钮切换场景
2. **观察初始状态**：查看粒子动画和初始浓度数值
3. **添加氦气**：点击"添加 0.1mol He"按钮向系统中添加氦气
4. **观察变化**：
   - 恒温恒容：注意观察压力增加，但 N₂/H₂ 浓度保持不变
   - 恒温恒压：注意观察体积增大，N₂/H₂ 浓度降低
5. **查看图表**：底部曲线图记录了每次添加氦气后的浓度变化
6. **重置系统**：点击"重置系统"按钮恢复到初始状态

## 设计特点

- **响应式布局**：适配各种屏幕尺寸
- **现代化 UI**：卡片式布局，毛玻璃效果
- **清晰的视觉层次**：不同功能区域分隔明确
- **统一的配色方案**：
  - 浅色渐变背景
  - 蓝色系：N₂ 氮气
  - 红色系：H₂ 氢气
  - 绿色系：He 氦气
- **优雅的动画**：粒子运动平滑，界面过渡自然

## 开发说明

### 自定义初始条件

在 `src/composables/useGasSimulation.ts` 中可以修改初始参数：

```typescript
const initialMoles: GasMoles = {
  N2: 1.0,   // 初始氮气物质的量 (mol)
  H2: 2.0,   // 初始氢气物质的量 (mol)
  He: 0.0    // 初始氦气物质的量 (mol)
}

const temperature = ref(298)  // 温度 (K)
const baseVolume = ref(10)    // 初始体积 (L)
const basePressure = ref(1)   // 初始压力 (atm)
```

### 修改粒子数量

在 `src/components/ParticleSimulation.vue` 中调整 `maxParticles` 值：

```typescript
const maxParticles = 120  // 最大粒子数量
```

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

---

**注意**：这是一个教育性质的模拟工具，旨在帮助理解理想气体定律和惰性气体对浓度的影响。实际气体行为可能更加复杂。
