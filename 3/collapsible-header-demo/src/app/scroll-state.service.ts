import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface ScrollState {
  scrollY: number;
  scrollProgress: number;
  isScrolling: boolean;
  headerHeight: number;
  maxScroll: number;
}

export interface TransformValues {
  translateY: number;
  scale: number;
  opacity: number;
  rotate: number;
}

@Injectable({
  providedIn: 'root'
})
export class ScrollStateService {
  private readonly _scrollState = new BehaviorSubject<ScrollState>({
    scrollY: 0,
    scrollProgress: 0,
    isScrolling: false,
    headerHeight: 0,
    maxScroll: 200
  });
  
  private readonly _destroy$ = new Subject<void>();
  private _scrollTimeout: any = null;
  private _isScrolling = false;

  public readonly scrollState$: Observable<ScrollState> = this._scrollState.asObservable();

  get currentState(): ScrollState {
    return this._scrollState.value;
  }

  constructor() {}

  initScrollListener(element: HTMLElement): void {
    fromEvent(element, 'scroll')
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => this.handleScroll(element));
  }

  private handleScroll(element: HTMLElement): void {
    const scrollY = element.scrollTop;
    const maxScroll = this._scrollState.value.maxScroll;
    const scrollProgress = this.clamp(scrollY / maxScroll, 0, 1);

    this._isScrolling = true;

    this._scrollState.next({
      ...this._scrollState.value,
      scrollY,
      scrollProgress,
      isScrolling: true
    });

    if (this._scrollTimeout) {
      clearTimeout(this._scrollTimeout);
    }

    this._scrollTimeout = setTimeout(() => {
      this._isScrolling = false;
      this._scrollState.next({
        ...this._scrollState.value,
        isScrolling: false
      });
    }, 150);
  }

  setMaxScroll(maxScroll: number): void {
    this._scrollState.next({
      ...this._scrollState.value,
      maxScroll
    });
  }

  setHeaderHeight(height: number): void {
    this._scrollState.next({
      ...this._scrollState.value,
      headerHeight: height
    });
  }

  private clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }

  destroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    if (this._scrollTimeout) {
      clearTimeout(this._scrollTimeout);
    }
  }
}
