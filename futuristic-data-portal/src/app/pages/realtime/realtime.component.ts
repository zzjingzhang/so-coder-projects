import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { interval, Subscription } from 'rxjs';

interface LiveMetric {
  name: string;
  value: number;
  unit: string;
  trend: number;
  color: string;
}

interface SystemNode {
  id: string;
  name: string;
  status: 'online' | 'warning' | 'offline';
  cpu: number;
  memory: number;
  uptime: string;
  location: string;
}

interface ActivityLog {
  id: string;
  time: string;
  type: 'info' | 'warning' | 'success' | 'error';
  message: string;
  source: string;
}

@Component({
  selector: 'app-realtime',
  standalone: true,
  imports: [
    CommonModule,
    ChartModule,
    CardModule,
    TableModule,
    TagModule,
    BadgeModule,
    ButtonModule,
    ProgressBarModule,
    ScrollPanelModule
  ],
  template: `
    <div class="space-y-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold text-white flex items-center gap-3">
            <span class="neon-text">Real-time</span>
            <span class="flex items-center gap-2">
              <span class="w-2 h-2 bg-green-400 rounded-full status-dot online"></span>
              <span class="text-sm font-normal text-green-400">Live</span>
            </span>
          </h1>
          <p class="text-cyber-400 mt-1">Monitor systems and data in real-time</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-sm text-cyber-400">Auto-refresh: {{ refreshInterval }}s</span>
          <button pButton [icon]="isAutoRefresh ? 'pi-pause' : 'pi-play'" (click)="toggleAutoRefresh()" class="p-button-outlined" styleClass="border-cyber-700 text-cyber-400"></button>
          <button pButton icon="pi pi-refresh" (click)="manualRefresh()" class="bg-gradient-to-r from-neon-blue to-neon-purple border-none"></button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        @for (metric of liveMetrics; track metric.name; let i = $index) {
          <div class="glass-panel glass-panel-hover rounded-xl p-6 stats-card">
            <div class="flex items-start justify-between">
              <div>
                <p class="text-cyber-400 text-sm font-medium">{{ metric.name }}</p>
                <h3 class="text-3xl font-bold text-white mt-2 counter-number">{{ formatMetricValue(metric.value) }}<span class="text-lg text-cyber-400">{{ metric.unit }}</span></h3>
                <div class="flex items-center gap-1 mt-2">
                  <span class="flex items-center gap-1 text-sm font-medium" [class.text-green-400]="metric.trend >= 0" [class.text-red-400]="metric.trend < 0">
                    <i class="pi" [class.pi-arrow-up]="metric.trend >= 0" [class.pi-arrow-down]="metric.trend < 0"></i>
                    {{ formatTrend(metric.trend) }}%
                  </span>
                </div>
              </div>
              <div class="w-12 h-12 rounded-xl flex items-center justify-center pulse-glow" [style.background]="'linear-gradient(135deg, ' + metric.color + ')'"></div>
            </div>
          </div>
        }
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 glass-panel glass-panel-hover rounded-xl p-6">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="text-lg font-semibold text-white">Live Traffic Stream</h3>
              <p class="text-cyber-400 text-sm">Real-time data visualization</p>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 bg-green-400 rounded-full status-dot online"></span>
              <span class="text-xs text-green-400">Streaming</span>
            </div>
          </div>
          <div class="chart-container h-80">
            <p-chart type="line" [data]="realtimeChartData" [options]="realtimeChartOptions"></p-chart>
          </div>
        </div>

        <div class="glass-panel glass-panel-hover rounded-xl p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-white">Activity Log</h3>
            <p-tag [value]="'New: ' + newLogsCount" severity="info" styleClass="text-xs"></p-tag>
          </div>
          <p-scrollPanel [style]="{ height: '380px' }">
            <div class="space-y-3">
              @for (log of activityLogs; track log.id) {
                <div class="p-3 rounded-lg border border-cyber-700 bg-cyber-800/50 transition-all duration-300 hover:scale-[1.02]">
                  <div class="flex items-start gap-3">
                    <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" [ngClass]="getLogIconBgClass(log.type)">
                      <i class="pi text-sm" [ngClass]="getLogIconClass(log.type)"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm text-white truncate">{{ log.message }}</p>
                      <div class="flex items-center gap-2 mt-1">
                        <span class="text-xs text-cyber-500">{{ log.source }}</span>
                        <span class="text-cyber-600">•</span>
                        <span class="text-xs text-cyber-500">{{ log.time }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          </p-scrollPanel>
        </div>
      </div>

      <div class="glass-panel glass-panel-hover rounded-xl p-6">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-lg font-semibold text-white">System Nodes</h3>
            <p class="text-cyber-400 text-sm">Distributed system monitoring</p>
          </div>
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-2 text-sm">
              <span class="w-2 h-2 bg-green-400 rounded-full status-dot online"></span>
              <span class="text-green-400">{{ onlineNodes }} Online</span>
            </span>
            <span class="flex items-center gap-2 text-sm">
              <span class="w-2 h-2 bg-yellow-400 rounded-full status-dot warning"></span>
              <span class="text-yellow-400">{{ warningNodes }} Warning</span>
            </span>
            <span class="flex items-center gap-2 text-sm">
              <span class="w-2 h-2 bg-red-400 rounded-full status-dot offline"></span>
              <span class="text-red-400">{{ offlineNodes }} Offline</span>
            </span>
          </div>
        </div>

        <p-table [value]="systemNodes" [tableStyle]="{'min-width': '50rem'}" styleClass="p-datatable-gridless">
          <ng-template pTemplate="header">
            <tr class="border-b border-cyber-700">
              <th class="text-cyber-400 font-semibold py-3">Node</th>
              <th class="text-cyber-400 font-semibold py-3">Status</th>
              <th class="text-cyber-400 font-semibold py-3">CPU Usage</th>
              <th class="text-cyber-400 font-semibold py-3">Memory</th>
              <th class="text-cyber-400 font-semibold py-3">Uptime</th>
              <th class="text-cyber-400 font-semibold py-3">Location</th>
              <th class="text-cyber-400 font-semibold py-3">Actions</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-node>
            <tr class="border-b border-cyber-800 hover:bg-cyber-800/30 transition-colors">
              <td class="py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg flex items-center justify-center" [ngClass]="getNodeIconBgClass(node.status)">
                    <i class="pi pi-server text-lg" [ngClass]="getNodeIconClass(node.status)"></i>
                  </div>
                  <div>
                    <p class="text-white font-medium">{{ node.name }}</p>
                    <p class="text-xs text-cyber-500 font-mono">{{ node.id }}</p>
                  </div>
                </div>
              </td>
              <td class="py-4">
                <p-tag [value]="node.status | titlecase" [severity]="getNodeSeverity(node.status)" styleClass="uppercase text-xs"></p-tag>
              </td>
              <td class="py-4">
                <div class="flex items-center gap-3">
                  <div class="w-24">
                    <p-progressBar [value]="node.cpu" [showValue]="false" class="h-2" styleClass="bg-cyber-800"></p-progressBar>
                  </div>
                  <span class="text-sm font-medium" [class.text-green-400]="node.cpu < 70" [class.text-yellow-400]="node.cpu >= 70 && node.cpu < 90" [class.text-red-400]="node.cpu >= 90">{{ node.cpu }}%</span>
                </div>
              </td>
              <td class="py-4">
                <div class="flex items-center gap-3">
                  <div class="w-24">
                    <p-progressBar [value]="node.memory" [showValue]="false" class="h-2" styleClass="bg-cyber-800"></p-progressBar>
                  </div>
                  <span class="text-sm font-medium" [class.text-green-400]="node.memory < 70" [class.text-yellow-400]="node.memory >= 70 && node.memory < 90" [class.text-red-400]="node.memory >= 90">{{ node.memory }}%</span>
                </div>
              </td>
              <td class="py-4">
                <span class="text-cyber-300 font-mono text-sm">{{ node.uptime }}</span>
              </td>
              <td class="py-4">
                <span class="text-cyber-300">{{ node.location }}</span>
              </td>
              <td class="py-4">
                <button pButton icon="pi pi-eye" class="p-button-text text-cyber-400 hover:text-neon-blue p-1"></button>
                <button pButton icon="pi pi-cog" class="p-button-text text-cyber-400 hover:text-neon-purple p-1"></button>
                <button pButton icon="pi pi-refresh" class="p-button-text text-cyber-400 hover:text-green-400 p-1"></button>
              </td>
            </tr>
          </ng-template>
        </p-table>
      </div>
    </div>
  `,
  styles: []
})
export class RealtimeComponent implements OnInit, OnDestroy {
  refreshInterval = 3;
  isAutoRefresh = true;
  newLogsCount = 0;

  liveMetrics: LiveMetric[] = [
    { name: 'Requests/sec', value: 1247, unit: '/s', trend: 12.5, color: '#00f3ff, #0099cc' },
    { name: 'Active Users', value: 3842, unit: '', trend: 5.3, color: '#bd00ff, #8800cc' },
    { name: 'Error Rate', value: 0.12, unit: '%', trend: -2.8, color: '#10b981, #059669' },
    { name: 'Avg Response', value: 45, unit: 'ms', trend: -8.2, color: '#ff00aa, #cc0088' }
  ];

  systemNodes: SystemNode[] = [
    { id: 'NODE-001', name: 'Web Server A', status: 'online', cpu: 45, memory: 62, uptime: '45d 12h 34m', location: 'US-East' },
    { id: 'NODE-002', name: 'Web Server B', status: 'online', cpu: 52, memory: 58, uptime: '38d 8h 15m', location: 'US-West' },
    { id: 'NODE-003', name: 'DB Primary', status: 'warning', cpu: 78, memory: 85, uptime: '92d 4h 42m', location: 'EU-Central' },
    { id: 'NODE-004', name: 'DB Replica', status: 'online', cpu: 35, memory: 72, uptime: '92d 4h 42m', location: 'EU-West' },
    { id: 'NODE-005', name: 'Cache Layer', status: 'online', cpu: 28, memory: 45, uptime: '67d 16h 21m', location: 'Asia-Pacific' },
    { id: 'NODE-006', name: 'Queue Worker', status: 'offline', cpu: 0, memory: 0, uptime: '0d 0h 0m', location: 'US-East' }
  ];

  activityLogs: ActivityLog[] = [];

  realtimeChartData: any;
  realtimeChartOptions: any;

  private refreshSubscription?: Subscription;
  private logSubscription?: Subscription;
  private maxDataPoints = 20;
  private chartLabels: string[] = [];
  private chartData1: number[] = [];
  private chartData2: number[] = [];

  constructor() {}

  ngOnInit(): void {
    this.initRealtimeChart();
    this.generateInitialLogs();
    this.startAutoRefresh();
  }

  ngOnDestroy(): void {
    this.refreshSubscription?.unsubscribe();
    this.logSubscription?.unsubscribe();
  }

  get onlineNodes(): number {
    return this.systemNodes.filter(n => n.status === 'online').length;
  }

  get warningNodes(): number {
    return this.systemNodes.filter(n => n.status === 'warning').length;
  }

  get offlineNodes(): number {
    return this.systemNodes.filter(n => n.status === 'offline').length;
  }

  formatMetricValue(value: number): string {
    if (value >= 1000) {
      return Math.round(value).toLocaleString();
    }
    return value.toFixed(2);
  }

  formatTrend(trend: number): string {
    return Math.abs(trend).toFixed(1);
  }

  getLogIconBgClass(type: string): string {
    switch (type) {
      case 'info': return 'bg-blue-500/20';
      case 'warning': return 'bg-yellow-500/20';
      case 'success': return 'bg-green-500/20';
      case 'error': return 'bg-red-500/20';
      default: return 'bg-cyber-700/20';
    }
  }

  getLogIconClass(type: string): string {
    const classes: string[] = [];
    switch (type) {
      case 'info':
        classes.push('pi-info-circle', 'text-blue-400');
        break;
      case 'warning':
        classes.push('pi-exclamation-triangle', 'text-yellow-400');
        break;
      case 'success':
        classes.push('pi-check-circle', 'text-green-400');
        break;
      case 'error':
        classes.push('pi-times-circle', 'text-red-400');
        break;
    }
    return classes.join(' ');
  }

  getNodeIconBgClass(status: string): string {
    switch (status) {
      case 'online': return 'bg-green-500/20';
      case 'warning': return 'bg-yellow-500/20';
      case 'offline': return 'bg-red-500/20';
      default: return 'bg-cyber-700/20';
    }
  }

  getNodeIconClass(status: string): string {
    switch (status) {
      case 'online': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'offline': return 'text-red-400';
      default: return 'text-cyber-400';
    }
  }

  private initRealtimeChart(): void {
    const now = new Date();
    for (let i = this.maxDataPoints - 1; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 1000);
      this.chartLabels.push(this.formatTime(time));
      this.chartData1.push(Math.floor(Math.random() * 1000) + 500);
      this.chartData2.push(Math.floor(Math.random() * 500) + 200);
    }

    const textColor = '#94a3b8';
    const gridColor = 'rgba(100, 116, 139, 0.2)';

    this.realtimeChartData = {
      labels: this.chartLabels,
      datasets: [
        {
          label: 'Requests',
          data: this.chartData1,
          borderColor: '#00f3ff',
          backgroundColor: 'rgba(0, 243, 255, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0
        },
        {
          label: 'Errors',
          data: this.chartData2,
          borderColor: '#ff00aa',
          backgroundColor: 'rgba(255, 0, 170, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0
        }
      ]
    };

    this.realtimeChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 0 },
      plugins: {
        legend: {
          labels: { color: textColor }
        }
      },
      scales: {
        x: {
          grid: { color: gridColor, display: false },
          ticks: { color: textColor, maxTicksLimit: 8 }
        },
        y: {
          grid: { color: gridColor },
          ticks: { color: textColor }
        }
      },
      interaction: {
        intersect: false,
        mode: 'index'
      }
    };
  }

  private generateInitialLogs(): void {
    const logTypes: ActivityLog['type'][] = ['info', 'warning', 'success', 'error'];
    const sources = ['API Gateway', 'Auth Service', 'DB Cluster', 'Cache Layer', 'Queue Worker', 'CDN'];
    const messages = [
      'New user session initiated',
      'Database query completed',
      'Cache miss detected',
      'Rate limit warning',
      'SSL certificate renewed',
      'Deployment successful',
      'High CPU usage detected',
      'Memory threshold exceeded',
      'Network latency spike',
      'Health check passed'
    ];

    for (let i = 0; i < 15; i++) {
      this.activityLogs.push({
        id: `log-${Date.now()}-${i}`,
        time: this.formatTime(new Date(Date.now() - i * 60000)),
        type: logTypes[Math.floor(Math.random() * logTypes.length)],
        message: messages[Math.floor(Math.random() * messages.length)],
        source: sources[Math.floor(Math.random() * sources.length)]
      });
    }
  }

  private startAutoRefresh(): void {
    this.refreshSubscription = interval(this.refreshInterval * 1000).subscribe(() => {
      if (this.isAutoRefresh) {
        this.updateChart();
        this.updateMetrics();
        this.updateSystemNodes();
      }
    });

    this.logSubscription = interval(5000).subscribe(() => {
      if (this.isAutoRefresh) {
        this.addNewLog();
      }
    });
  }

  toggleAutoRefresh(): void {
    this.isAutoRefresh = !this.isAutoRefresh;
  }

  manualRefresh(): void {
    this.updateChart();
    this.updateMetrics();
    this.updateSystemNodes();
    this.addNewLog();
  }

  private updateChart(): void {
    const now = new Date();
    this.chartLabels.push(this.formatTime(now));
    this.chartData1.push(Math.floor(Math.random() * 1000) + 500);
    this.chartData2.push(Math.floor(Math.random() * 500) + 200);

    if (this.chartLabels.length > this.maxDataPoints) {
      this.chartLabels.shift();
      this.chartData1.shift();
      this.chartData2.shift();
    }

    this.realtimeChartData = {
      ...this.realtimeChartData,
      labels: [...this.chartLabels],
      datasets: [
        { ...this.realtimeChartData.datasets[0], data: [...this.chartData1] },
        { ...this.realtimeChartData.datasets[1], data: [...this.chartData2] }
      ]
    };
  }

  private updateMetrics(): void {
    this.liveMetrics.forEach(metric => {
      metric.value = metric.value * (1 + (Math.random() - 0.5) * 0.1);
      metric.trend = metric.trend + (Math.random() - 0.5) * 2;
    });
  }

  private updateSystemNodes(): void {
    this.systemNodes.forEach(node => {
      if (node.status !== 'offline') {
        node.cpu = Math.max(10, Math.min(95, node.cpu + (Math.random() - 0.5) * 10));
        node.cpu = Math.round(node.cpu);
        node.memory = Math.max(20, Math.min(95, node.memory + (Math.random() - 0.5) * 5));
        node.memory = Math.round(node.memory);
      }
    });
  }

  private addNewLog(): void {
    const logTypes: ActivityLog['type'][] = ['info', 'warning', 'success', 'error'];
    const weights = [0.5, 0.2, 0.2, 0.1];
    const sources = ['API Gateway', 'Auth Service', 'DB Cluster', 'Cache Layer', 'Queue Worker'];
    const messages = [
      'New user registration successful',
      'API rate limit approaching',
      'Cache hit ratio improved',
      'Database connection pool exhausted',
      'Background job completed',
      'SSL handshake failed',
      'New deployment detected',
      'Memory cleanup executed'
    ];

    const rand = Math.random();
    let typeIndex = 0;
    let cumulative = 0;
    for (let i = 0; i < weights.length; i++) {
      cumulative += weights[i];
      if (rand <= cumulative) {
        typeIndex = i;
        break;
      }
    }

    this.activityLogs.unshift({
      id: `log-${Date.now()}`,
      time: this.formatTime(new Date()),
      type: logTypes[typeIndex],
      message: messages[Math.floor(Math.random() * messages.length)],
      source: sources[Math.floor(Math.random() * sources.length)]
    });

    this.newLogsCount++;

    if (this.activityLogs.length > 50) {
      this.activityLogs.splice(50);
    }
  }

  private formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }

  getNodeSeverity(status: string): 'success' | 'warning' | 'danger' | 'secondary' {
    switch (status) {
      case 'online': return 'success';
      case 'warning': return 'warning';
      case 'offline': return 'danger';
      default: return 'secondary';
    }
  }
}
