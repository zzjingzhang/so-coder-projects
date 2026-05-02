import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Achievement } from '../models/achievement.model';
import { mockAchievements } from '../data/mock-data';

@Injectable({
  providedIn: 'root'
})
export class AchievementService {
  private achievements: Achievement[] = [...mockAchievements];

  constructor() { }

  getAllAchievements(): Observable<Achievement[]> {
    return of(this.achievements);
  }

  getEarnedAchievements(): Observable<Achievement[]> {
    const earned = this.achievements.filter(a => a.earned);
    return of(earned);
  }

  getLockedAchievements(): Observable<Achievement[]> {
    const locked = this.achievements.filter(a => !a.earned);
    return of(locked);
  }

  getAchievementsByCategory(category: 'learning' | 'streak' | 'social' | 'milestone'): Observable<Achievement[]> {
    const filtered = this.achievements.filter(a => a.category === category);
    return of(filtered);
  }
}
