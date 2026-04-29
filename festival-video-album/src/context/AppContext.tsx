import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { 
  AppState, 
  UploadedImage, 
  GenerationConfig, 
  ProcessingStep, 
  VideoTask,
  HolidayTheme,
  VideoStyle
} from '../types';

// 初始状态
const initialState: AppState = {
  uploadedImages: [],
  generationConfig: {
    theme: HolidayTheme.CHRISTMAS,
    style: VideoStyle.CINEMATIC,
  },
  processingStep: ProcessingStep.ANALYZING_PHOTOS,
  progress: 0,
  videoTasks: [],
  isGenerating: false,
  error: null,
};

// Action 类型
type Action =
  | { type: 'ADD_IMAGES'; payload: UploadedImage[] }
  | { type: 'REMOVE_IMAGE'; payload: string }
  | { type: 'UPDATE_CONFIG'; payload: Partial<GenerationConfig> }
  | { type: 'START_GENERATION' }
  | { type: 'UPDATE_PROCESSING_STEP'; payload: ProcessingStep }
  | { type: 'UPDATE_PROGRESS'; payload: number }
  | { type: 'UPDATE_VIDEO_TASK'; payload: VideoTask }
  | { type: 'GENERATION_COMPLETE' }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'RESET_STATE' };

// Reducer
function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'ADD_IMAGES':
      return {
        ...state,
        uploadedImages: [...state.uploadedImages, ...action.payload].slice(0, 10),
      };
    case 'REMOVE_IMAGE':
      return {
        ...state,
        uploadedImages: state.uploadedImages.filter((img) => img.id !== action.payload),
      };
    case 'UPDATE_CONFIG':
      return {
        ...state,
        generationConfig: { ...state.generationConfig, ...action.payload },
      };
    case 'START_GENERATION':
      return {
        ...state,
        isGenerating: true,
        processingStep: ProcessingStep.ANALYZING_PHOTOS,
        progress: 0,
        error: null,
        videoTasks: state.uploadedImages.map((img) => ({
          id: `task-${img.id}`,
          imageId: img.id,
          status: 'pending' as const,
        })),
      };
    case 'UPDATE_PROCESSING_STEP':
      return {
        ...state,
        processingStep: action.payload,
      };
    case 'UPDATE_PROGRESS':
      return {
        ...state,
        progress: Math.min(100, Math.max(0, action.payload)),
      };
    case 'UPDATE_VIDEO_TASK':
      return {
        ...state,
        videoTasks: state.videoTasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case 'GENERATION_COMPLETE':
      return {
        ...state,
        isGenerating: false,
        progress: 100,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isGenerating: false,
      };
    case 'RESET_STATE':
      return initialState;
    default:
      return state;
  }
}

// Context 类型
interface AppContextType extends AppState {
  addImages: (images: UploadedImage[]) => void;
  removeImage: (id: string) => void;
  updateConfig: (config: Partial<GenerationConfig>) => void;
  startGeneration: () => void;
  updateProcessingStep: (step: ProcessingStep) => void;
  updateProgress: (progress: number) => void;
  updateVideoTask: (task: VideoTask) => void;
  generationComplete: () => void;
  setError: (error: string | null) => void;
  resetState: () => void;
}

// 创建 Context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider 组件
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const addImages = (images: UploadedImage[]) => {
    dispatch({ type: 'ADD_IMAGES', payload: images });
  };

  const removeImage = (id: string) => {
    dispatch({ type: 'REMOVE_IMAGE', payload: id });
  };

  const updateConfig = (config: Partial<GenerationConfig>) => {
    dispatch({ type: 'UPDATE_CONFIG', payload: config });
  };

  const startGeneration = () => {
    dispatch({ type: 'START_GENERATION' });
  };

  const updateProcessingStep = (step: ProcessingStep) => {
    dispatch({ type: 'UPDATE_PROCESSING_STEP', payload: step });
  };

  const updateProgress = (progress: number) => {
    dispatch({ type: 'UPDATE_PROGRESS', payload: progress });
  };

  const updateVideoTask = (task: VideoTask) => {
    dispatch({ type: 'UPDATE_VIDEO_TASK', payload: task });
  };

  const generationComplete = () => {
    dispatch({ type: 'GENERATION_COMPLETE' });
  };

  const setError = (error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  const resetState = () => {
    dispatch({ type: 'RESET_STATE' });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        addImages,
        removeImage,
        updateConfig,
        startGeneration,
        updateProcessingStep,
        updateProgress,
        updateVideoTask,
        generationComplete,
        setError,
        resetState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// 使用 Context 的 Hook
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
