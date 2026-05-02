export interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  videoUrl?: string;
}

export interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
  expanded?: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  image: string;
  chapters: Chapter[];
  progress: number;
  totalLessons: number;
  completedLessons: number;
  enrolledDate: Date;
  rating: number;
  studentsCount: number;
}
