import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { NodeType, SupplyChainData } from '../../models/supply-chain.model';

@Component({
  selector: 'app-legend',
  standalone: true,
  imports: [MatCardModule, MatDividerModule],
  template: `
    <mat-card class="legend-card p-4 shadow-md">
      <mat-card-header class="mb-3">
        <mat-card-title class="text-base font-semibold text-gray-800">图例</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="space-y-3">
          <div class="legend-section">
            <h3 class="text-sm font-medium text-gray-700 mb-2">节点类型</h3>
            <div class="space-y-2">
              <div class="flex items-center gap-3">
                <div class="w-5 h-5 rounded" [style.background-color]="nodeColors.factory"></div>
                <span class="text-sm text-gray-600">工厂 ({{ getNodeCount('factory') }})</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-5 h-5 rounded" [style.background-color]="nodeColors.warehouse"></div>
                <span class="text-sm text-gray-600">仓库 ({{ getNodeCount('warehouse') }})</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-5 h-5 rounded" [style.background-color]="nodeColors.retailer"></div>
                <span class="text-sm text-gray-600">零售商 ({{ getNodeCount('retailer') }})</span>
              </div>
            </div>
          </div>

          <mat-divider class="my-4"></mat-divider>

          <div class="legend-section">
            <h3 class="text-sm font-medium text-gray-700 mb-2">流量统计</h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">总流量:</span>
                <span class="font-medium text-gray-800">{{ totalFlow }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">节点数量:</span>
                <span class="font-medium text-gray-800">{{ data?.nodes?.length || 0 }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">连接数量:</span>
                <span class="font-medium text-gray-800">{{ data?.links?.length || 0 }}</span>
              </div>
            </div>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .legend-card {
      background: white;
      border-radius: 8px;
    }
  `]
})
export class LegendComponent {
  @Input() data!: SupplyChainData;

  readonly nodeColors: Record<NodeType, string> = {
    factory: '#2563eb',
    warehouse: '#059669',
    retailer: '#d97706'
  };

  getNodeCount(type: NodeType): number {
    if (!this.data?.nodes) return 0;
    return this.data.nodes.filter(n => n.type === type).length;
  }

  get totalFlow(): number {
    if (!this.data?.links) return 0;
    return this.data.links.reduce((sum, link) => sum + link.value, 0);
  }
}
