import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule],
  template: `
    <div class="w-full">
      @if (label) {
        <label class="block text-sm font-medium text-secondary-700 mb-1.5">
          {{ label }}
          @if (required) {
            <span class="text-error-500">*</span>
          }
        </label>
      }
      <input
        pInputText
        [type]="type"
        [placeholder]="placeholder"
        [(ngModel)]="value"
        [disabled]="disabled"
        (blur)="onBlur()"
        (keydown.enter)="onEnter()"
        class="w-full"
        [ngClass]="{
          'p-invalid ng-invalid ng-dirty ng-touched': showError
        }"
      />
      @if (showError && errorMessage) {
        <p class="mt-1.5 text-sm text-error-500 flex items-center gap-1">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
          </svg>
          {{ errorMessage }}
        </p>
      }
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    },
  ],
  styles: [`
    :host ::ng-deep .p-inputtext {
      width: 100%;
      padding: 0.75rem 1rem;
      border-radius: 0.75rem;
      border: 1.5px solid #e2e8f0;
      font-size: 0.95rem;
      transition: all 0.2s ease;
      background-color: #ffffff;
    }
    :host ::ng-deep .p-inputtext:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    :host ::ng-deep .p-inputtext.p-invalid,
    :host ::ng-deep .p-inputtext.ng-invalid.ng-dirty.ng-touched {
      border-color: #ef4444;
    }
    :host ::ng-deep .p-inputtext.p-invalid:focus,
    :host ::ng-deep .p-inputtext.ng-invalid.ng-dirty.ng-touched:focus {
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
    :host ::ng-deep .p-inputtext:disabled {
      background-color: #f8fafc;
      opacity: 0.7;
      cursor: not-allowed;
    }
  `],
})
export class TextInputComponent implements ControlValueAccessor, Validator {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: 'text' | 'email' | 'password' = 'text';
  @Input() required = false;
  @Input() disabled = false;
  @Input() errorMessage = '';
  @Input() showError = false;

  private _value = '';
  
  get value(): string {
    return this._value;
  }
  
  set value(val: string) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string): void {
    this._value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.required && !control.value) {
      return { required: true };
    }
    if (this.type === 'email' && control.value && !this.isValidEmail(control.value)) {
      return { email: true };
    }
    return null;
  }

  onBlur(): void {
    this.onTouched();
  }

  onEnter(): void {
    this.onTouched();
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
