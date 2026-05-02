import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'TaskFlow';
  isCollapsed = false;
  selectedMenu = 'dashboard';

  menus = [
    {
      key: 'dashboard',
      label: '仪表盘',
      icon: 'dashboard',
      path: '/dashboard'
    },
    {
      key: 'projects',
      label: '项目管理',
      icon: 'folder',
      path: '/projects'
    },
    {
      key: 'members',
      label: '成员管理',
      icon: 'team',
      path: '/members'
    }
  ];

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
