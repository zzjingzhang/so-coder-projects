export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: Date;
  category: 'learning' | 'streak' | 'social' | 'milestone';
}
