# 字符与单词计数器

一个实时统计字符数（不计空格）和单词数的网页应用。

## 功能特点

- 📝 实时统计字符数（不计空格）
- 🔢 实时统计单词数
- 🎨 现代化 UI 设计
- ⚡ 即时更新，无需点击按钮
- 📱 响应式设计，支持移动端

## 技术栈

- **前端框架**: React 19
- **编程语言**: TypeScript
- **样式框架**: Tailwind CSS
- **路由管理**: React Router DOM
- **构建工具**: Vite
- **UI 组件库**: Tailwind CSS 原生组件（可扩展 shadcn/ui）

## 项目结构

```
char-word-counter/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── pages/
│   │   └── CounterPage.tsx    # 计数器页面组件
│   ├── App.css                 # 应用样式
│   ├── App.tsx                 # 主应用组件
│   ├── index.css               # 全局样式（Tailwind）
│   └── main.tsx                # 入口文件
├── .gitignore
├── README.md
├── eslint.config.js
├── index.html
├── package.json
├── tailwind.config.ts          # Tailwind 配置
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts              # Vite 配置
```

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0 或 yarn >= 1.22.0

### 安装依赖

```bash
# 使用 npm
npm install

# 或使用 yarn
yarn install

# 或使用 pnpm
pnpm install
```

### 启动开发服务器

```bash
# 使用 npm
npm run dev

# 或使用 yarn
yarn dev

# 或使用 pnpm
pnpm dev
```

启动后，在浏览器中访问 `http://localhost:5173` 即可查看应用。

### 构建生产版本

```bash
# 使用 npm
npm run build

# 或使用 yarn
yarn build

# 或使用 pnpm
pnpm build
```

构建完成后，可在 `dist` 目录中找到生产版本的文件。

### 预览生产版本

```bash
# 使用 npm
npm run preview

# 或使用 yarn
yarn preview

# 或使用 pnpm
pnpm preview
```

## 使用说明

1. 在文本输入框中输入任意文字
2. 应用会自动实时计算：
   - **字符数（不计空格）**: 统计所有非空格字符的数量
   - **单词数**: 以空格分隔的单词数量
3. 输入时计数会即时更新，无需点击任何按钮

## 设计特点

- **居中布局**: 整体内容垂直水平居中
- **渐变背景**: 使用紫色到粉色到橙色的线性渐变
- **卡片设计**: 白色卡片、圆角、阴影效果
- **实时更新**: 使用 React 的 `useMemo` 钩子优化性能
- **响应式**: 适配不同屏幕尺寸

## 扩展 shadcn/ui

如需使用 shadcn/ui 组件库，请按照以下步骤安装：

1. 初始化 shadcn/ui:
```bash
npx shadcn@latest init
```

2. 安装需要的组件:
```bash
npx shadcn@latest add card
npx shadcn@latest add textarea
```

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！
