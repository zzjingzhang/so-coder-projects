import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Mood } from './theme.service';

export interface Song {
  id: string;
  title: string;
  author: string;
  githubUrl: string;
  mood: Mood;
  audioUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private isPlayingSubject = new BehaviorSubject<boolean>(false);
  private currentSongSubject = new BehaviorSubject<Song | null>(null);
  private volumeSubject = new BehaviorSubject<number>(70);
  private playlistSubject = new BehaviorSubject<Song[]>([]);

  isPlaying$ = this.isPlayingSubject.asObservable();
  currentSong$ = this.currentSongSubject.asObservable();
  volume$ = this.volumeSubject.asObservable();
  playlist$ = this.playlistSubject.asObservable();

  private songs: Record<Mood, Song[]> = {
    chill: [
      { id: 'chill-1', title: 'Midnight Lofi', author: 'Lofi Studio', githubUrl: 'https://github.com/lofi-studio', mood: 'chill' },
      { id: 'chill-2', title: 'Rainy Window', author: 'Chill Beats', githubUrl: 'https://github.com/chill-beats', mood: 'chill' },
      { id: 'chill-3', title: 'Cozy Corner', author: 'Ambient Sounds', githubUrl: 'https://github.com/ambient-sounds', mood: 'chill' }
    ],
    jazz: [
      { id: 'jazz-1', title: 'Jazz Coffee', author: 'Jazz Collective', githubUrl: 'https://github.com/jazz-collective', mood: 'jazz' },
      { id: 'jazz-2', title: 'Smooth Evening', author: 'Jazz Lab', githubUrl: 'https://github.com/jazz-lab', mood: 'jazz' },
      { id: 'jazz-3', title: 'Saxophone Dreams', author: 'Smooth Jazz', githubUrl: 'https://github.com/smooth-jazz', mood: 'jazz' }
    ],
    sleep: [
      { id: 'sleep-1', title: 'Deep Slumber', author: 'Sleep Sounds', githubUrl: 'https://github.com/sleep-sounds', mood: 'sleep' },
      { id: 'sleep-2', title: 'Dreamland', author: 'Relaxing Music', githubUrl: 'https://github.com/relaxing-music', mood: 'sleep' },
      { id: 'sleep-3', title: 'Peaceful Night', author: 'Ambient Sleep', githubUrl: 'https://github.com/ambient-sleep', mood: 'sleep' }
    ]
  };

  private currentMood: Mood = 'chill';
  private currentSongIndex: number = 0;

  constructor() {
    this.initPlaylist();
  }

  private initPlaylist(): void {
    const playlist = this.songs[this.currentMood];
    this.playlistSubject.next(playlist);
    if (playlist.length > 0 && !this.currentSongSubject.value) {
      this.currentSongSubject.next(playlist[0]);
    }
  }

  setMood(mood: Mood): void {
    this.currentMood = mood;
    this.currentSongIndex = 0;
    const playlist = this.songs[mood];
    this.playlistSubject.next(playlist);
    if (playlist.length > 0) {
      this.currentSongSubject.next(playlist[0]);
    }
  }

  togglePlay(): void {
    this.isPlayingSubject.next(!this.isPlayingSubject.value);
  }

  play(): void {
    this.isPlayingSubject.next(true);
  }

  pause(): void {
    this.isPlayingSubject.next(false);
  }

  isPlaying(): boolean {
    return this.isPlayingSubject.value;
  }

  getCurrentSong(): Song | null {
    return this.currentSongSubject.value;
  }

  nextSong(): void {
    const playlist = this.playlistSubject.value;
    if (playlist.length === 0) return;

    this.currentSongIndex = (this.currentSongIndex + 1) % playlist.length;
    this.currentSongSubject.next(playlist[this.currentSongIndex]);
  }

  previousSong(): void {
    const playlist = this.playlistSubject.value;
    if (playlist.length === 0) return;

    this.currentSongIndex = (this.currentSongIndex - 1 + playlist.length) % playlist.length;
    this.currentSongSubject.next(playlist[this.currentSongIndex]);
  }

  setVolume(volume: number): void {
    const clampedVolume = Math.max(0, Math.min(100, volume));
    this.volumeSubject.next(clampedVolume);
    localStorage.setItem('lofi-volume', String(clampedVolume));
  }

  getVolume(): number {
    return this.volumeSubject.value;
  }

  initVolume(): void {
    const savedVolume = localStorage.getItem('lofi-volume');
    if (savedVolume !== null) {
      this.volumeSubject.next(Number(savedVolume));
    }
  }
}
