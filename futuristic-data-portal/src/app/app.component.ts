import { Component, HostListener, OnInit, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastModule, CommonModule, SidebarComponent, HeaderComponent],
  providers: [MessageService],
  template: `
    <!-- Loading Spinner -->
    <div *ngIf="isLoading" class="fixed inset-0 bg-cyber-900 z-50 flex items-center justify-center">
      <div class="relative">
        <div class="w-16 h-16 border-4 border-cyber-700 border-t-neon-blue rounded-full animate-spin"></div>
        <div class="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-neon-purple rounded-full animate-spin" style="animation-direction: reverse; animation-duration: 1.5s;"></div>
      </div>
    </div>

    <!-- Main Layout -->
    <div class="min-h-screen bg-cyber-900 cyber-grid circuit-bg">
      <!-- Background Effects -->
      <div class="fixed inset-0 pointer-events-none overflow-hidden">
        <div class="absolute top-0 left-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl"></div>
      </div>

      <!-- Sidebar -->
      <app-sidebar 
        [sidebarOpen]="sidebarOpen" 
        (sidebarToggle)="toggleSidebar()"
      ></app-sidebar>

      <!-- Main Content Area -->
      <div class="transition-all duration-300" [class.ml-64]="sidebarOpen" [class.ml-0]="!sidebarOpen">
        <!-- Header -->
        <app-header 
          (menuToggle)="toggleSidebar()"
          [sidebarOpen]="sidebarOpen"
        ></app-header>

        <!-- Page Content -->
        <main class="p-6">
          <router-outlet></router-outlet>
        </main>
      </div>

      <!-- Toast Container -->
      <p-toast position="top-right"></p-toast>
    </div>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  private router = inject(Router);
  
  isLoading = true;
  sidebarOpen = true;

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        if (window.innerWidth < 1024) {
          this.sidebarOpen = false;
        }
      });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    if (window.innerWidth < 1024) {
      this.sidebarOpen = false;
    } else {
      this.sidebarOpen = true;
    }
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
