import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CheckboxModule } from 'primeng/checkbox';
import { ProgressBarModule } from 'primeng/progressbar';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

interface Report {
  id: string;
  name: string;
  type: string;
  status: 'ready' | 'generating' | 'scheduled' | 'failed';
  created: string;
  size: string;
  category: string;
}

interface ExportOption {
  id: string;
  name: string;
  selected: boolean;
}

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  category: string;
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule,
    ChartModule,
    CardModule,
    TableModule,
    TagModule,
    ButtonModule,
    DropdownModule,
    CalendarModule,
    InputTextModule,
    DialogModule,
    SelectButtonModule,
    CheckboxModule,
    ProgressBarModule,
    FormsModule,
    ToastModule
  ],
  providers: [MessageService],
  template: `
    <div class="space-y-6">
      <!-- Page Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold text-white">
            <span class="neon-text-pink">Reports</span>
          </h1>
          <p class="text-cyber-400 mt-1">Generate and manage your data reports</p>
        </div>
        <div class="flex items-center gap-3">
          <p-selectButton 
            [options]="viewOptions" 
            [(ngModel)]="selectedView" 
            optionLabel="label" 
            optionValue="value"
          ></p-selectButton>
          <button pButton label="New Report" icon="pi pi-plus" (click)="showCreateDialog = true" class="bg-gradient-to-r from-neon-pink to-neon-purple border-none"></button>
        </div>
      </div>

      <!-- Report Templates -->
      <div class="glass-panel glass-panel-hover rounded-xl p-6">
        <h3 class="text-lg font-semibold text-white mb-4">Quick Templates</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          @for (template of templates; track template.id) {
            <div 
              class="p-4 rounded-xl border border-cyber-700 hover:border-neon-blue transition-all duration-300 cursor-pointer group hover:scale-[1.02]"
              (click)="generateFromTemplate(template)"
            >
              <div class="flex items-start justify-between mb-3">
                <div 
                  class="w-12 h-12 rounded-xl flex items-center justify-center"
                  [style.background]="'linear-gradient(135deg, ' + template.color + ')'"
                >
                  <i class="pi {{ template.icon }} text-white text-xl"></i>
                </div>
                <p-tag [value]="template.category" severity="info" styleClass="text-xs"></p-tag>
              </div>
              <h4 class="text-white font-semibold group-hover:text-neon-blue transition-colors">{{ template.name }}</h4>
              <p class="text-cyber-400 text-sm mt-1">{{ template.description }}</p>
            </div>
          }
        </div>
      </div>

      <!-- Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="glass-panel glass-panel-hover rounded-xl p-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-blue/20 to-cyan-500/20 flex items-center justify-center">
              <i class="pi pi-file text-neon-blue text-xl"></i>
            </div>
            <div>
              <p class="text-2xl font-bold text-white">{{ totalReports }}</p>
              <p class="text-cyber-400 text-sm">Total Reports</p>
            </div>
          </div>
        </div>
        <div class="glass-panel glass-panel-hover rounded-xl p-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
              <i class="pi pi-check-circle text-green-400 text-xl"></i>
            </div>
            <div>
              <p class="text-2xl font-bold text-white">{{ readyReports }}</p>
              <p class="text-cyber-400 text-sm">Ready</p>
            </div>
          </div>
        </div>
        <div class="glass-panel glass-panel-hover rounded-xl p-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-amber-500/20 flex items-center justify-center">
              <i class="pi pi-spin pi-cog text-yellow-400 text-xl"></i>
            </div>
            <div>
              <p class="text-2xl font-bold text-white">{{ generatingReports }}</p>
              <p class="text-cyber-400 text-sm">Generating</p>
            </div>
          </div>
        </div>
        <div class="glass-panel glass-panel-hover rounded-xl p-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-purple/20 to-purple-500/20 flex items-center justify-center">
              <i class="pi pi-calendar text-neon-purple text-xl"></i>
            </div>
            <div>
              <p class="text-2xl font-bold text-white">{{ scheduledReports }}</p>
              <p class="text-cyber-400 text-sm">Scheduled</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Reports Table -->
      <div class="glass-panel glass-panel-hover rounded-xl p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-white">Recent Reports</h3>
          <div class="flex items-center gap-3">
            <input 
              type="text" 
              pInputText 
              placeholder="Search reports..." 
              [(ngModel)]="searchQuery"
              class="w-64 bg-cyber-800/50 border-cyber-700"
            />
            <p-dropdown 
              [options]="categoryOptions" 
              [(ngModel)]="selectedCategory"
              placeholder="Category"
              optionLabel="label"
              optionValue="value"
              styleClass="w-40"
              [style]="{'background': 'rgba(15, 23, 42, 0.8)'}"
            ></p-dropdown>
          </div>
        </div>

        <p-table 
          [value]="filteredReports" 
          [tableStyle]="{'min-width': '50rem'}"
          styleClass="p-datatable-gridless"
        >
          <ng-template pTemplate="header">
            <tr class="border-b border-cyber-700">
              <th class="text-cyber-400 font-semibold py-3">Report</th>
              <th class="text-cyber-400 font-semibold py-3">Type</th>
              <th class="text-cyber-400 font-semibold py-3">Status</th>
              <th class="text-cyber-400 font-semibold py-3">Created</th>
              <th class="text-cyber-400 font-semibold py-3">Size</th>
              <th class="text-cyber-400 font-semibold py-3">Actions</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-report>
            <tr class="border-b border-cyber-800 hover:bg-cyber-800/30 transition-colors">
              <td class="py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-cyber-800 flex items-center justify-center">
                    <i class="pi pi-file text-neon-blue"></i>
                  </div>
                  <div>
                    <p class="text-white font-medium">{{ report.name }}</p>
                    <p class="text-xs text-cyber-500 font-mono">{{ report.id }}</p>
                  </div>
                </div>
              </td>
              <td class="py-4">
                <span class="text-cyber-300">{{ report.type }}</span>
              </td>
              <td class="py-4">
                @if (report.status === 'generating') {
                  <div class="flex items-center gap-2">
                    <p-progressBar [value]="65" [showValue]="false" class="w-20 h-2"></p-progressBar>
                    <span class="text-yellow-400 text-sm">Generating...</span>
                  </div>
                } @else {
                  <p-tag 
                    [value]="report.status | titlecase"
                    [severity]="getStatusSeverity(report.status)"
                    styleClass="uppercase text-xs"
                  ></p-tag>
                }
              </td>
              <td class="py-4">
                <span class="text-cyber-300">{{ report.created }}</span>
              </td>
              <td class="py-4">
                <span class="text-cyber-300">{{ report.size }}</span>
              </td>
              <td class="py-4">
                @if (report.status === 'ready') {
                  <button pButton icon="pi pi-download" class="p-button-text text-cyber-400 hover:text-neon-blue p-1" (click)="downloadReport(report)"></button>
                }
                <button pButton icon="pi pi-eye" class="p-button-text text-cyber-400 hover:text-neon-purple p-1" (click)="viewReport(report)"></button>
                <button pButton icon="pi pi-share-alt" class="p-button-text text-cyber-400 hover:text-green-400 p-1" (click)="shareReport(report)"></button>
                <button pButton icon="pi pi-trash" class="p-button-text text-cyber-400 hover:text-red-400 p-1" (click)="deleteReport(report)"></button>
              </td>
            </tr>
          </ng-template>
        </p-table>
      </div>

      <!-- Create Report Dialog -->
      <p-dialog 
        header="Create New Report" 
        [(visible)]="showCreateDialog" 
        [style]="{width: '600px'}"
        [modal]="true"
        [draggable]="false"
        [resizable]="false"
      >
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-cyber-300 mb-2">Report Name</label>
            <input 
              type="text" 
              pInputText 
              placeholder="Enter report name..."
              [(ngModel)]="newReportName"
              class="w-full bg-cyber-800/50 border-cyber-700"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-cyber-300 mb-2">Report Type</label>
            <p-dropdown 
              [options]="reportTypeOptions" 
              [(ngModel)]="selectedReportType"
              placeholder="Select report type"
              optionLabel="label"
              optionValue="value"
              styleClass="w-full"
              [style]="{'background': 'rgba(15, 23, 42, 0.8)'}"
            ></p-dropdown>
          </div>
          <div>
            <label class="block text-sm font-medium text-cyber-300 mb-2">Date Range</label>
            <p-calendar 
              [(ngModel)]="dateRange" 
              selectionMode="range"
              [readonlyInput]="true"
              placeholder="Select date range"
              styleClass="w-full"
            ></p-calendar>
          </div>
          <div>
            <label class="block text-sm font-medium text-cyber-300 mb-2">Export Format</label>
            <div class="flex flex-wrap gap-3">
              @for (option of exportOptions; track option.id) {
                <div class="flex items-center gap-2">
                  <p-checkbox 
                    [(ngModel)]="option.selected" 
                    [binary]="true"
                    [inputId]="option.id"
                  ></p-checkbox>
                  <label [for]="option.id" class="text-cyber-300">{{ option.name }}</label>
                </div>
              }
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-cyber-300 mb-2">Schedule</label>
            <p-dropdown 
              [options]="scheduleOptions" 
              [(ngModel)]="selectedSchedule"
              placeholder="When to generate"
              optionLabel="label"
              optionValue="value"
              styleClass="w-full"
              [style]="{'background': 'rgba(15, 23, 42, 0.8)'}"
            ></p-dropdown>
          </div>
        </div>
        <ng-template pTemplate="footer">
          <div class="flex items-center justify-end gap-3">
            <button pButton label="Cancel" class="p-button-outlined" styleClass="border-cyber-700 text-cyber-400" (click)="showCreateDialog = false"></button>
            <button pButton label="Generate" icon="pi pi-play" class="bg-gradient-to-r from-neon-blue to-neon-purple border-none" (click)="createReport()"></button>
          </div>
        </ng-template>
      </p-dialog>

      <p-toast position="top-right"></p-toast>
    </div>
  `,
  styles: []
})
export class ReportsComponent implements OnInit {
  viewOptions = [
    { label: 'List', value: 'list', icon: 'pi pi-list' },
    { label: 'Grid', value: 'grid', icon: 'pi pi-th-large' }
  ];
  selectedView = 'list';

  searchQuery = '';
  selectedCategory = 'all';
  categoryOptions = [
    { label: 'All Categories', value: 'all' },
    { label: 'Analytics', value: 'analytics' },
    { label: 'Financial', value: 'financial' },
    { label: 'Marketing', value: 'marketing' },
    { label: 'Operations', value: 'operations' }
  ];

  reportTypeOptions = [
    { label: 'Traffic Analysis', value: 'traffic' },
    { label: 'Conversion Report', value: 'conversion' },
    { label: 'User Behavior', value: 'behavior' },
    { label: 'Revenue Summary', value: 'revenue' },
    { label: 'Custom Report', value: 'custom' }
  ];
  selectedReportType: string | undefined;

  scheduleOptions = [
    { label: 'Generate Now', value: 'now' },
    { label: 'Schedule for Later', value: 'schedule' },
    { label: 'Recurring Daily', value: 'daily' },
    { label: 'Recurring Weekly', value: 'weekly' }
  ];
  selectedSchedule = 'now';

  exportOptions: ExportOption[] = [
    { id: 'pdf', name: 'PDF', selected: true },
    { id: 'excel', name: 'Excel', selected: false },
    { id: 'csv', name: 'CSV', selected: false },
    { id: 'json', name: 'JSON', selected: false }
  ];

  showCreateDialog = false;
  newReportName = '';
  dateRange: Date[] | undefined;

  templates: ReportTemplate[] = [
    {
      id: '1',
      name: 'Traffic Overview',
      description: 'Website traffic analysis report',
      icon: 'pi-chart-line',
      color: '#00f3ff, #0099cc',
      category: 'Analytics'
    },
    {
      id: '2',
      name: 'Conversion Funnel',
      description: 'User conversion path analysis',
      icon: 'pi-chart-pie',
      color: '#bd00ff, #8800cc',
      category: 'Analytics'
    },
    {
      id: '3',
      name: 'Revenue Report',
      description: 'Financial performance summary',
      icon: 'pi-dollar-sign',
      color: '#10b981, #059669',
      category: 'Financial'
    },
    {
      id: '4',
      name: 'User Retention',
      description: 'User engagement and retention',
      icon: 'pi-users',
      color: '#ff00aa, #cc0088',
      category: 'Marketing'
    }
  ];

  reports: Report[] = [
    { id: 'RPT-2024-001', name: 'Monthly Traffic Analysis', type: 'Traffic', status: 'ready', created: '2024-01-15 14:30', size: '2.4 MB', category: 'analytics' },
    { id: 'RPT-2024-002', name: 'Q4 Revenue Summary', type: 'Financial', status: 'ready', created: '2024-01-14 09:15', size: '1.8 MB', category: 'financial' },
    { id: 'RPT-2024-003', name: 'User Behavior Report', type: 'Analytics', status: 'generating', created: '2024-01-15 10:00', size: '-', category: 'analytics' },
    { id: 'RPT-2024-004', name: 'Marketing Campaign ROI', type: 'Marketing', status: 'scheduled', created: '2024-01-16 08:00', size: '-', category: 'marketing' },
    { id: 'RPT-2024-005', name: 'Server Performance Log', type: 'Operations', status: 'ready', created: '2024-01-13 16:45', size: '5.2 MB', category: 'operations' },
    { id: 'RPT-2024-006', name: 'API Usage Statistics', type: 'Analytics', status: 'failed', created: '2024-01-12 11:20', size: '0 KB', category: 'analytics' }
  ];

  private messageService = inject(MessageService);

  constructor() {}

  ngOnInit(): void {}

  get totalReports(): number {
    return this.reports.length;
  }

  get readyReports(): number {
    return this.reports.filter(r => r.status === 'ready').length;
  }

  get generatingReports(): number {
    return this.reports.filter(r => r.status === 'generating').length;
  }

  get scheduledReports(): number {
    return this.reports.filter(r => r.status === 'scheduled').length;
  }

  get filteredReports(): Report[] {
    let filtered = [...this.reports];
    
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(r => 
        r.name.toLowerCase().includes(query) || 
        r.id.toLowerCase().includes(query)
      );
    }
    
    if (this.selectedCategory && this.selectedCategory !== 'all') {
      filtered = filtered.filter(r => r.category === this.selectedCategory);
    }
    
    return filtered;
  }

  getStatusSeverity(status: string): 'success' | 'warning' | 'danger' | 'info' | 'secondary' {
    switch (status) {
      case 'ready': return 'success';
      case 'generating': return 'warning';
      case 'scheduled': return 'info';
      case 'failed': return 'danger';
      default: return 'secondary';
    }
  }

  generateFromTemplate(template: ReportTemplate): void {
    this.newReportName = template.name + ' - ' + new Date().toLocaleDateString();
    this.selectedReportType = template.id;
    this.showCreateDialog = true;
  }

  createReport(): void {
    if (!this.newReportName.trim()) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please enter a report name' });
      return;
    }

    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Report generation started' });
    this.showCreateDialog = false;

    const newReport: Report = {
      id: `RPT-2024-${String(this.reports.length + 1).padStart(3, '0')}`,
      name: this.newReportName,
      type: this.selectedReportType || 'Custom',
      status: 'generating',
      created: new Date().toLocaleString(),
      size: '-',
      category: 'analytics'
    };

    this.reports.unshift(newReport);

    setTimeout(() => {
      newReport.status = 'ready';
      newReport.size = (Math.random() * 5 + 0.5).toFixed(1) + ' MB';
      this.messageService.add({ severity: 'success', summary: 'Ready', detail: 'Report generated successfully' });
    }, 3000);
  }

  downloadReport(report: Report): void {
    this.messageService.add({ severity: 'info', summary: 'Downloading', detail: `Downloading: ${report.name}` });
  }

  viewReport(report: Report): void {
    this.messageService.add({ severity: 'info', summary: 'Opening', detail: `Opening: ${report.name}` });
  }

  shareReport(report: Report): void {
    this.messageService.add({ severity: 'success', summary: 'Shared', detail: `Report shared successfully` });
  }

  deleteReport(report: Report): void {
    const index = this.reports.findIndex(r => r.id === report.id);
    if (index !== -1) {
      this.reports.splice(index, 1);
      this.messageService.add({ severity: 'success', summary: 'Deleted', detail: `Report deleted successfully` });
    }
  }
}
