# Sound Admin Panel

一个功能完整的声音管理系统管理面板，使用 Vue 3 + TypeScript + Tailwind CSS + PrimeVue 构建。

## 技术栈

- **框架**: Vue 3 (Composition API)
- **语言**: TypeScript
- **样式**: Tailwind CSS 4
- **UI 组件库**: PrimeVue 4
- **状态管理**: Pinia
- **路由**: Vue Router 5
- **构建工具**: Vite 8

## 项目结构

```
sound-admin-panel/
├── src/
│   ├── layouts/           # 布局组件
│   │   └── AdminLayout.vue    # 管理后台布局
│   ├── views/             # 视图页面
│   │   ├── LoginView.vue       # 登录页面
│   │   ├── DashboardView.vue   # 仪表板页面
│   │   ├── SoundsView.vue      # 声音管理页面
│   │   └── CategoriesView.vue  # 类别管理页面
│   ├── stores/            # Pinia 状态管理
│   │   ├── auth.ts             # 认证状态
│   │   ├── theme.ts            # 主题状态
│   │   ├── categories.ts       # 类别状态
│   │   └── sounds.ts           # 声音状态
│   ├── router/            # 路由配置
│   │   └── index.ts
│   ├── types/             # TypeScript 类型定义
│   │   └── index.ts
│   ├── App.vue            # 根组件
│   ├── main.ts            # 入口文件
│   └── style.css          # 全局样式
├── index.html             # HTML 模板
├── vite.config.ts         # Vite 配置
├── tsconfig.json          # TypeScript 配置
├── tsconfig.app.json      # TypeScript 应用配置
├── tsconfig.node.json     # TypeScript Node 配置
├── package.json           # 项目依赖
└── README.md              # 项目文档
```

## 功能特性

### 1. 身份认证
- 邮箱/密码登录
- 路由防护（未登录用户自动跳转到登录页）
- 等待认证状态再渲染路由
- 记住登录状态（localStorage 持久化）

### 2. 仪表板
- 显示总声音数、活跃声音数、类别数量、有声类别数的统计卡片
- 类别声音统计表格（含占比进度条）
- 最近声音列表
- 加载骨架屏 (Skeleton)

### 3. 类别管理
- 完整的 CRUD 操作
- 类别图片上传预览
- 表单验证
- 删除确认对话框
- 只有空类别才能删除（防止误删有声音的类别）

### 4. 声音管理
- 完整的 CRUD 操作
- MP3 文件上传支持
- 自动检测音频时长
- 文件大小和格式显示
- 状态切换（活跃/停用）
- 删除确认对话框
- 必须先创建类别才能添加声音

### 5. UI 特性
- 渐变风格登录页面
- 可折叠的侧边导航抽屉
- 顶部应用程序栏（含主题切换和注销按钮）
- 深色/浅色主题切换
- Toast 通知反馈
- ConfirmDialog 确认对话框
- 表单验证错误提示
- 加载指示器和按钮加载状态
- 响应式设计

## 安装与运行

### 前置要求
- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

```bash
cd sound-admin-panel
npm install --legacy-peer-deps
```

### 开发模式

```bash
npm run dev
```

项目将在 `http://localhost:5173` 运行。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 预览生产版本

```bash
npm run preview
```

## 默认账户

使用以下凭据登录：

- **邮箱**: `admin@example.com`
- **密码**: `admin123`

## 数据存储

当前版本使用 `localStorage` 进行数据持久化：
- 用户认证状态
- 类别数据
- 声音数据
- 主题偏好

实际生产环境中应该替换为真实的后端 API 调用。

## 主题切换

- 支持浅色和深色主题
- 主题偏好会保存到 localStorage
- 使用系统主题检测作为默认值
- 可以通过顶部导航栏的开关切换

## 表单验证

### 登录表单
- 邮箱：必填、有效邮箱格式
- 密码：必填、至少 6 个字符

### 类别表单
- 名称：必填
- 描述：必填
- 图片：可选（提供默认图片）

### 声音表单
- 名称：必填
- 描述：必填
- 类别：必填
- MP3 文件：新建时必填
- 状态：可选（默认为活跃）

## 文件上传支持

### 类别图片
- 支持格式：JPG、PNG、GIF
- 预览功能
- 可删除已选图片

### 声音文件
- 支持格式：MP3
- 自动检测文件大小
- 自动检测音频时长
- 文件名显示

## 贡献指南

1. Fork 仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 许可证

本项目仅供学习和演示使用。

## 联系方式