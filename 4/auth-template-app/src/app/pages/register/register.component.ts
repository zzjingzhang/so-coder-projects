import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BackgroundComponent } from '../../shared/components/background/background.component';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { HeadingComponent } from '../../shared/components/heading/heading.component';
import { ParagraphComponent } from '../../shared/components/paragraph/paragraph.component';
import { TextInputComponent } from '../../shared/components/text-input/text-input.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { BackButtonComponent } from '../../shared/components/back-button/back-button.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BackgroundComponent,
    LogoComponent,
    HeadingComponent,
    ParagraphComponent,
    TextInputComponent,
    ButtonComponent,
    BackButtonComponent,
  ],
  template: `
    <app-background>
      <div class="min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <div class="max-w-md w-full">
          <div class="mb-6">
            <app-back-button route="/" />
          </div>
          
          <div class="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 sm:p-10 border border-white/50">
            <div class="mb-8">
              <app-logo text="AuthApp" />
            </div>
            
            <div class="mb-8">
              <app-heading text="创建账户" />
              <app-paragraph text="填写以下信息完成注册" />
            </div>
            
            <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-5">
              <div>
                <app-text-input
                  label="姓名"
                  type="text"
                  placeholder="请输入您的姓名"
                  [required]="true"
                  formControlName="name"
                  [showError]="nameError"
                  [errorMessage]="getNameErrorMessage()"
                />
              </div>
              
              <div>
                <app-text-input
                  label="邮箱"
                  type="email"
                  placeholder="请输入您的邮箱"
                  [required]="true"
                  formControlName="email"
                  [showError]="emailError"
                  [errorMessage]="getEmailErrorMessage()"
                />
              </div>
              
              <div>
                <app-text-input
                  label="密码"
                  type="password"
                  placeholder="请输入密码（至少6个字符）"
                  [required]="true"
                  formControlName="password"
                  [showError]="passwordError"
                  [errorMessage]="getPasswordErrorMessage()"
                />
              </div>
              
              <div>
                <app-text-input
                  label="确认密码"
                  type="password"
                  placeholder="请再次输入密码"
                  [required]="true"
                  formControlName="confirmPassword"
                  [showError]="confirmPasswordError"
                  [errorMessage]="getConfirmPasswordErrorMessage()"
                />
              </div>
              
              <div class="flex items-start gap-2">
                <input
                  type="checkbox"
                  formControlName="agreeTerms"
                  id="agreeTerms"
                  class="w-4 h-4 mt-0.5 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                />
                <label for="agreeTerms" class="text-sm text-secondary-600 cursor-pointer">
                  我同意 
                  <button type="button" class="text-primary-600 hover:text-primary-700 font-medium focus:outline-none focus:underline">
                    服务条款
                  </button>
                  和
                  <button type="button" class="text-primary-600 hover:text-primary-700 font-medium focus:outline-none focus:underline">
                    隐私政策
                  </button>
                </label>
              </div>
              
              @if (agreeTermsError) {
                <p class="text-error-500 text-sm flex items-center gap-1 -mt-3">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                  </svg>
                  请同意服务条款和隐私政策
                </p>
              }
              
              @if (serverError) {
                <div class="bg-error-50 border border-error-200 rounded-xl p-4">
                  <p class="text-error-600 text-sm flex items-center gap-2">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                    </svg>
                    {{ serverError }}
                  </p>
                </div>
              }
              
              <app-button
                text="创建账户"
                variant="primary"
                size="lg"
                [fullWidth]="true"
                type="submit"
                [loading]="isLoading"
                loadingText="注册中..."
                [disabled]="!registerForm.valid && isSubmitted"
              />
            </form>
            
            <div class="mt-8 pt-6 border-t border-secondary-200">
              <p class="text-center text-secondary-500 text-sm">
                已有账户？
                <button
                  type="button"
                  (click)="goToLogin()"
                  class="text-primary-600 hover:text-primary-700 font-medium ml-1 focus:outline-none focus:underline"
                >
                  立即登录
                </button>
              </p>
            </div>
          </div>
          
          <p class="text-center text-secondary-400 text-xs mt-6">
            &copy; 2024 AuthApp. 保留所有权利。
          </p>
        </div>
      </div>
    </app-background>
  `,
  styles: [],
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  isSubmitted = false;
  serverError = '';

  get nameError(): boolean {
    const name = this.registerForm.get('name');
    return (name?.invalid && (name?.dirty || name?.touched || this.isSubmitted)) || false;
  }

  get emailError(): boolean {
    const email = this.registerForm.get('email');
    return (email?.invalid && (email?.dirty || email?.touched || this.isSubmitted)) || false;
  }

  get passwordError(): boolean {
    const password = this.registerForm.get('password');
    return (password?.invalid && (password?.dirty || password?.touched || this.isSubmitted)) || false;
  }

  get confirmPasswordError(): boolean {
    const confirmPassword = this.registerForm.get('confirmPassword');
    const passwordMatch = this.registerForm.hasError('passwordMismatch');
    return (
      (confirmPassword?.invalid && (confirmPassword?.dirty || confirmPassword?.touched || this.isSubmitted)) ||
      (passwordMatch && this.isSubmitted)
    ) || false;
  }

  get agreeTermsError(): boolean {
    const agreeTerms = this.registerForm.get('agreeTerms');
    return (agreeTerms?.invalid && (agreeTerms?.dirty || agreeTerms?.touched || this.isSubmitted)) || false;
  }

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        agreeTerms: [false, [Validators.requiredTrue]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator: ValidatorFn = (form: AbstractControl): ValidationErrors | null => {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    return password && confirmPassword && password.value !== confirmPassword.value
      ? { passwordMismatch: true }
      : null;
  };

  getNameErrorMessage(): string {
    const name = this.registerForm.get('name');
    if (name?.hasError('required')) {
      return '请输入姓名';
    }
    if (name?.hasError('minlength')) {
      return '姓名至少需要2个字符';
    }
    return '';
  }

  getEmailErrorMessage(): string {
    const email = this.registerForm.get('email');
    if (email?.hasError('required')) {
      return '请输入邮箱地址';
    }
    if (email?.hasError('email')) {
      return '请输入有效的邮箱地址';
    }
    return '';
  }

  getPasswordErrorMessage(): string {
    const password = this.registerForm.get('password');
    if (password?.hasError('required')) {
      return '请输入密码';
    }
    if (password?.hasError('minlength')) {
      return '密码至少需要6个字符';
    }
    return '';
  }

  getConfirmPasswordErrorMessage(): string {
    const confirmPassword = this.registerForm.get('confirmPassword');
    if (confirmPassword?.hasError('required')) {
      return '请确认密码';
    }
    if (this.registerForm.hasError('passwordMismatch')) {
      return '两次输入的密码不一致';
    }
    return '';
  }

  onSubmit(): void {
    this.isSubmitted = true;
    this.serverError = '';

    if (this.registerForm.invalid) {
      return;
    }

    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
      this.router.navigate(['/dashboard']);
    }, 1500);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
