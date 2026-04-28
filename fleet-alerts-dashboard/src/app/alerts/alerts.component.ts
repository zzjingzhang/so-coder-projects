import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Alert, AlertType } from '../models/alert.model';
import { AlertService } from '../services/alert.service';
import { AlertCardComponent } from '../alert-card/alert-card.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [CommonModule, AlertCardComponent, NavbarComponent],
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit, OnDestroy {
  alerts: Alert[] = [];
  filteredAlerts: Alert[] = [];
  activeTab: string = 'all';
  criticalCount: number = 0;
  attentionCount: number = 0;
  unreadCount: number = 0;
  
  private subscription?: Subscription;

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.loadAlerts();
    
    this.subscription = this.alertService.getAlertsObservable().subscribe(() => {
      this.loadAlerts();
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  loadAlerts(): void {
    this.alerts = this.alertService.getAlerts();
    this.updateCounts();
    this.filterAlerts();
  }

  updateCounts(): void {
    this.criticalCount = this.alerts.filter(a => a.type === AlertType.CRITICAL).length;
    this.attentionCount = this.alerts.filter(a => a.type === AlertType.ATTENTION).length;
    this.unreadCount = this.alerts.filter(a => !a.isRead).length;
  }

  filterAlerts(): void {
    if (this.activeTab === 'critical') {
      this.filteredAlerts = this.alerts.filter(a => a.type === AlertType.CRITICAL);
    } else if (this.activeTab === 'attention') {
      this.filteredAlerts = this.alerts.filter(a => a.type === AlertType.ATTENTION);
    } else {
      this.filteredAlerts = this.alerts;
    }
  }

  switchTab(tab: string): void {
    this.activeTab = tab;
    this.filterAlerts();
  }

  markAllAsRead(): void {
    this.alertService.markAllAsRead();
  }

  onAlertClick(alert: Alert): void {
    this.alertService.markAsRead(alert.id);
  }

  onNotificationsClick(): void {
    // 导航栏组件现在处理下拉面板
  }
}
