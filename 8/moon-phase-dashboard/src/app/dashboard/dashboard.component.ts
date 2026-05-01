import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MoonPhaseService } from '../services/moon-phase.service';
import { DailyMoonPhase, EclipseEvent, MonthlyMoonData, MoonPhaseName } from '../models/moon-phase.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatTabsModule,
    MatChipsModule,
    MatTooltipModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  monthlyData!: MonthlyMoonData;
  currentPhase!: DailyMoonPhase;
  selectedDay!: DailyMoonPhase;
  currentYear: number = new Date().getFullYear();
  currentMonth: number = new Date().getMonth();
  monthNames = [
    '一月', '二月', '三月', '四月', '五月', '六月',
    '七月', '八月', '九月', '十月', '十一月', '十二月'
  ];

  allPhases = [
    { name: MoonPhaseName.NEW_MOON, englishName: 'New Moon' },
    { name: MoonPhaseName.WAXING_CRESCENT, englishName: 'Waxing Crescent' },
    { name: MoonPhaseName.FIRST_QUARTER, englishName: 'First Quarter' },
    { name: MoonPhaseName.WAXING_GIBBOUS, englishName: 'Waxing Gibbous' },
    { name: MoonPhaseName.FULL_MOON, englishName: 'Full Moon' },
    { name: MoonPhaseName.WANING_GIBBOUS, englishName: 'Waning Gibbous' },
    { name: MoonPhaseName.LAST_QUARTER, englishName: 'Last Quarter' },
    { name: MoonPhaseName.WANING_CRESCENT, englishName: 'Waning Crescent' }
  ];

  constructor(private moonPhaseService: MoonPhaseService) {}

  ngOnInit(): void {
    this.loadMonthlyData();
  }

  loadMonthlyData(): void {
    this.monthlyData = this.moonPhaseService.getMonthlyData(this.currentYear, this.currentMonth);
    const today = new Date();
    const todayIndex = today.getDate() - 1;
    if (todayIndex >= 0 && todayIndex < this.monthlyData.dailyPhases.length) {
      this.currentPhase = this.monthlyData.dailyPhases[todayIndex];
      this.selectedDay = this.currentPhase;
    } else {
      this.currentPhase = this.monthlyData.dailyPhases[0];
      this.selectedDay = this.monthlyData.dailyPhases[0];
    }
  }

  previousMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.loadMonthlyData();
  }

  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.loadMonthlyData();
  }

  selectDay(day: DailyMoonPhase): void {
    this.selectedDay = day;
  }

  getPhaseIcon(phaseName: MoonPhaseName): string {
    return this.moonPhaseService.getPhaseIcon(phaseName);
  }

  getZodiacSymbol(sign: string): string {
    const symbols: Record<string, string> = {
      '白羊座': '♈',
      '金牛座': '♉',
      '双子座': '♊',
      '巨蟹座': '♋',
      '狮子座': '♌',
      '处女座': '♍',
      '天秤座': '♎',
      '天蝎座': '♏',
      '射手座': '♐',
      '摩羯座': '♑',
      '水瓶座': '♒',
      '双鱼座': '♓'
    };
    return symbols[sign] || '';
  }

  getEclipseIcon(type: 'solar' | 'lunar'): string {
    return type === 'solar' ? '☀️' : '🌙';
  }

  getEclipseTypeText(type: 'solar' | 'lunar'): string {
    return type === 'solar' ? '日食' : '月食';
  }

  isToday(day: DailyMoonPhase): boolean {
    const today = new Date();
    return day.date.getDate() === today.getDate() &&
           day.date.getMonth() === today.getMonth() &&
           day.date.getFullYear() === today.getFullYear();
  }

  isSelected(day: DailyMoonPhase): boolean {
    return day.date.getDate() === this.selectedDay?.date.getDate() &&
           day.date.getMonth() === this.selectedDay?.date.getMonth() &&
           day.date.getFullYear() === this.selectedDay?.date.getFullYear();
  }

  getWeekdayName(day: DailyMoonPhase): string {
    const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
    return `周${weekdays[day.date.getDay()]}`;
  }

  getDayClasses(day: DailyMoonPhase): string {
    let classes = 'day-button';
    if (this.isToday(day)) {
      classes += ' today';
    }
    if (this.isSelected(day)) {
      classes += ' selected';
    }
    return classes;
  }
}
