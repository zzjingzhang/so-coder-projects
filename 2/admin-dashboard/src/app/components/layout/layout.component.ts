import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { LayoutService, MenuItem, TabItem } from '../../services/layout.service';
import { AuthService } from '../../services/auth.service';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarModule, MenuModule, ButtonModule, AvatarModule, ToastModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit, OnDestroy {
  menus: MenuItem[] = [];
  tabs: TabItem[] = [];
  currentPath = '';
  isDarkTheme = false;
  sidebarCollapsed = false;
  username = '';
  
  private subscription: Subscription = new Subscription();

  constructor(
    private layoutService: LayoutService,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.username = this.authService.getUsername();
  }

  ngOnInit(): void {
    this.subscription.add(
      this.layoutService.state$.subscribe(state => {
        this.menus = state.menus;
        this.tabs = state.tabs;
        this.currentPath = state.currentPath;
        this.isDarkTheme = state.isDarkTheme;
        this.sidebarCollapsed = state.sidebarCollapsed;
        
        if (this.isDarkTheme) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      })
    );

    this.subscription.add(
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.handleRouteChange(event.urlAfterRedirects);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleRouteChange(url: string): void {
    this.layoutService.updateCurrentPath(url);
    
    const menu = this.findMenuByRoute(url);
    if (menu) {
      const tab: TabItem = {
        id: menu.id,
        label: menu.label,
        routerLink: menu.routerLink || url
      };
      this.layoutService.addTab(tab);
    }
  }

  findMenuByRoute(url: string): MenuItem | undefined {
    for (const menu of this.menus) {
      if (menu.routerLink === url) {
        return menu;
      }
      if (menu.children) {
        const found = menu.children.find(child => child.routerLink === url);
        if (found) {
          return found;
        }
      }
    }
    return undefined;
  }

  toggleSidebar(): void {
    this.layoutService.toggleSidebar();
  }

  toggleTheme(): void {
    this.layoutService.toggleTheme();
  }

  toggleMenuExpanded(menuId: string): void {
    this.layoutService.toggleMenuExpanded(menuId);
  }

  closeTab(tabId: string, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    
    if (this.tabs.length <= 1) {
      return;
    }
    
    const tabIndex = this.tabs.findIndex(t => t.id === tabId);
    this.layoutService.removeTab(tabId);
    
    if (this.currentPath === this.tabs[tabIndex]?.routerLink) {
      const newTab = this.tabs[tabIndex - 1] || this.tabs[0];
      this.router.navigate([newTab.routerLink]);
    }
  }

  logout(): void {
    this.authService.logout();
    this.layoutService.clearAllTabs();
    this.router.navigate(['/login']);
    this.messageService.add({ severity: 'info', summary: '退出成功', detail: '已安全退出系统' });
  }

  goToMessages(): void {
    this.messageService.add({ severity: 'info', summary: '消息', detail: '暂无新消息' });
  }

  goToSettings(): void {
    this.messageService.add({ severity: 'info', summary: '设置', detail: '设置功能开发中' });
  }
}
