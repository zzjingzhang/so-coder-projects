import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  routerLink?: string;
  children?: MenuItem[];
  expanded?: boolean;
}

export interface TabItem {
  id: string;
  label: string;
  routerLink: string;
}

export interface LayoutState {
  menus: MenuItem[];
  tabs: TabItem[];
  currentPath: string;
  isDarkTheme: boolean;
  sidebarCollapsed: boolean;
}

@Injectable({ providedIn: 'root' })
export class LayoutService {
  private stateSubject = new BehaviorSubject<LayoutState>({
    menus: [
      {
        id: 'dashboard',
        label: '首页',
        icon: 'pi-home',
        routerLink: '/dashboard'
      },
      {
        id: 'products',
        label: '商品管理',
        icon: 'pi-box',
        children: [
          { id: 'product-list', label: '商品列表', icon: 'pi-list', routerLink: '/products' },
          { id: 'product-add', label: '添加商品', icon: 'pi-plus', routerLink: '/products/add' }
        ],
        expanded: false
      },
      {
        id: 'orders',
        label: '订单管理',
        icon: 'pi-shopping-cart',
        children: [
          { id: 'order-list', label: '订单列表', icon: 'pi-list', routerLink: '/orders' },
          { id: 'order-statistics', label: '订单统计', icon: 'pi-chart-bar', routerLink: '/orders/statistics' }
        ],
        expanded: false
      },
      {
        id: 'users',
        label: '用户管理',
        icon: 'pi-users',
        routerLink: '/users'
      }
    ],
    tabs: [],
    currentPath: '',
    isDarkTheme: false,
    sidebarCollapsed: false
  });

  state$: Observable<LayoutState> = this.stateSubject.asObservable();

  getState(): LayoutState {
    return this.stateSubject.value;
  }

  updateCurrentPath(path: string): void {
    const state = this.stateSubject.value;
    state.currentPath = path;
    this.stateSubject.next({ ...state });
  }

  addTab(tab: TabItem): void {
    const state = this.stateSubject.value;
    if (!state.tabs.find(t => t.id === tab.id)) {
      state.tabs.push(tab);
    }
    this.stateSubject.next({ ...state });
  }

  removeTab(tabId: string): void {
    const state = this.stateSubject.value;
    state.tabs = state.tabs.filter(t => t.id !== tabId);
    this.stateSubject.next({ ...state });
  }

  clearAllTabs(): void {
    const state = this.stateSubject.value;
    state.tabs = [];
    this.stateSubject.next({ ...state });
  }

  toggleTheme(): void {
    const state = this.stateSubject.value;
    state.isDarkTheme = !state.isDarkTheme;
    this.stateSubject.next({ ...state });
  }

  setTheme(isDark: boolean): void {
    const state = this.stateSubject.value;
    state.isDarkTheme = isDark;
    this.stateSubject.next({ ...state });
  }

  toggleSidebar(): void {
    const state = this.stateSubject.value;
    state.sidebarCollapsed = !state.sidebarCollapsed;
    this.stateSubject.next({ ...state });
  }

  toggleMenuExpanded(menuId: string): void {
    const state = this.stateSubject.value;
    const menu = state.menus.find(m => m.id === menuId);
    if (menu) {
      menu.expanded = !menu.expanded;
    }
    this.stateSubject.next({ ...state });
  }
}
