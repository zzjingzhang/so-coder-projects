import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private roles: Role[] = [
    {
      id: '1',
      name: '超级管理员',
      code: 'super_admin',
      description: '拥有系统所有权限',
      permissionIds: ['1', '1-1', '1-1-1', '1-1-2', '1-1-3', '1-1-4', '1-2', '1-2-1', '1-2-2', '1-2-3', '1-2-4', '1-3', '2', '2-1', '2-1-1', '2-1-2', '2-2', '3', '3-1', '3-2'],
      status: 'active',
      isSystem: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: '2',
      name: '系统管理员',
      code: 'system_admin',
      description: '拥有系统管理权限',
      permissionIds: ['1', '1-1', '1-1-1', '1-1-2', '1-1-3', '1-2', '1-2-1', '1-2-2', '1-2-3', '1-3'],
      status: 'active',
      isSystem: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: '3',
      name: '业务经理',
      code: 'business_manager',
      description: '拥有业务管理权限',
      permissionIds: ['2', '2-1', '2-1-1', '2-1-2', '2-2'],
      status: 'active',
      isSystem: false,
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-10')
    },
    {
      id: '4',
      name: '财务人员',
      code: 'finance_staff',
      description: '拥有财务报表权限',
      permissionIds: ['3', '3-1', '3-2'],
      status: 'active',
      isSystem: false,
      createdAt: new Date('2024-02-15'),
      updatedAt: new Date('2024-02-20')
    },
    {
      id: '5',
      name: '普通用户',
      code: 'ordinary_user',
      description: '仅拥有查看权限',
      permissionIds: ['1-1-1', '1-2-1', '2-1-1', '2-1-2', '3-1'],
      status: 'inactive',
      isSystem: false,
      createdAt: new Date('2024-03-01'),
      updatedAt: new Date('2024-03-05')
    }
  ];

  constructor() { }

  getRoles(): Observable<Role[]> {
    return of(this.roles);
  }

  getRoleById(id: string): Observable<Role | undefined> {
    const role = this.roles.find(r => r.id === id);
    return of(role);
  }

  createRole(role: Omit<Role, 'id' | 'createdAt' | 'updatedAt'>): Observable<Role> {
    const newRole: Role = {
      ...role,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.roles.push(newRole);
    return of(newRole);
  }

  updateRole(id: string, updates: Partial<Role>): Observable<Role | undefined> {
    const index = this.roles.findIndex(r => r.id === id);
    if (index !== -1) {
      this.roles[index] = {
        ...this.roles[index],
        ...updates,
        updatedAt: new Date()
      };
      return of(this.roles[index]);
    }
    return of(undefined);
  }

  deleteRole(id: string): Observable<boolean> {
    const index = this.roles.findIndex(r => r.id === id);
    if (index !== -1) {
      this.roles.splice(index, 1);
      return of(true);
    }
    return of(false);
  }

  searchRoles(keyword: string): Observable<Role[]> {
    if (!keyword.trim()) {
      return of(this.roles);
    }
    const lowerKeyword = keyword.toLowerCase();
    const filtered = this.roles.filter(
      r => r.name.toLowerCase().includes(lowerKeyword) ||
           r.code.toLowerCase().includes(lowerKeyword) ||
           (r.description && r.description.toLowerCase().includes(lowerKeyword))
    );
    return of(filtered);
  }
}
