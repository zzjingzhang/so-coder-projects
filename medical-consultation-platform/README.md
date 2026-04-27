# 智慧医疗 - 在线医疗咨询平台

一个专业的在线医疗咨询网页平台，提供医生预约、在线问诊、病历管理、药品信息、健康档案和紧急求助等功能。

## 项目简介

智慧医疗是一个纯前端的在线医疗咨询平台，采用现代化的医疗专业 UI 设计，提供便捷的在线医疗服务。平台支持医生预约挂号、视频/文字在线问诊、电子病历管理、药品查询、健康数据跟踪和紧急医疗求助等功能。

## 技术栈

- **前端框架**: React 19
- **构建工具**: Vite 8
- **路由管理**: React Router 7
- **样式方案**: Tailwind CSS 4
- **UI 组件**: 自定义 shadcn/ui 风格组件
- **图表库**: Recharts (用于健康趋势图表)
- **图标库**: Lucide React
- **编程语言**: JavaScript

## 项目结构

```
medical-consultation-platform/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── MainLayout.jsx    # 主布局组件
│   │   │   ├── Navbar.jsx        # 导航栏组件
│   │   │   └── Footer.jsx        # 页脚组件
│   │   └── ui/
│   │       ├── Avatar.jsx         # 头像组件
│   │       ├── Badge.jsx          # 徽章组件
│   │       ├── Button.jsx         # 按钮组件
│   │       ├── Card.jsx           # 卡片组件（含 CardHeader, CardContent, CardTitle）
│   │       ├── Input.jsx          # 输入框组件
│   │       ├── Loading.jsx        # 加载组件
│   │       ├── Modal.jsx          # 模态框组件
│   │       ├── Select.jsx         # 选择框组件
│   │       ├── Tabs.jsx           # 标签页组件
│   │       └── Textarea.jsx       # 文本域组件
│   ├── data/
│   │   └── mockData.js            # 模拟数据
│   ├── pages/
│   │   ├── AppointmentPage.jsx    # 医生预约页面
│   │   ├── ConsultationPage.jsx   # 在线问诊页面
│   │   ├── EmergencyPage.jsx      # 紧急求助页面
│   │   ├── HealthRecordsPage.jsx  # 健康档案页面
│   │   ├── HomePage.jsx           # 首页
│   │   ├── MedicalRecordsPage.jsx # 病历管理页面
│   │   └── MedicinesPage.jsx      # 药品信息页面
│   ├── types/
│   │   └── index.js               # 类型定义
│   ├── utils/
│   │   └── index.js               # 工具函数
│   ├── App.jsx                     # 主应用组件
│   ├── index.css                   # 全局样式
│   └── main.jsx                    # 入口文件
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
└── vite.config.js
```

## 功能模块

### 1. 医生预约
- 按科室和医生浏览
- 医生卡片布局展示
- 预约日期和时间选择
- 我的预约记录管理
- 预约状态追踪

### 2. 在线问诊
- 问诊列表展示
- 文字聊天功能
- 视频通话模拟
- 医生处方查看
- 历史问诊记录

### 3. 病历管理
- 病历列表展示
- 病历详情查看
- 按科室筛选
- 搜索功能
- 病历导出

### 4. 药品信息
- 药品列表展示
- 药品详情查看
- 按类别筛选
- 药品搜索
- 购物车功能
- 用药指导

### 5. 健康档案
- 健康概览
- 健康趋势图表（血压、血糖、心率、体重）
- 体检报告管理
- 详细健康档案
- 个人基本信息
- 过敏史和慢性病记录
- 家族病史

### 6. 紧急求助
- 紧急呼叫功能
- 附近医院推荐
- 医院详情查看
- 紧急联系人管理
- 个人健康信息展示

## 界面设计

- **医疗专业配色**: 使用蓝色为主色调，绿色为辅助色，营造专业、可靠的医疗氛围
- **响应式布局**: 支持桌面端、平板和移动端
- **卡片式设计**: 医生信息以卡片形式展示，直观清晰
- **数据可视化**: 使用 Recharts 展示健康趋势图和就诊记录图表
- **流畅动画**: 页面切换和交互元素的流畅动画效果

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

项目将在 `http://localhost:5173` 启动（端口可能会根据可用端口自动调整）。

### 构建生产版本

```bash
npm run build
```

构建产物将生成在 `dist` 目录。

### 预览生产版本

```bash
npm run preview
```

### 代码检查

```bash
npm run lint
```

## 页面路由

| 路由 | 页面 | 功能描述 |
|------|------|----------|
| `/` | 首页 | 健康概览、快捷操作、待处理预约、健康趋势、推荐医生 |
| `/appointment` | 医生预约 | 医生列表、预约挂号、我的预约记录 |
| `/consultation` | 在线问诊 | 问诊列表、聊天界面、视频通话 |
| `/medical-records` | 病历管理 | 病历列表、病历详情查看 |
| `/medicines` | 药品信息 | 药品列表、药品详情、购物车 |
| `/health-records` | 健康档案 | 健康概览、健康趋势、体检报告 |
| `/emergency` | 紧急求助 | 紧急呼叫、附近医院、紧急联系人 |

## 主要依赖

```json
{
  "react": "^19.2.5",
  "react-dom": "^19.2.5",
  "react-router-dom": "^7.14.2",
  "lucide-react": "^1.11.0",
  "recharts": "^3.8.1",
  "@radix-ui/react-slot": "^1.2.4",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "tailwind-merge": "^3.5.0"
}
```

## 开发依赖

```json
{
  "tailwindcss": "^4.2.4",
  "@tailwindcss/vite": "^0.6.14",
  "postcss": "^8.5.12",
  "autoprefixer": "^10.5.0",
  "vite": "^8.0.10",
  "@vitejs/plugin-react": "^6.0.1",
  "eslint": "^10.2.1"
}
```

## 注意事项

1. 本项目为纯前端演示项目，所有数据均为模拟数据
2. 视频通话功能为模拟效果，实际使用需要集成 WebRTC 等实时通信技术
3. 紧急呼叫功能为演示用途，实际紧急情况请拨打真实急救电话
4. 项目使用 Tailwind CSS v4，配置方式与 v3 有所不同

## 后续优化建议

1. 集成真实的后端 API
2. 添加用户认证和授权系统
3. 实现实时聊天功能（WebSocket）
4. 添加支付功能
5. 集成地图 API 实现医院导航
6. 添加推送通知功能
7. 实现多语言支持
8. 添加深色模式
9. 优化性能和代码分割

## 许可证

MIT License
