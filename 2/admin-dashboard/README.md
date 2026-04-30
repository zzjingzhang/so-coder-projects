# Admin Dashboard 后台管理系统

基于 Angular 21 + PrimeNG + Tailwind CSS 构建的现代化后台管理系统。

## 技术栈

- **框架**: Angular 21
- **语言**: TypeScript
- **样式**: Tailwind CSS 3
- **UI组件库**: PrimeNG 18
- **图表库**: Chart.js 4
- **路由**: Angular Router
- **构建工具**: Angular CLI Application Builder

## 项目结构

```
admin-dashboard/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── dashboard/
│   │   │   │   ├── dashboard.component.html
│   │   │   │   └── dashboard.component.ts
│   │   │   ├── layout/
│   │   │   │   ├── layout.component.html
│   │   │   │   └── layout.component.ts
│   │   │   ├── login/
│   │   │   │   ├── login.component.html
│   │   │   │   └── login.component.ts
│   │   │   └── products/
│   │   │       ├── products.component.html
│   │   │       └── products.component.ts
│   │   ├── guards/
│   │   │   └── auth.guard.ts
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   ├── layout.service.ts
│   │   │   └── product.service.ts
│   │   ├── app.config.ts
│   │   ├── app.routes.ts
│   │   ├── app.ts
│   │   └── app.html
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── angular.json
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── tsconfig.json
```

## 功能特性

1. **登录页面**
   - 用户名/密码输入
   - 记住我复选框
   - 登录验证

2. **主布局**
   - 可折叠侧边栏导航
   - 多层级菜单支持
   - 顶部栏用户头像下拉菜单（消息、设置、退出登录）
   - 面包屑导航
   - 可关闭标签页，同步路由

3. **首页**
   - 四个可配置信息卡（销售额、订单数、用户数、转化率）
   - 折线图、饼图、环形图、柱状图
   - 图表自适应窗口大小

4. **商品管理**
   - 商品列表表格展示
   - 添加/编辑/删除商品
   - 状态筛选

5. **主题支持**
   - 亮色/暗色主题切换

6. **路由守卫**
   - 登录验证
   - 页面访问控制

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

### 生产构建

```bash
npm run build
```

### 测试账号

- 用户名: admin
- 密码: admin
