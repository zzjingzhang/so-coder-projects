import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeekNumberService {

  constructor() { }

  getWeekNumber(): number {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const diff = now.getTime() - startOfYear.getTime();
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    const weekNumber = Math.ceil((diff + startOfYear.getDay() * 24 * 60 * 60 * 1000) / oneWeek);
    return Math.max(1, weekNumber);
  }

  isEvenWeek(): boolean {
    return this.getWeekNumber() % 2 === 0;
  }
}
