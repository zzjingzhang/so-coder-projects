# 交互式历史时间线故事页面

一个精美的交互式历史时间线页面，用户滚动时触发章节切换动画和人物移动效果。

## 项目结构

```
interactive-timeline-story/
├── public/
│   ├── favicon.svg
│   └── vite.svg
├── src/
│   ├── views/
│   │   └── TimelineStory.vue      # 主页面组件
│   ├── router/
│   │   └── index.ts                # 路由配置
│   ├── App.vue                     # 根组件
│   ├── main.ts                     # 入口文件
│   └── style.css                   # 全局样式
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## 技术栈

- **框架**: Vue 3.5+ (Composition API)
- **语言**: TypeScript
- **样式**: Tailwind CSS 4.0
- **UI 组件库**: Element Plus 2.9+
- **路由**: Vue Router 4.5+
- **构建工具**: Vite 8.0+

## 功能特性

- 🌟 **滚动触发动画**: 滚动页面时自动激活对应章节
- 📜 **时间线导航**: 中央垂直时间线展示历史事件
- 👥 **人物入场动画**: 章节激活时人物卡片依次显示
- 📍 **进度指示器**: 右侧导航点显示当前位置和滚动进度
- 📱 **响应式设计**: 完美适配移动端和桌面端
- 🎨 **精美视觉效果**: 渐变背景、阴影效果、平滑过渡动画

## 章节内容

页面包含 5 个历史章节：

1. **远古时代** - 公元前 3000 年
   - 伏羲、女娲
   
2. **春秋战国** - 公元前 770 - 221 年
   - 孔子、老子、孙子
   
3. **秦汉盛世** - 公元前 221 年 - 公元 220 年
   - 秦始皇、汉武帝、张骞
   
4. **唐宋辉煌** - 公元 618 - 1279 年
   - 李白、杜甫、苏轼、毕昇
   
5. **明清交融** - 公元 1368 - 1912 年
   - 郑和、李时珍、曹雪芹

## 快速开始

### 环境要求

- Node.js 18.0+
- npm 9.0+ 或 pnpm 8.0+

### 安装依赖

```bash
# 进入项目目录
cd interactive-timeline-story

# 使用 npm 安装
npm install

# 或使用 pnpm 安装
pnpm install
```

### 开发模式

```bash
# 启动开发服务器
npm run dev

# 或
pnpm dev
```

开发服务器将在 `http://localhost:5173` 启动。

### 构建生产版本

```bash
# 构建生产环境
npm run build

# 或
pnpm build
```

构建产物将输出到 `dist` 目录。

### 预览生产构建

```bash
# 预览生产构建
npm run preview

# 或
pnpm preview
```

## 使用说明

1. **开始探索**: 点击首页的「开始探索」按钮，或直接向下滚动
2. **滚动浏览**: 向下滚动页面，每滚动到一个新章节会触发动画效果
3. **导航跳转**: 右侧导航点会显示当前位置，点击可快速跳转到对应章节
4. **回到顶部**: 在页面底部点击「回到顶部」按钮返回首页

## 动画效果说明

- **章节切换**: 章节进入视口时，内容卡片从两侧滑入
- **人物入场**: 每个章节的人物卡片依次延迟显示，营造错落有致的视觉效果
- **时间线标记**: 当前激活章节的时间线标记会放大并显示渐变效果
- **滚动进度**: 右侧进度条实时显示滚动进度

## 自定义内容

如需修改历史章节内容，请编辑 `src/views/TimelineStory.vue` 文件中的 `sections` 数组：

```typescript
const sections: Section[] = [
  {
    title: '章节标题',
    date: '时间范围',
    description: '章节描述文字',
    characters: [
      { name: '人物名称', role: '人物角色' },
      // 更多人物...
    ]
  },
  // 更多章节...
]
```

## License

MIT
