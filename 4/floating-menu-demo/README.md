# 浮窗菜单演示 (Floating Menu Demo)

一个基于 Angular 框架的浮窗菜单演示项目，支持可拖拽浮动按钮、菜单弹窗、主题颜色切换和响应式布局。

## 项目结构

```
floating-menu-demo/
├── src/
│   ├── app/
│   │   ├── app.ts                 # 主应用组件
│   │   ├── app.html               # 主应用模板
│   │   ├── app.css                # 主应用样式
│   │   ├── app-module.ts          # 应用模块
│   │   ├── app-routing-module.ts  # 路由模块
│   │   ├── app.spec.ts            # 测试文件
│   │   └── components/
│   │       └── floating-menu/
│   │           ├── floating-menu.component.ts    # 浮窗菜单组件逻辑
│   │           ├── floating-menu.component.html  # 浮窗菜单组件模板
│   │           └── floating-menu.component.css   # 浮窗菜单组件样式
│   ├── index.html                 # HTML 入口文件
│   ├── main.ts                    # Angular 启动文件
│   └── styles.css                 # 全局样式
├── angular.json                    # Angular CLI 配置文件
├── package.json                    # 项目依赖配置
├── tailwind.config.js              # Tailwind CSS 配置文件
└── tsconfig.json                   # TypeScript 配置文件
```

## 技术栈

- **框架**: Angular 21.2.8
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **UI 组件库**: Angular Material
- **路由**: Angular Router
- **打包工具**: Angular CLI (application builder)

### 主要依赖

- `@angular/core` - Angular 核心模块
- `@angular/material` - Angular Material UI 组件库
- `@angular/cdk` - Angular 组件开发工具包
- `tailwindcss` - Tailwind CSS 框架
- `rxjs` - 响应式编程库

## 功能特性

1. **可拖拽浮动按钮**
   - 支持鼠标拖拽移动位置
   - 支持触摸设备拖拽
   - 拖拽时显示视觉反馈

2. **按钮大小调节**
   - 悬停显示调整手柄
   - 拖拽手柄调整按钮大小
   - 通过滑块精确调节（40px - 120px）

3. **菜单弹窗**
   - 点击按钮打开/关闭菜单
   - 包含"处理中心"、"我的工作台"、"资源管理"三个菜单项
   - 点击菜单项显示提示并关闭菜单

4. **主题颜色切换**
   - 10 种预设颜色可选
   - 支持自定义颜色选择器
   - CSS 变量动态注入（`--themeColor`、`--shadowColor`）
   - 颜色应用于按钮、菜单和阴影

5. **自动关闭**
   - 点击页面空白处关闭菜单
   - 鼠标离开菜单时关闭菜单
   - 关闭时按钮位置恢复

6. **响应式布局**
   - 窗口大小变化时自适应
   - 移动端适配

## 启动项目

### 安装依赖

```bash
cd floating-menu-demo
npm install
```

### 开发模式启动

```bash
npm run dev
# 或
ng serve
```

访问 `http://localhost:4200/` 查看应用。

### 生产构建

```bash
npm run build
# 或
ng build
```

构建产物将输出到 `dist/` 目录。

### 运行测试

```bash
npm test
# 或
ng test
```

## 使用说明

1. **移动按钮**: 按住浮动按钮并拖拽到目标位置
2. **调整大小**: 悬停按钮，左上角出现小圆点，拖拽调整大小
3. **打开菜单**: 点击浮动按钮打开菜单
4. **选择颜色**: 在菜单的颜色选择器中选择喜欢的颜色
5. **关闭菜单**: 点击页面空白处或鼠标离开菜单

## 浏览器兼容性

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 许可证

MIT License
