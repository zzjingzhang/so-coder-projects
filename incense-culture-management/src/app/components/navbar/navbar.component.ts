import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, ButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  menuOpen = signal(false);

  toggleMenu() {
    this.menuOpen.set(!this.menuOpen());
  }

  navItems = [
    { path: '/home', label: '首页', icon: '🏠' },
    { path: '/incense-archive', label: '香品档案', icon: '🌿' },
    { path: '/incense-record', label: '品香记录', icon: '📖' },
  ];
}
