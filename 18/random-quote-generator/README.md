# 随机名言生成器 (Random Quote Generator)

一个简洁现代的随机名言生成器网页应用，支持朗读、复制和分享功能。

## 功能特性

- ✨ **随机名言展示**：默认加载一条随机名言，点击 "New Quote" 按钮获取新的名言
- 🔊 **语音朗读**：使用浏览器的语音合成功能朗读当前名言
- 📋 **一键复制**：将名言和作者信息复制到剪贴板
- 🐦 **Twitter 分享**：打开 Twitter 分享窗口，快速分享名言
- 🎨 **现代 UI 设计**：蓝色渐变背景，白色圆角卡片，简洁优雅的布局
- ⏳ **加载状态**：获取新名言时显示加载状态，提供更好的用户体验
- 📱 **响应式设计**：适配不同屏幕尺寸，在手机和桌面端都能正常显示

## 技术栈

- **前端框架**：Vue 3
- **开发语言**：JavaScript
- **样式框架**：Tailwind CSS
- **UI 组件库**：Naive UI
- **路由管理**：Vue Router 4
- **构建工具**：Vite 8

## 项目结构

```
random-quote-generator/
├── index.html              # HTML 入口文件
├── package.json            # 项目依赖配置
├── postcss.config.js       # PostCSS 配置
├── tailwind.config.js      # Tailwind CSS 配置
├── vite.config.js          # Vite 构建配置
├── README.md               # 项目说明文档
└── src/
    ├── main.js             # 应用入口
    ├── App.vue             # 根组件
    ├── style.css           # 全局样式（Tailwind 入口）
    ├── router/
    │   └── index.js        # 路由配置
    ├── data/
    │   └── quotes.js       # 名言数据
    └── views/
        └── QuoteGenerator.vue  # 主页面组件
```

## 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装依赖

```bash
cd random-quote-generator
npm install
```

### 启动开发服务器

```bash
npm run dev
```

服务器启动后，访问 http://localhost:5173 查看应用。

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 使用说明

1. **默认加载**：页面加载时会自动显示一条随机名言
2. **获取新名言**：点击 "New Quote" 按钮获取新的随机名言，加载过程中会显示加载状态
3. **朗读名言**：点击 "朗读" 按钮，浏览器会使用语音合成功能朗读当前名言
4. **复制名言**：点击 "复制" 按钮，将名言和作者信息复制到剪贴板
5. **分享到 Twitter**：点击 "Twitter" 按钮，打开 Twitter 分享窗口，可以快速分享当前名言

## 名言数据

项目内置了 20 条经典名言，来自不同领域的知名人物，包括：

- 史蒂夫·乔布斯 (Steve Jobs)
- 约翰·列侬 (John Lennon)
- 爱因斯坦 (Albert Einstein)
- 亚里士多德 (Aristotle)
- 等等...

您可以在 `src/data/quotes.js` 文件中添加或修改名言数据。

## 浏览器支持

- Chrome >= 87
- Firefox >= 78
- Safari >= 14
- Edge >= 88

**注意**：语音合成功能依赖浏览器支持，部分浏览器可能不支持此功能。

## License

MIT
