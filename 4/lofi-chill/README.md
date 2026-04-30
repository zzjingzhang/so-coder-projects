# 🎵 Lofi Chill - 放松音乐播放器

一个现代化的 Web 应用，提供轻松的 lofi 音乐体验、环境音面板和专注工作模式。

## ✨ 功能特性

### 🎵 音乐播放器
- 三种心情模式：Chill、Jazz、Sleep
- 日间/夜间主题切换
- 雨天效果
- 动态背景

### 🎛️ 环境音面板
- 12种环境音效
  - 城市交通、雨、壁炉
  - 雪、夏季风暴、风扇
  - 森林之夜、波浪、风
  - 人群、河流、雨林
- 独立音量控制
- 全局音量控制
- 本地存储配置

### 🎯 专注模式
- 番茄工作法倒计时
- 25/45/60分钟预设
- 待办事项列表
- 本地存储待办

### 🎨 界面特色
- 暗黑/亮色主题切换
- 玻璃态设计
- 响应式布局（支持移动设备）
- 全屏模式
- NG-ZORRO UI组件

## 🛠️ 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Angular | ^19.2 | 前端框架 |
| TypeScript | ~5.6 | 语言 |
| Tailwind CSS | ^3.4 | 样式框架 |
| NG-ZORRO | ^19.2 | UI组件库 |
| Angular Router | ^19.2 | 路由 |
| Angular CLI | ^19.2 | 构建工具 |
| rxjs | ~7.8 | 响应式编程 |

## 📁 项目结构

```
lofi-chill/
├── src/
│   ├── app/
│   │   ├── components/          # 组件
│   │   │   ├── header/         # 头部导航
│   │   │   ├── footer/         # 底部播放器
│   │   │   ├── music-player/   # 音乐播放器
│   │   │   ├── mood-selector/  # 心情选择
│   │   │   ├── sound-board/    # 环境音面板
│   │   │   ├── video-background/ # 背景视频
│   │   │   ├── todo-list/      # 待办事项
│   │   │   └── countdown-timer/ # 倒计时
│   │   ├── pages/              # 页面
│   │   │   ├── home/           # 首页
│   │   │   └── focus-mode/     # 专注模式
│   │   ├── services/           # 服务
│   │   │   ├── theme.service.ts
│   │   │   ├── player.service.ts
│   │   │   ├── ambient-sounds.service.ts
│   │   │   ├── todo.service.ts
│   │   │   └── timer.service.ts
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   └── app-routing.module.ts
│   ├── styles.css
│   └── main.ts
├── angular.json
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

## 🚀 快速开始

### 安装依赖

```bash
cd lofi-chill
npm install
```

### 启动开发服务器

```bash
npm run dev
# 或
npm start
```

浏览器打开 `http://localhost:4200`

### 构建生产版本

```bash
npm run build
```

构建产物输出到 `dist/lofi-chill/` 目录

### 其他命令

```bash
npm run watch  # 监听模式构建
npm run test   # 运行测试
```

## 🎮 使用指南

### 首页（音乐播放器）
1. 选择您想要的心情模式
2. 切换日间/夜间模式
3. 开启雨天效果
4. 播放音乐，享受放松时刻

### 环境音面板
1. 打开/关闭您需要的环境音
2. 调整各个音效的音量
3. 设置全局音量

### 专注模式
1. 设置倒计时时长
2. 添加待办事项
3. 开始专注工作
4. 完成后勾选任务

## 📝 本地存储

应用自动保存以下配置到浏览器本地存储：
- 主题设置（暗黑/亮色）
- 当前心情模式
- 日间/夜间选择
- 音量设置
- 环境音配置
- 待办事项列表

## 🎨 自定义主题

修改 `tailwind.config.js` 和 `src/styles.css` 来自定义主题颜色和样式。

## 📱 响应式设计

应用完全支持移动设备，包括：
- 适配不同屏幕尺寸
- 触摸友好的界面
- 移动端优化的布局

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

---

✨ 祝您享受放松的 Lofi 时刻！
