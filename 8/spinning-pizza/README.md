# Spinning Pizza - 旋转披萨游戏

一个有趣的互动旋转披萨网站，用户可以拖动披萨旋转，当旋转速度足够快时，配料会飞走。

## 项目简介

这是一个基于 Angular 框架开发的互动游戏网站。玩家可以通过鼠标拖动来旋转披萨，体验真实的物理旋转效果。当旋转速度超过阈值时，披萨上的配料（如意大利辣香肠、蘑菇、橄榄等）会因为离心力而飞离披萨。

## 技术栈

- **框架**: Angular 21.2.0
- **语言**: TypeScript 5.9.2
- **样式**: Tailwind CSS 3.4.x
- **UI 组件库**: PrimeNG 17.x
- **路由**: Angular Router
- **打包工具**: Angular CLI Application Builder

## 项目结构

```
spinning-pizza/
├── public/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── pizza/
│   │   │   ├── pizza.component.ts      # 披萨组件逻辑
│   │   │   ├── pizza.component.html    # 披萨组件模板
│   │   │   └── pizza.component.css     # 披萨组件样式
│   │   ├── app-module.ts               # 根模块
│   │   ├── app-routing-module.ts       # 路由配置
│   │   ├── app.ts                       # 根组件
│   │   ├── app.html                     # 根组件模板
│   │   └── app.css                      # 根组件样式
│   ├── index.html                       # 入口 HTML
│   ├── main.ts                          # 应用入口
│   └── styles.css                       # 全局样式
├── angular.json                         # Angular 配置
├── package.json                         # 依赖配置
├── postcss.config.js                    # PostCSS 配置
├── tailwind.config.js                   # Tailwind CSS 配置
├── tsconfig.json                        # TypeScript 配置
└── README.md                            # 项目说明文档
```

## 功能特性

- 🎯 **直观的旋转控制**: 通过鼠标拖动来旋转披萨，体验真实的物理旋转效果
- ⚡ **速度检测**: 实时显示当前旋转速度
- 🍕 **多样的配料**: 包含意大利辣香肠、蘑菇、橄榄、青椒和罗勒叶等多种配料
- 💨 **配料飞行动画**: 当旋转速度超过阈值时，配料会因为离心力而飞离
- 🔄 **重置功能**: 随时可以重置披萨到初始状态

## 游戏玩法

1. **启动项目**: 按照下方的启动步骤运行项目
2. **旋转披萨**: 用鼠标点击并拖动披萨来旋转它
3. **加速旋转**: 快速拖动披萨来增加旋转速度
4. **观察配料**: 当速度超过阈值（8度/帧）时，配料会开始飞走
5. **重置游戏**: 点击"重置披萨"按钮可以恢复所有配料

## 安装与启动

### 前置要求

确保你的开发环境中已安装以下工具：

- Node.js (推荐 v18 或更高版本)
- npm (通常随 Node.js 一起安装)

### 安装依赖

```bash
cd spinning-pizza
npm install
```

### 启动开发服务器

```bash
npm start
```

或

```bash
ng serve
```

启动后，打开浏览器访问 `http://localhost:4200/` 即可查看应用。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist/` 目录。

### 运行测试

```bash
npm test
```

## 核心实现说明

### 披萨组件 (PizzaComponent)

- **旋转逻辑**: 使用 `@HostListener` 监听鼠标事件，计算鼠标移动角度来实现旋转
- **物理模拟**: 实现了简单的物理引擎，包括角速度、摩擦力等
- **配料飞行**: 当角速度超过阈值时，随机触发配料飞行动画，模拟离心力效果
- **动画系统**: 使用 CSS transform 和 JavaScript 定时器实现流畅的动画效果

### 样式设计

- 使用 Tailwind CSS 实现响应式布局和现代化 UI
- 自定义 CSS 类实现各种配料的视觉效果
- 渐变背景和阴影效果增强视觉层次感

## 开发说明

### 添加新配料

1. 在 `pizza.component.ts` 中的 `Topping` 接口添加新类型
2. 在 `getToppingClass()` 方法中添加对应的样式类
3. 在 `pizza.component.css` 中定义新的样式

### 调整游戏参数

- `flyThreshold`: 控制配料开始飞行的速度阈值（默认 8 度/帧）
- `angularVelocity *= 0.98`: 控制旋转减速的摩擦力系数
- `checkToppingsFly()` 中的 `Math.random() < 0.1`: 控制配料飞行的概率

## License

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

---

享受旋转披萨的乐趣吧！🍕