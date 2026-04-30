import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'coursespace-theme';
  private themeSubject = new BehaviorSubject<Theme>('light');
  public theme$: Observable<Theme> = this.themeSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  initTheme(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const savedTheme = localStorage.getItem(this.THEME_KEY) as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const theme: Theme = savedTheme || (prefersDark ? 'dark' : 'light');
    this.setTheme(theme);
  }

  setTheme(theme: Theme): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.THEME_KEY, theme);
      
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      this.themeSubject.next(theme);
    }
  }

  toggleTheme(): void {
    const currentTheme = this.themeSubject.value;
    const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  getCurrentTheme(): Theme {
    return this.themeSubject.value;
  }
}
