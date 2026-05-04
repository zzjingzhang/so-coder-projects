# JavaScript 知识测验应用

一个基于 Angular 框架开发的交互式 JavaScript 知识测验网页应用。

## 项目简介

这是一个功能完整的 JavaScript 知识测验应用，包含以下功能：

- **首页**：展示测验标题、描述、题目数量和总时长
- **答题页**：显示当前题目、四个选项（单选），顶部展示已答题数/总题数、剩余时间以及进度条
- **结果页**：展示得分、正确率，并提供返回首页按钮

## 技术栈

- **框架**: Angular 21.2.0
- **语言**: TypeScript
- **样式**: Tailwind CSS 4.x
- **UI 组件库**: Angular Material 21.2.9
- **路由**: Angular Router
- **打包方式**: Angular CLI Application Builder

## 项目结构

```
js-quiz-app/
├── src/
│   ├── app/
│   │   ├── data/
│   │   │   └── quiz-data.ts          # 测验配置和题目数据
│   │   ├── models/
│   │   │   ├── question.model.ts     # 题目数据模型
│   │   │   └── quiz-state.model.ts   # 测验状态模型
│   │   ├── pages/
│   │   │   ├── home/
│   │   │   │   ├── home.ts           # 首页组件
│   │   │   │   └── home.spec.ts
│   │   │   ├── quiz/
│   │   │   │   ├── quiz.ts           # 答题页组件
│   │   │   │   └── quiz.spec.ts
│   │   │   └── result/
│   │   │       ├── result.ts         # 结果页组件
│   │   │       └── result.spec.ts
│   │   ├── services/
│   │   │   └── quiz.service.ts       # 测验服务
│   │   ├── app.config.ts             # 应用配置
│   │   ├── app.html                  # 根组件模板
│   │   ├── app.routes.ts             # 路由配置
│   │   └── app.ts                    # 根组件
│   ├── index.html
│   ├── main.ts
│   ├── material-theme.scss           # Angular Material 主题
│   └── styles.css                    # 全局样式（包含 Tailwind CSS）
├── angular.json
├── package.json
├── postcss.config.js                 # PostCSS 配置
└── README.md
```

## 功能特性

### 1. 首页
- 展示测验标题和描述
- 显示题目数量和总时长
- 提供测验说明
- 醒目的"开始测验"按钮

### 2. 答题页
- 显示当前题目和四个选项（单选）
- 顶部状态栏显示：
  - 当前题号/总题数
  - 剩余时间（倒计时）
  - 进度条
- 时间警告功能（剩余 60 秒时显示警告色）
- "停止"按钮（随时结束测验）
- "下一题"/"完成"按钮

### 3. 结果页
- 展示得分（答对题数/总题数）
- 显示正确率和进度条
- 统计答对和答错题数
- 根据得分显示不同的评价和建议
- 提供"返回首页"按钮

## 安装和启动

### 前置要求

确保你的开发环境已安装：
- Node.js (推荐版本 20.x 或更高)
- npm (通常随 Node.js 一起安装)
- Angular CLI (可选，但推荐)

### 安装依赖

```bash
cd js-quiz-app
npm install
```

### 启动开发服务器

```bash
ng serve
```

或

```bash
npm start
```

服务器启动后，在浏览器中打开 `http://localhost:4200/` 即可访问应用。

### 构建生产版本

```bash
ng build
```

构建产物将输出到 `dist/` 目录。

### 运行测试

```bash
ng test
```

## 自定义题目

你可以通过修改 `src/app/data/quiz-data.ts` 文件来自定义测验题目和配置：

```typescript
export const QUIZ_CONFIG = {
  title: 'JavaScript 知识测验',
  description: '你的测验描述',
  totalTime: 300, // 总时长（秒）
};

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: '你的问题文本',
    options: ['选项A', '选项B', '选项C', '选项D'],
    correctAnswer: 0, // 正确答案的索引
  },
  // 更多题目...
];
```

## 设计特点

- **居中卡片式设计**：所有页面内容都在圆角卡片中展示
- **柔和渐变背景**：使用蓝紫色渐变作为背景色
- **圆角和阴影**：卡片和按钮都使用圆角和柔和阴影
- **过渡动画**：按钮和交互元素都有平滑的过渡效果
- **响应式设计**：适配不同屏幕尺寸
- **色彩搭配**：使用 Material Design 配色方案

## 许可证

MIT License
