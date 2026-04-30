# Theme Editor

一个功能强大的主题编辑器应用程序，允许用户自定义主题调色板。

## 项目结构

```
theme-editor/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── ColorPicker.tsx        # 颜色选择器组件
│   │   ├── PaletteCard.tsx         # 调色板卡片组件
│   │   ├── Sidebar.tsx             # 左侧边栏组件
│   │   ├── PreviewComponents.tsx   # 预览组件集合
│   │   ├── PreviewContainer.tsx    # 预览容器组件
│   │   ├── GithubRibbon.tsx        # GitHub 功能区组件
│   │   ├── CompanyLogo.tsx         # 公司徽标组件
│   │   └── DownloadButton.tsx       # 下载按钮组件
│   ├── context/
│   │   └── ThemeContext.tsx        # 主题状态管理
│   ├── theme/
│   │   └── defaultTheme.ts         # 默认主题配置
│   ├── types/
│   │   └── theme.ts                # 类型定义
│   ├── App.tsx                     # 主应用组件
│   ├── main.tsx                    # 应用入口
│   └── index.css                   # 全局样式
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 技术栈

- **框架**: React 19.2.5
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **UI 组件库**: Chakra UI
- **路由**: React Router DOM
- **打包工具**: Vite

## 功能特性

- **左侧调色板面板**: 包含常见、背景、主要、次要、错误、文本六个调色板组
- **颜色选择器**: 点击颜色气泡，在弹出窗口中选择新颜色
- **实时预览**: 右侧预览区域实时显示主题变化
- **桌面/移动切换**: 模拟手机（350x650px）或桌面视图
- **导出功能**: 一键下载主题配置为 JSON 文件
- **GitHub 功能区**: 链接到项目仓库
- **公司徽标**: 链接到公司网站

## 启动项目

1. 安装依赖

```bash
npm install
```

2. 开发模式

```bash
npm run dev
```

3. 生产构建

```bash
npm run build
```

4. 预览生产构建

```bash
npm run preview
```

## 预览

启动开发服务器后，可以在浏览器中访问 http://localhost:5173 查看应用。

## 导出主题

点击右下角的下载按钮，可以将当前编辑的主题导出为 JSON 文件。

导出的 JSON 文件格式如下：

```json
{
  "palette": {
    "common": {
      "black": "#000000",
      "white": "#FFFFFF"
    },
    "background": {
      "default": "#F5F5F5",
      "paper": "#FFFFFF",
      "surface": "#FAFAFA"
    },
    "primary": {
      "main": "#3B82F6",
      "light": "#60A5FA",
      "dark": "#2563EB",
      "contrastText": "#FFFFFF"
    },
    ...
  }
}
```
