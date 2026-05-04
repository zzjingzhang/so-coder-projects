# 化学实验模拟 - 碳酸钙与盐酸反应制取二氧化碳

一个交互式化学实验动画应用，展示碳酸钙与盐酸反应生成二氧化碳的完整实验过程。

## 项目简介

本项目是一个基于 Angular 框架的交互式化学实验模拟应用，包含以下核心功能：

- **实验原理**：详细介绍反应方程式、反应类型、药品选择原因等
- **步骤演示**：分步骤展示实验过程，包含动态气泡动画和气体收集效果
- **知识检验**：包含 5 道关于实验原理的测验题目，检验学习效果

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Angular | 18.2.x | 前端框架（独立组件模式） |
| TypeScript | 5.x | 编程语言 |
| Tailwind CSS | 3.x | CSS 工具类框架 |
| PrimeNG | 17.18.x | UI 组件库 |
| Angular Router | 18.2.x | 路由管理 |
| Angular CLI | 18.2.x | 项目构建工具 |

## 项目结构

```
chemistry-lab/
├── src/
│   ├── app/
│   │   ├── pages/
│   │   │   ├── principle/
│   │   │   │   └── principle.component.ts    # 实验原理页面
│   │   │   ├── experiment/
│   │   │   │   └── experiment.component.ts   # 步骤演示页面（含动画）
│   │   │   └── quiz/
│   │   │       └── quiz.component.ts         # 知识测验页面
│   │   ├── app.component.ts                   # 主应用组件
│   │   ├── app.config.ts                      # 应用配置
│   │   └── app.routes.ts                      # 路由配置
│   ├── index.html
│   ├── main.ts
│   └── styles.css                              # 全局样式（含 Tailwind）
├── angular.json                                # Angular 配置
├── package.json
├── tailwind.config.js                          # Tailwind CSS 配置
├── tsconfig.json
└── README.md
```

## 功能特性

### 1. 实验原理页面
- 展示完整的化学反应方程式：CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂↑
- 详细说明反应类型（复分解反应）
- 解析药品选择的原因（为什么选择碳酸钙、稀盐酸）
- 对比不同方案的优缺点

### 2. 步骤演示页面
采用分步骤演示，共 6 个关键步骤：

| 步骤 | 内容 |
|------|------|
| 准备药品 | 展示所需的仪器和药品 |
| 放入固体 | 将大理石放入锥形瓶 |
| 添加液体 | 动画展示添加稀盐酸的过程 |
| 开始反应 | 动态气泡动画，展示 CO₂ 产生过程 |
| 收集气体 | 展示向上排空气法收集装置 |
| 验满检验 | 介绍验满方法和检验方法 |

**特色动画**：
- 气泡上升动画（requestAnimationFrame 实现）
- 液体液面变化动画
- 平滑的步骤过渡效果

### 3. 知识检验页面
包含 5 道精心设计的测验题目：

1. 实验室制取二氧化碳最适宜的药品是什么？
2. 为什么不能用硫酸制取二氧化碳？
3. 收集二氧化碳应该采用什么方法？
4. 如何检验二氧化碳是否已收集满？
5. 该反应属于什么反应类型？

**功能特点**：
- 每题提交后显示详细解析
- 实时计算得分和正确率
- 完成后显示环形进度图和详细答题情况
- 支持重新测验

## 快速开始

### 环境要求

- Node.js >= 18.13.0
- npm >= 9.x

### 安装依赖

```bash
cd chemistry-lab
npm install
```

### 启动开发服务器

```bash
npm start
# 或
ng serve
```

访问 `http://localhost:4200` 查看应用。

### 构建生产版本

```bash
npm run build
# 或
ng build
```

构建产物将输出到 `dist/chemistry-lab` 目录。

### 运行测试

```bash
npm test
# 或
ng test
```

## 路由配置

| 路径 | 组件 | 说明 |
|------|------|------|
| `/` | 重定向到 `/principle` | 默认路由 |
| `/principle` | PrincipleComponent | 实验原理页面 |
| `/experiment` | ExperimentComponent | 步骤演示页面 |
| `/quiz` | QuizComponent | 知识测验页面 |

## 使用说明

1. **导航方式**：
   - 顶部导航栏（桌面端）
   - 底部标签栏（移动端）
   - 页面内的按钮跳转

2. **实验演示操作**：
   - 使用「上一步/下一步」按钮切换步骤
   - 在特定步骤可点击交互按钮触发动画
   - 「添加稀盐酸」和「开始反应」按钮支持动态效果

3. **测验操作**：
   - 选择答案后点击「提交答案」
   - 查看解析后点击「下一题」
   - 全部完成后查看结果统计

## 样式与设计

- **配色方案**：蓝紫渐变主色调，符合教育类应用风格
- **响应式设计**：支持桌面端和移动端
- **组件库**：PrimeNG 提供精美 UI 组件
- **工具类**：Tailwind CSS 实现快速样式开发

## 开发说明

本项目使用 Angular 18 的独立组件（Standalone Components）模式，不使用 NgModule。所有组件都是独立的，直接在 `@Component` 装饰器中声明依赖。

### 新增页面组件

```typescript
@Component({
  selector: 'app-your-page',
  standalone: true,  // 独立组件
  imports: [CommonModule, ButtonModule, ...],  // 直接导入依赖
  template: `...`,
  styles: [`...`]
})
export class YourPageComponent { ... }
```

### 添加路由

在 `src/app/app.routes.ts` 中添加：

```typescript
export const routes: Routes = [
  // ... 现有路由
  { path: 'your-path', component: YourPageComponent },
];
```

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

---

**化学方程式**：CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂↑
