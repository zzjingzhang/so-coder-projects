export enum HolidayTheme {
  CHRISTMAS = 'christmas',
  NEW_YEAR = 'new_year',
  BIRTHDAY = 'birthday',
  WEDDING = 'wedding',
}

export enum VideoStyle {
  CINEMATIC = 'cinematic',
  DREAMY = 'dreamy',
  ENERGETIC = 'energetic',
  ELEGANT = 'elegant',
}

export enum ProcessingStep {
  ANALYZING_PHOTOS = 'analyzing_photos',
  SUBMITTING_TASKS = 'submitting_tasks',
  CREATING_VIDEOS = 'creating_videos',
  FINALIZING = 'finalizing',
}

export interface UploadedImage {
  id: string;
  file: File;
  previewUrl: string;
}

export interface VideoTask {
  id: string;
  imageId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  videoUrl?: string;
  error?: string;
}

export interface GenerationConfig {
  theme: HolidayTheme;
  style: VideoStyle;
}

export interface AppState {
  uploadedImages: UploadedImage[];
  generationConfig: GenerationConfig;
  processingStep: ProcessingStep;
  progress: number;
  videoTasks: VideoTask[];
  isGenerating: boolean;
  error: string | null;
}
