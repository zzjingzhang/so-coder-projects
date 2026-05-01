import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Permission, PermissionTreeNode } from '../models/permission.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private permissions: Permission[] = [
    {
      id: '1',
      name: '系统管理',
      code: 'system:manage',
      description: '系统管理菜单',
      type: 'menu',
      icon: 'settings',
      order: 1,
      status: 'active',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: '1-1',
      name: '用户管理',
      code: 'system:user:manage',
      description: '用户管理菜单',
      type: 'menu',
      parentId: '1',
      icon: 'person',
      route: '/system/user',
      order: 1,
      status: 'active',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: '1-1-1',
      name: '查看用户',
      code: 'system:user:view',
      description: '查看用户列表',
      type: 'button',
      parentId: '1-1',
      status: 'active',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: '1-1-2',
      name: '新增用户',
      code: 'system:user:create',
      description: '新增用户',
      type: 'button',
      parentId: '1-1',
      status: 'active',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: '1-1-3',
      name: '编辑用户',
      code: 'system:user:edit',
      description: '编辑用户',
      type: 'button',
      parentId: '1-1',
      status: 'active',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: '1-1-4',
      name: '删除用户',
      code: 'system:user:delete',
      description: '删除用户',
      type: 'button',
      parentId: '1-1',
      status: 'active',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: '1-2',
      name: '角色管理',
      code: 'system:role:manage',
      description: '角色管理菜单',
      type: 'menu',
      parentId: '1',
      icon: 'people',
      route: '/system/role',
      order: 2,
      status: 'active',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: '1-2-1',
      name: '查看角色',
      code: 'system:role:view',
      description: '查看角色列表',
      type: 'button',
      parentId: '1-2',
      status: 'active',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: '1-2-2',
      name: '新增角色',
      code: 'system:role:create',
      description: '新增角色',
      type: 'button',
      parentId: '1-2',
      status: 'active',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: '1-2-3',
      name: '编辑角色',
      code: 'system:role:edit',
      description: '编辑角色',
      type: 'button',
      parentId: '1-2',
      status: 'active',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: '1-2-4',
      name: '删除角色',
      code: 'system:role:delete',
      description: '删除角色',
      type: 'button',
      parentId: '1-2',
      status: 'active',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: '1-3',
      name: '权限管理',
      code: 'system:permission:manage',
      description: '权限管理菜单',
      type: 'menu',
      parentId: '1',
      icon: 'lock',
      route: '/system/permission',
      order: 3,
      status: 'active',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: '2',
      name: '业务管理',
      code: 'business:manage',
      description: '业务管理菜单',
      type: 'menu',
      icon: 'business',
      order: 2,
      status: 'active',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: '2-1',
      name: '订单管理',
      code: 'business:order:manage',
      description: '订单管理菜单',
      type: 'menu',
      parentId: '2',
      icon: 'shopping_cart',
      route: '/business/order',
      order: 1,
      status: 'active',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: '2-1-1',
      name: '查看订单',
      code: 'business:order:view',
      description: '查看订单列表',
      type: 'button',
      parentId: '2-1',
      status: 'active',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: '2-1-2',
      name: '订单详情',
      code: 'business:order:detail',
      description: '查看订单详情',
      type: 'button',
      parentId: '2-1',
      status: 'active',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: '2-2',
      name: '客户管理',
      code: 'business:customer:manage',
      description: '客户管理菜单',
      type: 'menu',
      parentId: '2',
      icon: 'contact_mail',
      route: '/business/customer',
      order: 2,
      status: 'active',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: '3',
      name: '报表中心',
      code: 'report:manage',
      description: '报表中心菜单',
      type: 'menu',
      icon: 'bar_chart',
      order: 3,
      status: 'active',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: '3-1',
      name: '销售报表',
      code: 'report:sales:view',
      description: '销售报表',
      type: 'menu',
      parentId: '3',
      icon: 'trending_up',
      route: '/report/sales',
      order: 1,
      status: 'active',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: '3-2',
      name: '财务报表',
      code: 'report:finance:view',
      description: '财务报表',
      type: 'menu',
      parentId: '3',
      icon: 'attach_money',
      route: '/report/finance',
      order: 2,
      status: 'active',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    }
  ];

  constructor() { }

  getPermissions(): Observable<Permission[]> {
    return of(this.permissions);
  }

  getPermissionTree(): Observable<PermissionTreeNode[]> {
    const tree = this.buildTree(this.permissions);
    return of(tree);
  }

  private buildTree(permissions: Permission[]): PermissionTreeNode[] {
    const map = new Map<string, PermissionTreeNode>();
    const roots: PermissionTreeNode[] = [];

    permissions.forEach(perm => {
      const node: PermissionTreeNode = {
        ...perm,
        isExpanded: true,
        isSelected: false,
        isIndeterminate: false
      };
      map.set(node.id, node);
    });

    permissions.forEach(perm => {
      const node = map.get(perm.id)!;
      if (perm.parentId && map.has(perm.parentId)) {
        const parent = map.get(perm.parentId)!;
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(node);
      } else {
        roots.push(node);
      }
    });

    this.sortTree(roots);
    return roots;
  }

  private sortTree(nodes: PermissionTreeNode[]): void {
    nodes.sort((a, b) => (a.order || 0) - (b.order || 0));
    nodes.forEach(node => {
      if (node.children) {
        this.sortTree(node.children);
      }
    });
  }

  searchPermissions(keyword: string): Observable<Permission[]> {
    if (!keyword.trim()) {
      return of(this.permissions);
    }
    const lowerKeyword = keyword.toLowerCase();
    const filtered = this.permissions.filter(
      p => p.name.toLowerCase().includes(lowerKeyword) ||
           p.code.toLowerCase().includes(lowerKeyword) ||
           (p.description && p.description.toLowerCase().includes(lowerKeyword))
    );
    return of(filtered);
  }

  getPermissionsByIds(ids: string[]): Observable<Permission[]> {
    const result = this.permissions.filter(p => ids.includes(p.id));
    return of(result);
  }

  getDescendantIds(nodeId: string): string[] {
    const ids: string[] = [];
    const node = this.permissions.find(p => p.id === nodeId);
    if (!node) return ids;

    const collectChildren = (parentId: string) => {
      const children = this.permissions.filter(p => p.parentId === parentId);
      children.forEach(child => {
        ids.push(child.id);
        collectChildren(child.id);
      });
    };

    collectChildren(nodeId);
    return ids;
  }

  getAncestorIds(nodeId: string): string[] {
    const ids: string[] = [];
    let currentId = nodeId;

    while (currentId) {
      const node = this.permissions.find(p => p.id === currentId);
      if (node && node.parentId) {
        ids.push(node.parentId);
        currentId = node.parentId;
      } else {
        break;
      }
    }

    return ids;
  }
}
