# 齐王与田忌赛马模拟器

一个互动性强的齐王与田忌赛马模拟网页，基于 React 构建，支持实时动画展示和策略分析。

## 项目简介

田忌赛马是中国古代著名的博弈故事。齐王的马总体实力强于田忌的马，但田忌通过巧妙的策略安排，最终以 2:1 的比分获胜。这个项目让用户可以亲自体验这个经典的博弈故事，选择不同的出马顺序，观察比赛过程，分析最优策略。

### 核心功能

- 🎮 **互动游戏体验**：用户可选择齐王和田忌的出马顺序
- 🏇 **实时赛马动画**：可视化展示马匹移动过程，绿色赛道配起点终点线
- 📊 **完整比赛记录**：记录每场比赛详情及胜负统计
- 🔍 **策略分析工具**：显示最优策略，支持 36 种策略组合分析
- 📱 **响应式设计**：完美适配手机和桌面设备

### 视觉风格

- **主色调**：棕褐色 (#8b4513)
- **赛道**：绿色背景，白色起点线，红色终点线
- **马匹**：齐王马为白色 🐎，田忌马为黑色 🏇
- **表格**：隔行变色样式
- **胜利标记**：绿色文字
- **最优策略**：红色圆圈标记

## 技术栈

- **框架**：React 19
- **语言**：JavaScript
- **样式**：Tailwind CSS v4
- **UI 组件库**：Chakra UI v3
- **路由**：React Router v7
- **打包工具**：Vite v8

## 项目结构

```
horse-racing-simulation/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── AnalysisPanel.jsx      # 策略分析面板（含最优策略分析、全部策略一览、故事背景三个标签页）
│   │   ├── ControlPanel.jsx       # 控制面板（齐王/田忌出马顺序选择、功能按钮组）
│   │   ├── HorseRacingGame.jsx    # 主游戏组件（核心业务逻辑）
│   │   ├── MarqueeBanner.jsx      # 顶部跑马灯通知（可显示/隐藏）
│   │   ├── RaceTrack.jsx          # 赛马轨道组件（含动画、起点终点线）
│   │   └── ResultTable.jsx        # 比赛结果表格（隔行变色、胜负统计）
│   ├── utils/
│   │   └── gameLogic.js           # 游戏核心逻辑（马匹定义、胜负判定、策略分析算法）
│   ├── App.jsx                     # 应用入口组件
│   ├── App.css
│   ├── index.css                   # 全局样式（含 Tailwind 配置、跑马灯动画）
│   └── main.jsx                    # 应用入口（Chakra Provider + React Router）
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js              # PostCSS 配置
├── tailwind.config.js             # Tailwind CSS 配置（自定义颜色）
└── vite.config.js                 # Vite 配置
```

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

开发服务器启动后，访问 http://localhost:5173 即可查看应用。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 预览生产版本

```bash
npm run preview
```

## 使用说明

### 游戏规则

1. **马匹等级**：双方各有上/中/下三等马
   - 齐王马速度：上等马 100 | 中等马 80 | 下等马 60
   - 田忌马速度：上等马 90 | 中等马 70 | 下等马 50

2. **比赛方式**：每轮比赛包含三场对决，胜场多者获胜

3. **最优策略（经典田忌策略）**：
   - 第一场：下等马 vs 齐王上等马 → 输
   - 第二场：上等马 vs 齐王中等马 → 赢
   - 第三场：中等马 vs 齐王下等马 → 赢
   - 最终结果：田忌 2:1 获胜

### 操作步骤

1. **选择出马顺序**：在控制面板中分别选择齐王和田忌的三场比赛出马顺序

2. **开始比赛**：点击「开始比赛」按钮，观看赛马动画

3. **查看结果**：比赛结束后，结果表格会显示每场比赛的详情和胜负统计

4. **分析策略**：点击「分析策略」按钮，查看所有可能的策略组合和最优策略

5. **重置比赛**：点击「重置比赛」按钮，可重新选择出马顺序

### 特殊功能

1. **顶部跑马灯**：页面顶部有可显示/隐藏的跑马灯通知，显示欢迎信息和获胜提示

2. **策略分析面板**：点击「分析策略」按钮展开分析面板，包含三个标签页：
   - **最优策略分析**：展示经典田忌策略和所有可让田忌获胜的策略组合
   - **全部策略一览**：列出全部 36 种可能的策略组合及其结果
   - **故事背景**：田忌赛马的历史故事和博弈论启示

3. **Toast 提示**：比赛结束或分析策略时会显示 Toast 提示信息

## 核心组件说明

### HorseRacingGame (主游戏组件)

核心业务逻辑组件，管理：
- 游戏状态（当前轮次、是否比赛中）
- 比赛结果和统计
- 动画控制
- 策略分析数据

### RaceTrack (赛马轨道)

可视化赛马过程：
- 绿色赛道背景
- 白色起点线，红色终点线
- 实时马匹位置动画
- 响应式高度适配

### ControlPanel (控制面板)

用户交互入口：
- 齐王/田忌出马顺序选择（下拉选择器）
- 功能按钮（开始比赛、分析策略、重置比赛）
- 分组展示，响应式布局

### ResultTable (结果表格)

比赛结果展示：
- 隔行变色样式
- 每场比赛详情（场次、马匹、速度、结果）
- 胜负统计和最终结果
- Badge 状态标记

### AnalysisPanel (分析面板)

策略分析工具：
- 经典最优策略详解
- 全部 36 种策略组合列表
- 历史故事背景介绍
- Collapse 可折叠显示

### MarqueeBanner (跑马灯)

顶部通知栏：
- 自动滚动动画
- 可显示/隐藏切换
- 获胜时更新内容

## 游戏逻辑算法

### 胜负判定

```javascript
determineWinner(kingHorse, tianyiHorse) {
  if (tianyiHorse.speed > kingHorse.speed) return 'tianyi';
  if (tianyiHorse.speed < kingHorse.speed) return 'king';
  return 'draw';
}
```

### 全排列算法

用于生成所有可能的出马顺序组合（3! = 6 种）。

### 最优策略查找

针对给定的齐王出马顺序，遍历所有 6 种田忌策略，找出获胜场次最多的策略。

## 自定义配置

### 修改马匹速度

编辑 `src/utils/gameLogic.js` 中的 `KING_HORSES` 和 `TIANYI_HORSES` 对象：

```javascript
export const KING_HORSES = {
  [HORSE_LEVELS.SUPERIOR]: { level: HORSE_LEVELS.SUPERIOR, speed: 100, owner: 'king' },
  [HORSE_LEVELS.MEDIUM]: { level: HORSE_LEVELS.MEDIUM, speed: 80, owner: 'king' },
  [HORSE_LEVELS.INFERIOR]: { level: HORSE_LEVELS.INFERIOR, speed: 60, owner: 'king' },
};
```

### 修改主题色

编辑 `src/main.jsx` 中的 `extendTheme` 配置。

### 修改动画时长

编辑 `src/components/HorseRacingGame.jsx` 中的 `animateRace` 函数：

```javascript
const duration = 3000; // 毫秒
```

## License

MIT

## 贡献

欢迎提交 Issue 和 PR！
