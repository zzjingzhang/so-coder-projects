import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import type { AppState, AppAction, BodyInfo, Goal, WalkPlan } from '../types';

const initialState: AppState = {
  bodyInfo: null,
  goal: null,
  walkPlans: [],
  totalSteps: 0,
  totalCaloriesBurned: 0,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_BODY_INFO':
      return { ...state, bodyInfo: action.payload };
    case 'SET_GOAL':
      return { ...state, goal: action.payload };
    case 'ADD_WALK_PLAN':
      return { ...state, walkPlans: [...state.walkPlans, action.payload] };
    case 'TOGGLE_PLAN_COMPLETED':
      return {
        ...state,
        walkPlans: state.walkPlans.map((plan) =>
          plan.id === action.payload ? { ...plan, completed: !plan.completed } : plan
        ),
      };
    case 'UPDATE_STATS':
      return {
        ...state,
        totalSteps: state.totalSteps + action.payload.steps,
        totalCaloriesBurned: state.totalCaloriesBurned + action.payload.calories,
      };
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  setBodyInfo: (info: BodyInfo) => void;
  setGoal: (goal: Goal) => void;
  addWalkPlan: (plan: WalkPlan) => void;
  togglePlanCompleted: (id: string) => void;
  updateStats: (stats: { steps: number; calories: number }) => void;
  generateWalkPlan: (type: 'daily' | 'weekly') => WalkPlan[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const setBodyInfo = (info: BodyInfo) => {
    dispatch({ type: 'SET_BODY_INFO', payload: info });
  };

  const setGoal = (goal: Goal) => {
    dispatch({ type: 'SET_GOAL', payload: goal });
  };

  const addWalkPlan = (plan: WalkPlan) => {
    dispatch({ type: 'ADD_WALK_PLAN', payload: plan });
  };

  const togglePlanCompleted = (id: string) => {
    dispatch({ type: 'TOGGLE_PLAN_COMPLETED', payload: id });
    const plan = state.walkPlans.find((p) => p.id === id);
    if (plan && !plan.completed) {
      dispatch({ type: 'UPDATE_STATS', payload: { steps: plan.steps, calories: plan.calories } });
    }
  };

  const updateStats = (stats: { steps: number; calories: number }) => {
    dispatch({ type: 'UPDATE_STATS', payload: stats });
  };

  const generateWalkPlan = (type: 'daily' | 'weekly'): WalkPlan[] => {
    const plans: WalkPlan[] = [];
    const baseSteps = state.bodyInfo ? calculateBaseSteps(state.bodyInfo) : 8000;
    const targetSteps = state.goal ? calculateTargetSteps(baseSteps, state.goal.weeklyGoal) : baseSteps;

    if (type === 'daily') {
      const today = new Date();
      plans.push({
        id: `daily-${today.toISOString().split('T')[0]}`,
        type: 'daily',
        date: today.toISOString().split('T')[0],
        steps: targetSteps,
        duration: Math.round(targetSteps / 100),
        calories: Math.round((targetSteps / 1000) * 50 * (state.bodyInfo?.weight || 70) / 70),
        completed: false,
      });
    } else {
      for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        const variation = 0.8 + Math.random() * 0.4;
        const dailySteps = Math.round(targetSteps * variation);
        
        plans.push({
          id: `weekly-${date.toISOString().split('T')[0]}`,
          type: 'weekly',
          date: date.toISOString().split('T')[0],
          steps: dailySteps,
          duration: Math.round(dailySteps / 100),
          calories: Math.round((dailySteps / 1000) * 50 * (state.bodyInfo?.weight || 70) / 70),
          completed: false,
        });
      }
    }

    plans.forEach((plan) => addWalkPlan(plan));
    return plans;
  };

  const calculateBaseSteps = (bodyInfo: BodyInfo): number => {
    let baseSteps = 8000;
    if (bodyInfo.age < 30) baseSteps = 10000;
    else if (bodyInfo.age < 50) baseSteps = 9000;
    
    if (bodyInfo.weight > 80) baseSteps += 1000;
    if (bodyInfo.height > 180) baseSteps += 500;
    
    return baseSteps;
  };

  const calculateTargetSteps = (baseSteps: number, weeklyGoal: number): number => {
    const caloriePerStep = 0.05;
    const weeklyCaloriesToBurn = weeklyGoal * 7700;
    const dailyCaloriesToBurn = weeklyCaloriesToBurn / 7;
    const additionalSteps = Math.round(dailyCaloriesToBurn / caloriePerStep);
    
    return baseSteps + additionalSteps;
  };

  return (
    <AppContext.Provider
      value={{
        state,
        setBodyInfo,
        setGoal,
        addWalkPlan,
        togglePlanCompleted,
        updateStats,
        generateWalkPlan,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
