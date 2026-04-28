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

