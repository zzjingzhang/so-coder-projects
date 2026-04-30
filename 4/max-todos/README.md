# Max Todos

一个功能强大的任务管理 Web 应用，支持暗模式、拖放排序、PWA 离线使用。

## 项目结构

```
max-todos/
├── public/
│   ├── favicon.svg          # 网站图标
│   └── icons.svg            # PWA 图标
├── src/
│   ├── components/         # React 组件
│   │   ├── Drawer.jsx      # 左侧抽屉导航
│   │   ├── Header.jsx      # 顶部导航栏
│   │   ├── TaskItem.jsx    # 任务项组件
│   │   └── Toast.jsx       # 消息提示组件
│   ├── context/            # React Context
│   │   ├── SettingsContext.jsx  # 设置状态管理
│   │   └── TodoContext.jsx      # 任务状态管理
│   ├── hooks/             # 自定义 Hooks
│   │   └── useLocalStorage.js   # 本地存储 Hook
│   ├── pages/             # 页面组件
│   │   ├── Home.jsx       # 主页（任务列表）
│   │   ├── Settings.jsx   # 设置页面
│   │   └── About.jsx      # 关于页面
│   ├── App.jsx            # 应用主组件
│   ├── main.jsx           # 应用入口
│   └── index.css          # 全局样式（Tailwind CSS）
├── index.html              # HTML 入口
├── package.json           # 项目配置
├── tailwind.config.js     # Tailwind 配置
├── postcss.config.js      # PostCSS 配置
├── vite.config.js         # Vite 配置（PWA）
└── README.md              # 项目文档
```

## 技术栈

- **框架**: React 19
- **路由**: React Router v7
- **UI 组件库**: PrimeReact
- **样式**: Tailwind CSS
- **拖放**: @dnd-kit
- **打包**: Vite
- **PWA**: vite-plugin-pwa

## 功能特性

- ✅ 添加、编辑、删除任务
- ✅ 标记任务为已完成
- ✅ 为重要任务加星标
- ✅ 拖放重新排序任务
- ✅ 暗模式切换
- ✅ 小文本模式切换
- ✅ 删除确认切换
- ✅ 响应式设计（支持移动设备）
- ✅ PWA 支持（可离线使用）
- ✅ 本地存储持久化

## 启动项目

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

应用将在 http://localhost:5173 运行。

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 使用说明

1. **添加任务**: 在首页输入框中输入任务内容，点击"添加"按钮
2. **编辑任务**: 双击任务或点击编辑图标进行修改
3. **删除任务**: 点击删除图标（如果开启删除确认，会弹出确认对话框）
4. **完成任务**: 点击任务左侧的圆形复选框
5. **星标任务**: 点击星标图标，重要任务会显示在列表顶部
6. **排序任务**: 拖动任务左侧的拖放手柄进行排序
7. **切换主题**: 进入"设置"页面，开启/关闭暗模式
8. **小文本模式**: 进入"设置"页面，开启/关闭小文本模式
9. **删除确认**: 进入"设置"页面，开启/关闭删除确认功能

## 数据存储

所有任务数据和设置都会保存在浏览器的本地存储中，包括：
- 任务列表（添加、编辑、删除、完成状态、星标）
- 主题设置（暗模式）
- 显示设置（小文本模式）
- 删除确认设置

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

支持 PWA 的浏览器可以"安装到桌面"以获得类似原生应用的体验。