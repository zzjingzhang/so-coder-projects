# 在线习题练习工具

一个帮助用户练习单项选择题的 Web 应用，支持随机出题、自动判题、进度保存等功能。

## 功能特性

- 📝 **题目展示与答题交互** - 美观的题目和选项布局，支持点击选择
- 🎲 **随机题目生成** - 随机抽取题目，避免重复
- ✅ **自动判题** - 答题后自动判断对错并显示正确答案
- ⏭️ **自动跳转** - 答题后自动跳转到下一题
- 📊 **进度显示** - 进度条实时显示答题进度
- 💾 **数据存储** - 支持答题进度和成绩保存到本地存储
- 🎨 **精美 UI** - 渐变背景、选项动画高亮、自定义按钮

## 技术栈

- **框架**: React 19
- **语言**: JavaScript
- **样式**: Tailwind CSS 4
- **UI 组件库**: Ant Design 6
- **路由**: React Router 7
- **打包工具**: Vite 8

## 项目结构

```
quiz-practice-tool/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/              # 静态资源
│   ├── data/
│   │   └── mockData.js      # 题库数据
│   ├── hooks/
│   │   └── useQuiz.js       # 答题逻辑自定义 Hook
│   ├── pages/
│   │   ├── Home.jsx         # 首页（设置练习参数）
│   │   ├── Quiz.jsx         # 答题页面
│   │   └── Result.jsx       # 结果页面
│   ├── router/
│   │   └── index.jsx        # 路由配置
│   ├── utils/
│   │   └── index.js         # 工具函数
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js        # PostCSS 配置
├── tailwind.config.js       # Tailwind CSS 配置
└── vite.config.js           # Vite 配置
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

项目将在 `http://localhost:5173` 启动。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 预览生产版本

```bash
npm run preview
```

## 使用说明

1. **首页设置**
   - 选择题库分类（全部、React、JavaScript、CSS、HTML）
   - 选择题目数量（3题、5题、8题、10题）
   - 点击"开始练习"按钮

2. **答题页面**
   - 点击选项选择答案
   - 点击"提交答案"按钮提交
   - 系统会自动判断对错并显示正确答案
   - 2秒后自动跳转到下一题

3. **结果页面**
   - 查看本次练习得分和正确率
   - 查看最近练习记录
   - 点击"再来一次"重新开始

## 题库数据

题库数据位于 `src/data/mockData.js`，包含以下字段：

```javascript
{
  id: 1,                    // 题目ID
  question: "题目内容",     // 题目
  options: ["A", "B", "C", "D"],  // 选项
  correctAnswer: 1,         // 正确答案索引
  category: "React",        // 分类
  difficulty: "easy"        // 难度
}
```

## 本地存储

- `quizProgress` - 保存未完成的答题进度
- `quizScores` - 保存历史练习成绩

## 许可证

MIT License
