# 理财管家 - 个人理财管理应用

一个功能完整的纯前端个人理财管理网页应用，帮助用户管理收支、预算、投资和账单。

## 功能特性

### 1. 收支记录
- 详细的收入支出分类记录
- 支持按类型、分类、日期范围过滤
- 支持新增、编辑、删除交易记录
- 统计卡片展示总收入、总支出、净结余

### 2. 预算控制
- 月度预算设定
- 预算执行监控（进度条展示）
- 预算分类管理（新增、编辑、删除）
- 状态提醒（正常、已过半、需注意）

### 3. 投资跟踪
- 股票、基金、理财等投资组合管理
- 投资收益实时计算
- 投资详情查看
- 投资类型分类管理

### 4. 账单提醒
- 定期账单和还款提醒功能
- 到期日智能提醒（即将到期、已逾期等）
- 账单状态管理（待处理、已支付）
- 账单类型支持（每月、每季度、每年、一次性）

### 5. 财务报表
- 收支趋势分析图表
- 收入/支出分类饼图
- 月度收支对比柱状图
- 详细的收入/支出分类统计
- 财务健康状况评估

## 技术栈

- **框架**: Vue 3 (Composition API)
- **语言**: JavaScript
- **样式**: Tailwind CSS
- **UI 组件库**: PrimeVue
- **路由**: Vue Router
- **打包工具**: Vite
- **图表库**: Chart.js
- **图标**: PrimeIcons

## 项目结构

```
finance-manager/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── vue.svg
│   ├── components/
│   │   └── HelloWorld.vue
│   ├── data/
│   │   └── mockData.js          # Mock 数据
│   ├── router/
│   │   └── index.js             # 路由配置
│   ├── views/
│   │   ├── Dashboard.vue        # 仪表盘
│   │   ├── Transactions.vue     # 收支记录
│   │   ├── Budget.vue           # 预算控制
│   │   ├── Investments.vue      # 投资跟踪
│   │   ├── Bills.vue            # 账单提醒
│   │   └── Reports.vue          # 财务报表
│   ├── App.vue                   # 主应用组件
│   ├── main.js                   # 入口文件
│   └── style.css                 # 全局样式
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## 页面说明

| 页面 | 路由 | 功能描述 |
|------|------|----------|
| 仪表盘 | `/` | 财务概览、统计卡片、图表展示、待处理账单 |
| 收支记录 | `/transactions` | 交易记录管理、搜索过滤、新增/编辑/删除 |
| 预算控制 | `/budget` | 月度预算设定、进度监控、预算分类管理 |
| 投资跟踪 | `/investments` | 投资组合管理、收益计算、投资详情 |
| 账单提醒 | `/bills` | 账单管理、到期日提醒、状态管理 |
| 财务报表 | `/reports` | 收支分析图表、财务总结、健康评估 |

## 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装依赖

```bash
cd finance-manager
npm install
```

### 开发模式

```bash
npm run dev
```

启动后访问: http://localhost:5173

### 构建生产版本

```bash
npm run build
```

构建产物将生成在 `dist` 目录中。

### 预览生产版本

```bash
npm run preview
```

## 项目配置

### Tailwind CSS 配置

配置文件: `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Vite 配置

配置文件: `vite.config.js`

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
})
```

### 路由配置

配置文件: `src/router/index.js`

- 使用 `createWebHistory` 模式
- 支持路由守卫动态设置页面标题

## 使用的 PrimeVue 组件

- **Button**: 按钮组件
- **InputText**: 文本输入框
- **Dropdown**: 下拉选择框
- **Calendar**: 日历/日期选择器
- **DataTable**: 数据表格
- **Column**: 表格列
- **Dialog**: 对话框
- **InputNumber**: 数字输入框
- **Textarea**: 多行文本框
- **TabView/TabPanel**: 标签页
- **ProgressBar**: 进度条
- **Card**: 卡片组件
- **Chart**: 图表组件
- **Tag**: 标签组件
- **Badge**: 徽章组件
- **Toolbar**: 工具栏
- **Avatar**: 头像组件
- **Toast**: 消息提示
- **ConfirmDialog**: 确认对话框

## 数据说明

项目使用 Mock 数据进行演示，数据文件位于 `src/data/mockData.js`，包含：

- `transactions`: 交易记录数据
- `budgets`: 预算数据
- `investments`: 投资数据
- `bills`: 账单数据
- `categories`: 收支分类
- `investmentTypes`: 投资类型

在实际项目中，可以将 Mock 数据替换为真实的 API 调用。

## 开发说明

### 响应式设计

- 使用 Tailwind CSS 的响应式工具类
- 支持移动端、平板、桌面端多设备适配
- 侧边栏支持展开/收起

### 状态管理

- 使用 Vue 3 的 Composition API
- 使用 `ref` 和 `computed` 管理响应式状态
- 页面组件独立管理各自状态

### 组件通信

- 使用 Props 和 Events 进行父子组件通信
- 使用 Vue Router 进行页面间导航

## 后续优化建议

1. **数据持久化**: 接入后端 API 或使用 localStorage
2. **状态管理**: 引入 Pinia 进行全局状态管理
3. **数据导入导出**: 支持 Excel/CSV 导入导出
4. **多语言支持**: 国际化 (i18n)
5. **主题切换**: 支持亮色/暗色主题
6. **数据可视化**: 更多图表类型和自定义报表
7. **预算提醒**: 邮件/短信通知功能

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！
