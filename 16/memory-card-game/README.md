# 🃏 扑克牌记忆游戏

一款专为小学生设计的记忆力训练游戏，帮助孩子们提高记忆力和专注力。

## 📋 项目简介

这款扑克牌记忆游戏是一款简单有趣的记忆力训练工具。玩家需要先记住9张随机扑克牌的位置，然后按照从小到大的顺序（A→K）依次翻开它们。翻错的牌会自动翻回去，挑战你的记忆力！

## 🛠️ 技术栈

- **框架**: Angular 18 (Standalone Components)
- **语言**: TypeScript
- **样式**: Tailwind CSS 3
- **UI 组件库**: NG-ZORRO (Ant Design for Angular)
- **路由**: Angular Router
- **打包**: Angular CLI Application Builder

## 📁 项目结构

```
memory-card-game/
├── src/
│   ├── app/
│   │   ├── game/
│   │   │   ├── game.component.ts      # 游戏核心逻辑
│   │   │   ├── game.component.html    # 游戏界面模板
│   │   │   └── game.component.css     # 游戏样式
│   │   ├── app.component.ts            # 根组件
│   │   ├── app.component.html          # 根组件模板
│   │   ├── app.config.ts               # 应用配置
│   │   └── app.routes.ts               # 路由配置
│   ├── index.html                       # HTML 入口
│   ├── main.ts                          # 应用入口
│   └── styles.css                       # 全局样式
├── tailwind.config.js                   # Tailwind 配置
├── angular.json                         # Angular 配置
├── package.json                         # 依赖配置
└── README.md                            # 项目文档
```

## 🎮 游戏功能

1. **发牌功能**: 点击"开始发牌"按钮，随机展示9张扑克牌
2. **记忆阶段**: 展示牌面后，玩家有充足的时间记住每张牌的位置
3. **游戏阶段**: 点击"开始游戏"后，所有牌面朝下
4. **按序翻牌**: 必须按照牌面大小顺序（从A到K）依次翻开牌
5. **错误反馈**: 如果翻错了牌，牌会在1秒后自动翻回去
6. **统计功能**: 实时跟踪并显示：
   - 📚 记忆时间
   - ⏱️ 游戏时间
   - 🎯 翻牌次数
7. **游戏完成**: 成功完成后显示成绩，并提供"再玩一次"选项

## 🚀 如何启动项目

### 前置条件

确保你的开发环境已安装：
- Node.js (推荐 v18 或更高版本)
- npm (通常随 Node.js 一起安装)

### 安装依赖

```bash
cd memory-card-game
npm install
```

### 启动开发服务器

```bash
npm start
```

或使用 Angular CLI：

```bash
ng serve
```

服务器启动后，在浏览器中访问 `http://localhost:4200/` 即可开始游戏。

### 构建生产版本

```bash
npm run build
```

构建产物将存储在 `dist/` 目录中。

## 🎯 游戏玩法

1. 点击 **"🎴 开始发牌"** 按钮，9张随机扑克牌会正面朝上显示
2. 记住每张牌的位置和大小，你可以用任意多的时间来记忆
3. 准备好后，点击 **"🎮 开始游戏"** 按钮，所有牌会翻面朝下
4. 游戏提示你下一张应该翻开的牌是多少
5. 按照从小到大的顺序（A→2→3→...→K）依次点击牌
6. 如果翻对了，牌会保持翻开状态并显示绿色对勾
7. 如果翻错了，牌会在1秒后自动翻回去
8. 成功翻开所有牌后，会显示你的成绩
9. 点击 **"再玩一次"** 开始新的挑战

## 🎨 设计特点

- **简洁明亮**: 使用蓝紫渐变背景，白色卡片，适合儿童使用
- **大字体**: 所有文字和按钮都使用较大的字号，便于阅读
- **鲜明色彩**: 使用蓝色、绿色、紫色等鲜明色彩区分不同功能
- **响应式**: 适配不同屏幕尺寸，在手机、平板和电脑上都能正常使用
- **趣味表情**: 使用 🃏 🎴 🎮 🧠 等 emoji 增加趣味性

## 📝 开发说明

### 核心组件

- `GameComponent`: 游戏的主要组件，包含所有游戏逻辑

### 游戏状态

- `Idle`: 初始状态，等待玩家开始
- `Memorizing`: 记忆阶段，牌面朝上
- `Playing`: 游戏阶段，牌面朝下，玩家开始翻牌
- `Completed`: 游戏完成，显示成绩

### 扑克牌数据结构

```typescript
interface Card {
  suit: string;           // 花色: hearts, diamonds, clubs, spades
  value: number;          // 数值: 1(A) - 13(K)
  display: string;        // 显示文字: A, 2-10, J, Q, K
  suitSymbol: string;     // 花色符号: ♥, ♦, ♣, ♠
  id: number;             // 唯一标识
  isFlipped: boolean;     // 是否翻开
  isMatched: boolean;     // 是否匹配成功
}
```

## 📄 许可证

本项目仅供教育目的使用。

---

💡 祝小朋友们游戏愉快，记忆力越来越好！
