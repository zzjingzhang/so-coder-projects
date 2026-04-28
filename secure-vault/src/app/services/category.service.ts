import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Category } from '../types';
import { PasswordStorageService } from './password-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly STORAGE_KEY = 'secure_vault_categories';
  private categoriesSubject: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
  public categories$: Observable<Category[]> = this.categoriesSubject.asObservable();

  private defaultCategories: Category[] = [
    { id: 'social', name: '社交媒体', icon: 'share-alt', color: '#1890ff' },
    { id: 'work', name: '工作', icon: 'build', color: '#52c41a' },
    { id: 'finance', name: '金融', icon: 'dollar', color: '#faad14' },
    { id: 'shopping', name: '购物', icon: 'shopping-cart', color: '#eb2f96' },
    { id: 'entertainment', name: '娱乐', icon: 'video-camera', color: '#722ed1' },
    { id: 'other', name: '其他', icon: 'appstore', color: '#8c8c8c' }
  ];

  constructor(private passwordStorageService: PasswordStorageService) {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const categories = JSON.parse(stored);
        this.categoriesSubject.next(categories);
      } else {
        this.categoriesSubject.next(this.defaultCategories);
        this.saveToStorage(this.defaultCategories);
      }
    } catch (error) {
      console.error('Failed to load categories from storage:', error);
      this.categoriesSubject.next(this.defaultCategories);
    }
  }

  private saveToStorage(categories: Category[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(categories));
    } catch (error) {
      console.error('Failed to save categories to storage:', error);
    }
  }

  getCategories(): Observable<Category[]> {
    return this.categories$.pipe(
      switchMap(categories => {
        return this.passwordStorageService.getPasswords().pipe(
          map(passwords => {
            const categoryCounts: Record<string, number> = {};
            passwords.forEach(p => {
              categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
            });
            
            return categories.map(category => ({
              ...category,
              count: categoryCounts[category.id] || 0
            }));
          })
        );
      })
    );
  }

  getCategoryById(id: string): Observable<Category | undefined> {
    return this.categories$.pipe(
      map(categories => categories.find(c => c.id === id))
    );
  }

  addCategory(category: Omit<Category, 'id' | 'count'>): Observable<Category> {
    const newCategory: Category = {
      ...category,
      id: this.generateId()
    };
    
    const currentCategories = this.categoriesSubject.value;
    const updatedCategories = [...currentCategories, newCategory];
    
    this.categoriesSubject.next(updatedCategories);
    this.saveToStorage(updatedCategories);
    
    return of(newCategory);
  }

  updateCategory(id: string, updates: Partial<Category>): Observable<Category | undefined> {
    const currentCategories = this.categoriesSubject.value;
    const index = currentCategories.findIndex(c => c.id === id);
    
    if (index === -1) {
      return of(undefined);
    }
    
    const updatedCategory: Category = {
      ...currentCategories[index],
      ...updates
    };
    
    const updatedCategories = [...currentCategories];
    updatedCategories[index] = updatedCategory;
    
    this.categoriesSubject.next(updatedCategories);
    this.saveToStorage(updatedCategories);
    
    return of(updatedCategory);
  }

  deleteCategory(id: string): Observable<boolean> {
    const currentCategories = this.categoriesSubject.value;
    const index = currentCategories.findIndex(c => c.id === id);
    
    if (index === -1) {
      return of(false);
    }
    
    const updatedCategories = currentCategories.filter(c => c.id !== id);
    
    this.categoriesSubject.next(updatedCategories);
    this.saveToStorage(updatedCategories);
    
    return of(true);
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
