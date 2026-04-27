import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { ChartData, StatCard, DataTableItem, ActivityItem, GaugeData } from '../../types';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ChartModule,
    CardModule,
    TableModule,
    TagModule,
    ProgressBarModule,
    DropdownModule,
    ButtonModule,
    GalleriaModule,
    FormsModule
  ],
  template: `
    <div class="min-h-screen bg-secondary-950 grid-background">
      <div class="fixed inset-0 radial-glow pointer-events-none"></div>
      
      <header class="relative z-10 px-6 py-4 border-b border-primary-900/30 backdrop-blur-sm bg-secondary-950/80">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/30 animate-pulse-slow">
              <i class="pi pi-chart-line text-white text-xl"></i>
            </div>
            <div>
              <h1 class="text-xl font-bold text-white neon-text">DataViz Portal</h1>
              <p class="text-xs text-secondary-400">Real-time Analytics Dashboard</p>
            </div>
          </div>
          
          <div class="flex items-center gap-4">
            <p-dropdown 
              [options]="timeRanges" 
              [(ngModel)]="selectedTimeRange"
              optionLabel="label"
              optionValue="value"
              placeholder="Select Time Range"
              styleClass="w-40"
            ></p-dropdown>
            <button 
              pButton 
              icon="pi pi-refresh" 
              class="p-button-raised p-button-rounded"
              (click)="refreshData()"
            ></button>
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
              <span class="text-white font-bold text-sm">JD</span>
            </div>
          </div>
        </div>
      </header>

      <main class="relative z-10 px-6 py-8">
        <div class="max-w-7xl mx-auto space-y-8">
          
          <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ng-container *ngFor="let stat of statCards">
              <div 
                class="glass-card glass-card-hover p-6 animate-slide-up"
                [style.animationDelay]="'0.' + statCards.indexOf(stat) + 's'"
              >
                <div class="flex items-start justify-between mb-4">
                  <div 
                    class="w-12 h-12 rounded-xl flex items-center justify-center"
                    [style.background]="'linear-gradient(135deg, ' + stat.color + '33, ' + stat.color + '11)'"
                  >
                    <i [class]="stat.icon" [style.color]="stat.color" class="text-2xl"></i>
                  </div>
                  <div 
                    class="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
                    [class.bg-green-500/20]="stat.changeType === 'increase'"
                    [class.bg-red-500/20]="stat.changeType === 'decrease'"
                    [class.text-green-400]="stat.changeType === 'increase'"
                    [class.text-red-400]="stat.changeType === 'decrease'"
                  >
                    <i 
                      [class]="stat.changeType === 'increase' ? 'pi pi-arrow-up' : 'pi pi-arrow-down'"
                      class="text-xs"
                    ></i>
                    {{ stat.change }}%
                  </div>
                </div>
                <div>
                  <p class="text-secondary-400 text-sm mb-1">{{ stat.title }}</p>
                  <p 
                    class="text-3xl font-bold text-white animate-data-flow"
                    [style.color]="stat.color"
                  >
                    {{ formatValue(stat.value, stat.id) }}
                  </p>
                </div>
                <div class="mt-4 h-12">
                  <p-chart 
                    type="line" 
                    [data]="getMiniChartData(stat.trend, stat.color)"
                    [options]="miniChartOptions"
                  ></p-chart>
                </div>
              </div>
            </ng-container>
          </section>

          <section class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="lg:col-span-2 glass-card glass-card-hover p-6 animate-slide-up">
              <div class="flex items-center justify-between mb-6">
                <div>
                  <h3 class="text-lg font-semibold text-white">Revenue Overview</h3>
                  <p class="text-sm text-secondary-400">Monthly revenue and expenses</p>
                </div>
                <div class="flex gap-4">
                  <div class="flex items-center gap-2">
                    <span class="w-3 h-3 rounded-full bg-primary-500"></span>
                    <span class="text-sm text-secondary-400">Revenue</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="w-3 h-3 rounded-full bg-accent-500"></span>
                    <span class="text-sm text-secondary-400">Expenses</span>
                  </div>
                </div>
              </div>
              <div class="h-80">
                <p-chart 
                  type="line" 
                  [data]="lineChartData"
                  [options]="lineChartOptions"
                ></p-chart>
              </div>
            </div>

            <div class="glass-card glass-card-hover p-6 animate-slide-up">
              <div class="mb-6">
                <h3 class="text-lg font-semibold text-white">Device Distribution</h3>
                <p class="text-sm text-secondary-400">Traffic by device type</p>
              </div>
              <div class="h-64 flex items-center justify-center">
                <p-chart 
                  type="doughnut" 
                  [data]="doughnutChartData"
                  [options]="doughnutChartOptions"
                ></p-chart>
              </div>
              <div class="grid grid-cols-2 gap-3 mt-4">
                <ng-container *ngFor="let label of doughnutChartData?.labels; let i = index">
                  <div class="flex items-center gap-2">
                    <span 
                      class="w-3 h-3 rounded-full"
                      [style.background]="doughnutChartData?.datasets[0]?.backgroundColor?.[i]"
                    ></span>
                    <div>
                      <p class="text-xs text-secondary-400">{{ label }}</p>
                      <p class="text-sm font-medium text-white">
                        {{ doughnutChartData?.datasets[0]?.data?.[i] }}%
                      </p>
                    </div>
                  </div>
                </ng-container>
              </div>
            </div>
          </section>

          <section class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="glass-card glass-card-hover p-6 animate-slide-up">
              <div class="mb-6">
                <h3 class="text-lg font-semibold text-white">Weekly Visitors</h3>
                <p class="text-sm text-secondary-400">Daily visitor statistics</p>
              </div>
              <div class="h-64">
                <p-chart 
                  type="bar" 
                  [data]="barChartData"
                  [options]="barChartOptions"
                ></p-chart>
              </div>
            </div>

            <div class="lg:col-span-2 glass-card glass-card-hover p-6 animate-slide-up">
              <div class="mb-6">
                <h3 class="text-lg font-semibold text-white">System Resources</h3>
                <p class="text-sm text-secondary-400">Real-time system metrics</p>
              </div>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                <ng-container *ngFor="let gauge of gaugeData">
                  <div class="text-center">
                    <div class="relative w-28 h-28 mx-auto mb-4">
                      <svg class="w-28 h-28 transform -rotate-90" viewBox="0 0 120 120">
                        <circle
                          cx="60"
                          cy="60"
                          r="50"
                          fill="none"
                          stroke="rgba(14, 165, 233, 0.1)"
                          stroke-width="10"
                        />
                        <circle
                          cx="60"
                          cy="60"
                          r="50"
                          fill="none"
                          [attr.stroke]="gauge.color"
                          stroke-width="10"
                          stroke-linecap="round"
                          [attr.stroke-dasharray]="getGaugeCircumference()"
                          [attr.stroke-dashoffset]="getGaugeOffset(gauge.value, gauge.max)"
                          class="transition-all duration-1000 ease-out"
                          [style.filter]="'drop-shadow(0 0 8px ' + gauge.color + ')'"
                        />
                      </svg>
                      <div class="absolute inset-0 flex items-center justify-center">
                        <span class="text-xl font-bold text-white">{{ gauge.value.toFixed(1) }}%</span>
                      </div>
                    </div>
                    <p class="text-sm font-medium text-white">{{ gauge.label }}</p>
                    <p-progressBar 
                      [value]="gauge.value" 
                      [showValue]="false"
                      class="mt-2"
                      [style]="{ height: '4px' }"
                    ></p-progressBar>
                  </div>
                </ng-container>
              </div>
            </div>
          </section>

          <section class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="lg:col-span-2 glass-card glass-card-hover p-6 animate-slide-up">
              <div class="flex items-center justify-between mb-6">
                <div>
                  <h3 class="text-lg font-semibold text-white">Recent Projects</h3>
                  <p class="text-sm text-secondary-400">Active project overview</p>
                </div>
                <button 
                  pButton 
                  label="View All" 
                  icon="pi pi-arrow-right" 
                  iconPos="right"
                  class="p-button-text p-button-sm"
                ></button>
              </div>
              <div class="overflow-x-auto">
                <p-table 
                  [value]="tableData" 
                  [paginator]="true" 
                  [rows]="5"
                  styleClass="p-datatable-sm"
                >
                  <ng-template pTemplate="header">
                    <tr>
                      <th class="!bg-secondary-900/50 !text-secondary-400 !font-medium !border-none !py-3">
                        Project
                      </th>
                      <th class="!bg-secondary-900/50 !text-secondary-400 !font-medium !border-none !py-3">
                        Status
                      </th>
                      <th class="!bg-secondary-900/50 !text-secondary-400 !font-medium !border-none !py-3">
                        Value
                      </th>
                      <th class="!bg-secondary-900/50 !text-secondary-400 !font-medium !border-none !py-3">
                        Category
                      </th>
                    </tr>
                  </ng-template>
                  <ng-template pTemplate="body" let-item>
                    <tr class="border-b border-secondary-800/50 hover:bg-secondary-900/30 transition-colors">
                      <td class="!py-4">
                        <div class="flex items-center gap-3">
                          <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500/20 to-primary-700/20 flex items-center justify-center">
                            <i class="pi pi-folder text-primary-400"></i>
                          </div>
                          <div>
                            <p class="font-medium text-white">{{ item.name }}</p>
                            <p class="text-xs text-secondary-500">{{ item.date }}</p>
                          </div>
                        </div>
                      </td>
                      <td class="!py-4">
                        <p-tag 
                          [value]="item.status"
                          [severity]="getStatusSeverity(item.status)"
                          class="!text-xs !py-1"
                        ></p-tag>
                      </td>
                      <td class="!py-4">
                        <span class="font-semibold text-primary-400">
                          ${{ item.value.toLocaleString() }}
                        </span>
                      </td>
                      <td class="!py-4">
                        <span class="text-secondary-400 text-sm">{{ item.category }}</span>
                      </td>
                    </tr>
                  </ng-template>
                </p-table>
              </div>
            </div>

            <div class="glass-card glass-card-hover p-6 animate-slide-up">
              <div class="mb-6">
                <h3 class="text-lg font-semibold text-white">Activity Feed</h3>
                <p class="text-sm text-secondary-400">Recent system activities</p>
              </div>
              <div class="space-y-4 max-h-96 overflow-y-auto pr-2">
                <ng-container *ngFor="let activity of activityFeed">
                  <div class="flex gap-3 p-3 rounded-lg hover:bg-secondary-900/50 transition-colors cursor-pointer">
                    <div 
                      class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      [ngSwitch]="activity.type"
                    >
                      <i *ngSwitchCase="'success'" class="pi pi-check-circle text-green-400 text-lg"></i>
                      <i *ngSwitchCase="'warning'" class="pi pi-exclamation-triangle text-yellow-400 text-lg"></i>
                      <i *ngSwitchCase="'info'" class="pi pi-info-circle text-primary-400 text-lg"></i>
                      <i *ngSwitchCase="'error'" class="pi pi-times-circle text-red-400 text-lg"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-white truncate">{{ activity.title }}</p>
                      <p class="text-xs text-secondary-500 mt-1 line-clamp-2">{{ activity.description }}</p>
                      <p class="text-xs text-secondary-600 mt-2">{{ activity.time }}</p>
                    </div>
                  </div>
                </ng-container>
              </div>
            </div>
          </section>

          <section class="glass-card glass-card-hover p-6 animate-slide-up">
            <div class="flex items-center justify-between mb-6">
              <div>
                <h3 class="text-lg font-semibold text-white">Data Visualization Gallery</h3>
                <p class="text-sm text-secondary-400">Interactive chart previews</p>
              </div>
            </div>
            <p-galleria 
              [value]="galleryImages" 
              [responsiveOptions]="galleryResponsiveOptions"
              [containerStyle]="{ 'max-width': '100%' }" 
              [numVisible]="4"
              [circular]="true"
              [showItemNavigators]="true"
              [showThumbnails]="true"
            >
              <ng-template pTemplate="item" let-item>
                <div class="relative w-full h-80 rounded-xl overflow-hidden">
                  <div 
                    class="w-full h-full flex items-center justify-center"
                    [style.background]="'linear-gradient(135deg, ' + item.gradient + ')'"
                  >
                    <div class="text-center p-8">
                      <i [class]="item.icon" class="text-6xl text-white/30 mb-4"></i>
                      <h4 class="text-2xl font-bold text-white mb-2">{{ item.title }}</h4>
                      <p class="text-white/70">{{ item.description }}</p>
                    </div>
                  </div>
                  <div class="absolute inset-0 bg-gradient-to-t from-secondary-950/50 to-transparent"></div>
                </div>
              </ng-template>
              <ng-template pTemplate="thumbnail" let-item>
                <div 
                  class="w-20 h-14 rounded-lg flex items-center justify-center cursor-pointer"
                  [style.background]="'linear-gradient(135deg, ' + item.gradient + ')'"
                >
                  <i [class]="item.icon" class="text-xl text-white/70"></i>
                </div>
              </ng-template>
            </p-galleria>
          </section>
        </div>
      </main>

      <footer class="relative z-10 px-6 py-6 border-t border-primary-900/30 backdrop-blur-sm bg-secondary-950/80">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
              <i class="pi pi-chart-line text-white text-sm"></i>
            </div>
            <span class="text-secondary-400 text-sm">DataViz Portal © 2024</span>
          </div>
          <div class="flex items-center gap-6">
            <a href="#" class="text-secondary-400 hover:text-primary-400 text-sm transition-colors">Documentation</a>
            <a href="#" class="text-secondary-400 hover:text-primary-400 text-sm transition-colors">API Reference</a>
            <a href="#" class="text-secondary-400 hover:text-primary-400 text-sm transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: []
})
export class DashboardComponent implements OnInit {
  private dataService = inject(DataService);
  private subscriptions: Subscription[] = [];

  timeRanges = [
    { label: 'Last 7 Days', value: '7d' },
    { label: 'Last 30 Days', value: '30d' },
    { label: 'Last 3 Months', value: '3m' },
    { label: 'Last Year', value: '1y' }
  ];
  selectedTimeRange = '7d';

  statCards: StatCard[] = [];
  lineChartData: ChartData | null = null;
  barChartData: ChartData | null = null;
  doughnutChartData: ChartData | null = null;
  gaugeData: GaugeData[] = [];
  tableData: DataTableItem[] = [];
  activityFeed: ActivityItem[] = [];

  galleryImages = [
    {
      icon: 'pi pi-chart-line',
      title: 'Line Analytics',
      description: 'Track trends over time with interactive line charts',
      gradient: '#0ea5e9, #0c4a6e'
    },
    {
      icon: 'pi pi-chart-bar',
      title: 'Bar Comparisons',
      description: 'Compare data sets with animated bar charts',
      gradient: '#06b6d4, #164e63'
    },
    {
      icon: 'pi pi-chart-pie',
      title: 'Distribution Views',
      description: 'Visualize proportions with pie and doughnut charts',
      gradient: '#38bdf8, #0c4a6e'
    },
    {
      icon: 'pi pi-table',
      title: 'Data Tables',
      description: 'Sort, filter, and paginate through datasets',
      gradient: '#7dd3fc, #082f49'
    }
  ];

  galleryResponsiveOptions = [
    { breakpoint: '1024px', numVisible: 4 },
    { breakpoint: '768px', numVisible: 3 },
    { breakpoint: '560px', numVisible: 1 }
  ];

  miniChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }
    },
    scales: {
      x: { display: false },
      y: { display: false }
    },
    elements: {
      line: { tension: 0.4, borderWidth: 2 },
      point: { radius: 0 }
    }
  };

  lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: '#f1f5f9',
        bodyColor: '#cbd5e1',
        borderColor: 'rgba(14, 165, 233, 0.3)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: true
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(14, 165, 233, 0.05)', drawBorder: false },
        ticks: { color: '#64748b', font: { size: 11 } }
      },
      y: {
        grid: { color: 'rgba(14, 165, 233, 0.05)', drawBorder: false },
        ticks: { 
          color: '#64748b', 
          font: { size: 11 },
          callback: (value: number) => '$' + (value / 1000) + 'k'
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    },
    elements: {
      line: { tension: 0.4 },
      point: { radius: 4, hoverRadius: 6 }
    }
  };

  barChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: '#f1f5f9',
        bodyColor: '#cbd5e1',
        borderColor: 'rgba(14, 165, 233, 0.3)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8
      }
    },
    scales: {
      x: {
        grid: { display: false, drawBorder: false },
        ticks: { color: '#64748b', font: { size: 11 } }
      },
      y: {
        grid: { color: 'rgba(14, 165, 233, 0.05)', drawBorder: false },
        ticks: { color: '#64748b', font: { size: 11 } }
      }
    }
  };

  doughnutChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: '#f1f5f9',
        bodyColor: '#cbd5e1',
        borderColor: 'rgba(14, 165, 233, 0.3)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8
      }
    }
  };

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.subscriptions.push(
      this.dataService.getStatCards().subscribe(data => {
        this.statCards = data;
      }),
      this.dataService.getLineChartData().subscribe(data => {
        this.lineChartData = data;
      }),
      this.dataService.getBarChartData().subscribe(data => {
        this.barChartData = data;
      }),
      this.dataService.getDoughnutChartData().subscribe(data => {
        this.doughnutChartData = data;
      }),
      this.dataService.getGaugeData().subscribe(data => {
        this.gaugeData = data;
      })
    );

    this.tableData = this.dataService.getTableData();
    this.activityFeed = this.dataService.getActivityFeed();
  }

  refreshData(): void {
    this.loadData();
  }

  formatValue(value: number, type: string): string {
    switch (type) {
      case 'revenue':
        return '$' + value.toLocaleString();
      case 'conversion':
        return value.toFixed(2) + '%';
      default:
        return value.toLocaleString();
    }
  }

  getMiniChartData(trend: number[], color: string): any {
    return {
      labels: Array(trend.length).fill(''),
      datasets: [{
        data: trend,
        borderColor: color,
        backgroundColor: color + '11',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0
      }]
    };
  }

  getGaugeCircumference(): number {
    return 2 * Math.PI * 50;
  }

  getGaugeOffset(value: number, max: number): number {
    const circumference = this.getGaugeCircumference();
    const percentage = Math.min(value / max, 1);
    return circumference - (percentage * circumference);
  }

  getStatusSeverity(status: string): 'success' | 'warning' | 'info' | 'danger' {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'success';
      case 'active':
        return 'info';
      case 'pending':
        return 'warning';
      case 'planning':
        return 'danger';
      default:
        return 'info';
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
