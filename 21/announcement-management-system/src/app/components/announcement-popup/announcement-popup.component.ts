import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Announcement, DeviceType } from '../../models/announcement.model';
import { AnnouncementService } from '../../services/announcement.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-announcement-popup',
  templateUrl: './announcement-popup.component.html',
  styleUrls: ['./announcement-popup.component.css']
})
export class AnnouncementPopupComponent implements OnInit, OnDestroy {
  @Input() announcements: Announcement[] = [];
  @Input() deviceType: DeviceType = DeviceType.PC;
  @Output() close = new EventEmitter<void>();
  @Output() viewDetail = new EventEmitter<Announcement>();

  currentIndex = 0;
  visible = false;
  private subscription: Subscription = new Subscription();

  constructor(private announcementService: AnnouncementService) {}

  ngOnInit(): void {
    if (this.announcements.length > 0) {
      this.visible = true;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get currentAnnouncement(): Announcement | undefined {
    return this.announcements[this.currentIndex];
  }

  get hasMultipleAnnouncements(): boolean {
    return this.announcements.length > 1;
  }

  next(): void {
    if (this.currentIndex < this.announcements.length - 1) {
      this.currentIndex++;
    }
  }

  previous(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  goTo(index: number): void {
    this.currentIndex = index;
  }

  onClose(): void {
    this.announcements.forEach(a => {
      this.announcementService.markAsRead(a.id, this.deviceType);
    });
    this.visible = false;
    this.close.emit();
  }

  onViewDetail(announcement: Announcement): void {
    this.announcementService.markAsRead(announcement.id, this.deviceType);
    this.announcementService.trackClick(announcement.id, this.deviceType, window.location.href).subscribe();
    this.viewDetail.emit(announcement);
  }

  getSummary(announcement: Announcement, maxLength: number = 100): string {
    if (announcement.summary) {
      return announcement.summary.length > maxLength 
        ? announcement.summary.substring(0, maxLength) + '...' 
        : announcement.summary;
    }
    
    const plainText = this.stripHtml(announcement.content);
    return plainText.length > maxLength 
      ? plainText.substring(0, maxLength) + '...' 
      : plainText;
  }

  private stripHtml(html: string): string {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  get isMobile(): boolean {
    return this.deviceType === DeviceType.MOBILE;
  }
}
