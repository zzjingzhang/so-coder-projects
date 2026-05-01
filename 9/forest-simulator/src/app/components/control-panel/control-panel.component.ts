import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { Subscription } from 'rxjs';
import { EnvironmentService } from '../../services/environment.service';
import { WeatherCondition } from '../../models/environment.model';

@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
  ],
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit, OnDestroy {
  form: FormGroup;
  private stateSubscription: Subscription | null = null;

  weatherConditions = [
    { value: WeatherCondition.CLEAR, label: '晴天', icon: 'wb_sunny' },
    { value: WeatherCondition.CLOUDY, label: '多云', icon: 'wb_cloudy' },
    { value: WeatherCondition.RAINY, label: '雨天', icon: 'umbrella' },
    { value: WeatherCondition.FOGGY, label: '雾天', icon: 'cloud' },
  ];

  constructor(
    private fb: FormBuilder,
    private environmentService: EnvironmentService
  ) {
    this.form = this.fb.group({
      hour: [12],
      isAutoPlay: [false],
      speed: [1],
      weather: [WeatherCondition.CLEAR],
      rainIntensity: [0],
      fogDensity: [0],
      fov: [60],
    });
  }

  ngOnInit(): void {
    this.stateSubscription = this.environmentService.state$.subscribe((state) => {
      this.form.patchValue({
        hour: state.time.hour,
        isAutoPlay: state.time.isAutoPlay,
        speed: state.time.speed,
        weather: state.weather.condition,
        rainIntensity: state.weather.rainIntensity,
        fogDensity: state.weather.fogDensity,
        fov: state.camera.fov,
      }, { emitEvent: false });
    });

    this.setupFormListeners();
  }

  private setupFormListeners(): void {
    this.form.get('hour')?.valueChanges.subscribe((value) => {
      this.environmentService.updateTime({ hour: value });
    });

    this.form.get('isAutoPlay')?.valueChanges.subscribe((value) => {
      this.environmentService.updateTime({ isAutoPlay: value });
    });

    this.form.get('speed')?.valueChanges.subscribe((value) => {
      this.environmentService.updateTime({ speed: value });
    });

    this.form.get('weather')?.valueChanges.subscribe((value) => {
      this.environmentService.setWeatherCondition(value);
    });

    this.form.get('rainIntensity')?.valueChanges.subscribe((value) => {
      this.environmentService.updateWeather({ rainIntensity: value });
    });

    this.form.get('fogDensity')?.valueChanges.subscribe((value) => {
      this.environmentService.updateWeather({ fogDensity: value });
    });

    this.form.get('fov')?.valueChanges.subscribe((value) => {
      this.environmentService.updateCamera({ fov: value });
    });
  }

  formatHour(value: number): string {
    const hours = Math.floor(value);
    const minutes = Math.floor((value - hours) * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  getWeatherLabel(value: string): string {
    const condition = this.weatherConditions.find(c => c.value === value);
    return condition ? condition.label : '晴天';
  }

  resetCamera(): void {
    this.environmentService.updateCamera({
      position: { x: 0, y: 10, z: 30 },
      target: { x: 0, y: 5, z: 0 },
      fov: 60,
    });
  }

  resetAll(): void {
    this.environmentService.reset();
  }

  ngOnDestroy(): void {
    if (this.stateSubscription) {
      this.stateSubscription.unsubscribe();
    }
  }
}
