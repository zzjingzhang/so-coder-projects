import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { interval, Subscription } from 'rxjs';

interface StatCard {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
  color: string;
}

interface TableData {
  id: string;
  name: string;
  status: 'active' | 'warning' | 'error' | 'offline';
  traffic: string;
  latency: string;
  uptime: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ChartModule,
    CardModule,
    ProgressBarModule,
    TableModule,
    TagModule,
    BadgeModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    FormsModule
  ],
  template: `
    <div class="space-y-6">
      <!-- Page Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold text-white">
            <span class="neon-text">Dashboard</span>
          </h1>
          <p class="text-cyber-400 mt-1">Real-time data visualization and analytics</p>
        </div>
        <div class="flex items-center gap-3">
          <p-select 
            [(ngModel)]="selectedPeriod"
            [options]="periods"
            optionLabel="label"
            optionValue="value"
            class="w-40"
            [style]="{'background': 'rgba(15, 23, 42, 0.8)', 'border-color': '#334155'}"
          ></p-select>
          <button pButton icon="pi pi-refresh" class="p-button-outlined" styleClass="border-cyber-700 text-cyber-400"></button>
          <button pButton label="Export" icon="pi pi-download" class="bg-gradient-to-r from-neon-blue to-neon-purple border-none"></button>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        @for (stat of stats; track stat.title; let i = $index) {
          <div 
            class="glass-panel glass-panel-hover rounded-xl p-6 stats-card animate-fade-in-up"
            [class.stagger-1]="i === 0"
            [class.stagger-2]="i === 1"
            [class.stagger-3]="i === 2"
            [class.stagger-4]="i === 3"
            style="opacity: 0; animation-fill-mode: both;"
          >
            <div class="flex items-start justify-between">
              <div>
                <p class="text-cyber-400 text-sm font-medium">{{ stat.title }}</p>
                <h3 class="text-3xl font-bold text-white mt-2 counter-number">{{ stat.value }}</h3>
                <div class="flex items-center gap-1 mt-2">
                  <span 
                    class="flex items-center gap-1 text-sm font-medium"
                    [class.text-green-400]="stat.changeType === 'positive'"
                    [class.text-red-400]="stat.changeType === 'negative'"
                    [class.text-cyber-400]="stat.changeType === 'neutral'"
                  >
                    <i class="pi" 
                      [class.pi-arrow-up]="stat.changeType === 'positive'"
                      [class.pi-arrow-down]="stat.changeType === 'negative'"
                      [class.pi-minus]="stat.changeType === 'neutral'"
                    ></i>
                    {{ stat.change }}
                  </span>
                  <span class="text-cyber-500 text-xs">vs last period</span>
                </div>
              </div>
              <div 
                class="w-12 h-12 rounded-xl flex items-center justify-center"
                [class]="stat.color"
              >
                <i class="pi {{ stat.icon }} text-white text-xl"></i>
              </div>
            </div>
            <div class="mt-4">
              <p-progressBar 
                [value]="progressValues[i]" 
                [showValue]="false"
                class="h-1.5"
                styleClass="bg-cyber-800"
              ></p-progressBar>
            </div>
          </div>
        }
      </div>

      <!-- Charts Row 1 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Line Chart -->
        <div class="lg:col-span-2 glass-panel glass-panel-hover rounded-xl p-6 animate-fade-in-up stagger-1" style="opacity: 0; animation-fill-mode: both;">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="text-lg font-semibold text-white">Traffic Analytics</h3>
              <p class="text-cyber-400 text-sm">Real-time visitor data</p>
            </div>
            <div class="flex items-center gap-2">
              <span class="flex items-center gap-1 text-sm text-cyber-400">
                <span class="w-3 h-3 rounded-full bg-neon-blue"></span>
                Visitors
              </span>
              <span class="flex items-center gap-1 text-sm text-cyber-400">
                <span class="w-3 h-3 rounded-full bg-neon-purple"></span>
                Page Views
              </span>
            </div>
          </div>
          <div class="chart-container">
            <p-chart 
              type="line" 
              [data]="lineChartData" 
              [options]="lineChartOptions"
            ></p-chart>
          </div>
        </div>

        <!-- Doughnut Chart -->
        <div class="glass-panel glass-panel-hover rounded-xl p-6 animate-fade-in-up stagger-2" style="opacity: 0; animation-fill-mode: both;">
          <div class="mb-6">
            <h3 class="text-lg font-semibold text-white">Device Distribution</h3>
            <p class="text-cyber-400 text-sm">Traffic by device type</p>
          </div>
          <div class="chart-container h-64">
            <p-chart 
              type="doughnut" 
              [data]="doughnutChartData" 
              [options]="doughnutChartOptions"
            ></p-chart>
          </div>
          <div class="grid grid-cols-3 gap-3 mt-4">
            <div class="text-center">
              <p class="text-2xl font-bold text-neon-blue">45%</p>
              <p class="text-xs text-cyber-400">Desktop</p>
            </div>
            <div class="text-center">
              <p class="text-2xl font-bold text-neon-purple">38%</p>
              <p class="text-xs text-cyber-400">Mobile</p>
            </div>
            <div class="text-center">
              <p class="text-2xl font-bold text-neon-pink">17%</p>
              <p class="text-xs text-cyber-400">Tablet</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Row 2 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Bar Chart -->
        <div class="glass-panel glass-panel-hover rounded-xl p-6 animate-fade-in-up stagger-3" style="opacity: 0; animation-fill-mode: both;">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="text-lg font-semibold text-white">Revenue Overview</h3>
              <p class="text-cyber-400 text-sm">Monthly performance</p>
            </div>
          </div>
          <div class="chart-container">
            <p-chart 
              type="bar" 
              [data]="barChartData" 
              [options]="barChartOptions"
            ></p-chart>
          </div>
        </div>

        <!-- Radar Chart -->
        <div class="glass-panel glass-panel-hover rounded-xl p-6 animate-fade-in-up stagger-4" style="opacity: 0; animation-fill-mode: both;">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="text-lg font-semibold text-white">Performance Metrics</h3>
              <p class="text-cyber-400 text-sm">System health indicators</p>
            </div>
          </div>
          <div class="chart-container">
            <p-chart 
              type="radar" 
              [data]="radarChartData" 
              [options]="radarChartOptions"
            ></p-chart>
          </div>
        </div>
      </div>

      <!-- Data Table -->
      <div class="glass-panel glass-panel-hover rounded-xl p-6 animate-fade-in-up" style="opacity: 0; animation-fill-mode: both; animation-delay: 0.5s;">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-lg font-semibold text-white">Active Services</h3>
            <p class="text-cyber-400 text-sm">Real-time service monitoring</p>
          </div>
          <div class="flex items-center gap-3">
            <span class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 text-green-400 text-sm">
              <span class="w-2 h-2 bg-green-400 rounded-full status-dot online"></span>
              5 Active
            </span>
            <span class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 text-yellow-400 text-sm">
              <span class="w-2 h-2 bg-yellow-400 rounded-full status-dot warning"></span>
              1 Warning
            </span>
          </div>
        </div>

        <p-table 
          [value]="tableData" 
          [tableStyle]="{'min-width': '50rem'}"
          styleClass="p-datatable-gridless"
        >
          <ng-template pTemplate="header">
            <tr class="border-b border-cyber-700">
              <th class="text-cyber-400 font-semibold py-3">Service ID</th>
              <th class="text-cyber-400 font-semibold py-3">Name</th>
              <th class="text-cyber-400 font-semibold py-3">Status</th>
              <th class="text-cyber-400 font-semibold py-3">Traffic</th>
              <th class="text-cyber-400 font-semibold py-3">Latency</th>
              <th class="text-cyber-400 font-semibold py-3">Uptime</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-data>
            <tr class="border-b border-cyber-800 hover:bg-cyber-800/30 transition-colors">
              <td class="py-4">
                <span class="text-cyber-300 font-mono text-sm">{{ data.id }}</span>
              </td>
              <td class="py-4">
                <span class="text-white font-medium">{{ data.name }}</span>
              </td>
              <td class="py-4">
                <p-tag 
                  [value]="data.status | titlecase"
                  [severity]="getStatusSeverity(data.status)"
                  styleClass="uppercase text-xs"
                ></p-tag>
              </td>
              <td class="py-4">
                <span class="text-cyber-300">{{ data.traffic }}</span>
              </td>
              <td class="py-4">
                <span class="text-cyber-300">{{ data.latency }}</span>
              </td>
              <td class="py-4">
                <span class="text-green-400 font-medium">{{ data.uptime }}</span>
              </td>
            </tr>
          </ng-template>
        </p-table>
      </div>
    </div>
  `,
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {
  selectedPeriod = '7d';
  periods = [
    { label: 'Last 24h', value: '24h' },
    { label: 'Last 7 days', value: '7d' },
    { label: 'Last 30 days', value: '30d' },
    { label: 'This year', value: '1y' }
  ];

  progressValues = [78, 92, 65, 84];

  stats: StatCard[] = [
    {
      title: 'Total Visitors',
      value: '24,897',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'pi-users',
      color: 'bg-gradient-to-br from-neon-blue to-cyan-500'
    },
    {
      title: 'Page Views',
      value: '145,632',
      change: '+8.2%',
      changeType: 'positive',
      icon: 'pi-eye',
      color: 'bg-gradient-to-br from-neon-purple to-purple-500'
    },
    {
      title: 'Bounce Rate',
      value: '42.3%',
      change: '-3.1%',
      changeType: 'positive',
      icon: 'pi-arrow-down-left',
      color: 'bg-gradient-to-br from-neon-pink to-rose-500'
    },
    {
      title: 'Conversion Rate',
      value: '3.8%',
      change: '+0.4%',
      changeType: 'positive',
      icon: 'pi-chart-bar',
      color: 'bg-gradient-to-br from-green-500 to-emerald-500'
    }
  ];

  tableData: TableData[] = [
    { id: 'SVC-001', name: 'API Gateway', status: 'active', traffic: '12.4K/min', latency: '23ms', uptime: '99.98%' },
    { id: 'SVC-002', name: 'Auth Service', status: 'active', traffic: '8.7K/min', latency: '18ms', uptime: '99.95%' },
    { id: 'SVC-003', name: 'Cache Layer', status: 'warning', traffic: '5.2K/min', latency: '45ms', uptime: '98.72%' },
    { id: 'SVC-004', name: 'Database', status: 'active', traffic: '3.1K/min', latency: '12ms', uptime: '99.99%' },
    { id: 'SVC-005', name: 'CDN Network', status: 'active', traffic: '45.8K/min', latency: '8ms', uptime: '99.97%' },
    { id: 'SVC-006', name: 'Queue Service', status: 'active', traffic: '1.9K/min', latency: '15ms', uptime: '99.93%' }
  ];

  lineChartData: any;
  lineChartOptions: any;
  doughnutChartData: any;
  doughnutChartOptions: any;
  barChartData: any;
  barChartOptions: any;
  radarChartData: any;
  radarChartOptions: any;

  private updateSubscription?: Subscription;

  constructor() {}

  ngOnInit(): void {
    this.initCharts();
    this.startRealTimeUpdates();
  }

  ngOnDestroy(): void {
    this.updateSubscription?.unsubscribe();
  }

  private initCharts(): void {
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    const textColor = '#94a3b8';
    const gridColor = 'rgba(100, 116, 139, 0.2)';

    this.lineChartData = {
      labels: labels,
      datasets: [
        {
          label: 'Visitors',
          data: [65, 59, 80, 81, 56, 85, 90],
          borderColor: '#00f3ff',
          backgroundColor: 'rgba(0, 243, 255, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#00f3ff',
          pointBorderColor: '#0f172a',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 8
        },
        {
          label: 'Page Views',
          data: [28, 48, 40, 58, 86, 67, 75],
          borderColor: '#bd00ff',
          backgroundColor: 'rgba(189, 0, 255, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#bd00ff',
          pointBorderColor: '#0f172a',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 8
        }
      ]
    };

    this.lineChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(15, 23, 42, 0.9)',
          titleColor: textColor,
          bodyColor: '#e2e8f0',
          borderColor: 'rgba(0, 243, 255, 0.3)',
          borderWidth: 1,
          padding: 12,
          displayColors: false
        }
      },
      scales: {
        x: {
          grid: { color: gridColor },
          ticks: { color: textColor }
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

    this.doughnutChartData = {
      labels: ['Desktop', 'Mobile', 'Tablet'],
      datasets: [
        {
          data: [45, 38, 17],
          backgroundColor: ['#00f3ff', '#bd00ff', '#ff00aa'],
          borderColor: '#0f172a',
          borderWidth: 4,
          hoverBorderWidth: 6
        }
      ]
    };

    this.doughnutChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '70%',
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(15, 23, 42, 0.9)',
          titleColor: textColor,
          bodyColor: '#e2e8f0',
          borderColor: 'rgba(0, 243, 255, 0.3)',
          borderWidth: 1,
          padding: 12
        }
      }
    };

    this.barChartData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Revenue',
          data: [12, 19, 15, 25, 22, 30],
          backgroundColor: (context: any) => {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) return '#00f3ff';
            const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
            gradient.addColorStop(0, 'rgba(0, 243, 255, 0.3)');
            gradient.addColorStop(1, '#00f3ff');
            return gradient;
          },
          borderColor: '#00f3ff',
          borderWidth: 2,
          borderRadius: 8
        }
      ]
    };

    this.barChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(15, 23, 42, 0.9)',
          titleColor: textColor,
          bodyColor: '#e2e8f0',
          borderColor: 'rgba(0, 243, 255, 0.3)',
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label: (context: any) => `$${context.raw}K`
          }
        }
      },
      scales: {
        x: {
          grid: { color: gridColor },
          ticks: { color: textColor }
        },
        y: {
          grid: { color: gridColor },
          ticks: { 
            color: textColor,
            callback: (value: any) => `$${value}K`
          }
        }
      }
    };

    this.radarChartData = {
      labels: ['CPU', 'Memory', 'Network', 'Storage', 'Response', 'Uptime'],
      datasets: [
        {
          label: 'Current',
          data: [85, 72, 90, 65, 88, 99],
          borderColor: '#00f3ff',
          backgroundColor: 'rgba(0, 243, 255, 0.2)',
          borderWidth: 2,
          pointBackgroundColor: '#00f3ff',
          pointBorderColor: '#0f172a',
          pointBorderWidth: 2,
          pointRadius: 5
        },
        {
          label: 'Target',
          data: [90, 85, 95, 80, 95, 99.9],
          borderColor: '#bd00ff',
          backgroundColor: 'rgba(189, 0, 255, 0.1)',
          borderWidth: 2,
          pointBackgroundColor: '#bd00ff',
          pointBorderColor: '#0f172a',
          pointBorderWidth: 2,
          pointRadius: 5,
          borderDash: [5, 5]
        }
      ]
    };

    this.radarChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: textColor }
        },
        tooltip: {
          backgroundColor: 'rgba(15, 23, 42, 0.9)',
          titleColor: textColor,
          bodyColor: '#e2e8f0',
          borderColor: 'rgba(0, 243, 255, 0.3)',
          borderWidth: 1,
          padding: 12
        }
      },
      scales: {
        r: {
          grid: { color: gridColor },
          angleLines: { color: gridColor },
          ticks: { 
            color: textColor,
            display: false
          },
          pointLabels: { color: textColor },
          suggestedMin: 0,
          suggestedMax: 100
        }
      }
    };
  }

  private startRealTimeUpdates(): void {
    this.updateSubscription = interval(3000).subscribe(() => {
      this.updateChartData();
    });
  }

  private updateChartData(): void {
    if (this.lineChartData && this.lineChartData.datasets) {
      this.lineChartData.datasets.forEach((dataset: any) => {
        dataset.data = dataset.data.map((value: number) => 
          value + (Math.random() - 0.5) * 10
        );
      });
      this.lineChartData = { ...this.lineChartData };
    }
  }

  getStatusSeverity(status: string): 'success' | 'warning' | 'danger' | 'secondary' {
    switch (status) {
      case 'active': return 'success';
      case 'warning': return 'warning';
      case 'error': return 'danger';
      default: return 'secondary';
    }
  }
}
