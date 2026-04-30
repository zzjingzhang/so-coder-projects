import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ScrollStateService } from './scroll-state.service';
import { AnimationCalculatorService } from './animation-calculator.service';
import { Subject, takeUntil } from 'rxjs';

export interface ListItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  category: string;
}

@Component({
  selector: 'app-scroll-list',
  templateUrl: './scroll-list.component.html',
  styleUrls: ['./scroll-list.component.css'],
  standalone: false
})
export class ScrollListComponent implements OnInit, OnDestroy {
  @ViewChild('scrollContainer', { static: true }) scrollContainer!: ElementRef;
  
  private readonly _destroy$ = new Subject<void>();
  private readonly SNAP_THRESHOLD = 50;
  private readonly ITEM_HEIGHT = 120;
  private readonly SNAP_OFFSET = 100;
  
  private _scrollTimeout: any = null;
  private _isSnapping = false;
  private _snapPoints: number[] = [];

  public items: ListItem[] = [];
  public currentSnapIndex = 0;
  public isSnapping = false;

  constructor(
    private readonly scrollStateService: ScrollStateService,
    private readonly animationCalculator: AnimationCalculatorService
  ) {}

  ngOnInit(): void {
    this.generateItems();
    this.calculateSnapPoints();
  }

  ngAfterViewInit(): void {
    this.scrollStateService.initScrollListener(this.scrollContainer.nativeElement);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    if (this._scrollTimeout) {
      clearTimeout(this._scrollTimeout);
    }
  }

  private generateItems(): void {
    const icons = ['map', 'compass', 'globe', 'sun', 'moon', 'star', 'heart', 'briefcase', 'book', 'camera', 'music', 'gamepad'];
    const categories = ['Nature', 'Adventure', 'Travel', 'Relaxation', 'Discovery', 'Culture'];
    const titles = [
      'Mountain Hiking',
      'Ocean Diving',
      'City Exploration',
      'Forest Adventure',
      'Sunset Watching',
      'Stargazing Night',
      'Beach Paradise',
      'Mountain Biking',
      'Cultural Tour',
      'Wildlife Safari',
      'Camping Experience',
      'Island Hopping',
      'River Rafting',
      'Desert Journey',
      'Northern Lights'
    ];
    const descriptions = [
      'Explore breathtaking mountain trails and enjoy stunning views',
      'Dive into the deep blue and discover amazing marine life',
      'Wander through historic streets and modern architecture',
      'Get lost in ancient forests and find hidden treasures',
      'Watch the sun set over beautiful horizons',
      'Marvel at the wonders of the night sky',
      'Relax on pristine beaches with crystal clear waters',
      'Pedal through scenic routes and challenging trails',
      'Immerse yourself in rich traditions and history',
      'Encounter majestic animals in their natural habitat',
      'Sleep under the stars and wake up to nature',
      'Visit multiple islands in one unforgettable journey',
      'Navigate thrilling rapids with expert guides',
      'Experience the magic of vast desert landscapes',
      'Witness the spectacular Aurora Borealis dance'
    ];

    this.items = titles.map((title, index) => ({
      id: index + 1,
      title,
      description: descriptions[index % descriptions.length],
      icon: icons[index % icons.length],
      category: categories[index % categories.length]
    }));
  }

  private calculateSnapPoints(): void {
    this._snapPoints = this.animationCalculator.getSnapPoints(
      this.items.length,
      this.ITEM_HEIGHT,
      this.SNAP_OFFSET
    );
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (this._isSnapping) return;

    const element = this.scrollContainer.nativeElement;
    const scrollTop = element.scrollTop;

    this.updateSnapIndex(scrollTop);

    if (this._scrollTimeout) {
      clearTimeout(this._scrollTimeout);
    }

    this._scrollTimeout = setTimeout(() => {
      this.performSnap(scrollTop);
    }, 150);
  }

  private updateSnapIndex(scrollTop: number): void {
    const relativeScroll = scrollTop - this.SNAP_OFFSET;
    if (relativeScroll <= 0) {
      this.currentSnapIndex = 0;
      return;
    }

    const index = Math.floor(relativeScroll / this.ITEM_HEIGHT);
    this.currentSnapIndex = Math.min(index, this.items.length - 1);
  }

  private performSnap(scrollTop: number): void {
    const snapTarget = this.animationCalculator.calculateSnapOffset(
      scrollTop,
      this._snapPoints,
      this.SNAP_THRESHOLD
    );

    if (Math.abs(snapTarget - scrollTop) > 1) {
      this._isSnapping = true;
      this.isSnapping = true;

      this.scrollToPosition(snapTarget);
    }
  }

  private scrollToPosition(targetY: number): void {
    const element = this.scrollContainer.nativeElement;
    const startY = element.scrollTop;
    const distance = targetY - startY;
    const duration = 300;
    let startTime: number | null = null;

    const animate = (timestamp: number): void => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = this.animationCalculator.easeInOutQuad(progress);
      
      element.scrollTop = startY + distance * easedProgress;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this._isSnapping = false;
        this.isSnapping = false;
      }
    };

    requestAnimationFrame(animate);
  }

  public getBackgroundColor(index: number): string {
    return index % 2 === 0 ? 'bg-white' : 'bg-gray-50';
  }

  public getIndexColor(index: number): string {
    const colors = [
      'text-blue-500',
      'text-purple-500',
      'text-green-500',
      'text-orange-500',
      'text-red-500',
      'text-indigo-500'
    ];
    return colors[index % colors.length];
  }

  public getCategoryColor(category: string): string {
    const categoryColors: Record<string, string> = {
      'Nature': 'bg-green-100 text-green-700',
      'Adventure': 'bg-orange-100 text-orange-700',
      'Travel': 'bg-blue-100 text-blue-700',
      'Relaxation': 'bg-purple-100 text-purple-700',
      'Discovery': 'bg-indigo-100 text-indigo-700',
      'Culture': 'bg-pink-100 text-pink-700'
    };
    return categoryColors[category] || 'bg-gray-100 text-gray-700';
  }
}
