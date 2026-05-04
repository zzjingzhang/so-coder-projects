# 员工签到系统

一个基于 Vue 3 + Vite 的员工签到管理系统，支持 Excel 导入、请假管理、签到统计等功能。

## 项目结构

```
employee-attendance-system/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── vite.svg
│   │   └── vue.svg
│   ├── router/
│   │   └── index.js          # 路由配置
│   ├── store/
│   │   └── data.js             # 数据存储和工具函数
│   ├── views/
│   │   ├── Home.vue            # 主页面
│   │   ├── EmployeeInfo.vue    # 员工信息管理页面
│   │   ├── LeaveManagement.vue  # 请假人员管理页面
│   │   ├── Attendance.vue        # 签到管理页面
│   │   └── Summary.vue         # 数据汇总页面
│   ├── App.vue                 # 根组件
│   ├── main.js                 # 入口文件
│   └── style.css               # 全局样式
├── index.html                  # HTML 入口
├── package.json                # 依赖配置
├── vite.config.js              # Vite 配置
├── tailwind.config.js          # Tailwind CSS 配置
└── postcss.config.js           # PostCSS 配置
```

## 技术栈

- **框架**: Vue 3 (Composition API)
- **语言**: JavaScript
- **样式**: Tailwind CSS 4
- **UI 组件库**: Naive UI
- **路由**: Vue Router 4
- **打包工具**: Vite 6
- **Excel 处理**: xlsx (SheetJS)

## 功能模块

### 1. 主页面
- 员工信息按钮
- 请假人员按钮
- 签到按钮
- 汇总按钮
- 一键清除按钮（需输入密码：2816M）

### 2. 员工信息管理
- 通过 Excel 文件导入员工信息
- Excel 格式要求：
  - 表头列：工号、姓名、年级、职位
  - 年级可选值：高一、高二、高三
  - 职位可选值：班主任、副班主任、中层领导、其他职位
- 表格形式展示所有员工信息

### 3. 请假人员管理
- 输入工号查询员工信息
- 确认后标记为请假状态
- 可取消请假状态

### 4. 签到管理
- 选择签到对象（年级、职位筛选）
- 批量粘贴工号（用"."分隔）
- 自动计算签到、未签到、请假统计
- 显示未签到人员名单
- 一键复制未签到名单
- 请假人员不参与签到，但会在汇总时计算

### 5. 数据汇总
- 显示所有员工的签到统计
- 包含：工号、姓名、年级、职务、成功签到次数、未签到次数、请假次数
- 支持按年级、职位筛选
- 一键清除所有数据（需输入密码：2816M）

## 安装和运行

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

项目启动后，访问 http://localhost:5173

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 数据存储

数据使用浏览器的 localStorage 进行本地存储，包括：

- `employees`: 员工基本信息
- `summary`: 员工签到汇总数据

## Excel 导入示例

准备一个 Excel 文件，第一行为表头：

| 工号 | 姓名 | 年级 | 职位 |
|------|------|------|------|
| 001 | 张三 | 高一 | 班主任 |
| 002 | 李四 | 高二 | 副班主任 |
| 003 | 王五 | 高三 | 中层领导 |
| 004 | 赵六 | 高一 | 其他职位 |

保存为 `.xlsx` 或 `.xls` 格式即可导入。

## 页面设计规范

- 所有按钮文字水平垂直居中
- 文字显示完整清晰
- 色彩搭配合理美观
- 响应式设计，适配不同屏幕尺寸

## 注意事项

1. 清除数据需要输入密码：`2816M`
2. Excel 文件必须包含"工号"和"姓名"列
3. 签到时工号之间用英文句号"."分隔
4. 数据存储在浏览器 localStorage 中，清除浏览器缓存会丢失数据
