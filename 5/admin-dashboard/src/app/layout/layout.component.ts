import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: false,
})
export class LayoutComponent {
  isCollapsed = false;
  menuItems = [
    {
      icon: 'dashboard',
      title: 'Dashboard',
      path: '/',
    },
    {
      icon: 'team',
      title: 'Users',
      path: '/users',
    },
    {
      icon: 'form',
      title: 'Forms',
      path: '/forms',
    },
    {
      icon: 'setting',
      title: 'Settings',
      path: '/settings',
    },
  ];
}
