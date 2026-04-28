import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PasswordGeneratorOptions } from '../../types';
import { PasswordGeneratorService } from '../../services/password-generator.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-password-generator',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzSliderModule,
    NzCheckboxModule,
    NzInputModule,
    NzIconModule,
    NzToolTipModule
  ],
  template: `
    <div class="password-generator-container">
      <div class="password-display">
        <input 
          type="text" 
          [value]="generatedPassword" 
          readonly
          class="password-input"
          placeholder="点击生成密码"
        />
        <div class="password-actions">
          <button 
            nz-button 
            nzType="text"
            nz-tooltip
            nzTooltipTitle="复制密码"
            (click)="copyPassword()"
            class="action-btn"
          >
            <span nz-icon nzType="copy" nzTheme="outline"></span>
          </button>
          <button 
            nz-button 
            nzType="text"
            nz-tooltip
            nzTooltipTitle="重新生成"
            (click)="generatePassword()"
            class="action-btn"
          >
            <span nz-icon nzType="reload" nzTheme="outline"></span>
          </button>
        </div>
      </div>
      
      <div class="generator-options">
        <div class="option-group">
          <label class="option-label">密码长度: {{ options.length }}</label>
          <nz-slider 
            [(ngModel)]="options.length" 
            [nzMin]="8" 
            [nzMax]="32"
            [nzStep]="1"
            class="length-slider"
          ></nz-slider>
        </div>
        
        <div class="checkbox-group">
          <div class="checkbox-row">
            <label nz-checkbox [(ngModel)]="options.includeLowercase">
              小写字母 (a-z)
            </label>
            <label nz-checkbox [(ngModel)]="options.includeUppercase">
              大写字母 (A-Z)
            </label>
          </div>
          <div class="checkbox-row">
            <label nz-checkbox [(ngModel)]="options.includeNumbers">
              数字 (0-9)
            </label>
            <label nz-checkbox [(ngModel)]="options.includeSymbols">
              特殊符号 (!&#64;#$%^&*)
            </label>
          </div>
          <div class="checkbox-row">
            <label nz-checkbox [(ngModel)]="options.excludeAmbiguous">
              排除易混淆字符 (0, O, l, I)
            </label>
          </div>
        </div>
      </div>
      
      <div class="generator-actions">
        <button 
          nz-button 
          nzType="primary"
          (click)="generatePassword()"
          class="generate-btn"
        >
          <span nz-icon nzType="plus" nzTheme="outline"></span>
          生成密码
        </button>
        <button 
          nz-button 
          *ngIf="generatedPassword"
          (click)="usePassword()"
          class="use-btn"
        >
          <span nz-icon nzType="check" nzTheme="outline"></span>
          使用此密码
        </button>
      </div>
    </div>
  `,
  styles: [`
    .password-generator-container {
      background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    
    .password-display {
      display: flex;
      align-items: center;
      background: white;
      border-radius: 12px;
      padding: 16px 20px;
      margin-bottom: 24px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      position: relative;
    }
    
    .password-input {
      flex: 1;
      border: none;
      outline: none;
      font-size: 18px;
      font-family: 'Courier New', monospace;
      background: transparent;
      color: #1f2937;
    }
    
    .password-input::placeholder {
      color: #9ca3af;
    }
    
    .password-actions {
      display: flex;
      gap: 8px;
    }
    
    .action-btn {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }
    
    .action-btn:hover {
      background-color: #f0f9ff;
      transform: scale(1.05);
    }
    
    .action-btn:active {
      transform: scale(0.95);
    }
    
    .generator-options {
      margin-bottom: 24px;
    }
    
    .option-group {
      margin-bottom: 20px;
    }
    
    .option-label {
      display: block;
      font-weight: 600;
      color: #374151;
      margin-bottom: 12px;
    }
    
    .length-slider {
      width: 100%;
    }
    
    .checkbox-group {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    .checkbox-row {
      display: flex;
      gap: 24px;
    }
    
    .checkbox-row nz-checkbox {
      flex: 1;
      min-width: 0;
    }
    
    .checkbox-group nz-checkbox {
      display: inline-flex !important;
      align-items: center !important;
      font-size: 14px;
      color: #4b5563;
      line-height: 1.5;
    }
    
    .checkbox-group ::ng-deep .ant-checkbox-wrapper {
      display: inline-flex !important;
      align-items: center !important;
      line-height: 1.5;
    }
    
    .checkbox-group ::ng-deep .ant-checkbox {
      margin-right: 8px;
      top: 0;
    }
    
    .checkbox-group ::ng-deep .ant-checkbox + span {
      padding-inline-start: 0;
      padding-inline-end: 0;
      display: inline-flex;
      align-items: center;
      line-height: 1.5;
    }
    
    .generator-actions {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
    }
    
    .generate-btn {
      background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
      border: none;
      font-weight: 600;
      border-radius: 10px;
      padding: 12px 24px;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(14, 165, 233, 0.4);
    }
    
    .generate-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(14, 165, 233, 0.5);
    }
    
    .generate-btn:active {
      transform: translateY(0);
    }
    
    .use-btn {
      background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
      border: none;
      color: white;
      font-weight: 600;
      border-radius: 10px;
      padding: 12px 24px;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(34, 197, 94, 0.4);
    }
    
    .use-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(34, 197, 94, 0.5);
      color: white;
    }
    
    .use-btn:active {
      transform: translateY(0);
    }
  `]
})
export class PasswordGeneratorComponent implements OnInit {
  @Output() passwordSelected = new EventEmitter<string>();
  
  generatedPassword: string = '';
  options: PasswordGeneratorOptions;
  
  constructor(
    private passwordGeneratorService: PasswordGeneratorService,
    private modalRef: NzModalRef
  ) {
    this.options = this.passwordGeneratorService.getDefaultOptions();
  }
  
  ngOnInit(): void {}
  
  generatePassword(): void {
    this.generatedPassword = this.passwordGeneratorService.generatePassword(this.options);
  }
  
  copyPassword(): void {
    if (this.generatedPassword) {
      navigator.clipboard.writeText(this.generatedPassword).then(() => {
        console.log('密码已复制到剪贴板');
      }).catch(err => {
        console.error('复制失败:', err);
      });
    }
  }
  
  usePassword(): void {
    if (this.generatedPassword) {
      this.passwordSelected.emit(this.generatedPassword);
      this.modalRef.close(this.generatedPassword);
    }
  }
}
