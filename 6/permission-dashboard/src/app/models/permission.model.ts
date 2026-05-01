export interface Permission {
  id: string;
  name: string;
  code: string;
  description?: string;
  type: 'menu' | 'button' | 'api';
  parentId?: string;
  children?: Permission[];
  icon?: string;
  route?: string;
  apiUrl?: string;
  order?: number;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export interface PermissionTreeNode {
  id: string;
  name: string;
  code: string;
  description?: string;
  type: 'menu' | 'button' | 'api';
  parentId?: string;
  children?: PermissionTreeNode[];
  icon?: string;
  route?: string;
  apiUrl?: string;
  order?: number;
  status: 'active' | 'inactive';
  isExpanded?: boolean;
  isSelected?: boolean;
  isIndeterminate?: boolean;
}
