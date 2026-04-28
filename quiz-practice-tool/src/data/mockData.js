export const questions = [
  {
    id: 1,
    question: "React 中用于管理组件状态的 Hook 是什么？",
    options: ["useEffect", "useState", "useContext", "useReducer"],
    correctAnswer: 1,
    category: "React",
    difficulty: "easy"
  },
  {
    id: 2,
    question: "以下哪个不是 JavaScript 的基本数据类型？",
    options: ["String", "Number", "Array", "Boolean"],
    correctAnswer: 2,
    category: "JavaScript",
    difficulty: "easy"
  },
  {
    id: 3,
    question: "CSS 中，flex 布局的主轴对齐方式是通过哪个属性设置的？",
    options: ["align-items", "justify-content", "flex-direction", "flex-wrap"],
    correctAnswer: 1,
    category: "CSS",
    difficulty: "medium"
  },
  {
    id: 4,
    question: "HTML5 中新增的语义化标签是哪个？",
    options: ["<div>", "<span>", "<article>", "<table>"],
    correctAnswer: 2,
    category: "HTML",
    difficulty: "easy"
  },
  {
    id: 5,
    question: "在 React 中，组件的生命周期方法 componentDidMount 对应的 Hook 是？",
    options: ["useState", "useEffect", "useRef", "useMemo"],
    correctAnswer: 1,
    category: "React",
    difficulty: "medium"
  },
  {
    id: 6,
    question: "以下哪个方法可以用来遍历数组并返回新数组？",
    options: ["forEach", "map", "filter", "reduce"],
    correctAnswer: 1,
    category: "JavaScript",
    difficulty: "medium"
  },
  {
    id: 7,
    question: "CSS 选择器中，#id 的优先级比 .class 高吗？",
    options: ["是的，#id 优先级更高", "不是，.class 优先级更高", "两者优先级相同", "无法比较"],
    correctAnswer: 0,
    category: "CSS",
    difficulty: "easy"
  },
  {
    id: 8,
    question: "JavaScript 中，以下哪个方法可以将字符串转换为整数？",
    options: ["parseFloat()", "parseInt()", "toString()", "Number()"],
    correctAnswer: 1,
    category: "JavaScript",
    difficulty: "easy"
  },
  {
    id: 9,
    question: "React Router 中，用于导航的组件是？",
    options: ["<Route>", "<Link>", "<Switch>", "<BrowserRouter>"],
    correctAnswer: 1,
    category: "React",
    difficulty: "medium"
  },
  {
    id: 10,
    question: "以下哪个是正确的 CSS 盒模型顺序（从内到外）？",
    options: ["content → padding → border → margin", "content → border → padding → margin", "margin → border → padding → content", "padding → content → border → margin"],
    correctAnswer: 0,
    category: "CSS",
    difficulty: "medium"
  }
];

export const categories = [
  { value: "all", label: "全部题目" },
  { value: "React", label: "React" },
  { value: "JavaScript", label: "JavaScript" },
  { value: "CSS", label: "CSS" },
  { value: "HTML", label: "HTML" }
];
