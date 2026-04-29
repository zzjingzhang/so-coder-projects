import { Injectable, signal, computed, effect } from '@angular/core';
import { Song, PlayMode, PlayerState } from '../types/music';
import { shuffleArray, getStoredDarkMode, isMobileDevice } from '../utils/style.utils';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private audio: HTMLAudioElement | null = null;
  
  private state = signal<PlayerState>({
    currentSong: null,
    isPlaying: false,
    isLoading: false,
    currentTime: 0,
    duration: 0,
    volume: 0.7,
    isMuted: false,
    playMode: PlayMode.LIST,
    playlist: [],
    currentIndex: -1,
    error: null,
    isMobile: isMobileDevice(),
    isDarkMode: getStoredDarkMode(),
    showPlaylist: false,
  });

  currentSong = computed(() => this.state().currentSong);
  isPlaying = computed(() => this.state().isPlaying);
  isLoading = computed(() => this.state().isLoading);
  currentTime = computed(() => this.state().currentTime);
  duration = computed(() => this.state().duration);
  volume = computed(() => this.state().volume);
  isMuted = computed(() => this.state().isMuted);
  playMode = computed(() => this.state().playMode);
  playlist = computed(() => this.state().playlist);
  currentIndex = computed(() => this.state().currentIndex);
  error = computed(() => this.state().error);
  isMobile = computed(() => this.state().isMobile);
  isDarkMode = computed(() => this.state().isDarkMode);
  showPlaylist = computed(() => this.state().showPlaylist);

  constructor() {
    this.initAudio();
    
    effect(() => {
      if (typeof window !== 'undefined' && localStorage) {
        localStorage.setItem('darkMode', this.state().isDarkMode.toString());
      }
    });
    
    effect(() => {
      if (typeof document !== 'undefined') {
        const html = document.documentElement;
        if (this.state().isDarkMode) {
          html.classList.add('dark');
        } else {
          html.classList.remove('dark');
        }
      }
    });
  }

  private initAudio(): void {
    if (typeof window === 'undefined') return;
    
    this.audio = new Audio();
    this.audio.volume = this.state().volume;

    this.audio.addEventListener('timeupdate', () => {
      this.state.update(s => ({ ...s, currentTime: this.audio?.currentTime || 0 }));
    });

    this.audio.addEventListener('loadedmetadata', () => {
      this.state.update(s => ({ ...s, duration: this.audio?.duration || 0, isLoading: false }));
    });

    this.audio.addEventListener('ended', () => {
      this.handleSongEnd();
    });

    this.audio.addEventListener('error', (e) => {
      console.error('Audio error:', e);
      this.state.update(s => ({ 
        ...s, 
        isLoading: false, 
        isPlaying: false,
        error: '音频加载失败，请检查网络连接或稍后重试' 
      }));
    });

    this.audio.addEventListener('waiting', () => {
      this.state.update(s => ({ ...s, isLoading: true }));
    });

    this.audio.addEventListener('canplay', () => {
      this.state.update(s => ({ ...s, isLoading: false }));
    });

    window.addEventListener('resize', () => {
      this.state.update(s => ({ ...s, isMobile: isMobileDevice() }));
    });
  }

  setPlaylist(songs: Song[]): void {
    this.state.update(s => ({ ...s, playlist: songs }));
  }

  playSong(song: Song, index?: number): void {
    if (!this.audio) return;
    
    const currentIndex = index !== undefined 
      ? index 
      : this.state().playlist.findIndex(s => s.id === song.id);
    
    this.state.update(s => ({ 
      ...s, 
      currentSong: song, 
      currentIndex,
      error: null,
      isLoading: true,
      isPlaying: false
    }));
    
    this.audio.src = song.audioUrl;
    this.audio.load();
    this.audio.play()
      .then(() => {
        this.state.update(s => ({ ...s, isPlaying: true, isLoading: false }));
      })
      .catch(err => {
        console.error('Playback error:', err);
        this.state.update(s => ({ 
          ...s, 
          isPlaying: false,
          isLoading: false,
          error: '自动播放被阻止，请点击播放按钮开始播放' 
        }));
      });
  }

  togglePlay(): void {
    if (!this.audio || !this.state().currentSong) return;
    
    if (this.state().isPlaying) {
      this.audio.pause();
      this.state.update(s => ({ ...s, isPlaying: false }));
    } else {
      this.audio.play().catch(err => {
        console.error('Playback error:', err);
        this.state.update(s => ({ ...s, error: '播放失败' }));
      });
      this.state.update(s => ({ ...s, isPlaying: true }));
    }
  }

  playNext(): void {
    const { playlist, currentIndex, playMode } = this.state();
    if (playlist.length === 0) return;

    let nextIndex: number;
    
    if (playMode === PlayMode.SHUFFLE) {
      nextIndex = Math.floor(Math.random() * playlist.length);
    } else {
      nextIndex = (currentIndex + 1) % playlist.length;
    }

    this.playSong(playlist[nextIndex], nextIndex);
  }

  playPrevious(): void {
    const { playlist, currentIndex, playMode } = this.state();
    if (playlist.length === 0) return;

    let prevIndex: number;
    
    if (playMode === PlayMode.SHUFFLE) {
      prevIndex = Math.floor(Math.random() * playlist.length);
    } else {
      prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    }

    this.playSong(playlist[prevIndex], prevIndex);
  }

  private handleSongEnd(): void {
    const { playMode } = this.state();
    
    if (playMode === PlayMode.SINGLE) {
      if (this.audio) {
        this.audio.currentTime = 0;
        this.audio.play().catch(() => {});
      }
    } else {
      this.playNext();
    }
  }

  seekTo(time: number): void {
    if (!this.audio) return;
    this.audio.currentTime = time;
    this.state.update(s => ({ ...s, currentTime: time }));
  }

  setVolume(volume: number): void {
    if (!this.audio) return;
    
    const clampedVolume = Math.max(0, Math.min(1, volume));
    this.audio.volume = clampedVolume;
    this.state.update(s => ({ ...s, volume: clampedVolume, isMuted: clampedVolume === 0 }));
  }

  toggleMute(): void {
    if (!this.audio) return;
    
    const { isMuted, volume } = this.state();
    
    if (isMuted) {
      this.audio.volume = volume || 0.7;
      this.state.update(s => ({ ...s, isMuted: false }));
    } else {
      this.audio.volume = 0;
      this.state.update(s => ({ ...s, isMuted: true }));
    }
  }

  togglePlayMode(): void {
    const modes = [PlayMode.LIST, PlayMode.SINGLE, PlayMode.SHUFFLE];
    const currentModeIndex = modes.indexOf(this.state().playMode);
    const nextMode = modes[(currentModeIndex + 1) % modes.length];
    this.state.update(s => ({ ...s, playMode: nextMode }));
  }

  setPlayMode(mode: PlayMode): void {
    this.state.update(s => ({ ...s, playMode: mode }));
  }

  toggleDarkMode(): void {
    this.state.update(s => ({ ...s, isDarkMode: !s.isDarkMode }));
  }

  togglePlaylist(): void {
    this.state.update(s => ({ ...s, showPlaylist: !s.showPlaylist }));
  }

  clearError(): void {
    this.state.update(s => ({ ...s, error: null }));
  }
}
