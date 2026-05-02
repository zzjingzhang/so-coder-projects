import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { DailyForecast } from '../../models/weather.model';
import { WeatherService } from '../../services/weather.service';
import { weatherIcons, weatherGradients } from '../../models/weather.model';

@Component({
  selector: 'app-daily-forecast',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule
  ],
  templateUrl: './daily-forecast.component.html',
  styleUrl: './daily-forecast.component.css'
})
export class DailyForecastComponent implements OnInit {
  private weatherService = inject(WeatherService);
  
  protected isLoading = signal(true);
  protected forecasts = signal<DailyForecast[]>([]);
  protected currentWeather = signal<DailyForecast | null>(null);
  protected selectedDay = signal<DailyForecast | null>(null);
  
  protected readonly weatherIcons = weatherIcons;
  protected readonly weatherGradients = weatherGradients;

  ngOnInit(): void {
    this.loadWeatherData();
  }

  private loadWeatherData(): void {
    this.isLoading.set(true);
    
    this.weatherService.getCurrentWeather().subscribe((current) => {
      this.currentWeather.set(current);
      this.selectedDay.set(current);
    });
    
    this.weatherService.getDailyForecast().subscribe((data) => {
      this.forecasts.set(data);
      this.isLoading.set(false);
    });
  }

  selectDay(day: DailyForecast): void {
    this.selectedDay.set(day);
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
}
