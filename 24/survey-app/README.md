# 调查管理系统 (Survey App)

一个功能完整的调查应用程序，支持调查的定义、开展和结果查看，包含两种用户角色：调查协调员（管理员）和调查受访者（普通用户）。

## 功能特性

### 用户角色
- **调查协调员（管理员）**：可以创建、编辑、管理调查，发布和关闭调查，查看所有调查结果
- **调查受访者（普通用户）**：可以参与开放的调查，查看已关闭调查的结果

### 核心功能
1. **用户认证**
   - 用户注册（支持两种角色选择）
   - 用户登录
   - 默认管理员账户：用户名 `admin`，密码 `admin123`

2. **调查管理（协调员）**
   - 创建新调查（1-10 道单选题，每道题 2-5 个互斥选项）
   - 编辑现有调查
   - 设置调查标题
   - 保存或取消调查
   - 从已定义列表中打开调查（发布）
   - 从开放列表中关闭调查

3. **调查参与（受访者）**
   - 从开放列表中选择调查参与
   - 通过单选按钮选择答案（点击其他选项时自动取消先前选择）
   - 提交或取消调查（未答完提交会显示错误提示）
   - 防止重复完成同一调查

4. **结果查看（两类用户）**
   - 从已关闭列表中选择调查
   - 以表格形式查看各问题选项的回答数量和百分比
   - 图形化展示（条形图、饼图）

## 技术栈

- **框架**：Angular 21.2
- **语言**：TypeScript
- **样式**：Tailwind CSS
- **UI 组件库**：Angular Material
- **路由**：Angular Router
- **图表**：Chart.js + ng2-charts
- **数据持久化**：LocalStorage
- **打包方式**：Angular CLI Application Builder

## 项目结构

```
survey-app/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── auth/                    # 认证相关组件
│   │   │   │   ├── login.component.ts   # 登录组件
│   │   │   │   ├── login.component.html
│   │   │   │   ├── login.component.css
│   │   │   │   ├── register.component.ts # 注册组件
│   │   │   │   ├── register.component.html
│   │   │   │   └── register.component.css
│   │   │   ├── navigation/              # 导航组件
│   │   │   │   ├── navigation.component.ts
│   │   │   │   ├── navigation.component.html
│   │   │   │   └── navigation.component.css
│   │   │   ├── dashboard/               # 仪表板组件
│   │   │   │   ├── dashboard.component.ts
│   │   │   │   ├── dashboard.component.html
│   │   │   │   └── dashboard.component.css
│   │   │   ├── survey/                  # 调查相关组件
│   │   │   │   ├── survey-edit.component.ts   # 调查编辑组件
│   │   │   │   ├── survey-edit.component.html
│   │   │   │   ├── survey-edit.component.css
│   │   │   │   ├── survey-list.component.ts   # 调查列表组件
│   │   │   │   ├── survey-list.component.html
│   │   │   │   ├── survey-list.component.css
│   │   │   │   ├── survey-manage.component.ts # 调查管理组件
│   │   │   │   ├── survey-manage.component.html
│   │   │   │   ├── survey-manage.component.css
│   │   │   │   ├── survey-take.component.ts   # 调查参与组件
│   │   │   │   ├── survey-take.component.html
│   │   │   │   └── survey-take.component.css
│   │   │   └── results/                 # 结果展示组件
│   │   │       ├── survey-results.component.ts
│   │   │       ├── survey-results.component.html
│   │   │       └── survey-results.component.css
│   │   ├── models/                      # 数据模型
│   │   │   ├── user.model.ts             # 用户模型
│   │   │   ├── question.model.ts         # 问题模型
│   │   │   ├── survey.model.ts           # 调查模型
│   │   │   └── survey-response.model.ts  # 调查回答模型
│   │   ├── services/                    # 服务层
│   │   │   ├── auth.service.ts           # 认证服务
│   │   │   ├── survey.service.ts         # 调查服务
│   │   │   └── survey-response.service.ts # 回答服务
│   │   ├── app-module.ts                 # 应用模块
│   │   ├── app-routing-module.ts         # 路由模块
│   │   ├── app.ts                        # 主组件
│   │   ├── app.html                      # 主模板
│   │   └── app.css                       # 主样式
│   ├── index.html                        # 入口 HTML
│   ├── main.ts                           # 入口文件
│   └── styles.css                        # 全局样式
├── angular.json                          # Angular 配置
├── package.json                          # 项目配置
├── tailwind.config.js                    # Tailwind CSS 配置
├── postcss.config.js                     # PostCSS 配置
├── tsconfig.json                         # TypeScript 配置
└── README.md                             # 项目文档
```

## 安装与启动

### 前提条件
- Node.js (建议 v18 或更高版本)
- npm (Node.js 包管理器)

### 安装依赖
```bash
cd survey-app
npm install
```

### 启动开发服务器
```bash
npm start
```
或者
```bash
ng serve
```

启动后，在浏览器中访问 `http://localhost:4200` 即可使用应用。

### 构建生产版本
```bash
npm run build
```
或者
```bash
ng build
```

构建产物将输出到 `dist/` 目录。

## 默认账户

- **管理员（调查协调员）**：
  - 用户名：`admin`
  - 密码：`admin123`

您也可以通过注册页面创建新的用户账户，选择您需要的角色。

## 页面显示说明

- **文字显示**：所有文字都已清晰显示，无截断或遮挡
- **色彩搭配**：使用了合理的色彩搭配，符合现代 UI 设计规范
- **按钮显示**：所有按钮都正常显示，按钮文字水平垂直居中
- **响应式设计**：支持桌面端和移动端的响应式布局

## 路由说明

| 路由路径 | 组件 | 说明 |
|---------|------|------|
| `/` | LoginComponent | 重定向到登录页 |
| `/login` | LoginComponent | 登录页面 |
| `/register` | RegisterComponent | 注册页面 |
| `/dashboard` | DashboardComponent | 用户仪表板 |
| `/survey/create` | SurveyEditComponent | 创建新调查 |
| `/survey/edit/:id` | SurveyEditComponent | 编辑现有调查 |
| `/survey/manage/:id` | SurveyManageComponent | 管理调查状态 |
| `/survey/take/:id` | SurveyTakeComponent | 参与调查 |
| `/survey/results/:id` | SurveyResultsComponent | 查看调查结果 |
| `/surveys/open` | SurveyListComponent | 开放调查列表 |
| `/surveys/closed` | SurveyListComponent | 已关闭调查列表 |

## 数据存储

本应用使用浏览器的 LocalStorage 进行数据持久化存储，包括：
- 用户账户信息
- 调查问卷数据
- 调查回答数据

注意：清除浏览器数据会导致所有数据丢失。

## 开发信息

- **Angular CLI 版本**：21.2.9
- **Node.js 版本要求**：>= 18.13.0
- **TypeScript 版本**：~5.9.2

## 许可证

MIT License
