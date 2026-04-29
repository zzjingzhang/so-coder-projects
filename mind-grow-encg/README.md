# Mind & Grow ENCG - Student Health Platform

一个专为学生设计的综合健康与 wellness 平台，提供睡眠管理、营养建议、压力管理、体育活动和心理健康支持。

## 项目结构

```
mind-grow-encg/
├── src/
│   ├── components/          # 公共组件
│   │   ├── Navbar.vue       # 响应式导航栏
│   │   └── Footer.vue       # 底部信息栏
│   ├── data/
│   │   └── mockData.js      # 模拟数据
│   ├── router/
│   │   └── index.js         # 路由配置
│   ├── views/               # 页面视图
│   │   ├── Home.vue         # 首页
│   │   ├── HealthBalance.vue # 健康与平衡页面
│   │   ├── StudentRecipes.vue # 学生食谱页面
│   │   ├── Community.vue    # 社区页面
│   │   ├── Store.vue        # 商店页面
│   │   └── ZenStudio.vue    # 禅意工作室页面
│   ├── App.vue              # 根组件
│   ├── main.js              # 入口文件
│   └── style.css            # 全局样式
├── index.html               # HTML 模板
├── package.json             # 项目配置
├── vite.config.js           # Vite 配置
├── tailwind.config.js       # Tailwind CSS 配置
└── postcss.config.js        # PostCSS 配置
```

## 技术栈

- **框架**: Vue 3
- **语言**: JavaScript
- **样式**: Tailwind CSS
- **UI 组件库**: Element Plus
- **路由**: Vue Router
- **打包工具**: Vite

## 功能特性

### 1. 导航栏 (Navbar)
- 响应式设计，支持桌面和移动端
- 包含所有页面链接：首页、Health & Balance、Student Recipes、Community、Well-Being Store、Zen Studio
- 移动端提供折叠汉堡菜单
- 登录按钮

### 2. 底部信息栏 (Footer)
- 品牌信息
- 快速链接
- 资源链接
- 联系信息
- 社交媒体图标
- 邮件订阅表单

### 3. 首页 (Home)
- **Hero Banner**: 大幅横幅，展示平台口号和 "Get Started" 按钮
- **快速链接卡片**: 指向各核心模块的导航卡片
- **学生评价轮播**: 使用 Element Plus 轮播组件展示学生评价
- **每周挑战**: 展示当前挑战及报名按钮
- **邮件订阅**: 表单订阅平台更新

### 4. 社区页面 (Community)
选项卡式布局，包含以下模块：

- **Forums (论坛)**:
  - 论坛主题列表
  - 帖子查看模态框
  - 发布新帖子表单
  - 按类别筛选

- **Live Chat (在线聊天)**:
  - 聊天时间表
  - 聊天规则指南

- **Mentorship (导师指导)**:
  - 导师卡片展示
  - 导师专业领域
  - 申请成为导师流程

- **Challenges (挑战)**:
  - 每周挑战列表
  - 排行榜展示
  - 参与者统计

- **Events (活动)**:
  - 活动列表
  - 活动日历入口
  - RSVP 功能

### 5. 健康与平衡页面 (Health & Balance)
选项卡式布局，包含以下模块：

- **Sleep (睡眠)**:
  - 睡眠计算器（基于 90 分钟周期）
  - 睡眠周期解释
  - 睡眠优化建议卡片

- **Nutrition (营养)**:
  - 学生营养指南
  - 预算食谱预览
  - 快速早餐/午餐/晚餐建议

- **Stress Management (压力管理)**:
  - 呼吸练习（4-7-8、Box 呼吸、交替鼻孔呼吸）
  - 番茄工作法介绍
  - 任务优先级技巧

- **Physical Activity (体育活动)**:
  - 快速运动方案（5 分钟晨间、桌面拉伸、10 分钟 HIIT）
  - 运动对学生的益处

- **Mental Health (心理健康)**:
  - 倦怠识别标志
  - 支持资源（校园咨询中心、危机热线等）
  - 自我护理策略（身体、情感、社交、学业）
  - 危机紧急提示

### 6. 学生食谱页面 (Student Recipes)
- **多维度筛选**:
  - 搜索框
  - 预算筛选（低/中）
  - 烹饪时间筛选（快速/中等/慢速）
  - 目标筛选（能量/专注/放松）

- **食谱卡片**:
  - 图片展示
  - 时长、预算标签
  - 评分、目标标签
  - 营养信息（卡路里、蛋白质、份量）

- **详情模态框**:
  - 完整食谱信息
  - 配料列表
  - 步骤说明
  - 营养信息
  - 生成购物清单按钮
  - 营养计算按钮

### 7. 商店页面 (Well-Being Store)
- 产品分类筛选
- 产品卡片展示（图片、价格、折扣、评分）
- 购物车抽屉
- 添加到购物车功能

### 8. 禅意工作室页面 (Zen Studio)
- 视频分类筛选
- 特色视频展示
- 视频网格布局
- 快速练习卡片
- 正念益处介绍

## 配色方案

以绿色、蓝色、紫色为主色调：

- **Primary (主色)**: 绿色系 (#22c55e) - 代表健康、自然
- **Secondary (次色)**: 蓝色系 (#3b82f6) - 代表信任、平静
- **Accent (强调)**: 紫色系 (#8b5cf6) - 代表创意、平衡

## 安装与运行

### 前置要求

- Node.js (建议版本 16+)
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

项目将在 `http://localhost:5173` 启动。

### 构建生产版本

```bash
npm run build
```

构建产物将生成在 `dist` 目录。

### 预览生产版本

```bash
npm run preview
```

## 路由配置

| 路径 | 页面 |
|------|------|
| `/` | Home (首页) |
| `/health-balance` | Health & Balance (健康与平衡) |
| `/student-recipes` | Student Recipes (学生食谱) |
| `/community` | Community (社区) |
| `/store` | Well-Being Store (商店) |
| `/zen-studio` | Zen Studio (禅意工作室) |

## 组件复用

### 公共组件

- **Navbar.vue**: 全局导航栏，支持响应式布局
- **Footer.vue**: 全局底部栏，包含品牌信息和快速链接

### 数据驱动组件

所有页面均使用 `mockData.js` 中的模拟数据，便于后续替换为真实 API 数据。

## 交互状态管理

- 使用 Vue 3 Composition API (`ref`, `computed`)
- Element Plus 组件的响应式绑定
- 模态框状态管理
- 选项卡切换状态
- 筛选条件状态

## 开发工具

- **Vite**: 快速开发服务器和构建工具
- **Tailwind CSS**: 实用优先的 CSS 框架
- **Element Plus**: Vue 3 UI 组件库
- **Vue Router**: 官方路由管理

## 浏览器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 许可证

MIT License

---

© 2024 Mind & Grow ENCG. All rights reserved.
