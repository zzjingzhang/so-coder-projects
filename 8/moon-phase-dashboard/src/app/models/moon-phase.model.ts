export enum MoonPhaseName {
  NEW_MOON = '新月',
  WAXING_CRESCENT = '蛾眉月',
  FIRST_QUARTER = '上弦月',
  WAXING_GIBBOUS = '盈凸月',
  FULL_MOON = '满月',
  WANING_GIBBOUS = '亏凸月',
  LAST_QUARTER = '下弦月',
  WANING_CRESCENT = '残月'
}

export enum ZodiacSign {
  ARIES = '白羊座',
  TAURUS = '金牛座',
  GEMINI = '双子座',
  CANCER = '巨蟹座',
  LEO = '狮子座',
  VIRGO = '处女座',
  LIBRA = '天秤座',
  SCORPIO = '天蝎座',
  SAGITTARIUS = '射手座',
  CAPRICORN = '摩羯座',
  AQUARIUS = '水瓶座',
  PISCES = '双鱼座'
}

export interface DailyMoonPhase {
  date: Date;
  phaseName: MoonPhaseName;
  phasePercentage: number;
  illumination: number;
  moonriseTime: string;
  moonsetTime: string;
  zodiacSign: ZodiacSign;
  zodiacDegree: number;
}

export interface EclipseEvent {
  date: Date;
  type: 'solar' | 'lunar';
  name: string;
  visibility: string;
  magnitude: number;
}

export interface MonthlyMoonData {
  year: number;
  month: number;
  dailyPhases: DailyMoonPhase[];
  upcomingEclipses: EclipseEvent[];
}
