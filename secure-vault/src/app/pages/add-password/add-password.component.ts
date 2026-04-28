import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordStorageService } from '../../services/password-storage.service';
import { PasswordStrengthService } from '../../services/password-strength.service';
import { PasswordGeneratorService } from '../../services/password-generator.service';
import { CategoryService } from '../../services/category.service';
import { Category, PasswordGeneratorOptions } from '../../types';
import { PasswordStrengthComponent } from '../../components/password-strength/password-strength.component';
import { PasswordGeneratorComponent } from '../../components/password-generator/password-generator.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-add-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PasswordStrengthComponent,
    PasswordGeneratorComponent,
    NzButtonModule,
    NzInputModule,
    NzSelectModule,
    NzFormModule,
    NzIconModule,
    NzCardModule,
    NzModalModule,
    NzMessageModule,
    NzTagModule
  ],
  template: `
    <div class="add-password-container">
      <div class="header-section">
        <button 
          nz-button 
          nzType="text"
          (click)="goBack()"
          class="back-btn"
        >
          <span nz-icon nzType="arrow-left" nzTheme="outline"></span>
          返回
        </button>
        <h1 class="page-title">添加新密码</h1>
        <p class="page-subtitle">填写以下信息来添加一个新的密码记录</p>
      </div>
      
      <div class="content-section">
        <nz-card class="form-card">
          <form [formGroup]="passwordForm" (ngSubmit)="onSubmit()" class="password-form">
            <div class="form-row">
              <nz-form-item class="form-item full-width">
                <nz-form-label [nzSpan]="24" nzRequired>标题</nz-form-label>
                <nz-form-control [nzSpan]="24" nzErrorTip="请输入标题">
                  <input 
                    nz-input 
                    formControlName="title"
                    placeholder="例如：Gmail 账号"
                    class="form-input"
                  />
                </nz-form-control>
              </nz-form-item>
            </div>
            
            <div class="form-row">
              <nz-form-item class="form-item">
                <nz-form-label [nzSpan]="24" nzRequired>用户名/邮箱</nz-form-label>
                <nz-form-control [nzSpan]="24" nzErrorTip="请输入用户名或邮箱">
                  <input 
                    nz-input 
                    formControlName="username"
                    placeholder="例如：user@example.com"
                    class="form-input"
                  />
                </nz-form-control>
              </nz-form-item>
              
              <nz-form-item class="form-item">
                <nz-form-label [nzSpan]="24" nzRequired>密码</nz-form-label>
                <nz-form-control [nzSpan]="24" nzErrorTip="请输入密码">
                  <div class="password-input-wrapper">
                    <input 
                      nz-input 
                      [type]="showPassword ? 'text' : 'password'"
                      formControlName="password"
                      placeholder="输入密码"
                      class="form-input password-input"
                    />
                    <button 
                      type="button"
                      nz-button 
                      nzType="text"
                      (click)="togglePassword()"
                      class="toggle-btn"
                    >
                      <span 
                        nz-icon 
                        [nzType]="showPassword ? 'eye-invisible' : 'eye'" 
                        nzTheme="outline"
                      ></span>
                    </button>
                    <button 
                      type="button"
                      nz-button 
                      nzType="text"
                      (click)="openGeneratorModal()"
                      class="generator-btn"
                      nz-tooltip
                      nzTooltipTitle="生成密码"
                    >
                      <span nz-icon nzType="swap" nzTheme="outline"></span>
                    </button>
                  </div>
                </nz-form-control>
              </nz-form-item>
            </div>
            
            <div class="password-strength-section" *ngIf="passwordForm.get('password')?.value">
              <app-password-strength 
                [password]="passwordForm.get('password')?.value"
                [showDetails]="true"
              ></app-password-strength>
            </div>
            
            <div class="form-row">
              <nz-form-item class="form-item">
                <nz-form-label [nzSpan]="24">网站地址</nz-form-label>
                <nz-form-control [nzSpan]="24">
                  <input 
                    nz-input 
                    formControlName="website"
                    placeholder="例如：https://www.example.com"
                    class="form-input"
                  />
                </nz-form-control>
              </nz-form-item>
              
              <nz-form-item class="form-item">
                <nz-form-label [nzSpan]="24" nzRequired>分类</nz-form-label>
                <nz-form-control [nzSpan]="24" nzErrorTip="请选择分类">
                  <nz-select 
                    formControlName="category"
                    placeholder="选择分类"
                    class="form-select"
                  >
                    <nz-option 
                      *ngFor="let category of categories"
                      [nzValue]="category.id"
                      [nzLabel]="category.name"
                    >
                      <span class="category-option">
                        <span 
                          nz-icon 
                          [nzType]="category.icon" 
                          nzTheme="outline"
                          [style.color]="category.color"
                        ></span>
                        {{ category.name }}
                      </span>
                    </nz-option>
                  </nz-select>
                </nz-form-control>
              </nz-form-item>
            </div>
            
            <div class="form-row">
              <nz-form-item class="form-item full-width">
                <nz-form-label [nzSpan]="24">标签</nz-form-label>
                <nz-form-control [nzSpan]="24">
                  <div class="tags-input-wrapper">
                    <nz-tag 
                      *ngFor="let tag of tags; let i = index"
                      [nzMode]="'closeable'"
                      (nzAfterClose)="removeTag(i)"
                      class="password-tag"
                    >
                      {{ tag }}
                    </nz-tag>
                    <input 
                      nz-input 
                      #tagInput
                      (keyup.enter)="addTagFromInput(tagInput)"
                      placeholder="输入标签后按回车添加"
                      class="tag-input"
                      style="width: 120px;"
                    />
                  </div>
                </nz-form-control>
              </nz-form-item>
            </div>
            
            <div class="form-row">
              <nz-form-item class="form-item full-width">
                <nz-form-label [nzSpan]="24">备注</nz-form-label>
                <nz-form-control [nzSpan]="24">
                  <textarea 
                    nz-input 
                    formControlName="notes"
                    rows="4"
                    placeholder="添加备注信息..."
                    class="form-textarea"
                  ></textarea>
                </nz-form-control>
              </nz-form-item>
            </div>
            
            <div class="form-actions">
              <button 
                type="button"
                nz-button 
                (click)="goBack()"
                class="cancel-btn"
              >
                取消
              </button>
              <button 
                type="submit"
                nz-button 
                nzType="primary"
                [disabled]="passwordForm.invalid || isSubmitting"
                class="submit-btn"
              >
                <span nz-icon nzType="check" nzTheme="outline" *ngIf="!isSubmitting"></span>
                <span nz-icon nzType="loading" nzTheme="outline" *ngIf="isSubmitting"></span>
                {{ isSubmitting ? '保存中...' : '保存密码' }}
              </button>
            </div>
          </form>
        </nz-card>
      </div>
    </div>
  `,
  styles: [`
    .add-password-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 24px;
      display: flex;
      flex-direction: column;
    }
    
    .header-section {
      text-align: center;
      margin-bottom: 24px;
      position: relative;
    }
    
    .back-btn {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      color: white;
      border-radius: 8px;
      padding: 8px 16px;
      transition: all 0.3s ease;
    }
    
    .back-btn:hover {
      background: rgba(255, 255, 255, 0.1);
    }
    
    .page-title {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
      color: white;
    }
    
    .page-subtitle {
      margin: 8px 0 0 0;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.8);
    }
    
    .content-section {
      flex: 1;
      display: flex;
      justify-content: center;
    }
    
    .form-card {
      width: 100%;
      max-width: 800px;
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    }
    
    .password-form {
      padding: 16px;
    }
    
    .form-row {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
      margin-bottom: 24px;
    }
    
    .form-row.full-width {
      grid-template-columns: 1fr;
    }
    
    .form-item {
      margin-bottom: 0;
    }
    
    .form-item.full-width {
      grid-column: 1 / -1;
    }
    
    .form-input {
      border-radius: 10px;
      padding: 12px 16px;
      font-size: 15px;
      transition: all 0.3s ease;
    }
    
    .form-input:focus {
      border-color: #667eea;
      box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
    }
    
    .form-select {
      width: 100%;
      border-radius: 10px;
    }
    
    .form-textarea {
      border-radius: 10px;
      resize: vertical;
    }
    
    .password-input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }
    
    .password-input {
      padding-right: 80px;
    }
    
    .toggle-btn, .generator-btn {
      position: absolute;
      right: 8px;
      padding: 8px;
      border-radius: 8px;
      color: #6b7280;
      transition: all 0.2s ease;
    }
    
    .toggle-btn {
      right: 48px;
    }
    
    .toggle-btn:hover, .generator-btn:hover {
      background-color: #f3f4f6;
      color: #667eea;
    }
    
    .password-strength-section {
      margin-bottom: 24px;
      padding: 16px;
      background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
      border-radius: 12px;
    }
    
    .tags-input-wrapper {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      border: 1px solid #d9d9d9;
      border-radius: 10px;
      min-height: 44px;
      transition: all 0.3s ease;
    }
    
    .tags-input-wrapper:focus-within {
      border-color: #667eea;
      box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
    }
    
    .tag-input {
      border: none;
      outline: none;
      padding: 4px 8px;
      font-size: 14px;
    }
    
    .password-tag {
      margin: 0;
      border-radius: 6px;
    }
    
    .category-option {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 16px;
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid #f0f0f0;
    }
    
    .cancel-btn {
      border-radius: 10px;
      padding: 12px 32px;
      font-weight: 600;
      transition: all 0.3s ease;
    }
    
    .cancel-btn:hover {
      border-color: #667eea;
      color: #667eea;
    }
    
    .submit-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      border-radius: 10px;
      padding: 12px 32px;
      font-weight: 600;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
      transition: all 0.3s ease;
    }
    
    .submit-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
    }
    
    .submit-btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
    
    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }
      
      .header-section {
        text-align: left;
      }
      
      .back-btn {
        position: static;
        transform: none;
        margin-bottom: 16px;
        padding-left: 0;
      }
      
      .form-actions {
        flex-direction: column;
      }
      
      .cancel-btn, .submit-btn {
        width: 100%;
      }
    }
  `]
})
export class AddPasswordComponent implements OnInit {
  passwordForm!: FormGroup;
  categories: Category[] = [];
  tags: string[] = [];
  newTag: string = '';
  showPassword: boolean = false;
  isSubmitting: boolean = false;
  
  constructor(
    private fb: FormBuilder,
    private passwordStorageService: PasswordStorageService,
    private passwordStrengthService: PasswordStrengthService,
    private categoryService: CategoryService,
    private router: Router,
    private modalService: NzModalService,
    private messageService: NzMessageService
  ) {}
  
  ngOnInit(): void {
    this.initForm();
    this.loadCategories();
  }
  
  private initForm(): void {
    this.passwordForm = this.fb.group({
      title: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      website: [''],
      category: ['', Validators.required],
      notes: ['']
    });
  }
  
  private loadCategories(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
      if (categories.length > 0) {
        this.passwordForm.patchValue({ category: 'other' });
      }
    });
  }
  
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
  
  addTagFromInput(input: HTMLInputElement): void {
    const tag = input.value.trim();
    if (tag && !this.tags.includes(tag)) {
      this.tags.push(tag);
      input.value = '';
    }
  }
  
  removeTag(index: number): void {
    this.tags.splice(index, 1);
  }
  
  openGeneratorModal(): void {
    const modal = this.modalService.create({
      nzTitle: '密码生成器',
      nzContent: PasswordGeneratorComponent,
      nzFooter: null,
      nzWidth: 500
    });
  }
  
  onSubmit(): void {
    if (this.passwordForm.invalid) {
      return;
    }
    
    this.isSubmitting = true;
    const formValue = this.passwordForm.value;
    const password = formValue.password;
    const strength = this.passwordStrengthService.checkStrength(password);
    
    this.passwordStorageService.addPassword({
      title: formValue.title,
      username: formValue.username,
      password: password,
      website: formValue.website || undefined,
      notes: formValue.notes || undefined,
      category: formValue.category,
      tags: this.tags,
      strength: strength
    }).subscribe({
      next: () => {
        this.messageService.success('密码保存成功！');
        this.isSubmitting = false;
        this.router.navigate(['/']);
      },
      error: () => {
        this.messageService.error('保存失败，请重试');
        this.isSubmitting = false;
      }
    });
  }
  
  goBack(): void {
    this.router.navigate(['/']);
  }
}
