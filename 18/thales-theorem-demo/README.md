# 泰勒斯定理演示工具

一个交互式的泰勒斯定理（Thales' Theorem）演示应用，让用户可以直观地验证半圆中的内角恒为90度。

## 项目简介

泰勒斯定理是几何学中的一个重要定理，由古希腊数学家泰勒斯（Thales of Miletus）发现。该定理指出：如果 A、B 是圆的一条直径的两个端点，C 是圆上除 A、B 外的任意一点，那么 ∠ACB = 90°。

本应用通过交互式可视化方式，让用户可以：
- 在半圆上拖动点 C，实时观察角度变化
- 调整半圆的半径大小
- 实时显示 ∠ACB 的角度值
- 查看定理的详细解释和数学证明

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Angular | 21.2.0 | 前端框架 |
| TypeScript | 5.9.2 | 编程语言 |
| Tailwind CSS | 4.2.4 | CSS 框架 |
| Angular Material | 18.x | UI 组件库 |
| Angular Router | 21.2.0 | 路由管理 |
| Angular CLI | 21.2.9 | 构建工具 |

## 项目结构

```
thales-theorem-demo/
├── public/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── demo/
│   │   │   ├── demo.component.ts      # 演示组件逻辑
│   │   │   ├── demo.component.html    # 演示组件模板
│   │   │   └── demo.component.css     # 演示组件样式
│   │   ├── explanation/
│   │   │   ├── explanation.component.ts   # 解释组件逻辑
│   │   │   ├── explanation.component.html # 解释组件模板
│   │   │   └── explanation.component.css  # 解释组件样式
│   │   ├── app.config.ts              # 应用配置
│   │   ├── app.html                   # 主应用模板
│   │   ├── app.ts                     # 主应用组件
│   │   └── app.routes.ts              # 路由配置
│   ├── index.html                     # 入口 HTML
│   ├── main.ts                        # 应用入口
│   └── styles.css                     # 全局样式
├── angular.json                       # Angular 配置
├── package.json                       # 依赖配置
├── postcss.config.js                  # PostCSS 配置
├── tsconfig.json                      # TypeScript 配置
└── README.md                          # 项目文档
```

## 功能特性

### 1. 交互式演示
- 使用 HTML5 Canvas 绘制几何图形
- 支持鼠标拖动点 C 在半圆上移动
- 支持触摸屏操作
- 实时重绘和角度计算

### 2. 角度显示
- 实时计算并显示 ∠ACB 的角度值
- 保留两位小数精度
- 视觉化角度弧线

### 3. 半径调整
- 使用 Angular Material Slider 组件
- 可调整半径范围：50px - 180px
- 实时更新画布显示

### 4. 定理解释
- 详细的定理定义和历史背景
- 8 个步骤的数学证明
- 交互式步骤导航
- 关键要点总结

## 安装和运行

### 环境要求
- Node.js 18.x 或更高版本
- npm 9.x 或更高版本

### 安装依赖

```bash
cd thales-theorem-demo
npm install
```

### 启动开发服务器

```bash
npm start
```

或者使用 Angular CLI：

```bash
ng serve
```

启动后，在浏览器中访问 `http://localhost:4200/` 即可查看应用。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist/` 目录。

## 使用说明

### 演示页面
1. **查看几何图形**：页面左侧显示半圆、直径 AB 和点 C
2. **拖动点 C**：用鼠标或手指拖动橙色的点 C 在半圆上移动
3. **观察角度**：右侧面板实时显示 ∠ACB 的角度（始终为 90°）
4. **调整半径**：使用滑块调整半圆的半径大小

### 定理解释页面
1. **查看定义**：阅读泰勒斯定理的完整定义
2. **了解历史**：了解泰勒斯的生平和贡献
3. **学习证明**：点击步骤按钮或使用上一步/下一步按钮查看完整的数学证明过程
4. **返回演示**：点击"返回演示页面"按钮回到交互演示

## 核心实现

### 几何计算

```typescript
// 计算点 C 的坐标
private getPointC(): { x: number; y: number } {
  const angleRad = (this.pointCAngle() * Math.PI) / 180;
  return {
    x: this.centerX + this.radius() * Math.cos(angleRad),
    y: this.centerY - this.radius() * Math.sin(angleRad)
  };
}

// 使用向量点积计算角度
private calculateAngle(): number {
  const vectorCA = { x: A.x - C.x, y: A.y - C.y };
  const vectorCB = { x: B.x - C.x, y: B.y - C.y };
  
  const dotProduct = vectorCA.x * vectorCB.x + vectorCA.y * vectorCB.y;
  const magnitudeCA = Math.sqrt(vectorCA.x * vectorCA.x + vectorCA.y * vectorCA.y);
  const magnitudeCB = Math.sqrt(vectorCB.x * vectorCB.x + vectorCB.y * vectorCB.y);
  
  const cosAngle = dotProduct / (magnitudeCA * magnitudeCB);
  const angleRad = Math.acos(Math.max(-1, Math.min(1, cosAngle)));
  return (angleRad * 180) / Math.PI;
}
```

### Canvas 绘制

应用使用 HTML5 Canvas API 进行绘制，包括：
- 半圆弧线（蓝色）
- 直径 AB（绿色）
- 线段 AC 和 BC（红色）
- 点标记（带标签）
- 角度弧线（紫色）

### 响应式设计

- 使用 Tailwind CSS 的响应式网格布局
- 支持移动端和桌面端
- 自适应的 Canvas 尺寸

## 开发说明

### 组件结构

- **AppComponent**：主应用组件，包含导航栏、页脚和路由出口
- **DemoComponent**：演示页面组件，包含 Canvas 和交互逻辑
- **ExplanationComponent**：解释页面组件，包含定理说明和证明步骤

### 状态管理

使用 Angular Signals 进行状态管理：
- `radius()`：当前半径值
- `angle()`：当前角度值
- `pointCAngle()`：点 C 的角度位置
- `currentStep()`：当前证明步骤

## 浏览器兼容性

- Chrome / Edge（最新版本）
- Firefox（最新版本）
- Safari（最新版本）
- 移动端浏览器（iOS Safari, Chrome Android）

## 许可证

MIT License

## 关于泰勒斯

泰勒斯（Thales of Miletus，约公元前624年 - 公元前546年）是古希腊哲学家、数学家和天文学家，被认为是西方哲学和科学的奠基人之一。他是米利都学派的创始人，提出了"水是万物的本原"这一哲学命题。

在数学上，泰勒斯以泰勒斯定理而闻名，他还被认为是第一个将几何学引入希腊的人，并发现了多个几何定理。
