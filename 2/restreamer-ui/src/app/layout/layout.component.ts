import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { AuthService } from '../core/services/auth.service';
import { User } from '../core/models/user.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  standalone: false
})
export class LayoutComponent implements OnInit, OnDestroy {
  sidebarOpen: boolean = true;
  currentRoute: string = '';
  currentUser: User | null = null;
  isLoggedIn: boolean = false;
  isSmallScreen: boolean = false;

  private routerSubscription?: Subscription;
  private authSubscription?: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.urlAfterRedirects;
    });

    this.authSubscription = this.authService.authState$.subscribe(state => {
      this.isLoggedIn = state.isAuthenticated;
      this.currentUser = state.user;
    });

    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
    this.authSubscription?.unsubscribe();
  }

  private checkScreenSize(): void {
    this.isSmallScreen = window.innerWidth < 1024;
    if (this.isSmallScreen) {
      this.sidebarOpen = false;
    } else {
      this.sidebarOpen = true;
    }
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
  }

  logout(): void {
    this.authService.logout();
  }

  onLanguageChange(lang: string): void {
    console.log('Language changed to:', lang);
  }

  get displayName(): string {
    if (!this.currentUser) return '';
    return this.currentUser.displayName || this.currentUser.username;
  }

  get showSidebar(): boolean {
    return this.sidebarOpen && !this.isSmallScreen;
  }
}
