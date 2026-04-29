# PDF LightView

一个轻量级的 PDF 查看器 Web 应用程序，使用 Angular 框架构建，支持多种加载方式、页面导航、缩放功能和暗模式切换。

## 功能特性

- **多种加载方式**：支持从本地文件上传或通过 URL 加载 PDF 文件
- **页面导航**：提供上一页/下一页导航按钮，显示当前页码和总页数
- **缩放功能**：支持放大/缩小操作，缩放范围从 25% 到 300%
- **暗模式**：支持亮模式/暗模式切换，并记住用户偏好设置
- **响应式设计**：适配不同屏幕尺寸，提供良好的移动端体验
- **简洁 UI**：使用 PrimeNG 组件库和 Tailwind CSS 实现美观的界面

## 技术栈

- **框架**：Angular 21+
- **语言**：TypeScript
- **样式**：Tailwind CSS
- **UI 组件库**：PrimeNG
- **路由**：Angular Router
- **PDF 渲染**：PDF.js (pdfjs-dist)
- **打包工具**：Angular CLI Application Builder

## 项目结构

```
pdf-lightview/
├── public/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── pdf-viewer/
│   │   │   ├── pdf-viewer.component.ts      # 主组件逻辑
│   │   │   ├── pdf-viewer.component.html    # 组件模板
│   │   │   └── pdf-viewer.component.css     # 组件样式
│   │   ├── app.config.ts                     # 应用配置
│   │   ├── app.routes.ts                     # 路由配置
│   │   ├── app.ts                            # 根组件
│   │   ├── app.html                          # 根模板
│   │   ├── app.css                           # 根样式
│   │   └── pdf.service.ts                    # PDF 服务
│   ├── index.html                            # 入口 HTML
│   ├── main.ts                               # 入口 TypeScript
│   └── styles.css                            # 全局样式
├── angular.json                              # Angular 配置
├── package.json                              # 依赖配置
├── tailwind.config.js                        # Tailwind 配置
├── postcss.config.js                         # PostCSS 配置
└── tsconfig.json                             # TypeScript 配置
```

## 快速开始

### 前置要求

- Node.js 24.15.0 或更高版本
- npm 11.12.1 或更高版本
- Angular CLI 21.2.8 或更高版本（可选，推荐）

### 安装依赖

```bash
cd pdf-lightview
npm install
```

### 开发模式

运行以下命令启动开发服务器：

```bash
npm run start
```

或者

```bash
ng serve
```

服务器启动后，打开浏览器访问 `http://localhost:4200/` 即可查看应用。

### 构建生产版本

运行以下命令构建生产版本：

```bash
npm run build
```

或者

```bash
ng build
```

构建产物将输出到 `dist/pdf-lightview/` 目录下。

## 使用说明

### 加载 PDF 文件

1. **从本地上传**：
   - 点击"选择PDF文件"按钮
   - 从文件选择器中选择一个 PDF 文件

2. **从 URL 加载**：
   - 在输入框中输入 PDF 文件的 URL
   - 点击"加载"按钮或按 Enter 键

### 页面导航

- 点击左侧的 `<` 按钮跳转到上一页
- 点击右侧的 `>` 按钮跳转到下一页
- 中间显示当前页码和总页数（例如：3 / 10）

### 缩放操作

- 点击 `-` 按钮缩小视图（最小 25%）
- 点击 `+` 按钮放大视图（最大 300%）
- 中间显示当前缩放比例（例如：100%）

### 暗模式切换

- 点击页面顶部右侧的开关按钮切换亮/暗模式
- 应用会记住用户的选择，下次打开时自动应用

## 核心组件说明

### PdfService (`src/app/pdf.service.ts`)

负责 PDF 文件的加载、渲染和操作：

- `loadPdfFromFile(file)`：从文件对象加载 PDF
- `loadPdfFromUrl(url)`：从 URL 加载 PDF
- `renderPage(canvas)`：在 Canvas 上渲染当前页面
- `goToPage(pageNumber)`：跳转到指定页码
- `goToNextPage()` / `goToPreviousPage()`：页面导航
- `zoomIn()` / `zoomOut()`：缩放操作
- `getCurrentPage()` / `getTotalPages()` / `getScale()`：获取状态信息

### PdfViewerComponent (`src/app/pdf-viewer/`)

主界面组件，提供所有用户交互功能：

- 文件上传组件
- URL 输入组件
- 页面导航控件
- 缩放控件
- 暗模式切换
- 错误处理和加载状态显示

## 配置说明

### Tailwind CSS 配置 (`tailwind.config.js`)

- 启用了 `darkMode: 'class'` 支持暗模式
- 定义了自定义颜色：
  - `dark-bg`: #1a1a2e（暗模式背景）
  - `dark-surface`: #16213e（暗模式表面）
  - `dark-text`: #e0e0e0（暗模式文本）

### Angular 配置 (`angular.json`)

使用默认的 Application Builder 配置，确保了最佳的构建性能和开发体验。

## 浏览器兼容性

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 注意事项

1. **PDF 安全**：从 URL 加载 PDF 时，目标服务器需要支持跨域请求（CORS）
2. **大文件性能**：非常大的 PDF 文件可能会导致渲染延迟
3. **移动端体验**：在小屏幕设备上，建议使用较低的缩放比例以获得更好的浏览体验

## 许可证

MIT

## 贡献

欢迎提交 Issue 和 Pull Request！

---

享受使用 PDF LightView 查看您的 PDF 文件！