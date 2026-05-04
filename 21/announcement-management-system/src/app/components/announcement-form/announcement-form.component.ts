import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { 
  Announcement, 
  AnnouncementLevel, 
  DeviceType, 
  AnnouncementStatus,
  Product,
  System,
  Menu
} from '../../models/announcement.model';
import { AnnouncementService } from '../../services/announcement.service';

@Component({
  selector: 'app-announcement-form',
  templateUrl: './announcement-form.component.html',
  styleUrls: ['./announcement-form.component.css']
})
export class AnnouncementFormComponent implements OnInit, OnChanges {
  @Input() announcement: Announcement | null = null;
  @Input() isEditMode = false;
  @Output() close = new EventEmitter<void>();

  form!: FormGroup;
  display = true;
  products: Product[] = [];
  systems: System[] = [];
  menus: Menu[] = [];
  filteredSystems: System[] = [];
  filteredMenus: Menu[] = [];

  levels = [
    { label: '产品级', value: AnnouncementLevel.PRODUCT },
    { label: '系统级', value: AnnouncementLevel.SYSTEM },
    { label: '菜单级', value: AnnouncementLevel.MENU }
  ];

  deviceTypes = [
    { label: 'PC端', value: DeviceType.PC },
    { label: '移动端', value: DeviceType.MOBILE },
    { label: '全部', value: DeviceType.ALL }
  ];

  statuses = [
    { label: '草稿', value: AnnouncementStatus.DRAFT },
    { label: '已发布', value: AnnouncementStatus.PUBLISHED }
  ];

  constructor(
    private fb: FormBuilder,
    private announcementService: AnnouncementService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadDropdownData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['announcement'] && this.announcement && this.form) {
      this.patchFormWithAnnouncement();
    }
  }

  initForm(): void {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 7);

    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(200)]],
      content: ['', [Validators.required]],
      summary: ['', [Validators.maxLength(500)]],
      publishTime: [now, [Validators.required]],
      validFrom: [now, [Validators.required]],
      validTo: [tomorrow, [Validators.required]],
      level: [AnnouncementLevel.PRODUCT, [Validators.required]],
      deviceType: [DeviceType.ALL, [Validators.required]],
      productId: [null],
      systemId: [null],
      menuId: [null],
      status: [AnnouncementStatus.PUBLISHED, [Validators.required]]
    }, { validators: this.dateRangeValidator });

    this.form.get('level')?.valueChanges.subscribe(level => {
      this.onLevelChange(level);
    });

    this.form.get('productId')?.valueChanges.subscribe(productId => {
      this.onProductChange(productId);
    });

    this.form.get('systemId')?.valueChanges.subscribe(systemId => {
      this.onSystemChange(systemId);
    });

    if (this.announcement) {
      this.patchFormWithAnnouncement();
    }
  }

  private dateRangeValidator(group: FormGroup): ValidationErrors | null {
    const validFrom = group.get('validFrom')?.value;
    const validTo = group.get('validTo')?.value;

    if (validFrom && validTo && new Date(validFrom) > new Date(validTo)) {
      return { dateRangeInvalid: true };
    }

    return null;
  }

  loadDropdownData(): void {
    this.products = this.announcementService.getProducts();
    this.systems = this.announcementService.getSystems();
    this.menus = this.announcementService.getMenus();
  }

  onLevelChange(level: AnnouncementLevel): void {
    this.form.patchValue({
      productId: null,
      systemId: null,
      menuId: null
    });
    this.filteredSystems = [];
    this.filteredMenus = [];

    this.updateValidators(level);
  }

  private updateValidators(level: AnnouncementLevel): void {
    const productIdControl = this.form.get('productId');
    const systemIdControl = this.form.get('systemId');
    const menuIdControl = this.form.get('menuId');

    if (level === AnnouncementLevel.PRODUCT) {
      productIdControl?.setValidators([Validators.required]);
      systemIdControl?.clearValidators();
      menuIdControl?.clearValidators();
    } else if (level === AnnouncementLevel.SYSTEM) {
      productIdControl?.setValidators([Validators.required]);
      systemIdControl?.setValidators([Validators.required]);
      menuIdControl?.clearValidators();
    } else if (level === AnnouncementLevel.MENU) {
      productIdControl?.setValidators([Validators.required]);
      systemIdControl?.setValidators([Validators.required]);
      menuIdControl?.setValidators([Validators.required]);
    }

    productIdControl?.updateValueAndValidity();
    systemIdControl?.updateValueAndValidity();
    menuIdControl?.updateValueAndValidity();
  }

  onProductChange(productId: string | null): void {
    this.form.patchValue({
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
    this.form.patchValue({
      menuId: null
    });

    if (systemId) {
      this.filteredMenus = this.announcementService.getMenusBySystem(systemId);
    } else {
      this.filteredMenus = [];
    }
  }

  private patchFormWithAnnouncement(): void {
    if (!this.announcement) return;

    this.form.patchValue({
      title: this.announcement.title,
      content: this.announcement.content,
      summary: this.announcement.summary || '',
      publishTime: new Date(this.announcement.publishTime),
      validFrom: new Date(this.announcement.validFrom),
      validTo: new Date(this.announcement.validTo),
      level: this.announcement.level,
      deviceType: this.announcement.deviceType,
      productId: this.announcement.productId || null,
      systemId: this.announcement.systemId || null,
      menuId: this.announcement.menuId || null,
      status: this.announcement.status
    });

    if (this.announcement.productId) {
      this.filteredSystems = this.announcementService.getSystemsByProduct(this.announcement.productId);
    }

    if (this.announcement.systemId) {
      this.filteredMenus = this.announcementService.getMenusBySystem(this.announcement.systemId);
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.messageService.add({
        severity: 'warn',
        summary: '提示',
        detail: '请填写所有必填项'
      });
      return;
    }

    const formValue = this.form.value;
    const announcementData = {
      title: formValue.title,
      content: formValue.content,
      summary: formValue.summary || undefined,
      publishTime: new Date(formValue.publishTime),
      validFrom: new Date(formValue.validFrom),
      validTo: new Date(formValue.validTo),
      level: formValue.level,
      deviceType: formValue.deviceType,
      productId: formValue.productId || undefined,
      systemId: formValue.systemId || undefined,
      menuId: formValue.menuId || undefined,
      status: formValue.status,
      createdBy: 'admin'
    };

    if (this.isEditMode && this.announcement) {
      this.announcementService.updateAnnouncement(this.announcement.id, announcementData).subscribe({
        next: (result) => {
          if (result) {
            this.messageService.add({
              severity: 'success',
              summary: '成功',
              detail: '公告更新成功'
            });
            this.onClose();
          }
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: '错误',
            detail: '更新公告失败'
          });
        }
      });
    } else {
      this.announcementService.createAnnouncement(announcementData).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: '成功',
            detail: '公告创建成功'
          });
          this.onClose();
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: '错误',
            detail: '创建公告失败'
          });
        }
      });
    }
  }

  onClose(): void {
    this.display = false;
    this.close.emit();
  }

  get isViewOnly(): boolean {
    return !this.isEditMode && this.announcement !== null;
  }

  get dialogTitle(): string {
    if (this.isViewOnly) {
      return '查看公告';
    }
    return this.isEditMode ? '编辑公告' : '新增公告';
  }

  getLevelLabel(level: AnnouncementLevel): string {
    return this.announcementService.getLevelLabel(level);
  }
}
