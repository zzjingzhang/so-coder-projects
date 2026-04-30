import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Mood = 'chill' | 'jazz' | 'sleep';
export type DayNight = 'day' | 'night';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkModeSubject = new BehaviorSubject<boolean>(true);
  private dayNightSubject = new BehaviorSubject<DayNight>('night');
  private moodSubject = new BehaviorSubject<Mood>('chill');
  private rainModeSubject = new BehaviorSubject<boolean>(false);
  private isFullscreenSubject = new BehaviorSubject<boolean>(false);

  darkMode$ = this.darkModeSubject.asObservable();
  dayNight$ = this.dayNightSubject.asObservable();
  mood$ = this.moodSubject.asObservable();
  rainMode$ = this.rainModeSubject.asObservable();
  isFullscreen$ = this.isFullscreenSubject.asObservable();

  constructor() {}

  initTheme(): void {
    const savedDarkMode = localStorage.getItem('lofi-dark-mode');
    const savedMood = localStorage.getItem('lofi-mood') as Mood;
    const savedDayNight = localStorage.getItem('lofi-day-night') as DayNight;
    const savedRainMode = localStorage.getItem('lofi-rain-mode');

    if (savedDarkMode !== null) {
      this.darkModeSubject.next(savedDarkMode === 'true');
    }

    if (savedMood && ['chill', 'jazz', 'sleep'].includes(savedMood)) {
      this.moodSubject.next(savedMood);
    }

    if (savedDayNight && ['day', 'night'].includes(savedDayNight)) {
      this.dayNightSubject.next(savedDayNight);
    }

    if (savedRainMode !== null) {
      this.rainModeSubject.next(savedRainMode === 'true');
    }
  }

  isDarkMode(): boolean {
    return this.darkModeSubject.value;
  }

  toggleDarkMode(): void {
    const newValue = !this.darkModeSubject.value;
    this.darkModeSubject.next(newValue);
    localStorage.setItem('lofi-dark-mode', String(newValue));
  }

  getDayNight(): DayNight {
    return this.dayNightSubject.value;
  }

  setDayNight(mode: DayNight): void {
    this.dayNightSubject.next(mode);
    localStorage.setItem('lofi-day-night', mode);
  }

  toggleDayNight(): void {
    const newValue = this.dayNightSubject.value === 'day' ? 'night' : 'day';
    this.setDayNight(newValue);
  }

  getMood(): Mood {
    return this.moodSubject.value;
  }

  setMood(mood: Mood): void {
    this.moodSubject.next(mood);
    localStorage.setItem('lofi-mood', mood);
  }

  isRainMode(): boolean {
    return this.rainModeSubject.value;
  }

  toggleRainMode(): void {
    const newValue = !this.rainModeSubject.value;
    this.rainModeSubject.next(newValue);
    localStorage.setItem('lofi-rain-mode', String(newValue));
  }

  async toggleFullscreen(): Promise<void> {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        this.isFullscreenSubject.next(true);
      } else {
        await document.exitFullscreen();
        this.isFullscreenSubject.next(false);
      }
    } catch (err) {
      console.error('Fullscreen error:', err);
    }
  }
}
