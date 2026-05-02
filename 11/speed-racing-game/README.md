# 极速赛车游戏 (Speed Racing Game)

一款使用 Vue 3 + TypeScript 构建的逼真赛车游戏，具有流畅的动画效果和刺激的游戏体验。

## 🎮 游戏特性

- **3D 透视效果**：模拟真实的道路透视，营造沉浸式驾驶体验
- **多种车辆类型**：轿车、卡车、跑车，各有不同的尺寸和外观
- **加速系统**：空格键短暂加速，配合炫酷的火焰特效
- **金币收集**：收集路上的金币获得额外分数
- **渐进难度**：随着时间推移，游戏难度逐渐增加
- **移动端支持**：专为触摸设备优化的控制按钮
- **暂停功能**：随时暂停游戏，休息一下再继续

## 🛠️ 技术栈

- **框架**: Vue 3 (Composition API)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **UI 组件**: Naive UI
- **路由**: Vue Router
- **构建工具**: Vite

## 📁 项目结构

```
speed-racing-game/
├── public/
├── src/
│   ├── components/          # 组件目录
│   │   ├── PlayerCar.vue    # 玩家赛车组件
│   │   ├── EnemyCar.vue     # 敌方车辆组件
│   │   └── EnemyWheels.vue  # 车轮组件
│   ├── router/
│   │   └── index.ts         # 路由配置
│   ├── styles/
│   │   └── main.css         # 全局样式 (Tailwind)
│   ├── views/
│   │   ├── Home.vue         # 主页
│   │   ├── Game.vue         # 游戏主界面
│   │   └── GameOver.vue     # 游戏结束页面
│   ├── App.vue              # 根组件
│   ├── main.ts              # 入口文件
│   └── vite-env.d.ts        # Vite 环境声明
├── index.html               # HTML 模板
├── package.json             # 依赖配置
├── postcss.config.js        # PostCSS 配置
├── tailwind.config.js       # Tailwind 配置
├── tsconfig.json            # TypeScript 配置
├── tsconfig.node.json       # TypeScript Node 配置
└── vite.config.ts           # Vite 配置
```

## 🎯 游戏玩法

### 操作方式

- **← 方向键**: 向左移动
- **→ 方向键**: 向右移动
- **空格键**: 短暂加速（有冷却时间）
- **ESC 键**: 暂停/继续游戏

### 移动端操作

- 点击左侧按钮：向左移动
- 点击右侧按钮：向右移动

### 游戏规则

1. 控制你的赛车在 4 条车道中移动
2. 躲避迎面驶来的其他车辆
3. 收集金币获得 50 额外分数
4. 成功躲避车辆获得 10 分
5. 随着分数增加，速度和难度都会提升
6. 撞到其他车辆游戏结束

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

游戏将在 `http://localhost:3000` 启动

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 🎨 自定义主题

游戏主题颜色在 `tailwind.config.js` 中定义：

```javascript
colors: {
  'racing-red': '#E53E3E',     // 赛车主题红色
  'racing-blue': '#2B6CB0',     // 赛车主题蓝色
  'racing-yellow': '#ECC94B',   // 赛车主题黄色
  'racing-dark': '#1A202C',     // 深色背景
}
```

## 📝 核心功能实现

### 游戏循环

使用 `requestAnimationFrame` 实现流畅的 60fps 游戏循环：

- 玩家输入处理
- 敌人生成和移动
- 碰撞检测
- 分数计算
- 难度递增

### 碰撞检测

精确的矩形碰撞检测，考虑不同车型的尺寸差异：

```typescript
const checkCollision = (enemy: Enemy) => {
  return (
    playerLeft < enemyRight &&
    playerRight > enemyLeft &&
    playerBottom < enemyTop &&
    playerTop > enemyBottom
  )
}
```

### 3D 透视效果

通过 CSS `perspective` 和 `transform: rotateX()` 实现道路的 3D 透视效果，配合车辆的 `scale` 和 `opacity` 变化，模拟远近视觉效果。

## 📄 License

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

享受极速漂移的快感！🏎️💨
