# 化学平衡原理可视化模拟系统

一个基于 Angular 的交互式化学平衡模拟应用，展示 2NO₂ ⇌ N₂O₄ 反应中的勒沙特列原理。

## 项目简介

本项目通过可视化方式演示化学反应平衡原理，用户可以：
- 调节反应温度，观察温度对平衡的影响
- 添加反应物或生成物，观察浓度变化对平衡的影响
- 实时观察分子运动动画
- 监测平衡常数、反应商、浓度分布等关键数据

### 反应原理

**反应方程式：** 2NO₂ ⇌ N₂O₄

- **NO₂（二氧化氮）**：棕红色气体
- **N₂O₄（四氧化二氮）**：无色气体
- **反应焓变**：ΔH = -57.2 kJ/mol（放热反应）

### 勒沙特列原理演示

1. **温度影响**：
   - 升高温度：平衡向吸热方向（逆向）移动，NO₂ 增加，颜色变深
   - 降低温度：平衡向放热方向（正向）移动，N₂O₄ 增加，颜色变浅

2. **浓度影响**：
   - 增加 NO₂ 浓度：平衡正向移动，生成更多 N₂O₄
   - 增加 N₂O₄ 浓度：平衡逆向移动，生成更多 NO₂

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Angular | 21.2 | 前端框架 |
| TypeScript | 5.9 | 编程语言 |
| Tailwind CSS | 4.2 | 样式框架 |
| PrimeNG | 最新 | UI 组件库 |
| Angular Router | 21.2 | 路由管理 |
| Angular CLI | 21.2 | 构建工具 |

## 项目结构

```
chemical-equilibrium-simulator/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── control-panel/           # 控制面板组件
│   │   │   │   ├── control-panel.component.ts
│   │   │   │   ├── control-panel.component.html
│   │   │   │   └── control-panel.component.css
│   │   │   ├── molecule-visualization/  # 分子可视化组件
│   │   │   │   ├── molecule-visualization.component.ts
│   │   │   │   ├── molecule-visualization.component.html
│   │   │   │   └── molecule-visualization.component.css
│   │   │   ├── data-display/             # 数据展示组件
│   │   │   │   ├── data-display.component.ts
│   │   │   │   ├── data-display.component.html
│   │   │   │   └── data-display.component.css
│   │   │   └── simulator/                # 主模拟器组件
│   │   │       ├── simulator.component.ts
│   │   │       ├── simulator.component.html
│   │   │       └── simulator.component.css
│   │   ├── services/
│   │   │   └── chemical-equilibrium.service.ts  # 核心逻辑服务
│   │   ├── app.ts
│   │   ├── app.html
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── main.ts
│   ├── index.html
│   └── styles.css
├── angular.json
├── package.json
├── tsconfig.json
├── postcss.config.js
└── README.md
```

## 核心功能模块

### 1. ChemicalEquilibriumService（核心服务）

位于 `src/app/services/chemical-equilibrium.service.ts`

**主要功能：**
- 计算平衡常数 K（基于范特霍夫方程）
- 计算反应商 Q 并与 K 比较确定反应方向
- 模拟分子运动和碰撞反应
- 管理反应状态（温度、浓度、分子列表等）

**关键算法：**

范特霍夫方程计算温度对平衡常数的影响：
```
ln(K₂/K₁) = -ΔH/R × (1/T₂ - 1/T₁)
```

反应商计算：
```
Q = [N₂O₄] / [NO₂]²
```

### 2. ControlPanelComponent（控制面板）

位于 `src/app/components/control-panel/`

**功能：**
- 温度滑块控制（200K - 500K）
- 显示开尔文和摄氏度双单位
- 添加 NO₂ 分子
- 添加 N₂O₄ 分子
- 重置模拟

### 3. MoleculeVisualizationComponent（分子可视化）

位于 `src/app/components/molecule-visualization/`

**功能：**
- 使用 Canvas 绘制分子动画
- NO₂ 显示为棕红色圆形
- N₂O₄ 显示为无色椭圆形
- 实时更新分子位置和碰撞检测
- 容器背景色随 NO₂ 浓度变化而变深/变浅
- 显示当前反应状态指示

### 4. DataDisplayComponent（数据展示）

位于 `src/app/components/data-display/`

**功能：**
- 实时显示温度（K 和 °C）
- 显示平衡常数 K
- 显示反应商 Q
- 指示当前反应状态（平衡/正向/逆向）
- 浓度分布进度条
- 颜色强度指示
- 参数说明表格

## 安装与运行

### 环境要求

- Node.js >= 18.x
- npm >= 9.x
- Angular CLI >= 17.x

### 安装依赖

```bash
cd chemical-equilibrium-simulator
npm install
```

### 启动开发服务器

```bash
npm start
# 或
ng serve
```

启动后，浏览器访问 `http://localhost:4200`

### 构建生产版本

```bash
npm run build
# 或
ng build
```

构建产物将输出到 `dist/` 目录。

## 使用指南

### 温度控制

1. 使用滑块调节温度，范围：200K (-73°C) 至 500K (227°C)
2. 标准温度为 298K (25°C)
3. **观察效果：**
   - 升高温度 → 平衡逆向移动 → NO₂ 增加 → 颜色变深
   - 降低温度 → 平衡正向移动 → N₂O₄ 增加 → 颜色变浅

### 浓度控制

1. **添加 NO₂：**
   - 设置要添加的分子数量（1-50）
   - 点击"添加"按钮
   - 观察：平衡正向移动，生成更多 N₂O₄

2. **添加 N₂O₄：**
   - 设置要添加的分子数量（1-30）
   - 点击"添加"按钮
   - 观察：平衡逆向移动，生成更多 NO₂

### 数据解读

- **平衡常数 K**：仅与温度有关，温度升高 K 减小（因为是放热反应）
- **反应商 Q**：与当前浓度有关，Q < K 时正向反应，Q > K 时逆向反应
- **颜色强度**：与 NO₂ 浓度成正比，浓度越高颜色越深

### 重置模拟

点击"重置模拟"按钮，恢复到初始状态（298K，100个 NO₂ 分子）。

## 开发说明

### 组件通信

所有组件通过 `ChemicalEquilibriumService` 进行状态管理：
- 服务使用 RxJS BehaviorSubject 维护反应状态
- 组件通过订阅 `state$`  Observable 获取状态更新
- 组件调用服务方法修改状态（如 `setTemperature()`、`addNo2()`）

### 动画循环

分子动画使用 `requestAnimationFrame` 实现：
- 每帧更新分子位置
- 检测边界碰撞并反弹
- 随机触发分子反应（结合或分解）
- 更新反应状态

### 响应式设计

使用 Tailwind CSS 的响应式类：
- 移动端：单列布局
- 桌面端：左侧控制面板，右侧可视化和数据面板

## 扩展建议

1. **添加更多反应类型**：如 Haber 过程（N₂ + 3H₂ ⇌ 2NH₃）
2. **添加压力影响**：模拟压力对气体反应平衡的影响
3. **添加催化剂演示**：显示催化剂如何加速反应但不影响平衡
4. **添加能量分布图**：显示活化能和反应焓变
5. **添加实时图表**：使用 Chart.js 显示浓度随时间变化曲线
6. **添加声音效果**：分子碰撞时播放音效

## 许可证

MIT License

## 联系方式

如有问题或建议，请提交 Issue。
