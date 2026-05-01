# Moodboard Editor

一个基于 Angular 的情绪板编辑器，允许用户创建和管理图片情绪板。

## 项目结构

```
moodboard-editor/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── canvas/                 # 画布组件
│   │   │   │   ├── canvas.component.ts
│   │   │   │   ├── canvas.component.html
│   │   │   │   └── canvas.component.css
│   │   │   └── sidebar/                # 侧边栏组件
│   │   │       ├── sidebar.component.ts
│   │   │       ├── sidebar.component.html
│   │   │       └── sidebar.component.css
│   │   ├── services/
│   │   │   ├── canvas.service.ts       # 画布状态管理服务
│   │   │   └── storage.service.ts      # 本地存储服务
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.css
│   │   └── app.module.ts
│   ├── styles.css                       # 全局样式（含 Tailwind CSS）
│   ├── index.html
│   └── main.ts
├── angular.json
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tailwind.config.js
└── postcss.config.js
```

## 技术栈

- **框架**: Angular 18
- **语言**: TypeScript
- **UI 组件库**: NG-ZORRO (Ant Design for Angular)
- **样式**: Tailwind CSS
- **路由**: Angular Router
- **打包**: Angular CLI application builder

## 功能特性

### 侧边栏工具

1. **Photos (照片)**
   - 展示预设照片列表
   - 支持按类别过滤（anime、animals、people、other）
   - 支持拖拽或点击添加到画布

2. **Backgrounds (背景)**
   - 展示预设背景图片
   - 点击设为画布背景
   - 提供清除背景功能

3. **Uploads (上传)**
   - 支持上传本地图片
   - 上传图片保存在 localStorage
   - 支持拖拽或点击添加到画布

4. **Share (分享)**
   - 导出画布为 PNG 格式
   - 一键下载当前画布内容

### 画布功能

- 拖拽、移动、缩放、旋转已添加的图片
- 选中图片时显示变换框
- 选中图片置于最上层
- 鼠标悬停显示阴影效果
- 画布尺寸随窗口和侧边栏自动缩放
- 支持设置/清除背景图片

### 数据持久化

- 上传的图片保存在 localStorage
- 页面刷新后自动恢复
- 关闭标签页时清空存储

## 启动项目

### 安装依赖

```bash
cd moodboard-editor
npm install
```

### 开发模式

```bash
npm run dev
# 或
ng serve
```

项目将在 http://localhost:4200 启动。

### 构建生产版本

```bash
npm run build
# 或
ng build
```

构建产物将输出到 `dist/moodboard-editor` 目录。

### 运行构建验证

```bash
npm run build
npm run dev
```

## 使用说明

1. **添加图片**: 从侧边栏 Photos 标签页拖拽或点击图片到画布
2. **编辑图片**: 选中画布中的图片，可进行移动、缩放、旋转操作
3. **设置背景**: 从 Backgrounds 标签页选择背景图片
4. **上传图片**: 从 Uploads 标签页上传本地图片
5. **导出**: 从 Share 标签页导出画布为 PNG 图片

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge
