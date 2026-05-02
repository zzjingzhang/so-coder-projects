import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

interface Snapshot {
  id: number;
  index: number;
  elapsedTime: number;
  lapTime: number;
  timestamp: Date;
}

@Component({
  selector: 'app-stopwatch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stopwatch.component.html',
  styleUrl: './stopwatch.component.css'
})
export class StopwatchComponent implements OnInit, OnDestroy {
  isRunning = false;
  elapsedTime = 0;
  startTime = 0;
  pauseTime = 0;
  totalPausedTime = 0;
  snapshots: Snapshot[] = [];
  snapshotCounter = 0;
  lastSnapshotTime = 0;
  
  isDarkMode = false;
  showRipple = false;
  rippleX = 0;
  rippleY = 0;

  private intervalId: number | null = null;
  private animationFrameId: number | null = null;

  constructor(
    private themeService: ThemeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.themeService.isDarkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  toggleTheme(): void {
    this.themeService.toggleDarkMode();
  }

  formatTime(ms: number): string {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    
    return `${this.padZero(minutes)}:${this.padZero(seconds)}.${this.padZero(milliseconds, 2)}`;
  }

  formatTimestamp(date: Date): string {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  }

  private padZero(num: number, length: number = 2): string {
    return num.toString().padStart(length, '0');
  }

  start(): void {
    if (!this.isRunning) {
      this.isRunning = true;
      const now = performance.now();
      
      if (this.startTime === 0) {
        this.startTime = now;
      } else {
        this.totalPausedTime += now - this.pauseTime;
      }
      
      this.startAnimation();
    }
  }

  pause(): void {
    if (this.isRunning) {
      this.isRunning = false;
      this.pauseTime = performance.now();
      this.stopTimer();
    }
  }

  reset(): void {
    this.isRunning = false;
    this.stopTimer();
    this.elapsedTime = 0;
    this.startTime = 0;
    this.pauseTime = 0;
    this.totalPausedTime = 0;
    this.snapshots = [];
    this.snapshotCounter = 0;
    this.lastSnapshotTime = 0;
  }

  takeSnapshot(event?: MouseEvent): void {
    if (event) {
      this.createRipple(event);
    }
    
    if (this.elapsedTime === 0 && !this.isRunning) {
      return;
    }
    
    this.snapshotCounter++;
    const currentTime = this.elapsedTime;
    const lapTime = this.lastSnapshotTime === 0 
      ? currentTime 
      : currentTime - this.lastSnapshotTime;
    
    const snapshot: Snapshot = {
      id: Date.now(),
      index: this.snapshotCounter,
      elapsedTime: currentTime,
      lapTime: lapTime,
      timestamp: new Date()
    };
    
    this.snapshots.unshift(snapshot);
    this.lastSnapshotTime = currentTime;
  }

  clearSnapshots(): void {
    this.snapshots = [];
    this.snapshotCounter = 0;
    this.lastSnapshotTime = 0;
  }

  private startAnimation(): void {
    const update = () => {
      if (this.isRunning) {
        const now = performance.now();
        this.elapsedTime = now - this.startTime - this.totalPausedTime;
        this.animationFrameId = requestAnimationFrame(update);
      }
    };
    this.animationFrameId = requestAnimationFrame(update);
  }

  private stopTimer(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private createRipple(event: MouseEvent): void {
    const button = event.currentTarget as HTMLElement;
    const rect = button.getBoundingClientRect();
    this.rippleX = event.clientX - rect.left;
    this.rippleY = event.clientY - rect.top;
    this.showRipple = true;
    
    setTimeout(() => {
      this.showRipple = false;
    }, 600);
  }

  get minutes(): string {
    return this.padZero(Math.floor(this.elapsedTime / 60000));
  }

  get seconds(): string {
    return this.padZero(Math.floor((this.elapsedTime % 60000) / 1000));
  }

  get milliseconds(): string {
    return this.padZero(Math.floor((this.elapsedTime % 1000) / 10), 2);
  }

  trackBySnapshot(index: number, snapshot: Snapshot): number {
    return snapshot.id;
  }
}
