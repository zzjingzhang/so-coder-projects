export interface Question {
  id: number;
  title: string;
  items: string[];
  answer: number;
  reason: string;
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    title: '以下哪项是 Angular 的核心特性？',
    items: [
      '虚拟 DOM',
      '组件化架构',
      '单向数据流',
      'JSX 语法'
    ],
    answer: 1,
    reason: 'Angular 的核心特性是组件化架构。虚拟 DOM 和 JSX 是 React 的特性，单向数据流虽然在 Angular 中也有体现，但组件化架构是其最核心的设计理念。'
  },
  {
    id: 2,
    title: 'TypeScript 与 JavaScript 的主要区别是什么？',
    items: [
      'TypeScript 是 JavaScript 的超集，添加了类型系统',
      'TypeScript 只能在服务器端运行',
      'TypeScript 不支持面向对象编程',
      'TypeScript 是另一种完全不同的编程语言'
    ],
    answer: 0,
    reason: 'TypeScript 是 JavaScript 的超集，它在 JavaScript 的基础上添加了静态类型系统。所有合法的 JavaScript 代码都是合法的 TypeScript 代码，TypeScript 最终会编译成 JavaScript 运行。'
  },
  {
    id: 3,
    title: '在 Angular 中，用于组件之间通信的主要方式不包括以下哪项？',
    items: [
      '@Input() 和 @Output() 装饰器',
      '服务 (Service)',
      '路由参数',
      '直接操作 DOM'
    ],
    answer: 3,
    reason: '在 Angular 中，直接操作 DOM 不是推荐的组件通信方式。推荐使用 @Input()/@Output() 装饰器进行父子组件通信，使用服务进行跨组件通信，使用路由参数进行路由间通信。'
  },
  {
    id: 4,
    title: '以下哪个不是 Angular 的生命周期钩子？',
    items: [
      'ngOnInit',
      'ngOnDestroy',
      'componentDidMount',
      'ngAfterViewInit'
    ],
    answer: 2,
    reason: 'componentDidMount 是 React 的生命周期方法，不是 Angular 的。Angular 的主要生命周期钩子包括 ngOnInit、ngOnDestroy、ngAfterViewInit、ngOnChanges 等。'
  },
  {
    id: 5,
    title: 'Tailwind CSS 的主要设计理念是什么？',
    items: [
      '使用预定义的 CSS 类进行样式开发',
      '使用 CSS-in-JS 方案',
      '使用 Less/Sass 预处理器',
      '使用内联样式'
    ],
    answer: 0,
    reason: 'Tailwind CSS 是一个实用优先的 CSS 框架，其主要设计理念是提供大量预定义的 CSS 类（如 flex, pt-4, text-center 等），让开发者可以直接在 HTML 中组合这些类来构建界面，而无需编写自定义 CSS。'
  },
  {
    id: 6,
    title: 'Angular Material 是什么？',
    items: [
      '一个用于构建 Angular 应用的状态管理库',
      'Angular 官方的 UI 组件库',
      '一个用于 Angular 的路由库',
      'Angular 的测试框架'
    ],
    answer: 1,
    reason: 'Angular Material 是 Angular 官方提供的 UI 组件库，它实现了 Material Design 设计规范，提供了一系列高质量的组件（如按钮、对话框、表单控件等），可以帮助开发者快速构建美观且一致的用户界面。'
  },
  {
    id: 7,
    title: '以下哪项不是 TypeScript 的数据类型？',
    items: [
      'any',
      'void',
      'never',
      'dynamic'
    ],
    answer: 3,
    reason: 'dynamic 不是 TypeScript 的数据类型。TypeScript 的特殊类型包括 any（任意类型）、void（无返回值类型）、never（永不存在的值的类型）、unknown（未知类型）等。dynamic 是某些其他语言（如 C#）中的概念。'
  },
  {
    id: 8,
    title: '在 Angular 中，NgModule 的主要作用是什么？',
    items: [
      '管理应用的状态',
      '组织应用的组件、指令、管道和服务',
      '处理 HTTP 请求',
      '管理路由配置'
    ],
    answer: 1,
    reason: 'NgModule（Ng 模块）是 Angular 中用于组织和管理应用相关代码的核心概念。它将相关的组件、指令、管道组织在一起，并通过 providers 数组配置服务，通过 imports 数组引入其他模块，通过 exports 数组暴露给外部使用。'
  },
  {
    id: 9,
    title: '以下哪个不是 Angular Router 的特性？',
    items: [
      '路由守卫',
      '延迟加载',
      '虚拟滚动',
      '路由参数'
    ],
    answer: 2,
    reason: '虚拟滚动不是 Angular Router 的特性，它是 Angular CDK（Component Dev Kit）中 Scrolling 模块提供的功能，用于高效渲染大型列表。路由守卫、延迟加载和路由参数都是 Angular Router 的核心特性。'
  },
  {
    id: 10,
    title: '在响应式编程中，RxJS 的主要概念是什么？',
    items: [
      'Promise 和 async/await',
      'Observable 和 Observer',
      'Component 和 Service',
      'Module 和 Directive'
    ],
    answer: 1,
    reason: 'RxJS（Reactive Extensions for JavaScript）的核心概念是 Observable（可观察对象）和 Observer（观察者）。Observable 表示一个可调用的未来值或事件的集合，Observer 是一个回调函数的集合，它知道如何监听 Observable 传递的值。'
  }
];
