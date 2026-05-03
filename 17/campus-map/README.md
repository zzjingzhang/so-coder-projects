# 校园地图系统 (Campus Map System)

一个功能丰富的交互式校园地图应用，使用 React + TypeScript + Tailwind CSS 构建。

## 功能特性

- 📍 **建筑标记** - 清晰标记校园内所有建筑物，支持鼠标悬停和点击查看详情
- 🎨 **颜色编码** - 不同类型建筑使用不同颜色标识，便于区分
- 🗺️ **动画路线** - 预设常用导航路线，带有流动动画效果
- 🔍 **缩放/平移** - 支持鼠标滚轮缩放、按钮缩放、拖拽平移
- 🏷️ **图例说明** - 左侧面板显示建筑类型图例和导航路线选择
- 💡 **信息弹窗** - 点击建筑显示详细信息弹窗

## 技术栈

- **框架**: React 19
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **UI 组件**: shadcn/ui (Button 组件)
- **路由**: React Router v6
- **打包工具**: Vite 5
- **图标**: Lucide React

## 项目结构

```
campus-map/
├── src/
│   ├── components/           # 组件目录
│   │   ├── ui/              # shadcn/ui 基础组件
│   │   │   └── button.tsx
│   │   ├── BuildingLegend.tsx      # 建筑类型图例组件
│   │   ├── BuildingMarker.tsx      # 建筑标记组件
│   │   ├── MapControls.tsx         # 地图控制组件
│   │   ├── RouteAnimator.tsx       # 路线动画组件
│   │   └── RouteSelector.tsx       # 路线选择组件
│   ├── data/               # 数据目录
│   │   ├── buildings.ts    # 建筑数据
│   │   └── routes.ts       # 路线数据
│   ├── lib/               # 工具库
│   │   └── utils.ts        # 工具函数 (cn)
│   ├── pages/             # 页面组件
│   │   └── MapPage.tsx     # 地图主页面
│   ├── types/             # 类型定义
│   │   └── index.ts        # 类型定义和常量
│   ├── App.tsx            # 应用入口组件
│   ├── main.tsx           # 应用入口文件
│   └── index.css          # 全局样式
├── index.html             # HTML 模板
├── package.json           # 依赖配置
├── tsconfig.json          # TypeScript 配置
├── tsconfig.app.json      # TypeScript 应用配置
├── tsconfig.node.json     # TypeScript Node 配置
├── vite.config.ts         # Vite 配置
└── tailwind.config.js     # Tailwind CSS 配置
```

## 建筑类型说明

| 颜色 | 类型 | 说明 |
|------|------|------|
| 🔵 蓝色 | 教学楼 | 教学、实验、研讨空间 |
| 🟢 绿色 | 宿舍楼 | 学生住宿区域 |
| 🟡 黄色 | 图书馆 | 藏书、阅读、自习 |
| 🔴 红色 | 体育馆 | 运动、健身、比赛 |
| 🟣 紫色 | 行政楼 | 行政办公、手续办理 |
| 🩷 粉色 | 食堂 | 餐饮服务 |

## 安装与运行

### 环境要求

- Node.js >= 18
- npm >= 9

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

启动后访问 http://localhost:5173

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist/` 目录。

### 预览生产版本

```bash
npm run preview
```

## 使用说明

### 缩放操作

- **鼠标滚轮**: 在地图区域滚动鼠标滚轮进行缩放
- **放大按钮**: 点击右侧工具栏的放大按钮 (+)
- **缩小按钮**: 点击右侧工具栏的缩小按钮 (-)
- **缩放范围**: 50% - 200%

### 平移操作

- **鼠标拖拽**: 在地图空白区域按住鼠标左键并拖动
- **重置视图**: 点击右侧工具栏的重置按钮，恢复初始视图

### 建筑交互

- **悬停预览**: 鼠标悬停在建筑上，底部显示建筑名称和简介
- **查看详情**: 点击任意建筑，弹出详情模态框
- **关闭弹窗**: 点击弹窗右上角 X 或底部关闭按钮

### 路线导航

- **选择路线**: 点击左侧面板中的导航路线
- **动画效果**: 选中路线后显示流动动画，标明起点和终点
- **取消选择**: 再次点击已选中的路线可取消显示

### 建筑筛选

- **类型筛选**: 点击左侧建筑类型图例，只显示对应类型的建筑
- **显示全部**: 选择"全部建筑"可显示所有建筑

## 自定义数据

### 添加/修改建筑

编辑 `src/data/buildings.ts` 文件：

```typescript
{
  id: 'unique-id',           // 唯一标识
  name: '建筑名称',           // 中文名称
  nameEn: 'Building Name',   // 英文名称
  category: 'academic',      // 类型: academic | dormitory | library | sports | admin | dining
  x: 400,                    // X 坐标
  y: 200,                    // Y 坐标
  width: 120,                // 宽度
  height: 80,                // 高度
  description: '建筑描述'     // 详细描述
}
```

### 添加/修改路线

编辑 `src/data/routes.ts` 文件：

```typescript
{
  id: 'route-id',            // 唯一标识
  name: '路线名称',           // 显示名称
  from: 'building-id-1',     // 起点建筑 ID
  to: 'building-id-2',       // 终点建筑 ID
  path: [                    // 路线坐标点数组
    { x: 100, y: 100 },
    { x: 200, y: 200 },
    // ...
  ],
  color: '#3b82f6'          // 路线颜色
}
```

## 开发说明

### 路径别名

项目已配置路径别名 `@` 指向 `src` 目录，可以这样导入：

```typescript
import { Button } from '@/components/ui/button'
import { buildings } from '@/data/buildings'
import type { Building } from '@/types'
```

### Tailwind CSS 自定义颜色

在 `tailwind.config.js` 中定义了建筑类型颜色：

```javascript
colors: {
  building: {
    academic: '#3b82f6',
    dormitory: '#10b981',
    library: '#f59e0b',
    sports: '#ef4444',
    admin: '#8b5cf6',
    dining: '#ec4899',
  },
}
```

### 动画效果

在 `src/index.css` 中定义了两种动画：

1. `animate-pulse-ring` - 建筑悬停时的脉冲扩散效果
2. `animated-path` - 路线的流动动画效果

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！
