import { Component, Output, EventEmitter, Input } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent {
  @Input() isRunning: boolean = false;
  @Input() currentStep: number = 0;
  @Input() totalSteps: number = 0;
  @Input() animationSpeed: number = 1000;

  @Output() start = new EventEmitter<void>();
  @Output() step = new EventEmitter<void>();
  @Output() reset = new EventEmitter<void>();
  @Output() pause = new EventEmitter<void>();
  @Output() speedChange = new EventEmitter<number>();

  speedMarks = {
    500: '快',
    1000: '中',
    2000: '慢'
  };

  constructor(private message: NzMessageService) {}

  onStart(): void {
    this.start.emit();
    this.message.info('开始执行算法...');
  }

  onStep(): void {
    this.step.emit();
  }

  onReset(): void {
    this.reset.emit();
    this.message.info('已重置');
  }

  onPause(): void {
    this.pause.emit();
    this.message.info('已暂停');
  }

  onSpeedChange(value: number): void {
    this.speedChange.emit(value);
  }

  get progress(): number {
    if (this.totalSteps === 0) return 0;
    return Math.round((this.currentStep / this.totalSteps) * 100);
  }
}
