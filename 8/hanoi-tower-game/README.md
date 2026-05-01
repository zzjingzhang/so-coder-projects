# 汉诺塔游戏 (Hanoi Tower Game)

一个使用 Angular 框架开发的汉诺塔游戏，支持键盘操作，界面美观且交互友好。

## 游戏规则

1. **目标**：将所有圆环从柱1移动到柱3
2. **规则**：小圆环必须放在大圆环上
3. **操作**：点击柱子选择圆环，再点击目标柱子进行移动

## 功能特性

- 🎮 点击柱子进行圆环移动
- ⌨️ 键盘快捷键支持：
  - **↑ / ↓**：增加/减少圆环数量（3-6个）
  - **R**：重新开始游戏
- 📊 实时显示当前步数和最少步数
- 🎨 美观的渐变背景和动画效果
- 🏆 完成游戏时显示恭喜信息

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Angular | 21+ | 前端框架 |
| TypeScript | 5.9+ | 编程语言 |
| Tailwind CSS | 3.4+ | CSS 框架 |
| NG-ZORRO | 21+ | UI 组件库 |
| Angular Router | 21+ | 路由管理 |
| Angular CLI | 21+ | 项目构建工具 |

## 项目结构

```
hanoi-tower-game/
├── public/                     # 静态资源目录
│   └── favicon.ico            # 网站图标
├── src/                        # 源代码目录
│   ├── app/                   # 应用组件目录
│   │   ├── app-module.ts      # 根模块
│   │   ├── app-routing-module.ts  # 路由模块
│   │   ├── app.ts             # 根组件逻辑
│   │   ├── app.html           # 根组件模板
│   │   ├── app.css            # 根组件样式
│   │   └── app.spec.ts        # 根组件测试文件
│   ├── main.ts                # 应用入口
│   ├── index.html             # HTML 模板
│   └── styles.css             # 全局样式
├── angular.json               # Angular 配置文件
├── tailwind.config.js         # Tailwind CSS 配置
├── postcss.config.js          # PostCSS 配置
├── package.json               # 项目依赖配置
├── tsconfig.json              # TypeScript 配置
├── tsconfig.app.json          # TypeScript 应用配置
├── tsconfig.spec.json         # TypeScript 测试配置
├── .editorconfig              # 编辑器配置
├── .gitignore                 # Git 忽略配置
├── .prettierrc                # Prettier 配置
└── README.md                  # 项目说明文档
```

## 快速开始

### 环境要求

- Node.js (建议 18+ 版本)
- npm 或 yarn
- Angular CLI

### 安装依赖

```bash
cd hanoi-tower-game
npm install
```

### 启动开发服务器

```bash
ng serve
# 或者
npm run start
```

启动成功后，打开浏览器访问 `http://localhost:4200` 即可开始游戏。

### 构建生产版本

```bash
ng build
# 或者
npm run build
```

构建产物将输出到 `dist/` 目录。

### 运行测试

```bash
ng test
# 或者
npm run test
```

## 使用说明

### 鼠标操作

1. **选择圆环**：点击任意有圆环的柱子，选中后该柱子会高亮显示
2. **移动圆环**：再点击目标柱子，即可将顶部的圆环移动过去
3. **取消选择**：如果选中了柱子但不想移动，再次点击同一柱子即可取消选择

### 键盘操作

| 按键 | 功能 |
|------|------|
| ↑ (上方向键) | 增加圆环数量（最多6个） |
| ↓ (下方向键) | 减少圆环数量（最少3个） |
| R / r | 重新开始游戏 |

### 界面元素说明

- **当前步数**：显示你已经移动了多少次
- **最少步数**：完成当前数量圆环所需的最少步数（公式：2^n - 1）
- **圆环数量**：当前游戏的圆环总数（3-6个）
- **柱子编号**：柱1、柱2、柱3，目标是将所有圆环移到柱3

## 游戏提示

- 对于 n 个圆环，最少需要 2^n - 1 步完成
- 3个圆环：7步
- 4个圆环：15步
- 5个圆环：31步
- 6个圆环：63步

## 开发说明

### 核心文件说明

- **app.ts**：包含游戏的核心逻辑，包括：
  - 游戏状态管理（柱子、圆环、步数等）
  - 圆环移动逻辑
  - 胜利条件判断
  - 键盘事件监听

- **app.html**：游戏界面模板，包含：
  - 信息展示区（步数、圆环数量等）
  - 游戏主区域（三根柱子和圆环）
  - 操作说明区

- **app.css**：组件样式（使用 Tailwind CSS 类）

### 样式配置

项目使用 Tailwind CSS 进行样式开发，配置文件为：
- `tailwind.config.js` - Tailwind 配置
- `postcss.config.js` - PostCSS 配置
- `src/styles.css` - 全局样式，包含 Tailwind 基础样式导入

### 组件库

使用 NG-ZORRO 组件库，已导入以下模块：
- `NzButtonModule` - 按钮组件
- `NzSelectModule` - 选择框组件
- `NzMessageModule` - 消息提示组件

## 许可证

MIT License

## 联系方式

如有问题或建议，欢迎提交 Issue。
