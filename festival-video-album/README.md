# 节日视频相册 - Festival Video Album

一个基于人工智能的节日主题视频相册Web应用程序，让用户可以根据照片创建精彩的节日视频。

## 功能特性

- 🎄 **多种节日主题**：支持圣诞节、新年、生日、婚礼等多种节日主题
- 🎬 **多种视频风格**：电影、梦幻、活力、优雅四种视频风格任您选择
- 📸 **简单上传**：支持拖放上传，最多可上传10张照片
- 🤖 **AI智能生成**：基于人工智能技术，自动生成节日视频
- 📊 **实时进度**：显示处理进度，包括分析照片、提交任务、创建视频、最终确定四个步骤
- 🎥 **视频预览**：生成的视频网格展示，支持播放预览
- 💾 **下载分享**：支持视频下载、Web Share API分享和剪贴板复制
- 📱 **响应式设计**：完美适配桌面和移动设备

## 技术栈

- **框架**：React 19
- **语言**：TypeScript
- **样式**：Tailwind CSS
- **路由**：React Router v7
- **图标**：Lucide React
- **打包工具**：Vite 6
- **状态管理**：React Context + useReducer

## 项目结构

```
festival-video-album/
├── src/
│   ├── context/
│   │   └── AppContext.tsx       # 应用状态管理上下文
│   ├── pages/
│   │   ├── LandingPage.tsx      # 登录页面
│   │   ├── UploadPage.tsx       # 上传页面
│   │   ├── ProcessingPage.tsx   # 处理进度页面
│   │   └── PreviewPage.tsx      # 预览页面
│   ├── services/
│   │   └── api.ts                # API服务和工具函数
│   ├── types/
│   │   └── index.ts              # 类型定义
│   ├── App.tsx                   # 主应用组件
│   ├── main.tsx                  # 应用入口
│   └── index.css                 # 全局样式
├── public/
│   └── vite.svg                  # Vite图标
├── index.html                    # HTML模板
├── package.json                  # 项目配置
├── tsconfig.json                 # TypeScript配置
├── tsconfig.app.json             # TypeScript应用配置
├── tsconfig.node.json            # TypeScript Node配置
├── vite.config.ts                # Vite配置
├── tailwind.config.js            # Tailwind CSS配置
├── postcss.config.js             # PostCSS配置
└── eslint.config.js              # ESLint配置
```

## 页面说明

### 1. 登录页面 (LandingPage)
- 展示应用功能和特性
- 介绍多种节日主题和视频风格
- 引导用户开始创作

### 2. 上传页面 (UploadPage)
- 拖放区域：支持拖放或点击选择图片
- 图片预览：显示已上传的图片，支持删除
- 主题选择：选择节日主题（圣诞节、新年、生日、婚礼）
- 风格选择：选择视频风格（电影、梦幻、活力、优雅）
- 生成按钮：开始视频生成流程

### 3. 处理页面 (ProcessingPage)
- 步骤指示器：显示四个处理步骤
- 进度条：实时显示处理进度
- 任务列表：显示每个视频任务的状态
- 错误处理：处理过程中出现错误时显示友好提示

### 4. 预览页面 (PreviewPage)
- 视频网格：以网格形式展示生成的视频
- 播放功能：点击播放按钮预览视频
- 操作按钮：支持复制链接、分享、下载
- 重新开始：可以重新开始创作新的视频相册

## 安装与运行

### 前置要求

- Node.js 18 或更高版本
- npm 或 pnpm 包管理器

### 安装依赖

```bash
cd festival-video-album
npm install
```

### 开发模式

```bash
npm run dev
```

应用将在 `http://localhost:5173` 运行。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 预览生产版本

```bash
npm run preview
```

## 使用说明

1. **访问应用**：打开浏览器访问应用地址
2. **了解功能**：在登录页面浏览应用的功能和特性
3. **开始创作**：点击"开始创作"按钮进入上传页面
4. **上传照片**：拖放或点击选择最多10张照片
5. **选择主题**：选择您喜欢的节日主题（圣诞节、新年、生日、婚礼）
6. **选择风格**：选择视频风格（电影、梦幻、活力、优雅）
7. **生成视频**：点击"生成视频"按钮开始处理
8. **等待处理**：在处理页面查看进度
9. **预览分享**：在预览页面播放、下载或分享您的视频

## API集成说明

当前项目使用模拟的API服务，在实际使用中，您需要集成真实的视频生成API。

### 可集成的API服务

- **Runway ML**：提供视频生成API
- **Stable Video Diffusion**：开源视频生成模型
- **Pika Labs**：AI视频生成平台
- **Luma AI**：高质量视频生成服务

### 如何替换API

编辑 `src/services/api.ts` 文件，替换以下函数的实现：

1. `analyzePhotos()` - 照片分析
2. `submitVideoTask()` - 提交视频生成任务
3. `checkTaskStatus()` - 检查任务状态
4. `finalizeVideos()` - 最终处理
5. `downloadVideo()` - 下载视频
6. `shareVideo()` - 分享视频
7. `copyToClipboard()` - 复制到剪贴板

## 自定义配置

### Tailwind CSS 主题

编辑 `tailwind.config.js` 文件来自定义主题、颜色、字体等。

### 主题和风格配置

编辑 `src/services/api.ts` 文件中的 `themePrompts` 和 `stylePrompts` 对象，自定义不同主题和风格的提示词。

## 开发说明

### 状态管理

应用使用 React Context + useReducer 进行状态管理，主要状态包括：
- 上传的图片
- 生成配置（主题、风格）
- 处理进度
- 视频任务状态
- 错误信息

### 类型安全

项目使用 TypeScript 提供完整的类型支持，所有类型定义在 `src/types/index.ts` 中。

### 组件结构

- 每个页面都是独立的 React 组件
- 使用函数式组件 + Hooks
- 状态通过 Context 共享
- 使用 Lucide React 图标库

## 浏览器支持

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

## 联系方式

如有问题或建议，请通过以下方式联系：
- 提交 GitHub Issue
- 发送邮件

---

**注意**：当前版本使用模拟的API服务，生成的视频URL为示例URL。在实际部署前，请集成真实的视频生成API服务。
