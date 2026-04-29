# 安全文件分享应用 (Secure File Share)

一个基于 Angular 框架的安全文件分享前端应用，支持文件上传、设置密码保护、选择有效期、生成分享链接以及安全下载功能。

## 功能特性

### 上传页面
- ✅ 支持文件拖拽上传和点击选择
- ✅ 实时显示文件名和文件大小
- ✅ 可选设置访问密码保护文件
- ✅ 支持多种有效期选择（1 小时、24 小时、7 天、30 天）
- ✅ 上传进度条显示
- ✅ 自动生成分享链接并支持一键复制
- ✅ 友好的错误处理和用户提示

### 下载页面
- ✅ 根据 URL 参数 `id` 加载文件信息
- ✅ 检测文件是否过期或不存在
- ✅ 密码保护文件验证
- ✅ 生成签名下载链接并自动触发下载
- ✅ 显示文件详细信息（文件名、大小、有效期）
- ✅ 加载动画和状态指示

### UI 组件
- ✅ 自定义按钮样式（主按钮、次要按钮）
- ✅ 现代化输入框和选择框
- ✅ 进度条组件
- ✅ Toast 通知系统
- ✅ 响应式卡片布局
- ✅ 流畅的页面和交互动画
- ✅ 完整的响应式设计（支持移动端和桌面端）

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Angular | 19.x | 前端框架 |
| TypeScript | 5.5.x | 开发语言 |
| Tailwind CSS | 3.4.x | 样式框架 |
| NG-ZORRO | 19.x | UI 组件库 |
| Angular Router | 19.x | 路由管理 |
| RxJS | 7.8.x | 响应式编程 |
| Angular CLI | 19.x | 项目构建工具 |

## 项目结构

```
secure-file-share/
├── src/
│   ├── app/
│   │   ├── pages/
│   │   │   ├── upload/
│   │   │   │   ├── upload.component.ts      # 上传页面组件
│   │   │   │   ├── upload.component.html    # 上传页面模板
│   │   │   │   └── upload.component.css     # 上传页面样式
│   │   │   └── download/
│   │   │       ├── download.component.ts    # 下载页面组件
│   │   │       ├── download.component.html  # 下载页面模板
│   │   │       └── download.component.css   # 下载页面样式
│   │   ├── services/
│   │   │   ├── file.service.ts              # 文件服务（上传、下载、API 调用）
│   │   │   └── notification.service.ts      # 通知服务（Toast 管理）
│   │   ├── types/
│   │   │   └── index.ts                     # 类型定义文件
│   │   ├── app.ts                           # 根组件
│   │   ├── app.config.ts                    # 应用配置
│   │   └── app.routes.ts                    # 路由配置
│   ├── index.html                           # HTML 入口文件
│   ├── main.ts                              # Angular 入口文件
│   └── styles.css                           # 全局样式（含 Tailwind 配置）
├── angular.json                             # Angular 配置
├── package.json                             # 项目依赖配置
├── tailwind.config.js                       # Tailwind CSS 配置
├── postcss.config.js                        # PostCSS 配置
├── tsconfig.json                            # TypeScript 配置
└── README.md                                # 项目说明文档
```

## 快速开始

### 环境要求

- Node.js >= 18.x
- npm >= 9.x
- Angular CLI >= 19.x

### 安装依赖

```bash
cd secure-file-share
npm install
```

### 开发模式

```bash
npm run dev
# 或
npm run start
```

应用将在 `http://localhost:4200` 启动。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist/secure-file-share` 目录。

### 运行测试

```bash
npm run test
```

## 核心服务说明

### FileService

文件服务，负责所有文件相关的业务逻辑：

- `uploadPrivateFile(file: File)` - 上传文件到服务器，支持进度追踪
- `createFileEntity(...)` - 创建文件实体记录
- `getFileEntity(id: string)` - 根据 ID 获取文件信息
- `createFileSignedUrl(fileUri: string)` - 获取文件签名下载链接
- `verifyPassword(fileId, password)` - 验证访问密码
- `formatFileSize(bytes)` - 格式化文件大小显示
- `createPageUrl(page, params)` - 生成页面 URL
- `isFileExpired(expiresAt)` - 检查文件是否过期

### NotificationService

通知服务，管理全局 Toast 通知：

- `success(message, duration?)` - 显示成功提示
- `error(message, duration?)` - 显示错误提示
- `warning(message, duration?)` - 显示警告提示
- `info(message, duration?)` - 显示信息提示
- `removeToast(id)` - 移除指定通知
- `clearAll()` - 清除所有通知

## 路由配置

| 路径 | 组件 | 说明 |
|------|------|------|
| `/` | UploadComponent | 首页（上传页面） |
| `/Download?id=xxx` | DownloadComponent | 下载页面（区分大小写） |
| `/download?id=xxx` | DownloadComponent | 下载页面（小写兼容） |
| `**` | UploadComponent | 通配路由，重定向到首页 |

## 工具函数

### createPageUrl

生成完整的页面 URL，用于创建分享链接：

```typescript
const shareLink = fileService.createPageUrl('Download', { id: fileId });
// 输出: http://localhost:4200/Download?id=file_123456
```

### formatFileSize

格式化字节数为可读的文件大小：

```typescript
fileService.formatFileSize(1048576); // 输出: "1.00 MB"
fileService.formatFileSize(1024);    // 输出: "1.00 KB"
```

### isFileExpired

检查文件是否已过期：

```typescript
const expired = fileService.isFileExpired(fileEntity.expiresAt);
// true: 已过期, false: 仍有效
```

## 样式主题

项目使用自定义 Tailwind 主题配置，主要颜色方案：

- **主色调 (Primary)**: 蓝色系 (`#0ea5e9`)
- **次要色 (Secondary)**: 紫色系 (`#d946ef`)
- **成功色 (Success)**: 绿色系 (`#22c55e`)
- **警告色 (Warning)**: 橙色系 (`#f59e0b`)
- **危险色 (Danger)**: 红色系 (`#ef4444`)

### 动画效果

- `fade-in`: 淡入动画
- `slide-up`: 上滑入场动画
- `pulse-slow`: 慢速呼吸动画
- `bounce-slow`: 慢速弹跳动画
- `glow`: 发光效果动画

## 响应式断点

| 断点 | 宽度 | 说明 |
|------|------|------|
| `sm` | 640px | 手机横屏 |
| `md` | 768px | 平板竖屏 |
| `lg` | 1024px | 平板横屏/小屏电脑 |
| `xl` | 1280px | 桌面显示器 |
| `2xl` | 1536px | 大屏显示器 |

## API 接口说明

项目设计与以下后端 API 接口对接：

### 1. UploadPrivateFile - 上传文件
```
POST /api/upload
Content-Type: multipart/form-data

Response: { file_uri: string }
```

### 2. File 实体 CRUD
```
POST   /api/files          - 创建文件记录
GET    /api/files/:id      - 获取文件信息
PUT    /api/files/:id      - 更新文件信息
DELETE /api/files/:id      - 删除文件
```

### 3. CreateFileSignedUrl - 获取签名下载链接
```
POST /api/files/signed-url
Body: { file_uri: string }

Response: { signed_url: string }
```

### 4. 验证密码
```
POST /api/files/:id/verify-password
Body: { password: string }

Response: { valid: boolean }
```

**注意**: 当前版本使用 Mock 数据实现，方便前端开发和测试。实际部署时请替换为真实的后端 API 地址。

## 开发说明

### Mock 数据

项目包含完整的 Mock 实现，无需后端即可测试所有功能：

- 上传文件：模拟进度条和上传过程
- 获取文件信息：根据 ID 返回预设的文件实体
- 密码验证：测试密码为 `password123`
- 签名链接：生成模拟的下载 URL

### 测试下载页面

访问以下 URL 测试下载页面：

1. **测试密码保护文件**: 
   ```
   http://localhost:4200/Download?id=mock_exists
   ```
   测试密码: `password123`

2. **测试已过期文件**:
   ```
   http://localhost:4200/Download?id=mock_expired
   ```

3. **测试无效 ID**:
   ```
   http://localhost:4200/Download?id=invalid_id
   ```

## 部署建议

### 生产环境构建

```bash
npm run build -- --configuration production
```

### 部署到静态托管

构建产物位于 `dist/secure-file-share/`，可以部署到任何支持静态文件托管的平台：

- Vercel
- Netlify
- GitHub Pages
- AWS S3
- 阿里云 OSS
- 传统 Web 服务器 (Nginx, Apache)

### Nginx 配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist/secure-file-share;
    index index.html;

    # Angular SPA 路由支持
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

## 后续优化建议

1. **文件类型限制**: 添加允许的文件类型和大小限制
2. **批量上传**: 支持多文件同时上传
3. **断点续传**: 大文件断点续传功能
4. **下载统计**: 添加下载次数统计
5. **二维码分享**: 生成二维码方便移动端访问
6. **深色模式**: 添加系统主题切换支持
7. **国际化**: 支持多语言切换
8. **PWA**: 支持离线访问和应用安装

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！
