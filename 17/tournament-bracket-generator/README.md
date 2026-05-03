# 体育赛事分组生成器

一个基于 Angular 框架开发的体育赛事分组生成器，支持自动生成水平树状分组图表，展示赛事各轮次对阵及晋级流程。

## 功能特性

### 核心功能
- **赛事信息录入**：支持输入锦标赛名称、比赛起止日期及参赛队伍数量
- **智能验证**：自动验证日期格式、日期范围有效性以及参赛队伍数量（必须为偶数）
- **水平树状分组图表**：自动生成美观的水平树状分组图，展示完整赛事对阵流程
- **多轮次支持**：支持 2、4、8、16、32、64 支队伍的赛事分组
- **轮空机制**：当队伍数量不是 2 的幂次方时，自动设置轮空

### 额外功能
- **比赛信息编辑**：每场比赛可输入参赛队伍名称、比赛日期和最终比分
- **晋级自动流转**：比赛结果录入后，获胜队伍自动晋级到下一轮
- **数据持久化**：所有数据通过 localStorage 存储，会话之间自动保留
- **冠军显示**：决赛结束后自动显示冠军和亚军信息

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Angular | 21.x | 前端框架 |
| TypeScript | 5.9.x | 开发语言 |
| Tailwind CSS | 3.4.x | CSS 框架 |
| Angular Material | 21.x | UI 组件库 |
| Angular Router | 21.x | 路由管理 |
| Angular CLI | 21.x | 项目构建工具 |

## 项目结构

```
tournament-bracket-generator/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── tournament-form/          # 赛事表单组件
│   │   │   │   ├── tournament-form.component.ts
│   │   │   │   ├── tournament-form.component.html
│   │   │   │   └── tournament-form.component.css
│   │   │   ├── bracket-display/          # 分组图表面板组件
│   │   │   │   ├── bracket-display.component.ts
│   │   │   │   ├── bracket-display.component.html
│   │   │   │   └── bracket-display.component.css
│   │   │   └── match-edit-dialog/        # 比赛编辑对话框组件
│   │   │       ├── match-edit-dialog.component.ts
│   │   │       ├── match-edit-dialog.component.html
│   │   │       └── match-edit-dialog.component.css
│   │   ├── models/
│   │   │   └── tournament.model.ts       # 数据模型定义
│   │   ├── services/
│   │   │   ├── tournament-storage.service.ts    # 本地存储服务
│   │   │   └── tournament-generator.service.ts  # 赛事生成服务
│   │   ├── app.component.ts              # 主应用组件
│   │   ├── app.component.html
│   │   ├── app.component.css
│   │   ├── app.module.ts                 # 主模块
│   │   └── app-routing.module.ts         # 路由配置
│   ├── index.html                        # 入口 HTML
│   ├── main.ts                           # 入口文件
│   └── styles.css                        # 全局样式
├── public/
│   └── favicon.ico                       # 网站图标
├── angular.json                          # Angular 配置
├── package.json                          # 依赖配置
├── tsconfig.json                         # TypeScript 配置
├── tailwind.config.js                    # Tailwind CSS 配置
├── postcss.config.js                     # PostCSS 配置
└── README.md                             # 项目说明文档
```

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0
- Angular CLI >= 21.0.0

### 安装步骤

1. **克隆项目**（如果从版本控制获取）

```bash
# 进入项目目录
cd tournament-bracket-generator
```

2. **安装依赖**

```bash
npm install
```

3. **启动开发服务器**

```bash
ng serve
```

或使用 npm 脚本：

```bash
npm run start
```

4. **访问应用**

打开浏览器访问 `http://localhost:4200`

### 构建生产版本

```bash
ng build --configuration production
```

构建产物将输出到 `dist/` 目录。

## 使用说明

### 创建新赛事

1. 在首页填写以下信息：
   - **锦标赛名称**：输入赛事的名称（至少 2 个字符）
   - **开始日期**：选择比赛开始日期
   - **结束日期**：选择比赛结束日期（必须大于等于开始日期）
   - **参赛队伍数量**：选择队伍数量（2、4、8、16、32、64）

2. 点击 **"生成赛事分组"** 按钮

3. 系统将自动生成分组图表

### 编辑比赛信息

1. 在分组图表面板中，点击任意比赛卡片
2. 在弹出的编辑对话框中：
   - **队伍 1 名称**：输入第一支队伍的名称
   - **队伍 2 名称**：输入第二支队伍的名称
   - **比赛日期**：选择该场比赛的日期
   - **比赛结果**：输入两队的比分

3. 点击 **"保存"** 按钮

4. 获胜队伍将自动晋级到下一轮

### 数据管理

- **加载已保存赛事**：如果之前创建过赛事，可点击顶部导航栏的 **"加载已保存"** 按钮
- **创建新赛事**：点击顶部导航栏的 **"创建新赛事"** 按钮
- **清除数据**：点击顶部导航栏的 **"清除数据"** 按钮可删除所有本地存储的数据

## 功能亮点

### 智能分组算法

- 自动计算所需轮次数
- 支持非 2 的幂次方队伍数量，自动设置轮空
- 自动建立轮次之间的晋级关系

### 响应式设计

- 适配桌面端和移动端
- 分组图表支持水平滚动
- 优雅的动画和过渡效果

### 数据持久化

- 所有数据自动保存到 localStorage
- 刷新页面或关闭浏览器后数据不会丢失
- 支持随时创建新赛事或加载已有赛事

## 开发说明

### 组件说明

| 组件 | 职责 |
|------|------|
| TournamentFormComponent | 赛事信息录入表单，包含表单验证 |
| BracketDisplayComponent | 分组图表面板，展示各轮次比赛 |
| MatchEditDialogComponent | 比赛信息编辑对话框 |
| AppComponent | 主应用容器，管理视图切换 |

### 服务说明

| 服务 | 职责 |
|------|------|
| TournamentGeneratorService | 赛事分组生成、比赛结果更新、数据验证 |
| TournamentStorageService | localStorage 数据的存取操作 |

### 数据模型

```typescript
// 比赛模型
interface Match {
  id: string;           // 比赛唯一标识
  round: number;        // 轮次
  position: number;     // 位置
  team1: Team | null;   // 队伍1
  team2: Team | null;   // 队伍2
  score1: number | null; // 队伍1比分
  score2: number | null; // 队伍2比分
  matchDate: string | null; // 比赛日期
  winner: 'team1' | 'team2' | null; // 获胜方
  nextMatchId: string | null; // 下一轮比赛ID
}

// 赛事模型
interface Tournament {
  name: string;         // 赛事名称
  startDate: string;    // 开始日期
  endDate: string;      // 结束日期
  teamCount: number;    // 队伍数量
  rounds: number;       // 轮次数
  matches: Match[];     // 所有比赛
  createdAt: string;    // 创建时间
  updatedAt: string;    // 更新时间
}
```

## 浏览器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

---

**享受使用体育赛事分组生成器！** 🏆
