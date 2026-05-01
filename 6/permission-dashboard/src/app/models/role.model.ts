export interface Role {
  id: string;
  name: string;
  code: string;
  description?: string;
  permissionIds: string[];
  status: 'active' | 'inactive';
  isSystem: boolean;
  createdAt: Date;
  updatedAt: Date;
}
