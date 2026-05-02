# 食谱探索 (Recipe Card App)

一个精美的Angular食谱应用，展示各类美食食谱，支持分类浏览、搜索、以及详细的烹饪步骤展示。

## 项目简介

本应用提供了一个视觉吸引力强的食谱浏览平台，包含：
- 精美的食谱卡片网格布局
- 按分类浏览食谱功能
- 食谱搜索功能
- 详细的食谱详情页面
- 清晰的食材分类展示
- 分步烹饪说明

## 技术栈

- **框架**: Angular 21.2.0
- **语言**: TypeScript 5.9
- **样式**: Tailwind CSS 4.1
- **UI组件库**: Angular Material 21.2
- **路由**: Angular Router
- **打包**: Angular CLI Application Builder
- **测试**: Vitest

## 项目结构

```
recipe-card-app/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── recipe-list/          # 食谱列表组件
│   │   │   │   ├── recipe-list.ts    # 组件逻辑
│   │   │   │   ├── recipe-list.html  # 组件模板
│   │   │   │   └── recipe-list.css   # 组件样式
│   │   │   └── recipe-detail/        # 食谱详情组件
│   │   │       ├── recipe-detail.ts  # 组件逻辑
│   │   │       ├── recipe-detail.html# 组件模板
│   │   │       └── recipe-detail.css # 组件样式
│   │   ├── models/                   # 数据模型
│   │   │   ├── recipe.model.ts       # 食谱模型
│   │   │   ├── ingredient.model.ts   # 食材模型
│   │   │   └── step.model.ts         # 步骤模型
│   │   ├── services/                 # 服务层
│   │   │   └── recipe.service.ts     # 食谱数据服务
│   │   ├── app.ts                    # 根组件
│   │   ├── app.html                  # 根组件模板
│   │   ├── app.css                   # 根组件样式
│   │   ├── app-module.ts             # 根模块
│   │   └── app-routing-module.ts     # 路由配置
│   ├── main.ts                       # 应用入口
│   ├── index.html                    # HTML模板
│   └── styles.css                    # 全局样式
├── angular.json                      # Angular配置
├── package.json                      # 项目依赖
├── tsconfig.json                     # TypeScript配置
└── README.md                         # 项目说明
```

## 功能特性

### 食谱列表页面
- 网格布局展示食谱卡片
- 顶部搜索栏支持关键词搜索
- 分类标签筛选功能
- 每个卡片显示：
  - 食谱图片
  - 难度级别（简单/中等/困难）
  - 分类名称
  - 评分
  - 标题和描述
  - 准备时间和份量
  - 标签

### 食谱详情页面
- 完整的食谱信息展示
- 食材按分类分组显示
- 带序号的分步烹饪说明
- 每个步骤包含预计耗时
- 温馨提示区域
- 返回按钮支持

## 安装与运行

### 前置要求

确保你的开发环境已安装：
- Node.js (v20 或更高版本)
- npm (v10 或更高版本)
- Angular CLI (v21 或更高版本)

### 安装步骤

1. 进入项目目录：
```bash
cd recipe-card-app
```

2. 安装依赖：
```bash
npm install
```

### 启动开发服务器

```bash
ng serve
```

或

```bash
npm start
```

启动后，在浏览器中访问 `http://localhost:4200` 即可查看应用。

### 构建生产版本

```bash
ng build
```

构建产物将输出到 `dist/` 目录。

### 运行测试

```bash
ng test
```

## 核心组件说明

### RecipeListComponent (食谱列表组件)
- **职责**: 展示所有食谱、支持搜索和分类筛选
- **主要功能**:
  - 加载和显示食谱列表
  - 按分类筛选食谱
  - 关键词搜索食谱
  - 点击卡片跳转到详情页

### RecipeDetailComponent (食谱详情组件)
- **职责**: 展示单个食谱的完整信息
- **主要功能**:
  - 从路由获取食谱ID
  - 加载并显示食谱详情
  - 食材按分类分组展示
  - 分步烹饪说明带序号
  - 返回列表功能

### RecipeService (食谱服务)
- **职责**: 提供食谱数据管理
- **主要功能**:
  - 获取所有食谱
  - 按ID获取单个食谱
  - 按分类获取食谱
  - 搜索食谱
  - 获取所有分类

## 数据模型

### Recipe (食谱)
- `id`: 唯一标识
- `title`: 标题
- `description`: 描述
- `imageUrl`: 图片URL
- `category`: 分类
- `prepTime`: 准备时间
- `cookTime`: 烹饪时间
- `totalTime`: 总时间
- `servings`: 份量
- `difficulty`: 难度级别
- `rating`: 评分
- `ingredients`: 食材列表
- `steps`: 步骤列表
- `tags`: 标签

### Ingredient (食材)
- `id`: 唯一标识
- `name`: 名称
- `amount`: 数量
- `unit`: 单位
- `category`: 分类

### Step (步骤)
- `id`: 唯一标识
- `order`: 序号
- `description`: 描述
- `imageUrl`: 图片URL（可选）
- `duration`: 预计耗时（可选）

## 路由配置

- `/` - 食谱列表页面（默认路由）
- `/recipe/:id` - 食谱详情页面
- `**` - 重定向到首页

## 样式与主题

- 使用 Tailwind CSS 进行布局和样式
- Angular Material 提供组件库支持
- 暖色调主题（橙色/红色渐变）
- 响应式设计，支持移动端、平板和桌面端

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目。
