export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  joinDate: Date;
  totalCoursesCompleted: number;
  totalHoursLearned: number;
  streakDays: number;
  level: string;
  levelProgress: number;
}
