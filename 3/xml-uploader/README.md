# XML Uploader

一个基于 React 的 XML 文件拖拽上传组件。

## 项目结构

```
xml-uploader/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components/
│   │   └── FileUpload.jsx       # 文件拖拽上传组件
│   ├── App.css
│   ├── App.jsx                  # 主应用组件
│   ├── index.css                # 全局样式（包含 Tailwind CSS）
│   └── main.jsx                 # 应用入口
├── index.html
├── package.json
├── tailwind.config.js           # Tailwind CSS 配置
├── postcss.config.js            # PostCSS 配置
├── vite.config.js               # Vite 配置
└── README.md
```

## 技术栈

- **框架**: React
- **语言**: JavaScript
- **样式**: Tailwind CSS
- **UI 组件库**: MUI (Material-UI)
- **路由**: React Router
- **打包工具**: Vite

## 功能特性

- 支持拖拽上传 XML 文件
- 支持点击选择文件
- 支持按 Enter 键触发文件选择
- 拖拽时显示上传图标，放下后恢复默认图标
- 仅接受 XML 文件（text/xml）
- 通过 `files-selected` 事件将 FileList 传递给父组件
- 深色标题栏和简洁的中心区域设计

## 启动项目

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 组件说明

### FileUpload 组件

文件拖拽上传组件，支持以下功能：

- **拖拽上传**: 将 XML 文件拖拽到组件区域即可上传
- **点击选择**: 点击组件区域打开文件选择对话框
- **键盘操作**: 按 Enter 键可触发文件选择
- **文件验证**: 仅接受 .xml 和 text/xml 类型的文件
- **事件触发**: 通过 `onFilesSelected` 回调将 FileList 传递给父组件

**使用示例**:

```jsx
import FileUpload from './components/FileUpload';

function App() {
  const handleFilesSelected = (files) => {
    console.log('选择的文件:', files);
  };

  return <FileUpload onFilesSelected={handleFilesSelected} />;
}
```

## 浏览器兼容性

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)
