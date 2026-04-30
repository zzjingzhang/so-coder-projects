# 答题系统 (Quiz App)

一个功能完整的在线答题系统，支持题目浏览、即时反馈、收藏、错题本等多种功能。

## 技术栈

- **框架**: Angular 21.2.0
- **语言**: TypeScript 5.9
- **样式**: Tailwind CSS 4.2
- **UI 组件库**: Angular Material 21.2.9
- **路由**: Angular Router
- **打包**: Angular CLI Application Builder

## 项目结构

```
quiz-app/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── demo/                    # 演示页面（包含 iframe 入口）
│   │   │   │   ├── demo.component.ts
│   │   │   │   ├── demo.component.html
│   │   │   │   └── demo.component.css
│   │   │   ├── quiz/                    # 答题主组件
│   │   │   │   ├── quiz.component.ts
│   │   │   │   ├── quiz.component.html
│   │   │   │   └── quiz.component.css
│   │   │   ├── toast/                   # Toast 提示组件
│   │   │   │   ├── toast.component.ts
│   │   │   │   ├── toast.component.html
│   │   │   │   └── toast.component.css
│   │   │   ├── overview-dialog/         # 题目概览弹窗
│   │   │   │   ├── overview-dialog.component.ts
│   │   │   │   ├── overview-dialog.component.html
│   │   │   │   └── overview-dialog.component.css
│   │   │   ├── favorites-dialog/        # 收藏夹弹窗
│   │   │   │   ├── favorites-dialog.component.ts
│   │   │   │   ├── favorites-dialog.component.html
│   │   │   │   └── favorites-dialog.component.css
│   │   │   ├── wrong-questions-dialog/  # 错题本弹窗
│   │   │   │   ├── wrong-questions-dialog.component.ts
│   │   │   │   ├── wrong-questions-dialog.component.html
│   │   │   │   └── wrong-questions-dialog.component.css
│   │   │   └── quiz-iframe-dialog/      # iframe 弹窗
│   │   │       ├── quiz-iframe-dialog.component.ts
│   │   │       ├── quiz-iframe-dialog.component.html
│   │   │       └── quiz-iframe-dialog.component.css
│   │   ├── services/
│   │   │   ├── quiz.service.ts          # 答题状态管理服务
│   │   │   └── toast.service.ts         # Toast 提示服务
│   │   ├── data.ts                       # 题目数据
│   │   ├── app.ts                        # 根组件
│   │   ├── app.html                      # 根组件模板
│   │   ├── app.routes.ts                 # 路由配置
│   │   └── app.config.ts                 # 应用配置
│   ├── styles.css                        # 全局样式（Tailwind CSS）
│   └── index.html                        # 入口 HTML
├── tailwind.config.js                    # Tailwind CSS 配置
├── angular.json                          # Angular 配置
├── package.json                          # 项目依赖
└── README.md                             # 项目说明
```

## 功能特性

### 1. 题目浏览与作答
- 页面一次只显示一题，题目标题居上方
- 选项按 A、B、C… 顺序展示
- 点击选项后立即判断对错，用不同颜色标记（正确为绿色，错误为红色）
- 自动记录错误题目索引

### 2. 题目切换
- 提供"上一题""下一题"按钮实现题目切换
- 切换时自动恢复已作答的状态
- 显示当前题目进度条

### 3. 查看答案解析
- 点击"查看答案"按钮展示该题目的答案解析文字
- 未作答时点击会显示 Toast 提示"请先作答再查看答案"

### 4. 收藏功能
- 点击"收藏"按钮可将当前题目加入收藏列表
- 右上角显示已收藏数量
- 点击"收藏夹"弹出弹窗列出所有已收藏题目
- 点击收藏列表中的题目可跳转到对应题目

### 5. 错题本功能
- 自动记录所有答错的题目
- 点击"错题本"弹出弹窗列出错误题目
- 点击错题列表可跳转至对应题目

### 6. 题目概览
- 展示所有题目状态（未答、已答对、已答错）
- 使用不同颜色区分状态：灰色（未答）、绿色（已答对）、红色（已答错）
- 点击任意题目可直接跳转

### 7. Demo 页面与 iframe
- 默认路由 `/` 为 Demo 页面
- 页面右下角固定一个浮动按钮
- 点击按钮后打开一个弹窗，iframe 中加载答题系统（`/quiz` 路由）

### 8. Toast 提示组件
- 统一的 Toast 提示组件
- 支持 info、success、warning、error 四种类型
- 自动 3 秒后消失，也可手动关闭

## 数据结构

题目数据定义在 `src/app/data.ts` 中，格式如下：

```typescript
export interface Question {
  id: number;
  title: string;
  items: string[];  // 选项数组
  answer: number;   // 正确选项索引
  reason: string;   // 答案解析
}
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
# 或
npm run start
# 或
ng serve
```

启动后，浏览器访问 `http://localhost:4200/`

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist/` 目录。

## 路由配置

| 路由 | 组件 | 说明 |
|------|------|------|
| `/` | DemoComponent | 演示页面，包含 iframe 入口 |
| `/quiz` | QuizComponent | 答题系统主页面 |

## 使用说明

1. **访问演示页面**: 打开浏览器访问 `http://localhost:4200/`
2. **打开答题系统**: 点击页面右下角的浮动按钮，答题系统将在 iframe 中打开
3. **作答**: 点击选项进行作答，系统会立即显示对错
4. **切换题目**: 使用"上一题"和"下一题"按钮切换题目
5. **查看解析**: 作答后点击"查看答案"查看解析
6. **收藏题目**: 点击"收藏"按钮收藏当前题目
7. **查看概览**: 点击顶部"题目概览"查看所有题目状态
8. **查看收藏**: 点击顶部"收藏夹"查看收藏的题目
9. **查看错题**: 点击顶部"错题本"查看答错的题目

## 开发说明

本项目使用 Angular 17+ 的独立组件（Standalone Components）模式，不使用 NgModule。所有组件都是独立的，可以直接导入使用。

### 服务说明

- **QuizService**: 管理答题状态，包括题目状态、收藏、错题记录等
- **ToastService**: 管理 Toast 提示的显示和隐藏

### 组件说明

- **QuizComponent**: 主答题组件，负责题目渲染和交互
- **DemoComponent**: 演示页面，包含 iframe 入口按钮
- **ToastComponent**: Toast 提示组件
- **OverviewDialogComponent**: 题目概览弹窗
- **FavoritesDialogComponent**: 收藏夹弹窗
- **WrongQuestionsDialogComponent**: 错题本弹窗
- **QuizIframeDialogComponent**: iframe 弹窗

## License

MIT
