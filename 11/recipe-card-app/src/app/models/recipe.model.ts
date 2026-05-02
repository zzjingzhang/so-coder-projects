import { Ingredient } from './ingredient.model';
import { Step } from './step.model';

export type { Ingredient };
export type { Step };

export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  prepTime: string;
  cookTime: string;
  totalTime: string;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  rating: number;
  ingredients: Ingredient[];
  steps: Step[];
  tags: string[];
  author?: string;
  createdAt?: Date;
}
