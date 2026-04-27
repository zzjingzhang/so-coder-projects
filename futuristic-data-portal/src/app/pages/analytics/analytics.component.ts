import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';

interface TrafficSource {
  source: string;
  visitors: number;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
}

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    CommonModule,
    ChartModule,
    CardModule,
    TabViewModule,
    TableModule,
    TagModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    FormsModule
  ],
  template: `
    <div class="space-y-6">
      <!-- Page Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold text-white">
            <span class="neon-text-purple">Analytics</span>
          </h1>
          <p class="text-cyber-400 mt-1">Deep dive into your data insights</p>
        </div>
        <div class="flex items-center gap-3">
          <p-calendar 
            [(ngModel)]="selectedDate" 
            selectionMode="range"
            [readonlyInput]="true"
            placeholder="Select date range"
            styleClass="bg-cyber-800 border-cyber-700"
          ></p-calendar>
          <button pButton label="Generate Report" icon="pi pi-file-export" class="bg-gradient-to-r from-neon-purple to-neon-pink border-none"></button>
        </div>
      </div>

      <!-- Tab View -->
      <p-tabView [activeIndex]="activeTab">
        <!-- Traffic Analysis Tab -->
        <p-tabPanel header="Traffic Analysis">
          <ng-template pTemplate="content">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
              <!-- Area Chart -->
              <div class="glass-panel glass-panel-hover rounded-xl p-6">
                <h3 class="text-lg font-semibold text-white mb-4">Traffic Trends</h3>
                <div class="chart-container h-80">
                  <p-chart 
                    type="line" 
                    [data]="areaChartData" 
                    [options]="areaChartOptions"
                  ></p-chart>
                </div>
              </div>

              <!-- Stacked Bar Chart -->
              <div class="glass-panel glass-panel-hover rounded-xl p-6">
                <h3 class="text-lg font-semibold text-white mb-4">Page Views by Category</h3>
                <div class="chart-container h-80">
                  <p-chart 
                    type="bar" 
                    [data]="stackedBarData" 
                    [options]="stackedBarOptions"
                  ></p-chart>
                </div>
              </div>

              <!-- Traffic Sources Table -->
              <div class="lg:col-span-2 glass-panel glass-panel-hover rounded-xl p-6">
                <h3 class="text-lg font-semibold text-white mb-4">Traffic Sources</h3>
                <p-table 
                  [value]="trafficSources" 
                  [tableStyle]="{'min-width': '50rem'}"
                  styleClass="p-datatable-gridless"
                >
                  <ng-template pTemplate="header">
                    <tr class="border-b border-cyber-700">
                      <th class="text-cyber-400 font-semibold py-3">Source</th>
                      <th class="text-cyber-400 font-semibold py-3">Visitors</th>
                      <th class="text-cyber-400 font-semibold py-3">Percentage</th>
                      <th class="text-cyber-400 font-semibold py-3">Trend</th>
                      <th class="text-cyber-400 font-semibold py-3">Actions</th>
                    </tr>
                  </ng-template>
                  <ng-template pTemplate="body" let-source>
                    <tr class="border-b border-cyber-800 hover:bg-cyber-800/30 transition-colors">
                      <td class="py-4">
                        <div class="flex items-center gap-3">
                          <div 
                            class="w-10 h-10 rounded-lg flex items-center justify-center"
                            [class]="getSourceIconClass(source.source)"
                          >
                            <i class="pi {{ getSourceIcon(source.source) }} text-white"></i>
                          </div>
                          <span class="text-white font-medium">{{ source.source }}</span>
                        </div>
                      </td>
                      <td class="py-4">
                        <span class="text-cyber-300 counter-number">{{ source.visitors | number }}</span>
                      </td>
                      <td class="py-4">
                        <div class="flex items-center gap-3">
                          <div class="w-32 h-2 bg-cyber-800 rounded-full overflow-hidden">
                            <div 
                              class="h-full progress-animated rounded-full"
                              [style.width.%]="source.percentage"
                            ></div>
                          </div>
                          <span class="text-cyber-300 text-sm font-medium">{{ source.percentage }}%</span>
                        </div>
                      </td>
                      <td class="py-4">
                        <span 
                          class="flex items-center gap-1 text-sm font-medium"
                          [class.text-green-400]="source.trend === 'up'"
                          [class.text-red-400]="source.trend === 'down'"
                          [class.text-cyber-400]="source.trend === 'stable'"
                        >
                          <i class="pi" 
                            [class.pi-arrow-up]="source.trend === 'up'"
                            [class.pi-arrow-down]="source.trend === 'down'"
                            [class.pi-minus]="source.trend === 'stable'"
                          ></i>
                          {{ getTrendText(source.trend) }}
                        </span>
                      </td>
                      <td class="py-4">
                        <button pButton icon="pi pi-eye" class="p-button-text text-cyber-400 hover:text-neon-blue"></button>
                        <button pButton icon="pi pi-chart-line" class="p-button-text text-cyber-400 hover:text-neon-purple"></button>
                      </td>
                    </tr>
                  </ng-template>
                </p-table>
              </div>
            </div>
          </ng-template>
        </p-tabPanel>

        <!-- User Behavior Tab -->
        <p-tabPanel header="User Behavior">
          <ng-template pTemplate="content">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
              <!-- Session Duration -->
              <div class="glass-panel glass-panel-hover rounded-xl p-6">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-lg font-semibold text-white">Session Duration</h3>
                  <p-tag value="Avg 4:32" severity="info" styleClass="text-xs"></p-tag>
                </div>
                <div class="chart-container h-64">
                  <p-chart 
                    type="line" 
                    [data]="sessionChartData" 
                    [options]="sessionChartOptions"
                  ></p-chart>
                </div>
              </div>

              <!-- Bounce Rate -->
              <div class="glass-panel glass-panel-hover rounded-xl p-6">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-lg font-semibold text-white">Bounce Rate</h3>
                  <p-tag value="42.3%" severity="warning" styleClass="text-xs"></p-tag>
                </div>
                <div class="chart-container h-64">
                  <p-chart 
                    type="doughnut" 
                    [data]="bounceChartData" 
                    [options]="bounceChartOptions"
                  ></p-chart>
                </div>
              </div>

              <!-- Page Views per Session -->
              <div class="glass-panel glass-panel-hover rounded-xl p-6">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-lg font-semibold text-white">Pages/Session</h3>
                  <p-tag value="3.8" severity="success" styleClass="text-xs"></p-tag>
                </div>
                <div class="chart-container h-64">
                  <p-chart 
                    type="bar" 
                    [data]="pagesChartData" 
                    [options]="pagesChartOptions"
                  ></p-chart>
                </div>
              </div>
            </div>
          </ng-template>
        </p-tabPanel>

        <!-- Conversion Tab -->
        <p-tabPanel header="Conversions">
          <ng-template pTemplate="content">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
              <!-- Conversion Funnel -->
              <div class="glass-panel glass-panel-hover rounded-xl p-6">
                <h3 class="text-lg font-semibold text-white mb-6">Conversion Funnel</h3>
                <div class="space-y-4">
                  @for (funnel of funnelData; track funnel.stage; let i = $index) {
                    <div class="relative">
                      <div class="flex items-center justify-between mb-2">
                        <span class="text-cyber-300 font-medium">{{ funnel.stage }}</span>
                        <span class="text-neon-blue font-bold">{{ funnel.value | number }}</span>
                      </div>
                      <div class="h-8 bg-cyber-800 rounded-lg overflow-hidden relative">
                        <div 
                          class="h-full rounded-lg transition-all duration-1000"
                          [style.width.%]="funnel.percentage"
                          [style.background]="'linear-gradient(90deg, ' + funnel.color + ', ' + funnel.colorLight + ')'"
                        ></div>
                        <div class="absolute inset-0 flex items-center justify-between px-3">
                          <span class="text-xs font-medium text-white">{{ funnel.percentage }}%</span>
                          <span 
                            class="text-xs font-medium"
                            [class.text-green-400]="funnel.rate >= 0"
                            [class.text-red-400]="funnel.rate < 0"
                          >
                            {{ funnel.rate > 0 ? '+' : '' }}{{ funnel.rate }}%
                          </span>
                        </div>
                      </div>
                      @if (i < funnelData.length - 1) {
                        <div class="flex justify-center my-2">
                          <i class="pi pi-arrow-down text-cyber-600"></i>
                        </div>
                      }
                    </div>
                  }
                </div>
              </div>

              <!-- Conversion by Channel -->
              <div class="glass-panel glass-panel-hover rounded-xl p-6">
                <h3 class="text-lg font-semibold text-white mb-4">Conversions by Channel</h3>
                <div class="chart-container h-80">
                  <p-chart 
                    type="polarArea" 
                    [data]="polarChartData" 
                    [options]="polarChartOptions"
                  ></p-chart>
                </div>
              </div>
            </div>
          </ng-template>
        </p-tabPanel>
      </p-tabView>
    </div>
  `,
  styles: []
})
export class AnalyticsComponent implements OnInit {
  activeTab = 0;
  selectedDate: Date[] | undefined;

  areaChartData: any;
  areaChartOptions: any;
  stackedBarData: any;
  stackedBarOptions: any;
  sessionChartData: any;
  sessionChartOptions: any;
  bounceChartData: any;
  bounceChartOptions: any;
  pagesChartData: any;
  pagesChartOptions: any;
  polarChartData: any;
  polarChartOptions: any;

  trafficSources: TrafficSource[] = [
    { source: 'Organic Search', visitors: 12453, percentage: 45, trend: 'up' },
    { source: 'Direct', visitors: 5672, percentage: 20, trend: 'stable' },
    { source: 'Social Media', visitors: 4231, percentage: 15, trend: 'up' },
    { source: 'Referral', visitors: 3124, percentage: 11, trend: 'down' },
    { source: 'Paid Ads', visitors: 2456, percentage: 9, trend: 'up' }
  ];

  funnelData = [
    { stage: 'Visitors', value: 24897, percentage: 100, rate: 12, color: '#00f3ff', colorLight: 'rgba(0, 243, 255, 0.5)' },
    { stage: 'Product Views', value: 15678, percentage: 63, rate: 8, color: '#bd00ff', colorLight: 'rgba(189, 0, 255, 0.5)' },
    { stage: 'Add to Cart', value: 8456, percentage: 34, rate: -2, color: '#ff00aa', colorLight: 'rgba(255, 0, 170, 0.5)' },
    { stage: 'Checkout', value: 5234, percentage: 21, rate: 5, color: '#10b981', colorLight: 'rgba(16, 185, 129, 0.5)' },
    { stage: 'Purchase', value: 3876, percentage: 16, rate: 15, color: '#f59e0b', colorLight: 'rgba(245, 158, 11, 0.5)' }
  ];

  constructor() {}

  ngOnInit(): void {
    this.initCharts();
  }

  private initCharts(): void {
    const labels = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'];
    const textColor = '#94a3b8';
    const gridColor = 'rgba(100, 116, 139, 0.2)';

    this.areaChartData = {
      labels: labels,
      datasets: [
        {
          label: 'Today',
          data: [120, 90, 140, 180, 160, 200, 140],
          borderColor: '#00f3ff',
          backgroundColor: 'rgba(0, 243, 255, 0.2)',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        },
        {
          label: 'Yesterday',
          data: [100, 80, 120, 150, 140, 180, 120],
          borderColor: '#bd00ff',
          backgroundColor: 'rgba(189, 0, 255, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }
      ]
    };

    this.areaChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: textColor }
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
      }
    };

    this.stackedBarData = {
      labels: ['Home', 'Products', 'Blog', 'Pricing', 'About', 'Contact'],
      datasets: [
        {
          label: 'New Users',
          backgroundColor: '#00f3ff',
          data: [35, 25, 20, 10, 5, 5]
        },
        {
          label: 'Returning Users',
          backgroundColor: '#bd00ff',
          data: [25, 30, 15, 8, 4, 3]
        },
        {
          label: 'Bots',
          backgroundColor: '#64748b',
          data: [5, 3, 2, 1, 0, 1]
        }
      ]
    };

    this.stackedBarOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: textColor }
        }
      },
      scales: {
        x: {
          stacked: true,
          grid: { color: gridColor },
          ticks: { color: textColor }
        },
        y: {
          stacked: true,
          grid: { color: gridColor },
          ticks: { color: textColor }
        }
      }
    };

    this.sessionChartData = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Duration (min)',
          data: [4.2, 3.8, 5.1, 4.5, 3.9, 6.2, 5.8],
          borderColor: '#00f3ff',
          backgroundColor: 'rgba(0, 243, 255, 0.2)',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }
      ]
    };

    this.sessionChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: gridColor }, ticks: { color: textColor } },
        y: { grid: { color: gridColor }, ticks: { color: textColor } }
      }
    };

    this.bounceChartData = {
      labels: ['Bounced', 'Engaged'],
      datasets: [
        {
          data: [42.3, 57.7],
          backgroundColor: ['#ef4444', '#00f3ff'],
          borderColor: '#0f172a',
          borderWidth: 4
        }
      ]
    };

    this.bounceChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '70%',
      plugins: { legend: { display: false } }
    };

    this.pagesChartData = {
      labels: ['1', '2', '3', '4', '5+'],
      datasets: [
        {
          label: 'Users',
          data: [25, 35, 20, 12, 8],
          backgroundColor: '#bd00ff',
          borderRadius: 8
        }
      ]
    };

    this.pagesChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: gridColor }, ticks: { color: textColor } },
        y: { grid: { color: gridColor }, ticks: { color: textColor } }
      }
    };

    this.polarChartData = {
      labels: ['Organic', 'Direct', 'Social', 'Referral', 'Email'],
      datasets: [
        {
          data: [45, 20, 15, 10, 10],
          backgroundColor: [
            'rgba(0, 243, 255, 0.7)',
            'rgba(189, 0, 255, 0.7)',
            'rgba(255, 0, 170, 0.7)',
            'rgba(16, 185, 129, 0.7)',
            'rgba(245, 158, 11, 0.7)'
          ],
          borderColor: '#0f172a',
          borderWidth: 2
        }
      ]
    };

    this.polarChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: { color: textColor }
        }
      },
      scales: {
        r: {
          grid: { color: gridColor },
          ticks: { color: textColor, display: false }
        }
      }
    };
  }

  getSourceIcon(source: string): string {
    const icons: Record<string, string> = {
      'Organic Search': 'pi-search',
      'Direct': 'pi-globe',
      'Social Media': 'pi-share-alt',
      'Referral': 'pi-link',
      'Paid Ads': 'pi-credit-card'
    };
    return icons[source] || 'pi-chart';
  }

  getSourceIconClass(source: string): string {
    const classes: Record<string, string> = {
      'Organic Search': 'bg-gradient-to-br from-green-500 to-emerald-600',
      'Direct': 'bg-gradient-to-br from-neon-blue to-cyan-600',
      'Social Media': 'bg-gradient-to-br from-neon-purple to-purple-600',
      'Referral': 'bg-gradient-to-br from-neon-pink to-rose-600',
      'Paid Ads': 'bg-gradient-to-br from-orange-500 to-amber-600'
    };
    return classes[source] || 'bg-cyber-600';
  }

  getTrendText(trend: string): string {
    const texts: Record<string, string> = {
      'up': 'Increasing',
      'down': 'Decreasing',
      'stable': 'Stable'
    };
    return texts[trend] || 'Stable';
  }
}
