import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, NzInputModule, NzIconModule, NzButtonModule],
  template: `
    <div class="search-bar-container">
      <div class="search-input-wrapper">
        <span nz-icon nzType="search" nzTheme="outline" class="search-icon"></span>
        <input 
          type="text" 
          [(ngModel)]="searchQuery"
          (ngModelChange)="onSearchChange()"
          placeholder="搜索密码、用户名、网站或标签..."
          class="search-input"
        />
        <button 
          *ngIf="searchQuery"
          nz-button 
          nzType="text"
          (click)="clearSearch()"
          class="clear-btn"
        >
          <span nz-icon nzType="close-circle" nzTheme="outline"></span>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .search-bar-container {
      width: 100%;
    }
    
    .search-input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      background: white;
      border-radius: 12px;
      padding: 8px 16px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }
    
    .search-input-wrapper:focus-within {
      border-color: #0ea5e9;
      box-shadow: 0 4px 15px rgba(14, 165, 233, 0.2);
      transform: translateY(-1px);
    }
    
    .search-icon {
      color: #9ca3af;
      font-size: 18px;
      margin-right: 12px;
      transition: color 0.3s ease;
    }
    
    .search-input-wrapper:focus-within .search-icon {
      color: #0ea5e9;
    }
    
    .search-input {
      flex: 1;
      border: none;
      outline: none;
      font-size: 16px;
      background: transparent;
      color: #1f2937;
    }
    
    .search-input::placeholder {
      color: #9ca3af;
    }
    
    .clear-btn {
      color: #9ca3af;
      transition: all 0.2s ease;
      padding: 4px;
    }
    
    .clear-btn:hover {
      color: #ef4444;
      transform: scale(1.1);
    }
  `]
})
export class SearchBarComponent implements OnInit {
  @Output() search = new EventEmitter<string>();
  
  searchQuery: string = '';
  private searchSubject = new Subject<string>();
  
  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(300)
    ).subscribe(query => {
      this.search.emit(query);
    });
  }
  
  onSearchChange(): void {
    this.searchSubject.next(this.searchQuery);
  }
  
  clearSearch(): void {
    this.searchQuery = '';
    this.search.emit('');
  }
}
