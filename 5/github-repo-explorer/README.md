# GitHub Repo Explorer

一个使用 Vue 3 + GitHub OAuth 实现的全功能应用程序，用于浏览和管理 GitHub 仓库。

## 技术栈

- **前端框架**: Vue 3 (Composition API)
- **路由**: Vue Router 4
- **状态管理**: Pinia
- **UI 组件库**: Naive UI
- **样式**: Tailwind CSS
- **构建工具**: Vite
- **测试**: Vitest + Vue Test Utils

## 项目结构

```
github-repo-explorer/
├── src/
│   ├── api/
│   │   ├── auth.js          # GitHub OAuth 认证 API
│   │   ├── github.js        # GitHub API 封装 (模拟)
│   │   └── index.js         # API 导出
│   ├── components/
│   │   ├── FullscreenProgress.vue  # 全屏加载指示器
│   │   ├── GridProgress.vue        # 网格加载指示器
│   │   ├── RepoCard.vue            # 仓库卡片组件
│   │   └── CommitCard.vue          # 提交卡片组件
│   ├── router/
│   │   └── index.js         # Vue Router 配置
│   ├── stores/
│   │   ├── auth.js          # 认证状态管理
│   │   ├── repo.js          # 仓库状态管理
│   │   └── commits.js       # 提交状态管理
│   ├── views/
│   │   ├── LoginView.vue         # 登录页面
│   │   ├── AuthCallbackView.vue  # OAuth 回调页面
│   │   ├── DashboardView.vue     # 仪表板页面
│   │   ├── CommitsView.vue       # 提交视图页面
│   │   └── NotFoundView.vue      # 404 页面
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── tests/
│   ├── api/
│   │   └── github.test.js        # GitHub API 测试
│   ├── components/
│   │   ├── RepoCard.test.js      # 仓库卡片测试
│   │   └── CommitCard.test.js    # 提交卡片测试
│   ├── router/
│   │   └── routes.test.js        # 路由测试
│   ├── stores/
│   │   ├── auth.test.js          # 认证状态测试
│   │   ├── repo.test.js          # 仓库状态测试
│   │   └── commits.test.js       # 提交状态测试
│   └── setup.js                  # 测试配置
├── index.html
├── package.json
├── vite.config.js
├── vitest.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 功能特性

### 认证
- GitHub OAuth 2.0 登录
- 访问令牌本地存储
- 受保护的路由
- 自动登录状态恢复

### 仪表板
- 仓库列表展示
- 按名称搜索
- 可见性过滤（公共/私有）
- 多种排序选项：
  - 最佳匹配
  - 星标数量
  - 分支数量
  - 需要帮助的问题
  - 最近更新
- 分页功能

### 仓库卡片
- 显示名称、描述、语言、星数
- 显示上次更新时间
- 悬停时预取分支和最近提交

### 提交视图
- 分支选择
- 按日期分组显示提交
- GitHub 链接导航
- 提交详情模态框：
  - 提交消息
  - 作者头像
  - 作者名称
  - 提交日期

### 用户体验
- 全屏加载指示器
- 网格加载指示器
- 流畅的页面过渡
- 错误处理和重试

## 启动项目

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:5173

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

### 运行测试

```bash
npm run test
```

### 运行测试（监视模式）

```bash
npm run test:watch
```

### 运行测试（覆盖率）

```bash
npm run test:coverage
```

## 环境变量

创建 `.env` 文件配置：

```env
VITE_GITHUB_CLIENT_ID=your_github_client_id
```

## 测试覆盖

本项目包含全面的测试：

- **认证流程**: 登录、登出、OAuth 回调、状态管理
- **受保护路由**: 路由守卫、认证检查
- **仓库列表**: 搜索、过滤、排序、分页
- **提交视图**: 分支选择、提交列表、分页
- **错误处理**: 网络错误、认证失败
- **组件**: RepoCard、CommitCard、加载指示器

## 开发说明

本项目使用模拟的 GitHub API，适合开发和测试环境。模拟 API 提供了：

- 12 个示例仓库
- 5 个分支
- 150 条提交记录
- 分页支持

所有 API 响应格式与真实 GitHub API 一致。
