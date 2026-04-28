import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { RatingModule } from 'primeng/rating';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { IncenseRecord } from '../../types';

@Component({
  selector: 'app-incense-record',
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    DropdownModule,
    TagModule,
    ConfirmDialogModule,
    ToastModule,
    CalendarModule,
    RatingModule,
    FormsModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './incense-record.component.html',
  styleUrl: './incense-record.component.css',
})
export class IncenseRecordComponent {
  records = signal<IncenseRecord[]>(this.getMockData());
  
  displayDialog = signal(false);
  isEdit = signal(false);
  selectedRecord = signal<IncenseRecord | null>(null);
  
  formData = {
    id: '',
    incenseId: '',
    incenseName: '',
    ritualName: '',
    ritualType: '',
    experience: '',
    temperature: 25,
    humidity: 50,
    startTime: new Date(),
    endTime: new Date(),
    duration: 0,
    rating: 3,
    notes: ''
  };

  ritualTypes = [
    { label: '空薰', value: '空薰' },
    { label: '隔火薰香', value: '隔火薰香' },
    { label: '品香会', value: '品香会' },
    { label: '禅修品香', value: '禅修品香' },
    { label: '茶道品香', value: '茶道品香' },
    { label: '其他', value: '其他' }
  ];

  incenses = [
    { label: '奇楠沉香', value: '奇楠沉香' },
    { label: '印度老山檀', value: '印度老山檀' },
    { label: '海南沉香', value: '海南沉香' },
    { label: '其他', value: '其他' }
  ];

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  getMockData(): IncenseRecord[] {
    const now = new Date();
    return [
      {
        id: '1',
        incenseId: '1',
        incenseName: '奇楠沉香',
        ritualName: '春日品香会',
        ritualType: '品香会',
        experience: '初闻清雅，中段醇厚，尾韵悠长。花香与果香交织，令人心旷神怡。',
        temperature: 24,
        humidity: 55,
        startTime: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2, 14, 30),
        endTime: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2, 16, 0),
        duration: 90,
        rating: 5,
        notes: '今日天气晴朗，心情愉悦，品香效果极佳。',
        createdAt: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2)
      },
      {
        id: '2',
        incenseId: '2',
        incenseName: '印度老山檀',
        ritualName: '晨间禅修',
        ritualType: '禅修品香',
        experience: '奶香浓郁，温润醇厚，气息沉稳，有助于静心冥想。',
        temperature: 22,
        humidity: 60,
        startTime: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5, 6, 0),
        endTime: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5, 7, 30),
        duration: 90,
        rating: 4,
        notes: '晨间空气清新，檀香气息更显纯净。',
        createdAt: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5)
      }
    ];
  }

  showAddDialog() {
    this.isEdit.set(false);
    const now = new Date();
    this.formData = {
      id: '',
      incenseId: '',
      incenseName: '',
      ritualName: '',
      ritualType: '',
      experience: '',
      temperature: 25,
      humidity: 50,
      startTime: now,
      endTime: new Date(now.getTime() + 60 * 60 * 1000),
      duration: 60,
      rating: 3,
      notes: ''
    };
    this.displayDialog.set(true);
  }

  showEditDialog(record: IncenseRecord) {
    this.isEdit.set(true);
    this.selectedRecord.set(record);
    this.formData = {
      id: record.id,
      incenseId: record.incenseId,
      incenseName: record.incenseName,
      ritualName: record.ritualName,
      ritualType: record.ritualType,
      experience: record.experience,
      temperature: record.temperature,
      humidity: record.humidity,
      startTime: record.startTime,
      endTime: record.endTime,
      duration: record.duration,
      rating: record.rating,
      notes: record.notes
    };
    this.displayDialog.set(true);
  }

  hideDialog() {
    this.displayDialog.set(false);
    this.selectedRecord.set(null);
  }

  calculateDuration() {
    if (this.formData.startTime && this.formData.endTime) {
      const diff = this.formData.endTime.getTime() - this.formData.startTime.getTime();
      this.formData.duration = Math.round(diff / (1000 * 60));
    }
  }

  saveRecord() {
    if (!this.formData.ritualName || !this.formData.ritualType) {
      this.messageService.add({ 
        severity: 'error', 
        summary: '错误', 
        detail: '请填写必填项' 
      });
      return;
    }

    this.calculateDuration();

    if (this.isEdit()) {
      const updatedRecords = this.records().map(r => {
        if (r.id === this.formData.id) {
          return {
            ...r,
            ...this.formData
          };
        }
        return r;
      });
      this.records.set(updatedRecords);
      this.messageService.add({ 
        severity: 'success', 
        summary: '成功', 
        detail: '品香记录已更新' 
      });
    } else {
      const newRecord: IncenseRecord = {
        ...this.formData,
        id: Date.now().toString(),
        createdAt: new Date()
      };
      this.records.set([newRecord, ...this.records()]);
      this.messageService.add({ 
        severity: 'success', 
        summary: '成功', 
        detail: '品香记录已添加' 
      });
    }

    this.hideDialog();
  }

  deleteRecord(record: IncenseRecord) {
    this.confirmationService.confirm({
      message: `确定要删除品香记录「${record.ritualName}」吗？`,
      header: '确认删除',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        const filteredRecords = this.records().filter(r => r.id !== record.id);
        this.records.set(filteredRecords);
        this.messageService.add({ 
          severity: 'success', 
          summary: '成功', 
          detail: '品香记录已删除' 
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

  getRatingStars(rating: number): string {
    return '⭐'.repeat(rating);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
