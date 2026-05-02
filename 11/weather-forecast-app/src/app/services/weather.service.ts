import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { DailyForecast, HourlyForecast } from '../models/weather.model';
import { mockDailyForecasts, generateHourlyForecast } from '../data/mock-weather.data';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  
  getDailyForecast(): Observable<DailyForecast[]> {
    return of(mockDailyForecasts).pipe(delay(300));
  }

  getHourlyForecast(baseTemp: number = 25): Observable<HourlyForecast[]> {
    const hourlyData = generateHourlyForecast(baseTemp);
    return of(hourlyData).pipe(delay(300));
  }

  getCurrentWeather(): Observable<DailyForecast> {
    return of(mockDailyForecasts[0]).pipe(delay(200));
  }
}
