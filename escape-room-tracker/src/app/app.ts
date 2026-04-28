import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzButtonModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  isCollapsed = false;

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    console.log('toggleCollapse called, isCollapsed:', this.isCollapsed);
  }
}
