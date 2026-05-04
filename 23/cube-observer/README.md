# 3D立方体观察工具 - 四年级数学

一款面向小学四年级数学教育的交互式3D立方体观察工具，帮助学生直观地理解立方体的几何特性。

## 项目简介

本工具通过CSS 3D变换技术实现了可交互的立方体模型，学生可以通过鼠标拖动或触屏滑动来从不同角度观察立方体，理解立方体的面、边、顶点等几何概念。

## 项目结构

```
cube-observer/
├── src/
│   ├── app/
│   │   ├── app-module.ts        # 应用主模块
│   │   ├── app-routing-module.ts # 路由模块
│   │   ├── app.ts                # 主组件逻辑
│   │   ├── app.html              # 主组件模板
│   │   ├── app.css               # 主组件样式
│   │   └── app.spec.ts           # 测试文件
│   ├── styles.css                # 全局样式
│   ├── main.ts                   # 应用入口
│   └── index.html                # HTML入口
├── tailwind.config.js            # Tailwind CSS配置
├── postcss.config.js             # PostCSS配置
├── angular.json                  # Angular配置
├── package.json                  # 项目依赖
├── tsconfig.json                 # TypeScript配置
└── README.md                     # 项目说明文档
```

## 技术栈

- **框架**: Angular 21.2
- **语言**: TypeScript
- **样式**: Tailwind CSS 3
- **UI组件库**: Angular Material 21
- **路由**: Angular Router
- **构建工具**: Angular CLI Application Builder

## 功能特性

### 🎮 交互功能
- **鼠标拖动**: 按住鼠标左键拖动即可旋转立方体
- **触屏支持**: 在手机/平板上用手指滑动旋转
- **快捷视角按钮**:
  - 重置视图 - 恢复初始观察角度
  - 前面 - 正前方视图
  - 上面 - 俯视图
  - 侧面 - 右侧视图

### 🎨 视觉设计
- 立方体六个面使用不同颜色区分：
  - 前面：红色
  - 后面：蓝色  
  - 右面：绿色
  - 左面：橙色
  - 上面：紫色
  - 底面：青色
- 每个面都有中文标签标识
- 柔和的渐变背景，适合小学生使用
- 响应式布局，适配各种设备

### 📚 教育内容
- 操作指南：详细说明如何使用工具
- 按钮功能说明：介绍每个按钮的作用
- 知识要点：立方体的6个面、12条边、8个顶点
- 思考题：引导学生观察和思考

## 如何启动项目

### 前置要求
- Node.js 18.x 或更高版本
- npm 包管理器

### 安装依赖

```bash
cd cube-observer
npm install
```

### 启动开发服务器

```bash
npm start
# 或
ng serve
```

启动后，在浏览器中访问 `http://localhost:4200/` 即可查看应用。

### 构建生产版本

```bash
npm run build
# 或
ng build
```

构建产物将输出到 `dist/` 目录。

### 运行测试

```bash
npm run test
# 或
ng test
```

## 开发说明

### 3D立方体实现原理
本项目使用纯CSS 3D变换实现立方体效果，不依赖任何3D库：
- `transform-style: preserve-3d` - 保持3D空间
- `perspective` - 透视效果
- `translateZ` - Z轴平移
- `rotateX/rotateY` - 旋转

### 响应式设计
- 使用Tailwind CSS的响应式类（如 `lg:grid-cols-3`）
- 适配移动端、平板和桌面设备
- 触屏事件支持

## License

MIT

## 贡献

欢迎提交Issue和Pull Request来改进这个教育工具！
