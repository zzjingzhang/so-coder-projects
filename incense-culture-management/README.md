# 香道文化管理系统

一个优雅的个人香道文化网页应用，用于管理香品档案和记录品香体验。

## 项目简介

香道文化管理系统是一个纯前端应用，帮助您系统化地管理香品收藏和记录品香体验。无论是专业的香道爱好者还是初入香道的新手，都可以通过本系统轻松管理您的香品档案和品香记录。

### 核心功能

- **香品档案管理**：记录沉香、檀香等各类香料的品质、产地、价格等信息
- **品香记录**：记录香道仪式和品香体验感受，包括环境温度、湿度、评分等
- **响应式设计**：适配桌面和移动设备
- **优雅的界面**：使用 Tailwind CSS 和 PrimeNG 打造精美的用户界面

## 技术栈

- **前端框架**：Angular 21+ (Standalone Components)
- **编程语言**：TypeScript
- **样式框架**：Tailwind CSS
- **UI 组件库**：PrimeNG
- **路由**：Angular Router
- **打包工具**：Angular CLI Application Builder

## 项目结构

```
incense-culture-management/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── navbar/                    # 导航栏组件
│   │   │       ├── navbar.component.ts
│   │   │       ├── navbar.component.html
│   │   │       └── navbar.component.css
│   │   ├── pages/
│   │   │   ├── home/                      # 首页
│   │   │   │   ├── home.component.ts
│   │   │   │   ├── home.component.html
│   │   │   │   └── home.component.css
│   │   │   ├── incense-archive/           # 香品档案
│   │   │   │   ├── incense-archive.component.ts
│   │   │   │   ├── incense-archive.component.html
│   │   │   │   └── incense-archive.component.css
│   │   │   └── incense-record/            # 品香记录
│   │   │       ├── incense-record.component.ts
│   │   │       ├── incense-record.component.html
│   │   │       └── incense-record.component.css
│   │   ├── types/
│   │   │   └── index.ts                    # 类型定义
│   │   ├── app.ts                          # 根组件
│   │   ├── app.html
│   │   ├── app.css
│   │   ├── app.config.ts                   # 应用配置
│   │   └── app.routes.ts                   # 路由配置
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── angular.json                            # Angular 配置
├── package.json                            # 依赖配置
├── tailwind.config.js                      # Tailwind CSS 配置
├── postcss.config.js                       # PostCSS 配置
├── tsconfig.json                           # TypeScript 配置
├── tsconfig.app.json
├── tsconfig.spec.json
├── .editorconfig
├── .gitignore
├── .prettierrc
└── README.md
```

## 快速开始

### 环境要求

- Node.js >= 18.x
- npm >= 9.x

### 安装依赖

```bash
cd incense-culture-management
npm install
```

### 开发模式

```bash
npm run dev
```

或者

```bash
npm start
```

项目将在 `http://localhost:4200` 启动。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist/` 目录。

### 运行测试

```bash
npm test
```

## 功能详情

### 香品档案

香品档案模块允许您：

- **添加香品**：录入香品名称、类型、产地、品质、价格、描述等信息
- **编辑香品**：修改已存在的香品信息
- **删除香品**：移除不需要的香品记录
- **分页查看**：支持分页浏览大量香品数据
- **排序功能**：按名称、类型、产地、品质、价格等字段排序

支持的香料类型：
- 沉香、檀香、龙涎香、乳香、安息香、苏合香、麝香等

支持的产地：
- 越南、印度尼西亚、马来西亚、泰国、柬埔寨、印度、中国海南、中国云南等

### 品香记录

品香记录模块允许您：

- **添加记录**：记录每次品香的仪式名称、类型、使用香品、体验感受等
- **查看记录**：浏览历史品香记录
- **编辑记录**：修改已存在的品香记录
- **删除记录**：移除不需要的记录
- **环境记录**：记录品香时的温度、湿度等环境信息
- **评分系统**：使用 1-5 星评分系统记录品香体验

支持的仪式类型：
- 空薰、隔火薰香、品香会、禅修品香、茶道品香等

## 特色设计

### 配色方案

项目采用温暖优雅的配色方案，体现香道文化的深厚底蕴：

- **主色调**：棕色系 (`#8B4513`, `#5D4037`)
- **辅助色**：金色 (`#DAA520`)、米色 (`#F5F5DC`)
- **背景色**：暖白色 (`#f8f5f0`)

### UI 组件

项目使用 PrimeNG 组件库提供丰富的交互体验：

- **Table**：数据表格展示香品和记录
- **Dialog**：模态对话框用于添加/编辑
- **Dropdown**：下拉选择器
- **Calendar**：日期时间选择器
- **Rating**：星级评分
- **Toast**：消息提示
- **ConfirmDialog**：确认对话框
- **Card**：卡片组件

## 开发指南

### 添加新页面

1. 在 `src/app/pages/` 目录下创建新组件
2. 在 `src/app/app.routes.ts` 中添加路由配置
3. 在 `src/app/components/navbar/navbar.component.ts` 中添加导航项

### 添加新类型

在 `src/app/types/index.ts` 中定义新的 TypeScript 接口。

### 自定义样式

- 全局样式在 `src/styles.css` 中定义
- 组件样式在各自组件的 `.css` 文件中定义
- Tailwind CSS 配置在 `tailwind.config.js` 中

## 许可证

本项目仅供学习和个人使用。

## 贡献

欢迎提交 Issue 和 Pull Request！

---

🌿 传承千年香文化，从这里开始。
