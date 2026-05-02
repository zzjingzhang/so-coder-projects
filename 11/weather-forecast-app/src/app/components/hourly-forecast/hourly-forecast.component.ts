import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { HourlyForecast } from '../../models/weather.model';
import { WeatherService } from '../../services/weather.service';
import { weatherIcons, weatherGradients } from '../../models/weather.model';

export type TimeViewMode = 'all' | 'day' | 'night';

@Component({
  selector: 'app-hourly-forecast',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatChipsModule,
    MatButtonToggleModule
  ],
  templateUrl: './hourly-forecast.component.html',
  styleUrl: './hourly-forecast.component.css'
})
export class HourlyForecastComponent implements OnInit {
  private weatherService = inject(WeatherService);
  
  protected isLoading = signal(true);
  protected forecasts = signal<HourlyForecast[]>([]);
  protected viewMode = signal<TimeViewMode>('all');
  protected selectedHour = signal<HourlyForecast | null>(null);
  
  protected readonly weatherIcons = weatherIcons;
  protected readonly weatherGradients = weatherGradients;
  
  protected filteredForecasts = computed(() => {
    const forecasts = this.forecasts();
    const mode = this.viewMode();
    
    if (mode === 'day') {
      return forecasts.filter(f => f.hour >= 6 && f.hour < 18);
    } else if (mode === 'night') {
      return forecasts.filter(f => f.hour < 6 || f.hour >= 18);
    }
    return forecasts;
  });
  
  protected temperatureRange = computed(() => {
    const forecasts = this.forecasts();
    if (forecasts.length === 0) return { min: 0, max: 0 };
    
    const temps = forecasts.map(f => f.temperature);
    return {
      min: Math.min(...temps),
      max: Math.max(...temps)
    };
  });

  ngOnInit(): void {
    this.loadHourlyData();
  }

  private loadHourlyData(): void {
    this.isLoading.set(true);
    
    this.weatherService.getHourlyForecast(25).subscribe((data) => {
      this.forecasts.set(data);
      
      const currentHour = new Date().getHours();
      const currentForecast = data.find(f => f.hour === currentHour) || data[0];
      this.selectedHour.set(currentForecast);
      
      this.isLoading.set(false);
    });
  }

  selectHour(hour: HourlyForecast): void {
    this.selectedHour.set(hour);
  }

  setViewMode(mode: TimeViewMode): void {
    this.viewMode.set(mode);
  }

  getTemperaturePercent(temperature: number): number {
    const range = this.temperatureRange();
    if (range.max === range.min) return 50;
    return ((temperature - range.min) / (range.max - range.min)) * 100;
  }

  isCurrentHour(hour: number): boolean {
    return hour === new Date().getHours();
  }

  isDaytime(hour: number): boolean {
    return hour >= 6 && hour < 18;
  }
}
