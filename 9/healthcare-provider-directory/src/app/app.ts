import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="min-h-screen bg-gray-50">
      <header class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 py-4">
          <h1 class="text-2xl font-bold text-blue-600">Healthcare Provider Directory</h1>
        </div>
      </header>
      <main class="max-w-7xl mx-auto px-4 py-6">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'healthcare-provider-directory';
}
