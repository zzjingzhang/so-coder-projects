import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlanetParams } from '../../models/planet.models';
import { PanelModule } from 'primeng/panel';
import { SliderModule } from 'primeng/slider';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { AccordionModule } from 'primeng/accordion';

interface AtmosphereColorOption {
  name: string;
  value: number[];
  css: string;
}

@Component({
  selector: 'app-properties-panel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PanelModule,
    SliderModule,
    InputNumberModule,
    InputTextModule,
    DividerModule,
    AccordionModule
  ],
  templateUrl: './properties-panel.component.html',
  styleUrl: './properties-panel.component.css'
})
export class PropertiesPanelComponent {
  @Input() planetParams!: PlanetParams;
  @Output() paramsChange: EventEmitter<void> = new EventEmitter<void>();

  activeTab: number = 0;

  atmosphereColorOptions: AtmosphereColorOption[] = [
    { name: 'Earth Blue', value: [59, 130, 246], css: '#3b82f6' },
    { name: 'Mars Red', value: [239, 68, 68], css: '#ef4444' },
    { name: 'Venus Yellow', value: [251, 191, 36], css: '#fbbf24' },
    { name: 'Neptune Cyan', value: [14, 165, 233], css: '#0ea5e9' },
    { name: 'Jupiter Orange', value: [249, 115, 22], css: '#f97316' },
    { name: 'Alien Green', value: [34, 197, 94], css: '#22c55e' },
    { name: 'Purple Haze', value: [168, 85, 247], css: '#a855f7' },
    { name: 'Pink Atmosphere', value: [236, 72, 153], css: '#ec4899' }
  ];

  onParamUpdate(): void {
    this.paramsChange.emit();
  }

  get waterLevelPercentage(): number {
    return this.planetParams.waterLevel * 100;
  }

  set waterLevelPercentage(value: number) {
    this.planetParams.waterLevel = value / 100;
  }

  get terrainRoughnessPercentage(): number {
    return this.planetParams.terrainRoughness * 50;
  }

  set terrainRoughnessPercentage(value: number) {
    this.planetParams.terrainRoughness = value / 50;
  }

  get temperaturePercentage(): number {
    return this.planetParams.temperature * 100;
  }

  set temperaturePercentage(value: number) {
    this.planetParams.temperature = value / 100;
  }

  get humidityPercentage(): number {
    return this.planetParams.humidity * 100;
  }

  set humidityPercentage(value: number) {
    this.planetParams.humidity = value / 100;
  }

  get atmosphereDensityPercentage(): number {
    return this.planetParams.atmosphereDensity * 100;
  }

  set atmosphereDensityPercentage(value: number) {
    this.planetParams.atmosphereDensity = value / 100;
  }

  getTemperatureLabel(): string {
    const temp = this.planetParams.temperature;
    if (temp < 0.25) return '❄️ Freezing';
    if (temp < 0.4) return '🌡️ Cold';
    if (temp < 0.6) return '🌤️ Temperate';
    if (temp < 0.75) return '☀️ Warm';
    return '🔥 Hot';
  }

  getHumidityLabel(): string {
    const humidity = this.planetParams.humidity;
    if (humidity < 0.25) return '🏜️ Arid';
    if (humidity < 0.5) return '🌾 Dry';
    if (humidity < 0.75) return '🌿 Moderate';
    return '💧 Humid';
  }

  getAtmosphereLabel(): string {
    const density = this.planetParams.atmosphereDensity;
    if (density < 0.2) return '🌌 Thin';
    if (density < 0.4) return '☁️ Moderate';
    if (density < 0.6) return '🌫️ Dense';
    return '☔ Very Dense';
  }

  resetToDefaults(): void {
    this.planetParams.seed = 42;
    this.planetParams.radius = 150;
    this.planetParams.waterLevel = 0.3;
    this.planetParams.terrainRoughness = 1.0;
    this.planetParams.temperature = 0.5;
    this.planetParams.humidity = 0.5;
    this.planetParams.atmosphereDensity = 0.3;
    this.planetParams.atmosphereColor = [59, 130, 246];
    this.onParamUpdate();
  }

  isColorSelected(colorValue: number[]): boolean {
    if (!this.planetParams?.atmosphereColor) return false;
    return (
      this.planetParams.atmosphereColor[0] === colorValue[0] &&
      this.planetParams.atmosphereColor[1] === colorValue[1] &&
      this.planetParams.atmosphereColor[2] === colorValue[2]
    );
  }

  setAtmosphereColor(colorValue: number[]): void {
    this.planetParams.atmosphereColor = [...colorValue];
    this.onParamUpdate();
  }
}
