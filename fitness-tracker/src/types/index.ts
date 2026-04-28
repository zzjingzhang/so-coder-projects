// 运动类型
export type ExerciseType = 'running' | 'cycling' | 'swimming' | 'strength' | 'yoga' | 'other';

// 运动强度
export type ExerciseIntensity = 'low' | 'medium' | 'high';

// 运动记录
export interface ExerciseRecord {
  id: string;
  type: ExerciseType;
  duration: number; // 分钟
  intensity: ExerciseIntensity;
  caloriesBurned: number;
  date: string;
  notes?: string;
}

// 体重记录
export interface WeightRecord {
  id: string;
  weight: number; // kg
  bodyFat?: number; // 体脂率
  muscleMass?: number; // 肌肉量
  date: string;
  notes?: string;
}

// 体重目标
export interface WeightGoal {
  id: string;
  targetWeight: number;
  startWeight: number;
  startDate: string;
  targetDate: string;
  isActive: boolean;
}

// 营养信息
export interface NutritionInfo {
  calories: number;
  protein: number; // g
  carbs: number; // g
  fat: number; // g
  fiber?: number; // g
  sugar?: number; // g
}

// 食物条目
export interface FoodItem {
  id: string;
  name: string;
  servingSize: string;
  quantity: number;
  nutrition: NutritionInfo;
}

// 饮食记录
export interface MealRecord {
  id: string;
  date: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  foods: FoodItem[];
  totalNutrition: NutritionInfo;
}

// 训练计划状态
export type TrainingPlanStatus = 'active' | 'completed' | 'paused';

// 训练日
export interface TrainingDay {
  dayOfWeek: number; // 0-6
  exercises: TrainingExercise[];
  isRestDay: boolean;
}

// 训练动作
export interface TrainingExercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number; // kg
  duration?: number; // 分钟
  notes?: string;
}

// 训练计划
export interface TrainingPlan {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  status: TrainingPlanStatus;
  trainingDays: TrainingDay[];
  createdAt: string;
}

// 成就类型
export type AchievementType = 'streak' | 'milestone' | 'goal' | 'consistency';

// 成就
export interface Achievement {
  id: string;
  name: string;
  description: string;
  type: AchievementType;
  icon: string;
  unlockedAt?: string;
  isUnlocked: boolean;
  progress?: number; // 0-100
  target?: number;
}

// 用户统计
export interface UserStats {
  totalWorkouts: number;
  totalMinutes: number;
  totalCaloriesBurned: number;
  currentStreak: number;
  longestStreak: number;
  achievementsCount: number;
}
