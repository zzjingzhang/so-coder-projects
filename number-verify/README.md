# NumberVerify - 电话号码验证 Web 应用

一个全功能的电话号码验证 Web 应用程序，提供实时验证、状态反馈和 API 文档展示。

## 功能特性

- 📱 **电话号码验证**：支持多个国家/地区的电话号码格式验证
- 🌍 **多国拨号代码**：支持全球 20+ 国家和地区的拨号代码选择
- ✨ **实时反馈**：提供有效、无效、警告三种状态的视觉反馈
- 🔔 **通知系统**：成功、警告、错误消息的 Toast 通知
- 📖 **API 文档**：开发者友好的 REST API 示例展示
- 🎯 **响应式布局**：适配桌面端、平板和移动端
- ⌨️ **键盘快捷键**：使用 Ctrl/Cmd + B 切换侧边栏
- 📦 **数据缓存**：内置缓存机制，避免重复请求
- 🎨 **深色模式**：支持亮色/深色主题切换

## 技术栈

- **框架**: React 18
- **语言**: JavaScript
- **样式**: Tailwind CSS
- **UI 组件库**: Chakra UI
- **路由**: React Router v6
- **构建工具**: Vite

## 项目结构

```
number-verify/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx          # 页眉组件
│   │   │   ├── Footer.jsx          # 页脚组件
│   │   │   └── Sidebar.jsx         # 响应式侧边栏组件
│   │   ├── ui/
│   │   │   ├── StatusIcon.jsx      # 状态图标组件
│   │   │   └── ResultCard.jsx      # 结果卡片组件
│   │   └── PhoneValidator.jsx      # 主验证器组件
│   ├── contexts/
│   │   └── NotificationContext.jsx # 通知上下文
│   ├── hooks/
│   │   ├── useViewport.js          # 视口检测 Hook
│   │   ├── useKeyboardShortcut.js  # 键盘快捷键 Hook
│   │   └── usePhoneVerification.js # 电话验证 Hook
│   ├── pages/
│   │   ├── Home.jsx                # 首页
│   │   └── NotFound.jsx            # 404 页面
│   ├── services/
│   │   └── mockApi.js              # 模拟 API 服务
│   ├── utils/
│   │   └── cache.js                # 缓存工具
│   ├── constants/
│   │   ├── countries.js            # 国家数据
│   │   └── status.js               # 状态常量
│   ├── router.jsx                  # 路由配置
│   ├── theme.js                    # Chakra UI 主题配置
│   ├── App.jsx                     # 主应用组件
│   ├── main.jsx                    # 应用入口
│   └── index.css                   # 全局样式
├── index.html                      # HTML 模板
├── package.json                    # 依赖配置
├── vite.config.js                  # Vite 配置
├── tailwind.config.js              # Tailwind CSS 配置
└── postcss.config.js               # PostCSS 配置
```

## 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装依赖

```bash
cd number-verify
npm install
```

### 启动开发服务器

```bash
npm run dev
```

应用将在 `http://localhost:5173` 启动。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 预览生产构建

```bash
npm run preview
```

## 核心组件说明

### PhoneValidator

主要的电话号码验证组件，包含：

- 国家/地区选择器
- 电话号码输入框
- 快速测试标签
- 验证结果展示
- 验证历史记录
- API 文档选项卡

### Sidebar

响应式侧边栏组件：

- 桌面端：可折叠侧边栏（Ctrl/Cmd + B 切换）
- 移动端：抽屉式菜单
- 支持导航项高亮

### StatusIcon

状态图标组件，根据验证状态显示不同图标：

- `valid`：绿色勾选图标
- `invalid`：红色关闭图标
- `warning`：黄色警告图标
- `pending`：加载动画
- `idle`：默认信息图标

### ResultCard

结果展示卡片，包含：

- 状态徽章和图标
- 号码信息
- 运营商和归属地
- 应答可能性进度条
- 所有者信息（可选）
- 验证时间戳

## 自定义颜色

项目定义了三种状态的颜色变量：

### 有效状态 (Valid)
- `valid-50`: `#f0fdf4`
- `valid-100`: `#dcfce7`
- `valid-500`: `#22c55e` (主色)
- `valid-700`: `#15803d`

### 无效状态 (Invalid)
- `invalid-50`: `#fef2f2`
- `invalid-100`: `#fee2e2`
- `invalid-500`: `#ef4444` (主色)
- `invalid-700`: `#b91c1c`

### 警告状态 (Warning)
- `warning-50`: `#fffbeb`
- `warning-100`: `#fef3c7`
- `warning-500`: `#eab308` (主色)
- `warning-700`: `#a16207`

## 模拟数据

当前使用模拟 API 服务，验证逻辑如下：

- **有效号码**：以 2-9、6-8 结尾的号码
- **警告号码**：以 4 结尾或 99 结尾的号码
- **无效号码**：以 0 或 1 结尾的号码

### 测试号码示例

- 有效号码：`13800138000` (以 0 结尾，实际逻辑中会被标记为无效，测试请用 `13800138002`)
- 警告号码：`13800138004`
- 无效号码：`13800138000` 或 `13800138001`

## 键盘快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl/Cmd + B` | 切换侧边栏 |

## 数据缓存

项目实现了简单的内存缓存机制：

- 默认 TTL：5 分钟
- 缓存键格式：`verify:{countryCode}:{phoneNumber}`
- 支持手动清除缓存

## 未来扩展

1. **真实 API 集成**：将 `mockApi.js` 替换为实际的电话验证 API
2. **批量验证**：支持一次验证多个电话号码
3. **历史记录导出**：支持导出验证历史为 CSV/Excel
4. **用户系统**：添加登录、注册、保存历史等功能
5. **更多国家**：扩展国家拨号代码列表

## License

MIT
