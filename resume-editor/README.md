# 在线简历编辑器

一个功能强大的在线简历编辑器，支持实时预览、AI 智能优化、头像上传、响应式设计等功能。

## 功能特性

### 📝 简历编辑
- **个人信息**：填写姓名、邮箱、电话、头像、地址、社交链接等
- **教育经历**：管理学校、学位、专业、就读时间等
- **工作经验**：添加公司、职位、工作时间、工作描述、量化成就
- **项目经历**：记录项目名称、角色、技术栈、项目链接等
- **技能管理**：按分类管理技能标签

### 🤖 AI 智能功能
- **工作经历量化**：AI 自动为工作经历生成量化成就要点
- **职位描述优化**：分析目标职位描述，提供以下建议：
  - 缺失的关键词
  - 推荐的技能
  - 简历摘要改进建议
  - 具体的优化技巧
- **一键写入**：可将 AI 建议一键应用到简历中

### 📷 头像上传
- 支持图片格式校验
- 文件大小限制 (2MB)
- 进度条显示
- 实时预览

### 🎨 界面设计
- **暗色模式**：支持浅色/深色主题切换
- **响应式设计**：完美适配桌面端和移动端
- **侧边栏抽屉**：移动端自动折叠为抽屉菜单
- **状态持久化**：主题、侧边栏状态自动保存到 localStorage

### ⌨️ 快捷操作
- `Cmd/Ctrl + B`：切换侧边栏展开/折叠
- 自动保存：所有简历数据自动保存

### 📄 预览与导出
- 实时预览：右侧实时显示简历效果
- 打印功能：支持打印简历
- 导出功能：导出为 JSON 格式

## 技术栈

- **框架**：Vue 3 + TypeScript
- **构建工具**：Vite
- **UI 组件库**：Ant Design Vue
- **样式**：Tailwind CSS
- **路由**：Vue Router
- **HTTP 客户端**：Axios

## 项目结构

```
resume-editor/
├── src/
│   ├── api/
│   │   ├── client.ts      # Base44 API 客户端封装
│   │   ├── auth.ts        # 认证服务（登录/注册/登出）
│   │   └── llm.ts         # LLM 服务（AI 生成）
│   ├── components/
│   │   ├── Sidebar.vue               # 侧边栏组件
│   │   ├── PersonalInfoForm.vue      # 个人信息表单
│   │   ├── EducationForm.vue         # 教育经历表单
│   │   ├── WorkExperienceForm.vue    # 工作经验表单（含 AI 生成）
│   │   ├── ProjectsForm.vue          # 项目经历表单
│   │   ├── SkillsForm.vue            # 技能表单
│   │   ├── ResumePreview.vue         # 简历预览组件
│   │   └── ToastContainer.vue        # 全局 Toast 组件
│   ├── router/
│   │   └── index.ts       # 路由配置
│   ├── store/
│   │   └── index.ts       # 全局状态管理
│   ├── types/
│   │   └── index.ts       # TypeScript 类型定义
│   ├── views/
│   │   ├── HomeView.vue           # 首页（简历编辑器）
│   │   ├── LoginView.vue          # 登录页
│   │   ├── OptimizeView.vue       # 简历优化页
│   │   └── NotFoundView.vue       # 404 页面
│   ├── App.vue          # 根组件
│   ├── main.ts          # 入口文件
│   └── style.css        # 全局样式
├── index.html           # HTML 模板
├── package.json         # 依赖配置
├── vite.config.ts       # Vite 配置
├── tsconfig.json        # TypeScript 配置
├── tailwind.config.js   # Tailwind CSS 配置
├── postcss.config.js    # PostCSS 配置
└── .env.example         # 环境变量示例
```

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

```bash
npm install
```

### 配置环境变量

复制 `.env.example` 为 `.env` 并填写你的 Base44 配置：

```bash
cp .env.example .env
```

编辑 `.env` 文件：

```env
VITE_BASE44_API_KEY=your_api_key_here
VITE_BASE44_BASE_URL=https://api.base44.com
VITE_BASE44_MODEL=gpt-4
```

### 开发模式

```bash
npm run dev
```

应用将在 `http://localhost:3000` 启动

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 使用说明

### 1. 编辑简历

- 点击左侧菜单切换不同的简历部分
- 填写个人信息、教育经历、工作经验等
- 所有修改会自动保存到本地存储

### 2. AI 生成工作成就

- 在工作经验表单中，填写工作描述
- 点击 "AI 生成要点" 按钮
- AI 将自动生成 3-5 个量化的成就要点
- 可以编辑、添加或删除生成的要点

### 3. 简历优化

- 进入 "简历优化" 页面
- 粘贴目标职位的完整描述
- 点击 "开始分析"
- 查看 AI 提供的优化建议
- 点击建议项可一键添加到简历

### 4. 上传头像

- 在个人信息页面，点击 "上传头像"
- 选择图片文件（支持 JPG、PNG 等格式）
- 上传成功后会在预览中显示

### 5. 切换主题

- 点击侧边栏底部的太阳/月亮图标
- 主题设置会自动保存

### 6. 快捷操作

- 按 `Cmd/Ctrl + B` 切换侧边栏
- 点击侧边栏菜单项快速导航

## 数据持久化

应用会自动将以下数据保存到 localStorage：

- 简历数据 (`resume_data`)
- 主题设置 (`theme`)
- 侧边栏状态 (`sidebar_collapsed`)
- 用户信息 (`base44_user`)

## 打印简历

1. 确保简历内容已填写完整
2. 点击预览区域右上角的 "打印" 按钮
3. 或使用浏览器的打印功能 (`Cmd/Ctrl + P`)
4. 选择打印选项并打印

## License

MIT

## 贡献

欢迎提交 Issue 和 Pull Request！
