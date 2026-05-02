import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe, Ingredient } from '../../models/recipe.model';

interface GroupedIngredients {
  [key: string]: Ingredient[];
}

@Component({
  selector: 'app-recipe-detail',
  standalone: false,
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css'
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe | undefined;
  groupedIngredients: GroupedIngredients = {};
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) { }

  ngOnInit(): void {
    this.loadRecipe();
  }

  loadRecipe(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.recipeService.getRecipeById(id).subscribe({
        next: (recipe) => {
          this.recipe = recipe;
          if (recipe) {
            this.groupIngredientsByCategory(recipe.ingredients);
          }
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading recipe:', err);
          this.loading = false;
        }
      });
    }
  }

  groupIngredientsByCategory(ingredients: Ingredient[]): void {
    this.groupedIngredients = ingredients.reduce((acc, ingredient) => {
      const category = ingredient.category || '其他';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(ingredient);
      return acc;
    }, {} as GroupedIngredients);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  getDifficultyColor(difficulty: string): string {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  getDifficultyLabel(difficulty: string): string {
    switch (difficulty) {
      case 'easy': return '简单';
      case 'medium': return '中等';
      case 'hard': return '困难';
      default: return difficulty;
    }
  }

  getCategoryIcon(category: string): string {
    const icons: { [key: string]: string } = {
      '主食': 'grain',
      '蔬菜': 'local_florist',
      '水果': 'local_dining',
      '肉类': 'set_meal',
      '海鲜': 'water_drop',
      '奶制品': 'icecream',
      '蛋类': 'egg',
      '豆制品': 'density_small',
      '坚果': 'forest',
      '豆类': 'eco',
      '香草': 'grass',
      '调味品': 'tune',
      '油类': 'oil_barrel',
      '糖': 'cookie',
      '其他': 'more_horiz'
    };
    return icons[category] || 'restaurant';
  }

  getIngredientCategoryColor(category: string): string {
    const colors: { [key: string]: string } = {
      '主食': 'bg-amber-50 border-amber-200',
      '蔬菜': 'bg-green-50 border-green-200',
      '水果': 'bg-pink-50 border-pink-200',
      '肉类': 'bg-red-50 border-red-200',
      '海鲜': 'bg-blue-50 border-blue-200',
      '奶制品': 'bg-cyan-50 border-cyan-200',
      '蛋类': 'bg-yellow-50 border-yellow-200',
      '豆制品': 'bg-lime-50 border-lime-200',
      '坚果': 'bg-orange-50 border-orange-200',
      '豆类': 'bg-emerald-50 border-emerald-200',
      '香草': 'bg-teal-50 border-teal-200',
      '调味品': 'bg-gray-50 border-gray-200',
      '油类': 'bg-indigo-50 border-indigo-200',
      '糖': 'bg-rose-50 border-rose-200',
      '其他': 'bg-gray-50 border-gray-200'
    };
    return colors[category] || 'bg-gray-50 border-gray-200';
  }

  get ingredientCategories(): string[] {
    return Object.keys(this.groupedIngredients);
  }
}
