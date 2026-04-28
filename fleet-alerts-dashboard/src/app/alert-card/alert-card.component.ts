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

  getBorderColor(): string {
    if (this.alert.type === AlertType.CRITICAL) {
      return '#D64545';
    } else if (this.alert.type === AlertType.ATTENTION) {
      return '#F2A93B';
    }
    return 'transparent';
  }

  getBackgroundColor(): string {
    if (!this.alert.isRead) {
      if (this.alert.type === AlertType.CRITICAL) {
        return '#FEF2F2';
      } else if (this.alert.type === AlertType.ATTENTION) {
        return '#FFFBEB';
      }
      return '#EFF6FF';
    }
    return '#FFFFFF';
  }

  getDotColor(): string {
    if (this.alert.type === AlertType.CRITICAL) {
      return '#D64545';
    } else if (this.alert.type === AlertType.ATTENTION) {
      return '#F2A93B';
    }
    return '#475569';
  }

  getTitleClass(): string {
    if (!this.alert.isRead) {
      return 'text-gray-900 font-semibold';
    }
    return 'text-gray-700 font-medium';
  }
}
