# Restreamer Web UI

一个用于 datarhei Restreamer 视频流服务器的完整 Web UI 应用。

## 功能特性

### 认证系统
- 本地用户名/密码登录
- Auth0 SSO 单点登录支持

### 频道管理
- 带有缩略图的频道列表
- 频道创建、编辑和删除
- 频道状态切换（在线/离线）
- 搜索和过滤功能

### 系统监控
- CPU 使用率监控
- 内存使用情况
- 磁盘空间监控
- 网络流量统计

### 设置管理
- FFmpeg 编码参数配置
- 音频/视频过滤器设置
- 输出选项配置
- HLS 和 RTMP 支持

### 播放器
- 可嵌入的播放器页面
- 支持覆盖层（Overlay）
- 支持 AirPlay 和 Chromecast
- 实时流统计

### OEmbed 支持
- JSON 格式端点
- XML 格式端点
- 标准 OEmbed 响应

### 国际化
- 完全支持 i18n
- 中英文切换
- 响应式设计（移动端和桌面端）

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Angular | 21.2.0 | Web 框架 |
| TypeScript | 5.9.x | 编程语言 |
| Tailwind CSS | 4.x | 样式框架 |
| PrimeNG | 17.x | UI 组件库 |
| Angular Router | 21.x | 路由管理 |
| @ngx-translate | 15.x | 国际化 |

## 项目结构

```
restreamer-ui/
├── src/
│   ├── app/
│   │   ├── core/                    # 核心模块
│   │   │   ├── guards/              # 路由守卫
│   │   │   ├── models/              # 数据模型
│   │   │   └── services/            # 服务层
│   │   ├── shared/                  # 共享组件
│   │   │   ├── components/          # 可重用组件
│   │   │   └── shared.module.ts     # 共享模块
│   │   ├── features/                # 功能模块
│   │   │   ├── auth/                # 认证模块
│   │   │   ├── dashboard/           # 仪表盘
│   │   │   ├── channels/            # 频道管理
│   │   │   ├── system/              # 系统监控
│   │   │   ├── settings/            # 设置管理
│   │   │   ├── player/              # 播放器
│   │   │   ├── embed/               # 嵌入播放器
│   │   │   └── oembed/              # OEmbed 端点
│   │   ├── layout/                  # 布局组件
│   │   ├── app.module.ts            # 根模块
│   │   ├── app-routing.module.ts    # 路由配置
│   │   └── app.component.ts         # 根组件
│   ├── assets/
│   │   └── i18n/                    # 国际化文件
│   ├── styles.css                   # 全局样式
│   └── main.ts                      # 入口文件
├── angular.json                     # Angular 配置
├── package.json                     # 依赖配置
├── postcss.config.js                # PostCSS 配置
└── tsconfig.json                    # TypeScript 配置
```

## 快速开始

### 前置要求

- Node.js >= 20.x
- npm >= 10.x

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:4200 查看应用。

### 构建生产版本

```bash
npm run build
```

### 运行测试

```bash
npm run test
```

## 认证配置

### 本地认证

默认用户凭据：
- 用户名: `admin` 或 `user`
- 密码: `password`

### Auth0 SSO

在 `src/app/core/services/auth.service.ts` 中配置 Auth0：

```typescript
private auth0Config = {
  domain: 'your-auth0-domain',
  clientId: 'your-client-id',
  redirectUri: 'http://localhost:4200/callback'
};
```

## 路由说明

| 路径 | 说明 | 是否需要认证 |
|------|------|-------------|
| `/login` | 登录页面 | 否 |
| `/callback` | Auth0 回调 | 否 |
| `/dashboard` | 仪表盘 | 是 |
| `/channels` | 频道管理 | 是 |
| `/system` | 系统监控 | 是 |
| `/settings` | 设置管理 | 是 |
| `/player/:channelId` | 播放器 | 是 |
| `/embed/:channelId` | 嵌入播放器 | 否 |
| `/oembed` | OEmbed 端点 | 否 |

## OEmbed 端点

### JSON 格式

```
GET /oembed?format=json&url=http://your-domain/embed/1
```

### XML 格式

```
GET /oembed?format=xml&url=http://your-domain/embed/1
```

## 许可证

MIT License
