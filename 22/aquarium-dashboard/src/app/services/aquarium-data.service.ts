import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Tank, WaterQuality, FeedingSchedule, Filter, Fish } from '../models/aquarium-data.model';

@Injectable({
  providedIn: 'root'
})
export class AquariumDataService {
  private tanks: Tank[] = [
    {
      id: 1,
      name: '主展示缸',
      volume: 200,
      currentTemperature: 25.5,
      targetTemperature: 26,
      currentPh: 7.2,
      targetPh: 7.0,
      fishCount: 15,
      lastWaterChange: '2026-04-28',
      nextWaterChange: '2026-05-05'
    },
    {
      id: 2,
      name: '繁殖缸',
      volume: 50,
      currentTemperature: 27.8,
      targetTemperature: 28,
      currentPh: 6.8,
      targetPh: 6.8,
      fishCount: 8,
      lastWaterChange: '2026-04-30',
      nextWaterChange: '2026-05-07'
    },
    {
      id: 3,
      name: '检疫缸',
      volume: 30,
      currentTemperature: 26.2,
      targetTemperature: 26,
      currentPh: 7.5,
      targetPh: 7.2,
      fishCount: 3,
      lastWaterChange: '2026-05-01',
      nextWaterChange: '2026-05-08'
    }
  ];

  private waterQualityHistory: WaterQuality[] = [
    { date: '04-24', temperature: 25.3, ph: 7.1, ammonia: 0.01, nitrite: 0.02, nitrate: 15 },
    { date: '04-25', temperature: 25.6, ph: 7.2, ammonia: 0.01, nitrite: 0.01, nitrate: 18 },
    { date: '04-26', temperature: 25.4, ph: 7.0, ammonia: 0.02, nitrite: 0.02, nitrate: 20 },
    { date: '04-27', temperature: 25.8, ph: 7.3, ammonia: 0.01, nitrite: 0.01, nitrate: 22 },
    { date: '04-28', temperature: 25.5, ph: 7.2, ammonia: 0.01, nitrite: 0.02, nitrate: 19 },
    { date: '04-29', temperature: 25.7, ph: 7.1, ammonia: 0.01, nitrite: 0.01, nitrate: 17 },
    { date: '04-30', temperature: 25.9, ph: 7.2, ammonia: 0.02, nitrite: 0.01, nitrate: 16 },
    { date: '05-01', temperature: 25.6, ph: 7.1, ammonia: 0.01, nitrite: 0.02, nitrate: 18 },
    { date: '05-02', temperature: 25.4, ph: 7.0, ammonia: 0.01, nitrite: 0.01, nitrate: 21 },
    { date: '05-03', temperature: 25.5, ph: 7.2, ammonia: 0.01, nitrite: 0.01, nitrate: 15 }
  ];

  private feedingSchedules: FeedingSchedule[] = [
    { id: 1, time: '08:00', foodType: '薄片饲料', amount: '1小勺', tankId: 1, completed: true },
    { id: 2, time: '12:00', foodType: '冷冻丰年虾', amount: '5块', tankId: 1, completed: false },
    { id: 3, time: '18:00', foodType: '颗粒饲料', amount: '1小勺', tankId: 1, completed: false },
    { id: 4, time: '09:00', foodType: '鱼苗专用饲料', amount: '少量', tankId: 2, completed: true },
    { id: 5, time: '15:00', foodType: '鱼苗专用饲料', amount: '少量', tankId: 2, completed: false },
    { id: 6, time: '10:00', foodType: '检疫专用饲料', amount: '1小勺', tankId: 3, completed: true },
    { id: 7, time: '17:00', foodType: '检疫专用饲料', amount: '1小勺', tankId: 3, completed: false }
  ];

  private filters: Filter[] = [
    { id: 1, name: '主缸过滤系统', type: '底部过滤', tankId: 1, status: 'running', lastMaintenance: '2026-04-15', nextMaintenance: '2026-05-15', efficiency: 95 },
    { id: 2, name: '前置过滤器', type: '外置过滤桶', tankId: 1, status: 'running', lastMaintenance: '2026-04-20', nextMaintenance: '2026-05-20', efficiency: 98 },
    { id: 3, name: '繁殖缸过滤器', type: '水妖精', tankId: 2, status: 'running', lastMaintenance: '2026-04-25', nextMaintenance: '2026-05-25', efficiency: 90 },
    { id: 4, name: '检疫缸过滤器', type: '内置过滤', tankId: 3, status: 'maintenance', lastMaintenance: '2026-05-03', nextMaintenance: '2026-06-03', efficiency: 0 }
  ];

  private fish: Fish[] = [
    { id: 1, name: '红龙1号', species: '血红龙', tankId: 1, addedDate: '2025-03-10', healthStatus: 'healthy' },
    { id: 2, name: '金龙1号', species: '过背金龙', tankId: 1, addedDate: '2025-06-15', healthStatus: 'healthy' },
    { id: 3, name: '虎鱼1号', species: '泰国虎', tankId: 1, addedDate: '2025-08-20', healthStatus: 'healthy' },
    { id: 4, name: '虎鱼2号', species: '泰国虎', tankId: 1, addedDate: '2025-09-05', healthStatus: 'monitoring' },
    { id: 5, name: '魟鱼1号', species: '黑白魟', tankId: 1, addedDate: '2025-11-10', healthStatus: 'healthy' },
    { id: 6, name: '七彩1号', species: '红松石七彩', tankId: 2, addedDate: '2026-03-01', healthStatus: 'healthy' },
    { id: 7, name: '七彩2号', species: '蓝松石七彩', tankId: 2, addedDate: '2026-03-01', healthStatus: 'healthy' },
    { id: 8, name: '孔雀鱼群', species: '全红孔雀鱼', tankId: 3, addedDate: '2026-04-25', healthStatus: 'sick' }
  ];

  constructor() { }

  getTanks(): Observable<Tank[]> {
    return of(this.tanks);
  }

  getWaterQualityHistory(): Observable<WaterQuality[]> {
    return of(this.waterQualityHistory);
  }

  getFeedingSchedules(): Observable<FeedingSchedule[]> {
    return of(this.feedingSchedules);
  }

  getFilters(): Observable<Filter[]> {
    return of(this.filters);
  }

  getFish(): Observable<Fish[]> {
    return of(this.fish);
  }

  getTotalFishCount(): Observable<number> {
    return of(this.tanks.reduce((total, tank) => total + tank.fishCount, 0));
  }

  getAverageTemperature(): Observable<number> {
    const avg = this.tanks.reduce((total, tank) => total + tank.currentTemperature, 0) / this.tanks.length;
    return of(parseFloat(avg.toFixed(1)));
  }

  getAveragePh(): Observable<number> {
    const avg = this.tanks.reduce((total, tank) => total + tank.currentPh, 0) / this.tanks.length;
    return of(parseFloat(avg.toFixed(2)));
  }

  toggleFeedingSchedule(id: number): void {
    const schedule = this.feedingSchedules.find(s => s.id === id);
    if (schedule) {
      schedule.completed = !schedule.completed;
    }
  }
}
