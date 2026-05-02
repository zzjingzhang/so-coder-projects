import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectComponent, NzOptionComponent } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-add-car-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzInputModule,
    NzInputNumberModule,
    NzSelectComponent,
    NzOptionComponent
  ],
  template: `
    <form [formGroup]="carForm" class="space-y-4">
      <div>
        <label class="block text-white mb-2 text-sm font-medium">品牌 *</label>
        <nz-select
          formControlName="brand"
          nzPlaceHolder="请选择品牌"
          nzAllowClear
          class="w-full"
        >
          @for (brand of carBrands; track brand.value) {
            <nz-option [nzLabel]="brand.label" [nzValue]="brand.value"></nz-option>
          }
        </nz-select>
        @if (carForm.controls['brand'].invalid && (carForm.controls['brand'].dirty || carForm.controls['brand'].touched)) {
          <p class="text-red-400 text-xs mt-1">请选择品牌</p>
        }
      </div>

      <div>
        <label class="block text-white mb-2 text-sm font-medium">型号 *</label>
        <input
          nz-input
          formControlName="model"
          placeholder="例如：Model 3"
          class="!bg-[#141414] !border-[#333333] !text-white"
        />
        @if (carForm.controls['model'].invalid && (carForm.controls['model'].dirty || carForm.controls['model'].touched)) {
          <p class="text-red-400 text-xs mt-1">请输入型号</p>
        }
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-white mb-2 text-sm font-medium">年份 *</label>
          <nz-input-number
            formControlName="year"
            [nzMin]="1900"
            [nzMax]="2100"
            [nzStep]="1"
            class="w-full"
          ></nz-input-number>
        </div>
        <div>
          <label class="block text-white mb-2 text-sm font-medium">价格 (元) *</label>
          <nz-input-number
            formControlName="price"
            [nzMin]="0"
            [nzStep]="10000"
            [nzFormatter]="priceFormatter"
            class="w-full"
          ></nz-input-number>
        </div>
      </div>

      <div>
        <label class="block text-white mb-2 text-sm font-medium">图片链接 (可选)</label>
        <input
          nz-input
          formControlName="imageUrl"
          placeholder="留空将使用默认图片"
          class="!bg-[#141414] !border-[#333333] !text-white"
        />
        <p class="text-secondary text-xs mt-1">不填写将根据品牌自动生成默认图片</p>
      </div>
    </form>
  `,
  styles: [`
    :host {
      display: block;
    }
    .space-y-4 > * + * {
      margin-top: 1rem;
    }
    .grid {
      display: grid;
    }
    .grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .gap-4 {
      gap: 1rem;
    }
    .w-full {
      width: 100%;
    }
    .block {
      display: block;
    }
    .text-white {
      color: #ffffff;
    }
    .text-sm {
      font-size: 0.875rem;
    }
    .font-medium {
      font-weight: 500;
    }
    .mb-2 {
      margin-bottom: 0.5rem;
    }
    .text-xs {
      font-size: 0.75rem;
    }
    .mt-1 {
      margin-top: 0.25rem;
    }
    .text-red-400 {
      color: #f87171;
    }
    .text-secondary {
      color: #a0a0a0;
    }
  `]
})
export class AddCarModalComponent {
  private modalRef = inject(NzModalRef);
  private fb = inject(FormBuilder);

  carForm: FormGroup;

  carBrands = [
    { label: 'Tesla', value: 'Tesla' },
    { label: 'BMW', value: 'BMW' },
    { label: 'Mercedes-Benz', value: 'Mercedes-Benz' },
    { label: 'Audi', value: 'Audi' },
    { label: 'Porsche', value: 'Porsche' },
    { label: 'Toyota', value: 'Toyota' },
    { label: 'Honda', value: 'Honda' },
    { label: 'Ford', value: 'Ford' },
    { label: 'Lexus', value: 'Lexus' },
    { label: 'Maserati', value: 'Maserati' },
    { label: 'Lamborghini', value: 'Lamborghini' },
    { label: 'Ferrari', value: 'Ferrari' },
    { label: '其他', value: '其他' }
  ];

  constructor() {
    this.carForm = this.fb.group({
      brand: ['', [Validators.required]],
      model: ['', [Validators.required]],
      year: [2024, [Validators.required, Validators.min(1900), Validators.max(2100)]],
      price: [0, [Validators.required, Validators.min(0)]],
      imageUrl: ['']
    });
  }

  handleOk(): void {
    if (this.carForm.invalid) {
      Object.values(this.carForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    }
    this.modalRef.close(this.carForm.value);
  }

  handleCancel(): void {
    this.modalRef.destroy();
  }

  priceFormatter = (value: number): string => {
    if (!value && value !== 0) {
      return '';
    }
    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
}
