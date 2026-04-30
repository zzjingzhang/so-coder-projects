# Coursespace - 在线课程平台落地页

一个使用 Angular、Tailwind CSS 和 NG-ZORRO 构建的现代化在线课程平台落地页，支持服务器端渲染 (SSR)。

## 项目结构

```
coursespace-angular/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── header/              # 头部导航组件
│   │   │   │   ├── header.component.ts
│   │   │   │   ├── header.component.html
│   │   │   │   └── header.component.css
│   │   │   ├── hero/                # Hero 区域组件
│   │   │   │   ├── hero.component.ts
│   │   │   │   ├── hero.component.html
│   │   │   │   └── hero.component.css
│   │   │   ├── feature/             # 功能特点组件
│   │   │   │   ├── feature.component.ts
│   │   │   │   ├── feature.component.html
│   │   │   │   └── feature.component.css
│   │   │   ├── courses-carousel/    # 热门课程轮播组件
│   │   │   │   ├── courses-carousel.component.ts
│   │   │   │   ├── courses-carousel.component.html
│   │   │   │   └── courses-carousel.component.css
│   │   │   ├── testimonials/        # 学员评价轮播组件
│   │   │   │   ├── testimonials.component.ts
│   │   │   │   ├── testimonials.component.html
│   │   │   │   └── testimonials.component.css
│   │   │   ├── mentors/             # 导师轮播组件
│   │   │   │   ├── mentors.component.ts
│   │   │   │   ├── mentors.component.html
│   │   │   │   └── mentors.component.css
│   │   │   ├── newsletter/          # 订阅表单组件
│   │   │   │   ├── newsletter.component.ts
│   │   │   │   ├── newsletter.component.html
│   │   │   │   └── newsletter.component.css
│   │   │   └── footer/              # 页脚组件
│   │   │       ├── footer.component.ts
│   │   │       ├── footer.component.html
│   │   │       └── footer.component.css
│   │   ├── data/
│   │   │   └── mock-data.ts         # 模拟数据
│   │   ├── models/
│   │   │   └── types.ts             # TypeScript 类型定义
│   │   ├── services/
│   │   │   └── theme.service.ts     # 主题切换服务
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.css
│   │   ├── app.module.ts            # 主应用模块
│   │   └── app.server.module.ts     # SSR 服务端模块
│   ├── main.ts                       # 浏览器入口
│   ├── main.server.ts                # 服务端入口
│   ├── index.html
│   └── styles.css                    # 全局样式
├── angular.json                      # Angular CLI 配置
├── package.json
├── tailwind.config.js                # Tailwind CSS 配置
├── postcss.config.js                 # PostCSS 配置
├── tsconfig.json                     # TypeScript 配置
├── tsconfig.app.json
└── server.ts                         # Express SSR 服务器
```

## 技术栈

- **前端框架**: Angular 19
- **语言**: TypeScript
- **样式**: Tailwind CSS 3
- **UI 组件库**: NG-ZORRO (Ant Design for Angular)
- **服务器端渲染**: Angular SSR
- **路由**: Angular Router
- **包管理**: npm

## 功能特性

### 全局主题系统
- 明亮/暗黑主题切换
- CSS 变量定义统一配色
- 平滑的主题过渡动画
- 基于系统偏好自动检测

### 页面模块

1. **Header 头部**
   - 左侧品牌 Logo
   - 平滑滚动导航链接 (Home, Courses, Testimonial, Mentor)
   - Sign In / Sign Up 按钮
   - 移动端抽屉式菜单
   - 主题切换按钮

2. **Hero 区域**
   - 全宽渐变背景
   - 标题文字带曲线装饰
   - 三项统计数据展示 (Students, Quality Course, Experience Mentors)
   - 证书徽章装饰
   - "Get Started" 按钮 (滚动至热门课程)
   - "Watch Video" 按钮 (带播放图标)

3. **Feature 功能特点**
   - 左侧功能图片展示
   - 右侧四项功能卡片
   - 自定义进度条显示进度
   - 75% 圆形进度环示例

4. **Popular Courses 热门课程**
   - 横向轮播组件
   - 课程卡片展示 (封面、标题、评分、价格)
   - 响应式布局 (移动端1张、平板2张、桌面端3张)
   - Hover 时提升阴影并显示前进箭头

5. **Testimonials 学员评价**
   - 轮播展示学员评价
   - 卡片宽度约 270px
   - 用户头像、姓名和职业展示

6. **Mentors 导师展示**
   - 轮播展示导师信息
   - 照片、姓名、专业方向、简介
   - 所属公司 Logo 展示

7. **Newsletter 订阅表单**
   - 居中布局
   - 邮箱输入框
   - 自定义按钮 (可禁用悬停动画)
   - secondary 主色块背景

8. **Footer 页脚**
   - 三列导航 (Course, Menu, About)
   - 公司简介列
   - 社交媒体图标链接 (Instagram, YouTube, Twitter, Dribbble, GitHub)
   - Hover 时变换背景色

### 全局样式
- 自定义滚动条样式
- 点击动画关键帧
- 全局背景颜色变量
- 统一排版和阴影

## 类型定义

所有组件都使用严格的 TypeScript 类型定义：

```typescript
// 导航项
interface NavItem { id: string; label: string; href: string; fragment: string; }

// 课程
interface Course { id: string; title: string; instructor: string; image: string; ... }

// 评价
interface Testimonial { id: string; name: string; position: string; avatar: string; ... }

// 导师
interface Mentor { id: string; name: string; specialization: string; avatar: string; ... }

// 社交链接
interface SocialLink { id: string; name: string; icon: string; url: string; }
```

## 安装和运行

### 环境要求
- Node.js >= 18.18.0
- npm >= 9.x

### 安装依赖

```bash
cd coursespace-angular
npm install
```

### 开发模式运行

```bash
npm run dev
# 或
npm start
```

访问 `http://localhost:4200`

### 生产构建

```bash
npm run build
```

构建产物输出到 `dist/coursespace-angular/`

### SSR 服务端运行

```bash
# 先构建
npm run build

# 运行 SSR 服务器
npm run serve:ssr:coursespace-angular
```

访问 `http://localhost:4000`

## 服务器端渲染 (SSR) 配置

项目已完整配置 SSR：

1. **样式顺序保证**: 使用 `styles.css` 全局样式注入，确保 SSR 时样式正确加载
2. **Hydration**: 已启用 `provideClientHydration()`
3. **平台检测**: 使用 `isPlatformBrowser()` 安全访问浏览器 API
4. **主题持久化**: 使用 localStorage 保存主题偏好，SSR 时根据系统偏好初始化

## Tailwind CSS 配置

```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: { primary, secondary, accent, dark },
      fontFamily: { sans, heading },
      boxShadow: { soft, hover, card, 'card-hover' },
      animation: { 'click-effect', 'fade-in', 'slide-up', 'pulse-slow' }
    }
  }
}
```

## 自定义图标

项目使用 NG-ZORRO 图标库，支持的图标包括：
- 导航图标: `menu`, `close`, `arrow-left`, `arrow-right`
- 社交图标: `instagram`, `youtube`, `twitter`, `github`, `dribbble`
- 功能图标: `play-circle`, `star`, `heart`, `check-circle`, `book`, `user`, `clock-circle`, `trophy`, `mail`, `phone`, `global`

## 响应式断点

| 断点 | 宽度 | 布局 |
|------|------|------|
| sm | 640px | 移动端单列 |
| md | 768px | 平板双列 |
| lg | 1024px | 桌面端三列 |
| xl | 1280px | 宽屏布局 |

## 开发指南

### 添加新模块

1. 在 `src/app/components/` 下创建新组件文件夹
2. 更新 `src/app/app.module.ts` 中的 declarations
3. 在 `src/app/app.component.html` 中引入组件

### 主题扩展

在 `src/styles.css` 中添加新的 CSS 变量：
```css
:root {
  --your-color: #hex-code;
}

.dark {
  --your-color: #dark-hex-code;
}
```

## 浏览器支持

- Chrome (最新)
- Firefox (最新)
- Safari (最新)
- Edge (最新)

## License

MIT
