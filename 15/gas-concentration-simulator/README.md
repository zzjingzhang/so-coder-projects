# 惰性气体浓度影响模拟器

一个基于 React 的可视化模拟工具，用于展示在不同热力学条件下惰性气体（如氦气）添加对其他气体浓度的影响。

## 功能特性

- **恒温恒容模拟**：展示体积不变时，添加惰性气体对气体浓度的影响
- **恒温恒压模拟**：展示压强不变时，添加惰性气体对气体浓度的影响
- **交互控制**：通过滑块调节初始气体量和添加的氦气量
- **粒子动画**：直观展示气体分子运动
- **浓度图表**：对比添加前后各气体浓度变化
- **原理说明**：详细解释理想气体状态方程和浓度变化原理

## 技术栈

- **前端框架**：React 18
- **开发语言**：TypeScript
- **样式方案**：Tailwind CSS
- **UI 组件库**：Material UI (MUI)
- **路由管理**：React Router v6
- **图表库**：Recharts
- **构建工具**：Vite

## 项目结构

```
gas-concentration-simulator/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── Layout.tsx           # 全局布局组件（导航栏、页脚）
│   │   ├── GasContainer.tsx     # 气体容器可视化组件
│   │   ├── ConcentrationChart.tsx # 浓度对比图表组件
│   │   └── ControlPanel.tsx     # 控制面板组件
│   ├── pages/
│   │   ├── HomePage.tsx         # 首页
│   │   ├── ConstantVolumePage.tsx # 恒温恒容模拟页面
│   │   └── ConstantPressurePage.tsx # 恒温恒压模拟页面
│   ├── types/
│   │   └── index.ts             # TypeScript 类型定义
│   ├── App.tsx                   # 主应用组件（路由配置）
│   ├── main.tsx                  # 应用入口
│   └── index.css                 # 全局样式
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── tailwind.config.ts
├── vite.config.ts
├── eslint.config.js
├── index.html
└── README.md
```

## 核心原理

### 理想气体状态方程

```
PV = nRT
```

- **P**: 压强
- **V**: 体积
- **n**: 物质的量（mol）
- **R**: 气体常数
- **T**: 热力学温度

### 物质的量浓度

```
c = n / V
```

- **c**: 浓度（mol/L）
- **n**: 物质的量
- **V**: 体积

### 两种条件对比

| 条件 | 体积 V | 各气体 n | 总压强 P | 浓度 c = n/V |
|------|---------|----------|----------|---------------|
| 恒温恒容 | 不变 | 不变 | 升高 | **不变** |
| 恒温恒压 | 增大 | 不变 | 不变 | **降低** |

## 安装与运行

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

项目将在 `http://localhost:5173` 启动（端口可能因占用情况自动调整）。

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

1. **首页**：了解两种模拟条件的区别，查看科学原理说明
2. **选择模拟模式**：点击"恒温恒容"或"恒温恒压"进入对应模拟页面
3. **调节参数**：
   - 使用滑块调节初始氮气量和氢气量
   - 调节要添加的氦气量
   - 可以开启/关闭粒子动画效果
4. **执行模拟**：
   - 点击"添加氦气"按钮执行模拟
   - 观察左侧"添加氦气前"和右侧"添加氦气后"的对比
   - 查看浓度变化图表
5. **重置模拟**：点击"重置"按钮恢复初始状态

## 交互功能

- **滑块控制**：实时调节气体量参数
- **动画开关**：控制粒子运动动画的播放/暂停
- **添加氦气**：一次性执行添加操作，显示最终结果
- **重置**：恢复到初始状态，可重新配置参数

## 开发说明

### 目录规范

- `src/components/`: 可复用 UI 组件
- `src/pages/`: 页面级组件
- `src/types/`: TypeScript 类型定义
- `src/hooks/`: 自定义 Hooks（如需要）
- `src/utils/`: 工具函数（如需要）

### 颜色约定

- 氮气 (N₂): `#3b82f6` (蓝色)
- 氢气 (H₂): `#10b981` (绿色)
- 氦气 (He): `#f59e0b` (琥珀色)
- 主色调: `#1e3a5f` (深蓝色)

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！
