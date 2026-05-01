# 六边形弹跳模拟 (Hexagonal Bounce)

这是一个使用 Angular 框架开发的物理模拟应用，展示了一个在旋转六边形内弹跳的球，具有真实的物理效果。

## 项目概述

该应用模拟了一个球在旋转六边形边界内的运动，包括以下物理特性：

- **重力**：球受到向下的重力加速度
- **摩擦力**：球与墙壁接触时会受到摩擦力影响
- **弹性碰撞**：球与墙壁碰撞时会根据弹性系数反弹
- **旋转六边形**：六边形容器会持续旋转，影响球的碰撞方向

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Angular | 21.x | 前端框架 |
| TypeScript | 5.x | 编程语言 |
| Tailwind CSS | 3.x | CSS 框架 |
| NG-ZORRO | 18.x | UI 组件库 |
| Angular Router | 21.x | 路由管理 |
| Angular CLI Application Builder | 21.x | 构建工具 |

## 项目结构

```
hexagonal-bounce/
├── src/
│   ├── app/
│   │   ├── app.html              # 主组件模板
│   │   ├── app.scss              # 主组件样式
│   │   ├── app.ts                # 主组件逻辑
│   │   ├── app-module.ts         # 根模块
│   │   ├── app-routing-module.ts # 路由配置
│   │   └── physics-engine.service.ts  # 物理引擎服务
│   ├── main.ts                   # 应用入口
│   ├── index.html                # HTML 入口
│   └── styles.scss               # 全局样式
├── angular.json                  # Angular 配置
├── tailwind.config.js            # Tailwind CSS 配置
├── postcss.config.js             # PostCSS 配置
├── package.json                  # 项目依赖
├── tsconfig.json                 # TypeScript 配置
└── README.md                     # 项目文档
```

## 核心功能说明

### 物理引擎 (physics-engine.service.ts)

该服务包含了所有物理计算逻辑：

- **Vector2D**：2D 向量接口，用于位置和速度表示
- **Ball**：球的物理属性（位置、速度、半径、质量）
- **Hexagon**：六边形容器的属性（中心、半径、旋转角度、角速度）
- **重力 (gravity)**：980 px/s²（可配置）
- **摩擦力 (friction)**：0.98（可配置）
- **弹性系数 (restitution)**：0.7（可配置）

### 碰撞检测与响应

1. **获取六边形顶点**：根据当前旋转角度计算六个顶点坐标
2. **边缘检测**：计算每条边缘的法向量（指向六边形内部）
3. **点到线段距离**：计算球心到每条边缘的最近距离
4. **碰撞检测**：判断球是否与边缘发生穿透
5. **碰撞响应**：
   - 位置校正：将球推出穿透区域
   - 速度反射：根据法向量计算反射速度
   - 能量损失：应用弹性系数和摩擦力
   - 旋转传递：考虑六边形旋转对碰撞的影响

### 主组件 (app.ts)

- 使用 HTML5 Canvas 进行渲染
- requestAnimationFrame 实现流畅动画
- 响应式布局，自适应窗口大小
- 控制面板允许实时调整物理参数

## 安装与运行

### 环境要求

- Node.js >= 18.13.0
- npm >= 9.0.0
- Angular CLI >= 17.0.0

### 安装步骤

1. 进入项目目录：

```bash
cd hexagonal-bounce
```

2. 安装依赖：

```bash
npm install
```

### 开发模式运行

```bash
ng serve
```

或使用 npm 脚本：

```bash
npm start
```

应用将在 `http://localhost:4200` 上运行，支持热重载。

### 构建生产版本

```bash
ng build
```

构建产物将输出到 `dist/` 目录。

## 使用说明

### 控制面板

应用左侧提供了以下控制选项：

1. **开始/暂停按钮**：控制模拟的运行状态
2. **重置按钮**：将球重置到初始位置和速度
3. **重力滑块**：调整重力加速度（0 - 2000 px/s²）
4. **摩擦力滑块**：调整碰撞时的摩擦系数（0.5 - 1.0）
5. **弹性系数滑块**：调整碰撞时的能量保留比例（0 - 1.0）
   - 1.0 = 完全弹性碰撞（无能量损失）
   - 0.0 = 完全非弹性碰撞
6. **旋转速度滑块**：调整六边形的旋转角速度（-3 到 3 rad/s）
   - 正值 = 顺时针旋转
   - 负值 = 逆时针旋转

### 物理效果说明

- **重力**：球会持续加速向下运动
- **摩擦力**：球在墙上滑动时会减速
- **弹性反弹**：球碰到墙时会反弹，速度方向根据入射角计算
- **旋转影响**：旋转的六边形会在碰撞时给球施加额外的切向速度

## 开发

### 添加新组件

```bash
ng generate component component-name
```

### 添加新服务

```bash
ng generate service service-name
```

### 运行测试

```bash
ng test
```

## 打包与部署

项目使用 Angular CLI Application Builder 进行构建。

### 构建生产环境

```bash
ng build --configuration production
```

### 预览生产构建

```bash
ng serve --configuration production
```

## 配置说明

### Tailwind CSS 配置

配置文件位于 `tailwind.config.js`，可以自定义主题、扩展工具类等。

### NG-ZORRO 配置

- 样式在 `angular.json` 中引入
- 组件模块在 `app-module.ts` 中导入

### 路由配置

路由配置位于 `src/app/app-routing-module.ts`，目前为单页面应用。

## 常见问题

**Q: 为什么球会穿过墙壁？**

A: 这可能是因为球的速度过快，导致在一帧内移动的距离超过了碰撞检测的范围。可以通过减小时间步长或使用连续碰撞检测来解决。

**Q: 如何调整物理参数以获得更好的效果？**

A: 建议从默认值开始：
- 重力：980（接近地球重力）
- 摩擦力：0.95 - 0.99
- 弹性系数：0.6 - 0.8（模拟真实物体）

**Q: 如何添加更多球？**

A: 可以在 `app.ts` 中创建 Ball 数组，并在物理更新循环中处理每个球的碰撞和运动。

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

---

*本项目使用 Angular CLI 生成，采用现代前端技术栈构建。*
