import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SliderModule } from 'primeng/slider';
import { PlayerService } from '../../shared/services';
import { PlayMode } from '../../shared/types';
import { formatTime, cn } from '../../shared/utils';

@Component({
  selector: 'app-music-player',
  standalone: true,
  imports: [CommonModule, ButtonModule, SliderModule],
  template: `
    <div class="w-full max-w-2xl mx-auto">
      <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 md:p-8 animate-fade-in">
        
        <div class="flex justify-between items-center mb-6">
          <button 
            (click)="playerService.toggleDarkMode()"
            class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <svg *ngIf="!playerService.isDarkMode()" class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            <svg *ngIf="playerService.isDarkMode()" class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </button>
          
          <button 
            (click)="playerService.togglePlaylist()"
            class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <svg class="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
        </div>

        <div class="relative flex justify-center mb-8">
          <div class="relative">
            <div 
              [class]="cn(
                'w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-2xl',
                playerService.isPlaying() && 'animate-glow'
              )"
            >
              <img 
                [src]="currentSong?.coverUrl || 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=default%20music%20album%20cover%20with%20musical%20notes&image_size=square_hd'" 
                [alt]="currentSong?.title || 'Album Cover'"
                class="w-full h-full object-cover"
              />
            </div>
            
            <div *ngIf="playerService.isLoading()" class="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full">
              <svg class="w-12 h-12 text-white animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
          </div>
        </div>

        <div class="text-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800 dark:text-white truncate">
            {{ currentSong?.title || '未选择歌曲' }}
          </h2>
          <p class="text-gray-500 dark:text-gray-400 truncate">
            {{ currentSong?.artist || '---' }}
          </p>
          <p class="text-sm text-gray-400 dark:text-gray-500 truncate">
            {{ currentSong?.album || '---' }}
          </p>
        </div>

        <div class="mb-6">
          <div class="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer group">
            <div 
              class="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all"
              [style.width]="progressPercent + '%'"
            ></div>
            <div 
              class="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white dark:bg-gray-200 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              [style.left]="progressPercent + '%'"
              [style.transform]="'translate(-50%, -50%)'"
            ></div>
            <input 
              type="range" 
              min="0" 
              [max]="playerService.duration() || 100" 
              [value]="playerService.currentTime()"
              (input)="onProgressInput($event)"
              class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
            <span>{{ formatTime(playerService.currentTime()) }}</span>
            <span>{{ formatTime(playerService.duration()) }}</span>
          </div>
        </div>

        <div class="flex items-center justify-center gap-4 mb-6">
          <button 
            (click)="playerService.togglePlayMode()"
            class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            [title]="playModeLabel"
          >
            <svg *ngIf="playerService.playMode() === PlayMode.LIST" class="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <svg *ngIf="playerService.playMode() === PlayMode.SINGLE" class="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              <text x="12" y="14" text-anchor="middle" class="text-xs font-bold" fill="currentColor">1</text>
            </svg>
            <svg *ngIf="playerService.playMode() === PlayMode.SHUFFLE" class="w-6 h-6 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 3h5v5M4 20L21 3" />
            </svg>
          </button>

          <button 
            (click)="playerService.playPrevious()"
            class="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <svg class="w-8 h-8 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
            </svg>
          </button>

          <button 
            (click)="playerService.togglePlay()"
            [disabled]="!currentSong"
            class="p-4 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg *ngIf="!playerService.isPlaying()" class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            <svg *ngIf="playerService.isPlaying()" class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
            </svg>
          </button>

          <button 
            (click)="playerService.playNext()"
            class="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <svg class="w-8 h-8 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
            </svg>
          </button>

          <button 
            (click)="toggleMute()"
            class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <svg *ngIf="playerService.isMuted() || playerService.volume() === 0" class="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
            <svg *ngIf="!playerService.isMuted() && playerService.volume() > 0 && playerService.volume() <= 0.5" class="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
            <svg *ngIf="!playerService.isMuted() && playerService.volume() > 0.5" class="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          </button>
        </div>

        <div class="flex items-center gap-3 px-4">
          <svg class="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
          <div class="relative flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer group">
            <div 
              class="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
              [style.width]="(playerService.isMuted() ? 0 : playerService.volume() * 100) + '%'"
            ></div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              [value]="(playerService.isMuted() ? 0 : playerService.volume() * 100)"
              (input)="onVolumeInput($event)"
              class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <span class="text-sm text-gray-500 dark:text-gray-400 w-12 text-right">
            {{ volumePercent }}%
          </span>
        </div>

        <div *ngIf="playerService.isPlaying() && currentSong" class="flex justify-center gap-1 mt-6">
          <div class="w-1 bg-gradient-to-t from-primary-500 to-accent-500 rounded-full animate-music-bar-1"></div>
          <div class="w-1 bg-gradient-to-t from-primary-500 to-accent-500 rounded-full animate-music-bar-2"></div>
          <div class="w-1 bg-gradient-to-t from-primary-500 to-accent-500 rounded-full animate-music-bar-3"></div>
          <div class="w-1 bg-gradient-to-t from-primary-500 to-accent-500 rounded-full animate-music-bar-4"></div>
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
export class MusicPlayerComponent {
  playerService = inject(PlayerService);
  PlayMode = PlayMode;

  currentSong = computed(() => this.playerService.currentSong());
  
  progressPercent = computed(() => {
    const duration = this.playerService.duration();
    const currentTime = this.playerService.currentTime();
    return duration > 0 ? (currentTime / duration) * 100 : 0;
  });

  volumePercent = computed(() => {
    if (this.playerService.isMuted()) return 0;
    return Math.round(this.playerService.volume() * 100);
  });

  playModeLabel = computed(() => {
    const mode = this.playerService.playMode();
    switch (mode) {
      case PlayMode.LIST:
        return '列表循环';
      case PlayMode.SINGLE:
        return '单曲循环';
      case PlayMode.SHUFFLE:
        return '随机播放';
      default:
        return '';
    }
  });

  formatTime = formatTime;
  cn = cn;

  onProgressInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const time = parseFloat(target.value);
    this.playerService.seekTo(time);
  }

  onVolumeInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const volume = parseFloat(target.value) / 100;
    this.playerService.setVolume(volume);
  }

  toggleMute(): void {
    this.playerService.toggleMute();
  }
}
