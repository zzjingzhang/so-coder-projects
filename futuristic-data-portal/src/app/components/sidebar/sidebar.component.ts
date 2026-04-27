import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

interface NavItem {
  label: string;
  icon: string;
  route: string;
  badge?: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside 
      class="fixed top-0 left-0 h-full z-40 transition-all duration-300"
      [class.w-64]="sidebarOpen"
      [class.w-0]="!sidebarOpen"
    >
      <div 
        class="h-full glass-panel border-r border-cyber-700 overflow-hidden"
        [class.opacity-100]="sidebarOpen"
        [class.opacity-0]="!sidebarOpen"
      >
        <!-- Logo -->
        <div class="p-6 border-b border-cyber-700">
          <div class="flex items-center gap-3">
            <div class="relative">
              <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center pulse-glow">
                <i class="pi pi-chart-line text-white text-xl"></i>
              </div>
              <div class="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-cyber-900 status-dot online"></div>
            </div>
            <div>
              <h1 class="text-lg font-bold text-white neon-text">DataPortal</h1>
              <span class="text-xs text-cyber-400">v2.0.1</span>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="p-4">
          <p class="text-xs font-semibold text-cyber-500 uppercase tracking-wider mb-3 px-3">Main Menu</p>
          <ul class="space-y-1">
            @for (item of navItems; track item.route) {
              <li>
                <a 
                  [routerLink]="item.route"
                  routerLinkActive="bg-cyber-800 border-l-2 border-neon-blue text-neon-blue"
                  class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-cyber-300 hover:bg-cyber-800/50 hover:text-white transition-all duration-200 group"
                >
                  <i class="pi {{ item.icon }} text-lg group-hover:scale-110 transition-transform"></i>
                  <span class="font-medium">{{ item.label }}</span>
                  @if (item.badge) {
                    <span class="ml-auto px-2 py-0.5 text-xs font-bold rounded-full bg-neon-blue/20 text-neon-blue">
                      {{ item.badge }}
                    </span>
                  }
                </a>
              </li>
            }
          </ul>

          <p class="text-xs font-semibold text-cyber-500 uppercase tracking-wider mb-3 px-3 mt-6">Analytics</p>
          <ul class="space-y-1">
            @for (item of analyticsItems; track item.route) {
              <li>
                <a 
                  [routerLink]="item.route"
                  routerLinkActive="bg-cyber-800 border-l-2 border-neon-blue text-neon-blue"
                  class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-cyber-300 hover:bg-cyber-800/50 hover:text-white transition-all duration-200 group"
                >
                  <i class="pi {{ item.icon }} text-lg group-hover:scale-110 transition-transform"></i>
                  <span class="font-medium">{{ item.label }}</span>
                  @if (item.badge) {
                    <span class="ml-auto px-2 py-0.5 text-xs font-bold rounded-full bg-neon-purple/20 text-neon-purple">
                      {{ item.badge }}
                    </span>
                  }
                </a>
              </li>
            }
          </ul>
        </nav>

        <!-- System Status -->
        <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-cyber-700">
          <div class="glass-panel rounded-lg p-4">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-8 h-8 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                <i class="pi pi-server text-white text-sm"></i>
              </div>
              <div>
                <p class="text-sm font-medium text-white">System Status</p>
                <p class="text-xs text-green-400 flex items-center gap-1">
                  <span class="w-1.5 h-1.5 bg-green-400 rounded-full status-dot online"></span>
                  All Systems Online
                </p>
              </div>
            </div>
            <div class="space-y-2">
              <div>
                <div class="flex justify-between text-xs mb-1">
                  <span class="text-cyber-400">CPU Usage</span>
                  <span class="text-neon-blue font-medium">47%</span>
                </div>
                <div class="h-1.5 bg-cyber-800 rounded-full overflow-hidden">
                  <div class="h-full progress-animated rounded-full" style="width: 47%"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-xs mb-1">
                  <span class="text-cyber-400">Memory</span>
                  <span class="text-neon-purple font-medium">62%</span>
                </div>
                <div class="h-1.5 bg-cyber-800 rounded-full overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-neon-purple to-neon-pink rounded-full" style="width: 62%"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  `,
  styles: []
})
export class SidebarComponent implements OnInit {
  @Input() sidebarOpen = true;
  @Output() sidebarToggle = new EventEmitter<void>();

  navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'pi-chart-line', route: '/dashboard' },
    { label: 'Analytics', icon: 'pi-chart-pie', route: '/analytics', badge: 'New' },
    { label: 'Real-time', icon: 'pi-bolt', route: '/realtime', badge: 'Live' },
  ];

  analyticsItems: NavItem[] = [
    { label: 'Reports', icon: 'pi-file-chart', route: '/reports' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
