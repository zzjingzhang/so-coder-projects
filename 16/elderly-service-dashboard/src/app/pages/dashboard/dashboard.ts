import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBadgeModule } from '@angular/material/badge';

interface StatData {
  label: string;
  value: number;
  icon: string;
  change?: number;
  color?: string;
}

interface Institution {
  name: string;
  type: string;
  beds: number;
  occupied: number;
  status: string;
}

interface DiningPoint {
  name: string;
  location: string;
  capacity: number;
  todayMeals: number;
  rating: number;
}

interface ServiceCenter {
  name: string;
  area: string;
  services: string[];
  staff: number;
  status: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatBadgeModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  currentTime = new Date();
  
  // 老人档案统计
  elderlyStats: StatData[] = [
    { label: '总老人数', value: 12580, icon: 'people', change: 2.5 },
    { label: '高龄老人', value: 3240, icon: 'elderly', change: 1.8 },
    { label: '独居老人', value: 1890, icon: 'person', change: -0.5 },
    { label: '特殊照料', value: 456, icon: 'medical_services', change: 3.2 }
  ];

  // 养老机构统计
  institutionStats: StatData[] = [
    { label: '养老机构', value: 45, icon: 'apartment', change: 1.2 },
    { label: '总床位', value: 8560, icon: 'bed', change: 0.8 },
    { label: '已入住', value: 6780, icon: 'check_circle', change: 2.1 },
    { label: '空床位', value: 1780, icon: 'hotel', change: -1.5 }
  ];

  // 助餐点统计
  diningStats: StatData[] = [
    { label: '助餐点', value: 120, icon: 'restaurant', change: 3.0 },
    { label: '今日供餐', value: 4560, icon: 'lunch_dining', change: 5.2 },
    { label: '满意度', value: 95, icon: 'sentiment_very_satisfied', change: 0.5 },
    { label: '覆盖社区', value: 85, icon: 'home', change: 2.3 }
  ];

  // 社区服务中心统计
  serviceStats: StatData[] = [
    { label: '服务中心', value: 68, icon: 'location_on', change: 1.5 },
    { label: '服务项目', value: 156, icon: 'miscellaneous_services', change: 4.0 },
    { label: '今日服务', value: 2340, icon: 'support_agent', change: 6.8 },
    { label: '服务人员', value: 890, icon: 'group', change: 1.1 }
  ];

  // 养老机构列表
  institutions: Institution[] = [
    { name: '阳光养老院', type: '公办', beds: 200, occupied: 185, status: '正常' },
    { name: '幸福之家', type: '民办', beds: 150, occupied: 120, status: '正常' },
    { name: '康泰护理院', type: '公办', beds: 300, occupied: 280, status: '正常' },
    { name: '乐龄公寓', type: '民办', beds: 250, occupied: 200, status: '正常' },
    { name: '慈爱康复中心', type: '公办', beds: 180, occupied: 160, status: '爆满' }
  ];

  // 助餐点列表
  diningPoints: DiningPoint[] = [
    { name: '中心餐厅', location: '社区服务中心一楼', capacity: 200, todayMeals: 180, rating: 4.8 },
    { name: '幸福食堂', location: '幸福小区旁', capacity: 150, todayMeals: 145, rating: 4.6 },
    { name: '阳光餐厅', location: '阳光花园小区', capacity: 180, todayMeals: 160, rating: 4.9 },
    { name: '康乐食坊', location: '康乐社区广场', capacity: 120, todayMeals: 100, rating: 4.5 }
  ];

  // 社区服务中心列表
  serviceCenters: ServiceCenter[] = [
    { name: '中心服务站', area: '中心区', services: ['日间照料', '康复护理', '文化娱乐'], staff: 25, status: '正常' },
    { name: '东区服务站', area: '东区', services: ['助餐服务', '家政服务', '健康咨询'], staff: 18, status: '正常' },
    { name: '西区服务站', area: '西区', services: ['日间照料', '康复护理', '助行服务'], staff: 22, status: '繁忙' },
    { name: '南区服务站', area: '南区', services: ['健康管理', '心理咨询', '法律维权'], staff: 15, status: '正常' }
  ];

  displayedColumns: string[] = ['name', 'type', 'beds', 'occupied', 'status'];

  constructor() {}

  ngOnInit(): void {
    this.updateTime();
    setInterval(() => {
      this.updateTime();
    }, 60000);
  }

  updateTime(): void {
    this.currentTime = new Date();
  }

  getOccupancyRate(occupied: number, total: number): number {
    return Math.round((occupied / total) * 100);
  }

  getStatusBadge(status: string): string {
    switch (status) {
      case '正常':
        return 'status-success';
      case '爆满':
        return 'status-danger';
      case '繁忙':
        return 'status-warning';
      default:
        return 'status-info';
    }
  }

  getTrendIcon(change: number): string {
    return change >= 0 ? 'trending_up' : 'trending_down';
  }

  getTrendColor(change: number): string {
    return change >= 0 ? 'text-green-400' : 'text-red-400';
  }

  refreshData(): void {
    console.log('刷新数据');
  }

  viewDetails(type: string): void {
    console.log('查看详情:', type);
  }
}