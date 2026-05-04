# 公告管理系统

一个功能完善的公告管理系统，支持公告的新增、修改、删除、查询，以及在不同层级（产品、系统、菜单）和不同设备（PC端、移动端）的灵活展示。

## 技术栈

- **框架**: Angular 21.2
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **UI组件库**: PrimeNG
- **路由**: Angular Router
- **打包**: Angular CLI Application Builder

## 项目结构

```
announcement-management-system/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── announcement-list/          # 公告列表组件（查询功能）
│   │   │   │   ├── announcement-list.component.ts
│   │   │   │   ├── announcement-list.component.html
│   │   │   │   └── announcement-list.component.css
│   │   │   ├── announcement-form/          # 公告表单组件（新增/修改）
│   │   │   │   ├── announcement-form.component.ts
│   │   │   │   ├── announcement-form.component.html
│   │   │   │   └── announcement-form.component.css
│   │   │   ├── announcement-popup/         # 公告弹窗组件（首次访问显示）
│   │   │   │   ├── announcement-popup.component.ts
│   │   │   │   ├── announcement-popup.component.html
│   │   │   │   └── announcement-popup.component.css
│   │   │   ├── announcement-carousel/      # 公告轮播组件（后续访问显示）
│   │   │   │   ├── announcement-carousel.component.ts
│   │   │   │   ├── announcement-carousel.component.html
│   │   │   │   └── announcement-carousel.component.css
│   │   │   └── layout/                     # 布局和演示页面
│   │   │       ├── demo-page.component.ts
│   │   │       ├── demo-page.component.html
│   │   │       └── demo-page.component.css
│   │   ├── models/                         # 数据模型
│   │   │   └── announcement.model.ts
│   │   ├── services/                       # 服务层
│   │   │   ├── announcement.service.ts     # 公告服务
│   │   │   └── mock-data.service.ts        # 模拟数据服务
│   │   ├── app-module.ts                    # 根模块
│   │   ├── app-routing-module.ts           # 路由配置
│   │   ├── app.ts                           # 根组件
│   │   ├── app.html
│   │   └── app.css
│   ├── index.html
│   ├── main.ts
│   └── styles.css                           # 全局样式（含Tailwind指令）
├── angular.json
├── package.json
├── tailwind.config.js                       # Tailwind配置
├── postcss.config.js                        # PostCSS配置
└── README.md
```

## 功能特性

### 1. 公告管理功能

#### 公告新增
- 提供专门的新增公告页面，包含清晰的表单输入区域
- 表单字段包括：
  - 公告标题（必填，最多200字符）
  - 公告内容（支持HTML，必填）
  - 公告摘要（可选，最多500字符）
  - 发布时间（默认为当前时间，可手动调整）
  - 适用层级选择（产品、系统、菜单）
  - 生效端口选择（PC端、移动端、全部）
  - 有效期（必填，格式为具体时间段，精确到时分秒）
- 若选择"系统内菜单"层级，需进一步选择产品、系统和菜单（级联选择）

#### 公告修改
- 在公告查询结果列表中，每条公告记录提供"修改"操作按钮
- 点击"修改"按钮后，弹出与新增公告类似的表单，且已填充原有公告信息
- 支持修改所有字段，包括标题、内容、有效期等

#### 公告删除
- 在公告查询结果列表中，每条公告记录提供"删除"操作按钮
- 点击"删除"按钮后，弹出确认对话框，提示"确认删除该公告？此操作不可恢复。"
- 确认后从数据源中删除该公告记录

#### 公告查询
- 提供查询页面，包含查询条件输入框和查询按钮
- 查询条件包括：
  - 公告标题（支持模糊查询）
  - 发布时间范围（开始时间和结束时间）
  - 适用层级（可选全部、产品、单个系统、系统内菜单）
  - 发布状态（草稿、已发布、已过期）
- 支持级联选择产品、系统、菜单
- 查询结果按发布时间倒序显示

### 2. 公告显示功能

#### PC端显示
- **首次访问**：当用户首次到达对应层级页面时，若存在未读且在有效期内的公告，弹出模态弹框显示公告标题和内容
- **后续访问**：用户关闭弹框或查看详情后，系统记录用户已读状态。在公告有效期内，后续访问该页面时，已读公告在页面顶部以轮播形式展示

#### 移动端显示
- **首次访问**：移动端用户首次进入对应层级页面，若有未读且在有效期内的公告，以全屏弹窗形式展示
- **后续访问**：用户关闭弹窗或查看详情后，系统记录已读。在公告有效期内，后续访问该页面时，已读公告在页面顶部以滚动条形式轮播展示

### 3. 层级说明

系统支持三种层级的公告发布：

1. **产品级**：针对整个产品的公告，适用于该产品下的所有系统
   - 例如：大麦、BI、丽晟、百维等

2. **系统级**：针对单个系统的公告
   - 例如：大麦电商版、零售BI、丽晟-OTB、百维-业财版等

3. **菜单级**：针对系统内单个菜单的公告
   - 例如：大麦-零售版-实时数据、百观-我的商品、BI-百图-科技中心项目大屏等

### 4. 埋点设计

- **事件定义**："公告详情点击"事件
- **触发时机**：当用户在PC端点击"查看详情"按钮或在移动端点击公告标题展开摘要后点击"查看详情"时
- **数据采集**：采集的数据包括公告ID、用户ID、用户使用的设备类型（PC或移动端）、点击时间等信息

## 快速开始

### 环境要求

- Node.js >= 18.13.0
- npm >= 9.0.0
- Angular CLI >= 17.0.0

### 安装依赖

```bash
cd announcement-management-system
npm install
```

### 启动开发服务器

```bash
ng serve
# 或
npm run start
```

启动后，打开浏览器访问 `http://localhost:4200`

### 构建项目

```bash
# 开发环境构建
ng build

# 生产环境构建
ng build --configuration production
```

构建产物将输出到 `dist/` 目录。

### 运行测试

```bash
ng test
```

## 使用说明

### 公告管理页面

1. 点击顶部导航栏的"公告管理"按钮进入管理页面
2. 使用查询条件过滤公告列表
3. 点击"新增公告"按钮创建新公告
4. 在列表中点击"编辑"图标修改公告
5. 在列表中点击"删除"图标删除公告（需确认）

### 公告展示演示页面

1. 点击顶部导航栏的"公告展示"按钮进入演示页面
2. 选择适用层级（产品、系统、菜单）
3. 选择具体的产品/系统/菜单
4. 选择显示模式：
   - **弹窗模式**：模拟首次访问页面时的公告弹窗
   - **轮播模式**：模拟后续访问页面时的公告轮播
5. 选择设备类型（PC端/移动端）查看不同设备的显示效果

## 样式设计

- 使用 Tailwind CSS 进行样式开发
- 色彩搭配合理，蓝色为主色调，提供良好的视觉体验
- 按钮文字水平垂直居中显示
- 支持响应式布局，适配PC端和移动端
- 文字显示完整，字体大小适中，确保良好的可读性

## 模拟数据说明

项目包含以下模拟数据用于演示：

### 产品数据
- 大麦 (p1)
- BI (p2)
- 丽晟 (p3)
- 百维 (p4)

### 系统数据
- 大麦电商版、大麦零售版、大麦移动端
- 零售BI、百图-科技中心项目大屏
- 丽晟-OTB、丽选
- 百维-业财版
- 百观-报告中心

### 菜单数据
- 实时数据、销售报表、库存管理、订单管理
- 我的商品、数据概览
- OTB计划、财务报表

### 公告数据
包含5条示例公告，涵盖不同层级和设备类型。

## 注意事项

1. 本项目使用模拟数据，实际项目中需要连接真实的后端API
2. 用户状态管理使用简单的内存存储，实际项目中建议使用 localStorage 或 sessionStorage
3. 公告内容支持HTML渲染，实际项目中需要注意XSS安全防护
4. 埋点数据目前仅打印到控制台，实际项目中需要发送到分析服务器

## 许可证

MIT License
