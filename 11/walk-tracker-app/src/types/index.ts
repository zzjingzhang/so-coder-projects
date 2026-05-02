export interface BodyInfo {
  height: number;
  weight: number;
  age: number;
  gender: 'male' | 'female';
}

export interface Goal {
  targetWeight: number;
  weeklyGoal: number;
  deadline: string;
}

export interface WalkPlan {
  id: string;
  type: 'daily' | 'weekly';
  date: string;
  steps: number;
  duration: number;
  calories: number;
  completed: boolean;
}

export interface AppState {
  bodyInfo: BodyInfo | null;
  goal: Goal | null;
  walkPlans: WalkPlan[];
  totalSteps: number;
  totalCaloriesBurned: number;
}

export type AppAction =
  | { type: 'SET_BODY_INFO'; payload: BodyInfo }
  | { type: 'SET_GOAL'; payload: Goal }
  | { type: 'ADD_WALK_PLAN'; payload: WalkPlan }
  | { type: 'TOGGLE_PLAN_COMPLETED'; payload: string }
  | { type: 'UPDATE_STATS'; payload: { steps: number; calories: number } };
