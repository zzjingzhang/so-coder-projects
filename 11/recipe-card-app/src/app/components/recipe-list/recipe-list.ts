import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  standalone: false,
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css'
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  categories: string[] = [];
  selectedCategory: string = 'all';
  searchKeyword: string = '';
  filteredRecipes: Recipe[] = [];

  constructor(
    private recipeService: RecipeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCategories();
    this.loadRecipes();
  }

  loadCategories(): void {
    this.recipeService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      }
    });
  }

  loadRecipes(): void {
    if (this.selectedCategory === 'all') {
      this.recipeService.getRecipes().subscribe({
        next: (recipes) => {
          this.recipes = recipes;
          this.filterRecipes();
        },
        error: (err) => {
          console.error('Error loading recipes:', err);
        }
      });
    } else {
      this.recipeService.getRecipesByCategory(this.selectedCategory).subscribe({
        next: (recipes) => {
          this.recipes = recipes;
          this.filterRecipes();
        },
        error: (err) => {
          console.error('Error loading recipes by category:', err);
        }
      });
    }
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.loadRecipes();
  }

  onSearch(): void {
    this.filterRecipes();
  }

  filterRecipes(): void {
    if (this.searchKeyword.trim()) {
      const keyword = this.searchKeyword.toLowerCase();
      this.filteredRecipes = this.recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(keyword) ||
        recipe.description.toLowerCase().includes(keyword) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(keyword))
      );
    } else {
      this.filteredRecipes = this.recipes;
    }
  }

  viewRecipe(id: string): void {
    this.router.navigate(['/recipe', id]);
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
}
