import { Course } from '../models/course.model';
import { Achievement } from '../models/achievement.model';
import { User } from '../models/user.model';

export const mockUser: User = {
  id: '1',
  name: '张明',
  email: 'zhangming@example.com',
  avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20male%20avatar%20portrait%20chinese%20young%20adult%20friendly%20smile&image_size=square',
  bio: '热爱学习，专注于前端开发和用户体验设计。',
  joinDate: new Date('2025-01-15'),
  totalCoursesCompleted: 3,
  totalHoursLearned: 156,
  streakDays: 15,
  level: '中级学习者',
  levelProgress: 65
};

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Angular 21 完全指南',
    description: '从零开始学习最新的 Angular 框架，掌握组件、服务、路由等核心概念。',
    instructor: '李老师',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=angular%20framework%20online%20course%20cover%20modern%20blue%20theme%20programming&image_size=landscape_16_9',
    chapters: [
      {
        id: 'ch1',
        title: '第一章：Angular 入门',
        lessons: [
          { id: 'l1', title: '1.1 什么是 Angular', duration: '10:00', completed: true },
          { id: 'l2', title: '1.2 环境搭建', duration: '15:00', completed: true },
          { id: 'l3', title: '1.3 创建第一个应用', duration: '20:00', completed: false }
        ],
        expanded: true
      },
      {
        id: 'ch2',
        title: '第二章：组件基础',
        lessons: [
          { id: 'l4', title: '2.1 组件的创建', duration: '12:00', completed: false },
          { id: 'l5', title: '2.2 模板语法', duration: '18:00', completed: false },
          { id: 'l6', title: '2.3 数据绑定', duration: '25:00', completed: false }
        ],
        expanded: false
      },
      {
        id: 'ch3',
        title: '第三章：依赖注入',
        lessons: [
          { id: 'l7', title: '3.1 服务的创建', duration: '15:00', completed: false },
          { id: 'l8', title: '3.2 依赖注入原理', duration: '20:00', completed: false }
        ],
        expanded: false
      }
    ],
    progress: 33,
    totalLessons: 8,
    completedLessons: 2,
    enrolledDate: new Date('2026-03-01'),
    rating: 4.8,
    studentsCount: 5234
  },
  {
    id: '2',
    title: 'TypeScript 高级编程',
    description: '深入理解 TypeScript 的类型系统、泛型、装饰器等高级特性。',
    instructor: '王教授',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=typescript%20programming%20course%20cover%20dark%20blue%20theme%20code%20snippet&image_size=landscape_16_9',
    chapters: [
      {
        id: 'ch1',
        title: '第一章：类型基础',
        lessons: [
          { id: 'l1', title: '1.1 类型注解', duration: '10:00', completed: true },
          { id: 'l2', title: '1.2 接口与类型别名', duration: '15:00', completed: true },
          { id: 'l3', title: '1.3 联合类型与交叉类型', duration: '20:00', completed: true }
        ],
        expanded: true
      },
      {
        id: 'ch2',
        title: '第二章：泛型编程',
        lessons: [
          { id: 'l4', title: '2.1 泛型函数', duration: '12:00', completed: true },
          { id: 'l5', title: '2.2 泛型接口', duration: '18:00', completed: true },
          { id: 'l6', title: '2.3 泛型约束', duration: '25:00', completed: false }
        ],
        expanded: false
      }
    ],
    progress: 83,
    totalLessons: 6,
    completedLessons: 5,
    enrolledDate: new Date('2026-02-15'),
    rating: 4.9,
    studentsCount: 3856
  },
  {
    id: '3',
    title: 'RxJS 响应式编程',
    description: '学习使用 RxJS 进行异步数据流处理，掌握响应式编程范式。',
    instructor: '陈老师',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=rxjs%20reactive%20programming%20course%20cover%20purple%20theme%20data%20flow&image_size=landscape_16_9',
    chapters: [
      {
        id: 'ch1',
        title: '第一章：响应式编程基础',
        lessons: [
          { id: 'l1', title: '1.1 什么是 Observable', duration: '10:00', completed: true },
          { id: 'l2', title: '1.2 创建 Observable', duration: '15:00', completed: false }
        ],
        expanded: true
      }
    ],
    progress: 50,
    totalLessons: 2,
    completedLessons: 1,
    enrolledDate: new Date('2026-04-01'),
    rating: 4.7,
    studentsCount: 2431
  },
  {
    id: '4',
    title: 'JavaScript 设计模式',
    description: '学习经典的设计模式在 JavaScript 中的实现与应用。',
    instructor: '刘老师',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=javascript%20design%20patterns%20course%20cover%20yellow%20orange%20theme%20architecture&image_size=landscape_16_9',
    chapters: [
      {
        id: 'ch1',
        title: '第一章：创建型模式',
        lessons: [
          { id: 'l1', title: '1.1 单例模式', duration: '12:00', completed: true },
          { id: 'l2', title: '1.2 工厂模式', duration: '18:00', completed: true },
          { id: 'l3', title: '1.3 建造者模式', duration: '20:00', completed: true }
        ],
        expanded: true
      },
      {
        id: 'ch2',
        title: '第二章：结构型模式',
        lessons: [
          { id: 'l4', title: '2.1 适配器模式', duration: '15:00', completed: true },
          { id: 'l5', title: '2.2 装饰器模式', duration: '20:00', completed: true },
          { id: 'l6', title: '2.3 代理模式', duration: '18:00', completed: true }
        ],
        expanded: false
      },
      {
        id: 'ch3',
        title: '第三章：行为型模式',
        lessons: [
          { id: 'l7', title: '3.1 观察者模式', duration: '15:00', completed: true },
          { id: 'l8', title: '3.2 策略模式', duration: '20:00', completed: true },
          { id: 'l9', title: '3.3 命令模式', duration: '18:00', completed: true }
        ],
        expanded: false
      }
    ],
    progress: 100,
    totalLessons: 9,
    completedLessons: 9,
    enrolledDate: new Date('2026-01-10'),
    rating: 4.9,
    studentsCount: 6234
  }
];

export const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: '学习起步',
    description: '完成第一门课程的第一节课',
    icon: 'star',
    earned: true,
    earnedDate: new Date('2026-01-15'),
    category: 'learning'
  },
  {
    id: '2',
    title: '坚持一周',
    description: '连续学习7天',
    icon: 'fire',
    earned: true,
    earnedDate: new Date('2026-01-22'),
    category: 'streak'
  },
  {
    id: '3',
    title: '分享知识',
    description: '邀请一位好友加入学习',
    icon: 'group',
    earned: true,
    earnedDate: new Date('2026-02-01'),
    category: 'social'
  },
  {
    id: '4',
    title: '课程达人',
    description: '完成3门课程',
    icon: 'school',
    earned: true,
    earnedDate: new Date('2026-03-15'),
    category: 'milestone'
  },
  {
    id: '5',
    title: '学习马拉松',
    description: '累计学习100小时',
    icon: 'timer',
    earned: true,
    earnedDate: new Date('2026-03-20'),
    category: 'milestone'
  },
  {
    id: '6',
    title: '早起鸟',
    description: '在早上6点前学习',
    icon: 'alarm',
    earned: false,
    category: 'streak'
  },
  {
    id: '7',
    title: '夜猫子',
    description: '在晚上10点后学习',
    icon: 'nightlight',
    earned: false,
    category: 'streak'
  },
  {
    id: '8',
    title: '全栈学习者',
    description: '同时学习前端、后端和数据库课程',
    icon: 'public',
    earned: false,
    category: 'learning'
  }
];
