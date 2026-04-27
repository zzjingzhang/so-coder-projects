# SecureVPN 产品宣传单页

一个现代化的VPN产品宣传网站，采用响应式设计，包含完整的产品展示和营销功能。

## 项目概述

SecureVPN 产品宣传单页是一个功能完整的企业级营销网站，旨在展示VPN产品的核心功能、价格方案和用户评价，帮助用户了解并选择适合的VPN服务。

## 技术栈

- **前端框架**: Vue 3
- **开发语言**: JavaScript
- **样式框架**: Tailwind CSS
- **UI组件库**: Ant Design Vue
- **路由管理**: Vue Router 4
- **构建工具**: Vite

## 项目结构

```
vpn-landing-page/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── NavBar.vue          # 顶部导航栏组件
│   │   ├── HeroSection.vue     # Hero区域组件
│   │   ├── FeaturesSection.vue # 功能展示组件
│   │   ├── PricingSection.vue  # 价格方案组件
│   │   ├── TestimonialsSection.vue # 用户评价组件
│   │   └── FooterSection.vue   # 页脚组件
│   ├── views/
│   │   └── Home.vue            # 首页视图
│   ├── App.vue                 # 根组件
│   ├── main.js                 # 应用入口
│   └── style.css               # 全局样式
├── index.html                  # HTML入口文件
├── package.json                # 项目依赖配置
├── vite.config.js              # Vite配置
├── tailwind.config.js          # Tailwind CSS配置
└── postcss.config.js           # PostCSS配置
```

## 功能特性

1. **响应式布局**: 完美适配桌面端、平板和移动设备
2. **滚动动画**: 页面元素在滚动时显示优雅的进入动画
3. **平滑滚动**: 导航链接点击后平滑滚动到对应页面区域
4. **动态导航栏**: 滚动时导航栏背景和阴影会动态变化
5. **价格方案**: 展示三种不同价格套餐，突出推荐方案
6. **评价轮播**: 自动轮播展示用户真实评价
7. **SEO优化**: 包含完整的SEO元信息设置
8. **现代化设计**: 采用渐变背景、卡片式布局和微交互动画

## 页面模块

### 1. 顶部导航栏 (NavBar)
- 固定在顶部，滚动时背景和阴影动态变化
- 响应式设计，移动端显示汉堡菜单
- 包含产品Logo、导航链接和CTA按钮

### 2. Hero区域 (HeroSection)
- 展示产品口号和核心价值主张
- 包含免费试用和了解更多两个CTA按钮
- 展示关键统计数据卡片（用户数、服务器位置、可用性）
- 渐变背景和动画效果

### 3. 功能展示区 (FeaturesSection)
- 展示四个核心功能：军事级加密、极速连接、全球服务器、零日志政策
- 每个功能配有图标和详细描述
- 卡片式布局，悬停时有动画效果

### 4. 价格方案区 (PricingSection)
- 展示三种价格套餐：免费版、标准版、高级版
- 标准版突出显示为推荐方案
- 每个套餐包含功能列表和价格信息
- 30天无理由退款保证说明

### 5. 用户评价区 (TestimonialsSection)
- 轮播展示用户真实评价
- 包含用户头像、姓名、职位和评价内容
- 支持手动切换和自动轮播
- 5星评分显示

### 6. 页脚 (FooterSection)
- 公司Logo和简介
- 社交媒体图标链接
- 快速链接导航
- 联系方式（邮箱、电话、地址）
- 版权信息和法律链接

## 安装和运行

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装依赖

```bash
cd vpn-landing-page
npm install
```

### 开发模式

```bash
npm run dev
```

项目将在 `http://localhost:3000` 启动，浏览器会自动打开。

### 构建生产版本

```bash
npm run build
```

构建后的文件将输出到 `dist` 目录。

### 预览生产版本

```bash
npm run preview
```

预览构建后的生产版本。

## 自定义配置

### 颜色主题

在 `tailwind.config.js` 中可以自定义颜色主题：

```javascript
theme: {
  extend: {
    colors: {
      primary: '#3b82f6',  // 主色调
      secondary: '#1e40af', // 次要色调
      dark: '#1e293b',      // 深色
      light: '#f8fafc',     // 浅色
    },
  },
}
```

### 动画配置

在 `tailwind.config.js` 中可以自定义动画效果：

```javascript
theme: {
  extend: {
    animation: {
      'fade-in': 'fadeIn 0.8s ease-in-out forwards',
      'slide-up': 'slideUp 0.8s ease-out forwards',
      'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    },
  },
}
```

## 浏览器兼容性

- Chrome >= 80
- Firefox >= 75
- Safari >= 13
- Edge >= 80

## 开发指南

### 添加新页面

1. 在 `src/views/` 目录下创建新的视图组件
2. 在 `src/main.js` 中添加路由配置
3. 在导航栏中添加对应的链接

### 添加新组件

1. 在 `src/components/` 目录下创建新的组件
2. 在需要使用的视图或组件中导入并使用
3. 如果需要滚动动画，添加 `v-scroll-animate` 指令

### 修改内容

- **修改文本内容**: 直接修改对应组件中的文本
- **修改图片**: 替换 `src/assets/` 目录下的图片文件
- **修改价格**: 在 `PricingSection.vue` 中修改价格数据
- **修改评价**: 在 `TestimonialsSection.vue` 中修改评价数据

## 部署建议

### 静态文件托管

构建后的 `dist` 目录可以部署到任何静态文件托管服务：

- Vercel
- Netlify
- GitHub Pages
- 阿里云OSS
- 腾讯云COS
- Nginx

### Nginx 配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## 许可证

MIT License

## 联系方式

如有问题或建议，请联系：

- 邮箱: support@securevpn.com
- 电话: +86 400-123-4567
