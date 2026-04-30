import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BackgroundComponent } from '../../shared/components/background/background.component';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { HeadingComponent } from '../../shared/components/heading/heading.component';
import { ParagraphComponent } from '../../shared/components/paragraph/paragraph.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    BackgroundComponent,
    LogoComponent,
    HeadingComponent,
    ParagraphComponent,
    ButtonComponent,
  ],
  template: `
    <app-background>
      <div class="min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <div class="max-w-md w-full">
          <div class="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 sm:p-10 border border-white/50">
            <div class="mb-8">
              <app-logo text="AuthApp" />
            </div>
            
            <div class="mb-8">
              <app-heading text="欢迎使用 AuthApp" />
              <p class="text-secondary-500 text-center mt-3 text-sm sm:text-base">
                安全、简单的身份验证解决方案
              </p>
            </div>
            
            <div class="space-y-4">
              <app-button
                text="登录"
                variant="primary"
                size="lg"
                [fullWidth]="true"
                (clicked)="goToLogin()"
              />
              
              <app-button
                text="注册"
                variant="outline"
                size="lg"
                [fullWidth]="true"
                (clicked)="goToRegister()"
              />
            </div>
            
            <div class="mt-8 pt-6 border-t border-secondary-200">
              <p class="text-center text-secondary-500 text-sm">
                忘记密码？
                <button
                  (click)="goToForgotPassword()"
                  class="text-primary-600 hover:text-primary-700 font-medium ml-1 focus:outline-none focus:underline"
                >
                  重置密码
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
export class HomeComponent {
  constructor(private router: Router) {}

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  goToForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }
}
