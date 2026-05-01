# Password Generator

一个安全的随机密码生成器 Web 应用程序，使用 Angular 框架构建。

## 功能特性

- 🔐 **安全密码生成**: 使用加密安全的随机数生成器
- 🎛️ **可自定义长度**: 通过滑块和数字输入设置密码长度（3-20 位）
- 🔤 **多字符集选项**:
  - **易于阅读**: 排除容易混淆的字符（如 0、O、l、1、I）
  - **易于说出**: 仅限大小写字母，适合口头传达
  - **所有字符**: 包含字母、数字和特殊符号，安全性最高
- 📊 **密码强度指示器**: 根据密码长度实时显示强度（Weak / Fair / Strong / Very Strong）
- 📋 **一键复制**: 点击复制按钮将密码复制到剪贴板
- 🔄 **重新生成**: 随时生成新的随机密码
- 🛠️ **工具提示**: 信息图标提供详细的功能说明
- 🎨 **精美 UI**: 现代化设计，悬停时旋转的徽标动画
- 📱 **响应式设计**: 完美适配各种屏幕尺寸

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Angular | 21.x | 前端框架 |
| TypeScript | 5.9.x | 编程语言 |
| Tailwind CSS | 3.3.x | CSS 框架 |
| PrimeNG | 21.x | UI 组件库 |
| Angular Router | 21.x | 路由管理 |
| Angular CLI | 21.x | 项目构建工具 |

## 项目结构

```
password-generator/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── logo/
│   │   │   │   ├── logo.component.html
│   │   │   │   ├── logo.component.scss
│   │   │   │   └── logo.component.ts
│   │   │   └── password-generator/
│   │   │       ├── password-generator.component.html
│   │   │       ├── password-generator.component.scss
│   │   │       └── password-generator.component.ts
│   │   ├── services/
│   │   │   └── password-generator.service.ts
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
├── angular.json
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.spec.json
└── README.md
```

## 安装和运行

### 前置要求

- Node.js (建议 18.x 或更高版本)
- npm (随 Node.js 一起安装)

### 安装依赖

```bash
cd password-generator
npm install
```

### 开发模式

```bash
npm run dev
```

应用将在 `http://localhost:4200` 启动。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist/password-generator/browser` 目录。

### 其他命令

| 命令 | 说明 |
|------|------|
| `npm start` | 启动开发服务器 |
| `npm run watch` | 构建并监听文件变化 |
| `npm test` | 运行单元测试 |

## 使用说明

1. **设置密码长度**: 使用滑块或数字输入框设置密码长度（3-20 位）
2. **选择字符集**: 根据需求选择合适的字符集类型：
   - **易于阅读**: 适合需要人工输入的场景
   - **易于说出**: 适合需要口头传达的场景
   - **所有字符**: 适合需要最高安全性的场景
3. **查看强度**: 密码强度指示器会根据长度实时更新
4. **复制密码**: 点击复制按钮将密码复制到剪贴板
5. **重新生成**: 点击刷新按钮生成新的随机密码

## 核心组件说明

### PasswordGeneratorService

密码生成的核心服务，提供以下功能：

- `generatePassword(length, type)`: 生成指定长度和字符集的密码
- `getCharacterSet(type)`: 获取指定类型的字符集
- `calculateStrength(length)`: 计算密码强度
- `getCharacterSetDescription(type)`: 获取字符集类型的描述

### PasswordGeneratorComponent

主界面组件，包含：

- 密码输出区域（带复制和重新生成按钮）
- 密码强度进度条
- 长度滑块和数字输入
- 字符集选项（单选按钮）
- 信息图标和工具提示

### LogoComponent

徽标组件，悬停时有旋转动画效果。

## 安全特性

- 使用 `window.crypto.getRandomValues()` 生成加密安全的随机数
- 不存储或发送生成的密码
- 所有操作在客户端完成

## License

MIT
