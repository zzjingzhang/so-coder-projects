import { Component, inject, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerService, MusicDataService } from '../../shared/services';
import { Song, PlayMode } from '../../shared/types';
import { formatTime, cn } from '../../shared/utils';

@Component({
  selector: 'app-playlist-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      [class]="cn(
        'fixed top-0 right-0 h-full w-full md:w-96 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-2xl z-50 transform transition-transform duration-300 ease-in-out',
        playerService.showPlaylist() ? 'translate-x-0' : 'translate-x-full'
      )"
    >
      <div class="flex flex-col h-full">
        <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
            播放列表 ({{ playerService.playlist().length }})
          </h3>
          <button 
            (click)="playerService.togglePlaylist()"
            class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <svg class="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto">
          <div *ngIf="playerService.playlist().length === 0" class="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400">
            <svg class="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
            <p class="text-center">
              {{ loading ? '加载中...' : '暂无歌曲' }}
            </p>
          </div>

          <div *ngIf="playerService.playlist().length > 0">
            <div 
              *ngFor="let song of playerService.playlist(); let i = index"
              (click)="selectSong(song, i)"
              [class]="cn(
                'flex items-center gap-3 p-4 cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-100 dark:border-gray-800',
                isCurrentSong(song) && 'bg-primary-50 dark:bg-primary-900/20'
              )"
            >
              <div class="relative flex-shrink-0">
                <img 
                  [src]="song.coverUrl" 
                  [alt]="song.title"
                  class="w-12 h-12 rounded-lg object-cover"
                />
                
                <div 
                  *ngIf="isCurrentSong(song) && playerService.isPlaying()"
                  class="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center"
                >
                  <div class="flex gap-0.5 items-end h-6">
                    <div class="w-1 bg-white rounded-full animate-music-bar-1"></div>
                    <div class="w-1 bg-white rounded-full animate-music-bar-2"></div>
                    <div class="w-1 bg-white rounded-full animate-music-bar-3"></div>
                  </div>
                </div>

                <div 
                  *ngIf="isCurrentSong(song) && !playerService.isPlaying()"
                  class="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center"
                >
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
                  </svg>
                </div>
              </div>

              <div class="flex-1 min-w-0">
                <h4 
                  [class]="cn(
                    'text-sm font-medium truncate',
                    isCurrentSong(song) ? 'text-primary-600 dark:text-primary-400' : 'text-gray-800 dark:text-gray-200'
                  )"
                >
                  {{ song.title }}
                </h4>
                <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {{ song.artist }}
                </p>
              </div>

              <div class="flex items-center gap-2 flex-shrink-0">
                <span class="text-xs text-gray-400 dark:text-gray-500">
                  {{ formatTime(song.duration) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <div class="flex items-center justify-between text-sm">
            <span class="text-gray-500 dark:text-gray-400">
              播放模式:
            </span>
            <div class="flex items-center gap-2">
              <span 
                [class]="cn(
                  'px-2 py-1 rounded text-xs font-medium',
                  playerService.playMode() === PlayMode.LIST 
                    ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400' 
                    : 'text-gray-500 dark:text-gray-400'
                )"
              >
                列表
              </span>
              <span 
                [class]="cn(
                  'px-2 py-1 rounded text-xs font-medium',
                  playerService.playMode() === PlayMode.SINGLE 
                    ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400' 
                    : 'text-gray-500 dark:text-gray-400'
                )"
              >
                单曲
              </span>
              <span 
                [class]="cn(
                  'px-2 py-1 rounded text-xs font-medium',
                  playerService.playMode() === PlayMode.SHUFFLE 
                    ? 'bg-accent-100 dark:bg-accent-900/50 text-accent-600 dark:text-accent-400' 
                    : 'text-gray-500 dark:text-gray-400'
                )"
              >
                随机
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div 
      *ngIf="playerService.showPlaylist() && !playerService.isMobile()"
      (click)="playerService.togglePlaylist()"
      class="fixed inset-0 bg-black/30 z-40"
    ></div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class PlaylistSidebarComponent implements OnInit {
  playerService = inject(PlayerService);
  private musicDataService = inject(MusicDataService);
  
  PlayMode = PlayMode;
  formatTime = formatTime;
  cn = cn;
  loading = true;

  currentSongId = computed(() => this.playerService.currentSong()?.id);

  ngOnInit(): void {
    this.loadPlaylist();
  }

  loadPlaylist(): void {
    this.musicDataService.getPlaylist().subscribe({
      next: (songs) => {
        this.playerService.setPlaylist(songs);
        this.loading = false;
        
        if (songs.length > 0 && !this.playerService.currentSong()) {
          this.playerService.playSong(songs[0], 0);
        }
      },
      error: (err) => {
        console.error('Failed to load playlist:', err);
        this.loading = false;
      }
    });
  }

  isCurrentSong(song: Song): boolean {
    return this.currentSongId() === song.id;
  }

  selectSong(song: Song, index: number): void {
    this.playerService.playSong(song, index);
  }
}
