# 音乐会在线票务系统

一个功能完整的音乐会在线票务系统，具备动态活动日历、动画座位图和可折叠票务选项。

## 技术栈

- **前端框架**: React 19
- **编程语言**: TypeScript
- **样式框架**: Tailwind CSS 4
- **UI 组件库**: PrimeReact 10
- **路由管理**: React Router 7
- **打包工具**: Vite 8

## 项目结构

```
concert-ticketing-system/
├── public/                     # 静态资源目录
├── src/
│   ├── components/            # 公共组件
│   │   ├── Footer.tsx         # 页脚组件
│   │   └── Header.tsx         # 头部导航组件
│   ├── data/                  # 数据层
│   │   └── mockData.ts        # 模拟数据
│   ├── pages/                 # 页面组件
│   │   ├── BookingPage.tsx    # 订票页面（座位图+票务选项）
│   │   ├── EventDetailPage.tsx # 演出详情页面
│   │   └── HomePage.tsx       # 首页
│   ├── App.tsx                 # 主应用组件
│   ├── index.css               # 全局样式
│   └── main.tsx                # 入口文件
├── index.html                  # HTML 模板
├── package.json                # 依赖配置
├── tsconfig.json               # TypeScript 配置
├── tsconfig.app.json           # 应用 TypeScript 配置
├── tsconfig.node.json          # Node TypeScript 配置
└── vite.config.ts              # Vite 配置
```

## 主要功能

### 1. 动态活动日历
- 使用 PrimeReact Calendar 组件实现交互式日历
- 日历中标记有演出活动的日期
- 选择日期后显示当天的演出列表
- 支持月份切换和日期导航

### 2. 动画座位图
- 可视化座位图展示，按行分组显示
- 不同价格区间的座位用不同颜色区分
- 座位状态：可选（彩色）、已售（灰色）、已选（绿色）
- 座位选择动画效果
- 支持多选和取消选择
- 座位图支持水平滚动

### 3. 可折叠票务选项
- 使用 PrimeReact Accordion 组件实现可折叠面板
- 按价格区间分组显示票务选项
- 每个票型包含：名称、描述、价格、权益列表
- 支持票型选择和切换
- 默认选中第一个票型

### 4. 完整的页面流程
- **首页**: Hero 区域、动态活动日历、即将上演列表、服务特色
- **演出详情页**: 演出信息、票价详情、场馆信息、相关演出推荐
- **订票页**: 座位图选择、可折叠票务选项、订单摘要

## 安装与运行

### 环境要求
- Node.js >= 18.0.0
- npm >= 9.0.0 或 yarn >= 1.22.0

### 安装依赖

```bash
cd concert-ticketing-system
npm install
```

### 开发模式运行

```bash
npm run dev
```

项目将在 `http://localhost:5173` 启动。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 预览生产版本

```bash
npm run preview
```

### 代码检查

```bash
npm run lint
```

## 页面路由

| 路由路径 | 页面名称 | 说明 |
|---------|---------|------|
| `/` | 首页 | 展示活动日历和热门演出 |
| `/event/:id` | 演出详情页 | 展示演出详细信息 |
| `/booking/:eventId` | 订票页 | 选择座位和票型 |

## 样式设计

### 主题色
- **主色 (Primary)**: `#6366f1` (靛蓝色)
- **主色深色**: `#4f46e5`
- **次色 (Secondary)**: `#10b981` (绿色)
- **强调色 (Accent)**: `#f59e0b` (琥珀色)

### 排版
- 使用 Inter 字体栈
- 响应式字体大小
- 清晰的层级结构

### 动画效果
- 页面加载淡入动画
- 座位选择缩放动画
- 悬停效果和过渡动画
- 卡片悬浮效果

## 组件说明

### 公共组件
- **Header**: 响应式导航栏，支持移动端菜单
- **Footer**: 页脚信息，包含快速链接和联系方式

### 页面组件
- **HomePage**: 首页，包含动态活动日历和演出列表
- **EventDetailPage**: 演出详情页，使用 TabView 组件展示多标签内容
- **BookingPage**: 订票页，包含以下子组件：
  - **SeatMap**: 座位图组件
  - **TicketOptions**: 可折叠票务选项组件
  - **BookingSummary**: 订单摘要组件

## 数据模型

### ConcertEvent (音乐会活动)
```typescript
interface ConcertEvent {
  id: string
  title: string
  artist: string
  date: Date
  time: string
  venue: string
  address: string
  image: string
  description: string
  priceRanges: PriceRange[]
  totalSeats: number
  availableSeats: number
}
```

### PriceRange (价格区间)
```typescript
interface PriceRange {
  id: string
  name: string
  price: number
  color: string
  count: number
  available: number
}
```

### Seat (座位)
```typescript
interface Seat {
  id: string
  row: string
  number: number
  priceRangeId: string
  status: 'available' | 'sold' | 'selected'
}
```

### TicketOption (票务选项)
```typescript
interface TicketOption {
  id: string
  name: string
  description: string
  price: number
  priceRangeId: string
  features: string[]
  isDefault: boolean
}
```

## 开发说明

### 模拟数据
项目使用 `src/data/mockData.ts` 中的模拟数据，包含：
- 4 个音乐会活动
- 每个活动有多个价格区间
- 动态生成的座位数据
- 多种票务选项

### 响应式设计
- 移动优先设计
- 支持多种屏幕尺寸
- 适配移动端、平板和桌面端

### 性能优化
- 使用 `useMemo` 缓存计算结果
- 组件按需加载
- 动画使用 CSS 而非 JavaScript

## 注意事项

1. 项目使用 Tailwind CSS 4 的新语法（`@import "tailwindcss"`）
2. PrimeReact 组件需要正确导入样式
3. 图片资源使用动态生成的 API，可能需要网络连接
4. 座位数据每次刷新会重新生成（随机售出）

## 后续优化建议

- [ ] 接入真实后端 API
- [ ] 实现用户登录和个人中心
- [ ] 添加支付功能
- [ ] 实现订单管理
- [ ] 添加搜索和筛选功能
- [ ] 优化移动端体验
- [ ] 添加测试用例
- [ ] 国际化支持
- [ ] 深色模式
- [ ] 座位图缩放功能

## 许可证

MIT License
