# 迷你筑梦岛 🏝️

一款卡通风格的岛屿建造经营小游戏，玩家扮演岛主，通过收集资源、建造设施、完成任务，将荒岛打造成繁荣的家园。

## 游戏特色

- 🎨 **明亮鲜艳的卡通风格** - Q版设计，色彩丰富，充满童趣
- 🏗️ **多样的建筑系统** - 锯木厂、采石场、农场、仓库、研究小屋等
- 📊 **资源管理** - 合理分配木头、石头、食物、金币等资源
- 📋 **任务系统** - 完成每日订单获得丰厚奖励
- 🔓 **科技解锁** - 积累资源解锁新建筑和功能
- ⬆️ **建筑升级** - 升级建筑提高产出效率
- 🏝️ **岛屿扩展** - 扩展岛屿获得更多建造空间

## 技术栈

- **前端框架**: React 19
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **UI组件库**: Chakra UI
- **路由**: React Router
- **构建工具**: Vite

## 项目结构

```
mini-dream-island/
├── src/
│   ├── components/          # UI组件
│   │   ├── BuildingDetail.tsx      # 建筑详情弹窗
│   │   ├── BuildingShop.tsx        # 建筑商店
│   │   ├── IslandExpansion.tsx     # 岛屿扩展信息
│   │   ├── IslandGrid.tsx          # 岛屿网格
│   │   ├── OrderList.tsx           # 任务订单列表
│   │   └── ResourceBar.tsx         # 资源栏
│   ├── data/               # 游戏数据
│   │   └── gameData.ts            # 初始游戏数据
│   ├── hooks/              # 自定义Hooks
│   │   └── useGameState.ts        # 游戏状态管理
│   ├── types/              # TypeScript类型定义
│   │   └── index.ts
│   ├── App.tsx             # 主应用组件
│   ├── main.tsx            # 应用入口
│   └── index.css           # 全局样式
├── index.html              # HTML入口
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── .gitignore
```

## 游戏玩法

### 基础资源
- 🪵 **木头** - 基础建筑材料
- 🪨 **石头** - 高级建筑材料
- 🍎 **食物** - 维持村民生存
- 💰 **金币** - 通用货币

### 建筑类型
- 🏭 **锯木厂** - 自动生产木头
- ⛏️ **采石场** - 自动生产石头
- 🌾 **农场** - 自动生产食物
- 🏪 **仓库** - 增加存储容量
- 🏫 **研究小屋** - 解锁高级科技（需解锁）
- 🏬 **市场** - 交易资源，产出金币（需解锁）
- 🏛️ **村庄大厅** - 增加资源产出效率（需解锁）
- 🌸 **花园** - 美化岛屿，产出金币和食物

### 如何玩
1. **收集资源** - 初始拥有基础资源
2. **建造建筑** - 在建筑商店选择建筑，点击地图空位放置
3. **自动产出** - 建造的建筑会自动生产资源
4. **完成任务** - 达到任务要求自动完成并获得奖励
5. **升级建筑** - 点击已建造的建筑可以升级，提高产出效率
6. **扩展岛屿** - 积累足够资源后可以扩展岛屿，获得更多建造空间
7. **解锁建筑** - 达到特定资源条件后解锁新建筑

## 安装和运行

### 前置要求
- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

```bash
cd mini-dream-island
npm install
```

### 开发模式

```bash
npm run dev
```

游戏将在 `http://localhost:5173` 启动

### 构建生产版本

```bash
npm run build
```

构建产物将生成在 `dist` 目录

### 预览生产版本

```bash
npm run preview
```

### 代码检查

```bash
npm run lint
```

## 开发说明

### 游戏状态管理
游戏使用自定义 `useGameState` Hook 进行状态管理，包含：
- 资源管理
- 建筑建造、升级、拆除
- 任务完成检测
- 建筑解锁检测
- 自动生产循环

### 组件架构
- `App.tsx` - 主应用组件，整合所有功能
- `ResourceBar` - 顶部资源显示栏
- `IslandGrid` - 岛屿网格，显示和放置建筑
- `BuildingShop` - 建筑商店，选择要建造的建筑
- `OrderList` - 任务订单列表
- `BuildingDetail` - 建筑详情弹窗，支持升级和拆除
- `IslandExpansion` - 岛屿扩展信息面板

### 数据结构
所有游戏数据定义在 `src/types/index.ts` 中，包括：
- `Resource` - 资源类型
- `Building` - 建筑类型
- `PlacedBuilding` - 已放置的建筑
- `Order` - 任务订单
- `GameState` - 完整游戏状态

## 未来规划

- 🎮 添加更多建筑类型
- 🎭 引入村民系统
- 🎪 增加节日活动
- 🎯 更多任务类型
- 🏆 成就系统
- 💾 游戏存档功能
- 🎨 更多皮肤和主题

## 许可证

MIT License
