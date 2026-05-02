# Excel分组列头演示项目

一个基于React的GridControl组件，实现类似Excel的分组列头功能，支持多级嵌套列头和Excel导出。

## 功能特性

- ✅ 支持多级分组列头（类似Excel的合并单元格）
- ✅ 支持自定义列宽
- ✅ 支持自定义渲染函数
- ✅ 导出Excel时保持分组列头结构
- ✅ 使用Excel的合并单元格功能实现相同的展示效果

## 技术栈

- **框架**: React 19
- **语言**: JavaScript
- **样式**: Tailwind CSS 4
- **UI组件库**: Chakra UI 3
- **路由**: React Router 7
- **打包工具**: Vite 8
- **Excel导出**: xlsx (SheetJS)

## 项目结构

```
excel-grouped-header-grid/
├── src/
│   ├── components/
│   │   └── GridControl.jsx       # 分组列头表格组件
│   ├── pages/
│   │   └── Home.jsx              # 主页面（演示页面）
│   ├── utils/
│   │   └── exportExcel.js        # Excel导出工具函数
│   ├── App.jsx                    # 应用入口（路由配置）
│   ├── App.css                    # 应用样式
│   ├── main.jsx                   # 主入口文件
│   └── index.css                  # 全局样式（Tailwind）
├── index.html                     # HTML模板
├── package.json                   # 依赖配置
├── vite.config.js                 # Vite配置
├── tailwind.config.js             # Tailwind配置
├── postcss.config.js              # PostCSS配置
└── README.md                      # 项目说明文档
```

## 组件API

### GridControl组件

| 属性 | 类型 | 说明 |
|------|------|------|
| columns | Array | 列定义数组 |
| data | Array | 表格数据数组 |
| className | string | 自定义类名 |

### 列定义格式

```javascript
const columns = [
  // 普通列
  { title: '序号', key: 'id', width: 80 },
  
  // 分组列（包含子列）
  {
    title: '个人信息',
    children: [
      { title: '姓名', key: 'name', width: 100 },
      { 
        title: '联系方式',
        children: [
          { title: '电话', key: 'phone', width: 140 },
          { title: '邮箱', key: 'email', width: 200 }
        ]
      }
    ]
  }
]
```

### 列配置属性

| 属性 | 类型 | 说明 |
|------|------|------|
| title | string | 列标题 |
| key | string | 数据键名（叶子节点必需） |
| width | number | 列宽（像素） |
| children | Array | 子列数组（分组列必需） |
| render | Function | 自定义渲染函数 (value, row, index) => ReactNode |

### 导出函数

```javascript
import { exportToExcel } from './utils/exportExcel'

exportToExcel(columns, data, fileName)
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

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

## 使用示例

```javascript
import GridControl from './components/GridControl'
import { exportToExcel } from './utils/exportExcel'

const columns = [
  { title: '序号', key: 'id', width: 80 },
  {
    title: '个人信息',
    children: [
      { title: '姓名', key: 'name', width: 100 },
      { title: '年龄', key: 'age', width: 80 }
    ]
  }
]

const data = [
  { id: 1, name: '张三', age: 28 },
  { id: 2, name: '李四', age: 32 }
]

// 渲染表格
<GridControl columns={columns} data={data} />

// 导出Excel
exportToExcel(columns, data, '导出数据.xlsx')
```

## 导出效果

导出的Excel文件将：
1. 保持网页中的分组列头结构
2. 使用Excel的"合并单元格"功能实现相同的视觉效果
3. 自动设置列宽
4. 支持多级嵌套分组

## 许可证

MIT
