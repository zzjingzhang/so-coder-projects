import { Component, OnInit } from '@angular/core';
import { PermissionService } from '../../services/permission.service';
import { PermissionTreeNode } from '../../models/permission.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: false
})
export class SidebarComponent implements OnInit {
  menuItems: PermissionTreeNode[] = [];
  activeMenuId: string | null = null;

  constructor(private permissionService: PermissionService) { }

  ngOnInit(): void {
    this.loadMenuItems();
  }

  loadMenuItems(): void {
    this.permissionService.getPermissionTree().subscribe(tree => {
      this.menuItems = tree.filter(item => item.type === 'menu');
    });
  }

  toggleExpand(item: PermissionTreeNode): void {
    item.isExpanded = !item.isExpanded;
  }

  selectMenu(item: PermissionTreeNode): void {
    if (item.type === 'menu' && !item.children) {
      this.activeMenuId = item.id;
    }
  }

  hasChildren(item: PermissionTreeNode): boolean {
    return !!(item.children && item.children.length > 0);
  }

  getMenuTypeIcon(type: string): string {
    const iconMap: Record<string, string> = {
      'menu': 'folder',
      'button': 'smart_button',
      'api': 'api'
    };
    return iconMap[type] || 'circle';
  }
}
