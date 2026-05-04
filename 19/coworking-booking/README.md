# 共享办公空间预订平台

一个功能完整的共享办公空间预订平台，使用 Angular 框架构建，具备动态房间可用性显示、动画日历选择器和可折叠设施详情展示功能。

## 项目功能

- **动态房间可用性显示**：实时显示房间预订状态，点击切换按钮可模拟房间可用性变化
- **动画日历选择器**：带有滑入/滑出动画效果的日期选择器，支持选择未来任意日期
- **可折叠设施详情**：点击展开按钮查看完整的房间设施列表和详细描述
- **时间段选择**：以 30 分钟为间隔的时间段选择器，直观显示已预订、可预订和已选择状态
- **预订流程**：完整的预订表单，包括个人信息填写、参会人数选择和预订摘要

## 技术栈

- **框架**：Angular 17+ (Standalone Components)
- **语言**：TypeScript
- **样式**：Tailwind CSS
- **UI 组件库**：Angular Material
- **路由**：Angular Router
- **动画**：Angular Animations
- **打包工具**：Angular CLI Application Builder
- **表单处理**：Angular Reactive Forms

## 项目结构

```
coworking-booking/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── room-list/          # 房间列表组件
│   │   │   │   ├── room-list.component.ts
│   │   │   │   ├── room-list.component.html
│   │   │   │   └── room-list.component.scss
│   │   │   └── booking/            # 预订页面组件
│   │   │       ├── booking.component.ts
│   │   │       ├── booking.component.html
│   │   │       └── booking.component.scss
│   │   ├── models/                 # 数据模型
│   │   │   └── room.ts
│   │   ├── services/               # 服务层
│   │   │   └── room.service.ts
│   │   ├── app.ts                  # 根组件
│   │   ├── app.html                # 根组件模板
│   │   ├── app.scss                # 根组件样式
│   │   ├── app.config.ts           # 应用配置
│   │   ├── app.routes.ts           # 路由配置
│   │   ├── app.config.server.ts
│   │   └── app.routes.server.ts
│   ├── main.ts
│   ├── main.server.ts
│   ├── server.ts
│   ├── index.html
│   └── styles.scss                 # 全局样式
├── angular.json                    # Angular 配置
├── package.json                    # 项目依赖
├── tailwind.config.js              # Tailwind CSS 配置
├── tsconfig.json                   # TypeScript 配置
└── README.md
```

## 安装与运行

### 环境要求

- Node.js 18.x 或更高版本
- npm 9.x 或更高版本
- Angular CLI 17.x 或更高版本

### 安装依赖

```bash
cd coworking-booking
npm install
```

### 开发模式运行

```bash
ng serve
```

启动后，在浏览器中访问 `http://localhost:4200` 即可查看应用。

### 构建生产版本

```bash
ng build
```

构建产物将输出到 `dist/` 目录。

### 运行测试

```bash
ng test
```

## 主要组件说明

### RoomListComponent (房间列表组件)

位置：`src/app/components/room-list/`

功能：
- 以卡片网格形式展示所有可预订的办公空间
- 每个卡片显示房间名称、类型、价格、容量和基本设施
- 动态显示房间可用性状态（绿色=可预订，红色=已占用）
- 点击展开按钮查看完整的设施详情和房间描述
- 提供切换按钮用于模拟房间可用性变化（演示功能）

动画效果：
- 页面加载时的淡入效果
- 房间可用性状态切换时的脉冲动画
- 设施详情展开/折叠的平滑过渡

### BookingComponent (预订页面组件)

位置：`src/app/components/booking/`

功能：
- 显示选中房间的详细信息和图片
- 提供动画日历选择器用于选择预订日期
- 时间段选择器（30分钟间隔），支持多选连续时间段
- 完整的预订表单，包括姓名、电话、邮箱、参会人数等
- 实时计算并显示预订费用
- 右侧固定的预订摘要面板
- 预订成功后的反馈和自动跳转

动画效果：
- 页面元素的淡入上移动画
- 日历选择器的滑入/滑出动画
- 时间段选择的交错动画

### RoomService (房间服务)

位置：`src/app/services/room.service.ts`

功能：
- 提供模拟的房间数据（6个不同类型的办公空间）
- 实现房间数据的获取、更新和可用性切换
- 使用 RxJS Observable 模拟异步数据请求

### Room 数据模型

位置：`src/app/models/room.ts`

定义了房间的数据结构，包括：
- 基本信息：ID、名称、类型、容量、价格
- 展示信息：图片、设施列表、描述
- 状态信息：可用性、下次可用时间

## 路由配置

| 路径 | 组件 | 说明 |
|------|------|------|
| `/` | RoomListComponent | 首页 - 房间列表 |
| `/booking/:id` | BookingComponent | 预订页面 |
| `**` | 重定向到 `/` | 404 处理 |

## 样式与设计

### Tailwind CSS 配置

项目使用 Tailwind CSS 进行样式开发，配置文件位于 `tailwind.config.js`，主要配置：

- 内容扫描范围：`src/**/*.{html,ts}`
- 主题：使用默认主题，可根据需要扩展

### 响应式设计

- 使用 Tailwind 的响应式工具类实现移动端适配
- 房间列表在不同屏幕尺寸下的布局：
  - 移动端：单列布局
  - 平板：双列布局
  - 桌面：三列布局

### 色彩方案

- 主色调：Azure/Blue (Angular Material 预设)
- 成功/可用状态：绿色 (#10b981)
- 错误/不可用状态：红色 (#ef4444)
- 警告状态：橙色 (#f59e0b)
- 信息/选中状态：蓝色 (#3b82f6)

## 演示数据说明

项目包含 6 个演示房间，分为三种类型：

1. **会议室 (Meeting)**：
   - 创新会议室 A：可容纳 8 人，¥150/小时
   - 董事会议室 D：可容纳 16 人，¥300/小时

2. **私密办公室 (Private)**：
   - 私密办公室 B：可容纳 2 人，¥80/小时
   - 单人专注舱 E：可容纳 1 人，¥50/小时

3. **开放空间 (Open)**：
   - 开放工位区 C：可容纳 20 人，¥30/小时
   - 创意协作区 F：可容纳 10 人，¥60/小时

## 开发说明

### 添加新房间

在 `src/app/services/room.service.ts` 中扩展 `rooms` 数组，按照现有格式添加新房间数据。

### 自定义时间段

在 `BookingComponent` 的 `generateTimeSlots()` 方法中修改时间段生成逻辑，当前支持 8:00 到 22:00，每 30 分钟一个时段。

### 调整动画效果

动画定义位于各组件的 `@Component` 装饰器的 `animations` 属性中，可根据需要调整动画时长、缓动函数等参数。

## 已知限制

- 当前为演示版本，数据存储在内存中，刷新页面后重置
- 房间可用性切换为模拟功能，实际项目中应连接后端 API
- 日期选择限制在未来日期，不支持预订过去的日期
- 时间段选择不支持跨天预订

## 后续优化建议

1. **后端集成**：连接真实的后端 API，实现数据持久化
2. **用户认证**：添加登录/注册功能，实现用户预订记录管理
3. **支付集成**：接入支付网关，实现在线支付功能
4. **邮件通知**：预订成功/取消时发送邮件通知
5. **日历视图**：添加月历视图，直观显示每天的预订情况
6. **筛选搜索**：添加按类型、价格、容量等条件的筛选功能
7. **评论系统**：添加用户对房间的评价和评分功能

## 许可证

MIT License
