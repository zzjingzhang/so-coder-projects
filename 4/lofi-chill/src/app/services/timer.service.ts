import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval } from 'rxjs';
import { takeWhile, map } from 'rxjs/operators';

export type TimerState = 'idle' | 'running' | 'paused' | 'completed';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private stateSubject = new BehaviorSubject<TimerState>('idle');
  private remainingSecondsSubject = new BehaviorSubject<number>(25 * 60); // 默认25分钟
  private durationSubject = new BehaviorSubject<number>(25 * 60);

  state$ = this.stateSubject.asObservable();
  remainingSeconds$ = this.remainingSecondsSubject.asObservable();
  duration$ = this.durationSubject.asObservable();

  private timerInterval: any = null;

  constructor() {}

  getState(): TimerState {
    return this.stateSubject.value;
  }

  getRemainingSeconds(): number {
    return this.remainingSecondsSubject.value;
  }

  getDuration(): number {
    return this.durationSubject.value;
  }

  setDuration(minutes: number): void {
    const seconds = minutes * 60;
    this.durationSubject.next(seconds);
    if (this.stateSubject.value === 'idle') {
      this.remainingSecondsSubject.next(seconds);
    }
  }

  start(): void {
    if (this.stateSubject.value === 'running') return;

    this.stateSubject.next('running');
    
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    this.timerInterval = setInterval(() => {
      const remaining = this.remainingSecondsSubject.value;
      if (remaining > 0) {
        this.remainingSecondsSubject.next(remaining - 1);
      } else {
        this.complete();
      }
    }, 1000);
  }

  pause(): void {
    if (this.stateSubject.value !== 'running') return;
    
    this.stateSubject.next('paused');
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  resume(): void {
    if (this.stateSubject.value !== 'paused') return;
    this.start();
  }

  reset(): void {
    this.stateSubject.next('idle');
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    this.remainingSecondsSubject.next(this.durationSubject.value);
  }

  private complete(): void {
    this.stateSubject.next('completed');
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
}
