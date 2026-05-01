import { Injectable } from '@angular/core';
import { Role } from '../models/role.model';
import { Permission } from '../models/permission.model';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  exportToCSV(data: any[], filename: string, headers: { key: string; label: string }[]): void {
    if (!data || data.length === 0) {
      console.warn('No data to export');
      return;
    }

    const csvContent = this.convertToCSV(data, headers);
    this.downloadFile(csvContent, `${filename}.csv`, 'text/csv;charset=utf-8;');
  }

  exportToJSON(data: any[], filename: string): void {
    if (!data || data.length === 0) {
      console.warn('No data to export');
      return;
    }

    const jsonContent = JSON.stringify(data, null, 2);
    this.downloadFile(jsonContent, `${filename}.json`, 'application/json');
  }

  exportRolesToCSV(roles: Role[]): void {
    const headers = [
      { key: 'id', label: 'ID' },
      { key: 'name', label: '角色名称' },
      { key: 'code', label: '角色编码' },
      { key: 'description', label: '描述' },
      { key: 'permissionCount', label: '权限数量' },
      { key: 'status', label: '状态' },
      { key: 'isSystem', label: '是否系统角色' },
      { key: 'createdAt', label: '创建时间' }
    ];

    const formattedData = roles.map(role => ({
      id: role.id,
      name: role.name,
      code: role.code,
      description: role.description || '',
      permissionCount: role.permissionIds.length,
      status: role.status === 'active' ? '启用' : '禁用',
      isSystem: role.isSystem ? '是' : '否',
      createdAt: this.formatDate(role.createdAt)
    }));

    this.exportToCSV(formattedData, '角色列表', headers);
  }

  exportPermissionsToCSV(permissions: Permission[]): void {
    const headers = [
      { key: 'id', label: 'ID' },
      { key: 'name', label: '权限名称' },
      { key: 'code', label: '权限编码' },
      { key: 'type', label: '类型' },
      { key: 'parentId', label: '父级ID' },
      { key: 'icon', label: '图标' },
      { key: 'route', label: '路由' },
      { key: 'status', label: '状态' },
      { key: 'createdAt', label: '创建时间' }
    ];

    const formattedData = permissions.map(perm => ({
      id: perm.id,
      name: perm.name,
      code: perm.code,
      type: this.getPermissionTypeLabel(perm.type),
      parentId: perm.parentId || '-',
      icon: perm.icon || '-',
      route: perm.route || '-',
      status: perm.status === 'active' ? '启用' : '禁用',
      createdAt: this.formatDate(perm.createdAt)
    }));

    this.exportToCSV(formattedData, '权限列表', headers);
  }

  exportRolePermissions(role: Role, permissions: Permission[]): void {
    const rolePermissions = permissions.filter(p => role.permissionIds.includes(p.id));
    
    const headers = [
      { key: 'id', label: '权限ID' },
      { key: 'name', label: '权限名称' },
      { key: 'code', label: '权限编码' },
      { key: 'type', label: '类型' },
      { key: 'description', label: '描述' },
      { key: 'status', label: '状态' }
    ];

    const formattedData = rolePermissions.map(perm => ({
      id: perm.id,
      name: perm.name,
      code: perm.code,
      type: this.getPermissionTypeLabel(perm.type),
      description: perm.description || '-',
      status: perm.status === 'active' ? '启用' : '禁用'
    }));

    this.exportToCSV(formattedData, `${role.name}_权限配置`, headers);
  }

  private convertToCSV(data: any[], headers: { key: string; label: string }[]): string {
    const headerRow = headers.map(h => this.escapeCSV(h.label)).join(',');
    const dataRows = data.map(item => {
      return headers.map(header => {
        const value = item[header.key] !== undefined && item[header.key] !== null
          ? String(item[header.key])
          : '';
        return this.escapeCSV(value);
      }).join(',');
    });

    return [headerRow, ...dataRows].join('\n');
  }

  private escapeCSV(value: string): string {
    if (value.includes(',') || value.includes('"') || value.includes('\n')) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  }

  private downloadFile(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([this.addBOM(content)], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  private addBOM(content: string): string {
    return '\uFEFF' + content;
  }

  private formatDate(date: Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  private getPermissionTypeLabel(type: string): string {
    const typeMap: Record<string, string> = {
      'menu': '菜单',
      'button': '按钮',
      'api': '接口'
    };
    return typeMap[type] || type;
  }
}
