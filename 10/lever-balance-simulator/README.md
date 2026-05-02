# 杠杆平衡模拟器

一个基于Angular框架开发的物理教学工具，用于模拟和验证杠杆平衡原理。

## 项目简介

杠杆平衡模拟器是一个交互式的物理教学应用，允许用户在杠杆的左右两侧放置不同重量的物体，观察力矩平衡原理。应用通过直观的可视化效果和详细的力矩计算，帮助用户理解杠杆平衡的物理原理。

### 主要功能

- **重物选择**：支持从1N到5N的重物选择
- **位置放置**：可将重物放在杠杆的不同位置（1m-5m）
- **实时计算**：实时计算并显示左右两侧的力矩
- **可视化效果**：当力矩不平衡时，杠杆会向重的一侧倾斜
- **详细说明**：包含杠杆平衡原理的详细解释和实验建议

## 技术栈

- **框架**：Angular 21+
- **语言**：TypeScript
- **样式**：Tailwind CSS 4.0
- **UI组件库**：PrimeNG 21+
- **路由**：Angular Router
- **打包工具**：Angular CLI Application Builder

## 项目结构

```
lever-balance-simulator/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── lever-simulator/
│   │   │       ├── lever-simulator.component.ts    # 主组件逻辑
│   │   │       ├── lever-simulator.component.html  # 组件模板
│   │   │       └── lever-simulator.component.css   # 组件样式
│   │   ├── app.ts           # 根组件
│   │   ├── app.html         # 根组件模板
│   │   ├── app.css          # 根组件样式
│   │   ├── app.config.ts    # 应用配置
│   │   └── app.routes.ts    # 路由配置
│   ├── index.html           # 主HTML文件
│   ├── main.ts              # 应用入口
│   └── styles.css           # 全局样式
├── angular.json             # Angular配置
├── package.json             # 项目依赖
├── tailwind.config.js       # Tailwind CSS配置
├── postcss.config.js        # PostCSS配置
├── tsconfig.json            # TypeScript配置
├── tsconfig.app.json        # 应用TypeScript配置
├── tsconfig.spec.json       # 测试TypeScript配置
└── README.md                # 项目文档
```

## 核心组件说明

### LeverSimulatorComponent

主模拟器组件，包含以下核心功能：

#### 属性
- `availableForces`：可用的力值选项 [1, 2, 3, 4, 5]
- `selectedForce`：当前选择的力值（响应式信号）
- `leftWeights`：左侧重物列表（响应式信号）
- `rightWeights`：右侧重物列表（响应式信号）
- `leftTorque`：左侧总力矩（计算属性）
- `rightTorque`：右侧总力矩（计算属性）
- `torqueDifference`：力矩差（计算属性）
- `isBalanced`：是否平衡（计算属性）
- `leverAngle`：杠杆倾斜角度（计算属性）

#### 方法
- `addLeftWeight(position)`：添加重物到左侧
- `addRightWeight(position)`：添加重物到右侧
- `removeLeftWeight(id)`：移除左侧重物
- `removeRightWeight(id)`：移除右侧重物
- `resetAll()`：重置所有重物
- `getWeightPositionPercent(position)`：获取重物位置百分比
- `getTorqueCalculationText(side)`：获取力矩计算文本

#### 物理原理

**力矩公式**：
```
τ = F × d
```
其中：
- τ = 力矩（牛顿·米，N·m）
- F = 力（牛顿，N）
- d = 力臂（米，m）

**平衡条件**：
```
τ左 = τ右
F左1 × d左1 + F左2 × d左2 + ... = F右1 × d右1 + F右2 × d右2 + ...
```

## 安装和运行

### 前置要求

确保你的开发环境已安装以下软件：
- Node.js (推荐使用 v18 或更高版本)
- npm (通常随 Node.js 一起安装)
- Angular CLI (版本 17 或更高)

### 安装依赖

1. 进入项目目录：
```bash
cd lever-balance-simulator
```

2. 安装项目依赖：
```bash
npm install
```

### 开发服务器

运行开发服务器：
```bash
ng serve
```

或者使用 npm 脚本：
```bash
npm start
```

应用将在 `http://localhost:4200/` 启动。当你修改任何源文件时，应用会自动重新加载。

### 构建项目

构建生产版本：
```bash
ng build
```

构建产物将输出到 `dist/` 目录。

### 运行测试

执行单元测试：
```bash
ng test
```

## 使用指南

### 基本操作

1. **选择重物**：点击力值选择按钮（1N-5N）选择要放置的重物重量

2. **放置重物**：
   - 点击左侧位置按钮（1m-5m）将重物放在杠杆左侧
   - 点击右侧位置按钮（1m-5m）将重物放在杠杆右侧

3. **观察结果**：
   - 查看杠杆是否平衡
   - 查看力矩计算区域的详细计算过程
   - 当力矩不平衡时，杠杆会向力矩较大的一侧倾斜

4. **移除重物**：点击杠杆上的重物图标可以移除该重物

5. **重置实验**：点击"重置实验"按钮清除所有重物

### 实验示例

**平衡示例**：
- 左侧：2N 重物放在 3m 处
- 右侧：3N 重物放在 2m 处
- 力矩计算：2×3 = 3×2 = 6 N·m
- 结果：杠杆平衡

**不平衡示例**：
- 左侧：3N 重物放在 2m 处
- 右侧：2N 重物放在 2m 处
- 力矩计算：左侧 6 N·m，右侧 4 N·m
- 结果：杠杆向左倾斜

## 响应式设计

应用采用响应式设计，支持在不同屏幕尺寸上良好显示：
- **桌面端**：三列布局，左侧控制面板，中间模拟区域
- **平板/手机**：单列布局，所有内容垂直排列

## 开发说明

### 响应式编程

项目使用 Angular Signals 进行响应式状态管理：
- `signal()`：创建可写信号
- `computed()`：创建计算信号（派生状态）
- `update()`：更新信号值
- `set()`：设置信号值

### 样式系统

- 使用 Tailwind CSS 4.0 进行样式开发
- PrimeNG 提供 UI 组件
- 自定义 CSS 动画实现杠杆倾斜效果

### 组件结构

项目采用独立组件（Standalone Components）架构：
- 每个组件都是自包含的
- 使用 `standalone: true` 标记
- 直接在组件中声明依赖

## 许可证

本项目仅供学习和教学使用。

## 贡献

欢迎提交问题和改进建议！

## 联系方式

如有任何问题或建议，请通过以下方式联系：
- 提交 GitHub Issue
- 发送电子邮件

---

**享受探索物理原理的乐趣！** 🎓
