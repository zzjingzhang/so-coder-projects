# 开普勒定律可视化模拟器

一个用于高中物理教学的交互式卫星轨道模拟工具，帮助学生直观理解开普勒三大定律。

## 项目简介

本项目是一个基于 Angular 框架开发的开普勒三大定律可视化教学工具。通过交互式地展示卫星在不同轨道类型的运动规律，让抽象的物理概念变得生动有趣。

## 功能特性

- **轨道可视化**：使用 Canvas 实时渲染卫星运动轨迹
- **多种轨道类型**：支持近地轨道 (LEO)、中地轨道 (MEO)、地球同步轨道 (GEO)、高椭圆轨道 (HEO)
- **参数调整**：可实时调整半长轴、偏心率、真近点角等轨道参数
- **实时数据**：显示卫星位置、速度、周期等实时数据
- **开普勒定律演示**：
  - 第一定律：椭圆定律（太阳位于焦点上）
  - 第二定律：面积定律（近地点速度快，远地点速度慢）
  - 第三定律：周期定律（T² ∝ a³）
- **响应式设计**：支持多种屏幕尺寸
- **深色主题**：太空主题配色，视觉效果出色

## 技术栈

- **框架**: Angular 21+
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **UI 组件库**: NG-ZORRO (Ant Design for Angular)
- **路由**: Angular Router
- **打包工具**: Angular CLI Application Builder

## 项目结构

```
kepler-laws-simulator/
├── src/
│   ├── app/
│   │   ├── components/           # 组件目录
│   │   │   ├── orbit-visualization/    # 轨道可视化组件
│   │   │   │   ├── orbit-visualization.component.ts
│   │   │   │   ├── orbit-visualization.component.html
│   │   │   │   └── orbit-visualization.component.css
│   │   │   ├── control-panel/          # 控制面板组件
│   │   │   │   ├── control-panel.component.ts
│   │   │   │   ├── control-panel.component.html
│   │   │   │   └── control-panel.component.css
│   │   │   └── data-display/           # 数据显示组件
│   │   │       ├── data-display.component.ts
│   │   │       ├── data-display.component.html
│   │   │       └── data-display.component.css
│   │   ├── core/                 # 核心模块
│   │   │   ├── types/              # 类型定义
│   │   │   │   └── physics.types.ts
│   │   │   └── services/           # 服务
│   │   │       ├── orbital-calculation.service.ts  # 轨道计算服务
│   │   │       └── simulation.service.ts       # 模拟服务
│   │   ├── pages/                # 页面组件
│   │   │   └── simulator/
│   │   │       ├── simulator.component.ts
│   │   │       ├── simulator.component.html
│   │   │       └── simulator.component.css
│   │   ├── app.ts
│   │   ├── app.html
│   │   ├── app.css
│   │   ├── app-module.ts
│   │   └── app-routing.module.ts
│   ├── main.ts
│   ├── index.html
│   └── styles.css
├── angular.json
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── README.md
```

## 核心物理模型

### 开普勒第一定律（椭圆定律）

所有行星绕太阳运动的轨道都是椭圆，太阳位于椭圆的一个焦点上。

**数学表达**：
- 轨道方程：r = a(1-e²)/(1+e·cosθ)
- 其中：
  - r：卫星到地球的距离
  - a：半长轴
  - e：偏心率
  - θ：真近点角

### 开普勒第二定律（面积定律）

在相等时间内，太阳和运动中的行星的连线所扫过的面积都是相等的。

**物理意义**：
- 近地点速度最快
- 远地点速度最慢
- 角动量守恒

### 开普勒第三定律（周期定律）

各个行星绕太阳公转周期的平方和它们的椭圆轨道半长轴的立方成正比。

**数学表达**：
- T² = (4π²/μ)·a³
- 其中：
  - T：轨道周期
  - a：半长轴
  - μ：地球引力常数 (3.986×10¹⁴ m³/s²)

## 安装与运行

### 环境要求

- Node.js 18+
- npm 或 yarn
- Angular CLI

### 安装步骤

1. **安装依赖**

```bash
npm install
```

2. **开发模式运行**

```bash
npm run start
# 或
ng serve
```

3. **访问应用**

打开浏览器访问：`http://localhost:4200`

### 构建生产版本

```bash
npm run build
# 或
ng build
```

构建产物将输出到 `dist/` 目录。

## 使用说明

### 预设轨道

点击左侧控制面板中的预设轨道，可快速选择以下典型轨道：

- **近地轨道 (LEO)**：距地面约 400 公里，国际空间站轨道
- **中地轨道 (MEO)**：距地面约 20200 公里，GPS 卫星轨道
- **地球同步轨道 (GEO)**：距地面约 35786 公里，通信卫星轨道
- **高椭圆轨道 (HEO)**：高偏心率轨道，闪电通信卫星轨道

### 参数调整

通过滑块控件可实时调整：

1. **半长轴 (km)**：控制轨道大小，范围 6771-50000 km
2. **偏心率**：控制轨道形状
   - e ≈ 0：圆形轨道
   - 0 < e < 0.3：低椭圆
   - 0.3 ≤ e < 0.7：中椭圆
   - e ≥ 0.7：高椭圆
3. **真近点角**：卫星在轨道上的位置角度

### 模拟控制

- **开始/暂停**：控制模拟运行状态
- **重置**：将卫星重置到初始位置
- **时间速度**：调整模拟速度（1x 到 10000x）

### 数据显示

右侧面板显示：

- **开普勒三大定律**：定律说明
- **轨道数据**：半长轴、偏心率、周期、近地点/远地点距离、平均速度
- **实时状态**：当前位置、当前速度、真近点角、模拟时间
- **速度对比**：近地点速度与远地点速度对比（演示面积定律）

## 开发指南

### 添加新的预设轨道

在 `src/app/core/types/physics.types.ts` 中修改 `PresetOrbits` 数组：

```typescript
export const PresetOrbits: PresetOrbit[] = [
  {
    name: '自定义轨道',
    description: '轨道描述',
    semiMajorAxis: 轨道半长轴（米）,
    eccentricity: 偏心率,
    altitude: 轨道高度,
  },
  // ... 更多轨道...
];
```

### 自定义物理参数

通过修改 `SimulationService` 来调整模拟参数：

```typescript
// 在 simulation.service.ts
private orbitalParams: OrbitalParameters = {
  semiMajorAxis: 6771e3,  // 默认半长轴
  eccentricity: 0.0001,    // 默认偏心率
  inclination: 0,
  trueAnomaly: 0,
  argumentOfPeriapsis: 0,
};
```

## 注意事项

1. **物理精度**：本模拟器基于牛顿万有引力定律和开普勒运动定律，适合教学用途，不考虑大气阻力、三体引力摄动等实际航天工程级别的影响。

2. **可视化缩放**：为了更好的显示效果，地球和轨道进行了适当的缩放，不代表真实比例。

3. **性能优化**：使用 requestAnimationFrame 进行高效动画循环，确保流畅的同时保持较低的 CPU 使用率。

## 浏览器兼容性

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 许可证

MIT License

## 技术支持

如有问题或建议，请提交 Issue 或 PR。

---

**教育意义**：本工具旨在帮助高中生物理学习理解行星运动规律，通过可视化交互方式让抽象的物理概念变得更加直观易懂。教师可以在课堂上使用此工具进行开普勒定律的演示教学。
