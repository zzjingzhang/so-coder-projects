# 月相仪表板 (Moon Phase Dashboard)

一个精美的月相仪表板应用，展示月球周期可视化、相位名称、月出时间、日食预测和黄道带位置。

## 项目简介

本项目是一个基于 Angular 框架构建的月相仪表板应用，提供以下功能：

- 🌙 **今日月相展示**：显示当前日期的月相图标、名称、亮度和月相周期进度
- 📅 **月相日历**：以日历形式展示整月的月相变化
- 🔍 **日期详情**：查看任意日期的详细月相信息
- 🌗 **日食预测**：显示近期的日食和月食事件
- ♈ **黄道带位置**：显示月球在黄道带上的位置
- 🌘 **月相周期说明**：详细介绍八个月相阶段

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Angular | 21.2.x | 前端框架 |
| TypeScript | 5.9.x | 编程语言 |
| Tailwind CSS | 3.4.x | CSS 框架 |
| Angular Material | 21.2.x | UI 组件库 |
| Angular Router | 21.2.x | 路由管理 |
| Angular CLI | 21.2.x | 项目构建工具 |

## 项目结构

```
moon-phase-dashboard/
├── public/
│   └── favicon.ico              # 网站图标
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   ├── dashboard.component.ts        # 仪表板组件逻辑
│   │   │   ├── dashboard.component.html      # 仪表板组件模板
│   │   │   └── dashboard.component.css       # 仪表板组件样式
│   │   ├── models/
│   │   │   └── moon-phase.model.ts           # 月相数据模型定义
│   │   ├── services/
│   │   │   └── moon-phase.service.ts         # 月相数据计算服务
│   │   ├── app.ts                             # 根组件
│   │   ├── app.config.ts                      # 应用配置
│   │   └── app.routes.ts                      # 路由配置
│   ├── index.html                             # 入口 HTML 文件
│   ├── main.ts                                # 应用入口文件
│   └── styles.css                             # 全局样式
├── angular.json                               # Angular 配置
├── package.json                               # 项目依赖配置
├── postcss.config.js                          # PostCSS 配置
├── tailwind.config.js                         # Tailwind CSS 配置
├── tsconfig.json                              # TypeScript 主配置
├── tsconfig.app.json                          # TypeScript 应用配置
└── tsconfig.spec.json                         # TypeScript 测试配置
```

## 功能特性

### 1. 今日月相卡片
- 显示当前日期的月相图标（使用 emoji 表示）
- 月相名称（如：新月、蛾眉月、上弦月等）
- 亮度百分比和进度条
- 月相周期进度
- 月出和月落时间
- 黄道带位置（星座符号和度数）

### 2. 月相日历
- 以网格形式展示整月的月相
- 点击任意日期查看详情
- 当天日期高亮显示
- 选中日期有特殊样式
- 鼠标悬停显示月相详情

### 3. 日期详情标签页
- 显示选中日期的完整信息
- 包含月相名称、亮度、周期进度
- 月出/月落时间
- 黄道带位置详情

### 4. 日食预测标签页
- 显示近期的日食和月食事件
- 包含日期、类型（日食/月食）、名称
- 可见地区信息
- 食分大小（进度条显示）

### 5. 月相周期标签页
- 展示八个完整月相阶段
- 每个阶段的中英文名称
- 详细的月相周期说明

## 月相计算说明

本应用使用精确的月相计算公式：

1. **朔望月周期**：约 29.53058867 天
2. **相位计算**：基于已知新月日期计算任意日期的月相
3. **亮度计算**：使用余弦函数模拟月球被照亮的百分比
4. **黄道带位置**：根据月球运行轨道计算所在星座

## 快速开始

### 前置要求

- Node.js (建议版本 18.x 或更高)
- npm (通常随 Node.js 一起安装)
- Angular CLI (可选，但推荐)

### 安装步骤

1. **进入项目目录**
   ```bash
   cd moon-phase-dashboard
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **启动开发服务器**
   ```bash
   npm start
   ```
   或
   ```bash
   ng serve
   ```

4. **打开浏览器访问**
   ```
   http://localhost:4200
   ```

### 构建生产版本

```bash
npm run build
```
构建产物将输出到 `dist/` 目录。

### 运行测试

```bash
npm test
```

## 使用说明

### 导航月份
- 点击"上个月"按钮查看前一个月的月相
- 点击"下个月"按钮查看后一个月的月相
- 应用会自动预填充当前月份的数据

### 查看日期详情
1. 在"月相日历"标签页中点击任意日期
2. 切换到"选中日期详情"标签页查看完整信息

### 查看日食预测
- 切换到"日食预测"标签页
- 查看近期的日食和月食事件列表

## 开发指南

### 添加新功能

1. 在 `src/app/models/` 下添加数据模型
2. 在 `src/app/services/` 下添加业务逻辑服务
3. 在 `src/app/` 下创建新组件
4. 在 `app.routes.ts` 中配置路由

### 自定义样式

- 全局样式：`src/styles.css`
- 组件样式：`src/app/dashboard/dashboard.component.css`
- Tailwind 配置：`tailwind.config.js`

## 许可证

MIT License

## 联系方式

如有问题或建议，请提交 Issue 或 Pull Request。

---

🌙 探索月球的奥秘，追踪月相变化 🌙
