import type { 
  ExerciseRecord, 
  WeightRecord, 
  WeightGoal, 
  MealRecord, 
  TrainingPlan, 
  Achievement, 
  UserStats 
} from '@/types';

// 生成唯一ID
const generateId = (): string => Math.random().toString(36).substring(2, 11);

// 模拟运动记录数据
export const mockExerciseRecords: ExerciseRecord[] = [
  {
    id: generateId(),
    type: 'running',
    duration: 30,
    intensity: 'medium',
    caloriesBurned: 300,
    date: '2026-04-27',
    notes: '晨跑，感觉不错'
  },
  {
    id: generateId(),
    type: 'strength',
    duration: 45,
    intensity: 'high',
    caloriesBurned: 350,
    date: '2026-04-26',
    notes: '腿部训练日'
  },
  {
    id: generateId(),
    type: 'yoga',
    duration: 60,
    intensity: 'low',
    caloriesBurned: 180,
    date: '2026-04-25',
    notes: '放松瑜伽'
  },
  {
    id: generateId(),
    type: 'cycling',
    duration: 45,
    intensity: 'medium',
    caloriesBurned: 400,
    date: '2026-04-24',
    notes: '户外骑行'
  },
  {
    id: generateId(),
    type: 'swimming',
    duration: 30,
    intensity: 'high',
    caloriesBurned: 450,
    date: '2026-04-23',
    notes: '自由泳训练'
  }
];

// 模拟体重记录数据
export const mockWeightRecords: WeightRecord[] = [
  { id: generateId(), weight: 75.5, bodyFat: 22.5, muscleMass: 35.2, date: '2026-04-27' },
  { id: generateId(), weight: 75.8, bodyFat: 22.8, muscleMass: 35.0, date: '2026-04-20' },
  { id: generateId(), weight: 76.2, bodyFat: 23.0, muscleMass: 34.8, date: '2026-04-13' },
  { id: generateId(), weight: 76.5, bodyFat: 23.2, muscleMass: 34.7, date: '2026-04-06' },
  { id: generateId(), weight: 77.0, bodyFat: 23.5, muscleMass: 34.5, date: '2026-03-30' },
  { id: generateId(), weight: 77.5, bodyFat: 23.8, muscleMass: 34.3, date: '2026-03-23' }
];

// 模拟体重目标
export const mockWeightGoal: WeightGoal = {
  id: generateId(),
  targetWeight: 72.0,
  startWeight: 78.0,
  startDate: '2026-01-01',
  targetDate: '2026-06-30',
  isActive: true
};

// 模拟饮食记录
export const mockMealRecords: MealRecord[] = [
  {
    id: generateId(),
    date: '2026-04-27',
    mealType: 'breakfast',
    foods: [
      {
        id: generateId(),
        name: '燕麦粥',
        servingSize: '碗',
        quantity: 1,
        nutrition: { calories: 150, protein: 5, carbs: 25, fat: 3 }
      },
      {
        id: generateId(),
        name: '鸡蛋',
        servingSize: '个',
        quantity: 2,
        nutrition: { calories: 140, protein: 12, carbs: 1, fat: 10 }
      }
    ],
    totalNutrition: { calories: 290, protein: 17, carbs: 26, fat: 13 }
  },
  {
    id: generateId(),
    date: '2026-04-27',
    mealType: 'lunch',
    foods: [
      {
        id: generateId(),
        name: '鸡胸肉沙拉',
        servingSize: '份',
        quantity: 1,
        nutrition: { calories: 350, protein: 30, carbs: 15, fat: 18 }
      },
      {
        id: generateId(),
        name: '糙米饭',
        servingSize: '碗',
        quantity: 0.5,
        nutrition: { calories: 110, protein: 3, carbs: 23, fat: 1 }
      }
    ],
    totalNutrition: { calories: 460, protein: 33, carbs: 38, fat: 19 }
  },
  {
    id: generateId(),
    date: '2026-04-27',
    mealType: 'dinner',
    foods: [
      {
        id: generateId(),
        name: '三文鱼',
        servingSize: '100g',
        quantity: 1.5,
        nutrition: { calories: 310, protein: 30, carbs: 0, fat: 20 }
      },
      {
        id: generateId(),
        name: '蒸西兰花',
        servingSize: '份',
        quantity: 1,
        nutrition: { calories: 55, protein: 4, carbs: 11, fat: 0.5 }
      }
    ],
    totalNutrition: { calories: 365, protein: 34, carbs: 11, fat: 20.5 }
  }
];

// 模拟训练计划
export const mockTrainingPlans: TrainingPlan[] = [
  {
    id: generateId(),
    name: '初学者健身计划',
    description: '适合健身初学者的全身训练计划，每周3次，每次45分钟',
    startDate: '2026-04-01',
    status: 'active',
    createdAt: '2026-03-28',
    trainingDays: [
      {
        dayOfWeek: 1, // 周一
        isRestDay: false,
        exercises: [
          { id: generateId(), name: '深蹲', sets: 3, reps: 12, weight: 20 },
          { id: generateId(), name: '卧推', sets: 3, reps: 10, weight: 15 },
          { id: generateId(), name: '划船', sets: 3, reps: 12, weight: 15 },
          { id: generateId(), name: '平板支撑', sets: 3, reps: 1, duration: 30 }
        ]
      },
      {
        dayOfWeek: 2, // 周二
        isRestDay: true,
        exercises: []
      },
      {
        dayOfWeek: 3, // 周三
        isRestDay: false,
        exercises: [
          { id: generateId(), name: '硬拉', sets: 3, reps: 10, weight: 25 },
          { id: generateId(), name: '肩推', sets: 3, reps: 12, weight: 10 },
          { id: generateId(), name: '二头弯举', sets: 3, reps: 12, weight: 8 },
          { id: generateId(), name: '三头下压', sets: 3, reps: 12, weight: 8 }
        ]
      },
      {
        dayOfWeek: 4, // 周四
        isRestDay: true,
        exercises: []
      },
      {
        dayOfWeek: 5, // 周五
        isRestDay: false,
        exercises: [
          { id: generateId(), name: '箭步蹲', sets: 3, reps: 12, weight: 15 },
          { id: generateId(), name: '俯卧撑', sets: 3, reps: 15 },
          { id: generateId(), name: '引体向上', sets: 3, reps: 8 },
          { id: generateId(), name: '卷腹', sets: 3, reps: 20 }
        ]
      },
      {
        dayOfWeek: 6, // 周六
        isRestDay: true,
        exercises: []
      },
      {
        dayOfWeek: 0, // 周日
        isRestDay: true,
        exercises: []
      }
    ]
  }
];

// 模拟成就数据
export const mockAchievements: Achievement[] = [
  {
    id: generateId(),
    name: '初次尝试',
    description: '完成第一次运动记录',
    type: 'milestone',
    icon: 'mdi-trophy',
    isUnlocked: true,
    unlockedAt: '2026-04-01'
  },
  {
    id: generateId(),
    name: '一周坚持',
    description: '连续运动7天',
    type: 'streak',
    icon: 'mdi-fire',
    isUnlocked: true,
    unlockedAt: '2026-04-07',
    progress: 100,
    target: 7
  },
  {
    id: generateId(),
    name: '卡路里杀手',
    description: '累计燃烧5000卡路里',
    type: 'goal',
    icon: 'mdi-fire',
    isUnlocked: false,
    progress: 65,
    target: 5000
  },
  {
    id: generateId(),
    name: '运动达人',
    description: '累计运动100小时',
    type: 'milestone',
    icon: 'mdi-medal',
    isUnlocked: false,
    progress: 25,
    target: 100
  },
  {
    id: generateId(),
    name: '坚持就是胜利',
    description: '连续运动30天',
    type: 'streak',
    icon: 'mdi-star',
    isUnlocked: false,
    progress: 40,
    target: 30
  },
  {
    id: generateId(),
    name: '完美一周',
    description: '一周内每天都记录饮食',
    type: 'consistency',
    icon: 'mdi-check-circle',
    isUnlocked: true,
    unlockedAt: '2026-04-14'
  }
];

// 模拟用户统计
export const mockUserStats: UserStats = {
  totalWorkouts: 45,
  totalMinutes: 2250,
  totalCaloriesBurned: 3250,
  currentStreak: 12,
  longestStreak: 18,
  achievementsCount: 3
};
