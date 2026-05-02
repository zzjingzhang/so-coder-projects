# IDE Portfolio - 个人作品集网站

一个类似 IDE 风格的个人作品集网站，展示简历、技能、项目等内容，并支持终端交互和词法分析器生成器（LAG）。

## ✨ 功能特性

- 📁 **左侧文件导航** - 像 IDE 一样浏览作品集内容
- 🏷️ **页面标签** - 支持多标签页浏览
- ⌨️ **交互式终端** - 支持 `ls`、`cd`、`open`、`clear`、`history`、`help` 等命令
- 📱 **响应式布局** - 移动端通过下拉菜单访问导航
- ⚙️ **词法分析器生成器 (LAG)** - 自定义词法规则，生成词法分析器
- 🎨 **深色主题** - VS Code 风格的深色主题

## 🛠️ 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue.js | 3.x | 前端框架 |
| TypeScript | 6.x | 类型安全 |
| Vite | 8.x | 构建工具 |
| Tailwind CSS | 4.x | 样式框架 |
| Ant Design Vue | 4.x | UI 组件库 |
| Vue Router | 4.x | 路由管理 |

## 📁 项目结构

```
ide-portfolio/
├── public/                    # 静态资源
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/               # 资源文件
│   ├── components/           # 组件
│   ├── data/                 # 模拟数据
│   │   └── mockData.ts       # 项目数据、技能数据等
│   ├── router/               # 路由配置
│   │   └── index.ts
│   ├── types/                # 类型定义
│   │   └── index.ts
│   ├── utils/                # 工具函数
│   │   ├── terminalCommands.ts  # 终端命令解析器
│   │   └── lexerGenerator.ts    # 词法分析器生成器
│   ├── views/                # 视图组件
│   │   ├── HomeView.vue      # 首页
│   │   ├── ResumeView.vue    # 简历页面
│   │   ├── SkillsView.vue    # 技能页面
│   │   ├── ProjectsView.vue  # 项目页面
│   │   ├── ContactView.vue   # 联系页面
│   │   └── LAGView.vue       # 词法分析器生成器
│   ├── App.vue               # 主应用组件
│   ├── main.ts               # 入口文件
│   └── style.css             # 全局样式
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── tailwind.config.js
└── postcss.config.js
```

## 🚀 快速开始

### 安装依赖

```bash
cd ide-portfolio
npm install
```

### 开发模式

```bash
npm run dev
```

打开浏览器访问 `http://localhost:5173`

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## ⌨️ 终端命令

终端支持以下命令：

| 命令 | 说明 | 示例 |
|------|------|------|
| `ls` | 列出目录内容 | `ls` |
| `cd` | 切换目录 | `cd src`, `cd ..` |
| `open` | 打开文件 | `open README.md` |
| `clear` | 清空终端 | `clear` |
| `history` | 显示命令历史 | `history` |
| `help` | 显示帮助信息 | `help` |
| `pwd` | 显示当前路径 | `pwd` |
| `whoami` | 显示当前用户 | `whoami` |
| `date` | 显示当前日期 | `date` |
| `echo` | 输出文本 | `echo Hello` |
| `lag` | 显示 LAG 项目信息 | `lag` |

## ⚙️ 词法分析器生成器 (LAG)

### 功能

- 自定义词法规则（正则表达式）
- 实时词法分析
- 生成完整的 TypeScript 词法分析器代码
- 支持多种编程语言预设（JavaScript/TypeScript、Python、HTML）

### 使用方法

1. 在 **Analyzer** 标签页：
   - 定义词法规则（Name + Pattern + Action）
   - 输入源代码
   - 点击 "Analyze" 查看生成的 token

2. 在 **Code Generator** 标签页：
   - 查看当前规则
   - 点击 "Generate Lexer Code" 生成完整的词法分析器代码
   - 复制代码到项目中使用

3. 在 **Test Cases** 标签页：
   - 查看测试用例
   - 手动运行测试验证功能

### 测试用例

项目包含 5 个测试用例：

1. **Basic Tokenization** - 基本词法识别测试
2. **Skip Rules** - 跳过规则测试（空白、注释）
3. **Line and Column Tracking** - 行列位置跟踪测试
4. **Error Handling** - 错误处理测试
5. **Invalid Regex Pattern** - 无效正则表达式测试

## 🎨 主题配色

采用 VS Code 深色主题风格：

| 颜色 | 用途 |
|------|------|
| `#1e1e1e` | 主背景色 |
| `#333333` | 侧边栏背景 |
| `#cccccc` | 文本色 |
| `#569cd6` | 强调色（蓝色） |
| `#4ec9b0` | 绿色 |
| `#dcdcaa` | 黄色 |
| `#ce9178` | 橙色 |
| `#c586c0` | 紫色 |

## 📱 响应式设计

- **桌面端**：完整 IDE 布局（左侧边栏 + 编辑器 + 终端）
- **移动端**：
  - 顶部导航栏包含菜单按钮
  - 点击菜单显示侧边栏（滑入式）
  - 终端可通过按钮显示/隐藏

## 🔧 开发说明

### 路径别名

项目使用了路径别名，方便导入：

```typescript
// 使用 @/ 代替 src/
import { skills } from '@/data/mockData'
import type { Skill } from '@/types'
```

### 添加新视图

1. 在 `src/views/` 下创建新的 `.vue` 文件
2. 在 `src/router/index.ts` 中添加路由
3. 在 `src/data/mockData.ts` 的 `fileSystem` 中添加文件节点
4. 在 `App.vue` 的 `openFile` 函数中添加路径映射

### 扩展终端命令

在 `src/utils/terminalCommands.ts` 的 `commands` 对象中添加新命令：

```typescript
export const commands: Record<string, TerminalCommand> = {
  // ... 现有命令
  mycommand: {
    name: 'mycommand',
    description: 'My custom command',
    usage: 'mycommand [args]',
    execute: (args, context) => {
      return ['Command output']
    }
  }
}
```

## 📄 License

MIT License

## 👤 作者

Developer

---

*本项目使用 Vue 3 + TypeScript + Vite 构建，采用 Tailwind CSS 和 Ant Design Vue 进行样式设计。*
