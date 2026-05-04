import { Question } from '../models/question.model';

export const QUIZ_CONFIG = {
  title: 'JavaScript 知识测验',
  description: '测试你的 JavaScript 基础知识，包括变量、函数、对象、数组等核心概念。',
  totalTime: 300,
};

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'JavaScript 中，以下哪个关键字用于声明常量？',
    options: ['var', 'let', 'const', 'static'],
    correctAnswer: 2,
  },
  {
    id: 2,
    text: '以下哪个方法用于向数组末尾添加元素？',
    options: ['pop()', 'push()', 'shift()', 'unshift()'],
    correctAnswer: 1,
  },
  {
    id: 3,
    text: 'JavaScript 中，typeof null 的返回值是什么？',
    options: ['"null"', '"undefined"', '"object"', '"boolean"'],
    correctAnswer: 2,
  },
  {
    id: 4,
    text: '以下哪个运算符用于严格相等比较（值和类型都相等）？',
    options: ['==', '===', '=', '!='],
    correctAnswer: 1,
  },
  {
    id: 5,
    text: 'JavaScript 中，以下哪个不是原始数据类型？',
    options: ['String', 'Number', 'Array', 'Boolean'],
    correctAnswer: 2,
  },
  {
    id: 6,
    text: '以下哪个方法用于将字符串转换为整数？',
    options: ['parseFloat()', 'parseInt()', 'toString()', 'Number()'],
    correctAnswer: 1,
  },
  {
    id: 7,
    text: 'JavaScript 中，this 关键字在全局作用域中指向什么？',
    options: ['undefined', 'null', 'window 对象（浏览器环境）', '当前函数'],
    correctAnswer: 2,
  },
  {
    id: 8,
    text: '以下哪个方法用于遍历数组并返回一个新数组？',
    options: ['forEach()', 'map()', 'filter()', 'reduce()'],
    correctAnswer: 1,
  },
  {
    id: 9,
    text: 'JavaScript 中，NaN 代表什么？',
    options: ['Not a Number', 'Null and Negative', 'Not a Null', 'New Array Number'],
    correctAnswer: 0,
  },
  {
    id: 10,
    text: '以下哪个关键字用于创建一个对象？',
    options: ['new Object()', '{}', 'Object.create()', '以上都是'],
    correctAnswer: 3,
  },
];
