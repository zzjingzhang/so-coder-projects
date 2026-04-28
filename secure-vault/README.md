# Secure Vault - 密码管理器

一个专业的密码管理器应用，帮助您安全存储和管理各类账户密码。

## 功能特性

### 核心功能
- **密码存储与管理**：安全存储各类账户密码，支持添加、编辑、删除操作
- **密码强度检测**：实时检测密码强度，提供详细的强度评分和改进建议
- **密码生成器**：内置强大的密码生成器，支持自定义密码长度和字符类型
- **分类管理**：支持按分类组织密码，便于快速查找
- **标签系统**：为密码添加标签，实现更精细的分类管理
- **快速搜索**：支持按标题、用户名、网站、标签等多维度搜索
- **数据持久化**：使用浏览器本地存储，数据安全保存

### UI 特性
- **渐变背景**：精美的渐变背景设计，提供舒适的视觉体验
- **卡片式布局**：现代化的卡片式布局，信息层次清晰
- **平滑动画**：丰富的悬停、点击动画效果，提升用户体验
- **响应式设计**：完美适配各种屏幕尺寸，从手机到桌面
- **精心设计的按钮**：非基础的按钮设计，带有渐变和阴影效果
- **适当的阴影**：合理的阴影层次，增强视觉深度

## 技术栈

### 前端框架
- **Angular 21+**：现代化的前端框架，使用 Standalone Components
- **TypeScript**：强类型编程语言，提供更好的开发体验
- **Angular Router**：官方路由库，实现单页应用导航

### UI 组件库
- **NG-ZORRO (Ant Design for Angular)**：企业级 UI 组件库
- **Tailwind CSS**：原子化 CSS 框架，快速构建美观界面

### 构建工具
- **Angular CLI**：官方构建工具，使用 Application Builder
- **Vite**：下一代前端构建工具，提供极快的开发体验

### 其他依赖
- **RxJS**：响应式编程库，处理异步数据流
- **Zone.js**：变更检测机制

## 项目结构

```
secure-vault/
├── public/                     # 静态资源目录
├── src/
│   ├── app/
│   │   ├── components/         # 可复用组件
│   │   │   ├── password-card/          # 密码卡片组件
│   │   │   ├── password-generator/     # 密码生成器组件
│   │   │   ├── password-strength/      # 密码强度检测组件
│   │   │   ├── search-bar/             # 搜索栏组件
│   │   │   └── category-filter/        # 分类过滤器组件
│   │   ├── pages/              # 页面组件
│   │   │   ├── dashboard/              # 仪表板页面（主页面）
│   │   │   ├── add-password/           # 添加密码页面
│   │   │   └── edit-password/          # 编辑密码页面
│   │   ├── services/           # 服务层
│   │   │   ├── password-storage.service.ts    # 密码存储服务
│   │   │   ├── password-strength.service.ts   # 密码强度检测服务
│   │   │   ├── password-generator.service.ts  # 密码生成服务
│   │   │   └── category.service.ts             # 分类管理服务
│   │   ├── types/              # 类型定义
│   │   │   └── index.ts
│   │   ├── app.ts              # 根组件
│   │   ├── app.html            # 根模板
│   │   ├── app.routes.ts       # 路由配置
│   │   └── app.config.ts       # 应用配置
│   ├── index.html              # HTML 入口文件
│   ├── main.ts                 # TypeScript 入口文件
│   └── styles.css              # 全局样式
├── angular.json                # Angular 配置
├── package.json                # 项目依赖配置
├── tsconfig.json               # TypeScript 配置
├── tsconfig.app.json           # 应用 TypeScript 配置
├── tsconfig.spec.json          # 测试 TypeScript 配置
├── tailwind.config.js          # Tailwind CSS 配置
├── postcss.config.js           # PostCSS 配置
├── .editorconfig               # 编辑器配置
├── .gitignore                  # Git 忽略配置
├── .prettierrc                 # Prettier 格式化配置
└── README.md                   # 项目说明文档
```

## 安装与运行

### 环境要求
- Node.js 18+ （推荐使用 LTS 版本）
- npm 9+ 或 yarn 1.22+

### 安装依赖

```bash
# 进入项目目录
cd secure-vault

# 安装依赖
npm install

# 或者使用 yarn
yarn install
```

### 开发模式

```bash
# 启动开发服务器
npm run dev

# 或者使用 ng serve
npm run start
```

启动后，浏览器会自动打开 `http://localhost:4200`

### 构建生产版本

```bash
# 构建生产版本
npm run build
```

构建完成后，文件将输出到 `dist/` 目录

### 构建开发版本（监听文件变化）

```bash
# 构建开发版本并监听变化
npm run watch
```

### 运行测试

```bash
# 运行单元测试
npm run test
```

## 使用说明

### 1. 查看密码列表
- 打开应用后，主页面会显示所有已保存的密码
- 每个密码以卡片形式展示，包含标题、用户名、密码等信息
- 密码默认隐藏，点击眼睛图标可显示
- 点击复制图标可一键复制到剪贴板

### 2. 添加新密码
- 点击右上角的「添加密码」按钮
- 填写密码信息：
  - **标题**：密码的名称（如：Gmail 账号）
  - **用户名/邮箱**：登录账号
  - **密码**：登录密码
  - **网站地址**（可选）：相关网站链接
  - **分类**：选择所属分类
  - **标签**（可选）：添加标签便于搜索
  - **备注**（可选）：其他补充信息
- 可以使用内置的密码生成器生成安全密码
- 实时查看密码强度评分
- 点击「保存密码」完成添加

### 3. 编辑密码
- 在密码卡片上点击「编辑」按钮
- 修改需要更新的信息
- 点击「保存更改」完成编辑

### 4. 删除密码
- 在密码卡片上点击「删除」按钮
- 确认删除操作

### 5. 使用分类筛选
- 在左侧分类面板选择分类
- 列表将只显示该分类下的密码
- 点击「全部」可查看所有密码

### 6. 搜索密码
- 在顶部搜索栏输入关键词
- 支持搜索：标题、用户名、网站、标签
- 搜索结果实时更新

### 7. 密码生成器
- 点击「生成密码」按钮打开密码生成器
- 自定义密码选项：
  - **密码长度**：8-32 个字符
  - **包含小写字母**：a-z
  - **包含大写字母**：A-Z
  - **包含数字**：0-9
  - **包含特殊符号**：!@#$%^&* 等
  - **排除易混淆字符**：不使用 0, O, l, I 等易混淆字符
- 点击「生成密码」生成新密码
- 点击「使用此密码」将密码填入表单

### 8. 密码强度检测
- 输入密码时实时显示强度评分
- 评分等级：
  - **弱**（0-3 分）：密码安全性差，建议修改
  - **中等**（4-5 分）：密码安全性一般
  - **强**（6-7 分）：密码安全性较好
  - **非常强**（8-10 分）：密码安全性极佳
- 详细显示密码满足的安全条件：
  - 包含小写字母
  - 包含大写字母
  - 包含数字
  - 包含特殊符号
  - 长度至少 8 个字符

## 数据存储

### 存储位置
- 密码数据存储在浏览器的 `localStorage` 中
- 存储键名：`secure_vault_passwords`
- 分类数据存储键名：`secure_vault_categories`

### 数据格式
密码数据以 JSON 格式存储，包含以下字段：
- `id`：唯一标识符
- `title`：标题
- `username`：用户名
- `password`：密码
- `website`：网站地址（可选）
- `notes`：备注（可选）
- `category`：分类 ID
- `tags`：标签数组
- `createdAt`：创建时间
- `updatedAt`：更新时间
- `lastUsed`：最后使用时间（可选）
- `strength`：密码强度信息

### 注意事项
- 数据仅存储在当前浏览器中
- 清除浏览器数据会导致密码丢失
- 建议定期备份重要密码
- 当前版本未实现密码加密存储，请勿在公共设备上使用

## 开发指南

### 添加新组件

```bash
# 使用 Angular CLI 创建组件
ng generate component components/my-component --standalone

# 或者手动创建
# 1. 在 src/app/components/ 下创建组件目录
# 2. 创建 .ts 文件，使用 standalone: true
# 3. 在需要使用的组件中导入
```

### 添加新服务

```bash
# 使用 Angular CLI 创建服务
ng generate service services/my-service

# 或者手动创建
# 1. 在 src/app/services/ 下创建服务文件
# 2. 使用 @Injectable({ providedIn: 'root' }) 装饰器
```

### 自定义样式

- 全局样式在 `src/styles.css` 中定义
- 组件样式在各自的 `styles` 数组中定义
- Tailwind CSS 配置在 `tailwind.config.js` 中
- 主题色定义在 `tailwind.config.js` 的 `theme.extend.colors` 中

## 浏览器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

## 更新日志

### v1.0.0
- 初始版本发布
- 实现密码存储、编辑、删除功能
- 实现密码强度检测
- 实现密码生成器
- 实现分类管理
- 实现标签系统
- 实现快速搜索
- 响应式设计
- 精美的 UI 界面
