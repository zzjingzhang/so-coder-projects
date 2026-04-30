import { Component } from '@angular/core';

@Component({
  selector: 'app-background',
  standalone: true,
  template: `
    <div class="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-100 relative overflow-hidden">
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div class="absolute top-10 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div class="absolute top-40 right-20 w-72 h-72 bg-secondary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style="animation-delay: 2s;"></div>
        <div class="absolute -bottom-32 left-40 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style="animation-delay: 4s;"></div>
      </div>
      <ng-content></ng-content>
    </div>
  `,
  styles: [],
})
export class BackgroundComponent {}
