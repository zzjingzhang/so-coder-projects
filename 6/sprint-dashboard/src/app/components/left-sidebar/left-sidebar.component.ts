import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DashboardService, NavItem } from '../../services/dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css'],
  standalone: false
})
export class LeftSidebarComponent implements OnInit {
  navItems: NavItem[] = [];
  isCollapsed = false;
  activeRoute = '/dashboard';

  @Output() collapsed = new EventEmitter<boolean>();

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dashboardService.getNavItems().subscribe(items => {
      this.navItems = items;
    });
    this.activeRoute = this.router.url || '/dashboard';
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
    this.collapsed.emit(this.isCollapsed);
  }

  navigateTo(route: string): void {
    this.activeRoute = route;
    this.router.navigate([route]);
  }
}
