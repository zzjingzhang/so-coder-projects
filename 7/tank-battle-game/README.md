# 坦克大战游戏

经典坦克大战游戏的 React 实现版本。使用键盘控制坦克移动和射击，消灭所有敌人并保护基地。

## 项目结构

```
tank-battle-game/
├── src/
│   ├── components/         # 游戏组件
│   │   ├── Bullet.tsx      # 子弹组件
│   │   ├── Explosion.tsx   # 爆炸效果组件
│   │   ├── GameMap.tsx     # 游戏地图组件
│   │   └── Tank.tsx        # 坦克组件
│   ├── pages/              # 页面组件
│   │   ├── Game.tsx        # 游戏主页面
│   │   └── Home.tsx        # 主页
│   ├── types/              # TypeScript 类型定义
│   │   └── index.ts
│   ├── utils/              # 工具函数
│   │   └── gameUtils.ts    # 游戏核心逻辑
│   ├── App.tsx             # 主应用组件
│   ├── main.tsx            # 应用入口
│   └── index.css           # 全局样式
├── index.html              # HTML 模板
├── package.json            # 项目配置
├── tsconfig.json           # TypeScript 配置
├── tsconfig.node.json      # TypeScript Node 配置
├── vite.config.ts          # Vite 配置
├── tailwind.config.js      # Tailwind CSS 配置
└── postcss.config.js       # PostCSS 配置
```

## 技术栈

- **前端框架**: React 18
- **开发语言**: TypeScript
- **样式框架**: Tailwind CSS
- **UI 组件库**: Ant Design
- **路由管理**: React Router
- **打包工具**: Vite

## 功能特性

- 🎮 经典坦克大战游戏玩法
- 🎯 键盘控制：上下左右键移动，空格键射击
- 🗺️ 随机生成的地图，包含砖墙、钢墙、水域、草地
- 👾 智能敌方坦克 AI
- 💥 炫酷的爆炸特效
- ⏸️ 游戏暂停功能
- 🏆 得分系统和生命值系统
- 🎨 现代化 UI 设计

## 操作说明

| 按键 | 功能 |
|------|------|
| ⬆️ 上箭头 | 向上移动 |
| ⬇️ 下箭头 | 向下移动 |
| ⬅️ 左箭头 | 向左移动 |
| ➡️ 右箭头 | 向右移动 |
| 🔫 空格键 | 发射炮弹 |
| ⏸️ ESC 键 | 暂停游戏 |

## 游戏目标

1. 消灭所有敌方坦克
2. 保护基地不被摧毁
3. 尽可能获得高分

## 地图元素

| 元素 | 说明 |
|------|------|
| 🧱 砖墙 | 可以被子弹摧毁 |
| 🔩 钢墙 | 无法被子弹摧毁 |
| 💧 水域 | 无法通过 |
| 🌿 草地 | 可以隐藏坦克 |
| 🏠 基地 | 必须保护，被击中则游戏结束 |

## 安装和运行

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装依赖

```bash
cd tank-battle-game
npm install
```

### 启动开发服务器

```bash
npm run dev
```

启动后访问 http://localhost:5173 即可开始游戏。

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 游戏截图

主页展示游戏介绍和操作说明，点击"开始游戏"按钮进入游戏。

游戏界面包含：
- 顶部状态栏：显示分数、生命值、关卡、剩余敌人
- 中间游戏区域：地图、坦克、子弹、爆炸效果
- 底部操作提示：显示键盘操作说明

## 开发说明

### 项目初始化

本项目使用 Vite 创建 React + TypeScript 模板：

```bash
npm create vite@latest tank-battle-game -- --template react-ts
```

### 核心依赖

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "antd": "^5.11.5",
  "tailwindcss": "^3.3.6"
}
```

### 游戏逻辑

游戏核心逻辑位于 `src/utils/gameUtils.ts`，包含：

- `generateMap()`: 生成游戏地图
- `moveTank()`: 处理坦克移动和碰撞检测
- `createBullet()`: 创建子弹
- `moveBullet()`: 处理子弹移动
- `checkCollision()`: 碰撞检测

### 扩展功能

可以扩展的功能：
- 多关卡系统
- 道具系统（加速、护盾、双发等）
- 音效和背景音乐
- 排行榜系统
- 双人对战模式

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

---

享受游戏时光！🎮