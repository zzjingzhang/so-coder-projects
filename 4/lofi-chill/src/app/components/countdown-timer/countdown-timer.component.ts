import { Component, OnInit } from '@angular/core';
import { TimerService, TimerState } from '../../services/timer.service';

@Component({
  selector: 'app-countdown-timer',
  standalone: false,
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.css']
})
export class CountdownTimerComponent implements OnInit {
  state: TimerState = 'idle';
  remainingSeconds: number = 25 * 60;

  presets = [
    { label: '25分钟', minutes: 25 },
    { label: '45分钟', minutes: 45 },
    { label: '60分钟', minutes: 60 }
  ];

  constructor(public timerService: TimerService) {}

  ngOnInit(): void {
    this.timerService.state$.subscribe(state => this.state = state);
    this.timerService.remainingSeconds$.subscribe(seconds => this.remainingSeconds = seconds);
  }

  setPreset(minutes: number): void {
    this.timerService.setDuration(minutes);
  }

  start(): void {
    this.timerService.start();
  }

  pause(): void {
    this.timerService.pause();
  }

  reset(): void {
    this.timerService.reset();
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
}
