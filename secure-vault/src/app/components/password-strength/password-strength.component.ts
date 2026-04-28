import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordStrength } from '../../types';
import { PasswordStrengthService } from '../../services/password-strength.service';
import { NzProgressModule } from 'ng-zorro-antd/progress';

@Component({
  selector: 'app-password-strength',
  standalone: true,
  imports: [CommonModule, NzProgressModule],
  template: `
    <div class="password-strength-container">
      <div class="strength-bar">
        <div 
          class="strength-fill" 
          [ngClass]="{
            'weak': strength?.level === 'weak',
            'medium': strength?.level === 'medium',
            'strong': strength?.level === 'strong',
            'very-strong': strength?.level === 'very-strong'
          }"
          [style.width.%]="strengthPercentage"
        ></div>
      </div>
      
      <div class="strength-info">
        <span class="strength-label" [ngClass]="strengthService.getStrengthColor(strength?.level || 'weak')">
          {{ strengthService.getStrengthLabel(strength?.level || 'weak') }}
        </span>
        <span class="strength-score">
          评分: {{ strength?.score || 0 }}/10
        </span>
      </div>
      
      <div class="strength-details" *ngIf="showDetails && strength">
        <div class="detail-item" [ngClass]="{'valid': strength.details.hasLowerCase}">
          <span class="icon">{{ strength.details.hasLowerCase ? '✓' : '✗' }}</span>
          <span>包含小写字母</span>
        </div>
        <div class="detail-item" [ngClass]="{'valid': strength.details.hasUpperCase}">
          <span class="icon">{{ strength.details.hasUpperCase ? '✓' : '✗' }}</span>
          <span>包含大写字母</span>
        </div>
        <div class="detail-item" [ngClass]="{'valid': strength.details.hasNumbers}">
          <span class="icon">{{ strength.details.hasNumbers ? '✓' : '✗' }}</span>
          <span>包含数字</span>
        </div>
        <div class="detail-item" [ngClass]="{'valid': strength.details.hasSymbols}">
          <span class="icon">{{ strength.details.hasSymbols ? '✓' : '✗' }}</span>
          <span>包含特殊符号</span>
        </div>
        <div class="detail-item" [ngClass]="{'valid': strength.details.length >= 8}">
          <span class="icon">{{ strength.details.length >= 8 ? '✓' : '✗' }}</span>
          <span>长度至少8个字符</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .password-strength-container {
      width: 100%;
    }
    
    .strength-bar {
      height: 8px;
      background-color: #e5e7eb;
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 8px;
    }
    
    .strength-fill {
      height: 100%;
      border-radius: 4px;
      transition: width 0.3s ease, background-color 0.3s ease;
    }
    
    .strength-fill.weak {
      background-color: #ef4444;
    }
    
    .strength-fill.medium {
      background-color: #f59e0b;
    }
    
    .strength-fill.strong {
      background-color: #0ea5e9;
    }
    
    .strength-fill.very-strong {
      background-color: #22c55e;
    }
    
    .strength-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }
    
    .strength-label {
      font-weight: 600;
      font-size: 14px;
    }
    
    .strength-score {
      font-size: 12px;
      color: #6b7280;
    }
    
    .strength-details {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
      margin-top: 12px;
    }
    
    .detail-item {
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #6b7280;
      transition: color 0.2s ease;
    }
    
    .detail-item.valid {
      color: #22c55e;
    }
    
    .detail-item .icon {
      margin-right: 6px;
      font-weight: bold;
    }
  `]
})
export class PasswordStrengthComponent implements OnInit {
  @Input() password: string = '';
  @Input() showDetails: boolean = true;
  
  strength: PasswordStrength | null = null;
  
  get strengthPercentage(): number {
    return this.strength ? (this.strength.score / 10) * 100 : 0;
  }
  
  constructor(public strengthService: PasswordStrengthService) {}
  
  ngOnInit(): void {
    this.updateStrength();
  }
  
  ngOnChanges(): void {
    this.updateStrength();
  }
  
  private updateStrength(): void {
    if (this.password) {
      this.strength = this.strengthService.checkStrength(this.password);
    } else {
      this.strength = null;
    }
  }
}
