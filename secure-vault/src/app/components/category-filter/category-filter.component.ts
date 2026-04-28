import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from '../../types';
import { CategoryService } from '../../services/category.service';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [CommonModule, NzTagModule, NzIconModule, NzButtonModule],
  template: `
    <div class="category-filter-container">
      <div class="category-header">
        <span class="category-title">
          <span nz-icon nzType="appstore" nzTheme="outline" class="title-icon"></span>
          分类
        </span>
        <button 
          nz-button 
          nzType="text"
          (click)="clearSelection()"
          *ngIf="selectedCategory"
          class="clear-filter-btn"
        >
          清除筛选
        </button>
      </div>
      
      <div class="category-list">
        <div 
          class="category-item"
          [ngClass]="{'selected': !selectedCategory}"
          (click)="selectCategory(null)"
        >
          <div class="category-icon-wrapper all-icon">
            <span nz-icon nzType="appstore" nzTheme="outline"></span>
          </div>
          <div class="category-info">
            <span class="category-name">全部</span>
            <span class="category-count">{{ totalCount }}</span>
          </div>
        </div>
        
        <div 
          class="category-item"
          *ngFor="let category of categories"
          [ngClass]="{'selected': selectedCategory === category.id}"
          (click)="selectCategory(category.id)"
        >
          <div 
            class="category-icon-wrapper"
            [style.backgroundColor]="category.color + '20'"
          >
            <span 
              nz-icon 
              [nzType]="category.icon" 
              nzTheme="outline"
              [style.color]="category.color"
            ></span>
          </div>
          <div class="category-info">
            <span class="category-name">{{ category.name }}</span>
            <span class="category-count">{{ category.count || 0 }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .category-filter-container {
      background: white;
      border-radius: 16px;
      padding: 20px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    
    .category-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    
    .category-title {
      font-weight: 600;
      font-size: 16px;
      color: #1f2937;
      display: flex;
      align-items: center;
    }
    
    .title-icon {
      margin-right: 8px;
      color: #0ea5e9;
    }
    
    .clear-filter-btn {
      color: #6b7280;
      font-size: 12px;
      padding: 4px 8px;
      border-radius: 6px;
      transition: all 0.2s ease;
    }
    
    .clear-filter-btn:hover {
      color: #0ea5e9;
      background-color: #f0f9ff;
    }
    
    .category-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .category-item {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }
    
    .category-item:hover {
      background-color: #f9fafb;
      transform: translateX(4px);
    }
    
    .category-item.selected {
      background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
      border-color: #0ea5e9;
    }
    
    .category-icon-wrapper {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 12px;
      transition: all 0.3s ease;
    }
    
    .category-item:hover .category-icon-wrapper {
      transform: scale(1.1);
    }
    
    .all-icon {
      background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%);
    }
    
    .all-icon span {
      color: #6b7280;
    }
    
    .category-info {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .category-name {
      font-weight: 500;
      color: #374151;
      font-size: 14px;
    }
    
    .category-item.selected .category-name {
      color: #0ea5e9;
    }
    
    .category-count {
      background-color: #f3f4f6;
      color: #6b7280;
      font-size: 12px;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 12px;
      transition: all 0.3s ease;
    }
    
    .category-item.selected .category-count {
      background-color: #0ea5e9;
      color: white;
    }
  `]
})
export class CategoryFilterComponent implements OnInit {
  @Output() categorySelected = new EventEmitter<string | null>();
  
  categories: Category[] = [];
  selectedCategory: string | null = null;
  
  get totalCount(): number {
    return this.categories.reduce((sum, cat) => sum + (cat.count || 0), 0);
  }
  
  constructor(private categoryService: CategoryService) {}
  
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }
  
  selectCategory(categoryId: string | null): void {
    this.selectedCategory = categoryId;
    this.categorySelected.emit(categoryId);
  }
  
  clearSelection(): void {
    this.selectCategory(null);
  }
}
