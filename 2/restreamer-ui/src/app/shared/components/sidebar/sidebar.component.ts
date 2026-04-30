import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

interface NavItem {
  label: string;
  icon: string;
  route: string;
  badge?: number;
  badgeColor?: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: [],
  standalone: false
})
export class SidebarComponent {
  @Input() isOpen: boolean = false;
  @Input() currentRoute: string = '';
  
  @Output() closeSidebar = new EventEmitter<void>();
  @Output() navigateTo = new EventEmitter<string>();

  navItems: NavItem[] = [
    { label: 'nav.dashboard', icon: 'pi pi-home', route: '/dashboard' },
    { label: 'nav.channels', icon: 'pi pi-video', route: '/channels', badge: 3, badgeColor: 'blue' },
    { label: 'nav.system', icon: 'pi pi-server', route: '/system' },
    { label: 'nav.settings', icon: 'pi pi-cog', route: '/settings' },
    { label: 'nav.player', icon: 'pi pi-play', route: '/player' }
  ];

  constructor(private router: Router) {}

  onNavigate(route: string): void {
    this.navigateTo.emit(route);
    this.router.navigate([route]);
    if (window.innerWidth < 1024) {
      this.closeSidebar.emit();
    }
  }

  onClose(): void {
    this.closeSidebar.emit();
  }

  isActive(route: string): boolean {
    return this.currentRoute === route || this.currentRoute.startsWith(route + '/');
  }

  getBadgeClass(color?: string): string {
    switch (color) {
      case 'green':
        return 'bg-green-100 text-green-800';
      case 'red':
        return 'bg-red-100 text-red-800';
      case 'yellow':
        return 'bg-yellow-100 text-yellow-800';
      case 'purple':
        return 'bg-purple-100 text-purple-800';
      case 'blue':
      default:
        return 'bg-blue-100 text-blue-800';
    }
  }
}
