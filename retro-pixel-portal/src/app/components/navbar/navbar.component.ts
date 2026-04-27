import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isMenuOpen = false;
  visitorCount = 42069;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  navItems = [
    { path: '/home', label: '🏠 Home', icon: '🏠' },
    { path: '/about', label: '👋 About', icon: 'ℹ️' },
    { path: '/links', label: '🔗 Links', icon: '🔗' },
    { path: '/guestbook', label: '📝 Guestbook', icon: '📖' }
  ];
}
