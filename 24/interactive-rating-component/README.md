# Interactive Rating Component

一个使用 Angular 框架构建的交互式评分组件，用户可以在 1 到 5 星级中选择评分，点击提交后页面切换到感谢页面并显示用户选择的评分。

## 项目结构

```
interactive-rating-component/
├── src/
│   ├── app/
│   │   ├── rating/                    # 评分组件
│   │   │   ├── rating.css
│   │   │   ├── rating.html
│   │   │   └── rating.ts
│   │   ├── thank-you/                 # 感谢页面组件
│   │   │   ├── thank-you.css
│   │   │   ├── thank-you.html
│   │   │   └── thank-you.ts
│   │   ├── services/                  # 服务层
│   │   │   └── rating.service.ts      # 评分数据服务
│   │   ├── app-module.ts              # 主模块
│   │   ├── app-routing-module.ts      # 路由模块
│   │   ├── app.ts                     # 主组件
│   │   ├── app.html                   # 主组件模板
│   │   └── app.css                    # 主组件样式
│   ├── main.ts                         # 应用入口
│   ├── index.html                      # HTML 入口
│   └── styles.css                      # 全局样式
├── tailwind.config.js                  # Tailwind CSS 配置
├── postcss.config.js                   # PostCSS 配置
├── angular.json                        # Angular 配置
├── package.json                        # 项目依赖
├── tsconfig.json                       # TypeScript 配置
└── README.md                           # 项目文档
```

## 技术栈

- **框架**: Angular 21.2.0
- **语言**: TypeScript 5.9.2
- **样式**: Tailwind CSS 4.2.4
- **UI 组件库**: PrimeNG 21.1.6
- **图标库**: PrimeIcons 7.0.0
- **路由**: Angular Router
- **打包工具**: Angular CLI Application Builder

## 功能特性

1. **评分选择**: 用户可以选择 1 到 5 星级评分
2. **视觉反馈**: 选择的评分按钮会高亮显示
3. **提交功能**: 点击提交按钮后跳转到感谢页面
4. **感谢页面**: 显示用户选择的评分，并提供再次评分的选项
5. **响应式设计**: 适配桌面端和移动端
6. **现代 UI 设计**: 深蓝背景配合橙色高亮，圆角卡片设计

## 配色方案

- **深蓝背景**: `#1a1a2e` (deep-blue)
- **中等蓝色**: `#16213e` (medium-blue)
- **浅蓝色**: `#0f3460` (light-blue)
- **橙色高亮**: `#f97316` (orange-accent)
- **橙色悬停**: `#ea580c` (orange-hover)

## 安装与启动

### 前置要求

确保你的开发环境已安装：
- Node.js (建议版本 18.x 或更高)
- npm (随 Node.js 一起安装)
- Angular CLI (全局安装)

### 安装步骤

1. **进入项目目录**

```bash
cd interactive-rating-component
```

2. **安装依赖**

```bash
npm install
```

### 启动开发服务器

```bash
ng serve
```

或者使用 npm 脚本：

```bash
npm start
```

服务器启动后，打开浏览器访问 `http://localhost:4200/` 即可查看应用。

### 构建生产版本

```bash
ng build
```

构建产物将输出到 `dist/` 目录。

## 使用说明

1. 在评分页面，点击 1-5 之间的任意数字选择评分
2. 选择后，选中的数字按钮会变为橙色高亮
3. 点击 "Submit" 按钮提交评分
4. 页面会跳转到感谢页面，显示你选择的评分
5. 在感谢页面，可以点击 "Rate Again" 按钮重新评分

## 组件说明

### RatingComponent (评分组件)

- **文件位置**: `src/app/rating/`
- **功能**: 显示评分界面，允许用户选择 1-5 星级评分
- **关键方法**:
  - `selectRating(rating: number)`: 选择评分
  - `submitRating()`: 提交评分并导航到感谢页面
  - `isSelected(rating: number)`: 检查评分是否被选中

### ThankYouComponent (感谢组件)

- **文件位置**: `src/app/thank-you/`
- **功能**: 显示感谢页面，展示用户选择的评分
- **关键方法**:
  - `ngOnInit()`: 初始化时获取评分数据
  - `goBack()`: 返回评分页面

### RatingService (评分服务)

- **文件位置**: `src/app/services/rating.service.ts`
- **功能**: 在组件之间传递评分数据
- **关键方法**:
  - `setRating(rating: number)`: 设置评分
  - `getRating()`: 获取评分

## 路由配置

| 路径 | 组件 | 说明 |
|------|------|------|
| `/` | RatingComponent | 评分页面（默认） |
| `/thank-you` | ThankYouComponent | 感谢页面 |
| `**` | RatingComponent | 通配符路由，重定向到首页 |

## 开发服务器

运行 `ng serve` 启动开发服务器。导航到 `http://localhost:4200/`。如果您更改任何源文件，应用程序将自动重新加载。

## 代码脚手架

运行 `ng generate component component-name` 生成新组件。您也可以使用 `ng generate directive|pipe|service|class|guard|interface|enum|module`。

## 构建

运行 `ng build` 构建项目。构建工件将存储在 `dist/` 目录中。

## 运行测试

运行 `ng test` 执行单元测试。

## 更多帮助

要获取有关 Angular CLI 的更多帮助，请使用 `ng help` 或查看 [Angular CLI 概述和命令参考](https://angular.dev/tools/cli) 页面。
