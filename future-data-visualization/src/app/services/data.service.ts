import { Injectable } from '@angular/core';
import { ChartData, StatCard, DataTableItem, ActivityItem, GaugeData } from '../types';
import { Observable, interval, map, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseValue = {
    totalUsers: 24876,
    revenue: 156789,
    activeSessions: 1847,
    conversionRate: 3.87
  };

  getLineChartData(): Observable<ChartData> {
    return interval(3000).pipe(
      startWith(0),
      map(() => ({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
          {
            label: 'Revenue',
            data: this.generateRandomData(7, 10000, 50000),
            borderColor: '#0ea5e9',
            backgroundColor: 'rgba(14, 165, 233, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4
          },
          {
            label: 'Expenses',
            data: this.generateRandomData(7, 5000, 30000),
            borderColor: '#06b6d4',
            backgroundColor: 'rgba(6, 182, 212, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4
          }
        ]
      }))
    );
  }

  getBarChartData(): Observable<ChartData> {
    return interval(4000).pipe(
      startWith(0),
      map(() => ({
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Visitors',
            data: this.generateRandomData(7, 1000, 5000),
            backgroundColor: [
              'rgba(14, 165, 233, 0.8)',
              'rgba(14, 165, 233, 0.7)',
              'rgba(14, 165, 233, 0.6)',
              'rgba(14, 165, 233, 0.7)',
              'rgba(14, 165, 233, 0.8)',
              'rgba(6, 182, 212, 0.7)',
              'rgba(6, 182, 212, 0.6)'
            ],
            borderColor: '#0ea5e9',
            borderWidth: 1
          }
        ]
      }))
    );
  }

  getDoughnutChartData(): Observable<ChartData> {
    return interval(5000).pipe(
      startWith(0),
      map(() => ({
        labels: ['Desktop', 'Mobile', 'Tablet', 'Other'],
        datasets: [
          {
            data: this.generateRandomData(4, 20, 40),
            backgroundColor: [
              'rgba(14, 165, 233, 0.9)',
              'rgba(6, 182, 212, 0.9)',
              'rgba(56, 189, 248, 0.9)',
              'rgba(125, 211, 252, 0.9)'
            ],
            borderColor: 'transparent',
            borderWidth: 0
          }
        ]
      }))
    );
  }

  getStatCards(): Observable<StatCard[]> {
    return interval(2000).pipe(
      startWith(0),
      map(() => [
        {
          id: 'users',
          title: 'Total Users',
          value: this.baseValue.totalUsers + Math.floor(Math.random() * 100),
          change: 12.5,
          changeType: 'increase' as const,
          icon: 'pi pi-users',
          color: '#0ea5e9',
          trend: this.generateRandomData(10, 100, 500)
        },
        {
          id: 'revenue',
          title: 'Revenue',
          value: this.baseValue.revenue + Math.floor(Math.random() * 5000),
          change: 8.3,
          changeType: 'increase' as const,
          icon: 'pi pi-dollar',
          color: '#06b6d4',
          trend: this.generateRandomData(10, 1000, 5000)
        },
        {
          id: 'sessions',
          title: 'Active Sessions',
          value: this.baseValue.activeSessions + Math.floor(Math.random() * 200),
          change: 5.2,
          changeType: 'increase' as const,
          icon: 'pi pi-chart-line',
          color: '#38bdf8',
          trend: this.generateRandomData(10, 100, 300)
        },
        {
          id: 'conversion',
          title: 'Conversion Rate',
          value: this.baseValue.conversionRate + Math.random() * 0.5,
          change: 2.1,
          changeType: 'decrease' as const,
          icon: 'pi pi-percentage',
          color: '#7dd3fc',
          trend: this.generateRandomData(10, 1, 10)
        }
      ])
    );
  }

  getTableData(): DataTableItem[] {
    return [
      { id: 1, name: 'Project Alpha', status: 'Completed', value: 125000, date: '2024-01-15', category: 'Development' },
      { id: 2, name: 'Marketing Campaign', status: 'Active', value: 78500, date: '2024-01-20', category: 'Marketing' },
      { id: 3, name: 'UX Research', status: 'Pending', value: 45000, date: '2024-01-25', category: 'Design' },
      { id: 4, name: 'API Integration', status: 'Completed', value: 32000, date: '2024-02-01', category: 'Development' },
      { id: 5, name: 'Security Audit', status: 'Active', value: 67000, date: '2024-02-05', category: 'Security' },
      { id: 6, name: 'Mobile App', status: 'Planning', value: 150000, date: '2024-02-10', category: 'Development' }
    ];
  }

  getActivityFeed(): ActivityItem[] {
    return [
      { id: 1, type: 'success', title: 'New User Registration', description: 'User john.doe@example.com registered', time: '2 minutes ago' },
      { id: 2, type: 'warning', title: 'Server Load Alert', description: 'CPU usage exceeded 80% threshold', time: '15 minutes ago' },
      { id: 3, type: 'info', title: 'System Update', description: 'Application updated to v2.4.1', time: '1 hour ago' },
      { id: 4, type: 'error', title: 'Payment Failed', description: 'Transaction #12847 could not be processed', time: '2 hours ago' },
      { id: 5, type: 'success', title: 'Backup Completed', description: 'Daily backup completed successfully', time: '3 hours ago' },
      { id: 6, type: 'info', title: 'Configuration Change', description: 'Admin updated system settings', time: '5 hours ago' }
    ];
  }

  getGaugeData(): Observable<GaugeData[]> {
    return interval(3000).pipe(
      startWith(0),
      map(() => [
        { value: 72 + Math.random() * 10, max: 100, label: 'CPU Usage', color: '#0ea5e9' },
        { value: 65 + Math.random() * 15, max: 100, label: 'Memory', color: '#06b6d4' },
        { value: 45 + Math.random() * 20, max: 100, label: 'Storage', color: '#38bdf8' },
        { value: 88 + Math.random() * 8, max: 100, label: 'Network', color: '#7dd3fc' }
      ])
    );
  }

  private generateRandomData(count: number, min: number, max: number): number[] {
    return Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);
  }
}
