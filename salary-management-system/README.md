# 薪资管理系统 - 公司资料管理模块

一个基于 React 的企业级 SaaS 薪资管理系统，包含完整的公司资料管理功能，采用现代化设计布局。

## 功能特性

- **公司资料管理** - 管理公司基本信息、联系方式、银行信息等
- **部门管理** - 管理公司各部门信息，支持增删改查
- **员工管理** - 管理员工信息，支持搜索、筛选功能
- **薪资管理** - 查看和管理薪资记录，包含统计功能
- **系统设置** - 管理个人资料、密码、通知和安全设置

## 技术栈

- **前端框架**: React 19
- **构建工具**: Vite 8
- **UI 组件库**: Ant Design 6
- **样式方案**: Tailwind CSS 4
- **路由管理**: React Router 7
- **开发语言**: JavaScript

## 项目结构

```
salary-management-system/
├── public/                 # 静态资源
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/            # 资源文件
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components/        # 通用组件
│   │   └── Layout.jsx     # 主布局组件（侧边栏、顶部导航）
│   ├── pages/             # 页面组件
│   │   ├── CompanyProfile.jsx      # 公司资料页面
│   │   ├── DepartmentManagement.jsx # 部门管理页面
│   │   ├── EmployeeManagement.jsx   # 员工管理页面
│   │   ├── SalaryManagement.jsx     # 薪资管理页面
│   │   └── Settings.jsx             # 系统设置页面
│   ├── router/            # 路由配置
│   │   └── index.jsx
│   ├── App.jsx            # 根组件
│   ├── App.css            # 应用样式
│   ├── index.css          # 全局样式
│   └── main.jsx           # 入口文件
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js      # PostCSS 配置
├── tailwind.config.js     # Tailwind CSS 配置
└── vite.config.js         # Vite 配置
```

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

```bash
npm install
```

### 开发模式

启动开发服务器：

```bash
npm run dev
```

访问 http://localhost:5173 查看应用。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 预览生产版本

```bash
npm run preview
```

### 代码检查

```bash
npm run lint
```

## 页面说明

### 1. 公司资料管理 (`/company-profile`)

- 查看和编辑公司基本信息（公司名称、类型、行业、注册号等）
- 管理公司联系方式（地址、电话、邮箱、网站）
- 配置银行信息（开户银行、银行账号）
- 支持上传公司 Logo
- 展示统计卡片（员工总数、部门数量、成立时间）

### 2. 部门管理 (`/departments`)

- 查看所有部门列表
- 新增、编辑、删除部门
- 支持分页显示
- 显示部门状态（正常运营/已停用）

### 3. 员工管理 (`/employees`)

- 查看所有员工列表
- 新增、编辑、删除员工
- 支持按姓名、邮箱、部门、职位搜索
- 分页显示和数量选择
- 显示员工状态（在职/已离职）

### 4. 薪资管理 (`/salary`)

- 查看薪资记录列表
- 显示薪资统计（总薪资、已发放人数、待发放人数）
- 按部门统计薪资
- 支持月份筛选和搜索功能

### 5. 系统设置 (`/settings`)

- 个人资料管理
- 密码修改
- 通知设置（邮件、推送、短信）
- 安全设置（双因素认证、登录提醒、会话超时）

## 设计特色

- **红点设计奖标准布局** - 现代化、简洁的 UI 设计
- **响应式设计** - 支持桌面端和移动端
- **深色/浅色模式** - 自动适配系统主题
- **平滑动画** - 流畅的交互动画效果
- **卡片式布局** - 清晰的信息层级

## 开发说明

### 目录规范

- `src/components/` - 可复用的通用组件
- `src/pages/` - 页面级组件
- `src/router/` - 路由配置
- `src/assets/` - 静态资源文件

### 代码规范

- 使用 ES6+ 语法
- 组件采用函数式写法
- 使用 React Hooks 管理状态
- 遵循 Ant Design 设计规范
- 使用 Tailwind CSS 进行样式开发

## License

MIT

## 贡献

欢迎提交 Issue 和 Pull Request！
