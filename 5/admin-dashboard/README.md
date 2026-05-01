# Admin Dashboard

一个基于 Angular 的现代化管理后台项目。

## 技术栈

- **Angular 21.2**
- **TypeScript 5.9**
- **Tailwind CSS 3.4**
- **NG-ZORRO 19.0** (Ant Design for Angular)
- **Angular Router**
- **Angular CLI Application Builder**

## 项目结构

```
admin-dashboard/
├── src/
│   ├── app/
│   │   ├── components/       # 通用组件
│   │   │   └── logo/        # Logo 组件
│   │   ├── layout/          # 布局组件
│   │   ├── pages/           # 页面组件
│   │   │   └── home/        # 首页
│   │   ├── shared/          # 共享模块
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   └── app.module.ts
│   │   └── app-routing.module.ts
│   ├── styles.scss
│   ├── index.html
│   └── main.ts
├── package.json
├── angular.json
├── tailwind.config.js
└── README.md
```

## 功能特性

1. **全局 UI 组件注册**
   - Button
   - Layout
   - Icon
   - Menu
   - Table
   - Tag
   - Divider

2. **可折叠侧边栏**
   - 支持侧边栏展开/收起功能
   - 带图标的导航菜单

3. **Logo 组件**
   - SVG 图标
   - 带动画效果

4. **首页表格**
   - Name: 自定义链接渲染
   - Age: 年龄
   - Address: 地址
   - Tags: 根据内容显示不同颜色标签
   - Action: Invite, Delete, More

## 开发工具

- ESLint: 代码检查
- Prettier: 代码格式化
- Husky + Commitlint + Lint-staged: Git 提交校验

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:4200

### 构建生产版本

```bash
npm run build
```

## License

MIT
