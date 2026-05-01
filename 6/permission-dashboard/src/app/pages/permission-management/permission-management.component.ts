import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { RoleService } from '../../services/role.service';
import { PermissionService } from '../../services/permission.service';
import { ExportService } from '../../services/export.service';
import { Role } from '../../models/role.model';
import { Permission } from '../../models/permission.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-permission-management',
  templateUrl: './permission-management.component.html',
  styleUrls: ['./permission-management.component.css'],
  standalone: false
})
export class PermissionManagementComponent implements OnInit {
  roles: Role[] = [];
  filteredRoles: Role[] = [];
  permissions: Permission[] = [];
  selectedRole: Role | null = null;
  selectedPermissionIds: string[] = [];
  isLoading: boolean = false;

  searchControl = new FormControl('');
  permissionSearchControl = new FormControl('');
  permissionFilterKeyword: string = '';

  displayedColumns: string[] = ['name', 'code', 'description', 'permissionCount', 'status', 'isSystem', 'actions'];

  constructor(
    private roleService: RoleService,
    private permissionService: PermissionService,
    private exportService: ExportService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadData();
    this.setupSearch();
  }

  private loadData(): void {
    this.isLoading = true;
    
    this.roleService.getRoles().subscribe(roles => {
      this.roles = roles;
      this.filteredRoles = roles;
      this.isLoading = false;
    });

    this.permissionService.getPermissions().subscribe(permissions => {
      this.permissions = permissions;
    });
  }

  private setupSearch(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(keyword => {
      this.searchRoles(keyword || '');
    });

    this.permissionSearchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(keyword => {
      this.permissionFilterKeyword = keyword || '';
    });
  }

  searchRoles(keyword: string): void {
    if (!keyword.trim()) {
      this.filteredRoles = [...this.roles];
      return;
    }

    this.roleService.searchRoles(keyword).subscribe(roles => {
      this.filteredRoles = roles;
    });
  }

  selectRole(role: Role): void {
    this.selectedRole = role;
    this.selectedPermissionIds = [...role.permissionIds];
  }

  onPermissionSelectionChange(permissionIds: string[]): void {
    this.selectedPermissionIds = permissionIds;
  }

  saveRolePermissions(): void {
    if (!this.selectedRole) return;

    this.isLoading = true;
    this.roleService.updateRole(this.selectedRole.id, {
      permissionIds: this.selectedPermissionIds
    }).subscribe(updatedRole => {
      if (updatedRole) {
        this.selectedRole = updatedRole;
        const index = this.roles.findIndex(r => r.id === updatedRole.id);
        if (index !== -1) {
          this.roles[index] = updatedRole;
          this.filteredRoles = [...this.roles];
        }
        this.showSnackBar('权限保存成功！', 'success');
      }
      this.isLoading = false;
    });
  }

  getStatusLabel(status: string): string {
    return status === 'active' ? '启用' : '禁用';
  }

  getStatusClass(status: string): string {
    return status === 'active' ? 'status-active' : 'status-inactive';
  }

  exportRoles(): void {
    this.exportService.exportRolesToCSV(this.filteredRoles);
    this.showSnackBar('角色列表导出成功！', 'success');
  }

  exportPermissions(): void {
    this.exportService.exportPermissionsToCSV(this.permissions);
    this.showSnackBar('权限列表导出成功！', 'success');
  }

  exportCurrentRolePermissions(): void {
    if (!this.selectedRole) {
      this.showSnackBar('请先选择一个角色', 'warning');
      return;
    }
    this.exportService.exportRolePermissions(this.selectedRole, this.permissions);
    this.showSnackBar('角色权限配置导出成功！', 'success');
  }

  private showSnackBar(message: string, type: 'success' | 'warning' | 'error'): void {
    const panelClass = type === 'success' ? 'snackbar-success' :
                       type === 'warning' ? 'snackbar-warning' :
                       'snackbar-error';
    
    this.snackBar.open(message, '关闭', {
      duration: 3000,
      panelClass: [panelClass]
    });
  }

  getTotalPermissions(): number {
    return this.permissions.length;
  }

  getSelectedPermissionsCount(): number {
    return this.selectedPermissionIds.length;
  }

  clearSelection(): void {
    this.selectedRole = null;
    this.selectedPermissionIds = [];
  }
}
