# 贪吃蛇游戏

一个基于 Angular 框架开发的经典贪吃蛇网页游戏。

## 项目结构

```
snake-game/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── game/
│   │   │       ├── game.component.ts
│   │   │       ├── game.component.html
│   │   │       └── game.component.css
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.css
│   │   ├── app.module.ts
│   │   └── app-routing.module.ts
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── angular.json
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── README.md
```

## 技术栈

- **框架**: Angular 21.x
- **语言**: TypeScript 5.9.x
- **样式**: Tailwind CSS 3.4.x
- **UI 组件库**: PrimeNG 21.x
- **路由**: Angular Router
- **打包**: Angular CLI Application Builder

## 功能特性

- 30×30 网格游戏区
- 实时得分和最高分显示
- 最高分保存在浏览器 localStorage 中
- 键盘方向键控制
- 移动端触控按钮控制（仅在移动端显示）
- 深色主题
- 响应式布局
- 速度随得分增加而加快
- 游戏结束后可重新开始

## 安装依赖

```bash
npm install
```

## 启动项目

### 开发模式

```bash
npm start
```

或

```bash
ng serve
```

项目启动后，在浏览器中访问 `http://localhost:4200` 即可游玩。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist/` 目录。

## 游戏玩法

1. **开始游戏**: 按任意方向键或点击移动端控制按钮开始游戏
2. **控制方向**:
   - 键盘: 使用方向键 ↑ ↓ ← →
   - 移动端: 点击屏幕下方的方向按钮
3. **目标**: 控制蛇吃红色的食物，每次吃到食物后蛇的长度会增加，同时得分增加 10 分
4. **游戏结束条件**:
   - 蛇撞到墙壁
   - 蛇撞到自己的身体
5. **重新开始**: 游戏结束后，点击"重新开始"按钮或按空格键

## 注意事项

- 最高分保存在浏览器的 localStorage 中，刷新页面后仍会显示
- 随着得分增加，蛇的移动速度会逐渐加快（每得 50 分速度提升一次）
- 移动端的控制按钮仅在屏幕宽度较小时显示
