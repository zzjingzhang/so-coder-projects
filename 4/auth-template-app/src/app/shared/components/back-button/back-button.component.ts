import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      (click)="goBack()"
      class="inline-flex items-center gap-2 text-secondary-600 hover:text-secondary-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg p-2 -ml-2"
      [attr.aria-label]="ariaLabel"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
      </svg>
      @if (showText) {
        <span class="text-sm font-medium">{{ text }}</span>
      }
    </button>
  `,
  styles: [],
})
export class BackButtonComponent {
  @Input() route: string | null = null;
  @Input() text = '返回';
  @Input() showText = true;
  @Input() ariaLabel = '返回上一页';

  constructor(private router: Router) {}

  goBack(): void {
    if (this.route) {
      this.router.navigate([this.route]);
    } else {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        this.router.navigate(['/']);
      }
    }
  }
}
