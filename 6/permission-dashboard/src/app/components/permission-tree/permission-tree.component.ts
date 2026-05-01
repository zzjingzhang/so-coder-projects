import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { PermissionService } from '../../services/permission.service';
import { PermissionTreeNode } from '../../models/permission.model';

@Component({
  selector: 'app-permission-tree',
  templateUrl: './permission-tree.component.html',
  styleUrls: ['./permission-tree.component.css'],
  standalone: false
})
export class PermissionTreeComponent implements OnInit, OnChanges {
  @Input() selectedPermissionIds: string[] = [];
  @Input() disabled: boolean = false;
  @Input() filterKeyword: string = '';
  
  @Output() selectionChange = new EventEmitter<string[]>();

  permissionTree: PermissionTreeNode[] = [];
  filteredTree: PermissionTreeNode[] = [];
  allPermissions: PermissionTreeNode[] = [];

  constructor(private permissionService: PermissionService) { }

  ngOnInit(): void {
    this.loadPermissionTree();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedPermissionIds'] && this.allPermissions.length > 0) {
      this.updateSelectionState();
    }
    if (changes['filterKeyword']) {
      this.filterPermissions();
    }
  }

  loadPermissionTree(): void {
    this.permissionService.getPermissionTree().subscribe(tree => {
      this.permissionTree = tree;
      this.allPermissions = this.flattenTree(tree);
      this.updateSelectionState();
      this.filteredTree = [...this.permissionTree];
    });
  }

  private flattenTree(nodes: PermissionTreeNode[]): PermissionTreeNode[] {
    let result: PermissionTreeNode[] = [];
    nodes.forEach(node => {
      result.push(node);
      if (node.children) {
        result = result.concat(this.flattenTree(node.children));
      }
    });
    return result;
  }

  private updateSelectionState(): void {
    this.allPermissions.forEach(node => {
      node.isSelected = this.selectedPermissionIds.includes(node.id);
    });
    this.updateParentIndeterminateState();
  }

  private updateParentIndeterminateState(): void {
    const processParents = (node: PermissionTreeNode, parentMap: Map<string, PermissionTreeNode[]>) => {
      if (node.parentId && parentMap.has(node.parentId)) {
        const siblings = parentMap.get(node.parentId)!;
        const selectedCount = siblings.filter(s => s.isSelected).length;
        const indeterminateCount = siblings.filter(s => s.isIndeterminate).length;
        
        const parent = this.allPermissions.find(p => p.id === node.parentId);
        if (parent) {
          if (selectedCount === siblings.length) {
            parent.isSelected = true;
            parent.isIndeterminate = false;
          } else if (selectedCount > 0 || indeterminateCount > 0) {
            parent.isSelected = false;
            parent.isIndeterminate = true;
          } else {
            parent.isSelected = false;
            parent.isIndeterminate = false;
          }
          processParents(parent, parentMap);
        }
      }
    };

    const parentMap = new Map<string, PermissionTreeNode[]>();
    this.allPermissions.forEach(node => {
      if (node.parentId) {
        if (!parentMap.has(node.parentId)) {
          parentMap.set(node.parentId, []);
        }
        parentMap.get(node.parentId)!.push(node);
      }
    });

    this.allPermissions.forEach(node => {
      if (!node.children || node.children.length === 0) {
        processParents(node, parentMap);
      }
    });
  }

  toggleSelection(node: PermissionTreeNode, checked: boolean): void {
    if (this.disabled) return;

    const allIds = this.getNodeAndDescendantIds(node);
    
    if (checked) {
      const newIds = [...this.selectedPermissionIds];
      allIds.forEach(id => {
        if (!newIds.includes(id)) {
          newIds.push(id);
        }
      });
      this.selectedPermissionIds = newIds;
    } else {
      this.selectedPermissionIds = this.selectedPermissionIds.filter(id => !allIds.includes(id));
    }

    this.updateSelectionState();
    this.selectionChange.emit([...this.selectedPermissionIds]);
  }

  private getNodeAndDescendantIds(node: PermissionTreeNode): string[] {
    const ids: string[] = [node.id];
    if (node.children) {
      node.children.forEach(child => {
        ids.push(...this.getNodeAndDescendantIds(child));
      });
    }
    return ids;
  }

  toggleExpand(node: PermissionTreeNode): void {
    node.isExpanded = !node.isExpanded;
  }

  hasChildren(node: PermissionTreeNode): boolean {
    return !!(node.children && node.children.length > 0);
  }

  getTypeIcon(type: string): string {
    const iconMap: Record<string, string> = {
      'menu': 'folder_open',
      'button': 'smart_button',
      'api': 'api'
    };
    return iconMap[type] || 'circle';
  }

  getTypeLabel(type: string): string {
    const labelMap: Record<string, string> = {
      'menu': '菜单',
      'button': '按钮',
      'api': '接口'
    };
    return labelMap[type] || type;
  }

  private filterPermissions(): void {
    if (!this.filterKeyword.trim()) {
      this.filteredTree = [...this.permissionTree];
      return;
    }

    const keyword = this.filterKeyword.toLowerCase();
    const matchedIds = new Set<string>();

    this.allPermissions.forEach(node => {
      if (node.name.toLowerCase().includes(keyword) ||
          node.code.toLowerCase().includes(keyword) ||
          (node.description && node.description.toLowerCase().includes(keyword))) {
        matchedIds.add(node.id);
        this.addAllAncestorIds(node.id, matchedIds);
        this.addAllDescendantIds(node.id, matchedIds);
      }
    });

    this.filteredTree = this.filterTreeByMatchedIds(this.permissionTree, matchedIds);
    this.expandAllFilteredNodes(this.filteredTree);
  }

  private addAllAncestorIds(nodeId: string, matchedIds: Set<string>): void {
    const node = this.allPermissions.find(n => n.id === nodeId);
    if (node && node.parentId) {
      matchedIds.add(node.parentId);
      this.addAllAncestorIds(node.parentId, matchedIds);
    }
  }

  private addAllDescendantIds(nodeId: string, matchedIds: Set<string>): void {
    const node = this.allPermissions.find(n => n.id === nodeId);
    if (node && node.children) {
      node.children.forEach(child => {
        matchedIds.add(child.id);
        this.addAllDescendantIds(child.id, matchedIds);
      });
    }
  }

  private filterTreeByMatchedIds(nodes: PermissionTreeNode[], matchedIds: Set<string>): PermissionTreeNode[] {
    return nodes
      .filter(node => matchedIds.has(node.id))
      .map(node => ({
        ...node,
        children: node.children ? this.filterTreeByMatchedIds(node.children, matchedIds) : undefined
      }));
  }

  private expandAllFilteredNodes(nodes: PermissionTreeNode[]): void {
    nodes.forEach(node => {
      node.isExpanded = true;
      if (node.children) {
        this.expandAllFilteredNodes(node.children);
      }
    });
  }

  expandAll(): void {
    this.expandAllNodes(this.permissionTree, true);
  }

  collapseAll(): void {
    this.expandAllNodes(this.permissionTree, false);
  }

  private expandAllNodes(nodes: PermissionTreeNode[], expanded: boolean): void {
    nodes.forEach(node => {
      node.isExpanded = expanded;
      if (node.children) {
        this.expandAllNodes(node.children, expanded);
      }
    });
  }

  selectAll(): void {
    this.selectedPermissionIds = this.allPermissions.map(p => p.id);
    this.updateSelectionState();
    this.selectionChange.emit([...this.selectedPermissionIds]);
  }

  deselectAll(): void {
    this.selectedPermissionIds = [];
    this.updateSelectionState();
    this.selectionChange.emit([]);
  }
}
