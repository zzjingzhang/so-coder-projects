import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, map, tap } from 'rxjs';
import { 
  Announcement, 
  AnnouncementQueryParams, 
  AnnouncementLevel, 
  DeviceType, 
  AnnouncementStatus,
  AnnouncementReadState,
  TrackingEvent,
  Product,
  System,
  Menu
} from '../models/announcement.model';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  private announcementsSubject = new BehaviorSubject<Announcement[]>([]);
  private readStates: AnnouncementReadState[] = [];
  private currentUserId = 'user_001';

  constructor(private mockDataService: MockDataService) {
    this.announcementsSubject.next(this.mockDataService.getMockAnnouncements());
  }

  getAnnouncements(): Observable<Announcement[]> {
    return this.announcementsSubject.asObservable();
  }

  getAnnouncementById(id: string): Observable<Announcement | undefined> {
    return this.announcementsSubject.asObservable().pipe(
      map(anns => anns.find(a => a.id === id))
    );
  }

  queryAnnouncements(params: AnnouncementQueryParams): Observable<{ data: Announcement[], total: number }> {
    return this.announcementsSubject.asObservable().pipe(
      map(anns => {
        let filtered = [...anns];

        if (params.title) {
          const searchTerm = params.title.toLowerCase();
          filtered = filtered.filter(a => 
            a.title.toLowerCase().includes(searchTerm) ||
            (a.summary && a.summary.toLowerCase().includes(searchTerm))
          );
        }

        if (params.publishTimeFrom) {
          filtered = filtered.filter(a => 
            new Date(a.publishTime) >= new Date(params.publishTimeFrom!)
          );
        }

        if (params.publishTimeTo) {
          filtered = filtered.filter(a => 
            new Date(a.publishTime) <= new Date(params.publishTimeTo!)
          );
        }

        if (params.level) {
          filtered = filtered.filter(a => a.level === params.level);
        }

        if (params.productId) {
          filtered = filtered.filter(a => a.productId === params.productId);
        }

        if (params.systemId) {
          filtered = filtered.filter(a => a.systemId === params.systemId);
        }

        if (params.menuId) {
          filtered = filtered.filter(a => a.menuId === params.menuId);
        }

        if (params.status) {
          filtered = filtered.filter(a => a.status === params.status);
        }

        filtered.sort((a, b) => 
          new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime()
        );

        const page = params.page || 1;
        const pageSize = params.pageSize || 10;
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const pagedData = filtered.slice(startIndex, endIndex);

        return {
          data: pagedData,
          total: filtered.length
        };
      })
    );
  }

  createAnnouncement(announcement: Omit<Announcement, 'id' | 'createdAt' | 'readCount' | 'clickCount'>): Observable<Announcement> {
    const newAnnouncement: Announcement = {
      ...announcement,
      id: `a${Date.now()}`,
      createdAt: new Date(),
      readCount: 0,
      clickCount: 0
    };

    const currentAnns = this.announcementsSubject.getValue();
    this.announcementsSubject.next([...currentAnns, newAnnouncement]);

    return of(newAnnouncement);
  }

  updateAnnouncement(id: string, updates: Partial<Announcement>): Observable<Announcement | undefined> {
    const currentAnns = this.announcementsSubject.getValue();
    const index = currentAnns.findIndex(a => a.id === id);

    if (index !== -1) {
      const updatedAnnouncement: Announcement = {
        ...currentAnns[index],
        ...updates,
        updatedAt: new Date()
      };

      const newAnns = [...currentAnns];
      newAnns[index] = updatedAnnouncement;
      this.announcementsSubject.next(newAnns);

      return of(updatedAnnouncement);
    }

    return of(undefined);
  }

  deleteAnnouncement(id: string): Observable<boolean> {
    const currentAnns = this.announcementsSubject.getValue();
    const index = currentAnns.findIndex(a => a.id === id);

    if (index !== -1) {
      const newAnns = currentAnns.filter(a => a.id !== id);
      this.announcementsSubject.next(newAnns);
      return of(true);
    }

    return of(false);
  }

  getActiveAnnouncementsForDisplay(
    level: AnnouncementLevel,
    deviceType: DeviceType,
    productId?: string,
    systemId?: string,
    menuId?: string
  ): Observable<Announcement[]> {
    const now = new Date();

    return this.announcementsSubject.asObservable().pipe(
      map(anns => {
        return anns.filter(a => {
          if (a.status !== AnnouncementStatus.PUBLISHED) return false;
          if (new Date(a.validFrom) > now) return false;
          if (new Date(a.validTo) < now) return false;

          if (a.deviceType !== DeviceType.ALL && a.deviceType !== deviceType) return false;

          if (a.level !== level) return false;

          if (level === AnnouncementLevel.PRODUCT && a.productId !== productId) return false;
          if (level === AnnouncementLevel.SYSTEM && a.systemId !== systemId) return false;
          if (level === AnnouncementLevel.MENU && a.menuId !== menuId) return false;

          return true;
        }).sort((a, b) => 
          new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime()
        );
      })
    );
  }

  getUnreadAnnouncements(
    level: AnnouncementLevel,
    deviceType: DeviceType,
    productId?: string,
    systemId?: string,
    menuId?: string
  ): Observable<Announcement[]> {
    return this.getActiveAnnouncementsForDisplay(level, deviceType, productId, systemId, menuId).pipe(
      map(anns => {
        return anns.filter(a => !this.isAnnouncementRead(a.id, deviceType));
      })
    );
  }

  getReadAnnouncements(
    level: AnnouncementLevel,
    deviceType: DeviceType,
    productId?: string,
    systemId?: string,
    menuId?: string
  ): Observable<Announcement[]> {
    return this.getActiveAnnouncementsForDisplay(level, deviceType, productId, systemId, menuId).pipe(
      map(anns => {
        return anns.filter(a => this.isAnnouncementRead(a.id, deviceType));
      })
    );
  }

  markAsRead(announcementId: string, deviceType: DeviceType): void {
    if (!this.isAnnouncementRead(announcementId, deviceType)) {
      this.readStates.push({
        announcementId,
        userId: this.currentUserId,
        readAt: new Date(),
        deviceType
      });

      const currentAnns = this.announcementsSubject.getValue();
      const index = currentAnns.findIndex(a => a.id === announcementId);
      if (index !== -1) {
        currentAnns[index].readCount++;
        this.announcementsSubject.next([...currentAnns]);
      }
    }
  }

  trackClick(announcementId: string, deviceType: DeviceType, pageUrl?: string): Observable<TrackingEvent> {
    const event: TrackingEvent = {
      eventType: 'announcement_detail_click',
      announcementId,
      userId: this.currentUserId,
      deviceType,
      timestamp: new Date(),
      pageUrl,
      userAgent: navigator.userAgent
    };

    console.log('Tracking event:', event);

    const currentAnns = this.announcementsSubject.getValue();
    const index = currentAnns.findIndex(a => a.id === announcementId);
    if (index !== -1) {
      currentAnns[index].clickCount++;
      this.announcementsSubject.next([...currentAnns]);
    }

    return of(event);
  }

  private isAnnouncementRead(announcementId: string, deviceType: DeviceType): boolean {
    return this.readStates.some(s => 
      s.announcementId === announcementId && 
      s.userId === this.currentUserId &&
      s.deviceType === deviceType
    );
  }

  getProducts(): Product[] {
    return this.mockDataService.getProducts();
  }

  getSystems(): System[] {
    return this.mockDataService.getSystems();
  }

  getSystemsByProduct(productId: string): System[] {
    return this.mockDataService.getSystemsByProduct(productId);
  }

  getMenus(): Menu[] {
    return this.mockDataService.getMenus();
  }

  getMenusBySystem(systemId: string): Menu[] {
    return this.mockDataService.getMenusBySystem(systemId);
  }

  getLevelLabel(level: AnnouncementLevel): string {
    const labels: Record<AnnouncementLevel, string> = {
      [AnnouncementLevel.PRODUCT]: '产品级',
      [AnnouncementLevel.SYSTEM]: '系统级',
      [AnnouncementLevel.MENU]: '菜单级'
    };
    return labels[level];
  }

  getDeviceTypeLabel(type: DeviceType): string {
    const labels: Record<DeviceType, string> = {
      [DeviceType.PC]: 'PC端',
      [DeviceType.MOBILE]: '移动端',
      [DeviceType.ALL]: '全部'
    };
    return labels[type];
  }

  getStatusLabel(status: AnnouncementStatus): string {
    const labels: Record<AnnouncementStatus, string> = {
      [AnnouncementStatus.DRAFT]: '草稿',
      [AnnouncementStatus.PUBLISHED]: '已发布',
      [AnnouncementStatus.EXPIRED]: '已过期'
    };
    return labels[status];
  }

  getStatusSeverity(status: AnnouncementStatus): 'success' | 'warning' | 'info' | 'danger' {
    const severities: Record<AnnouncementStatus, 'success' | 'warning' | 'info' | 'danger'> = {
      [AnnouncementStatus.DRAFT]: 'info',
      [AnnouncementStatus.PUBLISHED]: 'success',
      [AnnouncementStatus.EXPIRED]: 'warning'
    };
    return severities[status];
  }
}
