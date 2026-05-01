import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: false
})
export class DashboardComponent {
  currentSprint = 'Sprint 45';
  @Output() toggleLeftSidebar = new EventEmitter<void>();
  @Output() toggleRightSidebar = new EventEmitter<void>();

  onPreviousSprint(): void {
    console.log('Previous sprint');
  }

  onNextSprint(): void {
    console.log('Next sprint');
  }

  onCompleteSprint(): void {
    console.log('Complete sprint');
  }
}
