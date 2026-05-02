# 化学分子结构模拟器

一个交互式的化学分子结构模拟器，使用Angular框架开发，支持分子键的振动和旋转动画展示，提供响应式布局、工具栏和属性面板。

## 功能特性

- 🧪 **多种预设分子**：包含水(H₂O)、甲烷(CH₄)、二氧化碳(CO₂)、氨(NH₃)等常见分子
- 🔄 **3D旋转动画**：支持自动旋转和手动拖拽旋转
- 🔊 **化学键振动**：模拟化学键的振动效果
- 🎛️ **精细控制**：可调节振动速度、旋转速度、振动幅度
- 📊 **属性面板**：查看分子、原子、化学键的详细信息
- 📱 **响应式布局**：适配桌面端和移动端

## 技术栈

- **框架**: Angular 21+
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **UI组件库**: Angular Material
- **路由**: Angular Router
- **打包工具**: Angular CLI Application Builder

## 项目结构

```
chemical-molecule-simulator/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── toolbar/                    # 工具栏组件
│   │   │   │   ├── toolbar.component.ts
│   │   │   │   ├── toolbar.component.html
│   │   │   │   └── toolbar.component.css
│   │   │   ├── molecule-viewer/            # 分子可视化组件
│   │   │   │   ├── molecule-viewer.component.ts
│   │   │   │   ├── molecule-viewer.component.html
│   │   │   │   └── molecule-viewer.component.css
│   │   │   └── properties-panel/           # 属性面板组件
│   │   │       ├── properties-panel.component.ts
│   │   │       ├── properties-panel.component.html
│   │   │       └── properties-panel.component.css
│   │   ├── models/
│   │   │   ├── atom.model.ts               # 原子模型
│   │   │   ├── bond.model.ts               # 化学键模型
│   │   │   └── molecule.model.ts           # 分子模型及预设数据
│   │   ├── services/
│   │   │   └── animation.service.ts        # 动画控制服务
│   │   ├── app-module.ts                   # 应用模块
│   │   ├── app-routing-module.ts           # 路由配置
│   │   ├── app.ts                          # 主应用组件
│   │   ├── app.html                        # 主应用模板
│   │   └── app.css                         # 主应用样式
│   ├── index.html                           # 入口HTML
│   ├── main.ts                              # 入口文件
│   └── styles.css                           # 全局样式
├── angular.json                             # Angular配置
├── package.json                             # 依赖配置
├── tailwind.config.js                       # Tailwind CSS配置
├── postcss.config.js                        # PostCSS配置
└── README.md                                # 项目文档
```

## 快速开始

### 环境要求

- Node.js 18+ 
- npm 9+
- Angular CLI 21+

### 安装依赖

```bash
cd chemical-molecule-simulator
npm install
```

### 启动开发服务器

```bash
ng serve
```

启动后，在浏览器中打开 `http://localhost:4200` 即可访问应用。

### 构建生产版本

```bash
ng build
```

构建产物将输出到 `dist/` 目录。

## 使用说明

### 工具栏功能

- **选择分子**：从下拉菜单中选择不同的预设分子
- **播放/暂停**：控制动画的播放和暂停
- **重置**：将分子恢复到初始状态
- **振动**：开启/关闭化学键振动动画
- **旋转**：开启/关闭分子自动旋转

### 动画控制

在属性面板的"动画控制"部分可以调节：

- **振动速度**：调整化学键振动的频率（0.1 - 3.0）
- **旋转速度**：调整分子自动旋转的速度（0.1 - 3.0）
- **振动幅度**：调整化学键振动的幅度（1 - 15）

### 手动旋转

在分子可视化区域按住鼠标左键并拖拽，可以手动旋转分子从不同角度观察。

### 查看详细信息

属性面板提供以下信息：

- **分子信息**：名称、分子式、描述、原子数量、化学键数量
- **原子列表**：查看所有原子的详细信息
- **化学键列表**：查看所有化学键的详细信息
- **选中原子详情**：选中原子后显示完整属性

## 预设分子

| 分子名称 | 分子式 | 描述 |
|---------|--------|------|
| 水 | H₂O | 由两个氢原子和一个氧原子组成 |
| 甲烷 | CH₄ | 由一个碳原子和四个氢原子组成 |
| 二氧化碳 | CO₂ | 线性分子，碳原子在中心 |
| 氨 | NH₃ | 三角锥形结构 |

## 开发说明

### 添加新的预设分子

在 `src/app/models/molecule.model.ts` 中的 `PRESET_MOLECULES` 数组添加新的分子定义。

### 自定义动画参数

在 `src/app/services/animation.service.ts` 中可以调整默认动画参数和物理模型。

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！
