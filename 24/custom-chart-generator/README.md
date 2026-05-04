# 自定义图表生成器

一个功能强大的自定义图表生成器，用户可以通过直观的界面选择数据列和图表类型，实时预览生成的图表。

## 功能特性

- **多种图表类型**：支持折线图、柱状图、散点图三种常用图表类型
- **实时预览**：配置修改后立即预览图表效果
- **灵活配置**：可选择 X 轴和 Y 轴数据列，支持多选 Y 轴
- **美观界面**：使用现代化的 UI 设计，响应式布局适配不同屏幕尺寸
- **交互友好**：支持显示/隐藏图例和网格线，自定义图表标题

## 技术栈

- **前端框架**：React 19
- **构建工具**：Vite 8
- **UI 组件库**：Chakra UI 3
- **样式方案**：Tailwind CSS 4
- **路由管理**：React Router 7
- **图表库**：Recharts 3

## 项目结构

```
custom-chart-generator/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components/
│   │   ├── ui/
│   │   │   └── provider.jsx          # Chakra UI 提供者组件
│   │   ├── ChartConfigForm.jsx       # 图表配置表单组件
│   │   └── ChartPreview.jsx          # 图表预览组件
│   ├── data/
│   │   └── sampleData.js              # 示例数据
│   ├── pages/
│   │   └── ChartGenerator.jsx         # 主页面组件
│   ├── App.css
│   ├── App.jsx                         # 主应用组件
│   ├── index.css                       # 全局样式
│   └── main.jsx                        # 应用入口
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js                   # PostCSS 配置
├── README.md                           # 项目说明文档
├── tailwind.config.js                  # Tailwind CSS 配置
└── vite.config.js                      # Vite 配置
```

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

启动后，在浏览器中访问 `http://localhost:5173` 即可查看应用。

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 使用说明

1. **选择图表类型**：从下拉菜单中选择折线图、柱状图或散点图
2. **配置数据列**：
   - 选择 X 轴数据列（如"月份"）
   - 选择一个或多个 Y 轴数据列（如"销售额"、"收入"等）
3. **自定义图表**：
   - 输入图表标题
   - 选择是否显示图例和网格线
4. **实时预览**：所有配置更改都会立即反映在右侧的图表预览中
5. **重置配置**：点击"重置配置"按钮恢复到默认设置

## 示例数据

项目包含以下示例数据列：

- **月份**（分类数据）：一月、二月、三月、四月、五月、六月、七月
- **销售额**（数值数据）：各月销售数据
- **收入**（数值数据）：各月收入数据
- **客户数**（数值数据）：各月客户数量
- **利润**（数值数据）：各月利润数据

## 开发说明

### 添加新数据

如需添加新的示例数据，可编辑 `src/data/sampleData.js` 文件：

```javascript
export const sampleData = [
  // 添加新的数据对象
]

export const dataColumns = [
  // 添加新的数据列定义
]
```

### 自定义样式

- 使用 Tailwind CSS 类名进行样式开发
- 全局样式定义在 `src/index.css` 中
- Chakra UI 组件使用内置的样式系统

## 浏览器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 许可证

MIT License

## 联系方式

如有问题或建议，请提交 Issue 或 Pull Request。
