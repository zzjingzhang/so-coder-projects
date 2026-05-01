import { Component, OnInit } from '@angular/core';
import { WeekNumberService } from '../../services/week-number.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false
})
export class HomeComponent implements OnInit {
  weekNumber: number = 0;
  isEvenWeek: boolean = false;
  currentDate: Date = new Date();

  constructor(private weekNumberService: WeekNumberService) {}

  ngOnInit(): void {
    this.weekNumber = this.weekNumberService.getWeekNumber();
    this.isEvenWeek = this.weekNumberService.isEvenWeek();
  }

  get displayText(): string {
    if (this.isEvenWeek) {
      return 'Hose und Hoodie';
    } else {
      return 'Hose';
    }
  }

  get displayColor(): string {
    return this.isEvenWeek ? 'text-blue-600' : 'text-green-600';
  }

  get backgroundGradient(): string {
    return this.isEvenWeek 
      ? 'from-blue-50 via-blue-100 to-indigo-200' 
      : 'from-green-50 via-green-100 to-emerald-200';
  }

  get cardBorderColor(): string {
    return this.isEvenWeek ? 'border-blue-400' : 'border-green-400';
  }

  get cardShadow(): string {
    return this.isEvenWeek 
      ? 'shadow-blue-200/50' 
      : 'shadow-green-200/50';
  }
}
