import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Announcement, DeviceType } from '../../models/announcement.model';
import { AnnouncementService } from '../../services/announcement.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-announcement-carousel',
  templateUrl: './announcement-carousel.component.html',
  styleUrls: ['./announcement-carousel.component.css']
})
export class AnnouncementCarouselComponent implements OnInit, OnDestroy {
  @Input() announcements: Announcement[] = [];
  @Input() deviceType: DeviceType = DeviceType.PC;
  @Input() autoPlayInterval: number = 5000;
  @Output() viewDetail = new EventEmitter<Announcement>();

  currentIndex = 0;
  private autoPlaySubscription: Subscription = new Subscription();
  showTooltip = false;
  tooltipAnnouncement: Announcement | null = null;

  constructor(private announcementService: AnnouncementService) {}

  ngOnInit(): void {
    if (this.announcements.length > 1) {
      this.startAutoPlay();
    }
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  get currentAnnouncement(): Announcement | undefined {
    return this.announcements[this.currentIndex];
  }

  private startAutoPlay(): void {
    this.autoPlaySubscription = interval(this.autoPlayInterval).subscribe(() => {
      this.next();
    });
  }

  private stopAutoPlay(): void {
    if (this.autoPlaySubscription) {
      this.autoPlaySubscription.unsubscribe();
    }
  }

  next(): void {
    if (this.announcements.length === 0) return;
    this.currentIndex = (this.currentIndex + 1) % this.announcements.length;
  }

  previous(): void {
    if (this.announcements.length === 0) return;
    this.currentIndex = (this.currentIndex - 1 + this.announcements.length) % this.announcements.length;
  }

  onMouseEnter(announcement: Announcement): void {
    this.stopAutoPlay();
    this.showTooltip = true;
    this.tooltipAnnouncement = announcement;
  }

  onMouseLeave(): void {
    if (this.announcements.length > 1) {
      this.startAutoPlay();
    }
    this.showTooltip = false;
    this.tooltipAnnouncement = null;
  }

  onViewDetail(announcement: Announcement): void {
    this.announcementService.trackClick(announcement.id, this.deviceType, window.location.href).subscribe();
    this.viewDetail.emit(announcement);
  }

  getSummary(announcement: Announcement, maxLength: number = 80): string {
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

  get isMobile(): boolean {
    return this.deviceType === DeviceType.MOBILE;
  }

  mobileExpanded = false;

  toggleMobileExpand(): void {
    this.mobileExpanded = !this.mobileExpanded;
  }

  formatTooltipDate(date: Date): string {
    return new Date(date).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  }
}
