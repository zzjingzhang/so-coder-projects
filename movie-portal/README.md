# MoviePortal - 响应式电影网站

一个现代化的响应式电影网站，使用 Vue 3 + TypeScript + Tailwind CSS + PrimeVue 构建，提供流畅的电影浏览体验。

## 功能特性

- 🏠 **首页**：大幅背景图轮播、搜索框、深色主题导航栏、热门电影推荐、分类浏览
- 🎬 **电影列表**：卡片式展示、搜索过滤、类型筛选、年份筛选
- 📄 **电影详情页**：海报展示、评分星级、标签、播放按钮、视频弹窗、电影简介、演员阵容、多画质下载链接
- 📱 **响应式设计**：完美适配桌面端和移动端
- 🎨 **深色主题**：现代化深色界面设计

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue | 3.5+ | 前端框架 |
| TypeScript | 6.0+ | 类型安全 |
| Vite | 8.0+ | 构建工具 |
| Vue Router | 4.x | 路由管理 |
| Tailwind CSS | 3.x | 样式框架 |
| PrimeVue | 3.x+ | UI 组件库 |
| PrimeIcons | 6.x+ | 图标库 |

## 项目结构

```
movie-portal/
├── public/                  # 静态资源目录
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/             # 资源文件
│   ├── components/         # 公共组件
│   │   ├── MovieCard.vue   # 电影卡片组件
│   │   └── VideoModal.vue  # 视频弹窗组件
│   ├── data/               # 数据文件
│   │   └── mockData.ts     # 模拟电影数据
│   ├── router/             # 路由配置
│   │   └── index.ts
│   ├── types/              # 类型定义
│   │   └── index.ts
│   ├── views/              # 页面组件
│   │   ├── Home.vue        # 首页
│   │   ├── MovieList.vue   # 电影列表页
│   │   ├── MovieDetail.vue # 电影详情页
│   │   └── NotFound.vue    # 404 页面
│   ├── App.vue             # 根组件
│   ├── main.ts             # 入口文件
│   └── style.css           # 全局样式
├── .gitignore
├── index.html              # HTML 模板
├── package.json            # 项目配置
├── postcss.config.js       # PostCSS 配置
├── tailwind.config.js      # Tailwind CSS 配置
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts          # Vite 配置
```

## 页面路由

| 路由 | 页面 | 说明 |
|------|------|------|
| `/` | Home | 首页，包含轮播图、搜索框、热门推荐 |
| `/movies` | MovieList | 电影列表页，支持搜索和筛选 |
| `/movies/:id` | MovieDetail | 电影详情页，展示完整信息 |
| `/*` | NotFound | 404 错误页面 |

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

```bash
cd movie-portal
npm install
```

### 开发模式

启动本地开发服务器：

```bash
npm run dev
```

默认访问地址：`http://localhost:5173`

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 预览生产版本

```bash
npm run preview
```

## 核心功能说明

### 首页 (Home)

- **自动轮播**：热门电影背景图自动轮播（5秒切换）
- **手动控制**：支持前后切换和指示器点击
- **搜索功能**：首页搜索框可快速搜索电影
- **热门推荐**：展示精选电影卡片
- **分类导航**：按类型快速浏览电影

### 电影列表页 (MovieList)

- **搜索过滤**：支持按电影名称、类型、导演搜索
- **类型筛选**：12 种电影类型筛选
- **年份筛选**：按年份区间筛选
- **响应式网格**：根据屏幕宽度自动调整列数
- **空状态处理**：无结果时显示友好提示

### 电影详情页 (MovieDetail)

- **Hero 区域**：大幅背景图 + 海报展示
- **评分系统**：星级评分 + 数字评分
- **元信息**：年份、时长、导演、上映日期等
- **视频播放**：点击播放按钮打开弹窗播放预告片
- **演员阵容**：网格展示演员头像和角色
- **下载链接**：480p / 720p / 1080p 三种画质
- **相关推荐**：展示相关电影推荐

### 视频弹窗 (VideoModal)

- **自动播放**：弹窗打开时自动播放视频
- **自动暂停**：弹窗关闭时暂停视频
- **键盘支持**：按 ESC 键关闭弹窗
- **点击关闭**：点击遮罩层关闭弹窗
- **响应式尺寸**：适配不同屏幕尺寸

## 设计规范

### 颜色主题

| 变量名 | 颜色值 | 用途 |
|--------|--------|------|
| primary | #1a1a2e | 主背景色 |
| secondary | #16213e | 次级背景色 |
| accent | #e94560 | 强调色（按钮、链接） |
| dark | #0f0f1e | 深色背景 |

### 断点设计

| 断点 | 宽度 | 说明 |
|------|------|------|
| sm | 640px | 小屏幕（手机横屏） |
| md | 768px | 中屏幕（平板） |
| lg | 1024px | 大屏幕（笔记本） |
| xl | 1280px | 超大屏幕（桌面） |

## 自定义配置

### 修改 Tailwind 主题

编辑 `tailwind.config.js` 文件：

```javascript
export default {
  theme: {
    extend: {
      colors: {
        // 自定义颜色
      }
    }
  }
}
```

### 添加新的电影数据

编辑 `src/data/mockData.ts` 文件，在 `movies` 数组中添加新的电影对象。

### 修改路由配置

编辑 `src/router/index.ts` 文件，添加或修改路由规则。

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！
