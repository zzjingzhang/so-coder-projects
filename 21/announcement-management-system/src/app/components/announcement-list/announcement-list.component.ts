import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { 
  Announcement, 
  AnnouncementQueryParams, 
  AnnouncementLevel, 
  DeviceType, 
  AnnouncementStatus,
  Product,
  System,
  Menu
} from '../../models/announcement.model';
import { AnnouncementService } from '../../services/announcement.service';

@Component({
  selector: 'app-announcement-list',
  templateUrl: './announcement-list.component.html',
  styleUrls: ['./announcement-list.component.css']
})
export class AnnouncementListComponent implements OnInit {
  @ViewChild('dt') dt!: Table;

  announcements: Announcement[] = [];
  totalRecords = 0;
  loading = false;
  displayDialog = false;
  selectedAnnouncement: Announcement | null = null;
  isEditMode = false;

  searchForm!: FormGroup;
  products: Product[] = [];
  systems: System[] = [];
  menus: Menu[] = [];
  filteredSystems: System[] = [];
  filteredMenus: Menu[] = [];

  levels = [
    { label: '全部', value: null },
    { label: '产品级', value: AnnouncementLevel.PRODUCT },
    { label: '系统级', value: AnnouncementLevel.SYSTEM },
    { label: '菜单级', value: AnnouncementLevel.MENU }
  ];

  statuses = [
    { label: '全部', value: null },
    { label: '草稿', value: AnnouncementStatus.DRAFT },
    { label: '已发布', value: AnnouncementStatus.PUBLISHED },
    { label: '已过期', value: AnnouncementStatus.EXPIRED }
  ];

  constructor(
    private fb: FormBuilder,
    private announcementService: AnnouncementService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadDropdownData();
    this.search();
  }

  initForm(): void {
    this.searchForm = this.fb.group({
      title: [''],
      publishTimeFrom: [null],
      publishTimeTo: [null],
      level: [null],
      productId: [null],
      systemId: [null],
      menuId: [null],
      status: [null]
    });

    this.searchForm.get('level')?.valueChanges.subscribe(level => {
      this.onLevelChange(level);
    });

    this.searchForm.get('productId')?.valueChanges.subscribe(productId => {
      this.onProductChange(productId);
    });

    this.searchForm.get('systemId')?.valueChanges.subscribe(systemId => {
      this.onSystemChange(systemId);
    });
  }

  loadDropdownData(): void {
    this.products = this.announcementService.getProducts();
    this.systems = this.announcementService.getSystems();
    this.menus = this.announcementService.getMenus();
  }

  onLevelChange(level: AnnouncementLevel | null): void {
    this.searchForm.patchValue({
      productId: null,
      systemId: null,
      menuId: null
    });
    this.filteredSystems = [];
    this.filteredMenus = [];
  }

  onProductChange(productId: string | null): void {
    this.searchForm.patchValue({
      systemId: null,
      menuId: null
    });
    this.filteredMenus = [];

    if (productId) {
      this.filteredSystems = this.announcementService.getSystemsByProduct(productId);
    } else {
      this.filteredSystems = [];
    }
  }

  onSystemChange(systemId: string | null): void {
    this.searchForm.patchValue({
      menuId: null
    });

    if (systemId) {
      this.filteredMenus = this.announcementService.getMenusBySystem(systemId);
    } else {
      this.filteredMenus = [];
    }
  }

  search(): void {
    this.loading = true;
    const formValue = this.searchForm.value;

    const params: AnnouncementQueryParams = {
      title: formValue.title || undefined,
      publishTimeFrom: formValue.publishTimeFrom || undefined,
      publishTimeTo: formValue.publishTimeTo || undefined,
      level: formValue.level || undefined,
      productId: formValue.productId || undefined,
      systemId: formValue.systemId || undefined,
      menuId: formValue.menuId || undefined,
      status: formValue.status || undefined,
      page: 1,
      pageSize: 100
    };

    this.announcementService.queryAnnouncements(params).subscribe({
      next: (result) => {
        this.announcements = result.data;
        this.totalRecords = result.total;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: '错误',
          detail: '查询公告失败'
        });
      }
    });
  }

  resetSearch(): void {
    this.searchForm.reset({
      title: '',
      publishTimeFrom: null,
      publishTimeTo: null,
      level: null,
      productId: null,
      systemId: null,
      menuId: null,
      status: null
    });
    this.filteredSystems = [];
    this.filteredMenus = [];
    this.search();
  }

  addAnnouncement(): void {
    this.selectedAnnouncement = null;
    this.isEditMode = false;
    this.displayDialog = true;
  }

  editAnnouncement(announcement: Announcement): void {
    this.selectedAnnouncement = { ...announcement };
    this.isEditMode = true;
    this.displayDialog = true;
  }

  deleteAnnouncement(announcement: Announcement): void {
    this.confirmationService.confirm({
      message: '确认删除该公告？此操作不可恢复。',
      header: '删除确认',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.announcementService.deleteAnnouncement(announcement.id).subscribe({
          next: (success) => {
            if (success) {
              this.messageService.add({
                severity: 'success',
                summary: '成功',
                detail: '公告删除成功'
              });
              this.search();
            }
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: '错误',
              detail: '删除公告失败'
            });
          }
        });
      }
    });
  }

  viewAnnouncement(announcement: Announcement): void {
    this.selectedAnnouncement = { ...announcement };
    this.isEditMode = false;
    this.displayDialog = true;
  }

  onDialogClose(): void {
    this.displayDialog = false;
    this.selectedAnnouncement = null;
    this.search();
  }

  getLevelLabel(level: AnnouncementLevel): string {
    return this.announcementService.getLevelLabel(level);
  }

  getDeviceTypeLabel(type: DeviceType): string {
    return this.announcementService.getDeviceTypeLabel(type);
  }

  getStatusLabel(status: AnnouncementStatus): string {
    return this.announcementService.getStatusLabel(status);
  }

  getStatusSeverity(status: AnnouncementStatus): 'success' | 'warning' | 'info' | 'danger' {
    return this.announcementService.getStatusSeverity(status);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  clear(table: Table): void {
    table.clear();
  }
}
