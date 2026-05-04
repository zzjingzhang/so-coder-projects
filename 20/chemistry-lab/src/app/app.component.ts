import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, TabViewModule, CommonModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header class="bg-gradient-to-r from-indigo-600 to-blue-700 shadow-lg">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <div class="flex items-center gap-3">
              <span class="text-3xl">🧪</span>
              <h1 class="text-xl sm:text-2xl font-bold text-white">
                化学实验模拟
              </h1>
            </div>
            <nav class="hidden md:flex gap-2">
              @for (item of navItems; track item.routerLink) {
                <button
                  pButton
                  [label]="item.label"
                  [icon]="item.icon"
                  (click)="navigateTo(item.routerLink)"
                  [class.p-button-secondary]="!isActive(item.routerLink)"
                  [class.p-button-success]="isActive(item.routerLink)"
                  class="flex items-center justify-center min-w-[100px]"
                ></button>
              }
            </nav>
          </div>
        </div>
      </header>

      <nav class="md:hidden bg-white shadow-md sticky top-0 z-50">
        <div class="flex justify-around py-2">
          @for (item of navItems; track item.routerLink) {
            <button
              (click)="navigateTo(item.routerLink)"
              class="flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors"
              [class.text-indigo-600]="isActive(item.routerLink)"
              [class.text-gray-500]="!isActive(item.routerLink)"
              [class.bg-indigo-50]="isActive(item.routerLink)"
            >
              <i [class]="item.icon" class="text-xl"></i>
              <span class="text-xs font-medium">{{ item.label }}</span>
            </button>
          }
        </div>
      </nav>

      <main>
        <router-outlet />
      </main>

      <footer class="bg-gray-800 text-gray-300 mt-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div class="text-center">
            <p class="text-sm">
              碳酸钙与盐酸反应制取二氧化碳 | 交互式化学实验
            </p>
            <p class="text-xs text-gray-500 mt-2">
              CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂↑
            </p>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: []
})
export class AppComponent {
  private router = inject(Router);
  title = 'chemistry-lab';

  navItems: { label: string; icon: string; routerLink: string }[] = [
    { label: '实验原理', icon: 'pi pi-book', routerLink: '/principle' },
    { label: '步骤演示', icon: 'pi pi-play', routerLink: '/experiment' },
    { label: '知识检验', icon: 'pi pi-question-circle', routerLink: '/quiz' },
  ];

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  isActive(route: string): boolean {
    return this.router.url === route || (route === '/principle' && this.router.url === '/');
  }
}
