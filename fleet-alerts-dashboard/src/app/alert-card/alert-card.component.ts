import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Alert, AlertType } from '../models/alert.model';

@Component({
  selector: 'app-alert-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-card.component.html',
  styleUrls: ['./alert-card.component.css']
})
export class AlertCardComponent implements OnInit {
  @Input() alert!: Alert;
  @Output() alertClick = new EventEmitter<Alert>();
  
  formattedTime: string = '';
  AlertType = AlertType;

  ngOnInit(): void {
    this.formatTime();
  }

  formatTime(): void {
    const now = new Date();
    const alertDate = new Date(this.alert.timestamp);
    
    const isToday = now.getFullYear() === alertDate.getFullYear() &&
                     now.getMonth() === alertDate.getMonth() &&
                     now.getDate() === alertDate.getDate();
    
    if (isToday) {
      const hours = alertDate.getHours().toString().padStart(2, '0');
      const minutes = alertDate.getMinutes().toString().padStart(2, '0');
      this.formattedTime = `${hours}:${minutes}`;
    } else {
      const month = (alertDate.getMonth() + 1).toString();
      const day = alertDate.getDate().toString();
      this.formattedTime = `${month}月${day}日`;
    }
  }

  onClick(): void {
    this.alertClick.emit(this.alert);
  }

  getCardClasses(): string {
    const classes: string[] = [
      'relative',
      'border-l-4',
      'rounded-lg',
      'shadow-sm',
      'cursor-pointer',
      'transition-all',
      'duration-200',
      'hover:shadow-md',
      'mb-3'
    ];

    if (this.alert.type === AlertType.CRITICAL) {
      classes.push('border-l-red-500');
    } else if (this.alert.type === AlertType.ATTENTION) {
      classes.push('border-l-amber-500');
    } else {
      classes.push('border-l-transparent');
    }

    if (!this.alert.isRead) {
      if (this.alert.type === AlertType.CRITICAL) {
        classes.push('bg-red-50');
      } else if (this.alert.type === AlertType.ATTENTION) {
        classes.push('bg-amber-50');
      } else {
        classes.push('bg-blue-50');
      }
    } else {
      classes.push('bg-white');
    }

    return classes.join(' ');
  }

  getDotClasses(): string {
    const classes: string[] = [
      'absolute',
      'top-4',
      'right-14',
      'w-2',
      'h-2',
      'rounded-full'
    ];

    if (this.alert.type === AlertType.CRITICAL) {
      classes.push('bg-red-500');
    } else if (this.alert.type === AlertType.ATTENTION) {
      classes.push('bg-amber-500');
    } else {
      classes.push('bg-slate-600');
    }

    return classes.join(' ');
  }

  getTitleClasses(): string {
    const classes: string[] = ['text-sm', 'leading-5', 'mb-1'];
    
    if (!this.alert.isRead) {
      classes.push('text-gray-900', 'font-semibold');
    } else {
      classes.push('text-gray-700', 'font-medium');
    }

    return classes.join(' ');
  }
}
