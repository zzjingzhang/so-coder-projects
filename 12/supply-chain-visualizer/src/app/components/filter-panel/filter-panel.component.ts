import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { FilterOptions, NodeType } from '../../models/supply-chain.model';
import { SupplyChainDataService } from '../../services/supply-chain-data.service';

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSliderModule,
    MatCardModule
  ],
  template: `
    <mat-card class="filter-card p-6 shadow-md">
      <mat-card-header class="mb-4">
        <mat-card-title class="text-lg font-semibold text-gray-800">筛选条件</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form [formGroup]="filterForm" class="space-y-6">
          <div class="node-type-filter">
            <h3 class="text-sm font-medium text-gray-700 mb-3">节点类型</h3>
            <div class="flex flex-wrap gap-4">
              <mat-checkbox 
                formControlName="showFactories" 
                class="text-gray-700">
                <span class="text-sm">工厂</span>
              </mat-checkbox>
              <mat-checkbox 
                formControlName="showWarehouses" 
                class="text-gray-700">
                <span class="text-sm">仓库</span>
              </mat-checkbox>
              <mat-checkbox 
                formControlName="showRetailers" 
                class="text-gray-700">
                <span class="text-sm">零售商</span>
              </mat-checkbox>
            </div>
          </div>

          <div class="product-filter">
            <h3 class="text-sm font-medium text-gray-700 mb-3">产品类型</h3>
            <div class="flex flex-wrap gap-4">
              @for (product of products; track product) {
                <mat-checkbox 
                  [formControlName]="'product_' + product" 
                  class="text-gray-700">
                  <span class="text-sm">{{ product }}</span>
                </mat-checkbox>
              }
            </div>
          </div>

          <div class="flow-filter">
            <h3 class="text-sm font-medium text-gray-700 mb-3">最小流量值</h3>
            <div class="flex items-center gap-4">
              <mat-slider 
                class="flex-1"
                min="0" 
                max="1500" 
                step="50"
                [discrete]="true"
                [showTickMarks]="true">
                <input matSliderThumb formControlName="minFlowValue">
              </mat-slider>
              <span class="text-sm font-medium text-gray-600 w-12 text-right">
                {{ filterForm.get('minFlowValue')?.value }}
              </span>
            </div>
          </div>
        </form>
      </mat-card-content>
      <mat-card-actions class="flex justify-end gap-3 mt-4">
        <button 
          mat-button 
          (click)="resetFilters()"
          class="flex items-center justify-center px-4 py-2">
          重置筛选
        </button>
        <button 
          mat-raised-button 
          color="primary"
          (click)="applyFilters()"
          class="flex items-center justify-center px-6 py-2">
          应用筛选
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    .filter-card {
      background: white;
      border-radius: 8px;
    }
  `]
})
export class FilterPanelComponent implements OnInit {
  @Output() filterChange = new EventEmitter<FilterOptions>();

  filterForm!: FormGroup;
  products: string[] = [];

  constructor(
    private fb: FormBuilder,
    private dataService: SupplyChainDataService
  ) {}

  ngOnInit(): void {
    this.products = this.dataService.getProducts();
    this.initForm();
    this.applyFilters();
  }

  private initForm(): void {
    const formGroupConfig: Record<string, any> = {
      showFactories: [true],
      showWarehouses: [true],
      showRetailers: [true],
      minFlowValue: [0]
    };

    this.products.forEach(product => {
      formGroupConfig['product_' + product] = [true];
    });

    this.filterForm = this.fb.group(formGroupConfig);
  }

  applyFilters(): void {
    const formValue = this.filterForm.value;
    const nodeTypes: NodeType[] = [];

    if (formValue.showFactories) nodeTypes.push('factory');
    if (formValue.showWarehouses) nodeTypes.push('warehouse');
    if (formValue.showRetailers) nodeTypes.push('retailer');

    const selectedProducts: string[] = [];
    this.products.forEach(product => {
      if (formValue['product_' + product]) {
        selectedProducts.push(product);
      }
    });

    const filters: FilterOptions = {
      nodeTypes,
      minFlowValue: formValue.minFlowValue || 0,
      products: selectedProducts
    };

    this.filterChange.emit(filters);
  }

  resetFilters(): void {
    const resetValue: Record<string, any> = {
      showFactories: true,
      showWarehouses: true,
      showRetailers: true,
      minFlowValue: 0
    };

    this.products.forEach(product => {
      resetValue['product_' + product] = true;
    });

    this.filterForm.reset(resetValue);
    this.applyFilters();
  }
}
