# Retro Pixel Portal - 2000s Vintage Website

一个带有像素化元素的 2000 年代复古阈值风格的 Angular 网站，带有链接带环绕到其他怀旧网站。

## 🎮 项目概述

回到 2000 年代互联网的黄金时代！这个项目重现了 GeoCities、Angelfire 和 Tripod 时代个人主页的怀旧感，包含像素化设计、闪烁文字、跑马灯链接和复古配色方案。

### 特色功能

- **像素化设计**: 完整的 2000 年代复古美学，像素边框和按钮效果
- **链接跑马灯**: 页面顶部和底部的滚动链接带，带有无缝环绕动画
- **访客计数器**: 复古风格的数字计数器，显示访问量
- **留言板系统**: 完整的表单提交和留言展示功能
- **分类链接目录**: 按类别组织的怀旧网站链接
- **CRT 扫描线效果**: 模拟老式显示器的扫描线视觉效果
- **响应式设计**: 在现代设备上也能完美展示复古风格

## 🛠️ 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Angular | 19.1+ | 前端框架 |
| TypeScript | 5.7+ | 编程语言 |
| Tailwind CSS | 3.4+ | 样式框架 |
| PrimeNG | 19.0+ | UI 组件库 |
| Angular Router | 19.1+ | 路由管理 |
| Angular CLI | 19.1+ | 项目构建工具 |

## 📁 项目结构

```
retro-pixel-portal/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── about/
│   │   │   │   ├── about.component.ts
│   │   │   │   ├── about.component.html
│   │   │   │   └── about.component.css
│   │   │   ├── footer/
│   │   │   │   ├── footer.component.ts
│   │   │   │   ├── footer.component.html
│   │   │   │   └── footer.component.css
│   │   │   ├── guestbook/
│   │   │   │   ├── guestbook.component.ts
│   │   │   │   ├── guestbook.component.html
│   │   │   │   └── guestbook.component.css
│   │   │   ├── home/
│   │   │   │   ├── home.component.ts
│   │   │   │   ├── home.component.html
│   │   │   │   └── home.component.css
│   │   │   ├── links/
│   │   │   │   ├── links.component.ts
│   │   │   │   ├── links.component.html
│   │   │   │   └── links.component.css
│   │   │   ├── link-marquee/
│   │   │   │   ├── link-marquee.component.ts
│   │   │   │   ├── link-marquee.component.html
│   │   │   │   └── link-marquee.component.css
│   │   │   ├── navbar/
│   │   │   │   ├── navbar.component.ts
│   │   │   │   ├── navbar.component.html
│   │   │   │   └── navbar.component.css
│   │   │   └── not-found/
│   │   │       ├── not-found.component.ts
│   │   │       ├── not-found.component.html
│   │   │       └── not-found.component.css
│   │   ├── services/
│   │   │   └── link.service.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.css
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── angular.json
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.app.json
├── postcss.config.js
└── README.md
```

## 🚀 快速开始

### 前置要求

确保你的开发环境已安装以下软件：

- Node.js (版本 18.x 或更高)
- npm (版本 9.x 或更高)
- Angular CLI (版本 19.x 或更高)

### 安装步骤

1. **进入项目目录**

```bash
cd retro-pixel-portal
```

2. **安装依赖**

```bash
npm install
```

### 运行项目

**开发模式**

```bash
npm run dev
# 或者
ng serve
```

项目将在 `http://localhost:4200` 启动。

**构建生产版本**

```bash
npm run build
# 或者
ng build
```

构建产物将输出到 `dist/retro-pixel-portal` 目录。

**监听模式构建**

```bash
npm run watch
```

## 📦 可用的 NPM 脚本

| 命令 | 描述 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run start` | 启动开发服务器 (同 dev) |
| `npm run build` | 构建生产版本 |
| `npm run watch` | 监听模式构建 |
| `npm run test` | 运行单元测试 |

## 🎨 复古设计元素

### 配色方案

项目使用经典的 2000 年代配色：

- **主色调**: 深蓝色 (`#000080`)、亮蓝色 (`#0000ff`)
- **强调色**: 青色 (`#00ffff`)、洋红色 (`#ff00ff`)、黄色 (`#ffff00`)
- **背景色**: 深灰色 (`#404040`)、浅灰色 (`#c0c0c0`)
- **警告色**: 红色 (`#ff0000`)、橙色 (`#ff8000`)

### 字体

- **Press Start 2P**: 经典像素字体，用于标题
- **Courier New**: 复古等宽字体，用于正文

### 动画效果

- **闪烁文字**: 模拟老式显示器的闪烁效果
- **跑马灯滚动**: 链接带的无缝环绕动画
- **扫描线效果**: CRT 显示器模拟
- **像素按钮**: 带有按下效果的复古按钮

## 🔗 链接目录

项目包含以下类别的怀旧网站链接：

| 类别 | 示例网站 |
|------|----------|
| 🎮 游戏 | Neopets, RuneScape, Newgrounds, The Sims |
| 🎵 音乐 | Napster, Kazaa, LimeWire |
| 🎨 艺术 | DeviantArt |
| 💻 技术 | Slashdot, Digg |
| 👥 社交 | MySpace, AIM, MSN Messenger, ICQ |
| 😂 幽默 | eBaums World, Homestar Runner, Fark, Something Awful |
| 🏠 个人 | GeoCities Archive |
| 💬 论坛 | Reddit |

## 📝 页面说明

### 首页 (/home)

- 欢迎横幅，带有闪烁文字和动画星星
- 热门链接展示卡片
- 分类导航侧边栏
- 访客计数器和在线用户统计
- 当前时间显示

### 关于页面 (/about)

- 网站管理员介绍
- 技能进度条展示
- 兴趣爱好标签
- 收藏列表（音乐、电影、游戏、网站）
- 联系信息（复古风格）

### 链接页面 (/links)

- 分类快速导航
- 搜索和过滤功能
- 多维度排序（访问量、标题、年份）
- 链接卡片网格展示
- 分类颜色标识

### 留言板页面 (/guestbook)

- 完整的留言表单（姓名、邮箱、网站、留言）
- 实时提交动画
- 留言列表展示
- 分页导航
- 管理员标识

### 404 页面

- 复古风格错误页面
- 有趣的错误消息
- 快速导航链接
- 技术细节展示

## 🔧 开发指南

### 添加新链接

编辑 `src/app/services/link.service.ts` 文件，在 `links` 数组中添加新条目：

```typescript
{
  id: 21,
  title: 'Your Link Title',
  url: 'https://example.com',
  description: 'Description of the link',
  category: 'games', // 可选: games, music, art, tech, social, humor, personal, forum
  visits: 1234,
  createdYear: 2000
}
```

### 自定义配色

编辑 `tailwind.config.js` 文件中的 `theme.extend.colors` 部分：

```javascript
colors: {
  'retro-black': '#000000',
  'retro-white': '#ffffff',
  // 自定义更多颜色...
}
```

### 添加新页面

1. 在 `src/app/components/` 下创建新组件
2. 在 `src/app/app.routes.ts` 中添加路由配置
3. 在导航栏组件中添加菜单项

## 🐛 故障排除

### 常见问题

**Q: npm install 失败？**
A: 确保使用 Node.js 18+ 版本，尝试删除 `node_modules` 和 `package-lock.json` 后重新安装。

**Q: 样式不生效？**
A: 检查 Tailwind CSS 配置，确保 `content` 路径正确。

**Q: PrimeNG 组件不显示？**
A: 确保在组件的 `imports` 数组中导入了需要的 PrimeNG 模块。

**Q: 路由不工作？**
A: 检查 `app.routes.ts` 中的路由配置，确保路径拼写正确。

## 📄 许可证

MIT License

## 🙏 致谢

- 感谢 2000 年代互联网的美好回忆
- GeoCities、Angelfire、Tripod 等平台的启发
- 所有怀旧网站的贡献者

---

**用像素和怀旧制作 🎮**

*最佳在 800x600 分辨率下查看* 😉
