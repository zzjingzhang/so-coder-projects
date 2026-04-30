import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ScrollStateService, TransformValues } from './scroll-state.service';
import { AnimationCalculatorService } from './animation-calculator.service';

@Component({
  selector: 'app-collapsible-header',
  templateUrl: './collapsible-header.component.html',
  styleUrls: ['./collapsible-header.component.css'],
  standalone: false
})
export class CollapsibleHeaderComponent implements OnInit, OnDestroy {
  @ViewChild('headerContainer', { static: true }) headerContainer!: ElementRef;
  @ViewChild('backgroundImage') backgroundImage!: ElementRef;
  @ViewChild('titleText') titleText!: ElementRef;
  @ViewChild('subtitleText') subtitleText!: ElementRef;
  @ViewChild('headerLogo') headerLogo!: ElementRef;

  private readonly _destroy$ = new Subject<void>();
  private readonly HEADER_COLLAPSED_HEIGHT = 80;
  private readonly HEADER_EXPANDED_HEIGHT = 300;

  public headerTransform: TransformValues = { translateY: 0, scale: 1, opacity: 1, rotate: 0 };
  public imageTransform: TransformValues = { translateY: 0, scale: 1, opacity: 1, rotate: 0 };
  public titleTransform: TransformValues = { translateY: 0, scale: 1, opacity: 1, rotate: 0 };
  public subtitleTransform: TransformValues = { translateY: 0, scale: 1, opacity: 1, rotate: 0 };
  public logoTransform: TransformValues = { translateY: 0, scale: 1, opacity: 1, rotate: 0 };

  public headerHeight = this.HEADER_EXPANDED_HEIGHT;
  public isExpanded = true;

  constructor(
    private readonly scrollStateService: ScrollStateService,
    private readonly animationCalculator: AnimationCalculatorService
  ) {}

  ngOnInit(): void {
    this.scrollStateService.setMaxScroll(this.HEADER_EXPANDED_HEIGHT - this.HEADER_COLLAPSED_HEIGHT);
    
    this.scrollStateService.scrollState$
      .pipe(takeUntil(this._destroy$))
      .subscribe((state) => {
        this.updateAnimations(state.scrollProgress);
        this.updateHeaderHeight(state.scrollY);
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private updateAnimations(progress: number): void {
    this.imageTransform = this.animationCalculator.calculateTransform(progress, {
      startScale: 1.2,
      endScale: 1,
      startY: 0,
      endY: -50,
      startOpacity: 1,
      endOpacity: 0.8,
      easing: this.animationCalculator.easeInOutQuad
    });

    this.titleTransform = this.animationCalculator.calculateTransform(progress, {
      startY: 0,
      endY: -30,
      startScale: 1,
      endScale: 0.7,
      startOpacity: 1,
      endOpacity: 1,
      easing: this.animationCalculator.easeOutCubic
    });

    this.subtitleTransform = this.animationCalculator.calculateTransform(progress, {
      startY: 0,
      endY: -20,
      startOpacity: 1,
      endOpacity: 0,
      easing: this.animationCalculator.easeInCubic
    });

    this.logoTransform = this.animationCalculator.calculateTransform(progress, {
      startScale: 0,
      endScale: 1,
      startOpacity: 0,
      endOpacity: 1,
      startY: -20,
      endY: 0,
      easing: this.animationCalculator.easeOutCubic
    });
  }

  private updateHeaderHeight(scrollY: number): void {
    const maxScroll = this.HEADER_EXPANDED_HEIGHT - this.HEADER_COLLAPSED_HEIGHT;
    const clampedScroll = this.animationCalculator.clamp(scrollY, 0, maxScroll);
    this.headerHeight = this.HEADER_EXPANDED_HEIGHT - clampedScroll;
    this.isExpanded = scrollY < maxScroll * 0.5;
  }

  public getTransformStyle(transform: TransformValues): string {
    return `translateY(${transform.translateY}px) scale(${transform.scale}) rotate(${transform.rotate}deg)`;
  }

  public getOpacityStyle(transform: TransformValues): number {
    return transform.opacity;
  }
}
