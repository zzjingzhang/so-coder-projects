import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BackgroundComponent } from '../../shared/components/background/background.component';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { HeadingComponent } from '../../shared/components/heading/heading.component';
import { ParagraphComponent } from '../../shared/components/paragraph/paragraph.component';
import { TextInputComponent } from '../../shared/components/text-input/text-input.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { BackButtonComponent } from '../../shared/components/back-button/back-button.component';

@Component({
  selector: 'app-login',
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
              <app-heading text="欢迎回来" />
              <app-paragraph text="登录您的账户继续" />
            </div>
            
            <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-5">
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
                  placeholder="请输入您的密码"
                  [required]="true"
                  formControlName="password"
                  [showError]="passwordError"
                  [errorMessage]="getPasswordErrorMessage()"
                />
              </div>
              
              <div class="flex items-center justify-between">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    formControlName="rememberMe"
                    class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span class="text-sm text-secondary-600">记住我</span>
                </label>
                <button
                  type="button"
                  (click)="goToForgotPassword()"
                  class="text-sm text-primary-600 hover:text-primary-700 font-medium focus:outline-none focus:underline"
                >
                  忘记密码？
                </button>
              </div>
              
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
                text="登录"
                variant="primary"
                size="lg"
                [fullWidth]="true"
                type="submit"
                [loading]="isLoading"
                loadingText="登录中..."
                [disabled]="!loginForm.valid && isSubmitted"
              />
            </form>
            
            <div class="mt-8 pt-6 border-t border-secondary-200">
              <p class="text-center text-secondary-500 text-sm">
                还没有账户？
                <button
                  type="button"
                  (click)="goToRegister()"
                  class="text-primary-600 hover:text-primary-700 font-medium ml-1 focus:outline-none focus:underline"
                >
                  立即注册
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
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  isSubmitted = false;
  serverError = '';

  get emailError(): boolean {
    const email = this.loginForm.get('email');
    return (email?.invalid && (email?.dirty || email?.touched || this.isSubmitted)) || false;
  }

  get passwordError(): boolean {
    const password = this.loginForm.get('password');
    return (password?.invalid && (password?.dirty || password?.touched || this.isSubmitted)) || false;
  }

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false],
    });
  }

  getEmailErrorMessage(): string {
    const email = this.loginForm.get('email');
    if (email?.hasError('required')) {
      return '请输入邮箱地址';
    }
    if (email?.hasError('email')) {
      return '请输入有效的邮箱地址';
    }
    return '';
  }

  getPasswordErrorMessage(): string {
    const password = this.loginForm.get('password');
    if (password?.hasError('required')) {
      return '请输入密码';
    }
    if (password?.hasError('minlength')) {
      return '密码至少需要6个字符';
    }
    return '';
  }

  onSubmit(): void {
    this.isSubmitted = true;
    this.serverError = '';

    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;

    setTimeout(() => {
      const { email, password } = this.loginForm.value;
      
      if (email === 'test@example.com' && password === 'password') {
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      } else {
        this.isLoading = false;
        this.serverError = '邮箱或密码错误。请尝试 test@example.com / password';
      }
    }, 1500);
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  goToForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }
}
