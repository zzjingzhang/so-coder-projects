import { Component, OnInit } from '@angular/core';
import { AquariumDataService } from '../services/aquarium-data.service';
import { Tank, WaterQuality, FeedingSchedule, Filter } from '../models/aquarium-data.model';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  tanks: Tank[] = [];
  waterQualityHistory: WaterQuality[] = [];
  feedingSchedules: FeedingSchedule[] = [];
  filters: Filter[] = [];
  totalFishCount: number = 0;
  averageTemperature: number = 0;
  averagePh: number = 0;
  currentTime: string = '';

  constructor(private aquariumDataService: AquariumDataService) {}

  ngOnInit(): void {
    this.loadData();
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
  }

  loadData(): void {
    this.aquariumDataService.getTanks().subscribe(tanks => {
      this.tanks = tanks;
    });

    this.aquariumDataService.getWaterQualityHistory().subscribe(history => {
      this.waterQualityHistory = history;
    });

    this.aquariumDataService.getFeedingSchedules().subscribe(schedules => {
      this.feedingSchedules = schedules;
    });

    this.aquariumDataService.getFilters().subscribe(filters => {
      this.filters = filters;
    });

    this.aquariumDataService.getTotalFishCount().subscribe(count => {
      this.totalFishCount = count;
    });

    this.aquariumDataService.getAverageTemperature().subscribe(temp => {
      this.averageTemperature = temp;
    });

    this.aquariumDataService.getAveragePh().subscribe(ph => {
      this.averagePh = ph;
    });
  }

  updateTime(): void {
    const now = new Date();
    this.currentTime = now.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'running':
        return 'text-green-500';
      case 'maintenance':
        return 'text-yellow-500';
      case 'stopped':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'running':
        return '运行中';
      case 'maintenance':
        return '维护中';
      case 'stopped':
        return '已停止';
      default:
        return '未知';
    }
  }

  getTemperatureStatus(current: number, target: number): string {
    const diff = Math.abs(current - target);
    if (diff <= 0.5) {
      return 'text-green-500';
    } else if (diff <= 1) {
      return 'text-yellow-500';
    } else {
      return 'text-red-500';
    }
  }

  getPhStatus(current: number, target: number): string {
    const diff = Math.abs(current - target);
    if (diff <= 0.2) {
      return 'text-green-500';
    } else if (diff <= 0.5) {
      return 'text-yellow-500';
    } else {
      return 'text-red-500';
    }
  }

  toggleFeeding(schedule: FeedingSchedule): void {
    this.aquariumDataService.toggleFeedingSchedule(schedule.id);
    schedule.completed = !schedule.completed;
  }

  getCompletedCount(): number {
    return this.feedingSchedules.filter(s => s.completed).length;
  }

  getRunningFiltersCount(): number {
    return this.filters.filter(f => f.status === 'running').length;
  }

  getTankName(tankId: number): string {
    const tank = this.tanks.find(t => t.id === tankId);
    return tank ? tank.name : '未知水箱';
  }
}
