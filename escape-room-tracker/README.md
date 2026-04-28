# 密室逃脱体验跟踪系统

一个纯前端的密室逃脱体验网页应用，用于跟踪和记录密室逃脱体验。

## 项目介绍

本系统帮助用户记录和管理密室逃脱体验，包括：
- **场馆档案**：查看体验过的密室主题和难度等级
- **通关记录**：记录逃脱时间、团队配合情况等详细信息

## 技术栈

- **框架**: Angular 21.2
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **UI组件库**: NG-ZORRO (Ant Design for Angular)
- **路由**: Angular Router
- **打包工具**: Angular CLI Application Builder

## 项目结构

```
escape-room-tracker/
├── src/
│   ├── app/
│   │   ├── rooms/                    # 场馆档案组件
│   │   │   └── rooms.component.ts    # 场馆档案组件实现
│   │   ├── records/                   # 通关记录组件
│   │   │   └── records.component.ts  # 通关记录组件实现
│   │   ├── services/                  # 服务层
│   │   │   └── data.service.ts       # 数据服务（包含模拟数据）
│   │   ├── types/                     # 类型定义
│   │   │   └── index.ts               # 类型接口定义
│   │   ├── app.ts                     # 根组件
│   │   ├── app.html                   # 根组件模板
│   │   ├── app.css                    # 根组件样式
│   │   ├── app.config.ts              # 应用配置
│   │   └── app.routes.ts              # 路由配置
│   ├── index.html                     # 入口HTML
│   ├── main.ts                        # 应用入口
│   └── styles.css                     # 全局样式
├── tailwind.config.js                 # Tailwind CSS配置
├── postcss.config.js                  # PostCSS配置
├── angular.json                       # Angular配置
├── package.json                       # 项目依赖
└── README.md                          # 项目说明
```

## 功能特性

### 场馆档案
- 以卡片形式展示所有体验过的密室
- 显示密室名称、主题、难度等级
- 显示预计时间和场馆位置
- 使用不同颜色标识难度等级

### 通关记录
- 统计卡片展示总场次、成功/失败次数、平均用时
- 详细表格展示每次逃脱的记录
- 显示日期、密室名称、结果、用时
- 记录团队成员、团队配合情况、使用提示次数
- 支持分页、显示数量调整、快速跳转

## 安装和运行

### 环境要求
- Node.js >= 18.13.0
- npm >= 9.0.0

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run start
# 或
ng serve
```

应用将在 `http://localhost:4200` 运行。

### 构建生产版本

```bash
npm run build
# 或
ng build
```

构建产物将生成在 `dist/` 目录。

### 监听模式构建

```bash
npm run watch
# 或
ng build --watch --configuration development
```

## 路由说明

| 路径 | 组件 | 描述 |
|------|------|------|
| `/` | 重定向到 `/rooms` | 默认路径 |
| `/rooms` | RoomsComponent | 场馆档案页面 |
| `/records` | RecordsComponent | 通关记录页面 |

## 数据结构

### EscapeRoom (密室)
```typescript
interface EscapeRoom {
  id: string;
  name: string;
  theme: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme';
  description: string;
  estimatedTime: number;
  location: string;
  imageUrl?: string;
}
```

### EscapeRecord (通关记录)
```typescript
interface EscapeRecord {
  id: string;
  roomId: string;
  roomName: string;
  escapeTime: number;
  escaped: boolean;
  teamMembers: string[];
  teamCoordination: 'excellent' | 'good' | 'average' | 'poor';
  notes: string;
  date: string;
  hintsUsed: number;
}
```

## 开发说明

本项目使用 Angular 的独立组件 (Standalone Components) 模式，所有组件都是独立的，不需要 NgModule。

项目包含模拟数据，位于 `src/app/services/data.service.ts`，实际项目中可替换为真实的 API 调用。

## License

MIT
