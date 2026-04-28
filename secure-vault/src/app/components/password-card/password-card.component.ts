import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordEntry, Category } from '../../types';
import { PasswordStrengthService } from '../../services/password-strength.service';
import { CategoryService } from '../../services/category.service';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@Component({
  selector: 'app-password-card',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzButtonModule,
    NzIconModule,
    NzTagModule,
    NzToolTipModule,
    NzPopconfirmModule
  ],
  template: `
    <nz-card 
      class="password-card"
      [nzBordered]="false"
      nzHoverable
    >
      <div class="card-header">
        <div class="card-title-section">
          <div 
            class="category-badge"
            [style.backgroundColor]="category?.color + '20'"
          >
            <span 
              nz-icon 
              [nzType]="category?.icon || 'appstore'" 
              nzTheme="outline"
              [style.color]="category?.color || '#8c8c8c'"
            ></span>
          </div>
          <div class="title-info">
            <h3 class="card-title">{{ password.title }}</h3>
            <span class="category-name">{{ category?.name || '未分类' }}</span>
          </div>
        </div>
        
        <div class="strength-indicator" *ngIf="password.strength">
          <div 
            class="strength-dot"
            [ngClass]="{
              'weak': password.strength.level === 'weak',
              'medium': password.strength.level === 'medium',
              'strong': password.strength.level === 'strong',
              'very-strong': password.strength.level === 'very-strong'
            }"
            nz-tooltip
            [nzTooltipTitle]="strengthService.getStrengthLabel(password.strength.level)"
          ></div>
        </div>
      </div>
      
      <div class="card-content">
        <div class="info-row">
          <span class="info-label">
            <span nz-icon nzType="user" nzTheme="outline"></span>
            用户名
          </span>
          <div class="info-value-wrapper">
            <span class="info-value">{{ password.username }}</span>
            <button 
              nz-button 
              nzType="text"
              nz-tooltip
              nzTooltipTitle="复制用户名"
              (click)="copyToClipboard(password.username)"
              class="copy-btn"
            >
              <span nz-icon nzType="copy" nzTheme="outline"></span>
            </button>
          </div>
        </div>
        
        <div class="info-row">
          <span class="info-label">
            <span nz-icon nzType="lock" nzTheme="outline"></span>
            密码
          </span>
          <div class="info-value-wrapper">
            <span class="info-value password-mask" *ngIf="!showPassword">••••••••</span>
            <span class="info-value password-text" *ngIf="showPassword">{{ password.password }}</span>
            <div class="password-actions">
              <button 
                nz-button 
                nzType="text"
                nz-tooltip
                [nzTooltipTitle]="showPassword ? '隐藏密码' : '显示密码'"
                (click)="togglePassword()"
                class="action-btn"
              >
                <span 
                  nz-icon 
                  [nzType]="showPassword ? 'eye-invisible' : 'eye'" 
                  nzTheme="outline"
                ></span>
              </button>
              <button 
                nz-button 
                nzType="text"
                nz-tooltip
                nzTooltipTitle="复制密码"
                (click)="copyToClipboard(password.password)"
                class="copy-btn"
              >
                <span nz-icon nzType="copy" nzTheme="outline"></span>
              </button>
            </div>
          </div>
        </div>
        
        <div class="info-row" *ngIf="password.website">
          <span class="info-label">
            <span nz-icon nzType="global" nzTheme="outline"></span>
            网站
          </span>
          <div class="info-value-wrapper">
            <a 
              [href]="password.website" 
              target="_blank"
              class="website-link"
              (click)="onWebsiteClick()"
            >
              {{ password.website }}
            </a>
            <button 
              nz-button 
              nzType="text"
              nz-tooltip
              nzTooltipTitle="打开网站"
              (click)="openWebsite()"
              class="action-btn"
            >
              <span nz-icon nzType="export" nzTheme="outline"></span>
            </button>
          </div>
        </div>
      </div>
      
      <div class="card-tags" *ngIf="password.tags && password.tags.length > 0">
        <nz-tag 
          *ngFor="let tag of password.tags"
          [nzColor]="'blue'"
          class="password-tag"
        >
          {{ tag }}
        </nz-tag>
      </div>
      
      <div class="card-footer">
        <span class="last-updated">
          最后更新: {{ formatDate(password.updatedAt) }}
        </span>
        
        <div class="card-actions">
          <button 
            nz-button 
            nzType="text"
            nz-tooltip
            nzTooltipTitle="编辑"
            (click)="onEdit()"
            class="action-btn edit-btn"
          >
            <span nz-icon nzType="edit" nzTheme="outline"></span>
            编辑
          </button>
          <button 
            nz-button 
            nzType="text"
            nz-popconfirm
            nzPopconfirmTitle="确定要删除这个密码吗？"
            nzPopconfirmPlacement="top"
            (nzOnConfirm)="onDelete()"
            nz-tooltip
            nzTooltipTitle="删除"
            class="action-btn delete-btn"
          >
            <span nz-icon nzType="delete" nzTheme="outline"></span>
            删除
          </button>
        </div>
      </div>
    </nz-card>
  `,
  styles: [`
    .password-card {
      border-radius: 16px;
      overflow: hidden;
      transition: all 0.3s ease;
      background: white;
    }
    
    .password-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.15);
    }
    
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    
    .card-title-section {
      display: flex;
      align-items: center;
    }
    
    .category-badge {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 12px;
      transition: all 0.3s ease;
    }
    
    .password-card:hover .category-badge {
      transform: scale(1.1);
    }
    
    .category-badge span {
      font-size: 20px;
    }
    
    .title-info {
      display: flex;
      flex-direction: column;
    }
    
    .card-title {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 2px;
    }
    
    .category-name {
      font-size: 12px;
      color: #6b7280;
    }
    
    .strength-indicator {
      display: flex;
      align-items: center;
    }
    
    .strength-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      animation: pulse 2s infinite;
    }
    
    .strength-dot.weak {
      background-color: #ef4444;
      box-shadow: 0 0 8px rgba(239, 68, 68, 0.5);
    }
    
    .strength-dot.medium {
      background-color: #f59e0b;
      box-shadow: 0 0 8px rgba(245, 158, 11, 0.5);
    }
    
    .strength-dot.strong {
      background-color: #0ea5e9;
      box-shadow: 0 0 8px rgba(14, 165, 233, 0.5);
    }
    
    .strength-dot.very-strong {
      background-color: #22c55e;
      box-shadow: 0 0 8px rgba(34, 197, 94, 0.5);
    }
    
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.7;
      }
    }
    
    .card-content {
      margin-bottom: 16px;
    }
    
    .info-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid #f3f4f6;
    }
    
    .info-row:last-child {
      border-bottom: none;
    }
    
    .info-label {
      display: flex;
      align-items: center;
      font-size: 13px;
      color: #6b7280;
      font-weight: 500;
    }
    
    .info-label span {
      margin-right: 6px;
      font-size: 14px;
    }
    
    .info-value-wrapper {
      display: flex;
      align-items: center;
    }
    
    .info-value {
      font-size: 14px;
      font-weight: 500;
      color: #1f2937;
      margin-right: 8px;
    }
    
    .password-mask {
      font-family: 'Courier New', monospace;
      letter-spacing: 2px;
    }
    
    .password-text {
      font-family: 'Courier New', monospace;
      background-color: #f9fafb;
      padding: 2px 8px;
      border-radius: 4px;
    }
    
    .password-actions {
      display: flex;
      gap: 4px;
    }
    
    .website-link {
      color: #0ea5e9;
      text-decoration: none;
      transition: color 0.2s ease;
    }
    
    .website-link:hover {
      color: #0284c7;
      text-decoration: underline;
    }
    
    .action-btn {
      padding: 4px;
      border-radius: 6px;
      transition: all 0.2s ease;
    }
    
    .action-btn:hover {
      background-color: #f0f9ff;
      transform: scale(1.1);
    }
    
    .copy-btn {
      color: #6b7280;
    }
    
    .copy-btn:hover {
      color: #0ea5e9;
    }
    
    .card-tags {
      margin-bottom: 16px;
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    
    .password-tag {
      margin: 0;
      border-radius: 6px;
      font-size: 12px;
    }
    
    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 12px;
      border-top: 1px solid #f3f4f6;
    }
    
    .last-updated {
      font-size: 12px;
      color: #9ca3af;
    }
    
    .card-actions {
      display: flex;
      gap: 8px;
    }
    
    .edit-btn {
      color: #0ea5e9;
    }
    
    .edit-btn:hover {
      background-color: #f0f9ff;
    }
    
    .delete-btn {
      color: #ef4444;
    }
    
    .delete-btn:hover {
      background-color: #fef2f2;
    }
  `]
})
export class PasswordCardComponent implements OnInit {
  @Input() password!: PasswordEntry;
  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();
  
  showPassword: boolean = false;
  category: Category | undefined;
  
  constructor(
    public strengthService: PasswordStrengthService,
    private categoryService: CategoryService
  ) {}
  
  ngOnInit(): void {
    if (this.password.category) {
      this.categoryService.getCategoryById(this.password.category).subscribe(category => {
        this.category = category;
      });
    }
  }
  
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
  
  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      console.log('已复制到剪贴板');
    }).catch(err => {
      console.error('复制失败:', err);
    });
  }
  
  openWebsite(): void {
    if (this.password.website) {
      window.open(this.password.website, '_blank');
    }
  }
  
  onWebsiteClick(): void {
    // 可以在这里添加追踪逻辑
  }
  
  onEdit(): void {
    this.edit.emit(this.password.id);
  }
  
  onDelete(): void {
    this.delete.emit(this.password.id);
  }
  
  formatDate(date: Date): string {
    const d = new Date(date);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    
    if (diff < 60000) {
      return '刚刚';
    } else if (diff < 3600000) {
      return `${Math.floor(diff / 60000)} 分钟前`;
    } else if (diff < 86400000) {
      return `${Math.floor(diff / 3600000)} 小时前`;
    } else if (diff < 604800000) {
      return `${Math.floor(diff / 86400000)} 天前`;
    } else {
      return d.toLocaleDateString('zh-CN');
    }
  }
}
