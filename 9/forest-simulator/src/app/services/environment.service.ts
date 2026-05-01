import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  EnvironmentState,
  WeatherCondition,
  TimeState,
  WeatherState,
  CameraState,
} from '../models/environment.model';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  private readonly initialState: EnvironmentState = {
    time: {
      hour: 12,
      isAutoPlay: false,
      speed: 1,
    },
    weather: {
      condition: WeatherCondition.CLEAR,
      rainIntensity: 0,
      fogDensity: 0,
      cloudCover: 0,
    },
    camera: {
      position: { x: 0, y: 10, z: 30 },
      target: { x: 0, y: 5, z: 0 },
      fov: 60,
    },
  };

  private stateSubject = new BehaviorSubject<EnvironmentState>(this.initialState);
  state$: Observable<EnvironmentState> = this.stateSubject.asObservable();

  constructor() {}

  getState(): EnvironmentState {
    return this.stateSubject.value;
  }

  updateTime(time: Partial<TimeState>): void {
    const current = this.stateSubject.value;
    this.stateSubject.next({
      ...current,
      time: { ...current.time, ...time },
    });
  }

  updateWeather(weather: Partial<WeatherState>): void {
    const current = this.stateSubject.value;
    this.stateSubject.next({
      ...current,
      weather: { ...current.weather, ...weather },
    });
  }

  updateCamera(camera: Partial<CameraState>): void {
    const current = this.stateSubject.value;
    this.stateSubject.next({
      ...current,
      camera: {
        ...current.camera,
        ...camera,
        position: camera.position
          ? { ...current.camera.position, ...camera.position }
          : current.camera.position,
        target: camera.target
          ? { ...current.camera.target, ...camera.target }
          : current.camera.target,
      },
    });
  }

  setWeatherCondition(condition: WeatherCondition): void {
    let weatherUpdate: Partial<WeatherState> = { condition };

    switch (condition) {
      case WeatherCondition.CLEAR:
        weatherUpdate = {
          ...weatherUpdate,
          rainIntensity: 0,
          fogDensity: 0,
          cloudCover: 0,
        };
        break;
      case WeatherCondition.CLOUDY:
        weatherUpdate = {
          ...weatherUpdate,
          rainIntensity: 0,
          fogDensity: 0,
          cloudCover: 0.7,
        };
        break;
      case WeatherCondition.RAINY:
        weatherUpdate = {
          ...weatherUpdate,
          rainIntensity: 1,
          fogDensity: 0.2,
          cloudCover: 1,
        };
        break;
      case WeatherCondition.FOGGY:
        weatherUpdate = {
          ...weatherUpdate,
          rainIntensity: 0,
          fogDensity: 0.8,
          cloudCover: 0.5,
        };
        break;
    }

    this.updateWeather(weatherUpdate);
  }

  reset(): void {
    this.setWeatherCondition(this.initialState.weather.condition);
    this.stateSubject.next({ ...this.initialState });
  }
}
