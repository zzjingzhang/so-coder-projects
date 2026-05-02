import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { SankeyChartComponent } from '../../components/sankey-chart/sankey-chart.component';
import { FilterPanelComponent } from '../../components/filter-panel/filter-panel.component';
import { LegendComponent } from '../../components/legend/legend.component';
import { SupplyChainDataService } from '../../services/supply-chain-data.service';
import { SupplyChainData, FilterOptions } from '../../models/supply-chain.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatCardModule,
    SankeyChartComponent,
    FilterPanelComponent,
    LegendComponent
  ],
  template: `
    <div class="dashboard-container min-h-screen bg-slate-50">
      <mat-toolbar color="primary" class="shadow-md">
        <span class="text-xl font-semibold">供应链流程可视化</span>
        <span class="flex-1"></span>
        <span class="text-sm opacity-90">实时监控物料流动</span>
      </mat-toolbar>

      <div class="content-wrapper p-6">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div class="lg:col-span-1 space-y-6">
            <app-filter-panel (filterChange)="onFilterChange($event)"></app-filter-panel>
            <app-legend [data]="filteredData"></app-legend>
          </div>

          <div class="lg:col-span-3">
            <mat-card class="shadow-md h-full">
              <mat-card-header class="p-4 border-b border-gray-100">
                <mat-card-title class="text-lg font-semibold text-gray-800">
                  物料流动桑基图
                </mat-card-title>
                <mat-card-subtitle class="text-sm text-gray-500 mt-1">
                  工厂 → 仓库 → 零售商 的完整供应链视图
                </mat-card-subtitle>
              </mat-card-header>
              <mat-card-content class="p-4">
                @if (filteredData && filteredData.nodes.length > 0 && filteredData.links.length > 0) {
                  <app-sankey-chart [data]="filteredData"></app-sankey-chart>
                } @else {
                  <div class="flex flex-col items-center justify-center h-96 text-gray-500">
                    <svg class="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p class="text-lg font-medium">暂无数据显示</p>
                    <p class="text-sm mt-2">请调整筛选条件或选择其他节点类型</p>
                  </div>
                }
              </mat-card-content>
            </mat-card>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      min-height: 100vh;
    }
  `]
})
export class DashboardComponent implements OnInit {
  filteredData!: SupplyChainData;

  constructor(private dataService: SupplyChainDataService) {}

  ngOnInit(): void {
    this.onFilterChange(this.dataService.getDefaultFilters());
  }

  onFilterChange(filters: FilterOptions): void {
    this.dataService.getFilteredData(filters).subscribe({
      next: (data) => {
        this.filteredData = data;
      }
    });
  }
}
