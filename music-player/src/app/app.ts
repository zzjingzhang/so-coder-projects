import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerService } from './shared/services';
import { MusicPlayerComponent } from './features/music-player/music-player.component';
import { PlaylistSidebarComponent } from './features/playlist-sidebar/playlist-sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MusicPlayerComponent, PlaylistSidebarComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div class="fixed inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-40 -right-40 w-96 h-96 bg-primary-200/30 dark:bg-primary-800/20 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-200/30 dark:bg-accent-800/20 rounded-full blur-3xl"></div>
      </div>

      <div class="relative z-10 min-h-screen flex flex-col">
        <header class="p-4 md:p-6">
          <div class="max-w-7xl mx-auto flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg">
                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                </svg>
              </div>
              <h1 class="text-xl font-bold text-gray-800 dark:text-white">
                Music Player
              </h1>
            </div>
          </div>
        </header>

        <main class="flex-1 p-4 md:p-6">
          <div class="max-w-7xl mx-auto">
            <app-music-player />
          </div>
        </main>

        <footer class="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© 2025 Music Player. Built with Angular & Tailwind CSS</p>
        </footer>
      </div>

      <app-playlist-sidebar />

      <div 
        *ngIf="playerService.error()"
        class="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:w-96 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl p-4 shadow-xl animate-slide-up z-50"
      >
        <div class="flex items-start gap-3">
          <svg class="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div class="flex-1 min-w-0">
            <h4 class="text-sm font-semibold text-red-800 dark:text-red-200">
              出错了
            </h4>
            <p class="text-sm text-red-600 dark:text-red-300 mt-1">
              {{ playerService.error() }}
            </p>
          </div>
          <button 
            (click)="playerService.clearError()"
            class="text-red-400 hover:text-red-600 dark:hover:text-red-200 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class AppComponent {
  playerService = inject(PlayerService);
}
