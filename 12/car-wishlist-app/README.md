# 购车愿望清单

一个简洁优雅的汽车愿望清单应用，帮助你记录和管理计划购买的汽车。采用深色主题设计，卡片式布局展示。

## 功能特性

- 🚗 **添加汽车**：轻松添加你计划购买的汽车信息（品牌、型号、年份、价格）
- 🎴 **卡片式展示**：所有汽车以精美的卡片形式展示，信息一目了然
- 📸 **智能图片**：根据品牌自动生成汽车图片，也可自定义图片链接
- 🗑️ **删除功能**：支持删除已添加的汽车，带确认提示
- 🎨 **深色主题**：优雅的深色界面，保护眼睛
- 📱 **响应式设计**：完美适配各种屏幕尺寸
- 💬 **消息提示**：添加/删除操作后有友好的提示信息

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Angular | 21.2 | 前端框架 |
| TypeScript | 5.9 | 编程语言 |
| Tailwind CSS | 3.x | CSS 框架 |
| NG-ZORRO | 19.x | UI 组件库 |
| Angular Router | 21.2 | 路由管理 |
| Angular CLI | 21.2 | 构建工具 |
| Application Builder | 21.2 | 打包方式 |

## 项目结构

```
car-wishlist-app/
├── src/
│   ├── app/
│   │   ├── models/                    # 数据模型
│   │   │   └── car.model.ts           # 汽车数据模型定义
│   │   ├── services/                  # 数据服务
│   │   │   └── car.service.ts         # 汽车数据管理服务
│   │   ├── app.config.ts              # 应用配置（动画、路由等）
│   │   ├── app.routes.ts              # 路由配置
│   │   ├── app.ts                     # 根组件（主界面逻辑）
│   │   ├── app.html                   # 根模板（主界面布局）
│   │   └── app.css                    # 根样式
│   ├── main.ts                        # 应用入口文件
│   ├── index.html                     # HTML 模板
│   └── styles.css                     # 全局样式（深色主题配置）
├── public/                            # 静态资源
│   └── favicon.ico                    # 网站图标
├── .vscode/                           # VS Code 配置
├── angular.json                       # Angular CLI 配置
├── package.json                       # 依赖配置
├── tailwind.config.js                 # Tailwind CSS 配置
├── postcss.config.js                  # PostCSS 配置
├── tsconfig.json                      # TypeScript 基础配置
├── tsconfig.app.json                  # TypeScript 应用配置
├── tsconfig.spec.json                 # TypeScript 测试配置
├── .editorconfig                      # 编辑器配置
├── .gitignore                         # Git 忽略文件
├── .prettierrc                        # Prettier 格式化配置
└── README.md                          # 项目文档
```

## 功能说明

### 添加汽车

1. 点击右上角「添加汽车」按钮
2. 在弹出的模态框中填写以下信息：
   - **品牌**：从下拉列表选择（Tesla、BMW、Mercedes-Benz、Audi、Porsche、Toyota、Honda、Ford、Lexus、Maserati、Lamborghini、Ferrari、其他）
   - **型号**：手动输入（如：Model 3、M4 Competition）
   - **年份**：数字输入，默认为 2024
   - **价格**：数字输入，单位为元
   - **图片链接（可选）**：留空将根据品牌自动生成默认图片
3. 点击「确定」完成添加

### 展示汽车

- 所有汽车以卡片网格形式展示
- 每张卡片显示：
  - 汽车图片（根据品牌生成或自定义）
  - 品牌 + 型号
  - 年份
  - 价格（自动格式化：大于 1 万显示「X万」，否则显示普通数字）
- 响应式布局：
  - 小屏幕（手机）：单列布局
  - 中屏幕（平板）：双列布局
  - 大屏幕（桌面）：三列或四列布局

### 删除汽车

1. 点击汽车卡片右上角的删除图标
2. 在确认对话框中：
   - 点击「删除」确认删除
   - 点击「取消」放弃删除
3. 删除成功后会显示提示消息

### 预置数据

应用启动时会显示两辆示例汽车：
- Tesla Model 3 (2024) - 价格约 26.99 万
- BMW M4 Competition (2024) - 价格约 89.39 万

你可以随时删除这些示例数据。

## 界面设计

### 深色主题

- **背景色**：深灰色 (#141414)
- **卡片背景**：次深灰色 (#1f1f1f)
- **文字颜色**：白色 (#ffffff) 用于主文字，浅灰色 (#a0a0a0) 用于次要文字
- **强调色**：蓝色 (#1677ff) 用于主要按钮
- **成功色**：绿色 (#4ade80) 用于价格显示
- **危险色**：红色 用于删除按钮

### 交互体验

- 按钮悬停效果：颜色加深
- 卡片悬停效果：上浮 + 阴影
- 模态框动画：平滑淡入淡出
- 消息提示：右上角弹出，自动消失

## 快速开始

### 环境要求

- Node.js 18.x 或更高版本（推荐 20.x+）
- npm 9.x 或更高版本
- Angular CLI 21.x（项目内已配置，可使用 npm 脚本）

### 安装依赖

```bash
cd car-wishlist-app
npm install
```

### 启动开发服务器

```bash
npm start
# 或
ng serve
```

启动后，在浏览器中访问 `http://localhost:4200`

### 构建生产版本

```bash
npm run build
# 或
ng build
```

构建产物将输出到 `dist/` 目录，可直接部署到任何静态文件服务器。

### 监听模式构建

```bash
npm run watch
```

适用于开发时需要持续构建的场景。

### 运行测试

```bash
npm test
```

使用 Vitest 运行单元测试。

## 开发命令

| 命令 | 说明 |
|------|------|
| `npm start` | 启动开发服务器，监听 4200 端口 |
| `npm run build` | 构建生产版本，输出到 dist/ 目录 |
| `npm run watch` | 监听模式构建（开发模式） |
| `npm test` | 运行单元测试 |
| `ng serve` | 等价于 npm start |
| `ng build` | 等价于 npm run build |

## 自定义配置

### 修改默认图片

如需修改默认图片生成逻辑，请编辑 `src/app/app.ts` 中的 `getDefaultImage` 方法。

目前支持的品牌图片：
- Tesla：白色特斯拉电动车
- BMW：黑色宝马豪华跑车
- Mercedes-Benz：银色奔驰豪华轿车
- Audi：灰色奥迪豪华车
- Porsche：红色保时捷 911 跑车
- Toyota：蓝色丰田实用型车
- Honda：白色本田紧凑型车
- Ford：黑色福特美式肌肉车
- Lexus：深蓝色雷克萨斯高端豪华车
- Maserati：红色玛莎拉蒂豪华跑车
- Lamborghini：黄色兰博基尼超级跑车
- Ferrari：红色法拉利超级跑车
- 其他：现代豪华轿车通用图

### 修改样式

全局样式位于 `src/styles.css`，包含：
- CSS 变量定义（颜色等）
- NG-ZORRO 组件样式覆盖（深色主题适配）

组件样式位于各组件的 `.css` 文件中。

### 扩展品牌列表

如需添加更多汽车品牌，请编辑 `src/app/app.ts` 中的 `carBrands` 数组，并在 `getDefaultImage` 方法中添加对应的图片生成逻辑。

## 数据持久化

**注意**：当前版本数据存储在内存中，刷新页面后数据会重置。如需要持久化存储，可以考虑：

1. **LocalStorage**：将数据保存到浏览器本地存储
2. **IndexedDB**：使用浏览器数据库
3. **后端服务**：连接到后端 API 进行数据存储

如需添加持久化功能，请修改 `src/app/services/car.service.ts` 中的数据存储逻辑。

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 许可证

MIT License

## 技术细节

### 组件架构

这是一个简单的单页面应用（SPA），使用 Angular Standalone Components 模式：

- **AppComponent**：根组件，包含所有功能逻辑
  - 显示汽车列表
  - 处理添加汽车模态框
  - 处理删除确认

- **CarService**：数据服务
  - 使用 Angular Signals 管理响应式状态
  - 提供添加、删除、获取数据的方法

- **Car 接口**：数据模型
  - 定义汽车的数据结构

### 响应式编程

应用使用 Angular 17+ 的 Signals 进行响应式状态管理：
- `cars` Signal 存储汽车列表
- 任何修改都会自动触发 UI 更新

### 表单验证

添加汽车表单包含以下验证规则：
- 品牌：必填
- 型号：必填
- 年份：必填，范围 1900-2100
- 价格：必填，最小值 0
- 图片链接：可选

### UI 组件使用

主要使用的 NG-ZORRO 组件：
- `nz-button`：按钮
- `nz-modal`：模态框
- `nz-input`：输入框
- `nz-input-number`：数字输入框
- `nz-select`：下拉选择
- `nz-card`：卡片
- `nz-row/nz-col`：网格布局
- `nz-icon`：图标
- `nz-message`：消息提示
- `nz-modal.confirm`：确认对话框

### Tailwind CSS

使用 Tailwind CSS 进行快速样式开发：
- 布局：`flex`, `grid`, `gap`, `padding`, `margin`
- 颜色：自定义颜色值（`bg-[#141414]`）
- 间距：`p-4`, `m-6`, `gap-4`
- 响应式：`xs:`, `sm:`, `md:`, `lg:` 前缀
- 效果：`hover:`, `transition`, `shadow`

## 常见问题

### Q: 刷新页面后数据丢失了？

A: 是的，当前版本数据存储在内存中。如需持久化，请参考「数据持久化」章节。

### Q: 如何添加更多汽车品牌？

A: 编辑 `src/app/app.ts` 中的 `carBrands` 数组添加新品牌，并在 `getDefaultImage` 方法中添加对应的图片生成逻辑。

### Q: 如何修改汽车图片？

A: 有两种方式：
1. 添加汽车时在「图片链接」字段输入自定义图片 URL
2. 修改 `src/app/app.ts` 中的 `getDefaultImage` 方法修改默认图片生成逻辑

### Q: 项目使用什么构建工具？

A: 使用 Angular CLI 的 `@angular/build:application` 构建器（Application Builder），这是 Angular 最新的构建方式，比旧的 Webpack 构建更快。

## 更新日志

### v1.0.0 (2026-05-01)

- 初始版本发布
- 实现添加汽车功能
- 实现汽车卡片列表展示
- 实现删除汽车功能
- 深色主题界面设计
- 响应式布局
- 默认图片生成
