# 火影忍者 VS 晓组织 - 忍者村保卫战 🍥

一个基于 **植物大战僵尸** 玩法的火影忍者主题塔防游戏，使用 Angular 框架开发。

## 🎮 游戏简介

在这个游戏中，你将扮演木叶村的忍者指挥官，通过放置各种火影忍者角色来抵御晓组织的入侵。游戏玩法类似于经典的植物大战僵尸，但是以火影忍者为主题。

### 游戏特色
- 🌊 5 波次的敌人进攻，难度递增
- 🥷 5 种不同的忍者角色，各有独特技能
- 👿 3 种不同类型的敌人
- 💧 查克拉系统用于购买忍者
- ⏸️ 暂停/继续功能
- 📊 分数统计和波次追踪

## 🛠️ 技术栈

- **框架**: Angular 21.2.0
- **语言**: TypeScript 5.9.2
- **样式**: Tailwind CSS 3.x
- **UI 组件库**: NG-ZORRO (Ant Design for Angular)
- **路由**: Angular Router
- **打包工具**: Angular CLI Application Builder
- **状态管理**: RxJS BehaviorSubject

## 📁 项目结构

```
naruto-vs-akatsuki/
├── src/
│   ├── app/
│   │   ├── models/                    # 数据模型
│   │   │   ├── enemy.ts              # 敌人模型
│   │   │   ├── ninja.ts              # 忍者模型
│   │   │   └── projectile.ts         # 弹幕模型
│   │   │
│   │   ├── pages/                     # 页面组件
│   │   │   ├── menu/                 # 菜单页面
│   │   │   │   ├── menu.ts
│   │   │   │   ├── menu.html
│   │   │   │   └── menu.css
│   │   │   ├── game/                 # 游戏主页面
│   │   │   │   ├── game.ts
│   │   │   │   ├── game.html
│   │   │   │   └── game.css
│   │   │   └── game-over/            # 游戏结束页面
│   │   │       ├── game-over.ts
│   │   │       ├── game-over.html
│   │   │       └── game-over.css
│   │   │
│   │   ├── services/                 # 服务
│   │   │   └── game.service.ts       # 游戏核心逻辑服务
│   │   │
│   │   ├── app.ts                    # 根组件
│   │   ├── app.html
│   │   ├── app.css
│   │   ├── app-module.ts             # 根模块
│   │   └── app-routing-module.ts     # 路由配置
│   │
│   ├── styles.css                    # 全局样式 (Tailwind)
│   ├── index.html                    # 入口 HTML
│   └── main.ts                       # 入口文件
│
├── public/
│   └── favicon.ico
│
├── angular.json                      # Angular 配置
├── package.json                      # 依赖配置
├── tailwind.config.js                # Tailwind 配置
├── postcss.config.js                 # PostCSS 配置
├── tsconfig.json                     # TypeScript 配置
└── README.md                         # 项目说明
```

## 🚀 快速开始

### 环境要求
- Node.js >= 18.x
- npm >= 9.x

### 安装依赖

```bash
cd naruto-vs-akatsuki
npm install
```

### 启动开发服务器

```bash
npm run start
# 或
ng serve
```

启动后，打开浏览器访问: `http://localhost:4200`

### 构建生产版本

```bash
npm run build
# 或
ng build
```

构建产物将生成在 `dist/` 目录下。

## 🎯 游戏玩法

### 基本操作
1. **选择忍者**: 点击游戏界面下方的忍者卡片选择要放置的忍者
2. **放置忍者**: 点击游戏网格中的任意格子放置选中的忍者
3. **消耗查克拉**: 每个忍者都有不同的查克拉成本
4. **收集查克拉**: 查克拉会自动恢复，放置九尾查克拉可以加速恢复

### 胜利条件
- 成功抵御 5 波次的敌人进攻
- 不让任何敌人到达左侧边界

### 失败条件
- 任何敌人到达左侧边界
- 忍者村被攻破

## 🥷 忍者介绍

| 忍者 | 表情 | 查克拉成本 | 生命值 | 攻击力 | 特殊能力 |
|------|------|-----------|--------|--------|----------|
| 鸣人 | 🍥 | 50 | 100 | 20 | 螺旋丸 - 基础攻击 |
| 佐助 | 🔥 | 100 | 80 | 35 | 火球术 - 高伤害 |
| 卡卡西 | 💎 | 175 | 120 | 50 | 写轮眼 - 超高伤害 |
| 小樱 | 🌸 | 75 | 150 | 10 | 医疗忍术 - 高血量 |
| 九尾 | 🦊 | 50 | 50 | 0 | 查克拉生产 - 额外查克拉 |

## 👿 敌人介绍

| 敌人 | 表情 | 生命值 | 攻击力 | 速度 | 特点 |
|------|------|--------|--------|------|------|
| 晓成员 | 🌑 | 100 | 20 | 普通 | 基础敌人 |
| 佩恩 | 💀 | 250 | 30 | 较慢 | 高血量敌人 |
| 大蛇丸 | 🐍 | 150 | 25 | 较快 | 快速移动敌人 |

## 🎨 样式设计

### 色彩主题
- **鸣人橙**: `#FF8C00` - 主要强调色
- **佐助紫**: `#4169E1` - 次要强调色
- **晓组织红**: `#8B0000` - 敌人主题色
- **木叶绿**: `#228B22` - 游戏背景色

### 动画效果
- 忍者放置动画
- 攻击闪光效果
- 受伤抖动效果
- 敌人行走动画
- 按钮悬停缩放效果

## 🔧 核心功能实现

### 游戏循环
- 使用 RxJS `interval` 创建 50ms 的游戏主循环
- 每帧更新敌人位置、忍者攻击、弹幕移动
- 碰撞检测和生命值计算

### 状态管理
- 使用 `BehaviorSubject` 管理游戏状态
- 响应式数据流，组件自动更新
- 包含: 查克拉、分数、波次、忍者列表、敌人列表、弹幕列表

### 路由配置
- `/` - 重定向到菜单
- `/menu` - 游戏菜单页面
- `/game` - 游戏主页面
- `/game-over` - 游戏结束页面
- `**` - 404 重定向

## 📝 开发说明

### 添加新忍者
1. 在 `src/app/models/ninja.ts` 的 `NINJA_TYPES` 数组中添加新忍者配置
2. 在 `src/app/services/game.service.ts` 的 `createProjectile` 方法中添加对应弹幕表情

### 添加新敌人
1. 在 `src/app/models/enemy.ts` 的 `ENEMY_TYPES` 数组中添加新敌人配置
2. 在 `src/app/services/game.service.ts` 的 `spawnEnemy` 方法中调整生成概率

### 调整游戏难度
- 修改 `game.service.ts` 中的 `CHAKRA_REGEN_RATE` 调整查克拉恢复速度
- 修改 `enemiesToSpawn` 调整每波敌人数量
- 修改 `spawnInterval` 调整敌人生成间隔

## 🐛 已知问题

- 暂无已知问题

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**享受游戏吧！🍥 木叶村的命运就交给你了！**
