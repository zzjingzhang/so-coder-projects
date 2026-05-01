import { Component } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  leftDrawerOpen = true;
  rightDrawerOpen = true;
  isLeftSidebarCollapsed = false;

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  toggleLeftSidebar(): void {
    this.leftDrawerOpen = !this.leftDrawerOpen;
  }

  toggleRightSidebar(): void {
    this.rightDrawerOpen = !this.rightDrawerOpen;
  }

  onLeftSidebarCollapsed(isCollapsed: boolean): void {
    this.isLeftSidebarCollapsed = isCollapsed;
  }

  onRouterActivate(component: any): void {
    if (component.toggleLeftSidebar) {
      component.toggleLeftSidebar.subscribe(() => this.toggleLeftSidebar());
    }
    if (component.toggleRightSidebar) {
      component.toggleRightSidebar.subscribe(() => this.toggleRightSidebar());
    }
  }

  getLeftDrawerWidth(): string {
    if (!this.leftDrawerOpen) return '0px';
    return this.isLeftSidebarCollapsed ? '72px' : '256px';
  }
}
