import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BackgroundComponent } from '../../shared/components/background/background.component';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { HeadingComponent } from '../../shared/components/heading/heading.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    BackgroundComponent,
    LogoComponent,
    HeadingComponent,
    ButtonComponent,
  ],
  template: `
    <app-background>
      <div class="min-h-screen">
        <nav class="bg-white/80 backdrop-blur-lg border-b border-secondary-200 sticky top-0 z-50">
          <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
              <app-logo text="AuthApp" />
              
              <div class="flex items-center gap-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white font-medium">
                    {{ userInitial }}
                  </div>
                  <div class="hidden sm:block">
                    <p class="text-sm font-medium text-secondary-900">{{ userName }}</p>
                    <p class="text-xs text-secondary-500">{{ userEmail }}</p>
                  </div>
                </div>
                
                <app-button
                  text="注销"
                  variant="secondary"
                  size="sm"
                  (clicked)="logout()"
                />
              </div>
            </div>
          </div>
        </nav>
        
        <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div class="mb-8">
            <h1 class="text-2xl sm:text-3xl font-bold text-secondary-900">
              欢迎回来，{{ userName }}！
            </h1>
            <p class="text-secondary-500 mt-2">
              这是您的仪表板，您可以在这里管理您的账户和查看数据。
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-white/50">
              <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <span class="text-green-500 text-sm font-medium flex items-center gap-1">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  12%
                </span>
              </div>
              <p class="text-2xl font-bold text-secondary-900">2,543</p>
              <p class="text-secondary-500 text-sm mt-1">活跃用户</p>
            </div>
            
            <div class="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-white/50">
              <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <span class="text-green-500 text-sm font-medium flex items-center gap-1">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  8%
                </span>
              </div>
              <p class="text-2xl font-bold text-secondary-900">98.5%</p>
              <p class="text-secondary-500 text-sm mt-1">登录成功率</p>
            </div>
            
            <div class="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-white/50">
              <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center">
                  <svg class="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <span class="text-secondary-500 text-sm font-medium">最近</span>
              </div>
              <p class="text-2xl font-bold text-secondary-900">今天</p>
              <p class="text-secondary-500 text-sm mt-1">最后登录时间</p>
            </div>
          </div>
          
          <div class="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 sm:p-8 border border-white/50">
            <h2 class="text-xl font-bold text-secondary-900 mb-6">快速操作</h2>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button class="flex flex-col items-center justify-center p-6 bg-primary-50 hover:bg-primary-100 rounded-xl transition-colors duration-200 group">
                <div class="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-200">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                </div>
                <span class="text-sm font-medium text-secondary-700">编辑个人资料</span>
              </button>
              
              <button class="flex flex-col items-center justify-center p-6 bg-secondary-50 hover:bg-secondary-100 rounded-xl transition-colors duration-200 group">
                <div class="w-12 h-12 bg-secondary-500 rounded-xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-200">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                </div>
                <span class="text-sm font-medium text-secondary-700">修改密码</span>
              </button>
              
              <button class="flex flex-col items-center justify-center p-6 bg-green-50 hover:bg-green-100 rounded-xl transition-colors duration-200 group">
                <div class="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-200">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                  </svg>
                </div>
                <span class="text-sm font-medium text-secondary-700">通知设置</span>
              </button>
              
              <button (click)="logout()" class="flex flex-col items-center justify-center p-6 bg-error-50 hover:bg-error-100 rounded-xl transition-colors duration-200 group">
                <div class="w-12 h-12 bg-error-500 rounded-xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-200">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                  </svg>
                </div>
                <span class="text-sm font-medium text-secondary-700">安全退出</span>
              </button>
            </div>
          </div>
          
          <div class="mt-8 text-center">
            <app-button
              text="返回主页"
              variant="outline"
              size="md"
              (clicked)="goToHome()"
            />
          </div>
        </main>
        
        <footer class="mt-auto py-6">
          <p class="text-center text-secondary-400 text-sm">
            &copy; 2024 AuthApp. 保留所有权利。
          </p>
        </footer>
      </div>
    </app-background>
  `,
  styles: [],
})
export class DashboardComponent {
  userName = '张三';
  userEmail = 'test@example.com';

  get userInitial(): string {
    return this.userName.charAt(0).toUpperCase();
  }

  constructor(private router: Router) {}

  logout(): void {
    this.router.navigate(['/']);
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }
}
