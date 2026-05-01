# 自定义音频播放器

一个功能丰富的自定义音频播放器，使用现代前端技术栈构建。

## 功能特性

- 🎵 播放/暂停控制
- ⏮️ ⏭️ 上一首/下一首曲目切换
- 📊 可拖动的进度条
- 🔊 音量控制和静音切换
- 📋 动态播放列表侧边栏
- 🔀 随机播放模式
- 🔁 循环播放（单曲循环/全部循环）
- 🔍 播放列表搜索功能
- ➕ 添加新歌曲到播放列表
- ➖ 从播放列表移除歌曲

## 技术栈

- **前端框架**: Vue 3 (Composition API)
- **构建工具**: Vite
- **样式框架**: Tailwind CSS
- **UI 组件库**: Naive UI
- **路由管理**: Vue Router 4
- **编程语言**: JavaScript

## 项目结构

```
audio-player/
├── public/
│   └── vite.svg              # Vite 官方图标
├── src/
│   ├── components/
│   │   ├── AudioPlayer.vue       # 主播放器组件
│   │   └── PlaylistSidebar.vue   # 播放列表侧边栏组件
│   ├── data/
│   │   └── playlist.js           # 示例播放列表数据
│   ├── views/
│   │   ├── PlayerView.vue        # 播放器主页面
│   │   └── AboutView.vue         # 关于页面
│   ├── App.vue                   # 根组件
│   ├── main.js                   # 应用入口
│   └── style.css                 # 全局样式
├── .gitignore                # Git 忽略配置
├── index.html                # HTML 入口文件
├── package.json              # 项目依赖配置
├── postcss.config.js         # PostCSS 配置
├── tailwind.config.js        # Tailwind CSS 配置
└── vite.config.js            # Vite 配置
```

## 快速开始

### 前置要求

确保你的开发环境已安装以下软件：

- Node.js (建议版本 18.x 或更高)
- npm (通常随 Node.js 一起安装) 或 yarn

### 安装依赖

```bash
cd audio-player
npm install
```

### 开发模式

启动开发服务器：

```bash
npm run dev
```

开发服务器默认运行在 `http://localhost:5173`

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 预览生产版本

```bash
npm run preview
```

## 组件说明

### AudioPlayer.vue

主播放器组件，包含：

- 旋转的专辑封面动画
- 歌曲信息显示（标题、艺术家、专辑）
- 播放控制按钮（播放/暂停、上一首、下一首）
- 随机播放和循环模式切换
- 进度条拖动控制
- 音量控制滑块和静音按钮

### PlaylistSidebar.vue

播放列表侧边栏组件，包含：

- 播放列表标题和歌曲数量显示
- 搜索框：支持按歌曲标题、艺术家、专辑搜索
- 歌曲列表：显示封面、标题、艺术家、时长
- 添加按钮：通过模态框添加新歌曲
- 删除按钮：悬停时显示，支持移除歌曲
- 当前播放歌曲高亮和播放状态动画

### PlayerView.vue

主页面视图，整合了所有组件：

- 左侧播放列表侧边栏
- 顶部导航栏（包含关于页面入口）
- 中央播放器显示区域
- 底部控制栏（播放控制、进度条、音量）

## 自定义数据

### 添加自定义播放列表

编辑 `src/data/playlist.js` 文件中的 `samplePlaylist` 数组：

```javascript
export const samplePlaylist = [
  {
    id: 'unique-id',
    title: '歌曲标题',
    artist: '艺术家名称',
    album: '专辑名称',
    duration: 245,  // 时长（秒）
    cover: 'https://example.com/cover.jpg',  // 封面图片 URL
    src: 'https://example.com/audio.mp3'      // 音频文件 URL
  },
  // ... 更多歌曲
]
```

## 样式主题

项目使用 Tailwind CSS 进行样式设计，主要配色方案：

- **主色调**: Blue (`#0ea5e9`) 用于强调和交互元素
- **背景色**: Dark slate (`#0f172a`, `#1e293b`, `#334155`) 营造深色主题氛围
- **文字色**: 白色和灰色系确保在深色背景上的可读性

可以通过修改 `tailwind.config.js` 来自定义主题颜色。

## 浏览器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

---

享受音乐之旅！🎶
