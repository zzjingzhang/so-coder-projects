import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, InputTextModule, BadgeModule, AvatarModule, MenuModule, ButtonModule, FormsModule],
  template: `
    <header class="sticky top-0 z-30 glass-panel border-b border-cyber-700">
      <div class="flex items-center justify-between h-16 px-6">
        <!-- Left Section -->
        <div class="flex items-center gap-4">
          <button 
            (click)="onMenuToggle()"
            class="p-2 rounded-lg hover:bg-cyber-800 text-cyber-400 hover:text-white transition-colors"
          >
            <i class="pi pi-bars text-xl"></i>
          </button>

          <!-- Search -->
          <div class="relative hidden md:block">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-500">
              <i class="pi pi-search"></i>
            </span>
            <input 
              type="text" 
              pInputText 
              placeholder="Search data, reports..."
              [(ngModel)]="searchQuery"
              class="w-72 pl-10 bg-cyber-800/50 border-cyber-700 text-cyber-200 placeholder-cyber-500 focus:border-neon-blue focus:ring focus:ring-neon-blue/20"
            />
          </div>
        </div>

        <!-- Right Section -->
        <div class="flex items-center gap-3">
          <!-- Time Display -->
          <div class="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyber-800/50">
            <i class="pi pi-clock text-neon-blue"></i>
            <span class="text-sm font-mono text-cyber-300">{{ currentTime }}</span>
          </div>

          <!-- Notifications -->
          <button 
            pButton 
            icon="pi pi-bell" 
            class="relative p-2 rounded-lg bg-cyber-800/50 hover:bg-cyber-700 text-cyber-400 hover:text-white transition-colors"
          >
            <span class="absolute -top-1 -right-1 w-4 h-4 bg-neon-pink text-white text-xs flex items-center justify-center rounded-full">3</span>
          </button>

          <!-- Settings -->
          <button 
            pButton 
            icon="pi pi-cog" 
            class="p-2 rounded-lg bg-cyber-800/50 hover:bg-cyber-700 text-cyber-400 hover:text-white transition-colors"
          ></button>

          <!-- User Profile -->
          <div class="flex items-center gap-3 pl-3 border-l border-cyber-700">
            <div class="hidden md:block text-right">
              <p class="text-sm font-medium text-white">Admin User</p>
              <p class="text-xs text-cyber-400">Data Analyst</p>
            </div>
            <p-avatar 
              [style]="{'background': 'linear-gradient(135deg, #00f3ff, #bd00ff)'}" 
              label="AU" 
              shape="circle"
              class="ring-2 ring-cyber-700"
            ></p-avatar>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: []
})
export class HeaderComponent implements OnInit {
  @Input() sidebarOpen = true;
  @Output() menuToggle = new EventEmitter<void>();

  searchQuery = '';
  currentTime = '';

  constructor() {}

  ngOnInit(): void {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
  }

  onMenuToggle(): void {
    this.menuToggle.emit();
  }

  private updateTime(): void {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  }
}
