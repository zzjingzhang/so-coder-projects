import { Component, OnInit } from '@angular/core';
import { 
  Announcement, 
  AnnouncementLevel, 
  DeviceType,
  Product,
  System,
  Menu
} from '../../models/announcement.model';
import { AnnouncementService } from '../../services/announcement.service';

@Component({
  selector: 'app-demo-page',
  templateUrl: './demo-page.component.html',
  styleUrls: ['./demo-page.component.css']
})
export class DemoPageComponent implements OnInit {
  DeviceType = DeviceType;
  AnnouncementLevel = AnnouncementLevel;
  
  // 公告弹窗相关
  showPopup = false;
  popupAnnouncements: Announcement[] = [];
  popupDeviceType: DeviceType = DeviceType.PC;

  // 公告轮播相关
  carouselAnnouncements: Announcement[] = [];
  carouselDeviceType: DeviceType = DeviceType.PC;

  // 演示切换
  currentDemo: 'management' | 'display' = 'management';
  displayMode: 'popup' | 'carousel' = 'popup';

  // 层级选择
  selectedLevel: AnnouncementLevel = AnnouncementLevel.PRODUCT;
  selectedProductId: string = 'p1';
  selectedSystemId: string = 's1';
  selectedMenuId: string = 'm1';

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
    { label: '移动端', value: DeviceType.MOBILE }
  ];

  constructor(public announcementService: AnnouncementService) {}

  ngOnInit(): void {
    this.loadDropdownData();
    this.loadDemoData();
  }

  loadDropdownData(): void {
    this.products = this.announcementService.getProducts();
    this.systems = this.announcementService.getSystems();
    this.menus = this.announcementService.getMenus();
    this.onProductChange(this.selectedProductId);
  }

  onLevelChange(): void {
    this.loadDemoData();
  }

  onProductChange(productId: string): void {
    this.filteredSystems = this.announcementService.getSystemsByProduct(productId);
    if (this.filteredSystems.length > 0) {
      this.selectedSystemId = this.filteredSystems[0].id;
      this.onSystemChange(this.selectedSystemId);
    }
  }

  onSystemChange(systemId: string): void {
    this.filteredMenus = this.announcementService.getMenusBySystem(systemId);
    if (this.filteredMenus.length > 0) {
      this.selectedMenuId = this.filteredMenus[0].id;
    }
  }

  loadDemoData(): void {
    // 加载弹窗数据（未读公告）
    this.announcementService.getUnreadAnnouncements(
      this.selectedLevel,
      this.popupDeviceType,
      this.selectedProductId,
      this.selectedSystemId,
      this.selectedMenuId
    ).subscribe(anns => {
      this.popupAnnouncements = anns;
    });

    // 加载轮播数据（已读公告）
    this.announcementService.getReadAnnouncements(
      this.selectedLevel,
      this.carouselDeviceType,
      this.selectedProductId,
      this.selectedSystemId,
      this.selectedMenuId
    ).subscribe(anns => {
      this.carouselAnnouncements = anns;
    });
  }

  showAnnouncementPopup(): void {
    this.showPopup = true;
  }

  onPopupClose(): void {
    this.showPopup = false;
    this.loadDemoData();
  }

  onViewDetail(announcement: Announcement): void {
    console.log('查看详情:', announcement);
  }

  getLevelLabel(level: AnnouncementLevel): string {
    return this.announcementService.getLevelLabel(level);
  }

  getCurrentProductName(): string {
    const product = this.products.find(p => p.id === this.selectedProductId);
    return product ? product.name : '';
  }

  getCurrentSystemName(): string {
    const system = this.systems.find(s => s.id === this.selectedSystemId);
    return system ? system.name : '';
  }

  getCurrentMenuName(): string {
    const menu = this.menus.find(m => m.id === this.selectedMenuId);
    return menu ? menu.name : '';
  }
}
