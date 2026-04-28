import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { Incense } from '../../types';

@Component({
  selector: 'app-incense-archive',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    TagModule,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './incense-archive.component.html',
  styleUrl: './incense-archive.component.css',
})
export class IncenseArchiveComponent {
  incenses = signal<Incense[]>(this.getMockData());
  
  displayDialog = signal(false);
  isEdit = signal(false);
  selectedIncense = signal<Incense | null>(null);
  
  formData = {
    id: '',
    name: '',
    type: '',
    origin: '',
    quality: '',
    description: '',
    price: 0,
    imageUrl: ''
  };

  incenseTypes = [
    { label: '沉香', value: '沉香' },
    { label: '檀香', value: '檀香' },
    { label: '龙涎香', value: '龙涎香' },
    { label: '乳香', value: '乳香' },
    { label: '安息香', value: '安息香' },
    { label: '苏合香', value: '苏合香' },
    { label: '麝香', value: '麝香' },
    { label: '其他', value: '其他' }
  ];

  origins = [
    { label: '越南', value: '越南' },
    { label: '印度尼西亚', value: '印度尼西亚' },
    { label: '马来西亚', value: '马来西亚' },
    { label: '泰国', value: '泰国' },
    { label: '柬埔寨', value: '柬埔寨' },
    { label: '印度', value: '印度' },
    { label: '中国海南', value: '中国海南' },
    { label: '中国云南', value: '中国云南' },
    { label: '其他', value: '其他' }
  ];

  qualities = [
    { label: '极品', value: '极品' },
    { label: '上品', value: '上品' },
    { label: '中品', value: '中品' },
    { label: '下品', value: '下品' }
  ];

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  getMockData(): Incense[] {
    return [
      {
        id: '1',
        name: '奇楠沉香',
        type: '沉香',
        origin: '越南',
        quality: '极品',
        description: '越南芽庄奇楠沉香，香气醇厚持久，层次丰富，被誉为沉香之王。',
        price: 50000,
        imageUrl: '',
        createdAt: new Date('2026-01-15'),
        updatedAt: new Date('2026-01-15')
      },
      {
        id: '2',
        name: '印度老山檀',
        type: '檀香',
        origin: '印度',
        quality: '上品',
        description: '印度迈索尔老山檀，香气温润醇厚，奶香浓郁，是檀香中的极品。',
        price: 8000,
        imageUrl: '',
        createdAt: new Date('2026-02-10'),
        updatedAt: new Date('2026-02-10')
      },
      {
        id: '3',
        name: '海南沉香',
        type: '沉香',
        origin: '中国海南',
        quality: '上品',
        description: '海南尖峰岭沉香，香气清雅，带有明显的花香和果香，是国产沉香的代表。',
        price: 15000,
        imageUrl: '',
        createdAt: new Date('2026-03-05'),
        updatedAt: new Date('2026-03-05')
      }
    ];
  }

  showAddDialog() {
    this.isEdit.set(false);
    this.formData = {
      id: '',
      name: '',
      type: '',
      origin: '',
      quality: '',
      description: '',
      price: 0,
      imageUrl: ''
    };
    this.displayDialog.set(true);
  }

  showEditDialog(incense: Incense) {
    this.isEdit.set(true);
    this.selectedIncense.set(incense);
    this.formData = {
      id: incense.id,
      name: incense.name,
      type: incense.type,
      origin: incense.origin,
      quality: incense.quality,
      description: incense.description,
      price: incense.price,
      imageUrl: incense.imageUrl
    };
    this.displayDialog.set(true);
  }

  hideDialog() {
    this.displayDialog.set(false);
    this.selectedIncense.set(null);
  }

  saveIncense() {
    if (!this.formData.name || !this.formData.type) {
      this.messageService.add({ 
        severity: 'error', 
        summary: '错误', 
        detail: '请填写必填项' 
      });
      return;
    }

    if (this.isEdit()) {
      const updatedIncenses = this.incenses().map(i => {
        if (i.id === this.formData.id) {
          return {
            ...i,
            ...this.formData,
            updatedAt: new Date()
          };
        }
        return i;
      });
      this.incenses.set(updatedIncenses);
      this.messageService.add({ 
        severity: 'success', 
        summary: '成功', 
        detail: '香品信息已更新' 
      });
    } else {
      const newIncense: Incense = {
        ...this.formData,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      this.incenses.set([...this.incenses(), newIncense]);
      this.messageService.add({ 
        severity: 'success', 
        summary: '成功', 
        detail: '香品已添加' 
      });
    }

    this.hideDialog();
  }

  deleteIncense(incense: Incense) {
    this.confirmationService.confirm({
      message: `确定要删除香品「${incense.name}」吗？`,
      header: '确认删除',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        const filteredIncenses = this.incenses().filter(i => i.id !== incense.id);
        this.incenses.set(filteredIncenses);
        this.messageService.add({ 
          severity: 'success', 
          summary: '成功', 
          detail: '香品已删除' 
        });
      },
      reject: () => {
        this.messageService.add({ 
          severity: 'info', 
          summary: '取消', 
          detail: '已取消删除' 
        });
      }
    });
  }

  getQualitySeverity(quality: string): 'success' | 'warning' | 'info' | 'danger' {
    switch (quality) {
      case '极品':
        return 'success';
      case '上品':
        return 'warning';
      case '中品':
        return 'info';
      default:
        return 'danger';
    }
  }
}
