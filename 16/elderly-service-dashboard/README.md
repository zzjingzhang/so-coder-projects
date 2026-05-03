# 养老服务数据大屏

一个基于 Angular 框架开发的养老服务数据可视化大屏系统，展示老人档案、养老机构、助餐点、社区服务中心等汇总数据。

## 项目简介

本项目是一个养老服务数据大屏展示系统，采用现代化的技术栈构建，具有响应式设计、美观的数据可视化界面和流畅的用户体验。

## 技术栈

- **框架**: Angular 21.2.0
- **语言**: TypeScript 5.9
- **样式**: Tailwind CSS 4.2.4
- **UI 组件库**: Angular Material 21.2.9
- **路由**: Angular Router
- **打包方式**: Angular CLI Application Builder
- **测试框架**: Vitest

## 项目结构

```
elderly-service-dashboard/
├── src/
│   ├── app/
│   │   ├── pages/
│   │   │   └── dashboard/
│   │   │       ├── dashboard.ts      # 首页组件逻辑
│   │   │       ├── dashboard.html    # 首页组件模板
│   │   │       └── dashboard.css     # 首页组件样式
│   │   ├── app.ts                     # 根组件
│   │   ├── app.html                   # 根组件模板
│   │   ├── app.css                    # 根组件样式
│   │   ├── app.config.ts              # 应用配置
│   │   ├── app.routes.ts              # 路由配置
│   │   └── app.spec.ts                # 根组件测试
│   ├── main.ts                        # 应用入口
│   ├── main.server.ts                 # 服务端渲染入口
│   ├── server.ts                      # Express 服务器
│   ├── index.html                     # HTML 模板
│   └── styles.css                     # 全局样式
├── public/
│   └── favicon.ico                    # 网站图标
├── angular.json                       # Angular 配置
├── package.json                       # 项目依赖
├── tsconfig.json                      # TypeScript 配置
├── tsconfig.app.json                  # 应用 TypeScript 配置
├── tsconfig.spec.json                 # 测试 TypeScript 配置
├── .editorconfig                      # 编辑器配置
├── .gitignore                         # Git 忽略文件
├── .prettierrc                        # Prettier 配置
└── README.md                          # 项目说明文档
```

## 功能特性

### 数据展示模块

1. **老人档案**
   - 总老人数统计
   - 高龄老人统计
   - 独居老人统计
   - 特殊照料老人统计
   - 数据变化趋势显示

2. **养老机构**
   - 养老机构数量统计
   - 总床位数量统计
   - 已入住床位统计
   - 空床位数量统计
   - 机构列表展示
   - 入住率进度条显示
   - 机构状态标签

3. **助餐点**
   - 助餐点数量统计
   - 今日供餐数量统计
   - 满意度统计
   - 覆盖社区数量统计
   - 助餐点详情列表
   - 评分显示

4. **社区服务中心**
   - 服务中心数量统计
   - 服务项目数量统计
   - 今日服务人次统计
   - 服务人员数量统计
   - 服务中心详情列表
   - 服务项目标签展示
   - 服务人员数量

### 交互功能

- **数据刷新**：点击刷新按钮更新数据
- **查看详情**：查看各模块的详细信息
- **响应式设计**：适配不同屏幕尺寸
- **动画效果**：流畅的过渡动画和悬停效果

## 安装与运行

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0
- Angular CLI >= 21.0.0

### 安装依赖

```bash
# 进入项目目录
cd elderly-service-dashboard

# 安装项目依赖
npm install
```

### 开发模式

```bash
# 启动开发服务器
npm start

# 或者使用 ng 命令
ng serve
```

启动后，浏览器访问 `http://localhost:4200/` 即可查看应用。

### 构建生产版本

```bash
# 构建生产版本
npm run build

# 或者使用 ng 命令
ng build
```

构建产物将输出到 `dist/` 目录。

### 运行测试

```bash
# 运行单元测试
npm test

# 或者使用 ng 命令
ng test
```

## 样式说明

### 配色方案

项目采用深蓝色为主色调，搭配清新的辅助色：

- **主色调**: #1e3a5f (深蓝色)
- **辅助色**: #4a90e2 (亮蓝色)
- **成功色**: #48bb78 (绿色)
- **警告色**: #ed8936 (橙色)
- **危险色**: #f56565 (红色)
- **信息色**: #4299e1 (蓝色)

### 组件样式

- **数据卡片**: 半透明背景 + 毛玻璃效果
- **统计项**: 悬停高亮 + 渐变色彩
- **进度条**: 平滑动画 + 渐变填充
- **按钮**: 渐变背景 + 悬停效果
- **标签**: 圆角设计 + 半透明背景

## 路由配置

| 路径 | 组件 | 说明 |
|------|------|------|
| `/` | DashboardComponent | 首页（数据大屏） |
| `/dashboard` | DashboardComponent | 数据大屏 |

## 开发说明

### 添加新页面

1. 在 `src/app/pages/` 目录下创建新页面目录
2. 创建组件文件（.ts, .html, .css）
3. 在 `src/app/app.routes.ts` 中添加路由配置

### 自定义主题

主题配色定义在 `src/styles.css` 的 `@theme` 块中，可以根据需要修改：

```css
@theme {
  --color-primary: #1e3a5f;
  --color-accent: #4a90e2;
  /* 更多颜色配置 */
}
```

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 许可证

MIT License

## 联系方式

如有问题或建议，请提交 Issue 或 Pull Request。
