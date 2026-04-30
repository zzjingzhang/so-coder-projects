import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

interface StatCard {
  title: string;
  value: number | string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: string;
  color: string;
}

interface SystemMetric {
  label: string;
  value: number;
  max: number;
  unit: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: false
})
export class DashboardComponent implements OnInit {
  statCards: StatCard[] = [];
  systemMetrics: SystemMetric[] = [];
  recentChannels: any[] = [];
  loading: boolean = true;

  ngOnInit(): void {
    this.loadDashboardData();
    
    interval(5000).pipe(
      startWith(0),
      switchMap(() => {
        this.updateSystemMetrics();
        return [];
      })
    ).subscribe();
  }

  private loadDashboardData(): void {
    setTimeout(() => {
      this.statCards = [
        {
          title: 'Active Channels',
          value: 3,
          change: '+12%',
          changeType: 'positive',
          icon: 'pi pi-video',
          color: 'blue'
        },
        {
          title: 'Total Viewers',
          value: '1,247',
          change: '+8%',
          icon: 'pi pi-users',
          color: 'green'
        },
        {
          title: 'Bitrate',
          value: '8.5 Mbps',
          change: '-3%',
          changeType: 'negative',
          icon: 'pi pi-chart-line',
          color: 'purple'
        },
        {
          title: 'Uptime',
          value: '99.9%',
          change: 'stable',
          changeType: 'neutral',
          icon: 'pi pi-clock',
          color: 'orange'
        }
      ];

      this.systemMetrics = [
        { label: 'CPU Usage', value: 45, max: 100, unit: '%' },
        { label: 'Memory Usage', value: 62, max: 100, unit: '%' },
        { label: 'Storage Usage', value: 34, max: 100, unit: '%' },
        { label: 'Network Load', value: 28, max: 100, unit: '%' }
      ];

      this.recentChannels = [
        {
          id: '1',
          name: 'Main Stream',
          thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=live%20streaming%20video%20thumbnail%20camera%20recording&image_size=square',
          status: 'online',
          viewers: 847,
          bitrate: '4.5 Mbps',
          resolution: '1080p',
          fps: 30
        },
        {
          id: '2',
          name: 'Backup Stream',
          thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=backup%20video%20stream%20server%20monitoring&image_size=square',
          viewers: 234,
          bitrate: '2.5 Mbps',
          resolution: '720p',
          status: 'online'
        },
        {
          id: '3',
          name: 'Test Channel',
          thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=test%20broadcast%20video%20testing%20environment&image_size=square',
          status: 'offline',
          viewers: 0,
          bitrate: '0 Mbps',
          resolution: '480p'
        }
      ];

      this.loading = false;
    }, 500);
  }

  private updateSystemMetrics(): void {
    this.systemMetrics = this.systemMetrics.map(metric => ({
      ...metric,
      value: Math.min(100, Math.max(10, metric.value + (Math.random() * 10 - 5)))
    }));
  }

  getMetricSeverity(value: number): 'success' | 'warn' | 'danger' | 'info' {
    if (value >= 90) return 'danger';
    if (value >= 70) return 'warn';
    if (value >= 50) return 'info';
    return 'success';
  }

  getStatusBadgeSeverity(status: string): 'success' | 'danger' | 'secondary' | 'info' {
    switch (status) {
      case 'online':
      case 'active':
        return 'success';
      case 'offline':
        return 'danger';
      case 'inactive':
        return 'secondary';
      default:
        return 'info';
    }
  }
}
