# Music Player

一个功能完整的在线音乐播放器网页应用，基于 Angular + TypeScript + Tailwind CSS + PrimeNG 构建。

## 功能特性

- 🎵 **核心播放控制**：播放/暂停、上一曲、下一曲
- 🔄 **播放模式**：随机播放开关、单曲循环、列表循环三种模式切换
- 📊 **进度控制**：进度条显示当前播放进度，支持点击跳转到任意位置
- 🔊 **音量控制**：音量调节滑块、静音切换，显示当前音量百分比
- ⏳ **加载状态**：音频加载时显示旋转图标动画
- 📋 **播放列表**：侧边栏列出所有歌曲，点击切换播放，当前播放项高亮并在播放时显示动画指示
- 🚨 **错误处理**：捕获运行时错误并展示友好的错误信息
- 📱 **移动端检测**：内置移动端检测功能，用于响应式适配
- 🎨 **主题支持**：自定义主色、次色、强调色，支持亮色/暗色模式切换
- ✨ **精美 UI**：渐变背景、卡片式布局，适配桌面和移动端视口

## 技术栈

- **框架**: Angular 19
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **UI 组件库**: PrimeNG
- **路由**: Angular Router
- **构建工具**: Angular CLI Application Builder

## 项目结构

```
music-player/
├── public/
│   └── music/
│       └── music-data.json    # 歌曲数据配置文件
├── src/
│   ├── app/
│   │   ├── features/
│   │   │   ├── music-player/
│   │   │   │   └── music-player.component.ts    # 主播放器组件
│   │   │   └── playlist-sidebar/
│   │   │       └── playlist-sidebar.component.ts # 播放列表侧边栏组件
│   │   ├── shared/
│   │   │   ├── services/
│   │   │   │   ├── music-data.service.ts        # 音乐数据服务
│   │   │   │   ├── player.service.ts            # 播放器核心服务
│   │   │   │   └── index.ts
│   │   │   ├── types/
│   │   │   │   ├── music.ts                      # 类型定义
│   │   │   │   └── index.ts
│   │   │   └── utils/
│   │   │       ├── style.utils.ts                # 工具函数
│   │   │       └── index.ts
│   │   ├── app.config.ts     # 应用配置
│   │   ├── app.routes.ts     # 路由配置
│   │   └── app.ts            # 根组件
│   ├── index.html            # 入口 HTML
│   ├── main.ts               # 应用入口
│   └── styles.css            # 全局样式
├── .editorconfig
├── .gitignore
├── .prettierrc
├── angular.json              # Angular 配置
├── package.json              # 依赖配置
├── postcss.config.js         # PostCSS 配置
├── tailwind.config.js        # Tailwind CSS 配置
├── tsconfig.app.json
├── tsconfig.json
└── tsconfig.spec.json
```

## 快速开始

### 环境要求

- Node.js >= 18.x
- npm >= 9.x

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

或者

```bash
npm run start
```

应用将在 `http://localhost:4200` 启动。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist/music-player` 目录。

## 自定义音乐数据

你可以编辑 `public/music/music-data.json` 文件来添加或修改歌曲列表：

```json
[
  {
    "id": "1",
    "title": "歌曲标题",
    "artist": "艺术家",
    "album": "专辑",
    "duration": 245,
    "audioUrl": "音频文件URL",
    "coverUrl": "专辑封面URL"
  }
]
```

## 主题配置

主题颜色在 `tailwind.config.js` 中定义：

- **主色 (primary)**: 蓝色系 #0ea5e9
- **次色 (secondary)**: 紫色系 #d946ef
- **强调色 (accent)**: 紫色系 #d946ef

暗色模式会自动根据系统偏好设置切换，也可以通过界面上的切换按钮手动切换。

## 功能说明

### 播放模式切换

点击播放模式图标可以在以下模式间切换：

1. **列表循环**：按顺序播放列表中的所有歌曲，播放完最后一首后回到第一首
2. **单曲循环**：循环播放当前选中的歌曲
3. **随机播放**：随机播放列表中的歌曲

### 播放列表

点击右上角的列表图标可以打开播放列表侧边栏，支持：

- 查看所有歌曲
- 点击任意歌曲切换播放
- 当前播放歌曲高亮显示
- 播放中显示音频波形动画

### 音量控制

- 拖动滑块调节音量（0-100%）
- 点击音量图标快速静音/取消静音
- 显示当前音量百分比

### 进度控制

- 进度条实时显示播放进度
- 点击进度条任意位置跳转到对应时间
- 显示当前时间和总时长（格式：分:秒）

## 响应式设计

应用采用响应式设计，适配不同屏幕尺寸：

- **桌面端**：完整功能展示，播放列表侧边栏从右侧滑入
- **移动端**：优化的触控操作，播放列表全屏展示

## 开发说明

### 核心服务

`PlayerService` 是播放器的核心服务，负责：

- 管理音频播放状态
- 处理播放控制逻辑
- 维护播放模式
- 管理音量和进度
- 处理错误和加载状态

### 类型安全

所有数据都使用 TypeScript 类型定义，确保类型安全：

- `Song`: 歌曲数据结构
- `PlayMode`: 播放模式枚举
- `PlayerState`: 播放器状态接口

### 工具函数

`style.utils.ts` 提供了通用工具函数：

- `cn()`: 样式类名合并工具
- `formatTime()`: 时间格式化
- `shuffleArray()`: 数组洗牌
- `isMobileDevice()`: 移动端检测
- `getStoredDarkMode()`: 获取保存的暗色模式设置

## License

MIT
