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
  selector: 'app-forgot-password',
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
            <app-back-button route="/login" />
          </div>
          
          <div class="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 sm:p-10 border border-white/50">
            @if (!isEmailSent) {
              <div class="mb-8">
                <app-logo text="AuthApp" />
              </div>
              
              <div class="mb-8">
                <app-heading text="忘记密码" />
                <p class="text-secondary-500 text-center mt-3 text-sm sm:text-base">
                  请输入您的邮箱地址，我们将发送密码重置链接给您
                </p>
              </div>
              
              <form [formGroup]="forgotPasswordForm" (ngSubmit)="onSubmit()" class="space-y-5">
                <div>
                  <app-text-input
                    label="邮箱地址"
                    type="email"
                    placeholder="请输入您的邮箱"
                    [required]="true"
                    formControlName="email"
                    [showError]="emailError"
                    [errorMessage]="getEmailErrorMessage()"
                  />
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
                  text="发送重置链接"
                  variant="primary"
                  size="lg"
                  [fullWidth]="true"
                  type="submit"
                  [loading]="isLoading"
                  loadingText="发送中..."
                  [disabled]="!forgotPasswordForm.valid && isSubmitted"
                />
              </form>
            } @else {
              <div class="text-center">
                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                
                <app-heading text="邮件已发送！" />
                <p class="text-secondary-500 text-center mt-3 text-sm sm:text-base mb-6">
                  密码重置链接已发送至 <strong class="text-secondary-700">{{ submittedEmail }}</strong><br>
                  请检查您的邮箱并点击链接重置密码
                </p>
                
                <div class="space-y-3">
                  <app-button
                    text="返回登录"
                    variant="primary"
                    size="md"
                    [fullWidth]="true"
                    (clicked)="goToLogin()"
                  />
                  
                  <app-button
                    text="重新发送"
                    variant="text"
                    size="md"
                    [fullWidth]="true"
                    (clicked)="resetForm()"
                  />
                </div>
              </div>
            }
            
            @if (!isEmailSent) {
              <div class="mt-8 pt-6 border-t border-secondary-200">
                <p class="text-center text-secondary-500 text-sm">
                  想起密码了？
                  <button
                    type="button"
                    (click)="goToLogin()"
                    class="text-primary-600 hover:text-primary-700 font-medium ml-1 focus:outline-none focus:underline"
                  >
                    立即登录
                  </button>
                </p>
              </div>
            }
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
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  isLoading = false;
  isSubmitted = false;
  serverError = '';
  isEmailSent = false;
  submittedEmail = '';

  get emailError(): boolean {
    const email = this.forgotPasswordForm.get('email');
    return (email?.invalid && (email?.dirty || email?.touched || this.isSubmitted)) || false;
  }

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  getEmailErrorMessage(): string {
    const email = this.forgotPasswordForm.get('email');
    if (email?.hasError('required')) {
      return '请输入邮箱地址';
    }
    if (email?.hasError('email')) {
      return '请输入有效的邮箱地址';
    }
    return '';
  }

  onSubmit(): void {
    this.isSubmitted = true;
    this.serverError = '';

    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
      this.isEmailSent = true;
      this.submittedEmail = this.forgotPasswordForm.value.email;
    }, 1500);
  }

  resetForm(): void {
    this.isEmailSent = false;
    this.isSubmitted = false;
    this.forgotPasswordForm.reset();
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
