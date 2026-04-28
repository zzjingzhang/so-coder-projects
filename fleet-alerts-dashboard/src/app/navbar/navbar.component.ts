import { Component, Input, Output, EventEmitter, HostListener, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Alert, AlertType } from '../models/alert.model';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() unreadCount: number = 0;
  @Output() notificationsClick = new EventEmitter<void>();
  
  isDropdownOpen: boolean = false;
  recentAlerts: Alert[] = [];
  AlertType = AlertType;
  
  private subscription?: Subscription;

  constructor(
    private alertService: AlertService,
    private elementRef: ElementRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRecentAlerts();
    
    this.subscription = this.alertService.getAlertsObservable().subscribe(() => {
      this.loadRecentAlerts();
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  loadRecentAlerts(): void {
    const allAlerts = this.alertService.getAlerts();
    this.recentAlerts = allAlerts
      .filter(a => !a.isRead)
      .slice(0, 5);
    this.unreadCount = allAlerts.filter(a => !a.isRead).length;
  }

  onNotificationsClick(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
    if (this.isDropdownOpen) {
      this.loadRecentAlerts();
    }
    this.notificationsClick.emit();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }

  onAlertClick(alert: Alert): void {
    this.alertService.markAsRead(alert.id);
  }

  viewAllAlerts(): void {
    this.isDropdownOpen = false;
    this.router.navigate(['/alerts']);
  }

  getAlertTypeClass(type: AlertType): string {
    if (type === AlertType.CRITICAL) {
      return 'border-l-red-500 bg-red-50';
    } else if (type === AlertType.ATTENTION) {
      return 'border-l-amber-500 bg-amber-50';
    }
    return 'border-l-transparent bg-white';
  }

  getDotClass(type: AlertType): string {
    if (type === AlertType.CRITICAL) {
      return 'bg-red-500';
    } else if (type === AlertType.ATTENTION) {
      return 'bg-amber-500';
    }
    return 'bg-slate-600';
  }

  formatTime(timestamp: Date): string {
    const now = new Date();
    const alertDate = new Date(timestamp);
    
    const isToday = now.getFullYear() === alertDate.getFullYear() &&
                     now.getMonth() === alertDate.getMonth() &&
                     now.getDate() === alertDate.getDate();
    
    if (isToday) {
      const hours = alertDate.getHours().toString().padStart(2, '0');
      const minutes = alertDate.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    } else {
      const month = (alertDate.getMonth() + 1).toString();
      const day = alertDate.getDate().toString();
      return `${month}月${day}日`;
    }
  }
}
