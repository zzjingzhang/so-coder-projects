import { Injectable } from '@angular/core';
import { DailyMoonPhase, EclipseEvent, MonthlyMoonData, MoonPhaseName, ZodiacSign } from '../models/moon-phase.model';

@Injectable({
  providedIn: 'root'
})
export class MoonPhaseService {

  private readonly SYNODIC_MONTH = 29.53058867;
  private readonly KNOWN_NEW_MOON = new Date(2026, 3, 17, 18, 25);

  constructor() {}

  getMonthlyData(year: number, month: number): MonthlyMoonData {
    const dailyPhases: DailyMoonPhase[] = [];
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      dailyPhases.push(this.calculateDailyPhase(date));
    }

    const upcomingEclipses = this.getUpcomingEclipses(year, month);

    return {
      year,
      month,
      dailyPhases,
      upcomingEclipses
    };
  }

  getCurrentMonthData(): MonthlyMoonData {
    const now = new Date();
    return this.getMonthlyData(now.getFullYear(), now.getMonth());
  }

  private calculateDailyPhase(date: Date): DailyMoonPhase {
    const daysSinceKnownNewMoon = this.daysBetween(this.KNOWN_NEW_MOON, date);
    const cycles = daysSinceKnownNewMoon / this.SYNODIC_MONTH;
    const cycleFraction = cycles - Math.floor(cycles);

    const phasePercentage = cycleFraction * 100;
    const illumination = this.calculateIllumination(cycleFraction);
    const phaseName = this.getPhaseName(cycleFraction);

    const moonriseTime = this.calculateMoonriseTime(date);
    const moonsetTime = this.calculateMoonsetTime(date, moonriseTime);

    const zodiacInfo = this.calculateZodiacPosition(date, cycleFraction);

    return {
      date,
      phaseName,
      phasePercentage,
      illumination,
      moonriseTime,
      moonsetTime,
      zodiacSign: zodiacInfo.sign,
      zodiacDegree: zodiacInfo.degree
    };
  }

  private daysBetween(date1: Date, date2: Date): number {
    const oneDay = 24 * 60 * 60 * 1000;
    return (date2.getTime() - date1.getTime()) / oneDay;
  }

  private getPhaseName(cycleFraction: number): MoonPhaseName {
    const phase = cycleFraction * 8;
    if (phase < 0.5 || phase >= 7.5) return MoonPhaseName.NEW_MOON;
    if (phase < 1.5) return MoonPhaseName.WAXING_CRESCENT;
    if (phase < 2.5) return MoonPhaseName.FIRST_QUARTER;
    if (phase < 3.5) return MoonPhaseName.WAXING_GIBBOUS;
    if (phase < 4.5) return MoonPhaseName.FULL_MOON;
    if (phase < 5.5) return MoonPhaseName.WANING_GIBBOUS;
    if (phase < 6.5) return MoonPhaseName.LAST_QUARTER;
    return MoonPhaseName.WANING_CRESCENT;
  }

  private calculateIllumination(cycleFraction: number): number {
    const angle = cycleFraction * 2 * Math.PI;
    return (1 + Math.cos(angle)) / 2 * 100;
  }

  private calculateMoonriseTime(date: Date): string {
    const dayOfYear = this.getDayOfYear(date);
    const riseHour = 6 + (dayOfYear % 29.53) * (24 / 29.53);
    return this.formatTime(riseHour);
  }

  private calculateMoonsetTime(date: Date, moonriseTime: string): string {
    const [riseHour, riseMin] = moonriseTime.split(':').map(Number);
    let setHour = riseHour + 12 + (Math.random() * 2 - 1);
    let setMin = riseMin + Math.floor(Math.random() * 30 - 15);

    if (setMin < 0) {
      setMin += 60;
      setHour -= 1;
    } else if (setMin >= 60) {
      setMin -= 60;
      setHour += 1;
    }

    if (setHour >= 24) setHour -= 24;

    return this.formatTime(setHour, setMin);
  }

  private getDayOfYear(date: Date): number {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }

  private formatTime(hours: number, minutes?: number): string {
    const h = Math.floor(hours) % 24;
    const m = minutes ?? Math.floor((hours - Math.floor(hours)) * 60);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  }

  private calculateZodiacPosition(date: Date, moonCycleFraction: number): { sign: ZodiacSign; degree: number } {
    const dayOfYear = this.getDayOfYear(date);
    const basePosition = (dayOfYear * 13.176358 + moonCycleFraction * 360) % 360;
    const signIndex = Math.floor(basePosition / 30);
    const degree = basePosition % 30;

    const signs = [
      ZodiacSign.ARIES,
      ZodiacSign.TAURUS,
      ZodiacSign.GEMINI,
      ZodiacSign.CANCER,
      ZodiacSign.LEO,
      ZodiacSign.VIRGO,
      ZodiacSign.LIBRA,
      ZodiacSign.SCORPIO,
      ZodiacSign.SAGITTARIUS,
      ZodiacSign.CAPRICORN,
      ZodiacSign.AQUARIUS,
      ZodiacSign.PISCES
    ];

    return {
      sign: signs[signIndex],
      degree: Math.round(degree * 100) / 100
    };
  }

  private getUpcomingEclipses(year: number, month: number): EclipseEvent[] {
    const eclipses: EclipseEvent[] = [];

    if (year === 2026) {
      eclipses.push({
        date: new Date(2026, 1, 12),
        type: 'solar',
        name: '日环食',
        visibility: '南极洲、南美洲南部可见',
        magnitude: 0.967
      });

      eclipses.push({
        date: new Date(2026, 1, 27),
        type: 'lunar',
        name: '月全食',
        visibility: '亚洲、欧洲、非洲、美洲可见',
        magnitude: 1.048
      });

      eclipses.push({
        date: new Date(2026, 7, 12),
        type: 'solar',
        name: '日全食',
        visibility: '北极地区、格陵兰岛、冰岛可见',
        magnitude: 1.038
      });

      eclipses.push({
        date: new Date(2026, 7, 28),
        type: 'lunar',
        name: '月偏食',
        visibility: '亚洲、澳大利亚、太平洋地区可见',
        magnitude: 0.459
      });
    }

    if (year === 2027) {
      eclipses.push({
        date: new Date(2027, 1, 6),
        type: 'solar',
        name: '日环食',
        visibility: '非洲、中东、亚洲南部可见',
        magnitude: 0.979
      });

      eclipses.push({
        date: new Date(2027, 1, 22),
        type: 'lunar',
        name: '月全食',
        visibility: '美洲、欧洲、非洲、亚洲西部可见',
        magnitude: 1.145
      });

      eclipses.push({
        date: new Date(2027, 7, 2),
        type: 'solar',
        name: '日全食',
        visibility: '北非、中东、亚洲南部可见',
        magnitude: 1.079
      });
    }

    const currentDate = new Date(year, month, 1);
    const nextMonth = new Date(year, month + 1, 0);

    return eclipses.filter(eclipse => 
      eclipse.date >= currentDate || 
      (eclipse.date.getMonth() === month && eclipse.date.getFullYear() === year)
    ).slice(0, 5);
  }

  getPhaseIcon(phaseName: MoonPhaseName): string {
    const icons: Record<MoonPhaseName, string> = {
      [MoonPhaseName.NEW_MOON]: '🌑',
      [MoonPhaseName.WAXING_CRESCENT]: '🌒',
      [MoonPhaseName.FIRST_QUARTER]: '🌓',
      [MoonPhaseName.WAXING_GIBBOUS]: '🌔',
      [MoonPhaseName.FULL_MOON]: '🌕',
      [MoonPhaseName.WANING_GIBBOUS]: '🌖',
      [MoonPhaseName.LAST_QUARTER]: '🌗',
      [MoonPhaseName.WANING_CRESCENT]: '🌘'
    };
    return icons[phaseName];
  }

  getZodiacSymbol(sign: ZodiacSign): string {
    const symbols: Record<ZodiacSign, string> = {
      [ZodiacSign.ARIES]: '♈',
      [ZodiacSign.TAURUS]: '♉',
      [ZodiacSign.GEMINI]: '♊',
      [ZodiacSign.CANCER]: '♋',
      [ZodiacSign.LEO]: '♌',
      [ZodiacSign.VIRGO]: '♍',
      [ZodiacSign.LIBRA]: '♎',
      [ZodiacSign.SCORPIO]: '♏',
      [ZodiacSign.SAGITTARIUS]: '♐',
      [ZodiacSign.CAPRICORN]: '♑',
      [ZodiacSign.AQUARIUS]: '♒',
      [ZodiacSign.PISCES]: '♓'
    };
    return symbols[sign];
  }
}
