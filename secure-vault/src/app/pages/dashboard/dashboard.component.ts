import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PasswordEntry, SearchFilter } from '../../types';
import { PasswordStorageService } from '../../services/password-storage.service';
import { PasswordCardComponent } from '../../components/password-card/password-card.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { CategoryFilterComponent } from '../../components/category-filter/category-filter.component';
import { PasswordGeneratorComponent } from '../../components/password-generator/password-generator.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    PasswordCardComponent,
    SearchBarComponent,
    CategoryFilterComponent,
    PasswordGeneratorComponent,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzEmptyModule,
    NzSpinModule
  ],
  template: `
    <div class="dashboard-container">
      <div class="dashboard-header">
        <div class="header-title">
          <h1 class="title">密码管理器</h1>
          <p class="subtitle">安全存储和管理您的所有密码</p>
        </div>
        
        <div class="header-actions">
          <button 
            nz-button 
            nzType="primary"
            (click)="openGeneratorModal()"
            class="action-btn generate-btn"
          >
            <span nz-icon nzType="plus-circle" nzTheme="outline"></span>
            生成密码
          </button>
          <button 
            nz-button 
            nzType="primary"
            (click)="navigateToAdd()"
            class="action-btn add-btn"
          >
            <span nz-icon nzType="plus" nzTheme="outline"></span>
            添加密码
          </button>
        </div>
      </div>
      
      <div class="dashboard-content">
        <div class="sidebar-section">
          <app-category-filter 
            (categorySelected)="onCategorySelected($event)"
          ></app-category-filter>
        </div>
        
        <div class="main-section">
          <div class="search-section">
            <app-search-bar 
              (search)="onSearch($event)"
            ></app-search-bar>
          </div>
          
          <div class="stats-section" *ngIf="passwords.length > 0">
            <div class="stat-card">
              <div class="stat-icon total">
                <span nz-icon nzType="lock" nzTheme="outline"></span>
              </div>
              <div class="stat-info">
                <span class="stat-value">{{ passwords.length }}</span>
                <span class="stat-label">总密码数</span>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-icon strong">
                <span nz-icon nzType="check-circle" nzTheme="outline"></span>
              </div>
              <div class="stat-info">
                <span class="stat-value">{{ strongPasswordsCount }}</span>
                <span class="stat-label">强密码</span>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-icon weak">
                <span nz-icon nzType="exclamation-circle" nzTheme="outline"></span>
              </div>
              <div class="stat-info">
                <span class="stat-value">{{ weakPasswordsCount }}</span>
                <span class="stat-label">弱密码</span>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-icon recent">
                <span nz-icon nzType="clock-circle" nzTheme="outline"></span>
              </div>
              <div class="stat-info">
                <span class="stat-value">{{ recentlyAddedCount }}</span>
                <span class="stat-label">最近添加</span>
              </div>
            </div>
          </div>
          
          <div class="passwords-section" *ngIf="!isLoading">
            <div class="section-header">
              <h2 class="section-title">
                {{ selectedCategory ? '分类: ' + (selectedCategoryName || selectedCategory) : '所有密码' }}
              </h2>
              <span class="password-count">
                共 {{ filteredPasswords.length }} 个密码
              </span>
            </div>
            
            <div 
              *ngIf="filteredPasswords.length === 0"
              class="empty-state"
            >
              <div class="empty-content">
                <span nz-icon nzType="inbox" nzTheme="outline" class="empty-icon"></span>
                <h3>暂无密码记录</h3>
                <p>点击下方按钮添加您的第一个密码</p>
                <button 
                  nz-button 
                  nzType="primary"
                  (click)="navigateToAdd()"
                  class="add-first-btn"
                >
                  <span nz-icon nzType="plus" nzTheme="outline"></span>
                  添加第一个密码
                </button>
              </div>
            </div>
            
            <div class="passwords-grid" *ngIf="filteredPasswords.length > 0">
              <app-password-card 
                *ngFor="let password of filteredPasswords; trackBy: trackByPasswordId"
                [password]="password"
                (edit)="navigateToEdit($event)"
                (delete)="deletePassword($event)"
                class="password-card-item"
              ></app-password-card>
            </div>
          </div>
          
          <div class="loading-state" *ngIf="isLoading">
            <nz-spin nzSize="large"></nz-spin>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 24px;
    }
    
    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      padding: 20px;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 16px;
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    
    .header-title .title {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .header-title .subtitle {
      margin: 4px 0 0 0;
      font-size: 14px;
      color: #6b7280;
    }
    
    .header-actions {
      display: flex;
      gap: 12px;
    }
    
    .action-btn {
      font-weight: 600;
      border-radius: 10px;
      padding: 12px 20px;
      transition: all 0.3s ease;
    }
    
    .generate-btn {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      border: none;
      color: white;
      box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
    }
    
    .generate-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(16, 185, 129, 0.5);
      color: white;
    }
    
    .add-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      color: white;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    }
    
    .add-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
      color: white;
    }
    
    .dashboard-content {
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: 24px;
    }
    
    .sidebar-section {
      position: sticky;
      top: 24px;
      height: fit-content;
    }
    
    .main-section {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    
    .search-section {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 16px;
      padding: 20px;
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    
    .stats-section {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
    }
    
    .stat-card {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 12px;
      padding: 16px;
      display: flex;
      align-items: center;
      gap: 12px;
      backdrop-filter: blur(10px);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
    }
    
    .stat-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
    }
    
    .stat-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
    }
    
    .stat-icon.total {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    
    .stat-icon.strong {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
    }
    
    .stat-icon.weak {
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      color: white;
    }
    
    .stat-icon.recent {
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      color: white;
    }
    
    .stat-info {
      display: flex;
      flex-direction: column;
    }
    
    .stat-value {
      font-size: 24px;
      font-weight: 700;
      color: #1f2937;
    }
    
    .stat-label {
      font-size: 12px;
      color: #6b7280;
      font-weight: 500;
    }
    
    .passwords-section {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 16px;
      padding: 24px;
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 1px solid #f3f4f6;
    }
    
    .section-title {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: #1f2937;
    }
    
    .password-count {
      font-size: 14px;
      color: #6b7280;
      font-weight: 500;
    }
    
    .empty-state {
      padding: 48px 0;
      display: flex;
      justify-content: center;
    }
    
    .empty-content {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .empty-icon {
      font-size: 64px;
      color: #d1d5db;
      margin-bottom: 16px;
    }
    
    .empty-content h3 {
      margin: 0 0 8px 0;
      font-size: 18px;
      font-weight: 600;
      color: #374151;
    }
    
    .empty-content p {
      margin: 0 0 24px 0;
      color: #6b7280;
      font-size: 14px;
    }
    
    .add-first-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      color: white;
      font-weight: 600;
      border-radius: 10px;
      padding: 12px 24px;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    }
    
    .add-first-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
      color: white;
    }
    
    .passwords-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 20px;
    }
    
    .password-card-item {
      transition: all 0.3s ease;
    }
    
    .password-card-item:hover {
      transform: translateY(-4px);
    }
    
    .loading-state {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 64px;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 16px;
    }
    
    @media (max-width: 1200px) {
      .stats-section {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (max-width: 992px) {
      .dashboard-content {
        grid-template-columns: 1fr;
      }
      
      .sidebar-section {
        position: static;
      }
      
      .passwords-grid {
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      }
    }
    
    @media (max-width: 640px) {
      .dashboard-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }
      
      .header-actions {
        width: 100%;
      }
      
      .action-btn {
        flex: 1;
      }
      
      .stats-section {
        grid-template-columns: 1fr;
      }
      
      .passwords-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  passwords: PasswordEntry[] = [];
  filteredPasswords: PasswordEntry[] = [];
  isLoading: boolean = true;
  
  private searchQuery: string = '';
  selectedCategory: string | null = null;
  selectedCategoryName: string | null = null;
  
  get strongPasswordsCount(): number {
    return this.passwords.filter(p => 
      p.strength.level === 'strong' || p.strength.level === 'very-strong'
    ).length;
  }
  
  get weakPasswordsCount(): number {
    return this.passwords.filter(p => 
      p.strength.level === 'weak'
    ).length;
  }
  
  get recentlyAddedCount(): number {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return this.passwords.filter(p => new Date(p.createdAt) > oneWeekAgo).length;
  }
  
  constructor(
    private passwordStorageService: PasswordStorageService,
    private router: Router,
    private modalService: NzModalService
  ) {}
  
  ngOnInit(): void {
    this.passwordStorageService.getPasswords().subscribe(passwords => {
      this.passwords = passwords;
      this.applyFilters();
      this.isLoading = false;
    });
  }
  
  onSearch(query: string): void {
    this.searchQuery = query;
    this.applyFilters();
  }
  
  onCategorySelected(categoryId: string | null): void {
    this.selectedCategory = categoryId;
    this.applyFilters();
  }
  
  private applyFilters(): void {
    let filtered = [...this.passwords];
    
    if (this.selectedCategory) {
      filtered = filtered.filter(p => p.category === this.selectedCategory);
    }
    
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.username.toLowerCase().includes(query) ||
        (p.website && p.website.toLowerCase().includes(query)) ||
        (p.notes && p.notes.toLowerCase().includes(query)) ||
        p.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    this.filteredPasswords = filtered;
  }
  
  navigateToAdd(): void {
    this.router.navigate(['/add']);
  }
  
  navigateToEdit(id: string): void {
    this.router.navigate(['/edit', id]);
  }
  
  deletePassword(id: string): void {
    this.passwordStorageService.deletePassword(id).subscribe(success => {
      if (success) {
        console.log('密码已删除');
      }
    });
  }
  
  openGeneratorModal(): void {
    this.modalService.create({
      nzTitle: '密码生成器',
      nzContent: PasswordGeneratorComponent,
      nzFooter: null,
      nzWidth: 500,
      nzOnOk: () => console.log('OK')
    });
  }
  
  trackByPasswordId(index: number, password: PasswordEntry): string {
    return password.id;
  }
}
