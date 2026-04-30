import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    <button
      pButton
      [disabled]="disabled || loading"
      (click)="handleClick()"
      [ngClass]="buttonClasses"
      type="{{ type }}"
    >
      @if (loading) {
        <span class="flex items-center gap-2">
          <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ loadingText || '加载中...' }}
        </span>
      } @else {
        @if (icon) {
          <span [ngClass]="{ 'mr-2': text }" class="p-button-icon">{{ icon }}</span>
        }
        <span *ngIf="text" class="p-button-label">{{ text }}</span>
      }
    </button>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
    
    :host ::ng-deep .p-button {
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      border-radius: 0.75rem;
      transition: all 0.2s ease;
      width: 100%;
    }
    
    :host ::ng-deep .p-button-primary {
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
      border: none;
      box-shadow: 0 4px 14px 0 rgba(59, 130, 246, 0.39);
    }
    :host ::ng-deep .p-button-primary:hover {
      background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
      box-shadow: 0 6px 20px 0 rgba(59, 130, 246, 0.5);
      transform: translateY(-1px);
    }
    :host ::ng-deep .p-button-primary:active {
      transform: translateY(0);
    }
    
    :host ::ng-deep .p-button-secondary {
      background-color: #f1f5f9;
      border: none;
      color: #475569;
    }
    :host ::ng-deep .p-button-secondary:hover {
      background-color: #e2e8f0;
      color: #334155;
    }
    
    :host ::ng-deep .p-button-outline {
      background-color: transparent;
      border: 2px solid #3b82f6;
      color: #3b82f6;
    }
    :host ::ng-deep .p-button-outline:hover {
      background-color: #eff6ff;
    }
    
    :host ::ng-deep .p-button-text {
      background-color: transparent;
      border: none;
      color: #3b82f6;
      padding: 0.5rem 1rem;
    }
    :host ::ng-deep .p-button-text:hover {
      background-color: #eff6ff;
    }
    
    :host ::ng-deep .p-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
    
    :host ::ng-deep .p-button-sm {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
    }
    
    :host ::ng-deep .p-button-md {
      padding: 0.75rem 1.5rem;
      font-size: 0.95rem;
    }
    
    :host ::ng-deep .p-button-lg {
      padding: 1rem 2rem;
      font-size: 1.1rem;
    }
  `],
})
export class ButtonComponent {
  @Input() text = '';
  @Input() icon = '';
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() loadingText = '';
  @Input() fullWidth = false;
  
  @Output() clicked = new EventEmitter<void>();

  get buttonClasses(): string[] {
    const classes: string[] = [];
    
    switch (this.variant) {
      case 'primary':
        classes.push('p-button-primary');
        break;
      case 'secondary':
        classes.push('p-button-secondary');
        break;
      case 'outline':
        classes.push('p-button-outline');
        break;
      case 'text':
        classes.push('p-button-text');
        break;
    }
    
    classes.push(`p-button-${this.size}`);
    
    if (this.fullWidth) {
      classes.push('w-full');
    }
    
    return classes;
  }

  handleClick(): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit();
    }
  }
}
