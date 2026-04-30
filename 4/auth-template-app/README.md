# Auth Template App

一个基于 Angular 的现代化登录模板应用程序，包含完整的身份验证流程和可重用组件。

## 技术栈

- **框架**: Angular 17+
- **语言**: TypeScript
- **样式**: Tailwind CSS 3.x
- **UI 组件库**: PrimeNG 17+
- **路由**: Angular Router
- **构建工具**: Angular CLI Application Builder

## 项目结构

```
src/
├── app/
│   ├── app.component.ts       # 根组件
│   ├── app.config.ts          # 应用配置
│   ├── app.routes.ts          # 路由配置
│   ├── pages/                 # 页面组件
│   │   ├── home/              # 主页（登录/注册入口）
│   │   ├── login/             # 登录页面
│   │   ├── register/          # 注册页面
│   │   ├── forgot-password/   # 忘记密码页面
│   │   └── dashboard/         # 仪表板页面
│   └── shared/                # 可重用组件
│       └── components/
│           ├── background/    # 渐变背景组件
│           ├── logo/          # 徽标组件
│           ├── heading/       # 标题组件
│           ├── paragraph/     # 段落组件
│           ├── text-input/    # 文本输入组件（带错误显示）
│           ├── button/        # 按钮组件
│           └── back-button/   # 后退按钮组件
├── assets/                    # 静态资源
├── index.html                 # HTML 入口
├── main.ts                    # 应用入口
└── styles.scss                # 全局样式（Tailwind）
```

## 功能特性

### 页面
- **主页**: 显示登录和注册按钮，作为应用入口
- **登录页面**: 验证邮箱和密码，支持记住我功能
- **注册页面**: 包含姓名、邮箱、密码字段，验证输入
- **忘记密码**: 验证邮箱，发送重置链接
- **仪表板**: 显示用户信息、统计卡片和快速操作

### 可重用组件
- `app-background`: 渐变背景，带动态气泡效果
- `app-logo`: 应用徽标，可自定义文本
- `app-heading`: 页面标题组件
- `app-paragraph`: 段落文本组件
- `app-text-input`: 文本输入框，支持验证和错误显示
- `app-button`: 按钮组件，支持多种变体（primary/secondary/outline/text）
- `app-back-button`: 后退导航按钮

### 自定义主题
- **主色 (Primary)**: 蓝色系 (#3b82f6)
- **次要色 (Secondary)**: 灰色系 (#475569)
- **错误色 (Error)**: 红色系 (#ef4444)

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

应用将在 `http://localhost:4200` 启动。

### 生产构建

```bash
npm run build
```

构建产物将输出到 `dist/auth-template-app` 目录。

## 测试账户

登录页面可以使用以下测试账户：
- **邮箱**: `test@example.com`
- **密码**: `password`

## 路由配置

| 路径 | 组件 | 描述 |
|------|------|------|
| `/` | HomeComponent | 主页 |
| `/login` | LoginComponent | 登录 |
| `/register` | RegisterComponent | 注册 |
| `/forgot-password` | ForgotPasswordComponent | 忘记密码 |
| `/dashboard` | DashboardComponent | 仪表板 |

## 许可证

MIT
