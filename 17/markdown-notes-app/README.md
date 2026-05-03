# Markdown 笔记应用

一个功能丰富的 Markdown 笔记应用程序，支持文件夹组织、搜索功能、标签系统、导出选项、深色/浅色主题和实时预览。

## 功能特性

- **文件夹组织**：创建文件夹来整理你的笔记
- **搜索功能**：快速找到你需要的笔记（支持标题、内容、标签搜索）
- **标签系统**：使用标签来分类和筛选笔记，支持自定义标签颜色
- **导出选项**：支持导出为 Markdown 文件或 HTML 文件
- **深色/浅色主题**：保护你的眼睛，支持系统主题检测
- **实时预览**：Markdown 编辑器支持左右分栏实时预览
- **收藏夹**：将重要笔记添加到收藏夹
- **本地存储**：所有数据保存在浏览器 localStorage 中

## 技术栈

- **框架**: Angular 21
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **UI 组件库**: NG-ZORRO (Ant Design for Angular)
- **路由**: Angular Router
- **打包方式**: Angular CLI Application Builder
- **Markdown 解析**: marked.js

## 项目结构

```
markdown-notes-app/
├── src/
│   ├── app/
│   │   ├── models/              # 数据模型
│   │   │   ├── note.model.ts    # 笔记模型
│   │   │   ├── folder.model.ts  # 文件夹模型
│   │   │   └── tag.model.ts     # 标签模型
│   │   ├── services/            # 服务层
│   │   │   ├── theme.service.ts   # 主题服务
│   │   │   ├── storage.service.ts # 存储服务
│   │   │   ├── note.service.ts    # 笔记服务
│   │   │   ├── folder.service.ts  # 文件夹服务
│   │   │   ├── tag.service.ts     # 标签服务
│   │   │   └── export.service.ts  # 导出服务
│   │   ├── app.ts               # 主组件
│   │   ├── app.html             # 主模板
│   │   ├── app.css              # 组件样式
│   │   ├── app.config.ts        # 应用配置
│   │   └── app.routes.ts        # 路由配置
│   ├── main.ts                  # 入口文件
│   ├── index.html               # HTML 模板
│   └── styles.css               # 全局样式
├── tailwind.config.js           # Tailwind CSS 配置
├── postcss.config.js            # PostCSS 配置
├── angular.json                 # Angular 配置
├── package.json                 # 依赖配置
└── README.md                    # 项目说明
```

## 安装和运行

### 环境要求

- Node.js >= 18.13.0
- npm >= 9.0.0
- Angular CLI >= 17.0.0

### 安装依赖

```bash
cd markdown-notes-app
npm install --legacy-peer-deps
```

### 启动开发服务器

```bash
ng serve
```

然后在浏览器中打开 `http://localhost:4200` 访问应用。

### 构建生产版本

```bash
ng build
```

构建产物将输出到 `dist/` 目录。

### 运行测试

```bash
ng test
```

## 使用说明

### 创建笔记

1. 点击侧边栏的「新建笔记」按钮
2. 在顶部输入笔记标题
3. 在左侧编辑器中编写 Markdown 内容
4. 点击右上角「保存」按钮

### 组织笔记

- **文件夹**：在侧边栏「文件夹」区域点击 + 号创建新文件夹，删除文件夹时笔记会移到默认文件夹
- **标签**：在侧边栏「标签」区域点击 + 号创建新标签，可以选择标签颜色
- **收藏**：在笔记列表中点击星星图标将笔记添加到收藏夹

### 搜索笔记

在顶部搜索框中输入关键词，可以搜索笔记的标题、内容和标签。

### 切换主题

点击侧边栏底部的太阳/月亮图标切换深色/浅色主题，主题设置会保存在本地。

### 导出笔记

1. 选择要导出的笔记
2. 点击顶部工具栏的下载图标
3. 选择导出为 Markdown 或 HTML 格式

## 数据存储

所有数据（笔记、文件夹、标签）都保存在浏览器的 localStorage 中，刷新页面或关闭浏览器后数据不会丢失。

## 开发说明

### 新增依赖

如果需要添加新的依赖，请使用以下命令：

```bash
npm install <package-name> --legacy-peer-deps
```

### 组件结构

应用采用单组件架构，所有 UI 逻辑都在 `app.ts` 中实现，使用 Angular Signals 进行状态管理。

## License

MIT
