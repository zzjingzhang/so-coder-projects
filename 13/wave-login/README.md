# Wave Login - 波浪动画登录页面

一个具有波浪式动画效果的登录页面，使用 React + TypeScript + Tailwind CSS + PrimeReact + React Router + Vite 构建。

## 功能特性

- ✅ 页面居中显示登录表单
- ✅ Email 和 Password 两个输入框
- ✅ 登录按钮
- ✅ 注册链接
- ✅ **波浪式动画效果**：输入框标签文字在获得焦点或输入有效内容时，以波浪式的动画效果逐字弹起并变色
- ✅ 文字显示完整，能正常看清
- ✅ 色彩搭配合理（紫色渐变主题）
- ✅ 按钮显示正常，按钮文字水平垂直居中显示
- ✅ 记住我复选框
- ✅ 忘记密码链接
- ✅ 社交登录按钮（Google、GitHub、微信）

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| React | ^19.2.5 | 前端框架 |
| TypeScript | ~6.0.2 | 类型安全 |
| Tailwind CSS | ^3.4.14 | 样式框架 |
| PrimeReact | ^10.9.7 | UI 组件库 |
| React Router | ^7.14.2 | 路由管理 |
| Vite | ^8.0.10 | 构建工具 |

## 项目结构

```
wave-login/
├── public/
│   ├── favicon.svg          # 网站图标
│   └── icons.svg            # 图标资源
├── src/
│   ├── assets/              # 静态资源
│   ├── components/          # 组件目录
│   │   └── WaveInput.tsx    # 波浪动画输入框组件
│   ├── pages/               # 页面目录
│   │   ├── Login.tsx        # 登录页面
│   │   └── Register.tsx     # 注册页面
│   ├── App.tsx               # 应用主组件（路由配置）
│   ├── index.css            # 全局样式
│   └── main.tsx              # 应用入口
├── .gitignore               # Git 忽略文件
├── README.md                # 项目说明文档
├── eslint.config.js         # ESLint 配置
├── index.html               # HTML 入口文件
├── package-lock.json        # 依赖锁定文件
├── package.json             # 项目配置
├── postcss.config.js        # PostCSS 配置
├── tailwind.config.js       # Tailwind CSS 配置
├── tsconfig.app.json        # TypeScript 应用配置
├── tsconfig.json            # TypeScript 根配置
├── tsconfig.node.json       # TypeScript Node 配置
└── vite.config.ts           # Vite 配置
```

## 核心组件说明

### WaveInput 组件

波浪动画输入框组件，实现了以下功能：

- 标签文字在输入框获得焦点或有内容时上浮
- 标签文字以波浪式动画逐字弹起
- 标签文字变色（从灰色变为紫色）
- 输入框获得焦点时有边框变色和阴影效果

### Login 页面

登录页面，包含：

- 用户图标和欢迎标题
- Email 输入框（WaveInput 组件）
- Password 输入框（WaveInput 组件）
- 记住我复选框
- 忘记密码链接
- 登录按钮（渐变紫色，带图标）
- 注册链接
- 社交登录按钮（Google、GitHub、微信）

### Register 页面

注册页面，包含：

- 用户添加图标和创建账户标题
- 用户名、Email、密码、确认密码输入框
- 服务条款和隐私政策同意复选框
- 注册按钮
- 登录链接

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

```bash
cd wave-login
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173 查看页面。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 预览生产版本

```bash
npm run preview
```

## 动画效果说明

### 波浪式标签动画

当输入框获得焦点或输入内容时，标签文字会产生以下效果：

1. **位置变化**：标签从输入框中间上浮到顶部
2. **大小变化**：标签文字从 15px 缩小到 11px
3. **颜色变化**：标签文字从灰色 (#64748b) 变为紫色 (#8b5cf6)
4. **波浪动画**：标签文字逐字弹起，每个字母延迟 60ms，形成波浪效果

动画通过 CSS `@keyframes` 实现，每个字母依次触发动画，形成流畅的波浪效果。

## 路由配置

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | 重定向到 `/login` | 根路径 |
| `/login` | Login 页面 | 登录页面 |
| `/register` | Register 页面 | 注册页面 |
| `/forgot-password` | Login 页面 | 忘记密码（占位） |

## 色彩搭配

- **主色调**：紫色渐变 (#6366f1 → #8b5cf6 → #a855f7)
- **背景色**：浅紫色渐变背景 (from-purple-50 via-blue-50 to-indigo-100)
- **卡片背景**：白色 (#ffffff)
- **文字颜色**：深灰色 (#1f2937)、中灰色 (#6b7280)、浅灰色 (#9ca3af)
- **边框颜色**：浅灰色 (#e5e7eb)、紫色 (#8b5cf6)（聚焦时）

## 浏览器兼容性

- Chrome >= 80
- Firefox >= 75
- Safari >= 13
- Edge >= 80

## 开发说明

### 添加新页面

1. 在 `src/pages/` 目录下创建新的页面组件
2. 在 `src/App.tsx` 中添加路由配置

### 自定义主题颜色

修改 `tailwind.config.js` 中的 `theme.extend.colors` 配置。

### 修改动画效果

修改页面组件中的 `<style>` 标签内的 `@keyframes waveLetter` 动画定义，或修改 `WaveInput.tsx` 组件中的动画延迟时间。

## License

MIT
